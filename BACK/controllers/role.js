const name = "role";
const attributes = ['id', "name", "parentId", "description", "order"];

const Op = require('sequelize').Op;
const EasyControllerExample = require("../utils/easyController")

const models = require("../utils/scanModels");
const MainModel = models[name];

const MainControllerExample = new EasyControllerExample(MainModel, {
    NeedCheckIsDelete: true,
    attributes: attributes,
});


const findAll = async (ctx, next) => { await MainControllerExample.findAll(ctx, next) };
const findByPk = async (ctx, next) => { await MainControllerExample.findByPk(ctx, next) };
const create = async (ctx, next) => { await MainControllerExample.create(ctx, next) };
const update = async (ctx, next) => { await MainControllerExample.update(ctx, next) };
const destroy = async (ctx, next) => { await MainControllerExample.destroy(ctx, next) };
const destroyLogically = async (ctx, next) => { await MainControllerExample.destroyLogically(ctx, next) };

module.exports = [
    { method: 'GET', url: `/${name}/list.do`, function: findAll },
    { method: 'GET', url: `/${name}/detail.do`, function: findByPk },
    { method: 'POST', url: `/${name}/add.do`, function: create },
    { method: 'POST', url: `/${name}/edit.do`, function: update },
    // { method: 'POST', url: `/${name}/delete.do`, function: destroy },
    { method: 'POST', url: `/${name}/delete.do`, function: destroyLogically },
]