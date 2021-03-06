const REQUEST_METHODS = {
  GET: 'get',
  POST: 'post'
}

const TICKER_URL = 'ticker-get'
const FUTURE_URL = 'ticker-get-future'
/*
 * Helper function that calls the endpoint on the backend
 * @param {string} method : get/post/put/deletereactreact
 * @param {string} endpoint : url of the endpoint
 * @param {object} payload : json body of the request
 */

function createRequestSentStock(method, endpoint, payload, token) {
  return fetch(`${'/api'}/${endpoint}`, {
    method: method,
    headers: {
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': token
    },
    body: payload
  })
}

export function getTicker(tickerObject) {
  console.log(tickerObject)
  return createRequestSentStock(
    REQUEST_METHODS.POST,
    TICKER_URL,
    JSON.stringify({
      date: tickerObject.date,
      ticker: tickerObject.ticker
    })
  )
}

export function getTickerFuture(tickerObject) {
  console.log(tickerObject)
  return createRequestSentStock(
    REQUEST_METHODS.POST,
    FUTURE_URL,
    JSON.stringify({
      ticker: tickerObject.ticker
    })
  )
}

export function postTicker() {
  return createRequestSentStock(REQUEST_METHODS.GET, TICKER_URL)
}
