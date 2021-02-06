const { Collection, Client, MessageEmbed, Message} = require('discord.js');
const config = require('../config/config.json');
const mongo = require('../database/mongo');
const guildSchema= require('../schemas/guild-schema');
const levels = require('../user-data/levels');
const guildPrefixes = {} //{[guildID] : [guildPrefix]}

const joinChID = config.DISCORD_BOT.JOIN_CHANNEL_ID;
const leftChID = config.DISCORD_BOT.LEFT_CHANNEL_ID;


class MusicClient extends Client{

    constructor() {
        super();
        this.commands = new Collection();
        this.discord = require('discord.js');
        this.ms = require('ms');
        this.path = require('path');
        this.fs = require('fs');
        this.miko = require('miko-wrapper-main');
        this.music = new this.miko(this,[
            {
                host: `localhost`,
                auth: `RaagTune@iVatsuu`,
                port: 7000,
                name: `Node1`
            }

        ], {

            destroy: () => `💔 RaagTune Disconnected Successfully!!`,
            newSong: (song) => `🎼 Now Playing ${song.title} by ${song.author}`
        });

    };

    commandHandler(path) {

        this.fs.readdirSync(this.path.normalize(path)).map((f) => {

            const File = require(this.path.join(__dirname, `..`, path, f));
            this.commands.set(File.name , File);
        });

    };
    getCommand(cmd){
        return this.commands.has(cmd) ? this.commands.get(cmd) : false;

    }

    start(token, path) {
        this.commandHandler(path);
        this.login(token);
        this.on('ready', async() => {

            //Database
            await mongo().then(async (mongoose) => {
                try{
                    console.log(`Successfully Connected to Database!`);
                    await module.exports.loadPrefixes(this);
                    console.log('Loaded Prefixes');

                  }finally{
                    mongoose.connection.close();
                }
            });

            //End Database
            
            console.log(`RaagTune - Tuned and Ready :)`);
            console.log(`Servers: ${this.guilds.cache.size}`);

         //Start Set-status

        let serverCount = this.guilds.cache.size
        setInterval(async () =>{
            serverCount = this.guilds.cache.size;  
        },60000);

        setInterval(async() => {

            let activities = [

                   `${serverCount} Servers!`
                ];   
             try{
                
                await this.user.setActivity(`${config.DISCORD_BOT.PREFIX}help | ${activities[0]}`, {type: "WATCHING"});

             }catch (error){

                console.log(error);
             }


            },10000);

        //End set status
           

        });

        this.on('guildCreate', async (guildCreate) =>{

            await mongo().then(async (mongoose) =>{

                try{

                    await guildSchema.findOneAndUpdate({
                        _id: guildCreate.id
                   },{
                        id: guildCreate.id,
                        guildPrefix: config.DISCORD_BOT.PREFIX,
                        guildName: guildCreate.name,
                        guildRegion: guildCreate.region,
                        guildOwner: guildCreate.ownerID,
                        guildMembers: guildCreate.memberCount  
                       
                   },{
                       upsert: true
                   });

                }finally{
                    mongoose.connection.close();
                }

            });

            try{
            console.log(`Joined Guild: ${guildCreate.name} | Owner: ${guildCreate.ownerID} | Members: ${guildCreate.memberCount} | Region: ${guildCreate.region}`);
            this.channels.cache.get(joinChID).send(`Joined Guild: ${guildCreate.name} | Owner: ${guildCreate.ownerID} | Members: ${guildCreate.memberCount} | Region: ${guildCreate.region}`);
            await module.exports.updatePrefix(guildCreate.id, config.DISCORD_BOT.PREFIX)
            console.log(`Cached newPrefix for Guild: ${guildCreate.name}`);

                //guildCreateMsg
            const guildEmbed = new MessageEmbed()
            .setColor('RANDOM')
            .setDescription(`
                **Thank You For Adding Me 💚**
    
                \`➔\` My Prefix here is \`?\`
                \`➔\` You can set a custom Prefix by typing \`?setprefix [newPrefix]\`
                \`➔\` You can see a list of commands by typing \`?help\`
                \`➔\` If you need any help or have any suggestions feel free to join our support server: [https://discord.gg/NStwEjQsUJ)] 
                **By having RaagTune in your server and using RaagTune, you agree to the following Terms of Service: [https://justpaste.it/9erde]**
            `)
    
            let found = 0;
            guildCreate.channels.cache.map((channel) =>{
                if(found === 0){
                    if(channel.type === "text"){
                        if(channel.permissionsFor(this.user).has("VIEW_CHANNEL") === true){
                            if(channel.permissionsFor(this.user).has("SEND_MESSAGES") === true){
                                channel.send(guildEmbed);

                                found = 1;
                            }
                        }
                    }
                }
            });
            //end guildCreateMsg

            }catch(error){
                console.log(`guildCreate Error: ${error}`);
            }
        });

        this.on('guildDelete', async (guildDelete) =>{

            await mongo().then(async (mongoose) =>{

                try{
                    await guildSchema.findOneAndDelete({
                        _id: guildDelete.id
                    });

                }finally{
                    mongoose.connection.close();
                }

            });

            try{
            console.log(`Left Guild: ${guildDelete.name} | Owner: ${guildDelete.ownerID} | Members: ${guildDelete.memberCount} | Region: ${guildDelete.region}`);
            this.channels.cache.get(leftChID).send(`Left Guild: ${guildDelete.name} | Owner: ${guildDelete.ownerID} | Members: ${guildDelete.memberCount} | Region: ${guildDelete.region}`);
            }catch(error){
                console.log(`guildDelete Error: ${error}`);
            }
        });
        
        
        this.on('message', async (message) =>{  
            this.prefix = guildPrefixes[message.guild.id];
            try{
                
                
                if(message.author.bot || !message.guild ||! message.content.toLowerCase().startsWith(this.prefix)) return;
                const [cmd, ...args] = message.content.slice(this.prefix.length).trim().split(/ +/g);
                const command = this.getCommand(cmd.toLowerCase());
                await command.run(this, message, args).catch(console.error);
                levels.addXP(message.guild.id, message.author.id, message.author.tag, 35, message);
                
            }catch(error){
                console.log(`onMessage Error: ${error}`);
            }
        });
    };
    /**
     * @param {MessageEmbed} data 
     * @param {Message} message 
     */
    embed(data, message) {
        return new MessageEmbed({...data, color: `RANDOM`}).setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true, format: `png`}));
    }

};

module.exports = MusicClient;

module.exports.loadPrefixes = async (client) =>{

    await mongo().then(async (mongoose) =>{

        try{

            for(const guild of client.guilds.cache){
                const gID = guild[1].id;
                const result = await guildSchema.findOne({ _id: gID});
                guildPrefixes[gID] = result.guildPrefix;
                
            }

        }finally{
            mongoose.connection.close();
        }
       

    })

}

module.exports.updatePrefix = async (guildID, newPrefix) =>{

     guildPrefixes[guildID] = newPrefix;
     console.log(`updatePrefix to: ${newPrefix}`);

}
