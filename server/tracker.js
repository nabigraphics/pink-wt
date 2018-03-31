const BTracker = require('bittorrent-tracker').Server;

const server = new BTracker({
    udp: true,
    http: true,
    ws: true,
    stats: true,
    filter:function (infoHash,params,cb) {
        return cb(null);
    }
})

server.on('error', err => {
    console.log("에러! : ", err.message);
})

server.on('warning', err => {
    console.log("경고! : ", err.message);
})

server.on('listening', () => {
    console.log('listening on http port:' + server.http.address().port)
    console.log('listening on udp port:' + server.udp.address().port)
    // console.log(server.udp.address());
    console.log('listening on ws port:' + server.ws.address().port)

    // console.log(server);
})

server.listen(8000);


server.on('complete',addr => {
    console.log("complete!");
})

server.on('update',addr => {
    console.log("update! : ", addr);
})

server.on('stop',addr => {
    console.log("stop!");
})