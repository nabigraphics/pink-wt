import React, { Component } from 'react';

import Tag from './Tag';

class Header extends Component {
    render() {
        return (
            <div className="header-bg">
                <div className="header">
                    <div className="logo">
                        <img className="header-logo-image" src="/logo.svg"/>
                        <Tag outline title="ver 0.9.0" />
                    </div>
                    <div className="share">
                        <a href="https://github.com/nabigraphics/easy-wt" target="_blank">
                            <i className="icon ion-social-github" style={{ fontSize: 24 }}></i>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;