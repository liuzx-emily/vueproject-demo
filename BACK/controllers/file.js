const tools = require('../utils/tools')
const models = require("../initialization/scanModels")
const fileUtils = require("./utils/fileUtils.js");
const send = require('koa-send');

const upload = async (ctx, next) => {
  // 获取上传文件 size, path, name, type mtime
  const file = ctx.request.files.file;
  const fileId = tools.randomId();
  let param = {
    id: fileId,
    name: file.name,
    path: file.path,
    size: file.size,
  };
  await models.file.create(param);
  ctx.response.body = { code: 1, data: fileId };
};

const download = async (ctx, next) => {
  const fileId = ctx.requestparam.id;
  const filePath = (await fileUtils.getFileRecord(ctx, { fileId })).path;
  ctx.attachment(filePath);
  // 我们的filePath是绝对路径，所以必须将root设置为"/"（root默认为空字符串）
  await send(ctx, filePath, { root: "/" });
};

module.exports = [
  { uploadFile: true, url: `/upload.do`, function: upload, },
  { method: 'GET', url: `/download.do`, function: download, },
];