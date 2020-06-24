const models = require("../initialization/scanModels")
const commonQuery = require('./utils/commonQuery')
const Op = require('sequelize').Op;
const tools = require('../utils/tools')

const attributes = ["id", "username", "name", "deptId", "roleId", "email", "phone", "order", "profilePhoto", "temp1"];

const bcryptUtils = require("./utils/bcryptUtils.js");


const skeleton = (strparams) => {
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
  let { data, count } = await commonQuery.listwithpaging({ whereParam, attributes, pagingParam: ctx.requestparam }, skeleton);
  ctx.response.body = { code: 1, data, count };
};


const findByPk = async (ctx, next) => {
  let whereParam = { isDelete: 0, id: ctx.requestparam.id };
  let data = await commonQuery.detail({ whereParam, attributes }, skeleton);
  ctx.response.body = { code: 1, data: data, };
};

const create = async (ctx, next) => {
  // 取参数
  let param = ctx.requestparam;
  // 账号重名验证
  const obj = await models.user.findOne({ where: { isDelete: 0, username: ctx.requestparam.username } })
  if (obj) {
    ctx.response.body = { code: 0, message: "此账号已被使用！" };
  } else {
    param.id = tools.randomId();
    // 密码加密。demo中为了方便，把原始密码存在 temp1 字段中
    const password = param.password;
    param.password = await bcryptUtils.encryption(password);
    param.temp1 = password;
    await models.user.create(param);
    ctx.response.body = { code: 1, };
  }
};



const destroy = async (ctx, next) => {
  let whereParam = {
    id: {
      [Op.in]: ctx.requestparam.ids
    }
  };
  await models.user.destroy({ where: whereParam });
  ctx.response.body = { code: 1, };
};

const destroyLogically = async (ctx, next) => {
  let whereParam = {
    id: {
      [Op.in]: ctx.requestparam.ids,
    },
    isDelete: 0
  };
  await models.user.update({ isDelete: 1 }, { where: whereParam });
  ctx.response.body = { code: 1, };
};

const editUser = async (ctx, next) => {
  let updateParam = ctx.requestparam;
  const obj = await models.user.findByPk(updateParam.id);
  await obj.update(updateParam, { fields: ["name", "deptId", "roleId", "email", "phone", "order", "profilePhoto"] });
  ctx.response.body = { code: 1, };
};

const resetPassword = async (ctx, next) => {
  const password = ctx.requestparam.password;
  let updateParam = {
    password: await bcryptUtils.encryption(password),
    temp1: password,
  };
  const user = await models.user.findByPk(ctx.requestparam.id);
  await user.update(updateParam, { fields: ["password", "temp1"] });
  ctx.response.body = { code: 1, };
};

const changePassword = async (ctx, next) => {
  // 
  let params = ctx.requestparam;
  const user = await models.user.findByPk(params.id);
  const flag = await bcryptUtils.compare(params.old, user.password);
  if (flag) {
    const password = params.new;
    let updateParam = {
      password: await bcryptUtils.encryption(password),
      temp1: password,
    };
    await user.update(updateParam, { fields: ["password", "temp1"] });
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