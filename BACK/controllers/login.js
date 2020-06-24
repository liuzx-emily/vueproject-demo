const models = require("../initialization/scanModels")
const commonQuery = require('./utils/commonQuery')
const Op = require('sequelize').Op;

const bcryptUtils = require("./utils/bcryptUtils.js");
const svgCaptcha = require('svg-captcha');

const login = async (ctx, next) => {
  let params = ctx.requestparam;
  // if (params.validateCode != ctx.session.captcha) {
  //   ctx.response.body = { code: 0, message: "验证码错误！" };
  //   return;
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
  let userId = ctx.session.userId;
  let whereParam = { isDelete: 0, };
  let attributes = ["id", "username", "name", "profilePhoto"];
  let result = await models.user.findByPk(userId, { where: whereParam, attributes });
  ctx.response.body = { code: 1, data: result };
};

const getMenusAndBtns = async (ctx, next) => {
  let userId = ctx.session.userId;
  const sql = `
  SELECT
    t_permission.id,
    t_permission.name,
    t_permission.parentId,
    t_permission.showInNavigation,
    t_permission.isExternalLink,
    t_permission.icon,
    t_permission.code
  FROM
    t_permission
    INNER JOIN t_role_permission ON t_permission.id = t_role_permission.permissionId
    INNER JOIN t_user ON t_role_permission.roleId = t_user.roleId 
  WHERE
    t_user.id = '${userId}'
  ORDER BY
    t_permission.ORDER ASC`
  let data = await commonQuery.query(sql);
  ctx.response.body = { code: 1, data: data };
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
  { method: 'GET', url: `/captcha.nb`, function: getCaptcha },
  { method: 'POST', url: `/login.nb`, function: login },
  { method: 'POST', url: `/logout.do`, function: logout },
  { method: 'GET', url: `/userInfo.do`, function: userInfo },
  { method: 'GET', url: `/getMenusAndBtns.do`, function: getMenusAndBtns },
];