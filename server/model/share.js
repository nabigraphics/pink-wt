const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

let Share = mongoose.Schema({
    hash: { type: String, index: true },
    name: String,
    announce: { type: Array, index: true },
    infoHash: { type: String, index: true },
    magnetURI: String,
    length: Number,
    id: { type: String, index: true },
    created_date: { type: Date, index: true, default: Date.now },
})

module.exports = mongoose.model("share", Share);