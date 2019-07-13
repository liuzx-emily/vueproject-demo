const routes = {
    path: "/pluginDemo",
    component: () => import('../blank.vue'),
    children: [{
            path: "echarts",
            component: () => import('~/pages/index/views/03pluginDemo/01echarts/main.vue')
        },
        {
            path: "guide",
            component: () => import('~/pages/index/views/03pluginDemo/02guide/main.vue')
        },
    ],
};
export default routes;