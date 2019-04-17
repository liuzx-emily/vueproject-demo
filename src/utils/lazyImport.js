import Vue from 'vue';


// axios
import xAxios from '~/axios.js'
Vue.prototype.xAxios = xAxios

// -------------- element --------------
import ElementUI from 'element-ui';
Vue.use(ElementUI);
import 'element-ui/lib/theme-chalk/index.css';


// -------------- font-awesome --------------
import 'font-awesome/css/font-awesome.css';


// -------------- 样式 --------------
import "~/styles/main.scss";


// -------------- utils ----------------
import _ from 'lodash'
Vue.prototype._ = _
import xTools from '~/utils/xTools.js'
Vue.prototype.xTools = xTools
import { xValidate, xElementRules } from '~/utils/xValidate.js'
Vue.prototype.xValidate = xValidate
Vue.prototype.xElementRules = xElementRules
import { exportPDF } from '~/utils/xExportPdf'
Vue.prototype.exportPDF = exportPDF


// -------------- 插件echarts --------------
import echarts from 'echarts'
import { bind as sizeSensor, clear } from 'size-sensor';
Vue.prototype.echarts = echarts
Vue.prototype.chartResizeWhenWidthChange = (id) => {
    sizeSensor(document.getElementById(id), element => {
        if (element) {
            let echartsObj = echarts.getInstanceByDom(element);
            if (echartsObj) {
                echartsObj.resize();
            }
        }
    });
}


// -------------- 注册常用组件和模块 --------------
import xTable from '~/components/xTable/index.vue'
Vue.component("xTable", xTable)
import treeTable from '~/components/treeTable/index.vue';
Vue.component("treeTable", treeTable)
import xHorizontalScrolling from '~/components/xHorizontalScrolling/index.vue';
Vue.component("xHorizontalScrolling", xHorizontalScrolling)
import xEditor from "~/components/xEditor/index_wangeditor.vue";
Vue.component("xEditor", xEditor)
import xUploadAttachment from "~/components/xUploadAttachment/index.vue";
Vue.component("xUploadAttachment", xUploadAttachment)
import xLimitlessSidebarMenu from "~/components/xLimitlessSidebarMenu/index.vue";
Vue.component("xLimitlessSidebarMenu", xLimitlessSidebarMenu)
import pickYear from "~/modules/xFormItem/pickYear.vue";
Vue.component("pickYear", pickYear)
import pickDateRange from "~/modules/xFormItem/pickDateRange.vue";
Vue.component("pickDateRange", pickDateRange)


Vue.config.productionTip = false;