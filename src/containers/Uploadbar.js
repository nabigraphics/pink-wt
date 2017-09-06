import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import Progressbar from '../components/Progressbar';
class Uploadbar extends Component {
    render() {
        return (
            <Motion
                defaultStyle={{height: 0}}
                style={this.props.isUploading ? {height: spring(10)} : {height:spring(0)}}
            >
            {value => (
                <div className="uploadbar" style={{...value}}>
                    <Progressbar percent={this.props.percent} />
                </div>
            )}
            </Motion>
        );
    }
}

export default Uploadbar;