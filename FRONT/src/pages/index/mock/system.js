import Mock from 'mockjs'
// 用户信息
Mock.mock(/\/user\/userStatus.htmls/, 'get', {
    "code": 1,
    "data": {
        userId: 123,
        realname: "王小明"
    }
});

// 用户拥有的菜单权限
Mock.mock(/\/permission\/nav.htmls/, 'get', {
    "code": 1,
    "data": [
        // 01预设样式
        { "id": "presetStyle", "parentId": "ALL", "name": "预设样式", "icon": "cube", "code": "/presetStyle" },
        { "id": "presetStyle_btn", "parentId": "presetStyle", "name": "按钮", "icon": null, "code": "/presetStyle/btn" },
        { "id": "presetStyle_searchCondition", "parentId": "presetStyle", "name": "搜索条件", "icon": null, "code": "/presetStyle/searchCondition" },
        // 02组件使用说明
        { "id": "componentInstructions", "parentId": "ALL", "name": "组件说明", "icon": "superpowers", "code": "/componentInstructions" },
        { "id": "componentInstructions_xTable", "parentId": "componentInstructions", "name": "表格xTable", "icon": null, "code": "/componentInstructions/xTable" },
        { "id": "componentInstructions_treeTable", "parentId": "componentInstructions", "name": "treeTable", "icon": null, "code": "/componentInstructions/treeTable" },
        { "id": "componentInstructions_horizontalScrolling", "parentId": "componentInstructions", "name": "横向滚动", "icon": null, "code": "/componentInstructions/horizontalScrolling" },
        // 03插件DEMO
        { "id": "pluginDemo", "parentId": "ALL", "name": "插件DEMO", "icon": "leaf", "code": "/pluginDemo" },
        { "id": "pluginDemo_echarts", "parentId": "pluginDemo", "name": "图表", "icon": null, "code": "/pluginDemo/echarts" },
        { "id": "pluginDemo_guide", "parentId": "pluginDemo", "name": "Guide", "icon": null, "code": "/pluginDemo/guide" },
        // 04黑科技
        { "id": "blackTechnology", "parentId": "ALL", "name": "黑科技&难点", "icon": "magic", "code": "/blackTechnology" },
        { "id": "blackTechnology_css", "parentId": "blackTechnology", "name": "CSS", "icon": null, "code": "/blackTechnology/css" },
        { "id": "blackTechnology_css_01", "parentId": "blackTechnology_css", "name": "使用css绘制图形", "icon": null, "code": "/blackTechnology/css/01" },
        { "id": "blackTechnology_css_02", "parentId": "blackTechnology_css", "name": "利用CSS的content属性attr抓取资料", "icon": null, "code": "/blackTechnology/css/02" },
        { "id": "blackTechnology_js", "parentId": "blackTechnology", "name": "Javascript", "icon": null, "code": "/blackTechnology/js" },
        { "id": "blackTechnology_js_01", "parentId": "blackTechnology_js", "name": "console", "icon": null, "code": "/blackTechnology/js/01" },
        { "id": "blackTechnology_html", "parentId": "blackTechnology", "name": "HTML", "icon": null, "code": "/blackTechnology/html" },
        { "id": "blackTechnology_html_01", "parentId": "blackTechnology_html", "name": "输入数学公式", "icon": null, "code": "/blackTechnology/html/01" },
        { "id": "blackTechnology_complex", "parentId": "blackTechnology", "name": "综合", "icon": null, "code": "/blackTechnology/complex" },
        { "id": "blackTechnology_complex_01", "parentId": "blackTechnology_complex", "name": "打印", "icon": null, "code": "/blackTechnology/complex/01" },
        { "id": "blackTechnology_complex_02", "parentId": "blackTechnology_complex", "name": "页面导出PDF", "icon": null, "code": "/blackTechnology/complex/02" },
        { "id": "blackTechnology_vue", "parentId": "blackTechnology", "name": "vue相关", "icon": null, "code": "/blackTechnology/vue" },
        { "id": "blackTechnology_vue_01", "parentId": "blackTechnology_vue", "name": "图片的src是变量", "icon": null, "code": "/blackTechnology/vue/01" },
        { "id": "blackTechnology_vue_02", "parentId": "blackTechnology_vue", "name": "在初始化方法完成后再加载其他部分", "icon": null, "code": "/blackTechnology/vue/02" },
        // 11文章管理
        { "id": "WZGL", "parentId": "ALL", "name": "文章管理", "icon": "book", "code": "/article" },
        // 12系统管理
        { "id": "system_management", "parentId": "ALL", "name": "系统管理", "icon": "gears", "code": "/system" },
        { "id": "DANWEIGUANLI", "parentId": "system_management", "name": "单位管理", "icon": null, "code": "/system/dept" },
        { "id": "YONGHUGUANLI", "parentId": "system_management", "name": "用户管理", "icon": null, "code": "/system/user" },
        { "id": "QUANXIANGUANLI", "parentId": "system_management", "name": "权限管理", "icon": null, "code": "/system/permission" },
        { "id": "JUESEGUANLI", "parentId": "system_management", "name": "角色管理", "icon": null, "code": "/system/role" },
        { "id": "ZHUCEYONGHUSHENHE", "parentId": "system_management", "name": "注册用户审核", "icon": null, "code": "/system/user_review" },
        // 13部门+人员管理
        { "id": "DEPTANDUSER", "parentId": "ALL", "name": "人员管理", "icon": "gears", "code": "/deptAndUser" },
    ]
});
// 用户拥有的按钮权限
Mock.mock(/\/permission\/btn.htmls/, 'get', {
    "code": 1,
    "data": [
        { "name": "重置密码", "code": "user:btn:resetpw" },
        { "name": "查看", "code": "user:btn:look" },
        { "name": "删除", "code": "user:btn:delete" },
        { "name": "编辑", "code": "user:btn:edit" },
        { "name": "添加", "code": "user:btn:add" },
        { "name": "查看", "code": "role:btn:look" },
        { "name": "删除", "code": "role:btn:delete" },
        { "name": "编辑", "code": "role:btn:edit" },
        { "name": "添加", "code": "role:btn:add" },
        { "name": "查看", "code": "dept:btn:look" },
        { "name": "删除", "code": "dept:btn:delete" },
        { "name": "编辑", "code": "dept:btn:edit" },
        { "name": "添加", "code": "dept:btn:add" },
    ]
});
// 部门列表
Mock.mock(/\/dept\/list.htmls/, 'get', {
    "code": 1,
    "data": [
        { "deptId": "2", "parentId": "1", "name": "苹果单位", "type": 3 },
        { "deptId": "3", "parentId": "2", "name": "子单位1", "type": 3 },
        { "deptId": "4", "parentId": "2", "name": "子单位2", "type": 3 }
    ]
});
// 部门详情
Mock.mock(/\/dept\/detail.htmls/, 'get', {
    "code": 1,
    "data": {
        "deptId": "3",
        "parentId": "2",
        "name": "子单位1",
        "parentName": "",
        "description": "subunit",
        "type": 3
    }
});

