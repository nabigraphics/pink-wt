import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
// components.
import TorrentInfo from './share/TorrentInfo';
import TorrentContent from './share/TorrentContent';

// mobx
@inject("torrentStore")
@observer
class Share extends Component {
    componentDidMount() {
        const hash = this.props.match.params.hash ? this.props.match.params.hash : null;
        if (hash) this.props.torrentStore.getInfo(hash);
    }

    render() {
        const { currentTorrent, torrentInfo } = this.props.torrentStore;

        if (!torrentInfo) return null;
        let finished = currentTorrent ? currentTorrent.finished : false;
        // if (finished) return <TorrentContent />
        // else return <TorrentInfo />
        return <TorrentContent />
    }
}

export default Share;