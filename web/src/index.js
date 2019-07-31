import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'

import configureStore, { history } from './store/configureStore'
import { App, Review, NavBar, Methods, Predict } from './components'
import registerServiceWorker from './registerServiceWorker'
//import './styles/index.css'

export const ROUTES = {
  INDEX: '/',
  REVIEW: '/review',
  METHODS: '/methods',
  PREDICT: '/predict'
}

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <NavBar />
        <Route exact path="/" component={App} />
        <Route exact path={ROUTES.REVIEW} component={Review} />
        <Route exact path={ROUTES.METHODS} component={Methods} />
        <Route exact path={ROUTES.PREDICT} component={Predict} />
      </div>
    </ConnectedRouter>
  </Provider>,
  (document.getElementById('root'): any)
)

registerServiceWorker()
