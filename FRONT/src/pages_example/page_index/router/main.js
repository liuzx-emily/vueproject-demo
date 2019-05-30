import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import presetStyle from './modules/01presetStyle.js'
import componentInstructions from './modules/02componentInstructions.js'
import pluginDemo from './modules/03pluginDemo.js'
import blackTechnology from './modules/04blackTechnology.js'
import article from './modules/11article.js'
import system from './modules/12system.js'

const routes = [
    // ---------------------- 404 ----------------------
    {
        name: '404',
        path: '/404',
        component: () => import('~/pages_example/page_index/views/404.vue')
    },
    // ---------------------- 01预设样式 ----------------------
    presetStyle,
    // ---------------------- 02组件使用说明 ----------------------
    componentInstructions,
    // ---------------------- 03插件DEMO ----------------------
    pluginDemo,
    // ---------------------- 04黑科技 ----------------------
    blackTechnology,
    // ---------------------- 11文章管理 ----------------------
    article,
    // ---------------------- 12系统管理 ----------------------
    system,
    // 因为路由表是由上到下匹配的，所以要把任意匹配*放在最下面
    {
        path: '*',
        redirect: '/404'
    }
];


const router = new VueRouter({
    // mode:'history',
    routes: routes,
});
export default router;