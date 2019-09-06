import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


const routes = [
	// ---------------------- 404 ----------------------
	{
		name: '404',
		path: '/404',
		component: () => import('~/pages/index/views/404.vue')
	},
	// ---------------------- 02组件使用说明 ----------------------

	{
		path: "/componentInstructions/horizontalScrolling",
		component: () => import('~/pages/index/views/02componentInstructions/03horizontalScrolling/main.vue')
	},
	// ---------------------- 03插件DEMO ----------------------

	{
		path: "/pluginDemo/echarts",
		component: () => import('~/pages/index/views/03pluginDemo/01echarts/main.vue')
	},
	{
		path: "/pluginDemo/guide",
		component: () => import('~/pages/index/views/03pluginDemo/02guide/main.vue')
	},
	// ---------------------- 04黑科技 ----------------------
	// css
	{
		path: "/blackTechnology/css/03",
		component: () => import('~/pages/index/views/04blackTechnology/css/03cssmadeShape/main.vue')
	},
	// js
	{
		path: "/blackTechnology/js/02",
		component: () => import('~/pages/index/views/04blackTechnology/js/02manyLevelAddress/main.vue')
	},
	{
		path: "/blackTechnology/js/03",
		component: () => import('~/pages/index/views/04blackTechnology/js/03console/main.vue')
	},
	// complex
	{
		path: "/blackTechnology/complex/01",
		component: () => import('~/pages/index/views/04blackTechnology/complex/01print/main.vue')
	},
	{
		path: "/blackTechnology/complex/02",
		component: () => import('~/pages/index/views/04blackTechnology/complex/02exportPDF/main.vue')
	},
	// 因为路由表是由上到下匹配的，所以要把任意匹配*放在最下面
	// {
	//     path: '*',
	//     redirect: '/404'
	// }
];


const router = new VueRouter({
	// mode:'history',
	routes: routes,
});
export default router;