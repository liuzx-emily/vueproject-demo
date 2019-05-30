const name = "permission";
const attributes = ['id', "name", "parentId", "type", "code", "icon", "order", ];

const sequelize = require("../utils/initDatabase");
const Op = require('sequelize').Op;
const uuid = require("uuid/v4");
const EasyControllerExample = require("../utils/easyController");
const models = require("../utils/scanModels");

const MainModel = models[name];

// 涉及到多个表，自动手动拼sql比较方便
const rawQuery = async (whereParam) => {
    let str_attriutes = attributes.map(attribute => `t.${attribute}`).join(",");
    // ----------------------------------------------
    let arr_where = []
    for (let prop in whereParam) {
        arr_where.push(`t.${prop}='${whereParam[prop]}'`);
    }
    let str_where = arr_where.length > 0 ? (" WHERE " + arr_where.join(" and ")) : "";
    let str = `
    SELECT
        ${str_attriutes},
        t_parent.name parentName 
    FROM
        t_permission t
        LEFT JOIN t_permission t_parent ON t.parentId = t_parent.id 
    ${str_where}
    ORDER BY t.order ASC
    `;
    let data = await sequelize.query(str, { type: sequelize.QueryTypes.SELECT });
    return JSON.parse(JSON.stringify(data));
};

const getNav = async (ctx, nect) => {
    let whereParam = {};
    whereParam.isDelete = 0;
    whereParam.type = {
        [Op.not]: 3
    };
    // 为什么不调用 rawQuery ？因为 rawQuery 现在处理不了 [Op.not]
    let data = await MainModel.findAll({
        where: whereParam,
        attributes: attributes,
        order: [
            ['order', 'ASC'],
        ],
    });
    ctx.response.body = {
        code: 1,
        data: data,
    };
};

const getBtn = async (ctx, nect) => {
    let whereParam = {};
    whereParam.isDelete = 0;
    whereParam.type = 3;
    let data = await rawQuery(whereParam);
    ctx.response.body = {
        code: 1,
        data: data,
    };
};

const findAll = async (ctx, nect) => {
    let data = await rawQuery({ isDelete: 0 });
    // let data = await inelegentQuery({ isDelete: 0 });
    ctx.response.body = {
        code: 1,
        data: data,
    };
};

const findByPk = async (ctx, next) => {
    let data = (await rawQuery({ isDelete: 0, id: ctx.query.id }))[0];
    ctx.response.body = {
        code: 1,
        data: data,
    };
};

const nameValidation = async (ctx, next) => {
    let name = ctx.query.name;
    let id = ctx.query.id;
    let whereParam = {};
    whereParam.isDelete = 0;
    whereParam.name = name;
    whereParam.id = {
        [Op.not]: id
    };
    let obj = await MainModel.findOne({ where: whereParam });
    ctx.response.body = {
        code: 1,
        data: !(obj),
        msg: obj
    };
};

const create = async (ctx, next) => {
    // 取参数
    let param = ctx.request.body;
    // param.id = uuid();
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

module.exports = [
    { method: 'GET', url: `/${name}/nav.do`, function: getNav },
    { method: 'GET', url: `/${name}/btn.do`, function: getBtn },
    // 
    { method: 'GET', url: `/${name}/list.do`, function: findAll },
    { method: 'GET', url: `/${name}/detail.do`, function: findByPk },
    { method: 'POST', url: `/${name}/add.do`, function: create },
    { method: 'POST', url: `/${name}/edit.do`, function: update },
    { method: 'POST', url: `/${name}/delete.do`, function: destroyLogically },
    { method: 'GET', url: `/${name}/nameValidation.do`, function: nameValidation },
];


// ------------------------------------------------
const inelegentQuery = async (whereParam) => {
    // utils函数 copyByAttributes
    const copyByAttributes = (origin) => {
        let obj = {};
        attributes.forEach(key => {
            obj[key] = origin[key];
        });
        return obj;
    };
    // utils函数 getParentName
    const getParentName = async (parentId) => {
        let parent = await MainModel.findByPk(parentId);
        let parentName;
        if (parent) {
            parentName = parent.name;
        } else {
            parentName = "顶级";
        }
        return parentName;
    };
    // 
    let result = await MainModel.findAll({
        attributes: attributes,
        where: whereParam,
        order: [
            ["order", 'asc']
        ],
    });
    let data = [];
    for (let i = 0; i < result.length; i++) {
        let obj = copyByAttributes(result[i]);
        obj.parentName = await getParentName(obj.parentId);
        data.push(obj);
    }
    return data;
}