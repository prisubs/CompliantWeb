import * as actionTypes from './actionTypes'

function progressToggled() {
  return {
    type: actionTypes.PROGRESS_TOGGLED
  }
}

export function toggleProgress() {
  return dispatch => dispatch(progressToggled())
}
