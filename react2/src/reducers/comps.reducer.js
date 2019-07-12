import initialState from './initialState'
import {
  COMPS_LOADED,
  LOGGED_OUT,
  LIKELIHOOD_LOADED,
  SELECTEDPROPERTYID_UPDATED
} from '../actions/actionTypes'

export default function comps(state = initialState.comps, action) {
  switch (action.type) {
    case LIKELIHOOD_LOADED:
      return {
        ...state,
        likelihood: action.payload
      }
    case COMPS_LOADED:
      return {
        ...state,
        comps: action.payload
      }
    case SELECTEDPROPERTYID_UPDATED:
    case LOGGED_OUT:
      return initialState.comps
    default:
      return state
  }
}
