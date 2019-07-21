const Koa = require('koa');

const app = new Koa();
app.context.xglobal = {};
app.context.xtools = {};
app.context.xtools.randomId = require("uuid/v4");


/* ---------- sql相关 ---------- */
// 连接数据库 获取 sequelize 实例
app.context.xglobal.sequelize = require("./initialization/connectDatabase");
// 扫描注册models
app.context.xglobal.models = require("./initialization/scanAndRegisterModels");
// 构造rawquery方法
app.context.xglobal = { ...app.context.xglobal, ...require("./initialization/rawqueryMethods") };
// 常用的
app.context.xglobal.Op = require('sequelize').Op;


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
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

app.use(async (ctx, next) => {
	// {...obj}这种写法是浅拷贝，不过这里无所谓
	const param = { ...ctx.query, ...ctx.request.body };
	ctx.requestparam = param;

	await next();
	// try {
	// 	await next();
	// } catch (error) {
	// 	ctx.response.body = { code: 0 };
	// }
});





// 扫描controllers文件夹，并注册所有routes
const router = require("./initialization/scanAndRegisterControllers");
app.use(router.routes()).use(router.allowedMethods());


/* ---------- websocket ---------- */
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8888 });
wss.on('connection', ws => {
	console.log("ws连接已建立！");
	ws.wss = wss;
	ws.on('message', data => {
		console.log("网页发来了：", +data);
	});
	ws.broadcast = (msg) => {
		wss.clients.forEach(client => {
			// if (client !== ws && client.readyState === WebSocket.OPEN) {
			// 	client.send(msg);
			// }
			if (client.readyState === WebSocket.OPEN) {
				client.send(msg);
			}
		});
	};
	app.context.xglobal.ws = ws;
});
wss.on('close', () => {
	console.log("ws连接关闭");
	app.context.xglobal.ws = null;
});




app.listen(3000);
console.log(" ---------- 服务器启动成功，监听端口3000。 ---------- ");