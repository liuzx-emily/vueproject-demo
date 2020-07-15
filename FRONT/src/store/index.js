import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      DEFAULT_PASSWORD: "123456"
    },
    permission: {
      // App.vue 中要用到。退出时，要重置为false
      permissionDataLoaded: false,
      // 导航树形数据（用于渲染侧边导航）
      navigationTreeData: [],
      // 所有权限的code值集合（用于 v-permission）
      permissionCodeList: [],
    },
  },
  mutations: {},
  actions: {},
  modules: {}
})