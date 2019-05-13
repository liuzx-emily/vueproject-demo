const routes = {
    path: "/presetStyle",
    component: () => import('../blank.vue'),
    children: [{
            path: "btn",
            component: () => import('~/pages_example/page_index/views/01presetStyle/01btn.vue'),
        },
        {
            path: "searchCondition",
            component: () => import('~/pages_example/page_index/views/01presetStyle/02searchCondition.vue'),
        },
    ],
};
export default routes;