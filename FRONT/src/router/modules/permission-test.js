import Layout from "@/layout/index";
import Blank from '@/router/Blank.vue'
const route = {
  path: "/permission-test",
  meta: { isTransitionView: true, },
  component: Layout,
  children: [
    {
      path: '1',
      component: Blank,
      meta: { isTransitionView: true, },
      children: [
        {
          path: '1',
          component: Blank,
          meta: { isTransitionView: true, },
          children: [
            { path: '1', component: () => import('views/permission-test/1/1-1/1-1-1/index') },
            { path: '2', component: () => import('views/permission-test/1/1-1/1-1-2/index') },
          ]
        },
        { path: '2', component: () => import('views/permission-test/1/1-2/index'), },
        { path: '2/electricity', component: () => import('views/permission-test/1/1-2/modules/electricity') },
        { path: '2/fire', component: () => import('views/permission-test/1/1-2/modules/fire') },
        {
          path: '2/frost', component: () => import('views/permission-test/1/1-2/modules/frost'),
          meta: {
            // 如果设置了 noIntercept ，那么必须要设置 breadcrumb（因为不控制权限的话，就不会存数据库，那么面包屑相关信息只能存这里了）
            noIntercept: true,
            breadcrumb: { name: "霜之哀伤", parentPath: '/permission-test/1/2' },
          }
        },
        { path: '2/water', component: () => import('views/permission-test/1/1-2/modules/water') },

      ]
    },
    { path: '2', component: () => import('views/permission-test/2/index') },
    { path: '3', component: () => import('views/permission-test/3/index') },
  ]
};
export default route