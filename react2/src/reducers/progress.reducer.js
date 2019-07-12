import initialState from './initialState'
import { PROGRESS_TOGGLED } from '../actions/actionTypes'

export default function progress(state = initialState.progress, action) {
  switch (action.type) {
    case PROGRESS_TOGGLED:
      return {
        ...state,
        showProgress: !state.showProgress
      }
    default:
      return state
  }
}
