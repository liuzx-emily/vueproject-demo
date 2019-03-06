import Vue from 'vue';

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
}).$mount('#app');