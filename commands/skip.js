const Client = require('../structures/Client');
const { Message } = require('discord.js');
module.exports = {
    name: `skip`,
    /**
     * @param { Client } client
     * @param { Message } message
     * @param { String[] } args
     */
    run: async(client, message , args) => {
        if(!message.member.voice.channel) return message.channel.send(`⚠️ You have to be in a Voice Channel to use this command!`);
        if(!client.music.getQueue(message)) return message.channel.send(`❌ Nothing is playing Right Now!!`);
      
        let votes = client.music.getQueue(message).skipVotes;
        let userCount = message.member.voice.channel.members.size;
        let neededVotes = Math.ceil(userCount/2);

        if(votes.includes(message.member.id)) return message.channel.send(`👍 You already voted to skip`);
        votes.push(message.member.id);
        message.channel.send(`✅ You voted to skip the song \`${votes.length}/${neededVotes}\` Votes!`)

        if(votes.length >= neededVotes){
            await client.music.skip(message);
            votes = [];
            message.channel.send(`⏯ Skipped the song | Requested by ${message.author}`);
        }



    }
}