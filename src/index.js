import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import reducePosts from './reducers'
import {Provider} from 'react-redux'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import thunk from 'redux-thunk'

const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const rmiddleware = routerMiddleware(history)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  combineReducers({
    posts: reducePosts,
    router: routerReducer
  }),
  composeEnhancers(applyMiddleware(rmiddleware, thunk))
)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <App/>
      </div>
    </ConnectedRouter>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
