const Sequelize = require('sequelize');

const EasyModelExample = require("./utils/easyModel");

let attributes = {
    title: {
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: "标题",
    },
    publisher: {
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: "发布者",
    },
    publishTime: {
        type: Sequelize.BIGINT,
        allowNull: false,
        comment: "发布时间",
    },
    content: {
        // Unlimited length TEXT column
        type: Sequelize.TEXT,
        allowNull: true,
        comment: "内容",
    },
    state: {
        type: Sequelize.STRING(1),
        allowNull: false,
        comment: "1未提交 2待审核 3审核通过 4审核不通过",
    },
    reason: {
        // Unlimited length TEXT column
        type: Sequelize.TEXT,
        allowNull: true,
        comment: "审核不通过的原因",
    },
};

const model = new EasyModelExample({
    name: "article",
    attributes: attributes,
    options: {
        tableName: "t_article",
    },
    easyModelOptions: {
        hasField_order: true,
        hasField_isDelete: true,
    },
});

module.exports = model;