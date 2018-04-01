import React, { Component } from 'react';

class Card extends Component {
    render() {
        const { children, style } = this.props;
        return (
            <div className="card-container" style={style}>
                {children}
            </div>
        );
    }
}

export default Card;