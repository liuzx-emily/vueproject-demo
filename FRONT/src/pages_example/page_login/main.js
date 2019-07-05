import Vue from 'vue';

import '~/utils/lazyImport'

// 样式
import "./styles/main.less";

import App from './App.vue';

new Vue({
	render: h => h(App),
}).$mount('#app');