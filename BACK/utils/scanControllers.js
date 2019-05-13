const fs = require("fs");
const router = require('koa-router')();

fs.readdirSync("./controllers").filter(fileName => {
    return fileName.endsWith(".js");
}).forEach(fileName => {
    require('../controllers/' + fileName).forEach(item => {
        switch (item.method) {
            case "GET":
                router.get(item.url, item.function);
                break;
            case "POST":
                router.post(item.url, item.function);
                break;
        }
    });
});

module.exports = router;