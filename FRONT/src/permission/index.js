/* eslint-disable */
import { vm } from '@/main'
// 访问根路径时自动跳转到的地址
let navigationRootRedirectPath = "";

let permissionCodeList;
let permissionCodeMap;
let permissionIdMap;

let navigationListData;
let navigationTreeData;
let navigationPathMap;

function initPermissionData(data) {
  _reset();
  // 所有权限（用于v-permission，页面权限拦截等）
  data.filter(o => !o.isExternalLink).forEach(o => {
    permissionCodeList.push(o.code);
    permissionCodeMap.set(o.code, o);
    permissionIdMap.set(o.id, o);
  });
  // 导航相关数据（用于渲染侧边菜单、面包屑、访问根路径时自动跳转到的地址）
  data.filter(o => o.showInNavigation === 1).forEach(o => {
    const item = {
      id: o.id,
      parentId: o.parentId,
      name: o.name,
      path: o.code,
      icon: o.icon,
      isExternalLink: !!o.isExternalLink,
      isTransitionView: undefined, // 过渡页面
      realPath: undefined, // 对于过渡页面，需要计算出 realPath
      children: [],
      hasChildren: false,
      showChildren: false,
    }
    if (!item.isExternalLink) {
      const matched = vm.$router.match(item.path);
      if (matched) {
        item.isTransitionView = !!(matched.meta.isTransitionView);
      } else {
        alert('服务器返回的权限数据和路由匹配不上，肯定是权限数据出问题了！！');
      }
    }
    navigationPathMap.set(item.path, item);
    navigationListData.push(item);
  })
  // 处理 children hasChildren showChildren 字段
  navigationTreeData = _arrayToTree(navigationListData);
  // 经过了 arrayToTree，navigationListData 中的每一项都有 children 字段了，可以找 realPath 了
  navigationListData.filter(o => o.isTransitionView).forEach(o => {
    o.realPath = _findRealPath(o.children);
  })

  navigationRootRedirectPath = _findRealPath(navigationTreeData);

  // 存在 store 中
  vm.$store.state.permission.navigationTreeData = navigationTreeData;
  vm.$store.state.permission.permissionCodeList = permissionCodeList;

  // 对当前的url进行检查
  let path = _getFinalPathBasedOnRouteAndPermission(vm.$route)
  if (path) {
    vm.$router.push(path, () => { expandNav() });
  } else {
    expandNav();
  }

  // 把当前页面所在的导航，在侧边栏中给 expand 了
  function expandNav() {
    const list = getNavAncestors(vm.$route.path)
    list.forEach(o => {
      if (o.hasChildren) {
        o.showChildren = true;
      }
    })
  }
}

function getNavAncestors(path) {
  function _pushFather(list, permissionObj, params = {}) {
    if (navigationPathMap.has(permissionObj.code)) {
      const navObject = navigationPathMap.get(permissionObj.code);
      if (!params.donotAddMe) {
        list.unshift(navObject);
      }
    }
    const father = permissionIdMap.get(permissionObj.parentId);
    if (father) {
      _pushFather(list, father);
    }
  }
  const list = [];
  if (permissionCodeMap.has(path)) {
    _pushFather(list, permissionCodeMap.get(path), { donotAddMe: true });
  } else if (vm.$route.meta.noIntercept) {
    _pushFather(list, permissionCodeMap.get(vm.$route.meta.breadcrumb.parentPath));
  }
  return list;
}

function routerInterception(to, from, next) {
  if (vm) {
    let path = _getFinalPathBasedOnRouteAndPermission(to)
    if (path) {
      next(path);
    } else {
      next()
    }
  } else {
    // 第一次触发时（页面初始化）可能还没有vm。此时肯定还没拿到权限数据，无法判断只能先放行
    next()
  }
}

function getBreadcrumb() {
  const path = vm.$route.path;
  const navList = getNavAncestors(vm.$route.path)
  if (permissionCodeMap.has(path)) {
    navList.push({ name: permissionCodeMap.get(path).name });
  } else if (vm.$route.meta.noIntercept) {
    navList.push({ name: vm.$route.meta.breadcrumb.name });
  }
  return navList;

}

