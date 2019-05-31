const name = "dept";
const attributes = ['id', "name", "parentId", "type", "description", "order"];

const sequelize = require("../utils/initDatabase");
const Op = require('sequelize').Op;
const uuid = require("uuid/v4");
const models = require("../utils/scanModels");
const rawQueryUtils = require("./utils/rawQueryUtils.js");

const MainModel = models[name];

const rawQuery = async (params) => {
    params.attributes = attributes;
    let { str_attriutes, str_where, str_paging } = rawQueryUtils.getStr(params);
    let str = `
    SELECT
        ${str_attriutes},
        t_parent.NAME parentName 
    FROM
        t_dept t
        LEFT JOIN t_dept t_parent ON t.parentId = t_parent.id 
    ${str_where}`;
    let result = await sequelize.query(str, { type: sequelize.QueryTypes.SELECT });
    return JSON.parse(JSON.stringify(result));
}

const findAll = async (ctx, next) => {
    let whereParam = { isDelete: 0 };
    let data = await rawQuery({ whereParam });
    // let data = await inelegentQuery(whereParam);
    ctx.response.body = { code: 1, data: data, };
};

const findByPk = async (ctx, next) => {
    let whereParam = { isDelete: 0, id: ctx.query.id };
    let data = (await rawQuery({ whereParam }))[0];
    ctx.response.body = { code: 1, data: data, };
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
    let obj = await MainModel.findOne({
        where: whereParam
    });
    ctx.response.body = { code: 1, data: !(obj), msg: obj }
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

module.exports = [
    { method: 'GET', url: `/${name}/nameValidation.do`, function: nameValidation },
    // 
    { method: 'GET', url: `/${name}/list.do`, function: findAll },
    { method: 'GET', url: `/${name}/detail.do`, function: findByPk },
    { method: 'POST', url: `/${name}/add.do`, function: create },
    { method: 'POST', url: `/${name}/edit.do`, function: update },
    { method: 'POST', url: `/${name}/delete.do`, function: destroyLogically },
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