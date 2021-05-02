const Client = require('../structures/Client');
const { Message, MessageEmbed } = require('discord.js');
const config = require('../config/config.json')


module.exports = {
    name: `shutdown`,
    /**
     * @param { Client } client
     * @param { Message } message
     * @param { String[] } args
     */
    run: async(client, message , args) => {

        if(message.author.id != config.DISCORD_BOT.OWNER_ID) return message.channel.send(`Warning: This is a Bot-Owner-Only Command!!`);
        if(message.channel.id != config.DISCORD_BOT.DEV_COMMANDS_CHANNEL_ID) return message.channel.send(`Warning: Wrong Channel [Restricted Channel Used]`);
        try {
            process.exit();
        } catch (error) {
            console.error(error)
            message.channel.send(error);
        }
    }
}