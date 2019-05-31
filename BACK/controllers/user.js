const name = "user";
const attributes = ["id", "username", "name", "deptId", "roleId", "email", "phone", "order"];

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
        t_dept.NAME deptName,
        t_role.NAME roleName
    FROM
        t_user t
        LEFT JOIN t_dept on t.deptId=t_dept.id
        LEFT JOIN t_role on t.roleId=t_role.id
    ${str_where}
    ORDER BY t.order ASC
    ${str_paging}
    `;
    let result = await sequelize.query(str, { type: sequelize.QueryTypes.SELECT });
    return JSON.parse(JSON.stringify(result));
};

const findAll = async (ctx, next) => {
    let whereParam = { deptId: ctx.query.deptId, isDelete: 0 };
    let pagingParam = { page: ctx.query.page, row: ctx.query.row };
    let data = await rawQuery({ whereParam, pagingParam });
    let count = await MainModel.count({ where: whereParam });
    ctx.response.body = { code: 1, data: data, count: count, session: ctx.session };
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


module.exports = [
    // 
    { method: 'GET', url: `/${name}/list.do`, function: findAll },
    { method: 'GET', url: `/${name}/detail.do`, function: findByPk },
    { method: 'POST', url: `/${name}/add.do`, function: create },
    { method: 'POST', url: `/${name}/edit.do`, function: update },
    { method: 'POST', url: `/${name}/delete.do`, function: destroyLogically },
];