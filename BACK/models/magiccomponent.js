const Sequelize = require('sequelize');

const EasyModelExample = require("./utils/easyModel");

let attributes = {
    parentId: {
        type: Sequelize.STRING(50),
        allowNull: false,
        comment: "父级id",
    },
    contentId: {
        type: Sequelize.STRING(50),
        allowNull: false,
        comment: "所属内容id",
    },
    x: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    y: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    width: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    height: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    title: {
        // Unlimited length TEXT column
        type: Sequelize.TEXT,
        allowNull: true,
    },
    content: {
        // Unlimited length TEXT column
        type: Sequelize.TEXT,
        allowNull: true,
    },
    backgroundType: {
        type: Sequelize.TINYINT,
        allowNull: true,
        comment: "1无 2背景颜色 3背景图片",
    },
    backgroundColor: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    backgroundImgUrl: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    borderRadius: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    borderStyle: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: "1无 solid dashed",
    },
    borderColor: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    borderWidth: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
};

module.exports = new EasyModelExample({
    name: "magiccomponent",
    attributes: attributes,
    options: {
        tableName: "t_magiccomponent",
    },
    easyModelOptions: {
        hasField_order: false,
        hasField_isDelete: false,
    },
}).getModel();;