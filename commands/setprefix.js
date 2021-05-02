const Client = require('../structures/Client');
const { Message } = require('discord.js');
const mongo = require('../database/mongo');
const guildSchema = require('../schemas/guild-schema');
const config = require('../config/config.json');
module.exports = {
    name: `setprefix`,
    /**
     * @param { Client } client
     * @param { Message } message
     * @param { String[] } args
     */
    run: async(client, message , args) => {

        if(!args[0]) return message.channel.send(`⚠️ Please specify a new prefix!`);
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(' ⚠️ You must be an administrator to run this command!');

        await mongo().then(async (mongoose) =>{

            try{

                const guildId = message.guild.id;
                const newPrefix = args[0];

                await guildSchema.findOneAndUpdate({
                    _id: guildId
                },{
                    _id: guildId,
                    guildPrefix: newPrefix
                },{
                    upsert: true
                });
                await Client.updatePrefix(guildId, newPrefix);
                console.log(`Prefix Updated For: ${message.guild.name} | NewPrefix: ${newPrefix} | Req By: ${message.author.tag}`);
                message.reply(`✅ Updated Prefix for this guild to: \`${newPrefix}\``);


            }catch (error){
                console.log(error);
            }

        })

    }
}

