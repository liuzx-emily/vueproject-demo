const bcryptUtils = require("./utils/bcryptUtils.js");
const svgCaptcha = require('svg-captcha');

const login = async (ctx, next) => {
	const models = ctx.xglobal.models;
	// 
	let params = ctx.requestparam;
	if (params.validateCode != ctx.session.captcha) {
		ctx.response.body = { code: 0, message: "验证码错误！" };
		return;
	}
	let whereParam = {
		isDelete: 0,
		username: params.username,
	};
	let result = await models.user.findOne({ where: whereParam });
	if (result) {
		const flag = await bcryptUtils.compare(params.password, result.password);
		if (flag) {
			// 存用户信息
			ctx.session.userId = result.id;
			ctx.response.body = { code: 1 };
		} else {
			ctx.response.body = { code: 0, message: "账号、密码错误！" };
		}
	} else {
		ctx.response.body = { code: 0, message: "账号不存在！" };
	}
};

const logout = async (ctx, next) => {
	ctx.session.userId = null;
	ctx.response.body = { code: 1 };
};

const userInfo = async (ctx, next) => {
	const models = ctx.xglobal.models;
	// 
	let userId = ctx.session.userId;
	if (userId) {
		// 存用户信息
		let whereParam = { isDelete: 0, };
		let attributes = ["id", "username", "name", "profilePhoto"];
		let result = await models.user.findByPk(userId, { where: whereParam, attributes });
		ctx.response.body = { code: 1, data: result };
	} else {
		ctx.response.body = { code: 0, message: "登录失效" };
	}
};


const getMenusAndBtns = async (ctx, next) => {
	const models = ctx.xglobal.models;
	const Op = ctx.xglobal.Op;

	let orderParam = [
		["order", 'ASC']
	];
	// menus
	let whereParam_menus = { isDelete: 0};
	whereParam_menus.type = {
		[Op.not]: 3
	};
	let menus = await models.permission.findAll({ where: whereParam_menus, order: orderParam });
	// menus中每一项都是一个class实例，楞添属性的话，前台接收不到。所以先转成普通object
	// menus = JSON.parse(JSON.stringify(menus));
	// menus.forEach(item => {
	// 	item.isPage = false;
	// });


	// menus.unshift({ icon: "fire", id: 871, isPage: true, name: "门户" })
	// btns
	let btns = await models.permission.findAll({
		where: { isDelete: 0, type: 3,  },
		order: orderParam
	});
	ctx.response.body = { code: 1, data: { menus: menus, btns: btns, } };
};

// 获取验证码
const getCaptcha = async (ctx, next) => {
	const captcha = svgCaptcha.create({
		width: 150,
		height: 45,
		fontSize: 60,
		background: "#f5f5f5",
		ignoreChars: "01ilo",
		// 噪声线条数  
		noise: 2,
	});
	ctx.session.captcha = captcha.text.toLowerCase();
	ctx.response.type = "image/svg+xml";
	ctx.body = captcha.data;
	// ctx.xglobal.ws.broadcast(`有人在刷新验证码！`);
};


module.exports = [
	{ method: 'GET', url: `/captcha.do`, function: getCaptcha },
	{ method: 'POST', url: `/login.do`, function: login },
	{ method: 'POST', url: `/logout.do`, function: logout },
	{ method: 'GET', url: `/userInfo.do`, function: userInfo },
	{ method: 'GET', url: `/getMenusAndBtns.do`, function: getMenusAndBtns },
];