const Client = require('../structures/Client');
const { Message } = require('discord.js');
const mongo = require('../database/mongo');
const profileSchema = require('../schemas/profile-schema');

module.exports = {
    name: `leaderboard`,
    /**
     * @param { Client } client
     * @param { Message } message
     * @param { String[] } args
     */
    run: async(client, message , args) => {

        await mongo().then(async (mongoose) =>{
            try{

                const fetchTopMembers = async () => {
                    let text = ''
                    
                    const result = await profileSchema.find({

                    }).sort({
                        level: -1,
                    }).limit(10)

                    if(!result) return message.channel.send('Leaderboard is empty!');

                    for (let counter = 0; counter < result.length; ++counter){
                        const {userName, level} = result[counter];
                        text += `\`#${counter + 1}\` ${userName}> with Level \`${level}\`\n`
                    }

                    text += '\n Global Leaderboard of Top 10 Users'

                    return text
                }

                const topMembers = await fetchTopMembers();
                message.channel.send(topMembers);
                console.log(`Leaderboard: ${topMembers}`);



            }catch(error){
                console.error(error);

            }finally{
                mongoose.connection.close();
            }
        })
    

    }
}