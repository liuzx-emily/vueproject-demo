import Vue from 'vue';

import '~/utils/lazyImport'

// router
import router from "./router.js"

// mock
import './mock/main.js'

// --------------- 注册本页面的组件和模块 ---------------

// 样式
import './styles/main.less'

import App from './App.vue';

new Vue({
	render: h => h(App),
	// 把router实例注入到vue根实例中
	router: router,
}).$mount('#app');