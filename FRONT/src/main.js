import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// import '@/mock.js'

import xaxios from '@/axios.js'
Vue.prototype.xaxios = xaxios

import _ from 'lodash'
Vue.prototype._ = _
import xtools from '@/utils/x-tools'
Vue.prototype.xtools = xtools
import xcommons from '@/utils/x-common-methods'
Vue.prototype.xcommons = xcommons


import 'font-awesome/css/font-awesome.css';

// element
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
Vue.use(ElementUI, { size: 'medium' });

// components
const componentsContext = require.context('@/components/', true, /^\.\/.+\/index\.vue$/);
componentsContext.keys().forEach(key => {
  Vue.use(componentsContext(key).default);
})

// directivs
const directivsContext = require.context('@/directive/', true, /^\.\/.+\/index\.js$/);
directivsContext.keys().forEach(key => {
  Vue.use(directivsContext(key).default);
})

// echarts
import echarts from 'echarts'
import themeChick from '@/utils/echarts-theme-chic.js'
echarts.registerTheme("chic", themeChick);
import { bind as sizeSensor } from 'size-sensor';
Vue.prototype.echarts = echarts
Vue.prototype.echartsAutoResize = domElement => {
  return sizeSensor(domElement, element => {
    let echartsObj = echarts.getInstanceByDom(element);
    if (echartsObj) {
      echartsObj.resize();
    }
  });
}

// styles
import "@/styles/resetElementUI/main.scss";
import "@/styles/abovelist-search-and-btns.scss";
import "@/styles/common.scss";
import "@/styles/permission.scss";
import "@/styles/table.scss";
import "@/styles/tabs.scss";

Vue.config.productionTip = false;

const vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

export { vm }