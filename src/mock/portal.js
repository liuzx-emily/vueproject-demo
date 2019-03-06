import Mock from 'mockjs'
// 导航
Mock.mock(/\/portal\/nav.htmls/, 'get', {
    "code": 1,
    "message": "SUCCESS",
    "data": [
        { "name": "栏目1", "path": "/list/1" },
        { "name": "栏目2", "path": "/list/2" },
        { "name": "栏目3", "path": "/list/3" }
    ],
    "description": ""
});

// 首页的栏目