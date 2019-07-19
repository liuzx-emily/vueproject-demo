const name = "user";
const attributes = ["id", "username", "name", "deptId", "roleId", "email", "phone", "order", "profilePhoto"];

const sequelize = require("../initialization/initDatabase");
const Op = require('sequelize').Op;
const uuid = require("uuid/v4");
const models = require("../utils/scanModels");
const rawQueryUtils = require("./utils/rawQueryUtils.js");
const bcryptUtils = require("./utils/bcryptUtils.js");

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
    let whereParam = { deptId: ctx.requestparam.deptId, isDelete: 0 };
    if (ctx.requestparam.username) {
        whereParam.username = {
            [Op.like]: '%' + ctx.requestparam.username + '%',
        };
    }
    if (ctx.requestparam.name) {
        whereParam.name = {
            [Op.like]: '%' + ctx.requestparam.name + '%',
        };
    }
    let pagingParam = { page: ctx.requestparam.page, row: ctx.requestparam.row };
    let data = await rawQuery({ whereParam, pagingParam });
    let count = await MainModel.count({ where: whereParam });
    ctx.response.body = { code: 1, data: data, count: count, session: ctx.session };
};


const findByPk = async (ctx, next) => {
    let whereParam = { isDelete: 0, id: ctx.requestparam.id };
    let data = (await rawQuery({ whereParam }))[0];
    ctx.response.body = { code: 1, data: data, };
};

const create = async (ctx, next) => {
    // 取参数
    let param = ctx.requestparam;
    param.id = uuid();
    const password = param.password;
    param.password = await bcryptUtils.encryption(password);
    param.temp1 = password;
    await MainModel.create(param);
    ctx.response.body = { code: 1, };
};



const destroy = async (ctx, next) => {
    let whereParam = {
        id: {
            [Op.in]: ctx.requestparam.ids
        }
    };
    await MainModel.destroy({ where: whereParam });
    ctx.response.body = { code: 1, };
};

const destroyLogically = async (ctx, next) => {
    let whereParam = {
        id: {
            [Op.in]: ctx.requestparam.ids,
        },
        isDelete: 0
    };
    await MainModel.update({ isDelete: 1 }, { where: whereParam });
    ctx.response.body = { code: 1, };
};

// --------------------------------------------------------

const update = async (id, updateParam) => {
    const whereParam = { isDelete: 0, id: id, };
    const res = await MainModel.update(updateParam, { where: whereParam });
    return res;
};

const editUser = async (ctx, next) => {
    let updateParam = ctx.requestparam;
    update(updateParam.id, updateParam);
    ctx.response.body = { code: 1, };
};

const resetPassword = async (ctx, next) => {
    const password = ctx.requestparam.password;
    let updateParam = {
        password: await bcryptUtils.encryption(password),
        temp1: password,
    };
    update(ctx.requestparam.id, updateParam);
    ctx.response.body = { code: 1, };
};

const changePassword = async (ctx, next) => {
    let params = ctx.requestparam;
    const user = await models.user.findOne({ where: { isDelete: 0, id: params.id, } });
    const flag = await bcryptUtils.compare(params.old, user.password);
    if (flag) {
        const password = params.new;
        let updateParam = {
            password: await bcryptUtils.encryption(password),
            temp1: password,
        };
        update(params.id, updateParam);
        ctx.response.body = { code: 1, };
    } else {
        ctx.response.body = { code: 0, message: "旧密码错误！" };
    }
};

// --------------------------------------------------------
module.exports = [
    { method: 'POST', url: `/${name}/changePassword.do`, function: changePassword },
    { method: 'POST', url: `/${name}/resetPassword.do`, function: resetPassword },
    // 
    { method: 'GET', url: `/${name}/list.do`, function: findAll },
    { method: 'GET', url: `/${name}/detail.do`, function: findByPk },
    { method: 'POST', url: `/${name}/add.do`, function: create },
    { method: 'POST', url: `/${name}/edit.do`, function: editUser },
    { method: 'POST', url: `/${name}/delete.do`, function: destroyLogically },
];