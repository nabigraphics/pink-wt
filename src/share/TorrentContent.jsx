import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
// components.
import Info from './Info';
import Table from '../components/Table';
import Button from '../components/Button';
import Progress from '../components/Progress';
// utils.
import textLengthCut from '../utils/textLengthCut';
import prettyBytes from 'pretty-bytes';
import JSZip from 'jszip';
import FileSaver from 'file-saver';
import async from 'async';
import axios from 'axios';
//utils.
import shortid from 'shortid';

// mobx
@inject("torrentStore")
@observer
class TorrentContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileColumns: [
                {
                    title: 'Progress',
                    key: 'progress',
                    width: 140,
                    render: (value, item, index) => <Progress id={("progress_" + item.key)} progress={value} />
                }, {
                    title: 'Status',
                    key: 'done',
                    width: 100,
                    render: value => String(value)
                }, {
                    title: 'File Name',
                    key: 'name',
                    width: 300,
                    align: 'left',
                    render: value => <span title={value}>{textLengthCut(value,30)}</span>,
                }, {
                    title: 'Size',
                    key: 'length',
                    width: 140,
                    render: value => prettyBytes(value),
                }, {
                    title: 'Download',
                    key: 'url',
                    width: 150,
                    render: (value, item, index) => {
                        if (!item.done) return null;
                        return (
                            <a className="download-button" key={"download_" + item.key} href={value} download={item.name}>
                                Download
                            </a>
                        )
                    }
                }
            ]
        }
    }
    componentDidMount() {
        this.setState({ isLoading: true });
        let { torrentInfo } = this.props.torrentStore;
        this.props.torrentStore.onAddTorrent(torrentInfo.magnetURI);
    }
    handleDownlaodZipClick() {
        const { currentTorrent, torrentInfo, currentTorrentFiles } = this.props.torrentStore;
        const zip = new JSZip();
        async.map(currentTorrentFiles, (file, callback) => {
            zip.folder(torrentInfo.name).file(file.name, file.blob);
            callback(null, true)
        }, (err, result) => {
            zip.generateAsync({ type: "blob" }).then((content) => {
                FileSaver.saveAs(content, torrentInfo.name + ".zip");
            });
        })
    }
    render() {
        const { fileColumns } = this.state;
        const { currentTorrent, torrentInfo, currentTorrentFiles } = this.props.torrentStore;
        const { downloaded, downloadSpeed, uploaded, uploadSpeed, progress, finished, isProgress, numPeers, files } = currentTorrent;
        const size = prettyBytes(torrentInfo.length);
        return (
            <div style={{ height: 'calc( 100% - 64px )', overflow: 'auto', display: 'flex' }}>
                <div className="torrentContent">
                    <div className="left-containers">
                        <span className="info-header">Info</span>
                        <div style={{ padding: 10 }}>
                            <Info title="Torrent Name" content={torrentInfo.name} />
                            <Info title="Size" content={size} />
                            <Info title="Downloaded" content={prettyBytes(downloaded)} />
                            <Info title={<span><i className="icon ion-arrow-down-c downloadSpeedIcon"></i> Speed</span>} content={prettyBytes(downloadSpeed)} />
                            <Info title="Uploaded" content={prettyBytes(uploaded)} />
                            <Info title={<span><i className="icon ion-arrow-up-c uploadSpeedIcon"></i> Speed</span>} content={prettyBytes(uploadSpeed)} />
                            <Info title="Peers" content={numPeers} />
                            {finished ?
                                <Button full onClick={() => { this.handleDownlaodZipClick() }}>Download Zip</Button>
                                :
                                <div className="container logo"><img src="/logo.svg" /></div>
                            }
                        </div>
                    </div>
                    <div className="right-containers">
                        <span className="info-header">Files</span>
                        <div className="table-container">
                            <Table align="left" columns={fileColumns} data={currentTorrentFiles} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TorrentContent;