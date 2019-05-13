const fs = require("fs");
const models = {};
fs.readdirSync("./models").filter(fileName => {
    return fileName.endsWith(".js");
}).forEach(fileName => {
    let name = fileName.slice(0, -3);
    let model = require("../models/" + fileName);
    models[name] = model;

    // Synchronizing the model with the database
    // Note: using `force: true` will drop the table if it already exists
    model.sync({ force: false }).then(() => {});
})

module.exports = models;