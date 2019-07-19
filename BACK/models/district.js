const Sequelize = require('sequelize');
const sequelize = require("../initialization/initDatabase");

// 不用easyModel

let attributes = {
    id: {
        primaryKey: true,
        type: Sequelize.TINYINT,
        allowNull: false,
        comment: "",
    },
    name: {
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: "名称",
    },
    parentId: {
        type: Sequelize.TINYINT,
        allowNull: false,
        comment: "父级id",
    },
    pinyin: {
        type: Sequelize.STRING(600),
        allowNull: false,
        comment: "拼音",
    },
    initial: {
        type: Sequelize.STRING(3),
        allowNull: false,
        comment: "拼音首字母",
    },
    initials: {
        type: Sequelize.STRING(30),
        allowNull: false,
        comment: "拼音首字母集合",
    },
    suffix: {
        type: Sequelize.STRING(15),
        allowNull: false,
        comment: "行政级别",
    },
    code: {
        type: Sequelize.STRING(30),
        allowNull: false,
        comment: "行政代码",
    },
    order: {
        type: Sequelize.TINYINT,
        allowNull: true,
        comment: "排序字段"
    },
};

const model = sequelize.define("district", attributes, {
    tableName: "t_district",
}, );

module.exports = model;