const Client = require('../structures/Client');
const { Message } = require('discord.js');
module.exports = {
    name: `stop`,
    /**
     * @param { Client } client
     * @param { Message } message
     * @param { String[] } args
     */
    run: async(client, message , args) => {
        if(!message.member.voice.channel) return message.channel.send(`⚠️ You have to be in a Voice Channel to use this command!`);
        if(!client.music.getQueue(message)) return message.channel.send(`❌ Nothing is playing Right Now!!`);

        let roleName = message.guild.roles.cache.find(role => role.name == 'DJ');
        if(!message.member.roles.cache.get(roleName && roleName.id)) return message.channel.send(`⚠️ You must have the 'DJ' role to use this command`);

        await client.music.stop(message);
        await client.music.setRadio(false);
        message.channel.send(`❌ Stopped the song | Requested by ${message.author}`);
    }
}