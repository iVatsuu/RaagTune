const MusicClient = require('./structures/Client');
const config = require('./config/config.json');

new MusicClient().start(config.DISCORD_BOT.TOKEN , `./commands`)