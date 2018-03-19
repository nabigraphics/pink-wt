const WebTorrent = require('webtorrent');
const client = new WebTorrent();
const randomHash = require('../utils/randomHash');

let store = {};
const onSeed = () => {
    // client.seed()
    console.log("seed!");
}

module.exports = {
    onSeed
}