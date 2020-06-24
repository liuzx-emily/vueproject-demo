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

const routes = [
  {
    path: "/",
    component: Layout,
    children: [
      { path: 'article', component: () => import('views/article/index') },
    ]
  },
  { path: '/login', meta: { noIntercept: true }, component: () => import('views/login/index') },
  { path: '/401', meta: { noIntercept: true }, component: () => import('views/error-page/401') },
  { path: '/404', meta: { noIntercept: true }, component: () => import('views/error-page/404') },
  ...moduleRoutes,
  { path: '*', meta: { noIntercept: true }, component: () => import('views/error-page/404') },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(routerInterception)

export default router
