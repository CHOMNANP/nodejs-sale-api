const _ = require("lodash");

module.exports = {
    host: _.get(process, "env.REDIS_HOST", "127.0.0.1"),
    port: _.get(process, "env.REDIS_PORT", 6379),
    db: _.get(process, "env.REDIS_INDEX", 1),
    // password: _.get(process, "env.REDIS_PASSWORD", "")
};