const name = "dept";
const attributes = ['id', "name", "parentId", "type", "description", "order"];

const sequelize = require("../utils/initDatabase");
const Op = require('sequelize').Op;
const EasyControllerExample = require("../utils/easyController")

const models = require("../utils/scanModels");
const MainModel = models[name];

const MainControllerExample = new EasyControllerExample(MainModel, {
    NeedCheckIsDelete: true,
    attributes: attributes,
});

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
        t_parent.NAME parentName 
    FROM
        t_dept t
        LEFT JOIN t_dept t_parent ON t.parentId = t_parent.id 
    ${str_where}`;
    let result = await sequelize.query(str, { type: sequelize.QueryTypes.SELECT });
    return JSON.parse(JSON.stringify(result));
}

const findAll = async (ctx, next) => {
    let result = await rawQuery({ isDelete: 0 });
    // let result = await inelegentQuery({ isDelete: 0 });
    ctx.response.body = {
        code: 1,
        data: result,
    };
};

const findByPk = async (ctx, next) => {
    let result = (await rawQuery({ isDelete: 0, id: ctx.query.id }))[0];
    ctx.response.body = {
        code: 1,
        data: result,
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
    let obj = await MainModel.findOne({
        where: whereParam
    });
    ctx.response.body = {
        code: 1,
        data: !(obj),
        msg: obj
    }
};

// const findAll = async (ctx, next) => { await MainControllerExample.findAll(ctx, next) };
// const findByPk = async (ctx, next) => { await MainControllerExample.findByPk(ctx, next) };
const create = async (ctx, next) => { await MainControllerExample.create(ctx, next) };
const update = async (ctx, next) => { await MainControllerExample.update(ctx, next) };
const destroy = async (ctx, next) => { await MainControllerExample.destroy(ctx, next) };
const destroyLogically = async (ctx, next) => { await MainControllerExample.destroyLogically(ctx, next) };

module.exports = [
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