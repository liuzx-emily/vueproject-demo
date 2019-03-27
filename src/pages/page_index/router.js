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
    // problem：01数学公式（特殊符号的输入方法）
    {
        path: "/example/problem/1",
        component: () => import('./views/example/problem/01mathformula.vue'),
    },
    // problem：02图片的src是变量
    {
        path: "/example/problem/2",
        component: () => import('./views/example/problem/02imgSrc.vue'),
    },
    // problem：03用css画的形状
    {
        path: "/example/problem/3",
        component: () => import('./views/example/problem/03cssmadeShape.vue'),
    },
    // 表格 xTable
    {
        path: "/example/xTable",
        component: () => import('./views/example/xTable.vue')
    },
    // 图表 charts
    {
        path: "/example/charts",
        component: () => import('./views/example/charts/main.vue')
    },
    // guide
    {
        path: "/example/guide",
        component: () => import('./views/example/guide.vue')
    },
    // 横向滚动 horizontalScrolling
    {
        path: "/example/horizontalScrolling",
        component: () => import('./views/example/horizontalScrolling.vue')
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