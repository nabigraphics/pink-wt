import React, { Component } from 'react';
import textLengthCut from '../utils/textLengthCut';
class Info extends Component {
    render() {
        const { title, content } = this.props;
        return (
            <div className="info-container">
                <div className="info-title">
                    {title}
                </div>
                <div className="info-content" title={content}>
                    {textLengthCut(content, 22)}
                </div>
            </div>
        );
    }
}

export default Info;