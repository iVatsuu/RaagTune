const Client = require('../structures/Client');
const { Message, MessageEmbed } = require('discord.js');
module.exports = {
    name: `help`,
    /**
     * @param { Client } client
     * @param { Message } message
     * @param { String[] } args
     */
    run: async(client, message , args) => {

        const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle('__** 📌 Commands 📌 **__')
            .addField('PREFIX: ? or Custom','-----X-----')
            .addFields(
                { name: '?setprefix', value: 'Change RaagTunes prefix for your server | Usage: ?setprefix newPrefix[Ex. !]'},
                { name: '?rank/?rank @user', value: 'Shows Global Rank'},
                { name: '?leaderboard/?lb', value: 'Shows Global Leaderboard of top 10 users'},
                { name: '?create:', value: 'Create your own playlist | Usage: ?create playlistName songName/Url-YT'},
                { name: '?add:', value: 'Add songs to your playlist | Usage: ?add playlistName songName/Url-YT'},
                { name: '?load:', value: 'Load and play your playlist | Usage: ?load playlistName'},
                { name: '?playlists:', value: 'Get a list of all your playlists'},
                { name: '?delete:', value: 'Delete your playlist | Usage: ?delete playlistName'},
                { name: '?p/?play:', value: 'Search and Play Music | Usage: ?p songName/Url-YT'},
                { name: '?spotify', value: 'Search and Play Music From Spotify | Usage: ?spotify Playlist/Album/Song-URL'},
                { name: '?radio:', value: 'Play Radio 24/7 | Usage: ?radio  | More Language Support will be added in future! please join our support server for suggestions' },
                { name: '?stop/?dc', value: 'Stops the Music and leaves the channel' },
                { name: '?fs/?skip', value: 'Skip currently playing song'},
                { name: '?pause', value: 'Pause currently playing song.' },
                { name: '?repeat', value: 'Repeating currently playing song'},
                { name: '?loop', value: 'Loops the entire Queue/songs'},
                { name: '?loopoff', value: 'Turn off Repeating/Looping'},
                { name: '?resume', value: 'Resume paused song'},
                { name: '?lyrics', value: 'Fetch lyrics of a song | Usage: ?lyrics / ?lyrics songName'},
                { name: '?vol', value: 'Sets the volume according to Input Value | Usage: ?vol 100'},
                { name: '?q/?queue', value: ' Displays the current Queue' },
                { name: '?stats:', value: 'View status of RaagTune' },
                { name: '?np', value: 'Displays currently playing song'},
                { name: '?p/?play Youtube Playlist Url', value: 'Add your youtube playlist songs in the queue. NOTE: Playlist must be PUBLIC!!'}
            )
            .setDescription('[**Invite Me**](https://discordapp.com/oauth2/authorize?client_id=568362422931423253&scope=bot)   ✦    [**Support Server**](https://discord.gg/NStwEjQsUJ)    ✦    [**Vote For Us**](https://top.gg/bot/568362422931423253)    ✦    [**Donate**](https://www.patreon.com/raagtunebot)')
            .setFooter('💖 Thanks For Using our RaagTune Music Bot |Regards- iVatsuu| 💖');

        message.channel.send(embed);
    }
}