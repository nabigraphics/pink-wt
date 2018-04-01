import React, { Component } from 'react';
import { autorun } from 'mobx';
import { observer, inject } from 'mobx-react';
import jsmediatags from 'jsmediatags';
import textLengthCut from './utils/textLengthCut';
import Card from './share/card';
import Button from './components/Button';

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
        // jsmediatags.read("http://127.0.0.1:25252/01%20Trip%20Trip%20Trip.m4a", {
        //     onSuccess: function (tag) {
        //         console.log(tag);
        //     },
        //     onError: function (error) {
        //         console.log(':(', error.type, error.info);
        //     }
        // })
        const hash = this.props.match.params.hash ? this.props.match.params.hash : null;
        if (hash) this.props.torrentStore.getInfo(hash);

        autorun(() => {
            // let torrent = this.props.torrentStore.torrent;
            // if (torrent) {
            //     this.setState({ torrent })
            //     this.props.torrentStore.onAddTorrent(torrent.magnetURI);
            // }
        })
    }
    render() {
        const { currentTorrent } = this.props.torrentStore;
        const hash = this.props.match.params.hash;
        return (
            <div style={{ height: 'calc( 100% - 64px )', overflow: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {
                    (currentTorrent && currentTorrent.name) ?
                        <Card>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ padding: 20 }}>{textLengthCut(currentTorrent.name, 30)}</span>
                                <Button onClick={(e) => console.log(e)}>Download</Button>
                                <div>{currentTorrent.downloaded}</div>
                            </div>
                        </Card> : null
                }
            </div>
        );
    }
}

export default Share;