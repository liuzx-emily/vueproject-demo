const Sequelize = require('sequelize');

const EasyModelExample = require("./utils/easyModel");

let attributes = {
	name: {
		type: Sequelize.STRING(255),
		allowNull: false,
		comment: "名称",
	},
};

module.exports = new EasyModelExample({
	name: "role",
	attributes: attributes,
	options: {
		tableName: "t_role",
	},
	easyModelOptions: {},
});