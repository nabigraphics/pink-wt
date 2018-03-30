import React, { Component } from 'react';
import Table from '../components/Table';
import prettyBytes from '../utils/convertBytes';

import textLengthCut from '../utils/textLengthCut';
import { observe, autorun } from 'mobx';
import { observer, inject } from 'mobx-react';

@inject("torrentStore")
@observer

class TorrentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultColumns: [
                {
                    title: 'Name',
                    key: 'name',
                    render: value => <span title={value} className="torrentTitle">{textLengthCut(value,30)}</span>,
                }, {
                    title: 'Size',
                    key: 'size',
                }, {
                    title: 'Downloaded',
                    key: 'downloaded',
                }, {
                    title: <span><i className="fa fa-arrow-down downloadSpeedIcon" aria-hidden="true"></i> Speed</span>,
                    key: 'downloadSpeed',
                }, {
                    title: 'Uploaded',
                    key: 'uploaded',
                }, {
                    title: <span><i className="fa fa-arrow-up uploadSpeedIcon" aria-hidden="true"></i> Speed</span>,
                    key: 'uploadSpeed',
                }, {
                    title: 'Peers',
                    key: 'numPeers',
                }, {
                    title: 'Magnet',
                    key: 'magnetURI',
                    width: 60,
                    render: (value, data, index) => {
                        return (
                            <a href={data.magnetURI}><i className="fa fa-magnet" aria-hidden="true"></i></a>
                        )
                    }
                }, {
                    title: 'Share',
                    key: 'share',
                    width: 60,
                    render: (value, data, index) => {
                        if (!data.hash) return null;
                        return (
                            <a href={"/s/" + data.hash} target="_blank"><i className="fa fa-share-alt" aria-hidden="true"></i></a>
                        )
                    }
                }
            ],
            torrents: [],
        }
        this.fetchTorrent = this.fetchTorrent.bind(this);
    }
    componentDidMount() {
        // this.fetchTorrent();
        autorun(() => {
            let torrents = this.props.torrentStore.torrents;
            if (torrents.length === 0) return;
            let fetchTorrents = torrents.map((torrent, i) => {
                let { name, downloaded, downloadSpeed, uploaded, uploadSpeed, numPeers, magnetURI, torrentFileBlobURL, hash } = torrent;
                return {
                    key: 'torrent_' + i,
                    name,
                    size: prettyBytes(0),
                    downloaded: prettyBytes(downloaded),
                    downloadSpeed: prettyBytes(downloadSpeed),
                    uploaded: prettyBytes(uploaded),
                    uploadSpeed: prettyBytes(uploadSpeed),
                    numPeers,
                    magnetURI,
                    hash
                }
            });
            this.setState({ torrents: fetchTorrents });
        })
        // this.interval = setInterval(this.fetchTorrent, 500);
    }
    componentWillUnmount() {
        // clearInterval(this.interval);
    }
    fetchTorrent() {
        let { torrents } = this.props;
        if (torrents.length === 0) return;
        let fetchTorrents = torrents.map((torrent, i) => {
            let { name, downloaded, downloadSpeed, uploaded, uploadSpeed, numPeers, ratio, magnetURI, torrentFileBlobURL } = torrent;
            return {
                key: 'torrent_' + i,
                name,
                size: 0,
                downloaded,
                downloadSpeed,
                uploaded,
                uploadSpeed,
                numPeers,
                ratio,
                magnetURI,
                torrentFileBlobURL,
            }
        });
        this.setState({ torrents: fetchTorrents });
    }
    render() {
        const { defaultColumns, torrents } = this.state;
        if (torrents.length === 0) return null;
        return (
            // <ul className="torrentList-ul">
            //     {torrents.map((torrent, i) => {
            //         return (
            //             <TorrentList key={"torrent_" + i} torrent={torrent} />
            //         )
            //     })}
            // </ul>
            <div className="torrentList">
                <Table columns={defaultColumns} data={torrents} />
            </div>
        )
    }
}

// class TorrentList extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             torrent: [],
//         }
//         this.fetchTorrent = this.fetchTorrent.bind(this);
//     }
//     componentDidMount() {
//         // let torrent = this.props.torrent;
//         // torrent.on('download', bytes => {
//         //     console.log("download : " , bytes);
//         // });
//         // torrent.on('upload', bytes => {
//         //     console.log("upload : " , bytes);
//         // });
//         // torrent.on('wire', wire => {
//         //     console.log("wire : " , wire)
//         // });
//         // torrent.on('ready', function () {
//         //     console.log('Peers', torrent.numPeers);
//         // })
//         // let files = torrent.files;
//         // console.log("dd");
//         // files.forEach((file) => {
//         //     file.getBlobURL((err, url) => {
//         //         let data = this.state.data;
//         //         data.push(url);
//         //         this.setState({ data });
//         //     })
//         // })
//         let { torrent } = this.props;
//         this.setState({ torrent });
//         this.interval = setInterval(this.fetchTorrent, 500);
//     }
//     componentWillUnmount() {
//         clearInterval(this.interval);
//     }
//     fetchTorrent() {
//         let { torrent } = this.props;
//         this.setState({ torrent });
//         // let files = torrent.files;
//         // files.forEach(file => {
//         //     console.log(file);
//         //     file.appendTo('body');
//         //     // file.getBlobURL((err, url) => {
//         //     //     console.log(url);
//         //     //     let data = this.state.data;
//         //     //     data.push(url);
//         //     //     this.setState({ data });
//         //     // })
//         // })
//     }
//     render() {
//         let { torrent } = this.state;

//         return (
//             <li className="torrentList-li">
//                     <div className="title">
//                         {torrent.name}
//                     </div>
//                     <div>
//                         Size
//                     </div>
//                     <div>
//                         {torrent.downloaded}
//                         {torrent.downloadSpeed}
//                     </div>
//                     <div>
//                         {torrent.uploaded}
//                         {torrent.uploadSpeed}
//                     </div>
//                     Peer : <span>{torrent.numPeers}</span>
//                     <div>
//                         {torrent.ratio}
//                     </div>
//                 {/* {torrent.infoHash} */}
//                 {/* <a href={torrent.magnetURI}><i className="fa fa-magnet" aria-hidden="true"></i></a> */}
//                 {/* <a href={torrent.torrentFileBlobURL} download={torrent.name + '.torrent'}><i className="fa fa-file-o" aria-hidden="true"></i></a> */}
//                 <div className="torrentList-delete">
//                     <i className="fa fa-times" aria-hidden="true"></i>
//                 </div>
//             </li>
//         );
//     }
// }

export default TorrentList;