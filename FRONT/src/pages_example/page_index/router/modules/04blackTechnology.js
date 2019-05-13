const routes = {
    path: "/blackTechnology",
    component: () => import('../blank.vue'),
    children: [
        // css 
        {
            path: "css/01",
            component: () => import('~/pages_example/page_index/views/04blackTechnology/css/01cssmadeShape/main.vue')
        }, {
            path: "css/02",
            component: () => import('~/pages_example/page_index/views/04blackTechnology/css/02/main.vue')
        },
        // js
        {
            path: "js/01",
            component: () => import('~/pages_example/page_index/views/04blackTechnology/js/01console/main.vue')
        },
        // html
        {
            path: "html/01",
            component: () => import('~/pages_example/page_index/views/04blackTechnology/html/01/main.vue')
        },
        // complex
        {
            path: "complex/01",
            component: () => import('~/pages_example/page_index/views/04blackTechnology/complex/01print/main.vue')
        },
        {
            path: "complex/02",
            component: () => import('~/pages_example/page_index/views/04blackTechnology/complex/02exportPDF/main.vue')
        },
        // vue
        {
            path: "vue/01",
            component: () => import('~/pages_example/page_index/views/04blackTechnology/vue/01variableImgSrc/main.vue')
        },
        {
            path: "vue/02",
            component: () => import('~/pages_example/page_index/views/04blackTechnology/vue/02afterInitDone/main.vue')
        },
        {
            path: "vue/03",
            component: () => import('~/pages_example/page_index/views/04blackTechnology/vue/03watch/main.vue')
        },
        {
            path: "vue/04",
            component: () => import('~/pages_example/page_index/views/04blackTechnology/vue/04routerKey/main.vue')
        },
    ],
};
export default routes;