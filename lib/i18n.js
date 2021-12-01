const i18n = require("i18n");
const path = require('path');
const logger = require(path.resolve("./lib/logger"))("index");

i18n.configure({
    locales: ['en', 'kh'],
    defaultLocale: 'en',
    directory: path.resolve('./i18n')
    // logDebugFn: function (msg) {
    //     console.log('debug', msg);
    // },

});
i18n.setLocale('en');

logger.info(i18n.__("server-start-success"));

module.exports = i18n;
