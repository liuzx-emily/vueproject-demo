import Vue from 'vue';
import vuex from "vuex"

Vue.use(vuex);

let myStore = new vuex.Store({
    state: {
        // 用户信息
        userInfo: {
            id: undefined,
            username: "",
            name: "",
        },
        // 所有按钮权限
        permissionBtns: [],
        cuttedSideBar: false
    }
});
export default myStore;