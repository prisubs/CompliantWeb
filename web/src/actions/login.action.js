import * as actionTypes from './actionTypes'
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
