const fs = require("fs");
const router = require('koa-router')();

// 用 koa-body 中间件来处理文件上传，它可以将请求体拼到 ctx.request 中
const koaBody = require('koa-body');

const path = require('path');

fs.readdirSync("./controllers").filter(fileName => {
    return fileName.endsWith(".js");
}).forEach(fileName => {
    require('../controllers/' + fileName).forEach(item => {
        switch (item.method) {
            case "GET":
                router.get(item.url, item.function);
                break;
            case "POST":
                if (item.koaBody) {
                    router.post(item.url, koaBody({
                        multipart: true, // 支持文件上传
                        encoding: 'gzip',
                        formidable: {
                            uploadDir: path.join(process.cwd(), '../upload/'), // 设置文件上传目录
                            keepExtensions: true, // 保持文件的后缀
                            maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小
                            onFileBegin: (name, file) => { // 文件上传前的设置
                                // console.log(`name: ${name}`);
                                // console.log(file);
                            },
                        }
                    }), item.function);
                } else {
                    router.post(item.url, item.function);
                }
                break;
        }
    });
});

module.exports = router;