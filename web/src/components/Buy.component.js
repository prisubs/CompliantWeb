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
    ticker: '',
    rating: 'NULL',
    arrayvar: [],
    badheadlines: []
  }

  onChangeDate = inputDate => this.setState({ date: inputDate })

  onChangeTicker = inputTicker => {
    this.setState({
      ticker: inputTicker.target.value
    })
  }

  onSubmit = event => {
    event.preventDefault()
    const { date, ticker, rating, arrayvar, badheadlines } = this.state
    const tickerObject = { date: date, ticker: ticker }
    let all_json
    var x = this.props
      .getTicker(tickerObject, this.handleRedirect, this.handleFailure)
      .then(responseJSON => {
        // do stuff with responseJSON here...
        console.log(responseJSON)
        all_json = responseJSON
        console.log('this is gonna be all json')
        console.log(all_json)
        console.log('THIS IS THE END OF ALL JSON!!!')
        this.setState({
          rating: all_json['rating']
        })

        this.setState({
          arrayvar: [...this.state.arrayvar, ...all_json['good_headlines']]
        })

        this.setState({
          badheadlines: [
            ...this.state.badheadlines,
            ...all_json['bad_headlines']
          ]
        })

        console.log(this.state.rating)
        console.log('Number of good headlines is')
        console.log(this.state.arrayvar.length)
        console.log('Number of bad headlines is')
        console.log(this.state.badheadlines.length)
      })

    console.log(x)

    /*
      console.error("yaaaaaaaaaaaaaaaaaaaaaaaah boi1")
    event.preventDefault()
    const { date, ticker, rating} = this.state
    const tickerObject = { date: date, ticker: ticker }
    let json_rating = [];
    json_rating = this.props.getTicker(tickerObject, this.handleRedirect, this.handleFailure)
    setTimeout( function(){


            console.error("yaaaaaaaaaaaaaaaaaaaaaaaah boi2")
    console.error(json_rating)
    let json_rating_two;
    json_rating.then(result => json_rating_two)
    console.error("JSON RATING TWO")
    while(typeof json_rating_two == 'undefined') {
        console.error("waiting for a response")
    }
    console.error("final json value:")
    console.error(json_rating_two)
     this.setState({
      rating: json_rating_two['rating']
    })
    console.log("THIS IS THE RATING BOIII")
    console.log(this.state.rating)


     }.bind(this), 5000);
    */
    //this.props.postTicker()
  }

  handleRedirect = () => {}

  handleFailure = () => {}

  createTable = () => {
    let table = []
    table.push(
      <thead>
        {' '}
        <tr>
          <th scope="col">#</th>
          <th scope="col">Good Headlines</th>
          <th scope="col">Bad Headlines</th>
        </tr>
      </thead>
    )
    // Outer loop to create parent
    let table_subroutine = []
    for (
      let i = 0;
      i < Math.max(this.state.arrayvar.length, this.state.badheadlines.length);
      i++
    ) {
      let children = []
      //Inner loop to create children
      children.push(<th scope="row">{i}</th>)
      if (i < this.state.arrayvar.length) {
        children.push(<td>{this.state.arrayvar[i]}</td>)
      }

      if (i < this.state.badheadlines.length) {
        children.push(<td>{this.state.badheadlines[i]}</td>)
      }
      //Create the parent and add the children
      table_subroutine.push(<tr>{children}</tr>)
    }
    table.push(<tbody>{table_subroutine}</tbody>)
    return table
  }
  createUShould = () => {
    let ushould
    if (this.state.rating === 'BUY') {
      ushould = (
        <span className="you-should-probably-green">
          YOU SHOULD PROBABLY {this.state.rating}{' '}
        </span>
      )
    } else if (this.state.rating === 'SELL') {
      ushould = (
        <span className="you-should-probably-red">
          YOU SHOULD PROBABLY {this.state.rating}{' '}
        </span>
      )
    } else {
      ushould = (
        <span className="you-should-probably">
          YOU SHOULD PROBABLY {this.state.rating}{' '}
        </span>
      )
    }
    return ushould
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
          <form className="input-field-form">
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
            <div className="hr-div">
              <hr className="style-eight" />
            </div>
            <div className="button-div">
              <button
                className="submit-button signup-submit-button"
                type="submit"
                onClick={this.onSubmit}
              >
                Submit
              </button>
              <hr />
              <hr />
              {this.createUShould()}
            </div>
          </form>

          <table class="table table-striped">{this.createTable()}</table>
        </div>
      </div>
    )
  }
}
