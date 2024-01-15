# Anime Emoji Bot

A simple Telegram bot built with Node.js that lets users request anime emojis based on different emotion types.

## Features

- **Emotion-based Emoji Requests:** Users can request anime emojis based on different emotions such as happy, sad, angry, etc.

- **Extensible:** Easily add new emojis and emotion types to enhance the bot's functionality.

## Setup

1. **Create a Telegram Bot:**
   - Talk to [BotFather](https://t.me/botfather) on Telegram.
   - Follow the instructions to create a new bot.
   - Copy the token provided by BotFather.

2. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/Telegram-bot-for-anime-Emoji.git
   cd Telegram-bot-for-anime-Emoji
3. Install Dependencies: `npm install`
4. Configure the Bot:
  - Create a .env file in the project root.
  - Add your Telegram bot token to the .env file.
  - TELEGRAM_BOT_TOKEN=your_telegram_bot_token
5. Run the Bot: `npm start`
Start Using the Bot:

Open Telegram and search for your bot.
Start a chat with the bot and use the available commands to request anime emojis.
Usage
  - /photo sfw catagory [ catagory: {smile, dance, bully}]
  - /photos sfw catagory number  [ catagory: {smile, dance, bully}, number < 8 ]

Feel free to add more emotion types and emojis to the bot based on your preferences.
