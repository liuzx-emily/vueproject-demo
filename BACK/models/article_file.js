const Sequelize = require('sequelize');

const EasyModelExample = require("./utils/easyModel");

let attributes = {
    // 这里的id会覆盖easyModel中的默认添加的id
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    articleId: {
        type: Sequelize.STRING(50),
        allowNull: false,
        comment: "文章id",
    },
    fileId: {
        type: Sequelize.STRING(50),
        allowNull: false,
        comment: "附件id",
    },
};

const model = new EasyModelExample({
    name: "article_file",
    attributes: attributes,
    options: {
        tableName: "t_article_file",
    },
    easyModelOptions: {
        hasField_order: false,
        hasField_isDelete: false,
    },
}).getModel();

module.exports = model;