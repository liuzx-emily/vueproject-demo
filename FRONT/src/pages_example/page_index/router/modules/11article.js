const routes = {
    path: "/article",
    component: () => import('../blank.vue'),
    redirect: '/article/list',
    children: [{
            path: "list",
            component: () => import('~/pages_example/page_index/views/11article/list.vue')
        },
        {
            name: "articleDetail",
            path: "detail/:mode/:id",
            component: () => import('~/pages_example/page_index/views/11article/detail.vue')
        },
    ],
};
export default routes;