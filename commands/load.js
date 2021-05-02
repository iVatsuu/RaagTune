const Client = require('../structures/Client');
const { Message, MessageEmbed } = require('discord.js');
const mongo = require('../database/mongo');
const playlistSchema = require('../schemas/playlist-schema');

module.exports = {
    name: `load`,
    /**
     * @param { Client } client
     * @param { Message } message
     * @param { String[] } args
     */
    run: async(client, message , args) => {

        if(!args[0]) return message.channel.send(`⚠️ Did you forget to specify a playlist name? Please specify one!`);
        if(!message.member.voice.channel) return message.channel.send(`⚠️ You have to be in a Voice Channel to use this command!`);

        const msg = await message.channel.send(`⌛ Loading playlist (This might take a few seconds)...`);
        const playlistName = args[0].toLowerCase();

        await mongo().then(async (mongoose) =>{
            try {
               await playlistSchema.findOne({
                    name: playlistName,
                    creator: message.author.id,
                }, async (err, p) =>{
                    if(err) console.log(err);
                    if(!p){
                        const embed = new MessageEmbed()
                        .setAuthor(playlistName, message.author.displayAvatarURL())
                        .setDescription(`❎ Couldn't find a playlist by the name ${playlistName}.`)
                        .setTimestamp()
                        .setColor('RANDOM');
                        return msg.edit('', embed);
                    }
                    let songsToAdd = p.songs.length;

                    const content = new Promise(async function(resolve){
                        for (let i = 0; i < songsToAdd; i++) {
                            const res = await client.music.searchAndPlay(client.music.shoukaku.getNode(), p.songs[i], `youtube`, message);
                            if(i == songsToAdd -1) resolve();
                            
                        }
                    });

                    content.then(async function(){
                        const embed = new MessageEmbed()
                        .setDescription(`Queued **${songsToAdd} Songs** From **${playlistName}**.`)
                        .setColor('RANDOM');
                        msg.edit('', embed);
                    })


                })
                
            } catch (error) {
                msg.edit(`❌ Failed to load playlist ${playlistName}: ${error}`)
                console.log(error);
            }finally{
                mongoose.connection.close();
            }
        })

    }
}