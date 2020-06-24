const permission = {
  install(Vue) {
    Vue.directive('permission', permission)
  },
  inserted: checkPermission,
  update: checkPermission,
}

function checkPermission(el, binding, vnode) {
  const permissionBtns = vnode.context.$store.state.permission.permissionCodeList;
  const code = binding.value;
  const flag = permissionBtns.includes(code);
  if (flag) {
    el.classList.remove("common-no-permission");
  } else {
    el.classList.add("common-no-permission");
  }
}
export default permission