import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

import Popover from '../components/Popover';

class Header extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.poptoggle = this.poptoggle.bind(this);
        this.state = {
            isOpen: false,
            popoverOpen: false
        };
        this.PopoverUser = null;
      }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    poptoggle(){
        this.setState({
            popoverOpen: !this.state.popoverOpen
        });
    }
    render() {
        return (
            <div>
                <Navbar className="header" light toggleable>
                    <NavbarToggler right onClick={this.toggle} />
                        <Link className="navbar-brand brandlogo" to="/">Easy File Share</Link>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto header-menu" navbar>
                            <button className="header-item upload">
                                File Upload
                            </button>
                            <button ref={ ref => this.PopoverUser = ref } onClick={this.poptoggle} className="header-item admin">
                                {this.props.userid}
                            </button>
                            <Popover onClose={this.poptoggle} target={this.PopoverUser} className="popover" isOpen={this.state.popoverOpen}>
                                <li>setting</li>
                                <li onClick={this.props.logoutRequest} >Logout</li>
                            </Popover>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        userid:state.authentication.userid
    }
}
const mapDispatchToProps = (dispatch) =>{
    return{
        logoutRequest:() => {dispatch(actions.logoutRequest())}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Header);