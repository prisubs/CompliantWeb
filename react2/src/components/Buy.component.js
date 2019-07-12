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
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      stripeLoading: true
    }
    // onStripeUpdate must be bound or else clicking on button will produce error.
    this.onStripeUpdate = this.onStripeUpdate.bind(this)
    // binding loadStripe as a best practice, not doing so does not seem to cause error.
    this.loadStripe = this.loadStripe.bind(this)
  }

  state = {
    paymentpaid: false
  }

  loadStripe(onload) {
    if (!window.StripeCheckout) {
      const script = document.createElement('script')
      script.onload = function() {
        console.info('Stripe script loaded')
        onload()
      }
      script.src = 'https://checkout.stripe.com/checkout.js'
      document.head.appendChild(script)
    } else {
      onload()
    }
  }

  componentDidMount() {
    this.loadStripe(() => {
      this.stripeHandler = window.StripeCheckout.configure({
        key: 'pk_test_VSlnWkVGekcSAegrW8AG4nGj',
        image: 'images/marketplace.png',
        locale: 'auto',
        token: token => {
          this.setState({ loading: true })
          console.log(token.id)
          fetch('http://127.0.0.1:5000/charge-customer', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*' //TODO change this for production
            },
            body: JSON.stringify(token)
          }).then(response => {
            response.json().then(data => {
              this.setState({
                paymentpaid: true,
                loading: false
              })
              alert('Success! Click next to review and submit your appeal.')
              // this.props.updatePropertyFormInput('progress', 60)
              if (this.props.propertyId)
                this.props.editProperty(
                  this.props.propertyId,
                  { ...this.props },
                  3
                )
            })
          })
        }
      })

      this.setState({
        stripeLoading: false,
        // loading needs to be explicitly set false so component will render in 'loaded' state.
        loading: false
      })
    })
  }

  componentWillUnmount() {
    if (this.stripeHandler) {
      this.stripeHandler.close()
    }
  }

  onSubmit = event => {
    this.props.history.push(ROUTES.INDEX)
  }

  onStripeUpdate(e) {
    this.stripeHandler.open({
      name: 'BananaTax',
      description: 'Pay',
      panelLabel: 'Pay',
      allowRememberMe: false
    })
    e.preventDefault()
  }

  //   componentWillMount() {
  //     if (!this.props.isLoggedIn) {
  //       this.props.history.push(ROUTES.LOGIN)
  //       return
  //     }
  //   }
  state = {
    date: new Date()
  }

  onChange = date => this.setState({ date })

  render() {
    return (
      <div className="center-review-div">
        <div>
          <Calendar
            className="calendar"
            onChange={this.onChange}
            value={this.state.date}
            maxDate={new Date(2019, 6, 11)}
            minDate={new Date(2019, 0, 11)}
          />

          <form>
            <div className="smalltext-signup">
              <h4> Name of Ticker </h4>
            </div>
            <FieldGroup
              id="formControlsTicker"
              label="Ticker"
              placeholder="AAPL"
              className="input-field-login"
            />
              <span>
                    By using our product you agree to our terms and services
              </span>
            </div>
            <button
              className="submit-button signup-submit-button"
              type="submit"
              onClick={this.onSubmit}
            >
            </button>
          </form>
        </div>
      </div>
    )
  }
}
