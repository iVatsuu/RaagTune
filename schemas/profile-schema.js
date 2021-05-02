const mongoose = require('mongoose');

const reqString ={
    type: String,
    required: true
};

const reqBool ={
    type: Boolean,
    required: true
};

const ProfileSchema = mongoose.Schema({
    userID: reqString,
    userName:  reqString,
    blocked: reqBool,

    cmdCount: {
        type: Number,
        dafault: 0
    },
    
    xp: {
        type: Number,
        default: 0
    },

    level: {
        type: Number,
        default: 0
    } 
});

module.exports = mongoose.model('profiles', ProfileSchema);