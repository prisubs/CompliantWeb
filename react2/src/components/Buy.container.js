import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getTicker } from './../actions'
import Buy from './Buy.component'

function mapStateToProps(state) {
  return {
    ...state.tickerObject
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getTicker
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Buy)
