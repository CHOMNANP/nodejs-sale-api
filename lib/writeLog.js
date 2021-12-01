const moment = require("moment");
const winston = require("winston");
const fs = require('fs');
const env = process.env.NODE_ENV || 'development';

const tsFormat = moment(new Date()).format('MMMM Do YYYY, h:mm:ss a');
let day = new Date().getDay();
let numDaysInMonth = new Date().getDate();
let numWeek = Math.ceil((numDaysInMonth + day) / 7); //get week(num) of the month

const logDir = 'log';
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

module.exports.writeLog = new(winston.Logger)({
    transports: [
        // colorize the output to the console
        new(winston.transports.Console)({
            timestamp: tsFormat,
            colorize: true,
            level: 'info'
        }),
        new(winston.transports.File)({
            filename: `${logDir}/Webhook: WEEK ${numWeek}.log`,
            timestamp: tsFormat,
            level: env === 'development' ? 'debug' : 'info'
        })
    ]
});