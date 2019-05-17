const routes = {
    path: "/blackTechnology",
    component: () => import('../blank.vue'),
    children: [
        // css 
        {
            path: "css/01",
            component: () => import('~/pages_example/page_index/views/04blackTechnology/css/01tricks/main.vue')
        },
        {
            path: "css/02",
            component: () => import('~/pages_example/page_index/views/04blackTechnology/css/02/main.vue')
        },
        {
            path: "css/03",
            component: () => import('~/pages_example/page_index/views/04blackTechnology/css/03cssmadeShape/main.vue')
        },
        // js
        {
            path: "js/01",
            component: () => import('~/pages_example/page_index/views/04blackTechnology/js/01tricks/main.vue')
        },
        {
            path: "js/02",
            component: () => import('~/pages_example/page_index/views/04blackTechnology/js/02manyLevelAddress/main.vue')
        },
        {
            path: "js/03",
            component: () => import('~/pages_example/page_index/views/04blackTechnology/js/03console/main.vue')
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
            component: () => import('~/pages_example/page_index/views/04blackTechnology/vue/01tricks/main.vue')
        },
        {
            path: "vue/02",
            component: () => import('~/pages_example/page_index/views/04blackTechnology/vue/02afterInitDone/main.vue')
        },
        {
            path: "vue/03",
            component: () => import('~/pages_example/page_index/views/04blackTechnology/vue/03variableImgSrc/main.vue')
        },
    ],
};
export default routes;