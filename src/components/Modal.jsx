import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
class Modal extends Component {
    render() {
        const { children, visible } = this.props;
        return (
            <div className={classNames("modal", { active: visible })}>
                <div className="modal-container">
                    {children}
                </div>
            </div>
        );
    }
}

Modal.propTypes = {
    visible: PropTypes.bool
};

export default Modal;