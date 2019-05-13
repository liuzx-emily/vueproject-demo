const Op = require('sequelize').Op;
const EasyControllerExample = require("../utils/easyController")
const models = require("../utils/scanModels");

const Permission = models.permission;

const attributes = ['id', "name", "parentId", "type", "code", "icon", "order", "description", ];

const PermissionController = new EasyControllerExample(Permission, {
    NeedCheckIsDelete: true,
    attributes: undefined
});


const findAll = async (ctx, nect) => {
    let whereParam = {};
    whereParam.isDelete = 0;
    let result = await Permission.findAll({
        where: whereParam,
        attributes: attributes,
        order: [
            ['order', 'asc']
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
    let result = await Permission.findByPk(id, {
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
    let obj = await Permission.findOne({
        where: whereParam
    });
    ctx.response.body = {
        code: 1,
        data: !(obj),
        msg: obj
    }
};

const create = async (ctx, next) => {
    // 取参数
    let param = ctx.request.body;
    // param.id = uuid();
    await Permission.create(param).then(data => {
        ctx.response.body = {
            code: 1,
        };
    }).catch(err => {
        console.error(err);
        ctx.response.body = { code: -1 };
    });
};


// 不能这样简单赋值。因为这样的话,findAll内部的this是undefined。【为什么this会丢还不知道】
// const findAll = PermissionController.findAll;

// const findAll = async (ctx, next) => { await PermissionController.findAll(ctx, next) };
// const findByPk = async (ctx, next) => { await PermissionController.findByPk(ctx, next) };
// const create = async (ctx, next) => { await PermissionController.create(ctx, next) };
const update = async (ctx, next) => { await PermissionController.update(ctx, next) };
const destroy = async (ctx, next) => { await PermissionController.destroy(ctx, next) };
const destroyLogically = async (ctx, next) => { await PermissionController.destroyLogically(ctx, next) };

module.exports = [
    { method: 'GET', url: "/permission/list.do", function: findAll },
    { method: 'GET', url: "/permission/detail.do", function: findByPk },
    { method: 'POST', url: "/permission/add.do", function: create },
    { method: 'POST', url: "/permission/edit.do", function: update },
    // { method: 'POST', url: "/permission/delete.do", function: destroy },
    { method: 'POST', url: "/permission/delete.do", function: destroyLogically },
    { method: 'GET', url: "/permission/nameValidation.do", function: nameValidation },
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
    let parent = await Permission.findByPk(parentId);
    let parentName;
    if (parent) {
        parentName = parent.name;
    } else {
        parentName = "顶级";
    }
    return parentName;
};