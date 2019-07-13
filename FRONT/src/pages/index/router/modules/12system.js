const routes = {
    path: "/system",
    component: () => import('../blank.vue'),
    children: [{
            path: 'dept',
            component: () => import('~/pages/index/views/12system/dept/main.vue')
        },
        {
            path: 'role',
            component: () => import('~/pages/index/views/12system/role/main.vue'),
        },
        {
            path: 'permission',
            component: () => import('~/pages/index/views/12system/permission/main'),
        },
        {
            path: 'deptAndUser',
            component: () => import('~/pages/index/views/12system/deptAndUser/main.vue'),
        },
    ],
};
export default routes;