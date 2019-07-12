// @flow
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import login from './login.reducer'
import progress from './progress.reducer'
import property from './property.reducer'
import user from './user.reducer'
import comps from './comps.reducer'
import admin from './admin.reducer'

const rootReducer = combineReducers({
  router: routerReducer,
  login,
  progress,
  property,
  user,
  comps,
  admin
})

export default rootReducer
