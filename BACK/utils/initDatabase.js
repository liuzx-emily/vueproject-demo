// -----------------------------------------------------1 Setting up a connection -----------------------------------------------------
const Sequelize = require('sequelize');

const config = require('../config');

var sequelize = new Sequelize({
    dialect: 'mysql',
    host: config.database.host,
    username: config.database.username,
    password: config.database.password,
    database: config.database.database,
    // pool: {
    //     max: 5,
    //     min: 0,
    //     acquire: 30000,
    //     idle: 10000
    // },
    // Default options for model definitions
    define: {
        // Adds createdAt and updatedAt timestamps to the model【default:true】
        timestamps: false,
        // The table name is automatically pluralized by default. This behavior can be stopped by using the freezeTableName: true option.【default:false】
        freezeTableName: true
    },
});

// Testing the connection
// sequelize.authenticate().then(() => {
//     console.log('数据库连接成功！');
// }).catch(err => {
//     console.error('数据库连接失败：', err);
// });

module.exports = sequelize;