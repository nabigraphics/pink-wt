import React, { Component } from 'react';
import { autorun } from 'mobx';
import { observer, inject } from 'mobx-react';

@inject("torrentStore")
@observer
class Share extends Component {
    constructor(props) {
        super(props);
        this.state = {
            torrent: null,
        }
    }
    componentDidMount() {
        const hash = this.props.match.params.hash ? this.props.match.params.hash : null;
        if (hash) this.props.torrentStore.getInfo(hash);

        autorun(() => {
            let torrent = this.props.torrentStore.torrent;
            if (torrent) {
                this.setState({ torrent })
                this.props.torrentStore.onAddTorrent(torrent.magnetURI);
            }
        })
    }
    render() {
        const { torrent } = this.state;
        const hash = this.props.match.params.hash;
        // console.log(this.props.match.params.hash);
        return (
            <div>
                {hash} - Share!
                {torrent ? <div>{torrent.name}</div> : null}
            </div>
        );
    }
}

export default Share;