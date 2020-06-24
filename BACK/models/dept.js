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
};

const model = new EasyModelExample({
	name: "dept",
	attributes: attributes,
	options: {
		tableName: "t_dept",
	},
	easyModelOptions: {},
});

module.exports = model;