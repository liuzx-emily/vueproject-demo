const attributes = ['id', "name", "parentId", "description", "order"];

const getStr = (strparams) => {
	return `
		SELECT
			${strparams.str_attriutes},
			t_parent.NAME parentName 
		FROM
			t_role t
			LEFT JOIN t_role t_parent ON t.parentId = t_parent.id 
		${strparams.str_where}
    `;
};

const findAll = async (ctx, next) => {
	let whereParam = { isDelete: 0 };
	let data = await ctx.xglobal.rawquery_list({ whereParam, attributes }, getStr, );
	ctx.response.body = { code: 1, data: data, };
};

const findByPk = async (ctx, next) => {
	const models = ctx.xglobal.models;
	// 
	let roleId = ctx.requestparam.id;
	// -------------- 查找角色表 --------------
	let whereParam = {};
	whereParam.isDelete = 0;
	whereParam.id = roleId;
	let data = await ctx.xglobal.rawquery_one({ whereParam, attributes }, getStr, );
	// -------------- 查找角色-权限关联表 --------------
	let rolePermissionModel = models.role_permission;
	let rolePermissionRecordsList = await rolePermissionModel.findAll({ where: { roleId: roleId }, });
	let permissionIds = rolePermissionRecordsList.map(item => { return item.permissionId });
	// -------------- 拼到一起 --------------
	data.permissionIds = permissionIds;
	ctx.response.body = { code: 1, data: data, };
};

const create = async (ctx, next) => {
	const models = ctx.xglobal.models;
	// 
	let param = ctx.requestparam;
	let roleId = ctx.xtools.randomId();
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
	const models = ctx.xglobal.models;
	// 
	let param = ctx.requestparam;
	let roleId = param.id;
	// -------------- 更新角色表 --------------
	let updateParam = {};
	for (let key in param) {
		if (attributes.includes(key) && key != "id") {
			updateParam[key] = param[key];
		}
	}
	let whereParam = { id: param.id, isDelete: 0 };
	await models.role.update(param, { where: whereParam });
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

const destroyLogically = async (ctx, next) => {
	const models = ctx.xglobal.models;
	const Op = ctx.xglobal.Op;
	// 
	let param = ctx.requestparam;
	let roleIds = param.ids;
	// -------------- 删除角色表 --------------
	await models.role.update({ isDelete: 1 }, {
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
	{ method: 'POST', url: "/role/delete.do", function: destroyLogically },
]