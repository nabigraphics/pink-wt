import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
// components.
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
        return <TorrentContent />
    }
}

export default Share;