import drag from './drag'

drag.install = function (Vue) {
  Vue.directive('el-drag-dialog', drag)
}
export default drag