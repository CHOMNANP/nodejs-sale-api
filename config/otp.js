const _ = require("lodash");

module.exports = {
    timeout: 600, //time out of OTP in seconds
    size: 6, //OTP Size, 6 number OTP,
    isProductionMode: _.get(process, "env.OTP_IS_PRODUCTION_MODE", false)
};