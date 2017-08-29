import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from './actions';

import * as Routefolder from './route';

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
                        <Switch>
                            <Route exact path="/" component={this.props.logged ? Routefolder.Adminpage : Routefolder.Login} />
                            <Route exact path="/s/:share" component={Routefolder.Share} />
                            <Route component={Routefolder.Notfound}/>
                        </Switch>
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