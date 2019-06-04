import Vue from 'vue';

import '~/utils/lazyImport'

// router
import router from "./router/main.js"

// store (vuex)
import store from './store.js'

// mock
import './mock/main.js'

// --------------- 注册本页面的组件和模块 ---------------
import c_foldableBox from "./components/foldableBox/main.vue";
Vue.use(c_foldableBox);
import c_pickYear from "./components/commonFormItem/pickYear/main.vue";
Vue.use(c_pickYear);
import c_pickDateRange from "./components/commonFormItem/pickDateRange/main.vue";
Vue.use(c_pickDateRange);
import c_manyLevelAddress from "./components/commonFormItem/manyLevelAddress/main.vue";
Vue.use(c_manyLevelAddress);
import m_limitlessSidebarMenu from "./modules/limitlessSidebarMenu/main.vue";
Vue.use(m_limitlessSidebarMenu);
import m_userBox from "./modules/userBox/main.vue";
Vue.use(m_userBox);


import App from './App.vue';

new Vue({
    render: h => h(App),
    // 把router实例注入到vue根实例中
    router: router,
    store: store
}).$mount('#app');