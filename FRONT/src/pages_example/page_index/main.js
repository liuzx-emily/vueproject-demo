import Vue from 'vue';

import '~/utils/lazyImport'

// router
import router from "./router/main.js"

// store (vuex)
import store from './store.js'

// mock
import './mock/main.js'

// --------------- 注册本页面的组件和模块 ---------------
import xLimitlessSidebarMenu from "./modules/xLimitlessSidebarMenu/main.vue";
Vue.use(xLimitlessSidebarMenu);
import pickYear from "./modules/xCommonFormItem/pickYear/main.vue";
Vue.use(pickYear);
import pickDateRange from "./modules/xCommonFormItem/pickDateRange/main.vue";
Vue.use(pickDateRange);
import manyLevelAddress from "./modules/xCommonFormItem/manyLevelAddress/main.vue";
Vue.use(manyLevelAddress);


import App from './App.vue';

new Vue({
    render: h => h(App),
    // 把router实例注入到vue根实例中
    router: router,
    store: store
}).$mount('#app');