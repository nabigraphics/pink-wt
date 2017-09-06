import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import FileIcon from './FileIcon';
import Checkbox from './Checkbox';
import Popover from './Popover';
const Menuoption = (props) => {
    return (
        <div className="item-menu">
            <Checkbox checked={props.checkboxchkd} target={"checkboxcomponent_" + props.id} className="checkbox" onClick={props.onClick} />
        </div>
    )
}
class Masonryitem extends Component {
    constructor(props){
        super(props);
        this.itemClick = this.itemClick.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.popovertoggle = this.popovertoggle.bind(this);
        this.state = {
            checked:"",
            checkedbool:false,
            more_popover:false
        }
        this.MorePopover = null;
    }
    itemClick(type,hash) {
        
    }
    popovertoggle(target){
        switch(target){
            case "more":
                this.setState({
                    more_popover: !this.state.more_popover
                });
            break;
        }
    }
    handleClick(){
        if(this.state.checked == ""){
            this.setState({
                checked:"checked",
                checkedbool:true
            });
        }else{
            this.setState({
                checked:"",
                checkedbool:false
            });
        }
    }
    render() {
        const type = this.props.filetype.split('/')[0];
        const hash = this.props.hash;
        const thumb = this.props.thumb;
        return (
            <div className={"item " + this.state.checked + " item-shadow-box"}>
                <div className="item-icon">
                    <Menuoption id={this.props.id} checkboxchkd={this.state.checkedbool} onClick={this.handleClick} />
                    <FileIcon onClick={this.handleClick} icon={type} thumb={thumb ? thumb : false} />
                </div>
                <div className="item-content">
                    <div>
                        <h5>{this.props.filename}</h5>
                    </div>
                    <hr/>
                    <div className="item-menu-bt">
                        <div className="item-menu-bt-left">
                            <i className="material-icons">file_download</i>
                            <i className="material-icons">share</i>
                        </div>
                        <div className="item-menu-bt-right">
                            <i ref={ref => this.MorePopover = ref} onClick={() => this.popovertoggle("more")} className="material-icons">more_horiz</i>
                        </div>
                        <Popover position="bottom-right" onClose={() => this.popovertoggle("more") } target={this.MorePopover} className="popover" isOpen={this.state.more_popover}>
                            <li>이름 변경</li>
                            <li onClick={() => {this.props.onDelete(hash)}}>삭제</li>
                        </Popover>
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(Masonryitem);