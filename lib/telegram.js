const _ = require('lodash');
const {resolve} = require('path');
const { telegram: telegramConfig } = require(resolve('./lib/config'));
const { Telegraf } = require('telegraf')
const bot = new Telegraf(telegramConfig.botToken)

if(telegramConfig.allowWebhook == 'TRUE'){
    bot.launch()

    bot.command('password', (ctx) => {
        // console.log("on password===>");    
        ctx.reply(`Your chat id is ${ctx.message.chat.id}`)
    })
}
module.exports = {
    bot: bot
};
