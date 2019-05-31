const Sequelize = require('sequelize');

const EasyModelExample = require("./utils/easyModel");

let attributes = {
    // 这里的id会覆盖easyModel中的默认添加的id
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: "名称",
    },
    parentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: "父级id",
    },
    type: {
        type: Sequelize.TINYINT,
        allowNull: false,
        comment: "1导航(无内容) 2菜单 3按钮",
    },
    code: {
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: "url或者code值",
    },
    icon: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: "icon",
    },
    description: {
        // Unlimited length TEXT column
        type: Sequelize.TEXT,
        allowNull: true,
        comment: "描述",
    },
};

const model = new EasyModelExample({
    name: "permission",
    attributes: attributes,
    options: {
        tableName: "t_permission",
    },
    easyModelOptions: {
        hasField_order: true,
        hasField_isDelete: true,
    },
}).getModel();

module.exports = model;