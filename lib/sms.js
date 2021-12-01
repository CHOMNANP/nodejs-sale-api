const {resolve} = require('path');
const twilio = require("twilio");
const Sentry = require(resolve('./lib/sentry'));

const {
    twilio: twilioConf
} = require(resolve("./lib/config"));

const client = new twilio(twilioConf.sid, twilioConf.token);
const logger = require(resolve("./lib/logger"))("lib/sms");

module.exports = {
    sendSms,    
};

async function sendSms(phoneNumberTo, message) {

    try {
        await client.messages.create({
            from: twilioConf.sender,
            to: phoneNumberTo,
            body: message
        });
    } catch (ex) {
        // Sentry.captureException(ex);            
        logger.debug(`error sending sms to ${phone_number_to}`);
    }
}