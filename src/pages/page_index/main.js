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

Vue.config.productionTip = false;

import App from './App.vue';

new Vue({
    render: h => h(App),
    // 把router实例注入到vue根实例中
    router: router,
    store: store
}).$mount('#app');