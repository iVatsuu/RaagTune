const mongoose = require('mongoose');

const reqString ={
    type: String,
    required: true
};
const reqNumber ={
    type: Number,
    default: 0
};

const PlaylistSchema = mongoose.Schema(
    {

        name: reqString,
        songs: Array,
        timeCreated: reqNumber,
        thumbnail: String,
        creator: reqString,
        tag: reqString
    }

)
module.exports = mongoose.model('playlists', PlaylistSchema);