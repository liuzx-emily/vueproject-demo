const attributes = ["id", "username", "name", "deptId", "roleId", "email", "phone", "order", "profilePhoto"];

const bcryptUtils = require("./utils/bcryptUtils.js");


const getStr = (strparams) => {
	return `
    SELECT
        ${strparams.str_attriutes},
        t_dept.NAME deptName,
        t_role.NAME roleName
    FROM
        t_user t
        LEFT JOIN t_dept on t.deptId=t_dept.id
        LEFT JOIN t_role on t.roleId=t_role.id
    ${strparams.str_where}
    ORDER BY t.order ASC
    ${strparams.str_paging}
    `;
};

const findAll = async (ctx, next) => {
	const Op = ctx.xglobal.Op;
	// 
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
	let { data, count } = await ctx.xglobal.rawquery_listwithpaging({ whereParam, pagingParam, attributes, }, getStr, );
	ctx.response.body = { code: 1, data: data, count: count, session: ctx.session };
};


const findByPk = async (ctx, next) => {
	let whereParam = { isDelete: 0, id: ctx.requestparam.id };
	let data = await ctx.xglobal.rawquery_one({ whereParam, attributes }, getStr, );
	ctx.response.body = { code: 1, data: data, };
};

const create = async (ctx, next) => {
	const models = ctx.xglobal.models;
	// 
	// 取参数
	let param = ctx.requestparam;
	param.id = ctx.xtools.randomId();
	const password = param.password;
	param.password = await bcryptUtils.encryption(password);
	param.temp1 = password;
	await models.user.create(param);
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
	await models.user.destroy({ where: whereParam });
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
	await models.user.update({ isDelete: 1 }, { where: whereParam });
	ctx.response.body = { code: 1, };
};

// --------------------------------------------------------

const update = async (id, updateParam) => {
	const models = ctx.xglobal.models;
	// 
	const whereParam = { isDelete: 0, id: id, };
	const res = await models.user.update(updateParam, { where: whereParam });
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
	const models = ctx.xglobal.models;
	// 
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
	{ method: 'POST', url: "/user/changePassword.do", function: changePassword },
	{ method: 'POST', url: "/user/resetPassword.do", function: resetPassword },
	// 
	{ method: 'GET', url: "/user/list.do", function: findAll },
	{ method: 'GET', url: "/user/detail.do", function: findByPk },
	{ method: 'POST', url: "/user/add.do", function: create },
	{ method: 'POST', url: "/user/edit.do", function: editUser },
	{ method: 'POST', url: "/user/delete.do", function: destroyLogically },
];