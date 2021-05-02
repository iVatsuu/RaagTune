const Client = require('../structures/Client');
const { Message, MessageEmbed } = require('discord.js');
const config = require('../config/config.json');
module.exports = {
    name: `radio`,
    /**
     * @param { Client } client
     * @param { Message } message
     * @param { String[] } args
     */
    run: async(client, message , args) => {

       //if(!args[0]) return message.channel.send(`⚠️ Please specify a language ?radio <english/hindi> !`);
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(' ⚠️ You must have the MANAGE_GUILD Permission to run this command!');
        if(!message.member.voice.channel) return message.channel.send(`⚠️ You have to be in a Voice Channel to use this command!`);
        await client.music.setRadio(true);
        const embed = new MessageEmbed()
            .setAuthor(message.author.username)
            .setColor('RANDOM')
            .setTitle('__**📻Radio Channel Selection📻**__')
            .addField('**Usage:**','**?radio & after the Radio Channel Selection Menu appears type StationNumber [Ex. From 1-16] within 15 sec**')
            .addField('**HINDI**','-----------------')
            .addFields(
                { name: '🔖Station-1', value: '\`Hindi - Bombaybeats\`', inline:true }
            )
            .addField('**ENGLISH/MIX**', '-----------------')
            .addFields(
                { name: '🔖Station-2', value: '\`977 Hits\`', inline:true },
                { name: '🔖Station-3', value: '\`All time hits\`', inline:true },
                { name: '🔖Station-4', value: '\`Hits of 2021\`',inline: true },
                { name: '🔖Station-5', value: '\`Classic Hits\`',inline:true },
                { name: '🔖Station-6', value: '\`ILoveRadio-Mix\`',inline:true },
                { name: '🔖Station-7', value: '\`Dance\`',inline:true },
                { name: '🔖Station-8', value: '\`Dance2\`',inline:true },
                { name: '🔖Station-9', value: '\`CHILL-HOP\`',inline: true },
                { name: '🔖Station-10', value: '\`HIP-HOP\`',inline: true },
                { name: '🔖Station-11', value: '\`Music & Chill\`',inline:true },
                { name: '🔖Station-12', value: '\`POP\`',inline: true },
                { name: '🔖Station-13', value: '\`RAP\`',inline:true },
                { name: '🔖Station-14', value: '\`LOFI Hip-Hop\`',inline:true },
                { name: '🔖Station-15', value: '\`Shuffle Dance Beats\`',inline:true },
                { name: '🔖Station-16', value: '\`Study/Chill\`',inline:true }




            
            )
            .setFooter('✍ Please Enter a value Ranging from 1-16.')
            .setTimestamp()
        await message.channel.send(embed);    
        try {
            var response = await message.channel.awaitMessages(msg => msg.content > 0 && msg.content < 17,{
                max: 1,
                time: 15000,
                errors: ['time']
            });
            //console.log('Response Selection: ',response.first().content);
            
        } catch (err) {
            console.log(err);
            return message.channel.send(`⚠️ No or Invalid value entered, cancelling radio channel selection!`)
        }

        try{

        switch(response.first().content){

            case '1':
                const song1 = config.RADIO_CHANNELS.HINDI_1ALL;
                if(client.music.getQueue(message)){
                    await client.music.stop(message);
                }
                const msg1 = await message.reply(`⌛This might take a few seconds. I'm Connecting to station....`)
                
                await client.music.searchAndPlay(client.music.shoukaku.getNode(), song1, `http`, message);
                msg1.delete();
                message.channel.send(`📻 Playing Radio `);
                console.log(`Playing: ${args} | For Guild: | Name: ${message.guild.name} | ID: ${message.guild.id} | Region: ${message.guild.region} | Req-By: ${message.author.tag}`);
                break;
            
            
            case '2':
                const song2 = config.RADIO_CHANNELS.RADIO2_977HITS;
                if(client.music.getQueue(message)){
                    await client.music.stop(message);
                }
                const msg2 = await message.reply(`⌛This might take a few seconds. I'm Connecting to station....`)
                await client.music.searchAndPlay(client.music.shoukaku.getNode(), song2, `http`, message);
                msg2.delete();
                message.channel.send(`📻 Playing Radio `);
                console.log(`Playing: ${args} | For Guild: | Name: ${message.guild.name} | ID: ${message.guild.id} | Region: ${message.guild.region} | Req-By: ${message.author.tag}`);
                break;
            
            case '3':
                const song3 = config.RADIO_CHANNELS.RADIO3_HITS2;
                if(client.music.getQueue(message)){
                    await client.music.stop(message);
                }
                const msg3 = await message.reply(`⌛This might take a few seconds. I'm Connecting to station....`)
                await client.music.searchAndPlay(client.music.shoukaku.getNode(), song3, `http`, message);
                msg3.delete();
                message.channel.send(`📻 Playing Radio `);
                console.log(`Playing: ${args} | For Guild: | Name: ${message.guild.name} | ID: ${message.guild.id} | Region: ${message.guild.region} | Req-By: ${message.author.tag}`);
                break;
            
            case '4':
                const song4 = config.RADIO_CHANNELS.RADIO4_HITS2021_YT;
                if(client.music.getQueue(message)){
                    await client.music.stop(message);
                }
                const msg4 = await message.reply(`⌛This might take a few seconds. I'm Connecting to station....`)
                await client.music.searchAndPlay(client.music.shoukaku.getNode(), song4, `youtube`, message);
                msg4.delete();
                message.channel.send(`📻 Playing Radio `);
                console.log(`Playing: ${args} | For Guild: | Name: ${message.guild.name} | ID: ${message.guild.id} | Region: ${message.guild.region} | Req-By: ${message.author.tag}`);
                break;
            
            case '5':
                const song5 = config.RADIO_CHANNELS.RADIO5_HITSOLD;
                if(client.music.getQueue(message)){
                    await client.music.stop(message);
                }
                const msg5 = await message.reply(`⌛This might take a few seconds. I'm Connecting to station....`)
                await client.music.searchAndPlay(client.music.shoukaku.getNode(), song5, `http`, message);
                msg5.delete();
                message.channel.send(`📻 Playing Radio `);
                console.log(`Playing: ${args} | For Guild: | Name: ${message.guild.name} | ID: ${message.guild.id} | Region: ${message.guild.region} | Req-By: ${message.author.tag}`);
                break;
            
            case '6':
                const song6 = config.RADIO_CHANNELS.RADIO6_ILOVERADIO;
                if(client.music.getQueue(message)){
                    await client.music.stop(message);
                }
                const msg6 = await message.reply(`⌛This might take a few seconds. I'm Connecting to station....`)
                await client.music.searchAndPlay(client.music.shoukaku.getNode(), song6, `http`, message);
                msg6.delete();
                message.channel.send(`📻 Playing Radio `);
                console.log(`Playing: ${args} | For Guild: | Name: ${message.guild.name} | ID: ${message.guild.id} | Region: ${message.guild.region} | Req-By: ${message.author.tag}`);
                break;
            
            case '7':
                const song7 = config.RADIO_CHANNELS.RADIO7_DANCE;
                if(client.music.getQueue(message)){
                    await client.music.stop(message);
                }
                const msg7 = await message.reply(`⌛This might take a few seconds. I'm Connecting to station....`)
                await client.music.searchAndPlay(client.music.shoukaku.getNode(), song7, `http`, message);
                msg7.delete();
                message.channel.send(`📻 Playing Radio `);
                console.log(`Playing: ${args} | For Guild: | Name: ${message.guild.name} | ID: ${message.guild.id} | Region: ${message.guild.region} | Req-By: ${message.author.tag}`);
                break;
            
            case '8':
                const song8 = config.RADIO_CHANNELS.RADIO8_DANCE2;
                if(client.music.getQueue(message)){
                    await client.music.stop(message);
                }
                const msg8 = await message.reply(`⌛This might take a few seconds. I'm Connecting to station....`)
                await client.music.searchAndPlay(client.music.shoukaku.getNode(), song8, `http`, message);
                msg8.delete();
                message.channel.send(`📻 Playing Radio `);
                console.log(`Playing: ${args} | For Guild: | Name: ${message.guild.name} | ID: ${message.guild.id} | Region: ${message.guild.region} | Req-By: ${message.author.tag}`);
                break;
            
            case '9':
                const song9 = config.RADIO_CHANNELS.RADIO9_CHILLHOP;
                if(client.music.getQueue(message)){
                    await client.music.stop(message);
                }
                const msg9 = await message.reply(`⌛This might take a few seconds. I'm Connecting to station....`)
                await client.music.searchAndPlay(client.music.shoukaku.getNode(), song9, `http`, message);
                msg9.delete();
                message.channel.send(`📻 Playing Radio `);
                console.log(`Playing: ${args} | For Guild: | Name: ${message.guild.name} | ID: ${message.guild.id} | Region: ${message.guild.region} | Req-By: ${message.author.tag}`);
                break;
            
            case '10':
                const song10 = config.RADIO_CHANNELS.RADIO10_HIPHOP;
                if(client.music.getQueue(message)){
                    await client.music.stop(message);
                }
                const msg10 = await message.reply(`⌛This might take a few seconds. I'm Connecting to station....`)
                await client.music.searchAndPlay(client.music.shoukaku.getNode(), song10, `http`, message);
                msg10.delete();
                message.channel.send(`📻 Playing Radio `);
                console.log(`Playing: ${args} | For Guild: | Name: ${message.guild.name} | ID: ${message.guild.id} | Region: ${message.guild.region} | Req-By: ${message.author.tag}`);
                break;
            
            case '11':
                const song11 = config.RADIO_CHANNELS.RADIO11_CHILL;
                if(client.music.getQueue(message)){
                    await client.music.stop(message);
                }
                const msg11 = await message.reply(`⌛This might take a few seconds. I'm Connecting to station....`)
                await client.music.searchAndPlay(client.music.shoukaku.getNode(), song11, `http`, message);
                msg11.delete();
                message.channel.send(`📻 Playing Radio `);
                console.log(`Playing: ${args} | For Guild: | Name: ${message.guild.name} | ID: ${message.guild.id} | Region: ${message.guild.region} | Req-By: ${message.author.tag}`);
                break;
            
            case '12':
                const song12 = config.RADIO_CHANNELS.RADIO12_POP;
                if(client.music.getQueue(message)){
                    await client.music.stop(message);
                }
                const msg12 = await message.reply(`⌛This might take a few seconds. I'm Connecting to station....`)
                await client.music.searchAndPlay(client.music.shoukaku.getNode(), song12, `http`, message);
                msg12.delete();
                message.channel.send(`📻 Playing Radio `);
                console.log(`Playing: ${args} | For Guild: | Name: ${message.guild.name} | ID: ${message.guild.id} | Region: ${message.guild.region} | Req-By: ${message.author.tag}`);
                break;
            
            case '13':
                const song13 = config.RADIO_CHANNELS.RADIO13_RAP;
                if(client.music.getQueue(message)){
                    await client.music.stop(message);
                }
                const msg13 = await message.reply(`⌛This might take a few seconds. I'm Connecting to station....`)
                await client.music.searchAndPlay(client.music.shoukaku.getNode(), song13, `http`, message);
                msg13.delete();
                message.channel.send(`📻 Playing Radio `);
                console.log(`Playing: ${args} | For Guild: | Name: ${message.guild.name} | ID: ${message.guild.id} | Region: ${message.guild.region} | Req-By: ${message.author.tag}`);
                break;
                            
            case '14':
                const song14 = config.RADIO_CHANNELS.RADIO14_lOFI_YT;
                if(client.music.getQueue(message)){
                    await client.music.stop(message);
                }
                const msg14 = await message.reply(`⌛This might take a few seconds. I'm Connecting to station....`)
                await client.music.searchAndPlay(client.music.shoukaku.getNode(), song14, `youtube`, message);
                msg14.delete();
                message.channel.send(`📻 Playing Radio `);
                console.log(`Playing: ${args} | For Guild: | Name: ${message.guild.name} | ID: ${message.guild.id} | Region: ${message.guild.region} | Req-By: ${message.author.tag}`);
                break;
            case '15':
                const song15 = config.RADIO_CHANNELS.RADIO15_SHUFFLE_YT;
                if(client.music.getQueue(message)){
                    await client.music.stop(message);
                }
                const msg15 = await message.reply(`⌛This might take a few seconds. I'm Connecting to station....`)
                await client.music.searchAndPlay(client.music.shoukaku.getNode(), song15, `youtube`, message);
                msg15.delete();
                message.channel.send(`📻 Playing Radio `);
                console.log(`Playing: ${args} | For Guild: | Name: ${message.guild.name} | ID: ${message.guild.id} | Region: ${message.guild.region} | Req-By: ${message.author.tag}`);
                break;
            case '16':
                const song16 = config.RADIO_CHANNELS.RADIO16_STUDY_YT;
                if(client.music.getQueue(message)){
                    await client.music.stop(message);
                }
                const msg16 = await message.reply(`⌛This might take a few seconds. I'm Connecting to station....`)
                await client.music.searchAndPlay(client.music.shoukaku.getNode(), song16, `youtube`, message);
                msg16.delete();
                message.channel.send(`📻 Playing Radio `);
                console.log(`Playing: ${args} | For Guild: | Name: ${message.guild.name} | ID: ${message.guild.id} | Region: ${message.guild.region} | Req-By: ${message.author.tag}`);
                break;
                
                

                

            default:
                message.channel.send(`No or Invalid value entered, cancelling radio channel selection!`);     
             }
            }catch(err){
                console.log(`RadioErro: ${err}`);
            }
    }
}