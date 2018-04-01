import React, { Component } from 'react';
import Table from '../components/Table';
import prettyBytes from 'pretty-bytes';
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
                    render: value => <span title={value} className="torrentTitle">{textLengthCut(value, 30)}</span>,
                }, {
                    title: 'Size',
                    key: 'length',
                    render: value => prettyBytes(value),
                }, {
                    title: 'Downloaded',
                    key: 'downloaded',
                    render: value => prettyBytes(value),
                }, {
                    title: <span><i className="fa fa-arrow-down downloadSpeedIcon" aria-hidden="true"></i> Speed</span>,
                    key: 'downloadSpeed',
                    render: value => prettyBytes(value),
                }, {
                    title: 'Uploaded',
                    key: 'uploaded',
                    render: value => prettyBytes(value),
                }, {
                    title: <span><i className="fa fa-arrow-up uploadSpeedIcon" aria-hidden="true"></i> Speed</span>,
                    key: 'uploadSpeed',
                    render: value => prettyBytes(value),
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
                        if (!data.hash) return <span>wating...</span>
                        return (
                            <a href={"/s/" + data.hash} target="_blank"><i className="fa fa-share-alt" aria-hidden="true"></i></a>
                        )
                    }
                }
            ]
        }
    }
    componentDidMount() {
        // this.fetchTorrent();
        autorun(() => {
            let torrents = this.props.torrentStore.torrents;
            // if(torrents > )
            // console.log("torrents! ", torrents);
            // if (torrents.length === 0) return;
            // let fetchTorrents = torrents.map((torrent, i) => {
            //     let { name, length, downloaded, downloadSpeed, uploaded, uploadSpeed, numPeers, magnetURI, torrentFileBlobURL, hash } = torrent;
            //     return {
            //         key: 'torrent_' + i,
            //         name,
            //         length: prettyBytes(length),
            //         downloaded: prettyBytes(downloaded),
            //         downloadSpeed: prettyBytes(downloadSpeed),
            //         uploaded: prettyBytes(uploaded),
            //         uploadSpeed: prettyBytes(uploadSpeed),
            //         numPeers,
            //         magnetURI,
            //         hash
            //     }
            // });
            // this.setState({ torrents: fetchTorrents });
        })
        // this.interval = setInterval(this.fetchTorrent, 500);
    }
    componentWillUnmount() {
        // clearInterval(this.interval);
    }

    render() {
        const { defaultColumns } = this.state;
        const { torrents } = this.props.torrentStore;
        if (torrents.length === 0) return null;
        return (
            <div className="torrentList">
                <Table columns={defaultColumns} data={torrents} />
            </div>
        )
    }
}

export default TorrentList;