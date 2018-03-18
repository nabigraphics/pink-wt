const path = require('path');
const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist/index.html'));
})

app.get('/s/:hash', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist/index.html'));
})

app.use('/', express.static(path.resolve(__dirname, '../dist')));

app.listen(config.port);