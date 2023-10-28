const dotenv = require("dotenv");
const TelegramBot = require("node-telegram-bot-api");

dotenv.config();

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, {polling: true});

bot.on("message", msg => {
    const chatId = msg.chat.id;
    const msgText = msg.text;

    if(msgText === "/start"){
        bot.sendMessage(chatId, "Welcome here !!");
    }
});