const Client = require('../structures/Client');
const { Message, MessageEmbed } = require('discord.js');
const mongo = require('../database/mongo');
const playlistSchema = require('../schemas/playlist-schema');

module.exports = {
    name: `delete`,
    /**
     * @param { Client } client
     * @param { Message } message
     * @param { String[] } args
     */
    run: async(client, message , args) => {

        if(!args[0]) return message.channel.send(`⚠️ Did you forget to specify your playlist name? Please specify one!`);

        const msg = await message.channel.send(`🅾 Deleting song(s) from your playlist...`);
		const playlistName = args[0].toLowerCase();


        await mongo().then(async (mongoose)=>{
            try {
                await playlistSchema.findOneAndDelete({
                    name: playlistName,
                    creator: message.author.id,
                })
                .then(deletedDocument =>{
                    if(deletedDocument){
                        const embed = new MessageEmbed()
                        .setAuthor(playlistName, message.author.displayAvatarURL())
                        .setDescription(`✅ Deleted playlist: \`${playlistName}\``)
                        .setTimestamp()
                        .setColor('RANDOM');
                        return msg.edit('', embed);
                    }else{
                        const embed = new MessageEmbed()
                        .setAuthor(playlistName, message.author.displayAvatarURL())
                        .setDescription(`❓ Couldn't find a playlist by the name ${playlistName}.\nFor a list of your playlists type \`?playlists\``)
                        .setTimestamp()
                        .setColor('RANDOM');
                        return msg.edit('', embed);
    
                    }
                })
                
            } catch (error) {
                msg.edit(`❌ Failed to find and delete playlist: ${error}`)
                console.log(error);
            }finally{
                mongoose.connection.close();
            }
        })

    }
}