function getBreadcrumb2() {
  function _pushFather(permissionObj) {
    if (navigationPathMap.has(permissionObj.code)) {
      const navObject = navigationPathMap.get(permissionObj.code);
      navList.unshift(navObject);
    }
    const father = permissionIdMap.get(permissionObj.parentId);
    if (father) {
      _pushFather(father);
    }
  }
  const path = vm.$route.path;
  const navList = [];
  if (permissionCodeMap.has(path)) {
    _pushFather(permissionCodeMap.get(path));
    if (!navigationPathMap.has(path)) {
      // 本页在权限数据中，但设置为不在导航中显示。则上面的 _pushFather 不会把它自己放进去，要手动拼一下
      navList.push({ name: permissionCodeMap.get(path).name });
    }
  } else if (vm.$route.meta.noIntercept) {
    // 本页设置了 noIntercept
    // 因为本页不需要权限拦截，所以数据库中可能根本就没存这个权限信息（不在 permissionCodeMap中）。
    // 所以本页的面包屑信息，都要去 route.meta.breadcrumb 中取
    _pushFather(permissionCodeMap.get(vm.$route.meta.breadcrumb.parentPath));
    // 把它自己拼进去
    navList.push({ name: vm.$route.meta.breadcrumb.name });
  } else {
    return [];
  }
  return navList;
}

export { initPermissionData, routerInterception, getBreadcrumb }

// -------------------------------------------------------------------------

function _reset() {
  // layout -> 404 -> 返回 layout ，那么不清空的话，权限数据就会是双份的了！！
  permissionCodeList = [];
  permissionCodeMap = new Map();
  permissionIdMap = new Map();

  navigationListData = [];
  navigationTreeData = {};
  navigationPathMap = new Map();

}

function _arrayToTree(arr) {
  let tree = arr.filter((father) => {
    let branchArr = arr.filter((child) => {
      return father.id == child.parentId
    });
    if (branchArr.length > 0) {
      father.children = branchArr;
      father.hasChildren = true;
      father.showChildren = false;
    } else {
      father.hasChildren = false;
    }
    return !(arr.some(function (item) {
      return item.id === father.parentId;
    }));
  });
  return tree;
}

function _findRealPath(list) {
  if (!list || list.length === 0) {
    return;
  }
  for (let i = 0; i <= list.length - 1; i++) {
    let o = list[i];
    let realPath;
    if (!o.isExternalLink) {
      if (o.isTransitionView) {
        realPath = _findRealPath(o.children);
      } else {
        realPath = o.path;
      }
    }
    if (realPath) {
      return realPath;
    }
  }
  return;
}


/* 
根据 route 和权限数据，得到最终跳转的路径（参数：route 想要前往的路由）
返回值：如果需要跳转到，那么返回 path。如果不需要跳转，返回 false

具体逻辑：
  是否访问根路径？如果是根路径，那么【跳转到 navigationRootRedirectPath】
  有没有匹配上router？
  - 没有匹配上，【跳转到 404】【因为路由规则中配置了 * ，所以其实不可能匹配不上！！！】
  - 匹配上了，判断是否有访问权限
    - 路由需要权限验证吗？（根据 route.meta.noIntercept 判断）
      - 不需要验证【放行】
      - 需要验证（根据 permissionCodeList 来判断是否有权限）
        - 有权限。需要判断是不是导航
          - 是导航，需要判断是不是过渡页面
            - 是过渡页面，那么要【跳转到 realPath】
            - 不是过渡页面【放行】
          - 不是导航，那么不可能是过渡页面【放行】
        - 没权限，【跳转到 401】
 */

function _getFinalPathBasedOnRouteAndPermission(route) {
  // 为什么这里不写成 path = route.path ?
  // 因为访问 /system/ 时，route.path是 /system/ ，而像这样通过 match 得到的path 是 /system
  const path = route.matched[route.matched.length - 1].path;

  // 如果是根路径，那么跳转到 navigationRootRedirectPath
  if (path === '/') {
    return navigationRootRedirectPath;
  }

  // 因为路由规则中配置了 * ，所以其实不可能匹配不上！可以把这一段注释掉了
  // let matched = route.matched.filter(o => o.path != '');
  //   // 如果 route 没有匹配上 router，那么跳转到404
  //   if (matched.length === 0) {
  //     return '/404'
  // }


  // route 没有设置 noIntercept 的话，就需要进行权限检验
  if (!route.meta.noIntercept) {
    if (permissionCodeList.includes(path)) {
      // 通过了权限验证
      const nav = navigationPathMap.get(path);
      if (nav && nav.isTransitionView) {
        // 如果是导航，并且是过渡页面的话，那么就要跳转到 realPath
        return nav.realPath
      }
    } else {
      // 没权限
      return "/401"
    }
  }
  return;
}