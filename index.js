require('dotenv').config();
const express = require('express');
const app = express();
const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const path = require('path');

const TOKEN = process.env.PUBLIC_KEY;

// Read the file synchronously on startup
const beeScript = fs.readFileSync(path.join(__dirname, 'text.txt'), 'utf-8').split('\n').join(' ').split('\r').join(' ');

const arr = beeScript.split('');
const beeScriptArr = [];
for (let i = 0; i < arr.length; i++) {
    beeScriptArr.push(arr.splice(0, 1999).join(''));
}

// Create the bot client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.on('ready', () => {
    console.log(`\nLogged in as ${client.user.tag}!`);
});

client.on('messageCreate', message => {
    // Ignore the bot’s own messages
    if (message.author.bot) return;

    // Another command
    if (message.content === '!beemovie') {
        beeScriptArr.forEach(section => {
            // console.log(section);
            // setTimeout(function () {
            message.reply(section);
            // }, 500);
        });
    }
});

client.login(TOKEN);

app.get('/', (req, res) => {
    res.send('Bot is alive!');
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Health check server running');
});