import * as actionTypes from './actionTypes'
import { Api } from './../utils'
import { loadProperty } from './property.action'

function loggedOut() {
  return { type: actionTypes.LOGGED_OUT }
}

function loginSucceeded(user) {
  return {
    type: actionTypes.LOGIN_SUCCEEDED,
    payload: user
  }
}

function loginFailed(user) {
  return {
    type: actionTypes.LOGIN_FAILED,
    payload: user
  }
}

function propertyIdsUpdated(ids) {
  return {
    type: actionTypes.PROPERTYIDS_UPDATED,
    payload: ids
  }
}

function userPropertiesLoaded(id) {
  return {
    type: actionTypes.SELECTEDPROPERTYID_UPDATED,
    payload: id
  }
}

export function logout() {
  return dispatch => dispatch(loggedOut())
}

export function loadUser(user, handleRedirect, handleFailure) {
  return dispatch =>
    Api.loadUser(user)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          console.log(response)
          return response.json()
        } else {
          const error = new Error(response.statusText)
          error.response = response
          dispatch(loginFailed())
          handleFailure()
          throw error
        }
      })
      .then(json => {
        console.log(json)
        const user = {
          id: json.result.user_id,
          firstName:
            json.result.first_name.charAt(0).toUpperCase() +
            json.result.first_name.slice(1).toLowerCase(),
          lastName:
            json.result.last_name.charAt(0).toUpperCase() +
            json.result.last_name.slice(1).toLowerCase(),
          email: json.result.email,
          phone: json.result.phone,
          address: {
            mailingAddress: json.result.street_address,
            mailingCity: json.result.city,
            mailingState: json.result.state,
            mailingZipcode: json.result.zipcode
          }
        }
        dispatch(loadUserProperties(user.id))
        dispatch(loginSucceeded(user))
        handleRedirect()
      })
      .catch(error => {
        console.log('request failed', error)
      })
}

export function createUser(user, handleRedirect, handleFailure) {
  return dispatch =>
    Api.createUser(user)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return response.json()
        } else {
          const error = new Error(response.statusText)
          error.response = response
          console.log(response)
          dispatch(loginFailed(error))
          handleFailure()
          throw error
        }
      })
      .then(json => {
        console.log(json)
        const user = {
          id: json.result.user_id,
          firstName:
            json.result.first_name.charAt(0).toUpperCase() +
            json.result.first_name.slice(1).toLowerCase()
        }
        dispatch(loginSucceeded(user))
        handleRedirect()
      })
      .catch(error => {
        console.log('request failed', error)
      })
}

export function recoverPassword(username) {
  return dispatch =>
    fetch('http://127.0.0.1:5000/forgot-password', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        username: username
      })
    })
      .then(response => {
        return response.json()
      })
      .then(json => {
        console.log(json)
      })
      .catch(error => {
        console.log('request failed', error)
      })
}

/*
 * Loads the array of propertyIds for a given userId
 * propertySelected is a boolean specifying whether another property is already selected
 */
export function loadUserProperties(userId, propertySelected) {
  return dispatch =>
    Api.loadUserProperties(userId)
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
        dispatch(propertyIdsUpdated(json.result.properties.map(p => p.id))) //TODO change backend response so that id is returned (not an obj)
        if (!propertySelected) {
          dispatch(userPropertiesLoaded(json.result.properties[0].id))
          dispatch(loadProperty(json.result.properties[0].id))
        }
      })
      .catch(error => {
        console.log('request failed', error)
      })
}
