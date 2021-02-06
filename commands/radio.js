const Client = require('../structures/Client');
const { Message } = require('discord.js');
const config = require('../config/config.json');
module.exports = {
    name: `radio`,
    /**
     * @param { Client } client
     * @param { Message } message
     * @param { String[] } args
     */
    run: async(client, message , args) => {

        if(!args[0]) return message.channel.send(`⚠️ Please specify a language ?radio <english/hindi> !`);
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(' ⚠️ You must have the MANAGE_GUILD Permission to run this command!');
        if(!message.member.voice.channel) return message.channel.send(`⚠️ You have to be in a Voice Channel to use this command!`);
        try{

        await client.music.setRadio(true);
        switch(args[0].toLowerCase()){

            case 'hindi':
                const songHindi = config.RADIO_CHANNELS.HINDI;
                 await client.music.searchAndPlay(client.music.shoukaku.getNode(), songHindi, `http`, message);
                message.channel.send(`📻 Playing Radio @Hindi`);
                console.log(`Playing: ${args} | For Guild: | Name: ${message.guild.name} | ID: ${message.guild.id} | Region: ${message.guild.region} | Req-By: ${message.author.tag}`);
                break;
            case 'english':
                const songEnglish = config.RADIO_CHANNELS.ENGLISH;
                await client.music.searchAndPlay(client.music.shoukaku.getNode(), songEnglish, `http`, message);
                message.channel.send(`📻 Playing Radio @English`);
                console.log(`Playing: ${args} | For Guild: | Name: ${message.guild.name} | ID: ${message.guild.id} | Region: ${message.guild.region} | Req-By: ${message.author.tag}`);
                break;
            default:
                message.channel.send(`Please specify a language: ?radio <hindi/english> !!`);     
             }
            }catch(err){
                console.log(`RadioErro: ${err}`);
            }
    }
}