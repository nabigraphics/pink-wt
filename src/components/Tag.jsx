import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
const Tag = (props) => {
    const { title, outline } = props;
    return (
        <span className={classNames("tag", { outline })}>{title}</span>
    )
}

Tag.propTypes = {
    title:PropTypes.string,
    outline:PropTypes.bool,
}

export default Tag;
