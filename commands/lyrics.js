const Client = require('../structures/Client');
const { Message, MessageEmbed } = require('discord.js');
const config = require('../config/config.json')
const isAbsoluteUrl = require('is-absolute-url');
const Genius = require('genius-lyrics');

const genius = new Genius.Client(config.DISCORD_BOT.GENIUS_LYRICS_SECRET_KEY);
module.exports = {
    name: `lyrics`,
    /**
     * @param { Client } client
     * @param { Message } message
     * @param { String[] } args
     */
    run: async(client, message , args) => {

        const msg = await message.channel.send(`⌛ Fetching lyrics.....`);
        let song = ''
        if(!args[0]){

            const current = client.music.getQueue(message).nowPlaying;
            if(!current) return msg.edit('⚠️ Please provide a song to search for lyrics or play a song.');
            else song = current.title;
        }
        else {song = args.join('-');}
        if(isAbsoluteUrl(song)) return msg.edit('⚠️ Please provide a song name. Links are not supported.');
        try {
            console.log(song);
            const searches = await genius.songs.search(song);
            const res = searches[0] || searches[1];
            if(!res) return msg.edit(`⚠️ No lyrics found!`)
            const lyrics = await res.lyrics();

            const embed = new MessageEmbed()
            .setTitle(`${res.title}`)
            .setThumbnail(`${res.artist.thumbnail}`)
			.setAuthor(`${res.artist.name}`)
			.setDescription(lyrics.slice(0, 2044) + '...')
			.setColor('RANDOM')
			.setFooter('Powered by Genius');
		    msg.edit('', embed);

        } catch (error) {
            console.error(error);
            message.channel.send(`⚠️ Something went wrong. Please try again later :(`);
        }

    }
}