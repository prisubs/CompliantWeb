import { Api } from './../utils'

export function createPDF() {
  return dispatch =>
    Api.createPDF()
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          console.log('pdf successfully generated')
          console.log(response)
          window.location.assign(response.url, '_blank')
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
