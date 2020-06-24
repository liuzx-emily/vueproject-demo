import Layout from "@/layout/index";
const route = {
  path: "/system",
  component: Layout,
  meta: {
    isTransitionView: true,
  },
  children: [
    { path: 'user', component: () => import('views/system/user/index') },
    { path: 'org', component: () => import('views/system/org/index') },
    { path: 'role', component: () => import('views/system/role/index') },
    { path: 'permission', component: () => import('views/system/permission/index') },
  ]
};
export default route