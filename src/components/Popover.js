import React, { Component } from 'react';
import ReactDOM from 'react-dom';
class Popover extends Component {
    constructor(props){
        super(props);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
        this.handleResizePopover = this.handleResizePopover.bind(this);
        this.popOpen = this.popOpen.bind(this);
        this.state = {
            active:false,
            top:0,
            left:0,
            translateX:0,
            translateY:0
        }
        this.popover = null;
    }
    handleResizePopover(){
        this.popOpen();
    }
    handleOutsideClick(e){
        if(!this.state.active){
            return;
        }
        const check = ReactDOM.findDOMNode(this);
        if(check.contains(e.target) || e.target == this.props.target){
            return;
        }
        e.stopPropagation();
        this.props.onClose();
    }
    popOpen(){
        if(this.props.onResponsive && window.innerWidth <= 575){
            this.setState({
                translateX:0,
                translateY:0
            })
            return;
        }
        const bt_rect = this.props.target.getBoundingClientRect();
        const pop_rect = this.popover.getBoundingClientRect();
        const parent_rect = ReactDOM.findDOMNode(this).parentNode.getBoundingClientRect();
        switch(this.props.position){
            case "bottom-right-backup":
                this.setState({
                    translateX:(bt_rect.left - pop_rect.width/2 - pop_rect.width/2 + bt_rect.width/2 + 20 ),
                    translateY:(bt_rect.top + bt_rect.height/1.5)
                })
            break;
            case "bottom-right":
                this.setState({
                    translateX:(bt_rect.left - pop_rect.width/2 - pop_rect.width/2 + bt_rect.width/2 + 20 - ( parent_rect.left - 1 ) ),
                    translateY:(bt_rect.top + bt_rect.height/1.5 - (parent_rect.top - 10))
                })
            break;
            default :
                this.setState({
                    translateX:(bt_rect.left - pop_rect.width/2 - pop_rect.width/2 + bt_rect.width/2 + 20 - ( parent_rect.left - 1 ) ),
                    translateY:(bt_rect.top + bt_rect.height/1.5 - (parent_rect.top - 10))
                })
        }
        return;
    }
    componentWillUnmount(){
        window.removeEventListener("resize", this.handleResizePopover);
        document.removeEventListener("mouseup",this.handleOutsideClick);
        document.removeEventListener("touchstart",this.handleOutsideClick);
    }
    componentDidUpdate(prevProps,prevState){
        if(this.props.isOpen){
            if(prevProps.isOpen !== this.props.isOpen){
                this.popOpen();
            }
        }
    }
    componentWillReceiveProps(props){
        if(props.isOpen){
            this.setState({active:true});
            window.addEventListener("resize", this.handleResizePopover);
            document.addEventListener("mouseup",this.handleOutsideClick);
            document.addEventListener("touchstart",this.handleOutsideClick);
        }else{
            this.setState({active:false});
            window.removeEventListener("resize", this.handleResizePopover);
            document.removeEventListener("mouseup",this.handleOutsideClick);
            document.removeEventListener("touchstart",this.handleOutsideClick);
        }
    }
    render() {
        const style = {
            top:this.state.top,
            left:this.state.left,
            transform:`translate(${this.state.translateX}px, ${this.state.translateY}px)`
        }
        if(this.props.isOpen){
            return (
                <ul
                ref={ref => this.popover = ref}
                style={style}
                className={ (this.props.className) + " popover " + (this.props.isOpen ? "active" : "hidden")}
                >
                {this.props.children}
                </ul>
            )
        }else{
            return null
        }
    }
}

export default Popover;