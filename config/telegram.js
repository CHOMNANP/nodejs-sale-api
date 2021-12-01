const _ = require('lodash');

module.exports = {
    botToken: _.get(process, 'env.BOT_TOKEN', 'dummy'),
    allowWebhook:  _.get(process, 'env.BOT_ALLOW_WEBHOOK', 'FALSE'),
};
