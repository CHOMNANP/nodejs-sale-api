const _ = require('lodash');

module.exports = {
    dialect: _.get(process, 'env.DB_DIALECT', 'mysql'),
    host: _.get(process, 'env.DB_HOST', '127.0.0.1'),
    port: _.get(process, 'env.DB_PORT', 3306),
    database: _.get(process, 'env.DB_DATABASE', 'dummy'),
    username: _.get(process, 'env.DB_USERNAME', 'dummy'),
    password: _.get(process, 'env.DB_PASSWORD', 'dummy'),
    dialectOptions: {
        decimalNumbers: true,
        ssl: {
            require: true,
            rejectUnauthorized: false // <<<<<<< YOU NEED THIS
            // cert: Buffer.from(_.get(process, 'env.DB_SSL_CERT', ''), "base64").toString("ascii")
        },
        useUTC: false // for reading from database
    },
    timezone: '+07:00', // for writing to database
    logging: _.get(process, 'env.DB_LOGGING', true),

    pool: {
        max: 100,
        min: 0,
        acquire: 30000,
        idle: 10000

        // max: 5,
        // min: 0,
        // idle: 10000,
        // acquire: 10000,
        // evict: 10000,
        // handleDisconnects: true
    },
    define: {
        // underscored: true,
        freezeTableName: true
    }
};
