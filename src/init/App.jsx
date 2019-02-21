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
import Menu from '../view/modules/entry/menu'
import Clients from '../view/modules/clients/list'
import ClientForm from '../view/modules/clients/form'
import Loans from '../view/modules/clients/loans/list'
import LoanForm from '../view/modules/clients/loans/form'

const store = configureStore(routerMiddleware(hashHistory))

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <div>
          <Router history={hashHistory}>
            <Route path="/" component={Index}>
              <IndexRoute component={Menu} />
              <Route path="/menu" component={Menu} />
              <Route path="/clients" component={Clients} />
              <Route path="/client/form" component={ClientForm} />
              <Route path="/client/loans" component={Loans} />
              <Route path="/client/loan/form" component={LoanForm} />
            </Route>
          </Router>
          {process.env.NODE_ENV !== 'production' ? <DevTools /> : ''}
        </div>
      </Provider>
    )
  }
}

export default App