import React, { Component } from 'react'
import { routerMiddleware } from 'react-router-redux'
import { Route, IndexRoute, Router, hashHistory } from 'react-router'
import { Provider } from 'react-redux'

import Index from '../view'

// CONTAINERS
import DevTools from '../config/containers/DevTools'

// STORE
import configureStore from '../config/store/configureStore'

// STYLE
import './App.css'

// PAGES
import Entry from '../view/modules/users/entry'

const store = configureStore(routerMiddleware(hashHistory))

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <div>
          <Router history={hashHistory}>
            <Route path="/" component={Index}>
              <IndexRoute component={Entry} />
              <Route path="/entry" component={Entry} />
            </Route>
          </Router>
          {() => process.env.NODE_ENV !== 'production' ? <DevTools /> : false}
        </div>
      </Provider>
    )
  }
}

export default App