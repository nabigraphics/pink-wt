import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './Main';
import Share from './Share';
import Header from './components/Header';
// Mobx React & Store.
import { Provider } from 'mobx-react';
import stores from './store';
class App extends Component {
    render() {
        return (
            <Provider {...stores}>
                <Router>
                    <div className="containers">
                        <Header />
                        <Route exact path="/" component={Main} />
                        <Route path="/s/:hash" component={Share} />
                    </div>
                </Router>
            </Provider>
        )
    }
}

export default App;
ReactDOM.render(<App />, document.getElementById('app'));