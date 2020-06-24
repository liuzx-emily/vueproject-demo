const models = require("../initialization/scanModels")
const commonQuery = require('./utils/commonQuery')
const Op = require('sequelize').Op;
const tools = require('../utils/tools')

const attributes = ['id', "name", "description", "order"];

const skeleton = (strparams) => {
  return `
		SELECT
			${strparams.str_attriutes}
		FROM
			t_role t
		${strparams.str_where}
    ORDER BY t.order ASC
    `;
};

const findAll = async (ctx, next) => {
  let whereParam = { isDelete: 0, };
  let { data, count } = await commonQuery.listwithpaging({ whereParam, attributes, pagingParam: ctx.requestparam }, skeleton);
  ctx.response.body = { code: 1, data, count };
};

const findByPk = async (ctx, next) => {
  // 
  let roleId = ctx.requestparam.id;
  // -------------- 查找角色表 --------------
  let whereParam = { isDelete: 0, id: roleId };
  let role = await commonQuery.detail({ whereParam, attributes }, skeleton);
  // -------------- 查找角色-权限关联表 --------------
  let rolePermissionModel = models.role_permission;
  let rolePermissionRecordsList = await rolePermissionModel.findAll({ where: { roleId: roleId }, });
  let permissionIds = rolePermissionRecordsList.map(item => { return item.permissionId });
  // -------------- 拼到一起 --------------
  role.permissionIds = permissionIds;
  ctx.response.body = { code: 1, data: role, };
};

const create = async (ctx, next) => {
  // 
  let param = ctx.requestparam;
  let roleId = tools.randomId();
  // -------------- 新增角色表 --------------
  let createParam = {};
  for (let key in param) {
    if (attributes.includes(key) && key != "id") {
      createParam[key] = param[key];
    }
  }
  createParam.id = roleId;
  await models.role.create(createParam);
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
  ctx.response.body = { code: 1, };
};

const update = async (ctx, next) => {
  // 
  let param = ctx.requestparam;
  let roleId = param.id;
  // -------------- 更新角色表 --------------
  const role = await models.role.findByPk(roleId);
  await role.update(param, { fields: attributes });
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
  ctx.response.body = { code: 1, };
};

const destroy = async (ctx, next) => {
  let param = ctx.requestparam;
  let roleIds = param.ids;
  // -------------- 删除角色表 --------------
  await models.role.destroy({
    where: {
      id: {
        [Op.in]: roleIds
      }
    }
  });
  // -------------- 删除角色-权限关联表 --------------
  let rolePermissionModel = models.role_permission;
  await rolePermissionModel.destroy({
    where: {
      roleId: {
        [Op.in]: roleIds
      }
    }
  });
  ctx.response.body = { code: 1, };
};

module.exports = [
  { method: 'GET', url: "/role/list.do", function: findAll },
  { method: 'GET', url: "/role/detail.do", function: findByPk },
  { method: 'POST', url: "/role/add.do", function: create },
  { method: 'POST', url: "/role/edit.do", function: update },
  { method: 'POST', url: "/role/delete.do", function: destroy },
]