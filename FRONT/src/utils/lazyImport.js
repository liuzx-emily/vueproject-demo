import Vue from 'vue';


// axios
import xAxios from '~/axios.js'
Vue.prototype.xAxios = xAxios

// -------------- element --------------
import ElementUI from 'element-ui';
Vue.use(ElementUI, { size: 'mini' });
import 'element-ui/lib/theme-chalk/index.css';


// -------------- font-awesome --------------
import 'font-awesome/css/font-awesome.css';


// -------------- 样式 --------------
import "~/styles/main.less";


// -------------- utils ----------------
import _ from 'lodash'
Vue.prototype._ = _
import xtools from '~/utils/tools.js'
Vue.prototype.xtools = xtools
import { xValidate, xElementRules } from '~/utils/xValidate.js'
Vue.prototype.xValidate = xValidate
Vue.prototype.xElementRules = xElementRules
import exportPDF from '~/utils/exportPdf'
Vue.prototype.exportPDF = exportPDF


// -------------- 自定义指令 ----------------
Vue.directive("permission", {
    // 指令的定义
    inserted(el, binding, vnode) {
        const permissionBtns = vnode.context.$store.state.permissionBtns
        const code = `${binding.arg}:btn:${{1:'add',2:'edit',3:'look',4:'delete'}[binding.value]||binding.value}`;
        const flag = _.indexOf(permissionBtns, code) != -1;
        (!flag) && (el.parentElement.removeChild(el));
    },
});

// -------------- 插件echarts --------------
import echarts from 'echarts'
import themeChick from './echartsThemes/theme-chic.js'
echarts.registerTheme("chic", themeChick);
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
import c_table from '~/components/table/main.vue'
Vue.use(c_table);
import c_treeTable from '~/components/treeTable/main.vue';
Vue.use(c_treeTable);
import c_horizontalScrolling from '~/components/horizontalScrolling/main.vue';
Vue.use(c_horizontalScrolling);
import c_editor from "~/components/editor/main.vue";
Vue.use(c_editor);
import c_pickYear from "~/components/commonFormItem/pickYear/main.vue";
Vue.use(c_pickYear);
import c_pickDateRange from "~/components/commonFormItem/pickDateRange/main.vue";
Vue.use(c_pickDateRange);
// 
import m_limitlessSidebarMenu from "~/modules/limitlessSidebarMenu/main.vue";
Vue.use(m_limitlessSidebarMenu);
import c_manyLevelAddress from "~/modules/manyLevelAddress/main.vue";
Vue.use(c_manyLevelAddress);
import m_upload from "~/modules/upload/main.vue";
Vue.use(m_upload);
import m_uploadOneImg from "~/modules/uploadOneImg/main.vue";
Vue.use(m_uploadOneImg);


Vue.config.productionTip = false;