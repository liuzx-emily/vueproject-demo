import Vue from 'vue';

// router
import router from "./router.js"

// axios
import xAxios from '~/axios.js'
Vue.prototype.xAxios = xAxios

// store (vuex)
import store from './store.js'

// mock
import '~/mock/index/main.js'

//element
import ElementUI from 'element-ui';
Vue.use(ElementUI);
import 'element-ui/lib/theme-chalk/index.css';

// font-awesome
import 'font-awesome/css/font-awesome.css';

// lodash
import _ from 'lodash'
Vue.prototype._ = _

// xTools
import xTools from '~/utils/xTools.js'
Vue.prototype.xTools = xTools

// echarts（如果是在组件里单独引用，那么记得要在组件中注册components。如果在这里引用，那么就不需要注册components了）
import echarts from 'echarts'
Vue.prototype.echarts = echarts

Vue.config.productionTip = false;

import App from './App.vue';

new Vue({
    render: h => h(App),
    // 把router实例注入到vue根实例中
    router: router,
    store: store
}).$mount('#app');