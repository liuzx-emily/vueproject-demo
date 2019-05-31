const name = "district";
const attributes = undefined;

const sequelize = require("../utils/initDatabase");
const Op = require('sequelize').Op;
const uuid = require("uuid/v4");
const models = require("../utils/scanModels");

const MainModel = models[name];

const getLevelOneList = async (ctx, next) => {
    let result = await MainModel.findAll({ where: { parentId: 0 } });
    ctx.response.body = { code: 1, data: result, };
};

const getByParentCode = async (ctx, next) => {
    let parentCode = ctx.query.parentCode;
    let parentEle = await MainModel.findOne({ where: { code: parentCode } });
    let parentId = parentEle.id;
    let result = await MainModel.findAll({ where: { parentId: parentId } });
    ctx.response.body = { code: 1, data: result, };
};

const getByParentName = async (ctx, next) => {
    let parentName = ctx.query.parentName;
    let parentEle = await MainModel.findOne({ where: { name: parentName } });
    let parentId = parentEle.id;
    let result = await MainModel.findAll({ where: { parentId: parentId } });
    ctx.response.body = { code: 1, data: result, };
};

module.exports = [
    { method: 'GET', url: `/${name}/getLevelOneList.do`, function: getLevelOneList },
    { method: 'GET', url: `/${name}/getByParentCode.do`, function: getByParentCode },
    { method: 'GET', url: `/${name}/getByParentName.do`, function: getByParentName },
]