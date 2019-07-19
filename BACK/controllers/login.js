const sequelize = require("../initialization/initDatabase");
const Op = require('sequelize').Op;
const uuid = require("uuid/v4");
const models = require("../utils/scanModels");
const rawQueryUtils = require("./utils/rawQueryUtils.js");
const bcryptUtils = require("./utils/bcryptUtils.js");

const svgCaptcha = require('svg-captcha');

const WebSocket = require('ws');

const login = async (ctx, next) => {
	let params = ctx.requestparam;
	// if (params.validateCode != ctx.session.captcha) {
	//     ctx.response.body = { code: 0, message: "验证码错误！" };
	//     return;
	// }
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
			// global.ws.broadcast(`广播广播！有人尝试登录账号:${params.username}`)
			ctx.response.body = { code: 0, message: "账号、密码错误！" };
		}
	} else {
		ctx.response.body = { code: 0, message: "账号不存在！" };
	}
};

const logout = async (ctx, next) => {
	// let userId = ctx.session.userId;
	ctx.session.userId = null;
	ctx.response.body = { code: 1 };
};

const userInfo = async (ctx, next) => {
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

const getMenus = async (ctx, nect) => {
	let whereParam = { isDelete: 0 };
	whereParam.type = {
		[Op.not]: 3
	};
	let orderParam = [
		["order", 'ASC']
	];
	let data = await models.permission.findAll({ where: whereParam, order: orderParam });
	ctx.response.body = { code: 1, data: data, };
};

const getBtns = async (ctx, nect) => {
	let whereParam = { isDelete: 0, type: 3 };
	let orderParam = [
		["order", 'ASC']
	];
	let data = await models.permission.findAll({ where: whereParam, order: orderParam });
	ctx.response.body = { code: 1, data: data, };
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
};


module.exports = [
	{ method: 'GET', url: `/captcha.do`, function: getCaptcha },
	{ method: 'POST', url: `/login.do`, function: login },
	{ method: 'POST', url: `/logout.do`, function: logout },
	{ method: 'GET', url: `/userInfo.do`, function: userInfo },
	{ method: 'GET', url: `/getMenus.do`, function: getMenus },
	{ method: 'GET', url: `/getBtns.do`, function: getBtns },
];