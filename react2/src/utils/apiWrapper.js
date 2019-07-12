const REQUEST_METHODS = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete'
}

const LOGIN_URL = 'loginuser'
const SIGNUP_URL = 'adduser'
const PROPERTY_URL = 'property'
const UPDATE_PROPERTY_URL = 'update-property-info'
const USERS_PROPERTIES_URL = 'users-properties'
const COMPS_URL = 'get-comps'
const PLAN_URL = 'change-plan'
const PDF_URL = 'generate-pdf'
const COST_URL = 'cost'
const ADMIN_URL = 'admin'
const USER_INFO_URL = 'update-user-info'
const APPEAL_URL = 'update-appeal-status'
const DELETE_PROPERTY_URL = 'delete-property'

/*
 * Helper function that calls the endpoint on the backend
 * @param {string} method : get/post/put/delete
 * @param {string} endpoint : url of the endpoint
 * @param {object} payload : json body of the request
 */
function createRequest(method, endpoint, payload, token) {
  return fetch(`${'/api'}/${endpoint}`, {
    method: method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': token
      // 'Access-Control-Allow-Origin': '*' //TODO change this for production
    },
    body: payload
  })
}

/*
 * Auth/login
 */
export function loadUser(userInfo) {
  return createRequest(
    REQUEST_METHODS.POST,
    LOGIN_URL,
    JSON.stringify({
      username: userInfo.username,
      password: userInfo.password
    })
  )
}

export function createUser(userInfo) {
  return createRequest(
    REQUEST_METHODS.POST,
    SIGNUP_URL,
    JSON.stringify({
      first_name: userInfo.firstName,
      last_name: userInfo.lastName,
      username: userInfo.username,
      password: userInfo.password
    })
  )
}

export function loadUserProperties(id) {
  return createRequest(
    REQUEST_METHODS.GET,
    `${USERS_PROPERTIES_URL}?user_id=${id}`
  )
}

/*
 * User
 */
export function editUser(id, user) {
  return createRequest(
    REQUEST_METHODS.PUT,
    USER_INFO_URL,
    JSON.stringify({
      user_id: id,
      mailing_address: user.mailingAddress,
      mailing_city: user.mailingCity,
      mailing_state: user.mailingState,
      mailing_zipcode: user.mailingZipcode,
      phone: user.phone,
      first_name: user.firstName,
      last_name: user.lastName
    })
  )
}

/*
 * Property
 */
export function createProperty(address, userId) {
  console.log(userId)
  return createRequest(
    REQUEST_METHODS.PUT,
    PROPERTY_URL,
    JSON.stringify({
      street_address: address.streetAddress,
      city: address.city,
      zipcode: address.zipcode,
      state: address.state,
      user_id: parseInt(userId, 10)
    })
  )
}

export function editProperty(id, property, questionsPage) {
  let payload = {}
  switch (questionsPage) {
    //questions one
    case 1:
      payload = {
        property_id: id,
        ownership_status: property.ownershipStatus,
        reason: property.reason,
        appeal_type: property.appealType,
        progress: property.progress
      }
      break
    //progress
    case 3:
      payload = {
        property_id: id,
        progress: property.progress
      }
      break
    //comps
    case 4:
      payload = {
        property_id: id,
        progress: property.progress,
        best_comp_pins: property.compPins
      }
      break
    // admin
    case 5:
      payload = {
        property_id: id,
        appeal_status: property.appealStatus
      }
      break
    // property page
    default:
      payload = {
        property_id: id,
        garage_type: property.garageType,
        garage_size: property.garageSize,
        exterior: property.exterior,
        land_sqfeet: property.landSqFeet,
        building_sqfeet: property.buildingSqFeet,
        year_built: property.yearBuilt,
        num_units: property.numUnits,
        use: property.use,
        num_commercial_units: property.numCommercialUnits,
        num_full_baths: property.numFullBaths,
        num_half_baths: property.numHalfBaths,
        central_ac: property.centralAC,
        num_fireplaces: property.numFireplaces,
        type_of_residence: property.typeOfResidence,
        foundation_type: property.foundationType,
        attic_size: property.atticSize,
        basement_finish: property.basementFinish,
        attic_finish: property.atticFinish,
        progress: property.progress
      }
  }

  return createRequest(
    REQUEST_METHODS.PUT,
    UPDATE_PROPERTY_URL,
    JSON.stringify(payload)
  )
}

export function loadProperty(id) {
  return createRequest(REQUEST_METHODS.GET, `${PROPERTY_URL}?property_id=${id}`)
}

export function loadComps(id) {
  return createRequest(REQUEST_METHODS.GET, `${COMPS_URL}?property_id=${id}`)
}

export function planChange(userId, planType) {
  console.log(PLAN_URL)
  return createRequest(
    REQUEST_METHODS.GET,
    `${PLAN_URL}?user_id=${userId}&&plan_type=${planType}`
  )
}

export function editAppealStatus(id, appealStatus) {
  return createRequest(
    REQUEST_METHODS.PUT,
    APPEAL_URL,
    JSON.stringify({
      property_id: id,
      appeal_status: appealStatus
    })
  )
}

export function deleteProperty(id) {
  return createRequest(
    REQUEST_METHODS.DELETE,
    DELETE_PROPERTY_URL,
    JSON.stringify({ property_id: id })
  )
}

/*
 * PDF
 */
export function createPDF() {
  return createRequest(
    REQUEST_METHODS.GET,
    PDF_URL //TODO add parameters
  )
}

/*
 * Cost
 */
export function calculateCost(id) {
  return createRequest(REQUEST_METHODS.GET, `${COST_URL}?property_id=${id}`)
}

/*
 * Admin
 */
export function searchProperties(token, pin) {
  return createRequest(
    REQUEST_METHODS.GET,
    `${ADMIN_URL}?pin=${pin}`,
    null,
    token
  )
}

export function authorizeAdmin(username, password) {
  return createRequest(
    REQUEST_METHODS.POST,
    ADMIN_URL,
    JSON.stringify({
      username: username,
      password: password
    })
  )
}
