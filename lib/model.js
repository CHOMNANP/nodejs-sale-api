const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
require('pg').defaults.parseInt8 = true;
Sequelize.postgres.DECIMAL.parse = function (value) { return parseFloat(value); };

const {
    db: dbConfig,
    app: appConfig,
    modules: moduleConfig
} = require("./config");

const sequelize = new Sequelize(dbConfig);
const models = {};
let relations = [];
let ready = false;

for (const module of moduleConfig) {    
    const modelDir = fs.readdirSync(module.modelPath);
    for (const model of modelDir) {
        if (model.endsWith(".js") && model != "_relation.js") {
            models[model.replace(/.js/g, "")] = sequelize.import(path.resolve(module.modelPath, model));
        } else if (model == "_relation.js") {
            relations.push({ path: path.resolve(module.modelPath, model) });
        }
    }
}

models.Sequelize = Sequelize;
models.sequelize = sequelize;
models.isReady = () => { return ready; };
module.exports = models;

//Join relatiionship of tables
for (const relation of relations) {
    // console.log(relation.path);
    require(relation.path)(models);
}

ready = true;
