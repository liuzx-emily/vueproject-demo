const name = "role";
const EasyControllerExample = require("../utils/easyController")

const models = require("../utils/scanModels");
const Role = models.role;

const RoleController = new EasyControllerExample(Role, {
    NeedCheckIsDelete: true,
    attributes: ['id', "name", "parentId",  "description", "order"],
});


// 不能这样简单赋值。因为这样的话,findAll内部的this是undefined。【为什么this会丢还不知道】
// const findAll = RoleController.findAll;


const findAll = async (ctx, next) => { await RoleController.findAll(ctx, next) };
const findByPk = async (ctx, next) => { await RoleController.findByPk(ctx, next) };
const create = async (ctx, next) => { await RoleController.create(ctx, next) };
const update = async (ctx, next) => { await RoleController.update(ctx, next) };
const destroy = async (ctx, next) => { await RoleController.destroy(ctx, next) };
const destroyLogically = async (ctx, next) => { await RoleController.destroyLogically(ctx, next) };

module.exports = [
    { method: 'GET', url: `/${name}/list.do`, function: findAll },
    { method: 'GET', url: `/${name}/detail.do`, function: findByPk },
    { method: 'POST', url: `/${name}/add.do`, function: create },
    { method: 'POST', url: `/${name}/edit.do`, function: update },
    // { method: 'POST', url: `/${name}/delete.do`, function: destroy },
    { method: 'POST', url: `/${name}/delete.do`, function: destroyLogically },
]