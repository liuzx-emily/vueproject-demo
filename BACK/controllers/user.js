const EasyControllerExample = require("../utils/easyController")

const models = require("../utils/scanModels");
const User = models.user;


const attributes = ["id", "username", "name", "deptId", "roleId", "email", "phone", "order"];


const UserController = new EasyControllerExample(User, {
    NeedCheckIsDelete: true,
    attributes: undefined,
});


const findAll = async (ctx, next) => {
    let whereParam = {};
    // whereParam.deptId = ctx.request.body.deptId;
    whereParam.deptId = ctx.query.deptId;
    whereParam.isDelete = 0;
    let pagingParam = {};
    pagingParam.page = parseInt(ctx.query.page);
    pagingParam.row = parseInt(ctx.query.row);
    pagingParam.offset = (pagingParam.page - 1) * pagingParam.row;
    await User.findAndCountAll({
        attributes: attributes,
        where: whereParam,
        offset: pagingParam.offset,
        limit: pagingParam.row,
        order: [
            ['order', 'asc']
        ],
        include: [{
            attributes: ["name"],
            association: User.belongsTo(models.dept, { foreignKey: 'deptId' }),
        }, {
            attributes: ["name"],
            association: User.belongsTo(models.role, { foreignKey: 'roleId' }),
        }, ]
    }).then(result => {
        let arr = result.rows.map(item => {
            // item.constructor.toString() == "class extends Model {}"
            // item无法添加和删除属性（可以修改属性的值）。
            // 所以只能新建一个干净的object，然后循环attributes赋值。
            let obj = {};
            attributes.forEach(key => {
                obj[key] = item[key];
            });
            obj.deptName = item.dept.name;
            obj.roleName = item.role.name;
            return obj;
        });
        ctx.response.body = {
            code: 1,
            data: arr,
            count: result.count
        };
    }).catch(err => {
        console.error(err);
        ctx.response.body = { code: -1 };
    });
};


const findByPk = async (ctx, next) => {
    let id = ctx.query.id;
    let whereParam = {};
    whereParam.isDelete = 0;
    await User.findByPk(id, {
        attributes: attributes,
        where: whereParam,
        include: [{
            attributes: ["name"],
            association: User.belongsTo(models.dept, { foreignKey: 'deptId' }),
        }, {
            attributes: ["name"],
            association: User.belongsTo(models.role, { foreignKey: 'roleId' }),
        }, ]
    }).then(data => {
        let obj = {};
        attributes.forEach(key => {
            obj[key] = data[key];
        });
        obj.deptName = data.dept.name;
        obj.roleName = data.role.name;
        ctx.response.body = {
            code: 1,
            data: obj
        };
    }).catch(err => {
        console.error(err);
        ctx.response.body = { code: -1 };
    });
};

// 不能这样赋值。因为这样的话,findAll内部的this是undefined。
// const findAll = UserController.findAll;
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