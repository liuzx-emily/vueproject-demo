const routes = {
	path: "/componentInstructions",
	component: () => import('../blank.vue'),
	children: [{
			path: "table",
			component: () => import('~/pages_example/page_index/views/02componentInstructions/01table/main.vue')
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
		 {
			path: "painting",
			component: () => import('~/pages_example/page_index/views/02componentInstructions/05painting/main.vue')
		},
		 {
			path: "canvasImage",
			component: () => import('~/pages_example/page_index/views/02componentInstructions/06canvasImage/main.vue')
		},
	]
};
export default routes;