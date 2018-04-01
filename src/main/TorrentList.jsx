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
                    width: 300,
                    render: value => <span title={value} className="torrentTitle">{textLengthCut(value, 30)}</span>,
                }, {
                    title: 'Size',
                    key: 'length',
                    width: 140,
                    render: value => prettyBytes(value),
                }, {
                    title: 'Downloaded',
                    key: 'downloaded',
                    width: 140,
                    render: value => prettyBytes(value),
                }, {
                    title: <span><i className="icon ion-arrow-down-c downloadSpeedIcon"></i> Speed</span>,
                    key: 'downloadSpeed',
                    width: 120,
                    render: value => prettyBytes(value),
                }, {
                    title: 'Uploaded',
                    key: 'uploaded',
                    width: 130,
                    render: value => prettyBytes(value),
                }, {
                    title: <span><i className="icon ion-arrow-up-c uploadSpeedIcon"></i> Speed</span>,
                    key: 'uploadSpeed',
                    width: 130,
                    render: value => prettyBytes(value),
                }, {
                    title: 'Peers',
                    key: 'numPeers',
                    width: 100,
                }, {
                    title: 'Magnet',
                    key: 'magnetURI',
                    width: 100,
                    render: (value, data, index) => {
                        return (
                            <a href={data.magnetURI}><i className="icon ion-magnet" style={{ fontSize: 18 }}></i></a>
                        )
                    }
                }, {
                    title: 'Share',
                    key: 'share',
                    width: 100,
                    render: (value, data, index) => {
                        if (!data.hash) return <span>wating...</span>
                        return (
                            <a href={"/s/" + data.hash} target="_blank"><i className="icon ion-link" style={{ fontSize: 24 }}></i></a>
                        )
                    }
                }
            ]
        }
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