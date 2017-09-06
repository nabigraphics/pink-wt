import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
class Progressbar extends Component {
    render() {
        return (
            <Motion
                defaultStyle={{width: 0}}
                style={{width:spring(this.props.percent)}}
            >
            {value => 
                (
                <div className="progressbar" style={{width:`${value.width}%`}}>
                </div>
            )}
            </Motion>
        );
    }
}

export default Progressbar;