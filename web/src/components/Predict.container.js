import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getTicker, postTicker, getTickerFuture } from './../actions'
import Predict from './Predict.component'

function mapStateToProps(state) {
  return {
    ...state.tickerObject
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getTicker,
      postTicker,
      getTickerFuture
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Predict)
