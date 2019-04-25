const EasyControllerExample = require("../utils/easyController")

const models = require("../utils/scanModels");
const User = models.user;

const UserController = new EasyControllerExample(User, {
    NeedCheckIsDelete: true,
    attributes: undefined,
});


// 不能这样简单赋值。因为这样的话,findAll内部的this是undefined。【为什么this会丢还不知道】
// const findAll = UserController.findAll;


const findAll = async (ctx, next) => { await UserController.findAll(ctx, next) };
const findByPk = async (ctx, next) => { await UserController.findByPk(ctx, next) };
const create = async (ctx, next) => { await UserController.create(ctx, next) };
const update = async (ctx, next) => { await UserController.update(ctx, next) };
const destroy = async (ctx, next) => { await UserController.destroy(ctx, next) };
const destroyLogically = async (ctx, next) => { await UserController.destroyLogically(ctx, next) };

const login = async (ctx, next) => {
    // 取参数
    let whereParam = ctx.request.body;
    whereParam.isDelete = 0;
    await User.findAll({
        where: whereParam
    }).then(res => {
        if (res.length > 0) {
            ctx.response.body = { code: 1 };
        } else {
            ctx.response.body = { code: 0, message: "账号、密码错误" };
        }
    }).catch(err => {
        console.error(err);
        ctx.response.body = { code: -1 };
    });

};
module.exports = [
    { method: 'GET', url: "/user/list.do", function: findAll },
    { method: 'GET', url: "/user/detail.do", function: findByPk },
    { method: 'POST', url: "/user/add.do", function: create },
    { method: 'POST', url: "/user/edit.do", function: update },
    // { method: 'POST', url: "/user/delete.do", function: destroy },
    { method: 'POST', url: "/user/delete.do", function: destroyLogically },
    // 
    { method: 'POST', url: "/login.do", function: login },
];