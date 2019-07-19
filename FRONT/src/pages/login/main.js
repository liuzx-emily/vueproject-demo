import Vue from 'vue';

// axios
import xaxios from '~/axios.js'
Vue.prototype.xaxios = xaxios

// -------------- element --------------
import { Input, Button, Loading } from 'element-ui';
Vue.use(Input);
Vue.use(Button);
Vue.use(Loading);
import 'element-ui/lib/theme-chalk/index.css';

// -------------- font-awesome --------------
import 'font-awesome/css/font-awesome.css';

// -------------- utils ----------------
import _ from 'lodash'
Vue.prototype._ = _
import xtools from '~/utils/tools.js'
Vue.prototype.xtools = xtools
import { xValidate, xElementRules } from '~/utils/xValidate.js'
Vue.prototype.xValidate = xValidate
Vue.prototype.xElementRules = xElementRules

// 样式
import "./styles/main.less";

import App from './App.vue';

new Vue({
	render: h => h(App),
}).$mount('#app');