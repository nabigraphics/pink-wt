import { observable, action } from 'mobx';
import WebTorrent from 'webtorrent/webtorrent.min';
import io from 'socket.io-client';
import axios from 'axios';

const TRACKERS = [
    ["http://tracker.moe.cloud/announce"],
    ["udp://tracker.moe.cloud/"],
    ["ws://tracker.moe.cloud/"],
]
export default class TorrentStore {

    // @observable torrents = [];
    // @observable torrent = null;

    // constructor() {
    //     this.initialize();
    // }
    // initialize() {
    //     // console.log("initialize!");
    //     if (!WebTorrent.WEBRTC_SUPPORT) return console.log("unsupported");
        
    //     console.log("supported");
    //     this.client = new WebTorrent({
    //         tracker: {
    //             announce: TRACKERS
    //         }
    //     });

    //     this.socket = io.connect('http://localhost:9000/');

    //     this.socket.on('onSeedResult', (data) => {
    //         // console.log("onSeedResult!!");
    //         // console.log(data);
    //         let torrent = this.client.get(data.infoHash);
    //         torrent.hash = data.hash;

    //         // console.log(this.client.get(data.infoHash));
    //         // this.socket.emit('my other event', { my: 'data' });
    //     });
    //     this.socket.on('getInfoResult', data => {
    //         // console.log(data);
    //         this.torrent = data;
    //     })
    //     this.client.on('error', (err) => {
    //         // console.log("에러!");
    //     })
    //     this.client.on('torrent', function (torrent) {
    //         // console.log(torrent);
    //     })
    //     this.clientUpdate();
    //     this.interval = setInterval(() => { this.clientUpdate() }, 500);
    //     // setInterval(() => {
    //     //     this.torrents = this.client.torrents;
    //     // }, 500);
    // }
    // clientUpdate() {
    //     // console.log(this.client);
    //     // if (this.client.processing) return; 
    //     this.torrents = this.client.torrents;
    //     // if (this.client.torrents.length !== 0) this.client.torrents[0].test = "moe!";
    //     // console.log(this.client.torrents);
    // }
    // @action onAddTorrent(torrent_uri, options) {
    //     this.client.add(torrent_uri, options, torrent => {
    //         // console.log(torrent);
    //         torrent.on('done', () => {
    //             console.log('done!');
    //             torrent.files.forEach(file => {
    //                 // do something with file
    //                 file.appendTo('body');
    //             })
    //         });
    //     })
    // }
    // @action onSeedTorrent(files, options) {
    //     options.announce = TRACKERS;
    //     console.log(options);
    //     // axios.post('/upload').then(result => {
    //     //     console.log(result.data);
    //     // }).catch(err => console.log(err));
    //     // console.log(files);
    //     // let fileName = files[0].name;
    //     // let fileType = fileName.match(/.[^.]*$/g)[0];
    //     // let name = fileName.replace(fileType, '.torrent');
    //     // let name = fileName.replace(fileName.match(/[^.]*$/g)[0]);
    //     this.client.seed(files, options, torrent => {

    //         console.log(torrent);
    //         let data = {
    //             name: torrent.name,
    //             announce: torrent.announce,
    //             infoHash: torrent.infoHash,
    //             magnetURI: torrent.magnetURI,
    //         }
    //         torrent.hash = null;
    //         // this.client.processing = true;
    //         // torrent.on('ready', function () {
    //         //     console.log("i'm ready!");
    //         // })
    //         // torrent.on('warning', function (err) {
    //         //     console.log('warning');
    //         //     console.log(err);
    //         // })
    //         // torrent.on('done', function () {
    //         //     console.log('done');
    //         // })
    //         // torrent.on('wire', function (wire) {
    //         //     console.log('wire');
    //         //     console.log(wire);
    //         //     console.log(torrent.numPeers);
    //         // })
    //         // torrent.on('noPeers', function (announceType) {
    //         //     // console.log("noPeers!");
    //         //     // console.log(announceType);
    //         // })
    //         this.socket.emit('onSeed', data);
    //         this.torrents = this.client.torrents;
    //     });
    // }
    // @action getInfo(hash) {
    //     this.socket.emit('getInfo', { hash });
    // }
}