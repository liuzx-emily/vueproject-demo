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
        { "permissionId": "presetStyle", "parentId": "ALL", "name": "预设样式", "icon": "cube", "uri": "/presetStyle" },
        { "permissionId": "presetStyle_btn", "parentId": "presetStyle", "name": "按钮", "icon": null, "uri": "/presetStyle/btn" },
        { "permissionId": "presetStyle_searchCondition", "parentId": "presetStyle", "name": "搜索条件", "icon": null, "uri": "/presetStyle/searchCondition" },
        // 02组件使用说明
        { "permissionId": "componentInstructions", "parentId": "ALL", "name": "组件说明", "icon": "superpowers", "uri": "/componentInstructions" },     
        { "permissionId": "componentInstructions_xTable", "parentId": "componentInstructions", "name": "表格xTable", "icon": null, "uri": "/componentInstructions/xTable" },   
        { "permissionId": "componentInstructions_treeTable", "parentId": "componentInstructions", "name": "treeTable", "icon": null, "uri": "/componentInstructions/treeTable" },   
        { "permissionId": "componentInstructions_horizontalScrolling", "parentId": "componentInstructions", "name": "横向滚动", "icon": null, "uri": "/componentInstructions/horizontalScrolling" },
        // 03插件DEMO
        { "permissionId": "pluginDemo", "parentId": "ALL", "name": "插件DEMO", "icon": "leaf", "uri": "/pluginDemo" },
        { "permissionId": "pluginDemo_echarts", "parentId": "pluginDemo", "name": "图表", "icon": null, "uri": "/pluginDemo/echarts" },
        { "permissionId": "pluginDemo_guide", "parentId": "pluginDemo", "name": "Guide", "icon": null, "uri": "/pluginDemo/guide" },
        // 04黑科技
        { "permissionId": "blackTechnology", "parentId": "ALL", "name": "黑科技&难点", "icon": "magic", "uri": "/blackTechnology" },
        { "permissionId": "blackTechnology_css", "parentId": "blackTechnology", "name": "CSS", "icon": null, "uri": "/blackTechnology/css" },
        { "permissionId": "blackTechnology_css_01", "parentId": "blackTechnology_css", "name": "使用css绘制图形", "icon": null, "uri": "/blackTechnology/css/01" },
        { "permissionId": "blackTechnology_css_02", "parentId": "blackTechnology_css", "name": "利用CSS的content属性attr抓取资料", "icon": null, "uri": "/blackTechnology/css/02" },
        { "permissionId": "blackTechnology_js", "parentId": "blackTechnology", "name": "Javascript", "icon": null, "uri": "/blackTechnology/js" },
        { "permissionId": "blackTechnology_html", "parentId": "blackTechnology", "name": "HTML", "icon": null, "uri": "/blackTechnology/html" },
        { "permissionId": "blackTechnology_html_01", "parentId": "blackTechnology_html", "name": "输入数学公式", "icon": null, "uri": "/blackTechnology/html/01" },
        { "permissionId": "blackTechnology_complex", "parentId": "blackTechnology", "name": "综合", "icon": null, "uri": "/blackTechnology/complex" },
        { "permissionId": "blackTechnology_complex_01", "parentId": "blackTechnology_complex", "name": "打印", "icon": null, "uri": "/blackTechnology/complex/01" },
        { "permissionId": "blackTechnology_complex_02", "parentId": "blackTechnology_complex", "name": "页面导出PDF", "icon": null, "uri": "/blackTechnology/complex/02" },
        { "permissionId": "blackTechnology_vue", "parentId": "blackTechnology", "name": "vue相关", "icon": null, "uri": "/blackTechnology/vue" },
        { "permissionId": "blackTechnology_vue_01", "parentId": "blackTechnology_vue", "name": "图片的src是变量", "icon": null, "uri": "/blackTechnology/vue/01" },
        { "permissionId": "blackTechnology_vue_02", "parentId": "blackTechnology_vue", "name": "在初始化方法完成后再加载其他部分", "icon": null, "uri": "/blackTechnology/vue/02" },
        // 11文章管理
        { "permissionId": "WZGL", "parentId": "ALL", "name": "文章管理", "icon": "book", "uri": "/article" },
        // 12系统管理
        { "permissionId": "system_management", "parentId": "ALL", "name": "系统管理", "icon": "gears", "uri": "/system" },
        { "permissionId": "DANWEIGUANLI", "parentId": "system_management", "name": "单位管理", "icon": null, "uri": "/system/dept" },
        { "permissionId": "YONGHUGUANLI", "parentId": "system_management", "name": "用户管理", "icon": null, "uri": "/system/user" },
        { "permissionId": "JUESEGUANLI", "parentId": "system_management", "name": "角色管理", "icon": null, "uri": "/system/role" },
        { "permissionId": "ZHUCEYONGHUSHENHE", "parentId": "system_management", "name": "注册用户审核", "icon": null, "uri": "/system/user_review" },
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