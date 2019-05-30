const name = "article";
const attributes = ["id", "title", "publisher", "publishTime", "content", "state", "reason"];

const sequelize = require("../utils/initDatabase");
const Op = require('sequelize').Op;
const uuid = require("uuid/v4");
const EasyControllerExample = require("../utils/easyController");
const models = require("../utils/scanModels");

const MainModel = models[name];

// 涉及到多个表，自动手动拼sql比较方便
const rawQuery = async (whereParam, pagingParam) => {
    // ---------------------------------------------- str_attriutes
    let str_attriutes = attributes.map(attribute => `t.${attribute}`).join(",");
    // ---------------------------------------------- str_where
    let arr_where = [];
    for (let prop in whereParam) {
        let value = whereParam[prop];
        if (typeof value == 'object') {
            /*注意：
                Symbol 作为属性名，该属性不会出现在for...in、for...of循环中，也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回。
                但是，它也不是私有属性，有一个Object.getOwnPropertySymbols方法，可以获取指定对象的所有 Symbol 属性名。
            */
            let symbolList = Object.getOwnPropertySymbols(value);
            symbolList.forEach(symbol => {
                // nodejs 不支持 symbol.description，只能用 toString 判断
                switch (symbol.toString()) {
                    case "Symbol(like)":
                        arr_where.push(`t.${prop} LIKE '${value[symbol]}'`);
                        break;
                    case "Symbol(gte)":
                        arr_where.push(`t.${prop} >= '${value[symbol]}'`);
                        break;
                    case "Symbol(lte)":
                        arr_where.push(`t.${prop} <= '${value[symbol]}'`);
                        break;
                }
            });
        } else {
            arr_where.push(`t.${prop}='${value}'`);
        }
    }
    let str_where = arr_where.length > 0 ? (" WHERE " + arr_where.join(" and ")) : "";
    // ---------------------------------------------- str_paging
    let str_paging = "";
    if (pagingParam) {
        let page = parseInt(pagingParam.page);
        let row = parseInt(pagingParam.row);
        str_paging = `LIMIT ${(page - 1) * row},${row}`;
    }

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
    /* Symbol作为属性名：
        1 创建对象时添加：必须用[]括起来
            const s1 = Symbol("apple");
            let obj = {
                [s1]:"小呀小苹果"
            };
        2 后续添加
            const s1 = Symbol("apple");
            let obj = {};
            obj[s1]= "小呀小苹果";
    */
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
    let data = await rawQuery(whereParam, pagingParam);
    let count = await MainModel.count({ where: whereParam });
    ctx.response.body = {
        code: 1,
        data: data,
        count: count,
    };
};

const findByPk = async (ctx, next) => {
    let result = (await rawQuery({ isDelete: 0, id: ctx.query.id }))[0];
    ctx.response.body = {
        code: 1,
        data: result,
    };
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