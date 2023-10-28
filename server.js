const dotenv = require("dotenv");
const TelegramBot = require("node-telegram-bot-api");

const getMeme = require("./utils/getMeme");

dotenv.config();

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, {polling: true});


bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, `Welcome ${msg.chat.first_name}`);
});

bot.onText(/\/echo/, (msg) => {
    const msgText = msg.text;
    const chatId = msg.chat.id;

    const parts = msgText.match(/^\/echo (.+)/);
    const echoPart = parts[1];

    bot.sendMessage(chatId, echoPart);
});

bot.onText(/\/meme/, async msg => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, "Here's your meme 😂");
    const img = await getMeme();

    bot.sendPhoto(chatId, img);
});

let interval;
bot.onText(/\/eye/, msg => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, "You are now Subscribed to eye reminders !");

    interval = setInterval(() => {
        bot.sendMessage(chatId, "Please take an eye break now !")
            .catch(console.error);
    }, 1000*5);
});

bot.onText(/\/stop/, msg => {
    const chatId = msg.chat.id;

    clearInterval(interval);
    bot.sendMessage(chatId, "You are now Unsubscribed to eye reminders !");
});

