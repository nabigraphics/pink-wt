import App from './app';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducers from './reducers';
import * as actions from './actions';
import {Provider} from 'react-redux';

const store = createStore(reducers,compose(applyMiddleware(thunk),devToolsEnhancer()));

ReactDOM.render(<Provider store={store}><App/></Provider>,document.getElementById('app'));