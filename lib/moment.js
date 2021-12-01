const moment = require('moment-timezone');
const { resolve } = require('path');
const { app: appConfig } = require(resolve('./lib/config'));

moment.tz.setDefault(appConfig.timeZone);
module.exports = moment;
