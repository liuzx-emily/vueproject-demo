const Koa = require('koa');
// const WebSocket = require('ws');
const session = require('koa-session');
const bodyParser = require('koa-bodyparser');


const app = new Koa();

/* ---------- 初始化数据库连接 ---------- */
// 将常用的的sql相关的方法注册成全局变量
const sequelize = require("./initialization/initDatabase");
app.context.sequelize=sequelize;

const rawqueryUtils = require("./controllers/utils/rawQueryUtils");

app.context.rawquery = async (ctx, params, getStr, { isCount, isOne } = {}) => {
	let { str_attriutes, str_where, str_paging } = rawqueryUtils.getStr(params);
	if (isCount) {
		let str_attriutes = "count(*)";
		let str = getStr({ str_attriutes, str_where, str_paging: "" });
		let result = await sequelize.query(str, { type: sequelize.QueryTypes.SELECT });
		return result[0][str_attriutes];
	} else if (isOne) {
		let str = getStr({ str_attriutes, str_where, str_paging });
		let result = await sequelize.query(str, { type: sequelize.QueryTypes.SELECT });
		return result[0];
	} else {
		let str = getStr({ str_attriutes, str_where, str_paging });
		let result = await sequelize.query(str, { type: sequelize.QueryTypes.SELECT });
		return JSON.parse(JSON.stringify(result));
	}
};
app.context.rawquery_tablewithpaging = async ({ ctx, whereParam, attributes, getStr, }) => {
	let params = {
		pagingParam: { page: ctx.requestparam.page, row: ctx.requestparam.row },
		whereParam,
		attributes,
	};
	let data = await ctx.rawquery(ctx, params, getStr);
	let count = await ctx.rawquery(ctx, params, getStr, { isCount: true });
	return { data, count };
};
app.context.rawquery_id = async ({ ctx, whereParam, attributes, getStr, }) => {
	let params = {
		whereParam,
		attributes,
	};
	let data = await ctx.rawquery(ctx, params, getStr, { isOne: true });
	return data;
};

app.context.Op = require('sequelize').Op;


/* ---------- session功能 ---------- */
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
// const wss = new WebSocket.Server({
// 	port: 8888
// });

// wss.on('connection', ws => {
// 	ws.wss = wss;
// 	ws.broadcast = (msg) => {
// 		wss.clients.forEach(client => {
// 			// if (client !== ws && client.readyState === WebSocket.OPEN) {
// 			// 	client.send(msg);
// 			// }
// 			if (client.readyState === WebSocket.OPEN) {
// 				client.send(msg);
// 			}
// 		});
// 	};
// 	global.ws = ws;
// });





app.listen(3000);
console.log(" ---------- 服务器启动成功，监听端口3000。 ---------- ");