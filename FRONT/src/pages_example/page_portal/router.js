import Vue from 'vue';
import VueRouter from 'vue-router';

// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);

// 定义路由
const routes = [
    { path: "", redirect: '/index' },
    // 首页
    {
        path: '/index',
        component: () => import('./views/index.vue'),
    },
    {
        path: '/list/:id',
        component: () => import('./views/list.vue'),
    },
    {
        path: '/detail/:id',
        component: () => import('./views/detail.vue')
    },
];
// 创建router对路由进行管理
const router = new VueRouter({
    // mode: 'history',
    routes
});
export default router;