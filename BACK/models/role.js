const Sequelize = require('sequelize');

const EasyModelExample = require("./utils/easyModel");

let attributes = {
    name: {
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: "名称",
    },
    parentId: {
        type: Sequelize.STRING(50),
        allowNull: false,
        comment: "父级id",
    },
    description: {
        // Unlimited length TEXT column
        type: Sequelize.TEXT,
        allowNull: true,
        comment: "描述（没什么用，为了前端页面能有一个textarea效果而加的。）",
    },
};

module.exports = new EasyModelExample({
    name: "role",
    attributes: attributes,
    options: {
        tableName: "t_role",
    },
    easyModelOptions: {
        hasField_order: true,
        hasField_isDelete: true,
    },
}).getModel();;