import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [{
    path: "/painting",
    component: () => import('~/pages/demo/views/01painting/main.vue')
}, {
    path: "/photoEditing",
    component: () => import('~/pages/demo/views/02photoEditing/main.vue')
}, 
{
    path: "/dragAndResize",
    component: () => import('~/pages/demo/views/03dragAndResize/main.vue')
},
{
    path: "/dragToDelete",
    component: () => import('~/pages/demo/views/04dragToDelete/main.vue')
},
{
    path: "/wave",
    component: () => import('~/pages/demo/views/05wave/main.vue')
},
{
    path: "/calendar",
    component: () => import('~/pages/demo/views/06calendar/main.vue')
},
{
    path: "/computeFileMd5",
    component: () => import('~/pages/demo/views/07computeFileMd5/main.vue')
},

];


const router = new VueRouter({
    // mode:'history',
    routes: routes,
});
export default router;