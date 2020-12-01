const Client = require('../structures/Client');
const { Message } = require('discord.js');
module.exports = {
    name: `help`,
    /**
     * @param { Client } client
     * @param { Message } message
     * @param { String[] } args
     */
    run: async(client, message , args) => {
        message.channel.send(
            `
            __** 📌 Commands 📌 **__
	   
**PREFIX:'?'**
..........................................................................................................>
**?p/?play: Play Music/Search**
**?stop: Stops the Music and leave the channel**
**?fs/?skip: Skip currently playing song**
**?vol + [input value]: Sets the volume according to Input Value**
**?q/?queue: Displays the currrent Queue**
**?np: Displays currently playing songs**
**?p/?play + [Youtube Playlist Url]: Add your youtube playlist songs in the queue. NOTE: Playlist must be PUBLIC!!**
---------------------------------------------------------------------------------------------------------->
** 💖 Thanks For Using our RaagTune Bot |By- iVatsuu| 💖 **

            `
            );
    }
}