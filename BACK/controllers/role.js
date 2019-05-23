const name = "role";
const attributes = ['id', "name", "parentId", "description", "order"];

const sequelize = require("../utils/initDatabase");
const Op = require('sequelize').Op;
const EasyControllerExample = require("../utils/easyController")
const uuid = require("uuid/v4")

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
    let str_where = arr_where.join(" and ");
    let str = `
    SELECT
        ${str_attriutes},
        t_parent.NAME parentName 
    FROM
        t_role t
        LEFT JOIN t_role t_parent ON t.parentId = t_parent.id 
    WHERE
        ${str_where}`;
    let result = await sequelize.query(str, { type: sequelize.QueryTypes.SELECT });
    return JSON.parse(JSON.stringify(result));
}

const findByPk = async (ctx, next) => {
    let roleId = ctx.query.id;
    // -------------- 查找角色表 --------------
    let whereParam = {};
    whereParam.isDelete = 0;
    whereParam.id = roleId;
    let data = (await rawQuery(whereParam))[0];
    // -------------- 查找角色-权限关联表 --------------
    let rolePermissionModel = models.role_permission;
    let rolePermissionRecordsList = await rolePermissionModel.findAll({ where: { roleId: roleId }, });
    let permissionIds = rolePermissionRecordsList.map(item => { return item.permissionId });
    // -------------- 拼到一起 --------------
    data.permissionIds = permissionIds;
    ctx.response.body = {
        code: 1,
        data: data,
    };
};

const create = async (ctx, next) => {
    let param = ctx.request.body;
    let roleId = uuid();
    // -------------- 新增角色表 --------------
    let createParam = {};
    for (let key in param) {
        if (attributes.includes(key) && key != "id") {
            createParam[key] = param[key];
        }
    }
    createParam.id = roleId;
    await MainModel.create(createParam);
    // -------------- 更新角色-权限关联表 --------------
    let rolePermissionModel = models.role_permission;
    let rolePermissionRecordsList = param.permissionIds.map(permissionId => {
        return {
            roleId: roleId,
            permissionId: permissionId
        }
    });
    await rolePermissionModel.destroy({ where: { roleId: roleId } });
    await rolePermissionModel.bulkCreate(rolePermissionRecordsList);
    ctx.response.body = {
        code: 1,
    };
};

const update = async (ctx, next) => {
    let param = ctx.request.body;
    let roleId = param.id;
    // -------------- 更新角色表 --------------
    let updateParam = {};
    for (let key in param) {
        if (attributes.includes(key) && key != "id") {
            updateParam[key] = param[key];
        }
    }
    let whereParam = {
        id: param.id,
        isDelete: 0
    };
    await MainModel.update(param, { where: whereParam });
    // -------------- 更新角色-权限关联表 --------------
    let rolePermissionModel = models.role_permission;
    let rolePermissionRecordsList = param.permissionIds.map(permissionId => {
        return {
            roleId: roleId,
            permissionId: permissionId
        }
    });
    await rolePermissionModel.destroy({ where: { roleId: roleId } });
    await rolePermissionModel.bulkCreate(rolePermissionRecordsList);
    ctx.response.body = {
        code: 1,
    };
};

const destroyLogically = async (ctx, next) => {
    let param = ctx.request.body;
    let roleId = param.id;
    // -------------- 删除角色表 --------------
    await MainModel.update({ isDelete: 1 }, { where: { id: roleId } });
    // -------------- 删除角色-权限关联表 --------------
    let rolePermissionModel = models.role_permission;
    await rolePermissionModel.destroy({ where: { roleId: roleId } });
    ctx.response.body = {
        code: 1,
    };
};
const findAll = async (ctx, next) => { await MainControllerExample.findAll(ctx, next) };
// const findByPk = async (ctx, next) => { await MainControllerExample.findByPk(ctx, next) };
// const create = async (ctx, next) => { await MainControllerExample.create(ctx, next) };
// const update = async (ctx, next) => { await MainControllerExample.update(ctx, next) };
const destroy = async (ctx, next) => { await MainControllerExample.destroy(ctx, next) };
// const destroyLogically = async (ctx, next) => { await MainControllerExample.destroyLogically(ctx, next) };

module.exports = [
    { method: 'GET', url: `/${name}/list.do`, function: findAll },
    { method: 'GET', url: `/${name}/detail.do`, function: findByPk },
    { method: 'POST', url: `/${name}/add.do`, function: create },
    { method: 'POST', url: `/${name}/edit.do`, function: update },
    { method: 'POST', url: `/${name}/delete.do`, function: destroyLogically },
]