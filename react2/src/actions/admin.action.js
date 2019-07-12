import * as actionTypes from './actionTypes'
import { Api } from './../utils'

function appealStatusUpdated(status) {
  return {
    type: actionTypes.APPEAL_STATUS_UPDATED,
    payload: status
  }
}

function propertiesSearched(property) {
  return {
    type: actionTypes.PROPERTIES_SEARCHED,
    payload: property
  }
}

function adminAuthorized(token) {
  return {
    type: actionTypes.ADMIN_AUTHORIZED,
    payload: token
  }
}

export function updateAppealStatus(status) {
  return dispatch => dispatch(appealStatusUpdated(status))
}

export function searchProperties(token, pin) {
  return dispatch =>
    Api.searchProperties(token, pin)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return response.json()
        } else {
          const error = new Error(response.statusText)
          error.response = response
          throw error
        }
      })
      .then(json => {
        const property = {
          city: json.result.property.city,
          pin: json.result.property.pin,
          address: json.result.property.address,
          zipcode: json.result.property.zipcode,
          id: json.result.property.id,
          lastName: json.result.users_last_name
        }
        dispatch(propertiesSearched(property))
        dispatch(appealStatusUpdated(json.result.property.appeal_status))
      })
      .catch(error => {
        console.log('request failed', error)
      })
}

export function authorizeAdmin(username, password) {
  return dispatch =>
    Api.authorizeAdmin(username, password)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return response.json()
        } else {
          const error = new Error(response.statusText)
          error.response = response
          throw error
        }
      })
      .then(json => {
        dispatch(adminAuthorized(json.result.token))
      })
      .catch(error => {
        console.log('request failed', error)
      })
}

export function editAppealStatus(id, appealStatus, callback) {
  return dispatch =>
    Api.editAppealStatus(id, appealStatus)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          callback()
          return response.json()
        } else {
          const error = new Error(response.statusText)
          error.response = response
          throw error
        }
      })
      .catch(error => {
        console.log('request failed', error)
      })
}
