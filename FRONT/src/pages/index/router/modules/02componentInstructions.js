const routes = {
    path: "/componentInstructions",
    component: () => import('../blank.vue'),
    children: [{
            path: "table",
            component: () => import('~/pages/index/views/02componentInstructions/01table/main.vue')
        },
        {
            path: "treeTable",
            component: () => import('~/pages/index/views/02componentInstructions/02treeTable/main.vue')
        },
        {
            path: "horizontalScrolling",
            component: () => import('~/pages/index/views/02componentInstructions/03horizontalScrolling/main.vue')
        },
        {
            path: "commonFormItem",
            component: () => import('~/pages/index/views/02componentInstructions/04commonFormItem/main.vue')
        },
    ]
};
export default routes;