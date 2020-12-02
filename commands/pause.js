const Client = require('../structures/Client');
const { Message } = require('discord.js');
module.exports = {
    name: `pause`,
    /**
     * @param { Client } client
     * @param { Message } message
     * @param { String[] } args
     */
    run: async(client, message , args) => {
        if(!message.member.voice.channel) return message.channel.send(`⚠️ You have to be in a Voice Channel to use this command!`);
        if(!client.music.getQueue(message)) return message.channel.send(`❌ Nothing is playing Right Now!!`);
        await client.music.pause(message);
        message.channel.send(`⏸ Paused the song | Requested by ${message.author}`);
    }
}