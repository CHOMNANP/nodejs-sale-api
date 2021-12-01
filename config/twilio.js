const _ = require('lodash');

module.exports = {
    valid_time: 300,
    sender: _.get(process, "env.TWILIO_SENDER", "dummy"),
    sid: _.get(process, "env.TWILIO_SID", "dummy"),
    token: _.get(process, "env.TWILIO_TOKEN", "dummy"),
};