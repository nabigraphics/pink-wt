import { observable, action } from 'mobx';
import WebTorrent from 'webtorrent';
import io from 'socket.io-client';
import axios from 'axios';
import shortid from 'shortid';
import map from 'async/map';
import config from '../../server/config';
const TRACKERS = [
    ["http://tracker.moe.cloud/announce"],
    ["udp://tracker.moe.cloud/"],
    ["ws://tracker.moe.cloud/"],
]
export default class TorrentStore {

    @observable torrents = []
    @observable updateQueue = {}
    @observable torrentInfo
    @observable currentTorrent = {
        isProgress: false,
        finished: false,
        progress: 0,
        downloaded: 0,
        uploaded: 0,
        downloadSpeed: 0,
        uploadSpeed: 0,
    }
    @observable currentTorrentFiles = []

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
            numPeers,
        }
        // map(torrent.files, (file, callback) => {
        //     // console.log(file);
        //     let data = {
        //         done: file.done,
        //         key: shortid.generate(),
        //         name: file.name,
        //         length: file.length,
        //         progress: file.progress,
        //     }
        //     callback(null, data);
        //     // if (file.done) {
        //     //     file.getBlob((err, blob) => {
        //     //         data.blob = blob;
        //     //         file.getBlobURL((err, url) => {
        //     //             data.url = url;
        //     //             callback(null, data);
        //     //         })
        //     //     })
        //     // } else {
        //     //     callback(null, data);
        //     // }
        // }, (err, results) => {
        //     if (err) return console.log(err);
        //     // console.log(results);
        //     // this.currentTorrent.files = results;
        //     this.currentTorrent = {
        //         ...this.currentTorrent,
        //         name,
        //         infoHash,
        //         magnetURI,
        //         torrentFileBlobURL,
        //         timeRemaining,
        //         downloaded,
        //         uploaded,
        //         downloadSpeed,
        //         uploadSpeed,
        //         progress,
        //         numPeers,
        //         files: results
        //     }
        // })

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
    addTorrentFileUpdate(fileHash, file) {
        // console.log(file.downloaded);

        let findIndex = this.currentTorrentFiles.findIndex((file) => file.key === fileHash);
        const {
            done,
            downloaded,
            progress
        } = file;
        this.currentTorrentFiles[findIndex] = {
            ...this.currentTorrentFiles[findIndex],
            done,
            downloaded,
            progress,
        }
        if (done) {
            clearInterval(this.updateQueue[fileHash]);
            this.currentTorrentFiles[findIndex].progress = 1;
            file.getBlob((err, blob) => {
                this.currentTorrentFiles[findIndex].blob = blob;
            })
            file.getBlobURL((err, url) => {
                this.currentTorrentFiles[findIndex].url = url;
            })
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
                ...this.currentTorrent,
                isProgress: true,
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
            this.updateQueue[infoHash] = setInterval(() => { this.torrentUpdate(torrent) }, 500);

            torrent.files.map(file => {
                let fileHash = shortid.generate();
                let data = {
                    done: file.done,
                    key: fileHash,
                    name: file.name,
                    length: file.length,
                }
                this.currentTorrentFiles.push(data);
                this.updateQueue[fileHash] = setInterval(() => { this.addTorrentFileUpdate(fileHash, file) }, 500)
            })
            // map(torrent.files, (file, callback) => {
            //     let data = {
            //         done: file.done,
            //         key: shortid.generate(),
            //         name: file.name,
            //         length: file.length,
            //     }
            //     file.getBlob((err, blob) => {
            //         data.blob = blob;
            //         file.getBlobURL((err, url) => {
            //             data.url = url;
            //             callback(null, data);
            //         })
            //     })
            // }, (err, results) => {
            //     // if (err) return console.log(err);
            //     // console.log(results);
            //     // this.currentTorrent.files = results;
            // })
            // this.updateQueue[infoHash] = setInterval(() => { this.torrentUpdate(torrent) }, 500);

            // this.updateQueue[infoHash] = setInterval(() => { this.addTorrentFileUpdate(torrent) }, 500);
            torrent.on('done', () => {
                console.log('done!');
                this.currentTorrent = {
                    ...this.currentTorrent,
                    isProgress: false,
                    finished: true,
                }
                // map(torrent.files, (file, callback) => {
                //     let data = {
                //         done: file.done,
                //         key: shortid.generate(),
                //         name: file.name,
                //         length: file.length,
                //     }
                //     file.getBlob((err, blob) => {
                //         data.blob = blob;
                //         file.getBlobURL((err, url) => {
                //             data.url = url;
                //             callback(null, data);
                //         })
                //     })
                // }, (err, results) => {
                //     if (err) return console.log(err);
                //     // console.log(results);
                //     this.currentTorrent.files = results;
                // })
            });
        })
    }
    @action getInfo(hash) {
        this.socket.emit('getInfo', { hash });
    }
}