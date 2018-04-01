import { observable, toJS, action } from 'mobx';
import WebTorrent from 'webtorrent';
import io from 'socket.io-client';
import axios from 'axios';

const TRACKERS = [
    ["http://tracker.moe.cloud/announce"],
    ["udp://tracker.moe.cloud/"],
    ["ws://tracker.moe.cloud/"],
]
export default class TorrentStore {

    @observable torrents = [];
    @observable updateQueue = {};
    @observable torrentInfo
    @observable currentTorrent

    constructor() {
        this.initialize();
    }

    initialize() {
        if (!WebTorrent.WEBRTC_SUPPORT) return console.log("unsupported");

        console.log("supported");

        this.client = new WebTorrent({
            tracker: {
                announce: TRACKERS
            }
        });
        // connect socket io.
        this.socket = io.connect('http://localhost:9000/');
        this.socket.on('onSeedResult', (data) => {
            console.log(data);
            let hash = data.hash;
            let infoHash = data.infoHash;
            let findIndex = this.torrents.findIndex((torrent) => torrent.infoHash === infoHash);
            this.torrents[findIndex].hash = hash;
        });
        this.socket.on('getInfoResult', data => {
            this.torrentInfo = data;
        })
        this.client.on('error', (err) => {
            console.log("에러!");
        })
        this.client.on('torrent', function (torrent) {
            // console.log(torrent);
        })
    }

    torrentUpdate(torrent) {
        const {
            name,
            infoHash,
            magnetURI,
            torrentFileBlobURL,
            timeRemaining,
            downloaded,
            uploaded,
            downloadSpeed,
            uploadSpeed,
            progress,
            numPeers
        } = torrent;
        this.currentTorrent = {
            ...this.currentTorrent,
            name,
            infoHash,
            magnetURI,
            torrentFileBlobURL,
            timeRemaining,
            downloaded,
            uploaded,
            downloadSpeed,
            uploadSpeed,
            progress,
            numPeers
        }
        // console.log(this.currentTorrent);
    }
    seedTorrentUpdate(infoHash, torrent) {
        let findIndex = this.torrents.findIndex((torrent) => torrent.infoHash === infoHash);
        const {
            downloaded,
            downloadSpeed,
            uploaded,
            uploadSpeed,
            numPeers,
        } = torrent;
        this.torrents[findIndex] = {
            ...this.torrents[findIndex],
            downloaded,
            downloadSpeed,
            uploaded,
            uploadSpeed,
            numPeers,
        }
    }
    // Seed Actions
    @action onSeedTorrent(files, options) {
        options.announce = TRACKERS;
        this.client.seed(files, options, torrent => {
            // socket emit query.
            let data = {
                name: torrent.name,
                announce: torrent.announce,
                infoHash: torrent.infoHash,
                magnetURI: torrent.magnetURI,
                length: torrent.length,
            }
            this.socket.emit('onSeed', data);

            // new torrent query.
            const {
                name,
                announce,
                infoHash,
                downloaded,
                downloadSpeed,
                uploaded,
                uploadSpeed,
                numPeers,
                magnetURI,
                length,
            } = torrent;
            let newTorrent = {
                key: infoHash,
                hash: null,
                name,
                announce,
                infoHash,
                downloaded,
                downloadSpeed,
                uploaded,
                uploadSpeed,
                numPeers,
                magnetURI,
                length,
            }
            this.torrents.push(newTorrent);
            // updateQueue setInterval
            this.updateQueue[infoHash] = setInterval(() => { this.seedTorrentUpdate(infoHash, torrent) }, 500);
        });
    }
    // Add Actions
    @action onAddTorrent(torrent_uri, options) {
        this.client.add(torrent_uri, options, torrent => {

            const { infoHash, magnetURI, torrentFileBlobURL, timeRemaining, downloaded, uploaded, downloadSpeed, uploadSpeed, progress, numPeers } = torrent;
            this.currentTorrent = {
                isProgress: true,
                finished: false,
                infoHash,
                magnetURI,
                torrentFileBlobURL,
                timeRemaining,
                downloaded,
                uploaded,
                downloadSpeed,
                uploadSpeed,
                progress,
                numPeers
            }
            let addTorrent = setInterval(() => { this.torrentUpdate(torrent) }, 500);
            torrent.on('done', () => {
                console.log('done!');
                clearInterval(addTorrent);
                this.currentTorrent = {
                    ...this.currentTorrent,
                    isProgress: false,
                    finished: true
                }
                console.log(this.currentTorrent);
                //     torrent.files.forEach(file => {
                //         // do something with file
                //         file.appendTo('body');
                //     })
            });
        })
    }
    @action getInfo(hash) {
        this.socket.emit('getInfo', { hash });
    }
}