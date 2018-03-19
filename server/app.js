const path = require('path');
const config = require('./config');
const https = require('https');
const express = require('express');
const router = require('./router');
const bodyParser = require('body-parser');
const app = express();

//mongoose
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const mongo_url = config.mongoDB;

mongoose.connect(mongo_url).then(() => {
    console.log("MongoDB Connected");
}).catch(err => {
    throw err;
});

//socket io
const socketAPI = require('./api/socketAPI');
const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(config.socket);
io.on('connection', socketAPI);

//express configulation
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// express use router
app.use('/', router);
app.use('/', express.static(path.resolve(__dirname, '../dist')));

app.listen(config.port);