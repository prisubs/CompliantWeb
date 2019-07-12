import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { logout } from './../actions'
import Navbar from './Navbar.component'

function mapStateToProps(state, ownProps) {
  return {
    isLoggedIn: state.login.isLoggedIn,
    progress: state.property.progress
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      logout
    },
    dispatch
  )
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Navbar)
)
