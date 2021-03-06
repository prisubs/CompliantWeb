import { Api } from './../utils'

export function getTicker(tickerObject, handleRedirect, handleFailure) {
  return dispatch =>
    Api.getTicker(tickerObject)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          console.log(response)
          return response.json()
        } else {
          const error = new Error(response.statusText)
          error.response = response
          handleFailure()
          throw error
        }
      })
      .catch(error => {
        console.log('request failed', error)
      })
}

export function postTicker() {
  return dispatch =>
    Api.postTicker()
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          console.log(response)
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

export function getTickerFuture(tickerObject, handleRedirect, handleFailure) {
  return dispatch =>
    Api.getTickerFuture(tickerObject)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          console.log(response)
          return response.json()
        } else {
          const error = new Error(response.statusText)
          error.response = response
          handleFailure()
          throw error
        }
      })
      .catch(error => {
        console.log('request failed', error)
      })
}
