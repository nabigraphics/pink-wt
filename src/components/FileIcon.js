import React, { Component } from 'react';

class FileIcon extends Component {
    render() {
        const icon = this.props.icon;
        const thumb = this.props.thumb;
        switch(icon){
            case "image":
                return(
                    <div onClick={this.props.onClick} className={this.props.className}>
                        <div className="item-imgbox"><img src={thumb} /></div>
                    </div>
                )
            break;
            case "audio":
                return (
                    <div onClick={this.props.onClick} className={this.props.className}>
                        <div className={"file-icon icon-sizefull " + icon}><i className="fa fa-music fa-5x" aria-hidden="true"></i></div>
                    </div>
                );
            break;
            case "video":
                return (
                    <div onClick={this.props.onClick} className={this.props.className}>
                        <div className={"file-icon icon-sizefull " + icon}><i className="fa fa-play fa-5x" aria-hidden="true"></i></div>
                    </div>
                );
            break;
            case "application":
                return (
                    <div onClick={this.props.onClick} className={this.props.className}>
                        <div className={"file-icon icon-sizefull " + icon}><i className="fa fa-file-archive-o fa-5x" aria-hidden="true"></i></div>
                    </div>
                );
            break;
            default :
                return (
                    <div onClick={this.props.onClick} className={this.props.className}>
                        <div className={"file-icon icon-sizefull " + icon}><i className="fa fa-file-archive-o fa-5x" aria-hidden="true"></i></div>
                    </div>
                )
        }
    }
}

export default FileIcon;