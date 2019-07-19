const name = "magiccomponent";
const attributes = ['id', "parentId", "contentId", "x", "y", "width", "height", "title","content", "backgroundType", "backgroundColor",
    "backgroundImgUrl", "borderRadius", "borderStyle", "borderColor", "borderWidth",
];

const sequelize = require("../initialization/initDatabase");
const Op = require('sequelize').Op;
const uuid = require("uuid/v4");
const models = require("../utils/scanModels");
const rawQueryUtils = require("./utils/rawQueryUtils.js");

const MainModel = models[name];

const findAll = async (ctx, next) => {
    const contentId = ctx.requestparam.contentId;
    let data = await MainModel.findAll({
        attributes: attributes,
        where: { contentId: contentId }
    });
    ctx.response.body = { code: 1, data: data, };
};

const saveAll = async (ctx, next) => {
    const contentId = ctx.requestparam.contentId;
    // 删除所有
    await MainModel.destroy({ where: { contentId: contentId } });
    // 存储所有
    let list = ctx.requestparam.list;
    await save(list, "0", contentId);
    ctx.response.body = { code: 1, };
};

const save = async (list, parentId, contentId) => {
    list = list || [];
    for (let i = 0; i < list.length; i++) {
        let data = list[i];
        if (!data.isDelete) {
            let param = {};
            attributes.map(key => {
                if (data[key]) {
                    param[key] = data[key];
                }
            });
            const id = uuid();
            param.id = id;
            param.parentId = parentId;
            param.contentId = contentId;
            await MainModel.create(param);
            await save(data.list, id, contentId);
        }
    }
};

const save2 = async (data, parentId, contentId) => {
    let param = {};
    attributes.map(key => {
        if (data[key]) {
            param[key] = data[key];
        }
    });
    param.id = uuid();
    param.parentId = parentId;
    param.contentId = contentId;
    await MainModel.create(param);
    data.list = data.list || [];
    for (let i = 0; i < data.list.length; i++) {
        await save(data.list[i], param.id, contentId);
    }
};

module.exports = [
    { method: 'GET', url: `/${name}/list.do`, function: findAll },
    { method: 'POST', url: `/${name}/saveAll.do`, function: saveAll },
];