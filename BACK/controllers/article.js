const name = "article";
const attributes = ["id", "title", "publisher", "publishTime", "content", "state", "reason"];

const sequelize = require("../utils/initDatabase");
const Op = require('sequelize').Op;
const uuid = require("uuid/v4");
const models = require("../utils/scanModels");
const rawQueryUtils = require("./utils/rawQueryUtils.js");
const fileUtils = require("./utils/fileUtils.js");

const MainModel = models[name];

// 涉及到多个表，自动手动拼sql比较方便
const rawQuery = async (params) => {
    params.attributes = attributes;
    let { str_attriutes, str_where, str_paging } = rawQueryUtils.getStr(params);
    let str = `
    SELECT
        ${str_attriutes}
    FROM
        t_article t
    ${str_where}
    ORDER BY t.publishTime DESC
    ${str_paging}
    `;
    let result = await sequelize.query(str, { type: sequelize.QueryTypes.SELECT });
    return JSON.parse(JSON.stringify(result));
};

const findAll = async (ctx, nect) => {
    // ---------------------------------------------- whereParam
    let whereParam = { isDelete: 0, };
    if (ctx.query.title) {
        whereParam.title = {
            [Op.like]: '%' + ctx.query.title + '%',
        };
    }
    if (ctx.query.publisher) {
        whereParam.publisher = {
            [Op.like]: '%' + ctx.query.publisher + '%',
        };
    }
    if (ctx.query.startTime) {
        whereParam.publishTime = whereParam.publishTime || {};
        whereParam.publishTime[Op.gte] = ctx.query.startTime;
    }
    if (ctx.query.endTime) {
        whereParam.publishTime = whereParam.publishTime || {};
        whereParam.publishTime[Op.lte] = ctx.query.endTime;
    }
    if (ctx.query.state && ctx.query.state != "-1") {
        whereParam.state = ctx.query.state;
    }
    // ---------------------------------------------- pagingParam
    let pagingParam = { page: ctx.query.page, row: ctx.query.row };
    let data = await rawQuery({ whereParam, pagingParam });
    let count = await MainModel.count({ where: whereParam });
    ctx.response.body = { code: 1, data: data, count: count, };
};

const findByPk = async (ctx, next) => {
    const articleId = ctx.query.id;
    let whereParam = { isDelete: 0, id: articleId };
    let data = (await rawQuery({ whereParam }))[0];
    // 取附件
    const str_file = `
    SELECT
        tf.id,
        tf.name
    FROM
        t_file tf
        LEFT JOIN t_article_file taf ON tf.id = taf.fileId 
    WHERE
        taf.articleId = "${articleId}"`;
    let fileList = await sequelize.query(str_file, { type: sequelize.QueryTypes.SELECT });
    data.fileList = fileList;
    ctx.response.body = { code: 1, data: data, };
};

const create = async (ctx, next) => {
    // 取参数
    const articleId = uuid();
    let param = ctx.request.body;
    param.id = articleId;
    await MainModel.create(param);
    // 存附件
    const fileList = param.fileList;
    if (fileList) {
        const bulkCreateList = fileList.map(fileId => {
            return {
                articleId: articleId,
                fileId: fileId
            }
        })
        await models.article_file.bulkCreate(bulkCreateList);
    }
    ctx.response.body = { code: 1, };
};


const update = async (ctx, next) => {
    let param = ctx.request.body;
    const articleId = param.id;
    let whereParam = { isDelete: 0, id: articleId, };
    await MainModel.update(param, { where: whereParam });
    // 存附件
    await models.article_file.destroy({ where: { articleId: articleId } });
    const fileList = param.fileList;
    if (fileList) {
        const bulkCreateList = fileList.map(fileId => {
            return {
                articleId: articleId,
                fileId: fileId
            }
        })
        await models.article_file.bulkCreate(bulkCreateList);
    }
    ctx.response.body = { code: 1, };
};

const destroyLogically = async (ctx, next) => {
    const articleIds = ctx.request.body.ids;
    let whereParam = {
        id: {
            [Op.in]: articleIds,
        },
        isDelete: 0
    };
    await MainModel.update({ isDelete: 1 }, { where: whereParam });
    // 删附件
    const fileIds = await models.article_file.findAll({
        where: {
            articleId: {
                [Op.in]: articleIds,
            },
        }
    }).map(file => file.fileId);
    await fileUtils.deleteFile(fileIds);
    // 删关联表
    await models.article_file.destroy({
        where: {
            articleId: {
                [Op.in]: articleIds,
            },
        }
    });
    ctx.response.body = { code: 1, };
};

const audit = async (ctx, next) => {
    let params = ctx.request.body;
    let state = params.audit ? 3 : 4;
    let reason = params.audit ? "" : params.reason;
    await MainModel.update({ state: state, reason: reason }, { where: { id: params.id } });
    ctx.response.body = { code: 1, };
};

module.exports = [
    { method: 'POST', url: `/${name}/audit.do`, function: audit },
    // 
    { method: 'GET', url: `/${name}/list.do`, function: findAll },
    { method: 'GET', url: `/${name}/detail.do`, function: findByPk },
    { method: 'POST', url: `/${name}/add.do`, function: create },
    { method: 'POST', url: `/${name}/edit.do`, function: update },
    { method: 'POST', url: `/${name}/delete.do`, function: destroyLogically },
];