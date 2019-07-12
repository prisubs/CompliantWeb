// @flow
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './../styles/styles.css'
import { FieldGroup } from './'
import { ROUTES } from './../'

function createMarkup() {
  return {
    __html:
      '<script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js" async>{ "colorTheme": "dark", "showChart": true, "locale": "en", "largeChartUrl": "", "isTransparent": false, "width": "400", "height": "730", "plotLineColorGrowing": "rgba(103, 78, 167, 1)", "plotLineColorFalling": "rgba(103, 78, 167, 1)", "gridLineColor": "rgba(242, 242, 242, 0.61)", "scaleFontColor": "rgba(238, 238, 238, 1)", "belowLineFillColorGrowing": "rgba(142, 124, 195, 0.26)", "belowLineFillColorFalling": "rgba(180, 167, 214, 0.23)", "symbolActiveColor": "rgba(142, 124, 195, 0.59)", "tabs": [ { "title": "Indices", "symbols": [ { "s": "NASDAQ:AAPL" }, { "s": "NASDAQ:AMZN" }, { "s": "NYSE:BABA" }, { "s": "NYSE:CRM" }, { "s": "NASDAQ:FB" }, { "s": "NASDAQ:GOOGL" }, { "s": "NASDAQ:MSFT" }, { "s": "NASDAQ:NFLX" }, { "s": "NASDAQ:TSLA" }, { "s": "NYSE:WMT" } ], "originalTitle": "Indices" }, { "title": "Commodities", "symbols": [ { "s": "CME_MINI:ES1!", "d": "E-Mini S&P" }, { "s": "CME:E61!", "d": "Euro" }, { "s": "COMEX:GC1!", "d": "Gold" }, { "s": "NYMEX:CL1!", "d": "Crude Oil" }, { "s": "NYMEX:NG1!", "d": "Natural Gas" }, { "s": "CBOT:ZC1!", "d": "Corn" } ], "originalTitle": "Commodities" }, { "title": "Bonds", "symbols": [ { "s": "CME:GE1!", "d": "Eurodollar" }, { "s": "CBOT:ZB1!", "d": "T-Bond" }, { "s": "CBOT:UD1!", "d": "Ultra T-Bond" }, { "s": "EUREX:GG1!", "d": "Euro Bund" }, { "s": "EUREX:II1!", "d": "Euro BTP" }, { "s": "EUREX:HR1!", "d": "Euro BOBL" } ], "originalTitle": "Bonds" }, { "title": "Forex", "symbols": [ { "s": "FX:EURUSD" }, { "s": "FX:GBPUSD" }, { "s": "FX:USDJPY" }, { "s": "FX:USDCHF" }, { "s": "FX:AUDUSD" }, { "s": "FX:USDCAD" } ], "originalTitle": "Forex" } ] } </script> '
  }
}

class App extends Component<void> {
  state = {
    email: '',
    password: '',
    wrongPassword: false
  }

  onChangeEmail = inputEmail => {
    this.setState({
      email: inputEmail.target.value
    })
  }

