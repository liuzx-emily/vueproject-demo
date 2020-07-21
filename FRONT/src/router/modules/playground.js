import Layout from "@/layout/index";
import Blank from '@/router/Blank.vue'
const route = {
  path: "/playground",
  component: Layout,
  meta: {
    isTransitionView: true,
  },
  children: [
    { path: 'echarts', component: () => import('views/playground/echarts/index') },
    { path: 'dagre-d3', component: () => import('views/playground/dagre-d3/index') },
    {
      path: 'canvas',
      component: Blank,
      meta: { isTransitionView: true },
      children: [
        { path: 'drawingBoard', component: () => import('views/playground/canvas-drawingBoard/index') },
        { path: 'photoFilter', component: () => import('views/playground/canvas-photoFilter/index') },
        { path: 'prettyDashboard', component: () => import('views/playground/canvas-prettyDashboard/index') },
        { path: 'sunRising', component: () => import('views/playground/canvas-sunRising/index') },
      ]
    },
    {
      path: 'css',
      component: Blank,
      meta: { isTransitionView: true },
      children: [
        { path: 'magician', component: () => import('views/playground/css-magician/index') },
        { path: 'greetingInSnow', component: () => import('views/playground/css-greetingInSnow/index') },
      ]
    },
    {
      path: 'js',
      component: Blank,
      meta: { isTransitionView: true },
      children: [
        { path: 'cheatCode', component: () => import('views/playground/js-cheatCode/index') },
        { path: 'codeEditor', component: () => import('views/playground/js-codeEditor/index') },
        { path: 'exportExcel', component: () => import('views/playground/js-exportExcel/index') },
        { path: 'exportPdf', component: () => import('views/playground/js-exportPdf/index') },
        { path: 'print', component: () => import('views/playground/js-print/index') },
      ]
    },
    {
      path: 'vue',
      component: Blank,
      meta: { isTransitionView: true },
      children: [
        { path: 'homemadeStore', component: () => import('views/playground/vue-homemadeStore/index') },
      ]
    },
    {
      path: 'component',
      component: Blank,
      meta: { isTransitionView: true },
      children: [
        { path: 'calendar', component: () => import('views/playground/component-calendar/index') },
        { path: 'cascadingAdress', component: () => import('views/playground/component-cascadingAdress/index') },
        { path: 'editor', component: () => import('views/playground/component-editor/index') },
        { path: 'tree', component: () => import('views/playground/component-tree/index') },
      ]
    },
  ]
};
export default route