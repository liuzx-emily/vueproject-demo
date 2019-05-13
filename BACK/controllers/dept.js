const Op = require('sequelize').Op;
const EasyControllerExample = require("../utils/easyController")

const models = require("../utils/scanModels");
const Dept = models.dept;

const attributes = ['id', "name", "parentId", "type", "description", "order"];

const DeptController = new EasyControllerExample(Dept, {
    NeedCheckIsDelete: true,
    attributes: undefined,
});

const findAll = async (ctx, next) => {
    let whereParam = {};
    whereParam.isDelete = 0;
    let result = await Dept.findAll({
        attributes: attributes,
        where: whereParam,
        order: [
            ["order", 'asc']
        ],
    });
    let data = [];
    for (let i = 0; i < result.length; i++) {
        let obj = copyByAttributes(result[i]);
        obj.parentName = await getParentName(obj.parentId);
        data.push(obj);
    }
    ctx.response.body = {
        code: 1,
        data: data,
    };
};

const findByPk = async (ctx, next) => {
    let id = ctx.query.id;
    let whereParam = {};
    whereParam.isDelete = 0;
    let result = await Dept.findByPk(id, {
        where: whereParam
    });
    let obj = copyByAttributes(result);
    obj.parentName = await getParentName(obj.parentId);
    ctx.response.body = {
        code: 1,
        data: obj,
    };
};

const nameValidation = async (ctx, next) => {
    let name = ctx.query.name;
    let id = ctx.query.id;
    let whereParam = {};
    whereParam.isDelete = 0;
    whereParam.name = name;
    whereParam.id = {
        [Op.not]: id
    };
    let obj = await Dept.findOne({
        where: whereParam
    });
    ctx.response.body = {
        code: 1,
        data: !(obj),
        msg: obj
    }
};

// 不能这样简单赋值。因为这样的话,findAll内部的this是undefined。【为什么this会丢还不知道】
// const findAll = DeptController.findAll;
// const findAll = async (ctx, next) => { await DeptController.findAll(ctx, next) };
// const findByPk = async (ctx, next) => { await DeptController.findByPk(ctx, next) };
const create = async (ctx, next) => { await DeptController.create(ctx, next) };
const update = async (ctx, next) => { await DeptController.update(ctx, next) };
const destroy = async (ctx, next) => { await DeptController.destroy(ctx, next) };
const destroyLogically = async (ctx, next) => { await DeptController.destroyLogically(ctx, next) };

module.exports = [
    { method: 'GET', url: "/dept/list.do", function: findAll },
    { method: 'GET', url: "/dept/detail.do", function: findByPk },
    { method: 'POST', url: "/dept/add.do", function: create },
    { method: 'POST', url: "/dept/edit.do", function: update },
    // { method: 'POST', url: "/dept/delete.do", function: destroy },
    { method: 'POST', url: "/dept/delete.do", function: destroyLogically },
    { method: 'GET', url: "/dept/nameValidation.do", function: nameValidation },
];

// utils
const copyByAttributes = (origin) => {
    let obj = {};
    attributes.forEach(key => {
        obj[key] = origin[key];
    });
    return obj;
};
const getParentName = async (parentId) => {
    let parent = await Dept.findByPk(parentId);
    let parentName;
    if (parent) {
        parentName = parent.name;
    } else {
        parentName = "顶级";
    }
    return parentName;
};