  componentDidMount() {
    if (
      this.props.location.pathname == ROUTES.INDEX &&
      this.state.wrongPassword == false
    ) {
      const script = document.createElement('script')

      script.src =
        'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js'
      script.async = true
      script.innerHTML =
        ' { "colorTheme": "dark", "showChart": true, "locale": "en", "largeChartUrl": "", "isTransparent": false, "width": "400", "height": "730", "plotLineColorGrowing": "rgba(103, 78, 167, 1)", "plotLineColorFalling": "rgba(103, 78, 167, 1)", "gridLineColor": "rgba(242, 242, 242, 0.61)", "scaleFontColor": "rgba(238, 238, 238, 1)", "belowLineFillColorGrowing": "rgba(142, 124, 195, 0.26)", "belowLineFillColorFalling": "rgba(180, 167, 214, 0.23)", "symbolActiveColor": "rgba(142, 124, 195, 0.59)", "tabs": [ { "title": "Indices", "symbols": [ { "s": "NASDAQ:AAPL" }, { "s": "NASDAQ:AMZN" }, { "s": "NYSE:BABA" }, { "s": "NYSE:CRM" }, { "s": "NASDAQ:FB" }, { "s": "NASDAQ:GOOGL" }, { "s": "NASDAQ:MSFT" }, { "s": "NASDAQ:NFLX" }, { "s": "NASDAQ:TSLA" }, { "s": "NYSE:WMT" } ], "originalTitle": "Indices" }, { "title": "Commodities", "symbols": [ { "s": "CME_MINI:ES1!", "d": "E-Mini S&P" }, { "s": "CME:E61!", "d": "Euro" }, { "s": "COMEX:GC1!", "d": "Gold" }, { "s": "NYMEX:CL1!", "d": "Crude Oil" }, { "s": "NYMEX:NG1!", "d": "Natural Gas" }, { "s": "CBOT:ZC1!", "d": "Corn" } ], "originalTitle": "Commodities" }, { "title": "Bonds", "symbols": [ { "s": "CME:GE1!", "d": "Eurodollar" }, { "s": "CBOT:ZB1!", "d": "T-Bond" }, { "s": "CBOT:UD1!", "d": "Ultra T-Bond" }, { "s": "EUREX:GG1!", "d": "Euro Bund" }, { "s": "EUREX:II1!", "d": "Euro BTP" }, { "s": "EUREX:HR1!", "d": "Euro BOBL" } ], "originalTitle": "Bonds" }, { "title": "Forex", "symbols": [ { "s": "FX:EURUSD" }, { "s": "FX:GBPUSD" }, { "s": "FX:USDJPY" }, { "s": "FX:USDCHF" }, { "s": "FX:AUDUSD" }, { "s": "FX:USDCAD" } ], "originalTitle": "Forex" } ] }\r\n'
      //script.setAttribute("colorTheme", "dark");
      //script.setAttribute('src', 'http://mysite/my.js');
      this.setState({
        wrongPassword: true
      })
      if (this.props.location.pathname == ROUTES.INDEX)
        document.body.appendChild(script)
    }
  }
  /*
 componentWillUnmount() {
    this.setState({
        wrongPassword: true
    })
 }
*/
  onChangePassword = inputPassword => {
    this.setState({
      password: inputPassword.target.value
    })
  }

  onSubmit = event => {
    event.preventDefault()
    const { email, password } = this.state
    const user = { username: email, password: password }
    this.props.loadUser(user, this.handleRedirect, this.handleFailure)
  }

  handleRedirect = () => {
    this.props.history.push(ROUTES.WELCOMEBACK)
  }

  handleFailure = () => {
    this.setState({
      wrongPassword: true
    })
  }

  render() {
    return (
      <div>
        <head>
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
            crossorigin="anonymous"
          />
          <link rel="stylesheet" />
          <title>Sentimental Stocks</title>
        </head>

        <body>
          <script
            src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
            integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
            crossorigin="anonymous"
          />
          <script
            src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
            integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
            crossorigin="anonymous"
          />
          <script
            src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
            integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
            crossorigin="anonymous"
          />
          <img class="img-responsive" src="images/home.jpg" alt="Graphic" />
          <h1>Take sentiment now to predict stocks then.</h1>

          <div class="tradingview-widget-container">
            <div class="tradingview-widget-container__widget" />
            <div class="tradingview-widget-copyright">
              <a
                href="https://www.tradingview.com"
                rel="noopener"
                target="_blank"
              >
                <span class="blue-text">Market Data</span>
              </a>{' '}
              by TradingView
            </div>

            {
              //<div dangerouslySetInnerHTML={createMarkup()}></div>
            }
          </div>
        </body>
      </div>
    )
  }
}

export default App
