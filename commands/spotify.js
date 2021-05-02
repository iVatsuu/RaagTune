const Client = require('../structures/Client');
const { Message, MessageEmbed } = require('discord.js');
const config = require('../config/config.json');
const { getData, getPreview } = require('spotify-url-info');



module.exports = {
    name: `spotify`,
    /**
     * @param { Client } client
     * @param { Message } message
     * @param { String[] } args
     */
    run: async(client, message , args) => {
        if(!args[0]) return message.channel.send(`⚠️ Did you forget to specify a Spotify Link? Please specify one!`);
        if(!message.member.voice.channel) return message.channel.send(`⚠️ You have to be in a Voice Channel to use this command!`);

        const msg = await message.channel.send(`⌛ Searching for » \`${args.join(' ')}\`...`);

        if(args[0].startsWith(config.DISCORD_BOT.spotifyURL)){
            const data = await getData(args.join(' '));
            if (data.type == 'playlist' || data.type == 'album') {
            if (data.type == 'playlist') {
                for (let i = 0; i <= 100; i++) {
                    const song = data.tracks.items[i];
                    //play
                   await client.music.searchAndPlay(client.music.shoukaku.getNode(),`${song.track.name} ${song.track.artists[0].name}`, `youtube`, message)
                }
              msg.edit(`✅ Loaded Playlist Successfully.`)
            }
            else { 
                
                await data.tracks.items.forEach(song => { 
                   //play 
                    client.music.searchAndPlay(client.music.shoukaku.getNode(),`${song.name} ${song.artists[0].name}`, `youtube`, message);  
                }); 
                msg.edit(`✅ Loaded Album Successfully.`)
            }
        }
        else if (data.type == 'track')
        {
            const track = await getPreview(args.join(' '));
				//play
            client.music.searchAndPlay(client.music.shoukaku.getNode(),`${track.title} ${track.artist}`, `youtube`, message);
            msg.edit(`🎵 ${track.title} - ${track.artist} Added to the Queue.`);
                
        }else{

			return msg.edit('⚠️ Please provide a valid spotify Album/Track Url');
        }
        
    }
    }
}

