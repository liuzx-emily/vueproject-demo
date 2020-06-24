const models = require("../initialization/scanModels")
const commonQuery = require('./utils/commonQuery')
const Op = require('sequelize').Op;

const attributes = ['id', "name", "parentId", "showInNavigation", "isExternalLink", "code", "icon", "order",]

// 涉及到多个表，手动拼sql比较方便
const skeleton = (strparams) => {
  return `
    SELECT
        ${strparams.str_attriutes},
        ( CASE WHEN t.parentId = '0' THEN '顶级' ELSE t_parent.NAME END ) parentName 
    FROM
        t_permission t
        LEFT JOIN t_permission t_parent ON t.parentId = t_parent.id 
    ${strparams.str_where}
    ORDER BY t.order ASC
    `;
};

const getParentTree = async (ctx, next) => {
  let str;
  if (ctx.requestparam.id) {
    str = `SELECT id,name,parentId FROM t_permission WHERE 
    !FIND_IN_SET( id, permission_findMyselfAndChildren(${ctx.requestparam.id}))
    AND NOT ( showInNavigation = 1 AND isExternalLink = 1 ) 
    AND isDelete = 0`;
  } else {
    str = `SELECT id,name,parentId FROM t_permission WHERE 
    NOT ( showInNavigation = 1 AND isExternalLink = 1 ) 
    AND isDelete = 0`;
  }
  str += ' ORDER BY `order` ASC' // 因为 order 是关键字，所以要用反引号括起来
  let data = await commonQuery.query(str);
  ctx.response.body = { code: 1, data: data, };
};

const findAll = async (ctx, next) => {
  let whereParam = { isDelete: 0, };
  let data = await commonQuery.list({ whereParam, attributes }, skeleton);
  ctx.response.body = { code: 1, data: data, };
};

const findByPk = async (ctx, next) => {
  let whereParam = { isDelete: 0, id: ctx.requestparam.id };
  let data = await commonQuery.detail({ whereParam, attributes }, skeleton);
  ctx.response.body = { code: 1, data: data, };
};

const create = async (ctx, next) => {
  let param = ctx.requestparam;
  await models.permission.create(param);
  ctx.response.body = { code: 1, };
};

const update = async (ctx, next) => {
  let param = ctx.requestparam;
  const obj = await models.permission.findByPk(param.id);
  await obj.update(param, { fields: attributes });
  ctx.response.body = { code: 1, };
};

const destroy = async (ctx, next) => {
  let whereParam = {
    id: {
      [Op.in]: ctx.requestparam.ids
    }
  };
  await models.permission.destroy({ where: whereParam });
  ctx.response.body = { code: 1, };
};

module.exports = [
  { method: 'GET', url: "/permission/getParentTree", function: getParentTree },
  { method: 'GET', url: "/permission/list.do", function: findAll },
  { method: 'GET', url: "/permission/detail.do", function: findByPk },
  { method: 'POST', url: "/permission/add.do", function: create },
  { method: 'POST', url: "/permission/edit.do", function: update },
  { method: 'POST', url: "/permission/delete.do", function: destroy },
];