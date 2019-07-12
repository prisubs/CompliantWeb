import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { loadUser } from './../actions'
import App from './App.component'

function mapStateToProps(state) {
  return {
    ...state.login
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      loadUser
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
