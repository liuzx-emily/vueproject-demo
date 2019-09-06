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
	// ---------------------- 文章管理 ---------------------- 
	{
		path: '/article',
		component: () => import('~/pages/admin/views/article/main.vue')
	},
	// ---------------------- 系统管理 ----------------------
	{
		path: '/system/dept',
		component: () => import('~/pages/admin/views/system/dept/main.vue')
	},
	{
		path: '/system/role',
		component: () => import('~/pages/admin/views/system/role/main.vue'),
	},
	{
		path: '/system/permission',
		component: () => import('~/pages/admin/views/system/permission/main'),
	},
	{
		path: '/system/deptAndUser',
		component: () => import('~/pages/admin/views/system/deptAndUser/main.vue'),
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