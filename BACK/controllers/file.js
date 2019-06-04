const name = "file";
const attributes = ["id", "name", "size", "path"];

const fs = require('fs');
const uuid = require("uuid/v4");
const models = require("../utils/scanModels");
const fileUtils = require("./utils/fileUtils.js");
const send = require('koa-send');

const MainModel = models[name];

const upload = async (ctx, next) => {
    // 获取上传文件 size, path, name, type mtime
    const file = ctx.request.files.file;
    const fileId = uuid();
    let param = {
        id: fileId,
        name: file.name,
        path: file.path,
        size: file.size,
    };
    await MainModel.create(param);
    ctx.response.body = { code: 1, data: fileId };
};

const download = async (ctx, next) => {
    const fileId = ctx.query.id;
    const filePath = (await fileUtils.getFileRecord({ fileId })).path;
    ctx.attachment(filePath);
    // 我们的filePath是绝对路径，所以必须将root设置为"/"（root默认为空字符串）
    await send(ctx, filePath, { root: "/" });
};



module.exports = [
    { method: 'POST', url: `/upload.do`, function: upload, koaBody: true },
    { method: 'GET', url: `/download.do`, function: download, },
];