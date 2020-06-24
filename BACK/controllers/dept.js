const models = require("../initialization/scanModels")
const commonQuery = require('./utils/commonQuery')
const Op = require('sequelize').Op;
const tools = require('../utils/tools')

const attributes = ['id', "name", "parentId", "order"];

const skeleton = (strparams) => {
  return `
		SELECT
			${strparams.str_attriutes},
			( CASE WHEN t.parentId = '0' THEN '顶级' ELSE t_parent.NAME END ) parentName 
		FROM
			t_dept t
			LEFT JOIN t_dept t_parent ON t.parentId = t_parent.id 
		${strparams.str_where}
    `;
};

const getParentTree = async (ctx, next) => {
  let str;
  if (ctx.requestparam.id) {
    str = `SELECT id,name,parentId FROM t_dept WHERE 
    !FIND_IN_SET( id, org_findMyselfAndChildren('${ctx.requestparam.id}'))
    AND isDelete = 0`;
  } else {
    str = `SELECT id,name,parentId FROM t_dept WHERE isDelete = 0`;
  }
  let data = await commonQuery.query(str);
  ctx.response.body = { code: 1, data: data, };
};

const findAll = async (ctx, next) => {
  let whereParam = { isDelete: 0 };
  let data = await commonQuery.list({ whereParam, attributes }, skeleton);
  ctx.response.body = { code: 1, data: data, };
};

const findByPk = async (ctx, next) => {
  let whereParam = { isDelete: 0, id: ctx.requestparam.id };
  let data = await commonQuery.detail({ whereParam, attributes }, skeleton);
  ctx.response.body = { code: 1, data: data, };
};

const _validateName = async ({ id, name, parentId }) => {
  let str = `SELECT id,name  FROM t_dept WHERE NAME = '${name}' AND parentId = '${parentId}'`;
  if (id) {
    str += ` AND id != '${id}'`
  }
  let data = await commonQuery.query(str);
  return data.length === 0
};

const create = async (ctx, next) => {
  let param = ctx.requestparam;
  param.id = tools.randomId();

  await models.dept.create(param);
  ctx.response.body = { code: 1, };
};

const update = async (ctx, next) => {
  let param = ctx.requestparam;
  const validationFlag = await _validateName({ id: param.id, name: param.name, parentId: param.parentId })
  if (!validationFlag) {
    ctx.response.body = { code: 0, message: '同级下存在重名部门！' };
  } else {
    const obj = await models.dept.findByPk(param.id);
    await obj.update(param, { fields: attributes });
    ctx.response.body = { code: 1, };
  }
};

const destroy = async (ctx, next) => {
  let whereParam = {
    id: {
      [Op.in]: ctx.requestparam.ids
    }
  };
  await models.dept.destroy({ where: whereParam });
  ctx.response.body = { code: 1, };
};

const destroyLogically = async (ctx, next) => {
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
  { method: 'GET', url: "/dept/getParentTree", function: getParentTree },
  // 
  { method: 'GET', url: "/dept/list.do", function: findAll },
  { method: 'GET', url: "/dept/detail.do", function: findByPk },
  { method: 'POST', url: "/dept/add.do", function: create },
  { method: 'POST', url: "/dept/edit.do", function: update },
  { method: 'POST', url: "/dept/delete.do", function: destroyLogically },
];