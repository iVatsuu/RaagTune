const Client = require('../structures/Client');
const { Message } = require('discord.js');
module.exports = {
    name: `play`,
    /**
     * @param { Client } client
     * @param { Message } message
     * @param { String[] } args
     */
    run: async(client, message , args) => {

        if(!args[0]) return message.channel.send(`⚠️ Did you forget to specify a query? Please specify one!`);
        if(!message.member.voice.channel) return message.channel.send(`⚠️ You have to be in a Voice Channel to use this command!`);
        const res = await client.music.searchAndPlay(client.music.shoukaku.getNode(), args.join(" "), `youtube`, message);
        message.channel.send(res.isPlaylist ? `🎶 Added the Playlist ${res.playlistName} to the Queue, Total Songs: ✍ ${res.tracks.length}` : `🎵 ${res.songInfo.title} Added to the Queue.`);
        console.log(`Playing: ${args} | For Guild: | Name: ${message.guild.name} | ID: ${message.guild.id} | Region: ${message.guild.region} | Req-By: ${message.author.tag}`);
    }
}