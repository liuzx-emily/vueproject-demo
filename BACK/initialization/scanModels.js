const fs = require("fs");
const sequelize = require("./connectDatabase");
const path = require("path");

const models = {};

fs.readdirSync("./models").filter(fileName => {
	return fileName.endsWith(".js");
}).forEach(fileName => {
	let name = fileName.slice(0, -3);
	let filePath = path.resolve(process.cwd(), './models/', fileName);
	let model = require(filePath);
	models[name] = model.register(sequelize);

	// Synchronizing the model with the database
	// Note: using `force: true` will drop the table if it already exists and 数据会丢失
	// model.sync({ force: false }).then(() => {});
})

module.exports = models;