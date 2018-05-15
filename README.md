![pinkwt](https://github.com/nabigraphics/pink-wt/blob/master/easywt-header.png?raw=true)  
[![Build Status](https://travis-ci.org/nabigraphics/pink-wt.svg?branch=master)](https://travis-ci.org/nabigraphics/pink-wt)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)

# Start
```
$ git clone https://github.com/nabigraphics/pink-wt
$ cd pink-wt
$ npm install
$ touch server/config.js
$ npm run build
$ npm start
```

# Scripts
```
$ npm run dev-server    // development nodemon server start.
$ npm run dev           // webpack development bundling.
$ npm run start         // server start.
$ npm run build         // webpack production build.
```

## server/config.js
```
module.exports = {
    port:Number,
    socket:Number,
    socketClient:String,
    mongoDB:String,
    TRACKERS:Array, 
}
```
### port `Type:Number`
Application Port

### socket `Type:Number`
Socket.io Port

### socketClient `Type:String`
socket.io client connect URL

### mongoDB `Type:String`
mongoose connect URL  
? [mongoose Getting Started](http://mongoosejs.com/docs/index.html)

## Example config file.
```
module.exports = {
    port:25252,
    socket:9000,
    socketClient:"http://localhost:9000/",
    mongoDB:"mongodb://localhost/",
    TRACKERS:[
        ["udp://tracker.leechers-paradise.org:6969"],
        ["udp://tracker.opentrackr.org:1337"],
        ["udp://explodie.org:6969"],
        ["udp://tracker.empire-js.us:1337"],
        ["wss://tracker.btorrent.xyz"],
        ["wss://tracker.openwebtorrent.com"],
        ["wss://tracker.fastcast.nz"],
    ]
}
```