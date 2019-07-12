import initialState from './initialState'
import {
  PROPERTIES_SEARCHED,
  ADMIN_AUTHORIZED,
  APPEAL_STATUS_UPDATED
} from '../actions/actionTypes'

export default function admin(state = initialState.admin, action) {
  switch (action.type) {
    case PROPERTIES_SEARCHED:
      return {
        ...state,
        property: action.payload
      }
    case ADMIN_AUTHORIZED:
      return {
        ...state,
        token: action.payload,
        adminAuthorized: true
      }
    case APPEAL_STATUS_UPDATED:
      return {
        ...state,
        appealStatus: action.payload
      }
    default:
      return state
  }
}
