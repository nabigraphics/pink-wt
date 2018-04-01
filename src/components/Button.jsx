import React, { Component } from 'react';
import classnames from 'classnames';
class Button extends Component {
    render() {
        const { children, onClick, disabled, isLoading, lightBlue, full } = this.props;
        let buttonDisabled = false;
        if (disabled || isLoading) buttonDisabled = true;
        return (
            <button
                className={classnames("button", { full }, { lightBlue }, { isLoading })}
                onClick={(e) => { onClick(e) }}
                disabled={buttonDisabled}
            >
                {isLoading ? <i className="icon ion-load-c loading"></i> : null}{children}
            </button>
        );
    }
}

export default Button;