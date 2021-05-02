const Client = require('../structures/Client');
const { Message , MessageEmbed} = require('discord.js');
const mongo = require('../database/mongo');
const playlistSchema = require('../schemas/playlist-schema');

module.exports = {
    name: `playlists`,
    /**
     * @param { Client } client
     * @param { Message } message
     * @param { String[] } args
     */
    run: async(client, message , args) => {

        await mongo().then(async (mongoose) =>{
            try {
                await playlistSchema.find({
                    creator: message.author.id,
                }).sort({ timeCreated: 1}).then(async (p) =>{
                    let pagesNum = Math.ceil(p.length / 10);
                    if (pagesNum === 0) pagesNum = 1;
        
                    const pages = [];
                    
                    for (let i = 0; i < pagesNum; i++) {
                         
                        
                        const str = `${p.slice(i * 10, i * 10 + 10).map(playlist => `**• ${playlist.name}** | ${playlist.songs.length} song(s) | Created: \`${Date.now() - playlist.timeCreated} ms\` ago`).join('\n')}`;

                        const embed = new MessageEmbed()
                        .setAuthor(message.author.username, message.author.displayAvatarURL())
                        .setDescription(`**__Your Playlists__**\n\n${str}`)
                        .setColor('RANDOM')
                        .setTimestamp()
                        .setFooter(`Page ${i + 1}/${pagesNum} | ${p.length} playlists`);
                        pages.push(embed);
                        if (i == pagesNum - 1) {
                            const emojiList = ['◀️', '▶️'];
                            let page = 0;
                            const curPage = await message.channel.send(pages[page].setFooter(`Page ${page + 1}/${pages.length} | ${p.length} playlist(s)`));
                            if(pages.length <= 1) return;
                            const permissions = message.channel.permissionsFor(client.user);
                            if (!permissions.has('ADD_REACTIONS')) return;
                            for (const emoji of emojiList) await curPage.react(emoji);
                            const reactionCollector = curPage.createReactionCollector(
                                (reaction, user) => emojiList.includes(reaction.emoji.name) && !user.bot,
                                { time: 120000 },
                            );
                            reactionCollector.on('collect', (reaction, user) => {
                                if(!user.bot && permissions.has('MANAGE_MESSAGES ')) reaction.users.remove(user.id);
                                switch (reaction.emoji.name) {
                                    case emojiList[0]:
                                        page = page > 0 ? --page : pages.length - 1;
                                        break;
                                    case emojiList[1]:
                                        page = page + 1 < pages.length ? ++page : 0;
                                        break;
                                    default:
                                        break;
                                }
                                curPage.edit(pages[page].setFooter(`Page ${page + 1}/${pages.length} | ${p.length} playlist(s)`));
                            });
                            reactionCollector.on('end', () => curPage.reactions.removeAll());
                            return curPage;
                        }    
                        
                    }//ending

                })
                
            } catch (error) {
                console.log(error);
            }finally{
                mongoose.connection.close();
            }
        })
   
    }
}