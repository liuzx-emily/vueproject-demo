import Vue from 'vue';
import VueRouter from 'vue-router';

// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);

// 定义路由
const routes = [
    // 文章管理
    // {
    //     path:"/article",
    //     component:()=>import('')
    // },
    // demo
    {
        path: "/demo",
        component: () => import('./views/demo.vue')
    },
    // ---------------------- 文章管理 ----------------------
    {
        path: "/article",
        component: () => import('./views/article/list.vue')
    },
    {
        name: "articleDetail",
        path: "/article/detail/:mode/:id",
        component: () => import('./views/article/detail.vue')
    },
    // ---------------------- 示例 ----------------------
    // 数学公式（特殊符号的输入方法）
    {
        path: "/example/mathformula",
        component: () => import('./views/example/mathformula.vue')
    },
    // xTable
    {
        path: "/example/xTable",
        component: () => import('./views/example/xTable.vue')
    },
    // charts
    {
        path: "/example/charts",
        component: () => import('./views/example/charts/main.vue')
    },

    // ---------------------- 系统管理 ----------------------
    // 单位管理
    {
        path: '/system/dept',
        component: () => import('./views/system/dept.vue')
    },
    // 角色管理
    {
        path: '/system/role',
        component: () => import('./views/system/role.vue'),
    },
    // 权限管理（ 未开发）
    {
        path: '/system/permission',
        component: () => ('./views/system/permission.vue'),
    },
    // 用户管理
    {
        path: '/system/user',
        component: () => import('./views/system/user.vue'),
    },
    // 注册用户审核
    {
        path: '/system/user_review',
        component: () => import('./views/system/user_review.vue'),
    },

]
// 创建router对路由进行管理
const router = new VueRouter({
    // mode: 'history',
    routes
});
export default router;