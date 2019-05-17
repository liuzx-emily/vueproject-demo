const name = "user";
const attributes = ["id", "username", "name", "deptId", "roleId", "email", "phone", "order"];

const Op = require('sequelize').Op;
const EasyControllerExample = require("../utils/easyController")

const models = require("../utils/scanModels");
const MainModel = models[name];

const MainControllerExample = new EasyControllerExample(MainModel, {
    NeedCheckIsDelete: true,
    attributes: attributes,
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
    await MainModel.findAndCountAll({
        attributes: attributes,
        where: whereParam,
        offset: pagingParam.offset,
        limit: pagingParam.row,
        order: [
            ['order', 'asc']
        ],
        include: [{
            attributes: ["name"],
            association: MainModel.belongsTo(models.dept, { foreignKey: 'deptId' }),
        }, {
            attributes: ["name"],
            association: MainModel.belongsTo(models.role, { foreignKey: 'roleId' }),
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
    await MainModel.findByPk(id, {
        attributes: attributes,
        where: whereParam,
        include: [{
            attributes: ["name"],
            association: MainModel.belongsTo(models.dept, { foreignKey: 'deptId' }),
        }, {
            attributes: ["name"],
            association: MainModel.belongsTo(models.role, { foreignKey: 'roleId' }),
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

// const findAll = MainControllerExample.findAll;
// const findByPk = async (ctx, next) => { await MainControllerExample.findByPk(ctx, next) };
const create = async (ctx, next) => { await MainControllerExample.create(ctx, next) };
const update = async (ctx, next) => { await MainControllerExample.update(ctx, next) };
const destroy = async (ctx, next) => { await MainControllerExample.destroy(ctx, next) };
const destroyLogically = async (ctx, next) => { await MainControllerExample.destroyLogically(ctx, next) };


const login = async (ctx, next) => {
    // 取参数
    let whereParam = ctx.request.body;
    whereParam.isDelete = 0;
    await MainModel.findAll({
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
    { method: 'GET', url: `/${name}/list.do`, function: findAll },
    { method: 'GET', url: `/${name}/detail.do`, function: findByPk },
    { method: 'POST', url: `/${name}/add.do`, function: create },
    { method: 'POST', url: `/${name}/edit.do`, function: update },
    // { method: 'POST', url: `/${name}/delete.do`, function: destroy },
    { method: 'POST', url: `/${name}/delete.do`, function: destroyLogically },
    { method: 'POST', url: `/login.do`, function: login },
];