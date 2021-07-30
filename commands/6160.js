const Client = require('../structures/Client');
const { Message } = require('discord.js');
const config = require('../config/config.json');

module.exports = {
    name: `6160`,
    /**
     * @param { Client } client
     * @param { Message } message
     * @param { String[] } args
     */
    run: async(client, message , args) => {
        if(!message.member.voice.channel) return message.channel.send(`⚠️ You have to be in a Voice Channel to use this command!`);
        if(!client.music.getQueue(message)) return message.channel.send(`❌ Nothing is playing Right Now!!`);
        if(!args[0]) return message.channel.send(`<0><0> Please Provide an option Boss!`);

        if(message.author.id != config.DISCORD_BOT.OWNER_ID) return message.channel.send(`Warning: This is a Bot-Owner-Only Command!!`);
        
        if(args[0] == 1){
            await client.music.skip(message);
            await client.music.setRadio(false);
            message.channel.send(`Force Skipped the song | Requested by ${message.author}`);

        }else if(args[0] == 2){
            await client.music.stop(message);
            await client.music.setRadio(false);
            message.channel.send(`Stopped the song | Requested by ${message.author}`);

        }else{
            message.channel.send(`Invalid Option[1-2]`);
        }
        
    }
}
