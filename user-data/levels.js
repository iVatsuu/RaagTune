const mongo = require('../database/mongo');
const profileSchema = require('../schemas/profile-schema');



const getNeededXp = level => level * level * 100;
const addXP = async (guildID, userID, userName, xpToadd, message) => {
    await mongo().then(async mongoose =>{
        try{

          const result = await profileSchema.findOneAndUpdate({
                userID,
           },{
                userID,
                userName,
                $inc: {
                    cmdCount: 1,
                    xp: xpToadd
                }
           },{
                upsert: true,
                new: true
           });

          // console.log(`RESULT: ${result}`)

           let {xp, level} = result;
           const needed = getNeededXp(level);
           if(xp >= needed){
                ++level
                xp -= needed
                message.reply(`🤟 Awesome! You just got promoted to level ${level}`);

                await profileSchema.updateOne({
                    userID,
                },{
                    xp,
                    level,
                })
           }

        }finally{
            mongoose.connection.close();
        }
    })
}

module.exports.addXP = addXP;
module.exports.getNeededXp = getNeededXp;