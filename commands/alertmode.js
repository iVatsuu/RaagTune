const Client = require('../structures/Client');
const { Message, MessageEmbed } = require('discord.js');
const config = require('../config/config.json');
module.exports = {
    name: `alertmode`,
    /**
     * @param { Client } client
     * @param { Message } message
     * @param { String[] } args
     */
    run: async(client, message , args) => {

        if(message.author.id != config.DISCORD_BOT.OWNER_ID) return message.channel.send(`Warning: This is a Bot-Owner-Only Command!!`);

        const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setAuthor(message.author.username)
            .setTitle('**⚠️Maintenance Alert⚠️**')
            .addFields(
                { name: 'Date' , value: args[0] },
                { name: 'Time' , value: `${args[1]} GMT` },
                { name: 'Down Time' , value: `${args[2]} Minutes` },
                { name: 'Reason' , value: args[3] }

            )
            .setDescription('[**Invite Me**](https://discordapp.com/oauth2/authorize?client_id=568362422931423253&scope=bot)    ✦    [**Support Server**](https://discord.gg/NStwEjQsUJ)    ✦    [**Vote For Us**](https://top.gg/bot/568362422931423253)    ✦    [**Donate**](https://www.patreon.com/raagtunebot)')
            .setFooter('💖Sorry for the inconvenience, Hope you understand|Regards- iVatsuu| 💖');

            try{

                client.guilds.cache.map((guild) =>{
                    let found = 0

                    guild.channels.cache.map((c) =>{
                        if(found === 0) {
                            if(c.type === "text"){
                                if(c.permissionsFor(client.user).has("VIEW_CHANNEL") === true){
                                    if(c.permissionsFor(client.user).has("SEND_MESSAGES") === true){
                                        c.send(embed);
                                        found = 1;
                                    }
                                }
                            }
                        }

                    });
                });

            }catch(err){
                console.log('Could not send messages to few guilds!')

        }
    }
}