const Koa = require('koa');

const app = new Koa();

// 初始化数据库连接
require("./utils/initDatabase")

// 处理request中的body
app.use(require('koa-bodyparser')());

// 扫描controllers文件夹，并注册所有routes
app.use(require("./utils/scanControllers").routes());

// log request URL:
app.use(async (ctx, next) => {
    console.log(`${ctx.request.url}【${ctx.request.method}】`);
    await next();
});


app.listen(3000);
console.log(" ---------- 服务器启动成功，监听端口3000。 ---------- ");