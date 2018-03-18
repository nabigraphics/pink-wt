import { observable, action } from 'mobx';
import WebTorrent from 'webtorrent';

export default class TorrentStore {

    @observable torrents = []

    constructor() {
        this.initialize();
    }
    initialize() {
        // console.log("initialize!");
        this.client = new WebTorrent();
        // console.log(this.client.progress);
        this.client.processing = true;
        // console.log(this.client);
        this.client.on('error', (err) => {
            // console.log("에러!");
        })
        this.client.on('torrent', function (torrent) {
            // console.log(torrent);
        })
        this.clientUpdate();
        this.interval = setInterval(() => { this.clientUpdate() }, 500);
        // setInterval(() => {
        //     this.torrents = this.client.torrents;
        // }, 500);
    }
    clientUpdate() {
        // console.log(this.client);
        if (this.client.processing) return; 
        this.torrents = this.client.torrents;
    }

    @action onSeedTorrent(files) {
        this.client.seed(files, torrent => {
            this.client.processing = true;
            torrent.on('ready', function () {
                console.log("i'm ready!");
            })
            torrent.on('warning', function (err) {
                console.log('warning');
                console.log(err);
            })
            torrent.on('done', function () {
                console.log('done');
            })
            torrent.on('wire', function (wire) {
                console.log('wire');
                console.log(wire);
                console.log(torrent.numPeers);
            })
            torrent.on('noPeers', function (announceType) {
                // console.log("noPeers!");
                // console.log(announceType);
            })
            this.torrents = this.client.torrents;
        });
    }
}