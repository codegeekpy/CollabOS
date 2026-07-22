const Mongoose = require('mongoose');

async function  ConnectDB(){
    await Mongoose.connect(process.env.MONGO_URI);
    console.log("Db Connected!");
}

module.exports = ConnectDB;