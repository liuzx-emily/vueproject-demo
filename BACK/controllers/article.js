const name = "article";
const attributes = ["id", "title", "publisher", "publishTime", "content", "state", "reason"];

const sequelize = require("../utils/initDatabase");
const Op = require('sequelize').Op;
const uuid = require("uuid/v4");
const models = require("../utils/scanModels");
const rawQueryUtils = require("./utils/rawQueryUtils.js");

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
    if (ctx.query.startTime) {
        whereParam.publishTime = whereParam.publishTime || {};
        whereParam.publishTime[Op.gte] = ctx.query.startTime;
    }
    if (ctx.query.endTime) {
        whereParam.publishTime = whereParam.publishTime || {};
        whereParam.publishTime[Op.lte] = ctx.query.endTime;
    }
    // ---------------------------------------------- pagingParam
    let pagingParam = { page: ctx.query.page, row: ctx.query.row };
    let data = await rawQuery({ whereParam, pagingParam });
    let count = await MainModel.count({ where: whereParam });
    ctx.response.body = { code: 1, data: data, count: count, };
};

const findByPk = async (ctx, next) => {
    let whereParam = { isDelete: 0, id: ctx.query.id };
    let data = (await rawQuery({ whereParam }))[0];
    ctx.response.body = { code: 1, data: data, };
};

const create = async (ctx, next) => {
    // 取参数
    let param = ctx.request.body;
    param.id = uuid();
    await MainModel.create(param);
    ctx.response.body = { code: 1, };
};


const update = async (ctx, next) => {
    let param = ctx.request.body;
    let whereParam = { isDelete: 0, id: param.id, };
    await MainModel.update(param, { where: whereParam });
    ctx.response.body = { code: 1, };
};

const destroy = async (ctx, next) => {
    let whereParam = {
        id: {
            [Op.in]: ctx.request.body.id
        }
    };
    await MainModel.destroy({ where: whereParam });
    ctx.response.body = { code: 1, };
};

const destroyLogically = async (ctx, next) => {
    let whereParam = {
        id: {
            [Op.in]: ctx.request.body.id,
        },
        isDelete: 0
    };
    await MainModel.update({ isDelete: 1 }, { where: whereParam });
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