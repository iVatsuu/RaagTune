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
            .addField('PREFIX: ?','-----X-----')
            .addFields(
                { name: '?p/?play:', value: 'Play Music/Search' },
                { name: '?stop', value: 'Stops the Music and leave the channel' },
                { name: '?fs/?skip', value: 'Skip currently playing song'},
                { name: '?pause', value: 'Pause currently playing song.' },
                { name: '?repeat', value: 'Repeating currently playing song'},
                { name: '?loop', value: 'Loops the entire queue song'},
                { name: '?loopoff', value: 'Turn off Repeating/Looping'},
                { name: '?resume', value: 'Resume paused song'},
                { name: '?vol + [input value]', value: 'Sets the volume according to Input Value'},
                { name: '?q/?queue', value: ' Displays the current Queue' },
                { name: '?np', value: 'Displays currently playing song'},
                { name: '?p/?play + [Youtube Playlist Url]', value: 'Add your youtube playlist songs in the queue. NOTE: Playlist must be PUBLIC!!'}
            )
            .setDescription('[**Invite Me**](https://discordapp.com/oauth2/authorize?client_id=568362422931423253&scope=bot)    -    [**Support Server**](https://discord.gg/NStwEjQsUJ)    -    [**Vote For Us**](https://top.gg/bot/568362422931423253)    -    [**Donate**](https://www.patreon.com/raagtunebot)')
            .setFooter('💖 Thanks For Using our RaagTune Music Bot |Regards- iVatsuu| 💖');

        message.channel.send(embed);
    }
}