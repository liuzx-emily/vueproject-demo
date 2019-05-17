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
import xTable from '~/components/xTable/main.vue'
Vue.use(xTable);
import treeTable from '~/components/treeTable/main.vue';
Vue.use(treeTable);
import xHorizontalScrolling from '~/components/xHorizontalScrolling/main.vue';
Vue.use(xHorizontalScrolling);
import xEditor from "~/components/xEditor/main.vue";
Vue.use(xEditor);
import xUploadAttachment from "~/components/xUploadAttachment/main.vue";
Vue.use(xUploadAttachment);



Vue.config.productionTip = false;