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
        { "permissionId": "1", "parentId": "XTGL", "name": "单位管理", "icon": null, "uri": "/system/dept" },
        { "permissionId": "2", "parentId": "XTGL", "name": "用户管理", "icon": null, "uri": "/system/user" },
        { "permissionId": "3", "parentId": "XTGL", "name": "角色管理", "icon": null, "uri": "/system/role" },
        { "permissionId": "4", "parentId": "XTGL", "name": "注册用户审核", "icon": null, "uri": "/system/user_review" },
        { "permissionId": "XTGL", "parentId": "ALL", "name": "系统管理", "icon": "gears", "uri": "/system" },
        { "permissionId": "EXAMPLE", "parentId": "ALL", "name": "例子", "icon": "snowflake-o", "uri": "/example" },
        { "permissionId": "mathformula", "parentId": "EXAMPLE", "name": "输入数学公式", "icon": null, "uri": "/example/mathformula" },
        { "permissionId": "demo", "parentId": "ALL", "name": "demo", "icon": "magic", "uri": "/demo" },
        { "permissionId": "WZGL", "parentId": "ALL", "name": "文章管理", "icon": "magic", "uri": "/article" },
        { "permissionId": "xTable", "parentId": "EXAMPLE", "name": "表格", "icon": null, "uri": "/example/xTable" },
        { "permissionId": "charts", "parentId": "EXAMPLE", "name": "图表", "icon": null, "uri": "/example/charts" },
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