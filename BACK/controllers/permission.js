const attributes = ['id', "name", "parentId", "type", "code", "icon", "order", ];

// 涉及到多个表，自动手动拼sql比较方便
const getStr = (strparams) => {
	return `
    SELECT
        ${strparams.str_attriutes},
        t_parent.name parentName 
    FROM
        t_permission t
        LEFT JOIN t_permission t_parent ON t.parentId = t_parent.id 
    ${strparams.str_where}
    ORDER BY t.order ASC
    `;
};

const findAll = async (ctx, nect) => {
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
	let obj = await models.permission.findOne({ where: whereParam });
	ctx.response.body = { code: 1, data: !(obj), msg: obj };
};

const create = async (ctx, next) => {
	const models = ctx.xglobal.models;
	// 
	// 取参数
	let param = ctx.requestparam;
	// param.id = uuid();
	await models.permission.create(param);
	ctx.response.body = { code: 1, };
};

const update = async (ctx, next) => {
	const models = ctx.xglobal.models;
	// 
	let param = ctx.requestparam;
	let whereParam = { isDelete: 0, id: param.id, };
	await models.permission.update(param, { where: whereParam });
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
	await models.permission.destroy({ where: whereParam });
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
	await models.permission.update({ isDelete: 1 }, { where: whereParam });
	ctx.response.body = { code: 1, };
};

module.exports = [
	{ method: 'GET', url: "/permission/nameValidation.do", function: nameValidation },
	// 
	{ method: 'GET', url: "/permission/list.do", function: findAll },
	{ method: 'GET', url: "/permission/detail.do", function: findByPk },
	{ method: 'POST', url: "/permission/add.do", function: create },
	{ method: 'POST', url: "/permission/edit.do", function: update },
	{ method: 'POST', url: "/permission/delete.do", function: destroyLogically },
];