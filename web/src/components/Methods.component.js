import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from './../'
import { SecondaryNavbar } from './'
import Calendar from 'react-calendar'
import { FieldGroup } from './'
// import StripeCheckout from 'react-stripe-checkout'
// import { CardElement } from 'react-stripe-elements'
// import { StripeProvider } from 'react-stripe-elements'
import './../styles/methods.css'

export default class Methods extends Component {
  state = {
    date: new Date(),
    ticker: ''
  }

  onChangeDate = date => this.setState({ date: this.state.date })

  onChangeTicker = inputTicker => {
    this.setState({
      ticker: inputTicker.target.value
    })
  }

  onSubmit = event => {
    event.preventDefault()
    const { ticker, date } = this.state
  }

  render() {
    return (
      <div>
        <div>
          <title>Our Methods</title>
        </div>
        <div className="hiw-tab">
          <h1>Our Methods</h1>
          <h4>
            We use logistic regression and indico.io to calculate whether a
            stock will go up or down (BUY/SELL rating)
          </h4>
        </div>

        <div className="tab-tw">
          Our pipeline consists of python, pandas, pickle, sk-learn, indico.io,
          tiingo, and Flask on the backend, and then JavaScript, React, HTML,
          Heroku, CSS, Redux, and plotly on the front end.
          <br /> <br />
          We start off with a dataset constructed from a myriad of different
          tickers (24 weeks on 10 different tickers)
          <br /> <br />
          It generalizes very well to any ticker. We use consumer tech tickers
          to train our model because they respond quite well to changes in
          sentiment.
          <br /> <br />
          <span className="oddsratio-div">
            For the purposes of logistic regression, the variable b<sub>1</sub>{' '}
            defines how vertical the sigmoid curve is going to be, and the
            variable b<sub>0</sub> defines how close to the origin the sigmoid
            curve is going to be. Therefore, the odds ratio for this logistic
            function is:
            <img className="oddsratio" src="images/oddsratio.png" />
          </span>
          The regression in terms of matrices is the following:
          <img className="log-equation" src="images/LogReg_mle.png" />
          <img src="images/TameGloomyKakarikis-size_restricted.gif" />
          <h6 className="btw-footer">
            &#169; 2019 Deutsche Bank AG
            <br /> By accessing and using this page you agree to the{' '}
            <Link to={ROUTES.INDEX}>Terms and Conditions</Link>.
            <br /> Corporate Headquarters: Taunusanlage 12 60325 FRANKFURT AM
            MAIN (for letters and postcards: 60262)
          </h6>
        </div>
      </div>
    )
  }
}
