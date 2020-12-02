const { Collection, Client, MessageEmbed, Message} = require('discord.js');
const help = require('../commands/help');

class MusicClient extends Client{

    constructor() {
        super();
        this.commands = new Collection();
        this.discord = require('discord.js');
        this.ms = require('ms');
        this.path = require('path');
        this.fs = require('fs');
        this.salvage = require('salvage-music');
        this.music = new this.salvage(this,[
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
        this.on('ready', () => {

            console.log(`RaagTune - Tuned and Ready :)`);
            //Start Set-status
            const activities = [

                `${this.guilds.cache.size} Servers!`,
                `${this.channels.cache.size} Channels!`,
                `${this.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} Members!`


            ];

            let i = 0;
            setInterval(() => this.user.setActivity(`${this.prefix}help | ${activities[i++ % activities.length]}`, {type: "WATCHING"}), 15000);


            //end set status


        });
        this.prefix = `?`;
        this.on('message', async(message) =>{
            if(message.author.bot || !message.guild ||! message.content.toLowerCase().startsWith(this.prefix)) return;
            const [cmd, ...args] = message.content.slice(this.prefix.length).trim().split(/ +/g);
            const command = this.getCommand(cmd.toLowerCase());
            command.run(this, message, args).catch(console.error);
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