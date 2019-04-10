import Vue from 'vue';
import VueRouter from 'vue-router';

// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);

// 定义路由
const routes = [
    // ---------------------- 01预设样式 ----------------------
    {
        path: "/presetStyle/btn",
        component: () => import('./views/01presetStyle/btn.vue')
    },
    // ---------------------- 02组件使用说明 ----------------------
    {
        path: "/componentInstructions/xTable",
        component: () => import('./views/02componentInstructions/xTable/main.vue')
    },
    {
        path: "/componentInstructions/horizontalScrolling",
        component: () => import('./views/02componentInstructions/horizontalScrolling/main.vue')
    },
    // ---------------------- 03插件DEMO ----------------------
    {
        path: "/pluginDemo/echarts",
        component: () => import('./views/03pluginDemo/echarts/main.vue')
    },
    {
        path: "/pluginDemo/guide",
        component: () => import('./views/03pluginDemo/guide/main.vue')
    },
    // ---------------------- 04黑科技 ----------------------
    {
        path: "/blackTechnology/css/01",
        component: () => import('./views/04blackTechnology/css/01cssmadeShape/main.vue')
    },
    {
        path: "/blackTechnology/css/02",
        component: () => import('./views/04blackTechnology/css/02/main.vue')
    },
    {
        path: "/blackTechnology/html/01",
        component: () => import('./views/04blackTechnology/html/01/main.vue')
    },
    {
        path: "/blackTechnology/complex/01print",
        component: () => import('./views/04blackTechnology/complex/01print/main.vue')
    },
    {
        path: "/blackTechnology/complex/02",
        component: () => import('./views/04blackTechnology/complex/02/main.vue')
    },
    // ---------------------- 11文章管理 ----------------------
    {
        path: "/article",
        component: () => import('./views/11article/list.vue')
    },
    {
        name: "articleDetail",
        path: "/article/detail/:mode/:id",
        component: () => import('./views/11article/detail.vue')
    },

    // ---------------------- 12系统管理 ----------------------
    {
        path: '/system/dept',
        component: () => import('./views/12system/dept.vue')
    },
    {
        path: '/system/role',
        component: () => import('./views/12system/role.vue'),
    },
    {
        path: '/system/permission',
        component: () => ('./views/12system/permission.vue'),
    },
    {
        path: '/system/user',
        component: () => import('./views/12system/user.vue'),
    },
    {
        path: '/system/user_review',
        component: () => import('./views/12system/user_review.vue'),
    },

]
// 创建router对路由进行管理
const router = new VueRouter({
    // mode: 'history',
    routes
});
export default router;