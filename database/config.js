require('dotenv').config();
const path = require('path');
const { db: dbConfig } = require(path.resolve("./lib/config"));

dbConfig.logging = false;

module.exports = dbConfig;