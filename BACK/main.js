const Koa = require('koa');
const session = require('koa-session');
const WebSocket = require('ws');

const app = new Koa();
const wss = new WebSocket.Server({
	port: 8888
});
wss.on('connection', ws => {
	ws.wss = wss;
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
	global.ws = ws;
});

// define app.keys before adding session
app.keys = ['userId'];

app.use(session({
	key: "SESSION_ID",
}, app));


// 初始化数据库连接
require("./utils/initDatabase")

// 处理request中的body
app.use(require('koa-bodyparser')());

// 扫描controllers文件夹，并注册所有routes
app.use(require("./utils/scanControllers").routes());

// log request URL:
app.use(async (ctx, next) => {
	// console.log(ctx.request);
	global.ws.broadcast(ctx.request);
	await next();
});

app.listen(3000);
console.log(" ---------- 服务器启动成功，监听端口3000。 ---------- ");