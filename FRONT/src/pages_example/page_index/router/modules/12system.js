const routes = {
    path: "/system",
    component: () => import('../blank.vue'),
    children: [{
            path: 'dept',
            component: () => import('~/pages_example/page_index/views/12system/dept/main.vue')
        },
        {
            path: 'role',
            component: () => import('~/pages_example/page_index/views/12system/role/main.vue'),
        },
        {
            path: 'permission',
            component: () => import('~/pages_example/page_index/views/12system/permission/main'),
        },
        {
            path: 'user',
            component: () => import('~/pages_example/page_index/views/12system/user.vue'),
        },
    ],
};
export default routes;