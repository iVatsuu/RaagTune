const mongoose = require('mongoose');

const reqString ={
    type: String,
    required: true
};

const reqBool ={
    type: Boolean,
    required: true
};

const GuildSchema = mongoose.Schema({
    _id: reqString,
    guildPrefix: reqString,
    guildName: reqString,
    guildRegion: reqString,
    guildOwner: reqString,
    guildMembers: reqString,
});

module.exports = mongoose.model('RaagTune', GuildSchema,'guilds');