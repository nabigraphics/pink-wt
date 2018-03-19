///////////////////////////////////////////////////////////////
const path = require('path');
const express = require('express');
const router = express.Router();
// API
// const torrentAPI = require('./api/torrentAPI');
const socketAPI = require('./api/socketAPI');
// Models
const Share = require('./model/share');
///////////////////////////////////////////////////////////////


router.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist/index.html'));
})

router.get('/s/:hash', (req, res) => {
    Share.findOne({ hash: req.params.hash }).then(result => {
        if (!result) return res.send("404");
        return res.sendFile(path.resolve(__dirname, '../dist/index.html'));
    }).catch(err => {
        return res.send("404");
    })
})

module.exports = router;