import initialState from './initialState'
import {
  LOGGED_OUT,
  LOGIN_SUCCEEDED,
  LOGIN_FAILED
} from '../actions/actionTypes'

export default function login(state = initialState.login, action) {
  switch (action.type) {
    case LOGIN_SUCCEEDED:
      return {
        ...state,
        isLoggedIn: true
      }
    case LOGGED_OUT:
    case LOGIN_FAILED:
      return {
        ...state,
        isLoggedIn: false
      }
    default:
      return state
  }
}
