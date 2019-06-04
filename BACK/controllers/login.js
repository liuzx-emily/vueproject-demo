const sequelize = require("../utils/initDatabase");
const Op = require('sequelize').Op;
const uuid = require("uuid/v4");
const models = require("../utils/scanModels");
const rawQueryUtils = require("./utils/rawQueryUtils.js");

const svgCaptcha = require('svg-captcha');



const login = async (ctx, next) => {
    let params = ctx.request.body;
    if (params.validateCode != ctx.session.captcha) {
        ctx.response.body = { code: 0, message: "验证码错误！" };
        return;
    }
    let whereParam = {
        isDelete: 0,
        username: params.username,
        password: params.password,
    };
    let result = await models.user.findAll({ where: whereParam });
    if (result.length > 0) {
        // 存用户信息
        ctx.session.userId = result[0].id;
        ctx.response.body = { code: 1 };
    } else {
        ctx.response.body = { code: 0, message: "账号、密码错误！" };
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
        let attributes = ["id", "username", "name"];
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