const Sequelize = require('sequelize');

const EasyModelExample = require("./utils/easyModel");

let attributes = {
    name: {
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: "名称",
    },
    size: {
        type: Sequelize.BIGINT,
        allowNull: false,
        comment: "文件大小",
    },
    path: {
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: "存储路径",
    },
};

const model = new EasyModelExample({
    name: "file",
    attributes: attributes,
    options: {
        tableName: "t_file",
    },
    easyModelOptions: {
        hasField_order: false,
        hasField_isDelete: false,
    },
}).getModel();

module.exports = model; 