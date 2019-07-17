import * as actionTypes from './actionTypes'
import { Api } from './../utils'
import { BASIC_PLAN, PREMIUM_PLAN } from '../reducers/planTypes'
import { loadProperty } from './property.action'

function updatePlan(planType) {
  if (planType === BASIC_PLAN) {
    return { type: actionTypes.BASIC_MODEL_SELECTED }
  } else if (planType === PREMIUM_PLAN) {
    return { type: actionTypes.PREMIUM_MODEL_SELECTED }
  }
}

export function selectPlan(userId, planType) {
  return dispatch =>
    Api.planChange(userId, planType)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return response.json()
        } else {
          console.log(response)
          const error = new Error(response.statusText)
          error.response = response
          throw error
        }
      })
      .then(json => {
        dispatch(updatePlan(planType))
      })
}

// function firstNameUpdated(newName) {
//   return {
//     type: actionTypes.FIRSTNAME_UPDATED,
//     payload: { newName }
//   }
// }

export function updateFirstName(newName) {
  return dispatch => dispatch(updateFirstName(newName))
}

// function userIDUpdated(newID) {
//   return {
//     type: actionTypes.USERID_UPDATED,
//     payload: { newID }
//   }
// }

export function updateUserID(newID) {
  return dispatch => dispatch(updateUserID(newID))
}

function selectedPropertyIdUpdated(id) {
  return {
    type: actionTypes.SELECTEDPROPERTYID_UPDATED,
    payload: id
  }
}

function clearProperty() {
  return {
    type: actionTypes.PROPERTYINFO_CLEARED
  }
}

function mailingAddressUpdated(field, value) {
  return {
    type: actionTypes.MAILING_ADDRESS_CHANGED,
    payload: { field, value }
  }
}

export function updateSelectedPropertyId(id) {
  return dispatch => {
    dispatch(selectedPropertyIdUpdated(id))
    dispatch(clearProperty())
    dispatch(loadProperty(id))
  }
}

function userInfoUpdated(field, value) {
  return {
    type: actionTypes.USER_INFO_CHANGED,
    payload: { field, value }
  }
}

export function updateUserInfo(field, value) {
  return dispatch => dispatch(userInfoUpdated(field, value))
}

export function updateMailingAddress(field, value) {
  return dispatch => dispatch(mailingAddressUpdated(field, value))
}

export function editUser(id, user, callback) {
  console.log(user)
  return dispatch =>
    Api.editUser(id, user)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          console.log('User info successfully updated')
          callback()
        } else {
          const error = new Error(response.statusText)
          error.response = response
          console.log(response)
          throw error
        }
      })
      .catch(error => {
        console.log('request failed', error)
      })
}
