const routes = {
    path: "/componentInstructions",
    component: () => import('../blank.vue'),
    children: [{
            path: "xTable",
            component: () => import('~/pages_example/page_index/views/02componentInstructions/01xTable/main.vue')
        },
        {
            path: "treeTable",
            component: () => import('~/pages_example/page_index/views/02componentInstructions/02treeTable/main.vue')
        },
        {
            path: "horizontalScrolling",
            component: () => import('~/pages_example/page_index/views/02componentInstructions/03horizontalScrolling/main.vue')
        },
        {
            path: "commonFormItem",
            component: () => import('~/pages_example/page_index/views/02componentInstructions/04commonFormItem/main.vue')
        },
    ]
};
export default routes;