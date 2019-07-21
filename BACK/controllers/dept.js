const attributes = ['id', "name", "parentId", "type", "description", "order"];

const getStr = (strparams) => {
	return `
		SELECT
			${strparams.str_attriutes},
			t_parent.NAME parentName 
		FROM
			t_dept t
			LEFT JOIN t_dept t_parent ON t.parentId = t_parent.id 
		${strparams.str_where}
    `;
};

const findAll = async (ctx, next) => {
	let whereParam = { isDelete: 0 };
	let data = await ctx.xglobal.rawquery_list({ whereParam, attributes }, getStr, );
	ctx.response.body = { code: 1, data: data, };
};

const findByPk = async (ctx, next) => {
	let whereParam = { isDelete: 0, id: ctx.requestparam.id };
	let data = await ctx.xglobal.rawquery_one({ whereParam, attributes }, getStr, );
	ctx.response.body = { code: 1, data: data, };
};

const nameValidation = async (ctx, next) => {
	const models = ctx.xglobal.models;
	const Op = ctx.xglobal.Op;
	// 
	let name = ctx.requestparam.name;
	let id = ctx.requestparam.id;
	let whereParam = {};
	whereParam.isDelete = 0;
	whereParam.name = name;
	whereParam.id = {
		[Op.not]: id
	};
	let obj = await models.dept.findOne({
		where: whereParam
	});
	ctx.response.body = { code: 1, data: !(obj), msg: obj }
};

const create = async (ctx, next) => {
	const models = ctx.xglobal.models;
	// 
	// 取参数
	let param = ctx.requestparam;
	param.id = ctx.xtools.randomId();
	await models.dept.create(param);
	ctx.response.body = { code: 1, };
};

const update = async (ctx, next) => {
	const models = ctx.xglobal.models;
	// 
	let param = ctx.requestparam;
	let whereParam = { isDelete: 0, id: param.id, };
	await models.dept.update(param, { where: whereParam });
	ctx.response.body = { code: 1, };
};

const destroy = async (ctx, next) => {
	const models = ctx.xglobal.models;
	const Op = ctx.xglobal.Op;
	// 
	let whereParam = {
		id: {
			[Op.in]: ctx.requestparam.ids
		}
	};
	await models.dept.destroy({ where: whereParam });
	ctx.response.body = { code: 1, };
};

const destroyLogically = async (ctx, next) => {
	const models = ctx.xglobal.models;
	const Op = ctx.xglobal.Op;
	// 
	let whereParam = {
		id: {
			[Op.in]: ctx.requestparam.ids,
		},
		isDelete: 0
	};
	await models.dept.update({ isDelete: 1 }, { where: whereParam });
	ctx.response.body = { code: 1, };
};

module.exports = [
	{ method: 'GET', url: "/dept/nameValidation.do", function: nameValidation },
	// 
	{ method: 'GET', url: "/dept/list.do", function: findAll },
	{ method: 'GET', url: "/dept/detail.do", function: findByPk },
	{ method: 'POST', url: "/dept/add.do", function: create },
	{ method: 'POST', url: "/dept/edit.do", function: update },
	{ method: 'POST', url: "/dept/delete.do", function: destroyLogically },
];