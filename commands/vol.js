const Client = require('../structures/Client');
const { Message } = require('discord.js');
const config = require('../config/config.json');
module.exports = {
    name: `vol`,
    /**
     * @param { Client } client
     * @param { Message } message
     * @param { String[] } args
     */
    run: async(client, message , args) => {

        if(!args[0]) return message.channel.send(`⚠️ Did you forget to specify a query? Please specify one!`);
        if(args[0] >250 ) return message.channel.send(`⚠️ The Volume cannot exceed 250 !!`);
        if(!message.member.hasPermission('MANAGE_GUILD') || message.author.id != config.DISCORD_BOT.OWNER_ID) return message.channel.send(' ⚠️ You must have the MANAGE_GUILD Permission to run this command!');
        if(!message.member.voice.channel) return message.channel.send(`⚠️ You have to be in a Voice Channel to use this command!`);
        await client.music.setVolume(message, parseInt(args[0]));
        message.channel.send(`🎧 Volume Changed to \`${args[0]}\`!`)
    }
}