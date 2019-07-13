import Vue from 'vue';

// -------------- font-awesome --------------
import 'font-awesome/css/font-awesome.css';

// -------------- utils ----------------
import _ from 'lodash'
Vue.prototype._ = _
import xtools from '~/utils/tools.js'
Vue.prototype.xtools = xtools

// router
import router from "./router/main.js"

// store (vuex)
import store from './store/main.js'

// --------------- 注册本页面的组件和模块 ---------------

// 样式
import "./styles/main.less";

import App from './App.vue';

new Vue({
    render: h => h(App),
    // 把router实例注入到vue根实例中
    router: router,
    store: store
}).$mount('#app');