const Client = require('../structures/Client');
const { Message, MessageEmbed } = require('discord.js');
const config = require('../config/config.json');
module.exports = {
    name: `updates`,
    /**
     * @param { Client } client
     * @param { Message } message
     * @param { String[] } args
     */
    run: async(client, message , args) => {

        if(message.author.id != config.DISCORD_BOT.OWNER_ID) return message.channel.send(`Warning: This is a Bot-Owner-Only Command!!`);

        
        var arg0 = args[0].replace(/_/g, ' ');
        var arg1 = args[1].replace(/_/g, ' ');
        var arg2 = args[2].replace(/_/g, ' ');
        var arg3 = args[3].replace(/_/g, ' ');


        const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setAuthor(message.author.username)
            .setTitle('**📢Update Notice📢**')
            .addFields(
                { name: arg0 , value: arg1 },
                { name: arg2 , value: arg3 }
        
            )
            .setDescription('[**Invite Me**](https://discordapp.com/oauth2/authorize?client_id=568362422931423253&scope=bot)    ✦    [**Support Server**](https://discord.gg/NStwEjQsUJ)    ✦    [**Vote For Us**](https://top.gg/bot/568362422931423253)    ✦    [**Donate**](https://www.patreon.com/raagtunebot)')
            .setFooter('💖 Thanks For Using our RaagTune Music Bot |Regards- iVatsuu| 💖');

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
                console.log('Could not send messages to few guilds!!')

        }
    }
}