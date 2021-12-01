const _ = require("lodash");

const appEnv = process.env.NODE_ENV;

module.exports = {
    enable: _.get(process, "env.ELASTIC_ENABLE", 'false'),
    apmServiceName: `${appEnv}-core-api`,
    apmServerUrl: _.get(process, "env.ELASTIC_APM_SERVER_URL", "http://localhost:8200")
};