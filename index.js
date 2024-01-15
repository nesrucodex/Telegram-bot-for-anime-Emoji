import express from "express";
import cors from "cors";
import TelegramBot from "node-telegram-bot-api";

import dotenv from "dotenv";
dotenv.config();

import axios from "axios";
function botAction(bot, url) {
  bot.on("polling_error", () => {});
  bot.onText(/\/photo (.*)/, async (message, match) => {
    const chatId = message.chat.id;
    let [type, category] = match.at(1).split(" ");
    if (!type) type = "sfw";
    if (!category) category = "smile";

    try {
      const res = await axios.get(`${url}/${type}/${category}`);
      const image = res.data;
      bot.sendPhoto(chatId, image.url, { caption: category + " image" });
    } catch (err) {
      bot.sendMessage(
        chatId,
        `There is no any image with ${type} type and ${category} catagory, try again.`
      );
    }
  });
  bot.onText(/\/photos (.*)/, async (message, match) => {
    const chatId = message.chat.id;
    let [type, category, num] = match.at(1).split(" ");
    if (!type) type = "sfw";
    if (!category) category = "smile";
    num = parseInt(num);
    if (isNaN(num)) num = 7;

    try {
      const res = await axios.post(`${url}/many/${type}/${category}`, {});
      const files = res.data.files;
      const mediaGroup = files
        .map((file) => ({ type: "photo", media: file }))
        .slice(0, num);

      bot.sendMediaGroup(chatId, mediaGroup);
    } catch (err) {
      console.log("03.Error: ", err.message);
      bot.sendMessage(
        chatId,
        `There is no any images with ${type} type and ${category} catagory & ${num} count, try again.`
      );
    }
  });

  bot.onText(/^\/photo$/, async (message, match) => {
    const chatId = message.chat.id;
    let type = "sfw";
    let category = "smile";

    try {
      const res = await axios.get(`${url}/${type}/${category}`);
      const image = res.data;
      bot.sendPhoto(chatId, image.url, { caption: category + " image" });
      bot.sendMessage(
        chatId,
        "#Avaliable Methods are: \n 1. /photo type catagory \n 2. /photos type catagory number"
      );
    } catch (err) {
      bot.sendMessage(
        chatId,
        `There is no any image with ${type} type and ${category} catagory, try again.`
      );
    }
  });

  bot.onText(/^\/photos$/, async (message, match) => {
    const chatId = message.chat.id;
    let type = "sfw";
    let category = "smile";
    let num = 7;

    try {
      const res = await axios.post(`${url}/many/${type}/${category}`, {});
      const files = res.data.files;
      const mediaGroup = files
        .map((file) => ({ type: "photo", media: file }))
        .slice(0, num);

      bot.sendMediaGroup(chatId, mediaGroup);
      bot.sendMessage(
        chatId,
        "#Avaliable Methods are: \n 1. /photo type catagory \n 2. /photos type catagory number"
      );
    } catch (err) {
      console.log("03.Error: ", err.message);
      bot.sendMessage(
        chatId,
        `There is no any images with ${type} type and ${category} catagory, try again.`
      );
    }
  });

  bot.on("message", (message) => {
    const chatId = message.chat.id;
    const text = message.text;
    if (!text.includes("/photo") && !text.includes("/photos"))
      return bot.sendMessage(
        chatId,
        "#Avaliable Methods are: \n 1. /photo type catagory \n 2. /photos type catagory number"
      );
  });
}

const url = "https://api.waifu.pics";
const token = process.env.BOT_API_TOKEN;

const app = express();
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "This is telegram bot" });
});

const bot = new TelegramBot(token, { polling: true });

const PORT = process.env.PORT || 4040;
app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
  botAction(bot, url);
});
