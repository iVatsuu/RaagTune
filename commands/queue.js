const Client = require('../structures/Client');
const { Message } = require('discord.js');
module.exports = {
    name: `queue`,
    /**
     * @param { Client } client
     * @param { Message } message
     * @param { String[] } args
     */
    run: async(client, message , args) => {

        if(!message.member.voice.channel) return message.channel.send(`⚠️ You have to be in a Voice Channel to use this command!`);
        if(!client.music.getQueue(message)) return message.channel.send(`❌ Nothing is playing Right Now!!`);
        const np = client.music.getQueue(message).nowPlaying;
        const queue = client.music.getQueue(message).queue;
        message.channel.send(`🎤 Now Playing: ${np.title} By- 💎 ${np.author}\n ${queue.slice(0, 10).map((song, i) => {

            return `${i+1} - ${song.info.title} By ${song.info.author}`

        }).join("\n")} ${queue.length > 10 ? `\nAnd ${queue.length - 10} More Songs...` : ``}`.trim());
    

    }
}