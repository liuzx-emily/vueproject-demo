const Sequelize = require('sequelize');

const sequelize = require("../utils/initDatabase");

// Modeling a table
const Dept = sequelize.define("dept", {
    id: {
        primaryKey: true,
        type: Sequelize.STRING(50),
        allowNull: false,
        comment: "",
    },
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
    type: {
        type: Sequelize.TINYINT,
        allowNull: false,
        comment: "类型（没什么用，为了前端页面能有一个单选效果而加的。）",
    },
    description: {
        // Unlimited length TEXT column
        type: Sequelize.TEXT,
        allowNull: true,
        comment: "描述（没什么用，为了前端页面能有一个textarea效果而加的。）",
    },
    order: {
        type: Sequelize.TINYINT,
        allowNull: true,
        comment: "排序字段"
    },
    isDelete: {
        type: Sequelize.TINYINT,
        allowNull: false,
        comment: "0正常1删除",
        defaultValue: 0
    },
    createTime: {
        type: Sequelize.BIGINT,
        allowNull: false,
        comment: "创建时间"
    },
    updateTime: {
        type: Sequelize.BIGINT,
        allowNull: false,
        comment: "修改时间"
    },
}, {
    // options
    tableName: "t_dept",
    hooks: {
        beforeValidate(obj) {
            console.log("---------- dept beforeValidate ---------- ")
            obj.createTime = Date.now();
            obj.updateTime = Date.now();
        },
        afterValidate() {},
        validationFailed() {},
        beforeBulkCreate() {},
        beforeBulkDestroy() {},
        beforeBulkUpdate() {},
        beforeCreate(obj) {
            console.log("---------- dept beforeCreate ---------- ")
            obj.createTime = Date.now();
            obj.updateTime = Date.now();
        },
        beforeDestroy() {},
        beforeUpdate() {},
        afterDestroy() {},
        afterUpdate() {},
        afterBulkCreate() {},
        afterBulkDestroy() {},
        afterBulkUpdate() {},
    }
});

module.exports = Dept;