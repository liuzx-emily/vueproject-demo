import Vue from 'vue';

// router
import router from "./router.js"

// axios
import xAxios from '~/axios.js'
Vue.prototype.xAxios = xAxios

//element
import ElementUI from 'element-ui';
Vue.use(ElementUI);
import 'element-ui/lib/theme-chalk/index.css';

// mock
import '~/mock/portal.js'

// font-awesome
import 'font-awesome/css/font-awesome.css';

// 注册方法库
import _ from 'lodash'
import xTools from '~/utils/xTools.js'
Vue.prototype._ = _
Vue.prototype.xTools = xTools


Vue.config.productionTip = false;

import App from './App.vue';

new Vue({
    render: h => h(App),
    // 把router实例注入到vue根实例中
    router: router,
}).$mount('#app');     