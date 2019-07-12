import initialState from './initialState'
import {
  PROPERTY_CREATED,
  PROPERTY_FORM_INPUT_CHANGED,
  PROPERTY_LOADED,
  ADDRESS_CHANGED,
  PROGRESS_CHANGED,
  LOGGED_OUT,
  PROPERTYINFO_CLEARED,
  COST_CALCULATED,
  PROPERTY_DELETED
} from '../actions/actionTypes'

export default function property(state = initialState.property, action) {
  switch (action.type) {
    case PROPERTY_CREATED:
      return {
        ...state,
        id: action.payload
      }
    case PROPERTY_LOADED:
      return {
        ...state,
        appealType: action.payload.appealType,
        street: action.payload.street,
        city: action.payload.city,
        township: action.payload.township,
        use: action.payload.use,
        yearPurchased: action.payload.yearPurchased,
        pricePurchased: action.payload.pricePurchased,
        typeOfResidence: action.payload.typeOfResidence,
        numFullBaths: action.payload.numFullBaths,
        landSqFeet: action.payload.landSqFeet,
        numCommercialUnits: action.payload.numCommercialUnits,
        centralAC: action.payload.centralAC,
        reason: action.payload.reason,
        id: action.payload.id,
        ownershipStatus: action.payload.ownershipStatus,
        userId: action.payload.userId,
        buildingSqFeet: action.payload.buildingSqFeet,
        numFireplaces: action.payload.numFireplaces,
        numHalfBaths: action.payload.numHalfBaths,
        exterior: action.payload.exterior,
        pin: action.payload.pin,
        yearBuilt: action.payload.yearBuilt,
        foundationType: action.payload.foundationType,
        basementFinish: action.payload.basementFinish,
        atticSize: action.payload.atticSize,
        atticFinish: action.payload.atticFinish,
        garageType: action.payload.garageType,
        garageSize: action.payload.garageSize,
        numBeds: action.payload.numBeds,
        numUnits: action.payload.numUnits,
        value: action.payload.value,
        address: action.payload.address,
        progress: action.payload.progress,
        paid: action.payload.paid,
        appealStatus: action.payload.appealStatus
      }

    case PROPERTY_FORM_INPUT_CHANGED:
      return {
        ...state,
        [action.payload.field]: action.payload.value
      }
    case ADDRESS_CHANGED:
      return {
        ...state,
        address: {
          ...state.address,
          [action.payload.field]: action.payload.value
        }
      }
    case PROGRESS_CHANGED:
      return {
        ...state,
        progress:
          action.payload > state.progress ? action.payload : state.progress
      }
    case COST_CALCULATED:
      return {
        ...state,
        cost: action.payload
      }
    case PROPERTY_DELETED:
    case PROPERTYINFO_CLEARED:
    case LOGGED_OUT:
      return initialState.property
    default:
      return state
  }
}
