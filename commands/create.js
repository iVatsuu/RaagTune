const Client = require('../structures/Client');
const { Message, MessageEmbed } = require('discord.js');
const mongo = require('../database/mongo');
const playlistSchema = require('../schemas/playlist-schema');

module.exports = {
    name: `create`,
    /**
     * @param { Client } client
     * @param { Message } message
     * @param { String[] } args
     */
    run: async(client, message , args) => {
        const msg = await message.channel.send(`📡 Creating Playlist! This might take a few seconds...`);
        if(!args[0]) return msg.edit(`⚠️ Please specify a playlist name! '?create playlistName Query/Link-YT'`);
        if(args[0].length > 32) return msg.edit(`Playlist title must be less than 32 characters!`)
        if(!args[1]) return msg.edit(`⚠️ Please specify a Query/Link! '?create playlistName Query/Link'`);
        
        const songsToAdd = [];
        let playlistMessage = '';
        let noTracks = 0;
		const playlistName = args[0].toLowerCase();
        const song = args.slice(1,20).join(" ");

        const tries = 5;

        for (let i = 0; i < tries; i++) {
            
            
            const res = await client.music.search(client.music.shoukaku.getNode(), song,`youtube`, message);
            if(res.type != 'NO_MATCHES'){
                if(res){
                    songsToAdd.push(song);
                    if(!res.isPlaylist){
                        playlistMessage = `Added **${res.songInfo.title}** to **${playlistName}**`;
                        return await addSongs(false);
                    }
                    await addSongs(true);
                    break;
                }
                else if(res.type === "PLAYLIST"){
                    for( const track of res.tracks){
                        songsToAdd.push(song);         
                    }
                    playlistMessage = `Added **${res.playlistName}** (${res.tracks.length} tracks) to **${playlistName}**.`;
                    await addSongs(false);
                    break;
                }
                else if(res.songInfo.isStream || !res){
                    msg.edit('An error occured. Please try again.');
                    console.log('track not found');
					noTracks++;
					break;
                }
            }
            else if (i >= 4 && !res.isPlaylist) msg.edit('No tracks found.');
			else if (i >= 4 && res.isPlaylist) noTracks++;
            
        };

        async function addSongs(isPlaylist){
            await mongo().then(async (mongoose) =>{
                try {
                    await playlistSchema.findOne({
                        name: playlistName,
                        creator: message.author.id,
                    }, async (err, p) =>{
                        if(err) console.log(err);
                        if(!p){
                             const newPlaylist = new playlistSchema({
                                name: playlistName,
                                songs: [],
                                timeCreated: Date.now(),
                                thumbnail: 'none',
                                creator: message.author.id,
                                tag: message.author.tag,
                             });
                             newPlaylist.songs = songsToAdd;
                             await newPlaylist.save().catch(e => console.log(e));

                             const embed = new MessageEmbed()
						        .setAuthor(newPlaylist.name, message.author.displayAvatarURL())
						        .setDescription(` ✅ Created a playlist with name: **${newPlaylist.name}**.\n${playlistMessage}`)
						        .setFooter(`ID: ${newPlaylist._id} • ${newPlaylist.songs.length}`)
						        .setColor('RANDOM')
						        .setTimestamp();
					         msg.edit('', embed);
                        }
                        else {
                            const currentPlaylist = p.songs;
                            p.songs = currentPlaylist.concat(songsToAdd);

                            const embed = new MessageEmbed()
						        .setAuthor(p.name, message.author.displayAvatarURL())
						        .setDescription(`✅ Found an existing playlist with the name: **${p.name}**.\n${playlistMessage}`)
						        .setFooter(`ID: ${p._id} • ${p.songs.length}`)
						        .setColor('RANDOM')
						        .setTimestamp();
					        msg.edit('', embed);
					        await p.save().catch(e => client.log(e));
                        }
                    })
                    
                } catch (error) {
                    msg.edit(`❌ Failed to Create Playlist: ${error}`)
                    console.log(error);
                }finally{
                   mongoose.connection.close();
                }
            })
        };


    }
    
}

