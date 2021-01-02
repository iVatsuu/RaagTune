const mongoose = require('mongoose');
const config = require('../config/config.json');

module.exports = async () => {

    await mongoose.connect(config.DATABASE.MONGOOSE_ID, {
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    return mongoose;

}