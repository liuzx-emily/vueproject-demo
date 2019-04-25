const Sequelize = require('sequelize');
const sequelize = require("../utils/initDatabase");

// Modeling a table
const User = sequelize.define("user", {
    id: {
        primaryKey: true,
        type: Sequelize.STRING,
        allowNull: false,
        comment: "",
    },
    deptId: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "部门id",
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "帐号",
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
}, {
    tableName: "t_user"
});

module.exports = User;