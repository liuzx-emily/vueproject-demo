import Vue from 'vue';

import '~/utils/lazyImport'

import App from './App.vue';

new Vue({
    render: h => h(App),
}).$mount('#app');