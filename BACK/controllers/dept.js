const EasyControllerExample = require("../utils/easyController")

const models = require("../utils/scanModels");
const Dept = models.dept;

const DeptController = new EasyControllerExample(Dept, {
    NeedCheckIsDelete:true,
    attributes: ['id', "name", "parentId", "type", "description", "order"],
});


// 不能这样简单赋值。因为这样的话,findAll内部的this是undefined。【为什么this会丢还不知道】
// const findAll = DeptController.findAll;


const findAll = async (ctx, next) => { await DeptController.findAll(ctx, next) };
const findByPk = async (ctx, next) => { await DeptController.findByPk(ctx, next) };
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
]