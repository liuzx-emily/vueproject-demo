import Vue from 'vue';
import vuex from "vuex"

Vue.use(vuex);

import magicComponent from './modules/magicComponent.js'
let myStore = new vuex.Store({
    modules: {
        magicComponent,
    },
    state: {
    },
});
export default myStore;