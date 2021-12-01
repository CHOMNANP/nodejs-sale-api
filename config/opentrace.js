const _ = require("lodash");

module.exports = {
    collectorEndpoint: _.get(process, "env.OPENTRACE_COLLECTOR_ENDPOINT", "http://localhost:14268/api/traces")
};