// 角色列表
Mock.mock(/\/role\/list.htmls/, 'get', {
    "code": 1,
    "data": [
        { "roleId": "1", "parentId": "0", "name": "系统管理员", },
        { "roleId": "2", "parentId": "0", "name": "角色A", },
        { "roleId": "3", "parentId": "0", "name": "角色B", },
        { "roleId": "4", "parentId": "0", "name": "角色C", }
    ]
});
// 所有权限列表（不过滤当前用户拥有的权限）
Mock.mock(/\/permission\/all.htmls/, 'get', {
    "code": 1,
    "data": [
        { "permissionId": "XTGL", "parentId": "ALL", "name": "系统管理" },
        { "permissionId": "1", "parentId": "XTGL", "name": "单位管理" },
        { "permissionId": "11", "parentId": "1", "name": "查看" },
        { "permissionId": "12", "parentId": "1", "name": "删除" },
        { "permissionId": "13", "parentId": "1", "name": "编辑" },
        { "permissionId": "14", "parentId": "1", "name": "添加" },
    ]
});
// 角色详情
Mock.mock(/\/role\/detail.htmls/, 'get', {
    "code": 1,
    "data": {
        "roleId": "4",
        "parentId": "0",
        "name": "角色C",
        "parentName": "顶级",
        "description": "role C",
        "permissionList": [
            { "permissionId": "XTGL", "parentId": "ALL", "name": "系统管理", checked: true },
            { "permissionId": "1", "parentId": "XTGL", "name": "单位管理", checked: true },
            { "permissionId": "11", "parentId": "1", "name": "查看", checked: true },
            { "permissionId": "11", "parentId": "1", "name": "新增", checked: false },
        ]
    }
});
// 用户列表
Mock.mock(/\/user\/list.htmls/, 'get', {
    "data": [
        { "userId": "1", "username": "xiaoming", "realname": "小明", "roleName": "角色A", "isLocked": 0 },
        { "userId": "2", "username": "xiaohong", "realname": "小红", "roleName": "角色C", "isLocked": 0 }
    ],
    "count": 2
});
// 用户详情
Mock.mock(/\/user\/detail.htmls/, 'get', {
    "code": 1,
    "data": {
        "userId": "1",
        "username": "xiaoming",
        "realname": "小明",
        "phone": "13595462152",
        "email": "xiaoming@163.com",
        "deptId": "3",
        "deptName": "子单位1",
        "roleId": "2",
        "roleName": "角色A",
        "isLocked": 0
    }
});
// 注册用户审核列表
Mock.mock(/\/user\/needReview.htmls/, 'get', {
    "code": 1,
    "data": [
        { "userId": "3", "username": "xiaogang", "realname": "小刚", "phone": "15522465844", "email": null, "deptName": "测试调研" }
    ],
    "count": 1
});