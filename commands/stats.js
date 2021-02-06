const Client = require('../structures/Client');
const { Message, MessageEmbed } = require('discord.js');
module.exports = {
    name: `stats`,
    /**
     * @param { Client } client
     * @param { Message } message
     * @param { String[] } args
     */
    run: async(client, message , args) => {

        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);

        const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`
            **Stats for RaagTune!**

            Guilds: \`${client.guilds.cache.size.toLocaleString()}\`
            Users: \`${client.users.cache.size.toLocaleString()}\`
            Channels: \`${client.channels.cache.size.toLocaleString()}\`
            Uptime: \`${days}\` Days | \`${hours}\` Hours | \`${minutes}\` Minutes | \`${seconds}\` Seconds   
            Discord API Version: \`${client.options.http?.version || 'Unknown'}\`
            Running OS: \`${process.platform || 'Unknown'}\`
            Websocket Ping: \`${client.ws.ping}\`
        `)
        .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true, format: `png`}))

        message.channel.send(embed);

        

    }
}

