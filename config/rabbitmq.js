const _ = require("lodash");

module.exports = {
    connectionUrl: _.get(process, "env.RABITMQ_CONNECTION_URL", 'localhost:5672')
};