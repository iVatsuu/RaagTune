const Client = require('../structures/Client');
const { Message, MessageEmbed } = require('discord.js');
const config = require('../config/config.json');

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

        let stats = client.music.shoukaku.getNode("Node1").stats;

        
        const allocated = Math.floor(stats.memory.allocated / 1024 / 1024);
        const used = Math.floor(stats.memory.used / 1024 / 1024);
        const free = Math.floor(stats.memory.free / 1024 / 1024);
        const reservable = Math.floor(stats.memory.reservable / 1024 / 1024);

        const systemLoad = (stats.cpu.systemLoad * 100).toFixed(2);
        const lavalinkLoad = (stats.cpu.lavalinkLoad * 100).toFixed(2);

        const embed = new MessageEmbed()
        .setAuthor('RaagTune')
        .setColor('RANDOM')
        .setDescription(`
            **Stats for RaagTune!**

            Born on: \`${client.user.createdAt}\`
            Current Version: \`${config.DISCORD_BOT.VERSION_CURRENT}\`
            Servers: \`${client.guilds.cache.size.toLocaleString()}\`   
            Users: \`${client.users.cache.size.toLocaleString()}\`
            Channels: \`${client.channels.cache.size.toLocaleString()}\`
            Uptime: \`${days}\` Days | \`${hours}\` Hours | \`${minutes}\` Minutes | \`${seconds}\` Seconds  
            CPU: Cores: \`${stats.cpu.cores}\` | System Load: \`${systemLoad}\` | Node Load: \`${lavalinkLoad}\`
            Memory: Allocated: \`${allocated}\` MB | Used: \`${used}\` MB | Free: \`${free}\` MB | Reservable: \`${reservable}\` MB
            Players: \`${stats.players}\`
            P-Players: \`${client.music.shoukaku.totalPlayers}\` 
            Discord API Version: \`${client.options.http?.version || 'Unknown'}\`
            Running OS: \`${process.platform || 'Unknown'}\`
            Websocket Ping: \`${client.ws.ping}\`
        `)
        .setTimestamp(Date.now())
        .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true, format: `png`}))

        message.channel.send(embed);

        

    }
}

