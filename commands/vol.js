const Client = require('../structures/Client');
const { Message } = require('discord.js');
module.exports = {
    name: `vol`,
    /**
     * @param { Client } client
     * @param { Message } message
     * @param { String[] } args
     */
    run: async(client, message , args) => {

        if(!args[0]) return message.channel.send(`⚠️ Did you forget to specify a query? Please specify one!`);
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(' ⚠️ You must have the MANAGE_GUILD Permission to run this command!');
        if(!message.member.voice.channel) return message.channel.send(`⚠️ You have to be in a Voice Channel to use this command!`);
        await client.music.setVolume(message, parseInt(args[0]));
        message.channel.send(`🎧 Volume Changed!`)
    }
}