import * as actionTypes from './actionTypes'
import { Api } from './../utils'
import { loadUserProperties } from './login.action'

function propertyFormInputUpdated(field, value) {
  return {
    type: actionTypes.PROPERTY_FORM_INPUT_CHANGED,
    payload: { field, value }
  }
}

function progressUpdated(value) {
  return {
    type: actionTypes.PROGRESS_CHANGED,
    payload: value
  }
}

function addressUpdated(field, value) {
  return {
    type: actionTypes.ADDRESS_CHANGED,
    payload: { field, value }
  }
}

function propertyCreated(propertyId) {
  return {
    type: actionTypes.PROPERTY_CREATED,
    payload: propertyId
  }
}

function propertyLoaded(propertyInfo) {
  return {
    type: actionTypes.PROPERTY_LOADED,
    payload: propertyInfo
  }
}

function compsLoaded(comps) {
  return {
    type: actionTypes.COMPS_LOADED,
    payload: comps
  }
}

function likelihoodLoaded(likelihood) {
  return {
    type: actionTypes.LIKELIHOOD_LOADED,
    payload: likelihood
  }
}

function costCalculated(cost) {
  return {
    type: actionTypes.COST_CALCULATED,
    payload: cost
  }
}

function propertyDeleted() {
  return {
    type: actionTypes.PROPERTY_DELETED
  }
}

export function updatePropertyFormInput(field, value) {
  if (field === 'progress') {
    return dispatch => dispatch(progressUpdated(value))
  } else return dispatch => dispatch(propertyFormInputUpdated(field, value))
}

export function updateAddress(field, value) {
  return dispatch => dispatch(addressUpdated(field, value))
}

export function createProperty(address, userId, handleRedirect) {
  return dispatch =>
    Api.createProperty(address, userId)
      .then(response => {
        handleRedirect()
        return response.json()
      })
      .then(json => {
        // const propertyData = {
        //   id: json.id,
        //   ownershipStatus: json.ownership_status,
        //   appealType: json.appeal_type,
        //   street: json.street_address,
        //   city: json.city,
        //   township: json.township,
        //   yearPurchased: json.year_purchased,
        //   purchasePrice: json.price_purchased,
        //   pin: json.pin,
        //   reason: json.reason,
        //   typeOfResidence: json.type_of_residence,
        //   exterior: json.exterior,
        //   centralAC: json.central_ac,
        //   numFullBaths: json.num_full_baths,
        //   numHalfBaths: json.num_half_baths,
        //   numFireplaces: json.num_fireplaces,
        //   buildingSqFeet: json.building_sqfeet,
        //   landSqFeet: json.land_sqfeet,
        //   numCommercialUnits: json.num_commercial_units,
        //   userId: json.user_id,
        //   use: json.use,
        //   yearBuilt: json.year_built,
        //   foundationType: json.foundation_type,
        //   basementFinish: json.basement_finish,
        //   atticSize: json.attic_size,
        //   atticFinish: json.attic_finish,
        //   garageType: json.garage_type,
        //   garageSize: json.garage_size,
        //   numBeds: json.num_beds,
        //   numUnits: json.num_units
        // }
        dispatch(propertyCreated(json.result.property_id))
        dispatch(loadProperty(json.result.property_id))
      })
      .catch(error => {
        console.log('request failed', error)
      })
}

export function editProperty(id, propertyData, questionsPage, callback) {
  console.log('editing property details')
  console.log(propertyData)
  return dispatch =>
    Api.editProperty(id, propertyData, questionsPage)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          console.log('Property successfully updated')
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

export function loadProperty(id) {
  return dispatch =>
    Api.loadProperty(id)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          console.log('Property successfully loaded')
          return response.json()
        } else {
          const error = new Error(response.statusText)
          error.response = response
          console.log(response)
          throw error
        }
      })
      .then(json => {
        console.log(json)
        //FIXME whenever you want to retrieve a new field from the db, edit this
        const propertyData = {
          appealType: json.appeal_type,
          yearPurchased: json.year_purchased,
          pricePurchased: json.price_purchased,
          typeOfResidence: json.type_of_residence,
          exterior: json.exterior,
          centralAC: json.central_ac,
          numFullBaths: json.num_full_baths,
          numHalfBaths: json.num_half_baths,
          numFireplaces: json.num_fireplaces,
          buildingSqFeet: json.building_sqfeet,
          landSqFeet: json.land_sqfeet,
          numCommercialUnits: json.num_commercial_units,
          use: json.use,
          yearBuilt: json.year_built,
          foundationType: json.foundation_type,
          basementFinish: json.basement_finish,
          atticSize: json.attic_size,
          atticFinish: json.attic_finish,
          garageType: json.garage_type,
          garageSize: json.garage_size,
          numBeds: json.num_beds,
          numUnits: json.num_units,
          value: json.value,
          ownershipStatus: json.ownership_status,
          sameAddress: json.same_address,
          reason: json.reason,
          progress: json.progress,
          paid: json.paid === 'True',
          appealStatus: json.appeal_status,
          address: {
            streetAddress: json.street_address,
            city: json.city,
            state: json.state,
            zipcode: json.zipcode
          }
        }
        dispatch(propertyLoaded(propertyData))
        dispatch(loadComps(id))
      })
      .catch(error => {
        console.log('request failed', error)
      })
}

export function loadComps(propertyId) {
  return dispatch =>
    Api.loadComps(propertyId)
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
        console.log('loading comps')
        console.log(json)
        const comps = json.result.comps.map(comp =>
          Object({
            compPin: comp.comp_pin,
            marketValue: comp.value,
            streetAddress: comp.street_address,
            city: comp.city,
            state: comp.state,
            zipcode: comp.zipcode,
            buildingSqFeet: comp.building_sqfeet,
            landSqFeet: comp.land_sqfeet,
            numFullBaths: comp.num_full_baths,
            numHalfBaths: comp.num_half_baths,
            garageSize: comp.garage_size,
            typeOfResidence: comp.type_of_residence,
            basementFinish: comp.basement_finish,
            yearBuilt: comp.year_built,
            use: comp.use,
            pricePurchased: comp.price_purchased,
            yearPurchased: comp.year_purchased,
            compScore: comp.comp_score,
            distance: comp.distance,
            pin: comp.pin
          })
        )
        console.log(json.result)
        dispatch(likelihoodLoaded(json.result.likelihood))
        dispatch(compsLoaded(comps))
      })
      .catch(error => {
        console.log('request failed', error)
      })
}

export function calculateCost(propertyId) {
  return dispatch =>
    Api.calculateCost(propertyId)
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
        console.log(json.result)
        dispatch(costCalculated(json.result.cost))
      })
      .catch(error => {
        console.log('request failed', error)
      })
}

export function deleteProperty(propertyId, userId) {
  return dispatch =>
    Api.deleteProperty(propertyId)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          dispatch(propertyDeleted())
          dispatch(loadUserProperties(userId))
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
