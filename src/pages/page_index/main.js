import Vue from 'vue';

// router
import router from "./router.js"

// axios
import xAxios from '~/axios.js'
Vue.prototype.xAxios = xAxios

// store (vuex)
import store from './store.js'

// mock
import '~/mock/index/main.js'

//element
import ElementUI from 'element-ui';
Vue.use(ElementUI);
import 'element-ui/lib/theme-chalk/index.css';

// font-awesome
import 'font-awesome/css/font-awesome.css';

// 注册方法库
import _ from 'lodash'
import xTools from '~/utils/xTools.js'
Vue.prototype._ = _
Vue.prototype.xTools = xTools

// echarts
import echarts from 'echarts'
Vue.prototype.echarts = echarts


// 注册常用组件和模块
import xTable from '~/components/xTable/index.vue'
import xTreeTable from '~/components/xTreeTable/index.vue';
import xHorizontalScrolling from '~/components/xHorizontalScrolling/index.vue';
import xEditor from "~/components/xEditor/index_wangeditor.vue";
import xUploadAttachment from "~/components/xUploadAttachment/index.vue";
import pickYear from "~/modules/xFormItem/pickYear.vue";
import pickDateRange from "~/modules/xFormItem/pickDateRange.vue";
Vue.component("xTable", xTable)
Vue.component("xTreeTable", xTreeTable)
Vue.component("xHorizontalScrolling", xHorizontalScrolling)
Vue.component("xEditor", xEditor)
Vue.component("xUploadAttachment", xUploadAttachment)
Vue.component("pickYear", pickYear)
Vue.component("pickDateRange", pickDateRange)

// 样式
import "~/styles/reset.scss";
import "~/styles/common.scss";

Vue.config.productionTip = false;

import App from './App.vue';

new Vue({
    render: h => h(App),
    // 把router实例注入到vue根实例中
    router: router,
    store: store
}).$mount('#app');