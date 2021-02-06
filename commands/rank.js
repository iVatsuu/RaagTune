const Client = require('../structures/Client');
const { Message, MessageAttachment } = require('discord.js');
const mongo = require('../database/mongo');
const profileSchema = require('../schemas/profile-schema');
const levels = require('../user-data/levels');
const canvacord = require('canvacord');
const config = require('../config/config.json');
const hasCooldown = new Set();
module.exports = {
    name: `rank`,
    /**
     * @param { Client } client
     * @param { Message } message
     * @param { String[] } args
     */
    run: async(client, message , args) => {


        let user = message.mentions.users.first() || message.author        
        if(hasCooldown.has(message.author.id)){
            message.reply(`⌛ This command is on 30sec cooldown!`)
            
        }else{
        await mongo().then(async (mongoose) =>{
            if(user.bot) return message.reply('Stop trying to break me, stupid human!!')
            try{
                
                const data = await profileSchema.findOne({
                    userID: user.id
                })

                if(!data) return message.reply(`User Unranked! Please use RaagTune Commands to earn XP`);

                let {xp, level} = data;

                let neededXP = levels.getNeededXp(level);
                console.log(`XP: ${xp} | Level: ${level}`);

                const result = await profileSchema.find({}).sort({
                    level: -1,
                })
                
                let rank = result.findIndex(x => x.userID === user.id) + 1;
                //console.log(result);
                //console.log(`Rank: ${rank}` );
                //console.log(user.presence.status);

                const card = new canvacord.Rank()
                    .setAvatar(user.displayAvatarURL({ format: "png" , size: 1024}))
                    .setUsername(user.username)
                    .setDiscriminator(user.discriminator)
                    .setRank(rank)
                    .setLevel(level)
                    .setCurrentXP(xp)
                    .setRequiredXP(neededXP)
                    .setStatus(user.presence.status)
                    .setBackground("IMAGE", config.DATABASE.CANVA_BACKIMG)
                    .setOverlay("#00ff0000")
                    
                    const img = await card.build();
                
                    message.channel.send(new MessageAttachment(img, "raagtune-rank.png"));
                    

            }catch(error){
                console.error(error);
            }finally{
                mongoose.connection.close();
            }
        });
        hasCooldown.add(message.author.id);
        setTimeout(() => {
            
            hasCooldown.delete(message.author.id);
            
        }, 30000);
    }

        

    }
}