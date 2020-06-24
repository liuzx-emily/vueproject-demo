const Koa = require('koa');
const app = new Koa();

/* ---------- session功能 ---------- */
const session = require('koa-session');
// define app.keys before adding session 设置签名的 Cookie 密钥
app.keys = ['excellent work'];
const SESSIONCONFIG = {
  /** (string) cookie key (default is koa:sess) */
  key: "sess",
  /** (number || 'session') maxAge in ms (default is 1 days) */
  maxAge: 'session',
  /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
  renew: true,
};
app.use(session(SESSIONCONFIG, app));


/* ---------- bodyParser：处理请求体中的参数，放到 ctx.request.body 中。 ---------- */
// 要在注册路由之前挂载bodyparser
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());


app.use(async (ctx, next) => {
  // {...obj}这种写法是浅拷贝，不过这里无所谓
  const param = { ...ctx.query, ...ctx.request.body };
  ctx.requestparam = param;
  // 对于后缀为 not blocking 的接口直接放行，其他接口都要进行登录验证
  if (ctx.path.endsWith(".nb")) { // not blocking
    await next();
  } else {
    if (ctx.session.userId) {
      await next();
    } else {
      ctx.response.body = { code: -9, message: "登录失效！" };
    }
  }
});

// 扫描controllers文件夹，并注册所有routes
const router = require("./initialization/scanControllers");
app.use(router.routes()).use(router.allowedMethods());


app.listen(3526);
console.log(" ---------- 服务器启动成功，监听端口3526。 ---------- ");