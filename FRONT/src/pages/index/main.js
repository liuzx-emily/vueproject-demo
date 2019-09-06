import Vue from 'vue';

import '~/utils/lazyImport'

// router
import router from "./router/main.js"

// store (vuex)
import store from './store/main.js'

// --------------- 注册本页面的组件和模块 ---------------
import m_userBox from "./modules/userBox/main.vue";
Vue.use(m_userBox);

// 样式
import "./styles/main.less";

import App from './App.vue';

new Vue({
    render: h => h(App),
    // 把router实例注入到vue根实例中
    router: router,
    store: store
}).$mount('#app');