const Sequelize = require('sequelize');

const EasyModelExample = require("../utils/easyModel");

let attributes = {
    // 这里的id会覆盖easyModel中的默认添加的id
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    roleId: {
        type: Sequelize.STRING(50),
        allowNull: false,
        comment: "角色id",
    },
    permissionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: "权限id",
    },
};

const model = new EasyModelExample({
    name: "role_permission",
    attributes: attributes,
    options: {
        tableName: "t_role_permission",
    },
    easyModelOptions: {
        hasField_order: false,
        hasField_isDelete: false,
    },
}).getModel();

module.exports = model;