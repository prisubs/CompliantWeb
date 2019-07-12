import initialState from './initialState'
import {
  SELECTEDPROPERTYID_UPDATED,
  LOGIN_SUCCEEDED,
  PROPERTY_CREATED,
  USER_INFO_CHANGED,
  LOGGED_OUT,
  BASIC_MODEL_SELECTED,
  PREMIUM_MODEL_SELECTED,
  PROPERTYIDS_UPDATED,
  MAILING_ADDRESS_CHANGED,
  PROPERTY_DELETED
} from '../actions/actionTypes'
import { BASIC_PLAN, PREMIUM_PLAN } from './planTypes'

export default function user(state = initialState.user, action) {
  switch (action.type) {
    case LOGIN_SUCCEEDED:
      return {
        ...state,
        userId: action.payload.id,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        phone: action.payload.phone,
        address: { ...action.payload.address }
      }
    case PROPERTY_CREATED:
    case SELECTEDPROPERTYID_UPDATED:
      return {
        ...state,
        selectedPropertyId: action.payload
      }
    case USER_INFO_CHANGED:
      return {
        ...state,
        [action.payload.field]: action.payload.value
      }
    case BASIC_MODEL_SELECTED:
      return {
        ...state,
        planType: BASIC_PLAN
      }
    case PREMIUM_MODEL_SELECTED:
      return {
        ...state,
        planType: PREMIUM_PLAN
      }
    case PROPERTYIDS_UPDATED:
      return {
        ...state,
        propertyIds: action.payload
      }
    case MAILING_ADDRESS_CHANGED:
      return {
        ...state,
        address: {
          ...state.address,
          [action.payload.field]: action.payload.value
        }
      }
    case PROPERTY_DELETED:
    case LOGGED_OUT:
      return initialState.user
    default:
      return state
  }
}
