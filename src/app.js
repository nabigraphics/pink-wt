import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from './actions';

class App extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.props.authCheck();
    }
    render() {
        if(this.props.loading){
            return null;
        }else{
            return (
                <Router>
                    <div>
                        Yo!
                    </div>
                </Router>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return{
        loading:state.authentication.loading,
        logged:state.authentication.logged
    }
}
const mapDispatchToProps = (dispatch) =>{
  return{
    authCheck:() => {dispatch(actions.authCheckRequest())}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);