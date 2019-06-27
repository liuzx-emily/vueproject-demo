import Vue from 'vue';
import vuex from "vuex"

Vue.use(vuex);

import userInfo from './modules/userInfo.js'
import magicComponent from './modules/magicComponent.js'
let myStore = new vuex.Store({
    modules: {
        userInfo,
        magicComponent,
    },
    state: {
        // 所有按钮权限
        permissionBtns: [],
        cuttedSideBar: false,
    },
});
export default myStore;