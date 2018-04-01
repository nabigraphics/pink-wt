import React, { Component } from 'react';

class Card extends Component {
    render() {
        return (
            <div className="card-container">
                {this.props.children}
            </div>
        );
    }
}

export default Card;