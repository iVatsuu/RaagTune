const Client = require('../structures/Client');
const { Message, MessageEmbed } = require('discord.js');
const config = require('../config/config.json')
const mongo = require('../database/mongo');
const profileSchema = require('../schemas/profile-schema');

module.exports = {
    name: `block`,
    /**
     * @param { Client } client
     * @param { Message } message
     * @param { String[] } args
     */
    run: async(client, message , args) => {

        if(message.author.id != config.DISCORD_BOT.OWNER_ID) return message.channel.send(`Warning: This is a Bot-Owner-Only Command!!`);
        if(message.channel.id != config.DISCORD_BOT.DEV_COMMANDS_CHANNEL_ID) return message.channel.send(`Warning: Wrong Channel [Restricted Channel Used]`);
        if (!args[0]) return message.channel.send('Please specifiy a user.');

        const reason = args[1];
		if (!reason) return message.channel.send('Please specify a reason for blocking this user.');
        const user =  args[0];
		if (!user) return message.channel.send('Not a valid user.');
        

        const msg = await message.channel.send(` Blocking user from RaagTune...`);

        await mongo().then(async mongoose =>{
            try {
               await profileSchema.findOne({
                    userID: user,
                }, async(err, u)=>{
                    if(err) {console.log(err); message.channel.send(err);}
                    if(!u){
                        const newProfile = new profileSchema({
                            userID: args[0],
                            userName: 'null',
                            blocked: true,
                        });
                        await newProfile.save().catch(e => console.error(e));
                    }
                    else if(u.blocked){
                        return msg.edit(`That user is already blocked.`);
                    }
                    else{
                        u.blocked = true
                        await u.save().catch(e => console.error(e));
                    }
                    await msg.edit(`Blocked **${args[0]}** from RaagTune.`)
                });
                
            } catch (error) {
                console.error(error);
            }
        })
        

    }
}