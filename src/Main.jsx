import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import classNames from 'classnames';
import TorrentList from './main/TorrentList';
import Modal from './components/Modal';

import { observe, autorun } from 'mobx';
import { observer, inject } from 'mobx-react';

@inject("torrentStore")
@observer
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDropzoneOver: false,
        }
    }

    dropzoneDrag(e, status) {
        switch (status) {
            case "Enter":
                if (e.dataTransfer.types[0] == "Files") this.setState({ isDropzoneOver: true });
                break;
            case "Leave":
                this.setState({ isDropzoneOver: false });
                break;
        }
    }

    onDropzone(accept) {
        let opt = {}
        this.props.torrentStore.setLoading(true);
        if (accept.length > 1) {
            let torrentName = prompt("Torrent Name", "untitleTorrents");
            opt.name = torrentName;
        }
        this.props.torrentStore.onSeedTorrent(accept, opt);
        this.setState({ isDropzoneOver: false });
    }

    render() {
        const { isDropzoneOver } = this.state;
        const { torrents, isLoading } = this.props.torrentStore;
        let isNotNewTorrent = (torrents.length < 1) ? false : true;

        return (
            <div style={{ height: 'calc( 100% - 64px )', overflow: 'auto' }}>
                <TorrentList />
                <Dropzone
                    className={classNames("dropzone", { small: isNotNewTorrent })}
                    disableClick
                    disablePreview
                    onDragEnter={(e) => { this.dropzoneDrag(e, "Enter") }}
                    onDragLeave={(e) => { this.dropzoneDrag(e, "Leave") }}
                    onDropAccepted={(accept) => { this.onDropzone(accept) }}
                    ref={dropzone => { this.dropezone = dropzone }}
                >
                    <UploadButton isLoading={isLoading} torrents={torrents} active={isDropzoneOver} onClick={() => this.dropezone.open()} />
                </Dropzone>
            </div>
        );
    }
}

function UploadButton(props) {
    const { torrents, active, onClick, isLoading } = props;
    if (torrents.length < 1) {
        return (
            <div className="container center">
                <div className="content">
                    <div className={classNames('upload', { active: active })} onClick={onClick}>
                        <LoadingCircle isLoading={isLoading} />
                        <img className={classNames('upload-icon', { isLoading })} src="/logo.svg" />
                    </div>
                    <h1 className="upload-title">Drag and Drop files here.</h1>
                </div>
            </div>
        )
    } else {
        return (
            <div className={classNames('upload-small', { active: active })} onClick={onClick}>
                <LoadingCircle isLoading={isLoading} />
                <img className={classNames('upload-icon', { isLoading })} src="/logo.svg" />
            </div>
        )
    }
}

function LoadingCircle(props) {
    const { isLoading } = props;
    return <i className={classNames("loadingbar", { active: isLoading }, "icon ion-load-c")} ></i>
}
export default Main;