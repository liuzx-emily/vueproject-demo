const fs = require("fs");
const router = require('koa-router')();

fs.readdirSync("./controllers").filter(fileName => {
    return fileName.endsWith(".js");
}).forEach(fileName => {
    require('../controllers/' + fileName).forEach(item => {
        switch (item.method) {
            case "GET":
                router.get(item.url, item.function);
                // console.log("注册GET方法：" + item.url);
                break;
            case "POST":
                router.post(item.url, item.function);
                // console.log("注册POST方法：" + item.url);
                break;
        }
    });
});

module.exports = router;