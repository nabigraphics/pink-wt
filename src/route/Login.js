import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Login extends Component {
    constructor(props){
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.state = {
            userid:'',
            userpw:''
        }
    }
    handleChange(target,value){
        switch(target){
            case "id":
                this.setState({userid:value})
            break;
            case "password":
                this.setState({userpw:value})
            break;
        }
    }
    handleKeyDown(e){
        if(e === 13){
            this.handleLogin();
        }
    }
    handleLogin(){
        if(this.state.userid && this.state.userpw){
            const data = {
                userid:this.state.userid,
                userpw:this.state.userpw
            }
            this.props.login(data);
        }
    }
    render() {
        return (
            <div className="login">
                <div className="loginform">
                    <h5>Easy File Share</h5>
                    <hr/>
                    <Form action="/login" method="post">
                        <FormGroup>
                            <Label for="password">ID</Label>
                            <Input type="text" name="id" id="id" placeholder="ID" onKeyDown={e => this.handleKeyDown(e.keyCode)} onChange={e => this.handleChange('id',e.target.value)} value={this.state.userid} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input type="password" name="password" id="password" placeholder="Password" onKeyDown={e => this.handleKeyDown(e.keyCode)} onChange={e => this.handleChange('password',e.target.value)} value={this.state.userpw} />
                        </FormGroup>
                        <Button onClick={() => this.handleLogin()} color="primary" size="lg" outline block>Login</Button>
                    </Form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        username:state.authentication.username,
        user_profile:state.authentication.user_profile
    }
}
const mapDispatchToProps = (dispatch) =>{
  return{
    login:(data) => {dispatch(actions.loginRequest(data))}
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Login);