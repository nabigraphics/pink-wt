import React, { Component } from 'react';

class Button extends Component {
    render() {
        const { children, onClick } = this.props;
        return (
            <button
                className="button"
                onClick={(e) => { onClick(e) }}
            >
                {children}
            </button>
        );
    }
}

export default Button;