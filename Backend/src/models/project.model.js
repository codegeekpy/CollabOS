const mongoose = require('mongoose');

const upload = new mongoose.Schema({
    ProtocolName : String,
    Category : String,
    Budget: Number,
    Currency: String,
    Desc: String,
    url : String
});

const uploadModel = mongoose.model('uploadModel',upload);

module.exports = uploadModel;