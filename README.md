![pinkwt](https://github.com/nabigraphics/pink-wt/blob/master/easywt-header.png?raw=true)  
[![Build Status](https://travis-ci.org/nabigraphics/pink-wt.svg?branch=master)](https://travis-ci.org/nabigraphics/pink-wt)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)
# Install
git Clone.

# Usage


# Config

### server/config.js
```
{
    port:Number,
    socket:Number,
    socketClient:String,
    mongoDB:String,
    TRACKERS:Array, 
}
```
### Example
```
{
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
