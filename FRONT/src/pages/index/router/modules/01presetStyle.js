const routes = {
    path: "/presetStyle",
    component: () => import('../blank.vue'),
    children: [{
            path: "btn",
            component: () => import('~/pages/index/views/01presetStyle/01btn.vue'),
        },
        {
            path: "searchCondition",
            component: () => import('~/pages/index/views/01presetStyle/02searchCondition.vue'),
        },
    ],
};
export default routes;