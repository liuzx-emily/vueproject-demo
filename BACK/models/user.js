const Sequelize = require('sequelize');

const EasyModelExample = require("./utils/easyModel");

let attributes = {
    deptId: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "部门id"
    },
    roleId: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "角色id"
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "帐号",
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "姓名",
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "密码",
    },
    email: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: "email",
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: "手机",
    },
    profilePhoto: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: "头像",
    },
    temp1: {
        type: Sequelize.STRING,
        allowNull: true,
    },
};

module.exports = new EasyModelExample({
    name: "user",
    attributes: attributes,
    options: {
        tableName: "t_user",
    },
    easyModelOptions: {
        hasField_order: true,
        hasField_isDelete: true,
    },
}).getModel();;