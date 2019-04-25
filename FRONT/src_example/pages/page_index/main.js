import Vue from 'vue';

import '~/utils/lazyImport'

// router
import router from "./router.js"

// store (vuex)
import store from './store.js'

// mock
import './mock/main.js'

import App from './App.vue';

new Vue({
    render: h => h(App),
    // 把router实例注入到vue根实例中
    router: router,
    store: store
}).$mount('#app');