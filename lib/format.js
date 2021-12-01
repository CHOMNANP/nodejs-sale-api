const logger = require('../lib/logger')('');

const _ = require('lodash');
const path = require('path');
const accountingjs = require('accounting-js');

module.exports = {
    formatAmount,
    format
};

function formatAmount(amount, currency) {
    let amountString = '';
    // console.log("currency", currency);
    try {
        switch (currency) {
            case 'khr':
                // console.log("1");
                amountString = accountingjs.formatMoney(amount, {
                    symbol: 'រ',
                    precision: 0
                });
                break;

            case 'usd':
                // console.log("2");
                amountString = accountingjs.formatMoney(amount, {
                    symbol: '$'
                });
                break;

            default:
                // console.log("3");
                amountString = `${amount} ${currency}`;
        }
    } catch (err) {
        // console.log("4");
        amountString = `${amount} ${currency}`;
    }
    return amountString;
}

function format(amount) {
    let amountString = '';
    try {
        amountString = accountingjs.formatMoney(amount);
    } catch (err) {
        amountString = amount;
    }
    return amountString;
}
