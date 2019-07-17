import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from './../'
import { SecondaryNavbar } from './'
import Calendar from 'react-calendar'
import { FieldGroup } from './'
// import StripeCheckout from 'react-stripe-checkout'
// import { CardElement } from 'react-stripe-elements'
// import { StripeProvider } from 'react-stripe-elements'
import './../styles/review.css'

export default class Buy extends Component {

  state = {
    date: new Date(),
    ticker: ''
  }

   onChangeDate = inputDate => this.setState({ date: inputDate })

  onChangeTicker = inputTicker => {
    this.setState({
      ticker: inputTicker.target.value
    })
  }


  onSubmit = event => {
    event.preventDefault()
    const { date, ticker } = this.state
    const tickerObject = { date: date, ticker: ticker }
    this.props.getTicker(tickerObject, this.handleRedirect, this.handleFailure)
  }

  handleRedirect = () => {
    this.props.history.push(ROUTES.INDEX)
  }

  handleFailure = () => {
    this.props.history.push(ROUTES.INDEX)
  }


  render() {
    return (
      <div className="center-review-div">
        <div>
          <Calendar
            className="calendar"
            onChange={this.onChangeDate}
            value={this.state.date}
            maxDate={new Date(2019, 6, 11)}
            minDate={new Date(2019, 0, 11)}
          />
          <form className = "input-field-form">
            <div className="smalltext-signup">
              <h4 className="n-o-ta"> Name of Ticker </h4>
            </div>
            <FieldGroup
              id="formControlsTicker"
              size="5"
              maxlength="5"
              label="Ticker"
              placeholder="XXXX"
              className="input-field-login"
              onChange={this.onChangeTicker}
            />
              <h3 className="n-o-t">
                    By using our product you agree to our terms and services
              </h3>
              <div className = "hr-div">
              <hr className = "style-eight"/>
              </div>
              <div className = "button-div">
            <button
              className="submit-button signup-submit-button"
              type="submit"
              onClick={this.onSubmit}
            >
            Submit
            </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
