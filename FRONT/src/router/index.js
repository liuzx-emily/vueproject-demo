import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from "@/layout/index";
import { routerInterception } from '@/permission/index'
Vue.use(VueRouter)

// 使用 require.context 实现自动化导入路由
const moduleRoutes = [];
const context = require.context('./modules/', false, /\.js$/);
context.keys().forEach(key => {
  const route = context(key).default;
  moduleRoutes.push(route);
})
/* 
  isTransitionView：是否是过渡页面
  noIntercept ：不进行权限拦截，所有人不管登不登录什么角色都可以看
  dontNeedPermissionData ：不需要权限数据

  noIntercept 和 dontNeedPermissionData 的区别：
  - 登录页面是不进行权限拦截，也不需要权限数据
  - 霜之哀伤页面不进行权限拦截，但因为是 layout，所以需要权限数据来展示菜单和面包屑等（同时，此类页面要有 meta.breadcrumb ）
 */
const routes = [
  {
    path: "/",
    component: Layout,
    children: [
      { path: 'article', component: () => import('views/article/index') },
    ]
  },
  { path: '/login', meta: { noIntercept: true, dontNeedPermissionData: true }, component: () => import('views/login/index') },
  { path: '/401', meta: { noIntercept: true, dontNeedPermissionData: true }, component: () => import('views/error-page/401') },
  { path: '/404', meta: { noIntercept: true, dontNeedPermissionData: true }, component: () => import('views/error-page/404') },
  ...moduleRoutes,
  { path: '*', meta: { noIntercept: true, dontNeedPermissionData: true }, component: () => import('views/error-page/404') },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(routerInterception)

export default router
