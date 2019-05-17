const name = "district";
const attributes = undefined;

const Op = require('sequelize').Op;
const EasyControllerExample = require("../utils/easyController")

const models = require("../utils/scanModels");
const MainModel = models[name];

const MainControllerExample = new EasyControllerExample(MainModel, {
    NeedCheckIsDelete: false,
    attributes: attributes,
});

const getLevelOneList = async (ctx, next) => {
    let result = await MainModel.findAll({
        where: {
            parentId: 0
        }
    });
    ctx.response.body = {
        code: 1,
        data: result,
    };
};

const getByParentCode = async (ctx, next) => {
    let parentCode = ctx.query.parentCode;
    let parentEle = await MainModel.findOne({
        where: {
            code: parentCode
        }
    });
    let parentId = parentEle.id;
    let result = await MainModel.findAll({
        where: {
            parentId: parentId
        }
    });
    ctx.response.body = {
        code: 1,
        data: result,
    };
};

const getByParentName = async (ctx, next) => {
    let parentName = ctx.query.parentName;
    let parentEle = await MainModel.findOne({
        where: {
            name: parentName
        }
    });
    let parentId = parentEle.id;
    let result = await MainModel.findAll({
        where: {
            parentId: parentId
        }
    });
    ctx.response.body = {
        code: 1,
        data: result,
    };
};

const findAll = async (ctx, next) => { await MainControllerExample.findAll(ctx, next) };
const findByPk = async (ctx, next) => { await MainControllerExample.findByPk(ctx, next) };
const create = async (ctx, next) => { await MainControllerExample.create(ctx, next) };
const update = async (ctx, next) => { await MainControllerExample.update(ctx, next) };
const destroy = async (ctx, next) => { await MainControllerExample.destroy(ctx, next) };
const destroyLogically = async (ctx, next) => { await MainControllerExample.destroyLogically(ctx, next) };

module.exports = [
    /*
    { method: 'GET', url: `/${name}/list.do`, function: findAll },
    { method: 'GET', url: `/${name}/detail.do`, function: findByPk },
    { method: 'POST', url: `/${name}/add.do`, function: create },
    { method: 'POST', url: `/${name}/edit.do`, function: update },
    // { method: 'POST', url: `/${name}/delete.do`, function: destroy },
    { method: 'POST', url: `/${name}/delete.do`, function: destroyLogically },
    */
    { method: 'GET', url: `/${name}/getLevelOneList.do`, function: getLevelOneList },
    { method: 'GET', url: `/${name}/getByParentCode.do`, function: getByParentCode },
    { method: 'GET', url: `/${name}/getByParentName.do`, function: getByParentName },
]