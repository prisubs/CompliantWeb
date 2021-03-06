import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from './../'
import { SecondaryNavbar } from './'
//import Calendar from 'react-calendar'
//import { FieldGroup } from './'
import { VictoryPie } from 'victory'
import Thermometer from 'react-thermometer-component'
import { AutoComplete, Calendar } from 'antd'
import { Helmet } from 'react-helmet'
import { Doughnut } from 'react-chartjs-2'
import { Button } from 'tabler-react'
import {
  Statistic,
  Card,
  Row,
  Col,
  Icon,
  Menu,
  Layout,
  Breadcrumb,
  Input,
  Spin
} from 'antd'
import * as d3 from 'd3'
import 'tabler-react/dist/Tabler.css'
import C3Chart from 'react-c3js'
import './../styles/predict.css'
import 'antd/dist/antd.css'
import './../styles/review.css'
import TradingViewWidget, {
  Themes,
  IntervalTypes,
  BarStyles
} from 'react-tradingview-widget'
const TITLE = 'Predict Ticker'
const { Option, OptGroup } = AutoComplete
const { SubMenu } = Menu
const { Header, Content, Footer, Sider } = Layout
const dataSource = [
  'AAPL',
  'AMD',
  'F',
  'FB',
  'DB',
  'INTC',
  'MSFT',
  'TSLA',
  'TXN',
  'V'
]
const { Search } = Input
const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
export default class Predict extends Component {
  constructor() {
    super()
    this.onSubmit = this.onSubmit.bind(this)
    this.onSubmiteventless = this.onSubmiteventless.bind(this)
  }

  state = {
    date: new Date(),
    ticker: '',
    rating: 'NULL',
    arrayvar: [],
    badheadlines: [],
    goodcount: 0,
    badcount: 0,
    submitted: false,
    delta: 0.0,
    companyMeta: [],
    dataSource: [],
    collapsed: false,
    recentStock: 'AAPL',
    recenterStock: 'FB',
    fetchInProgress: false,
    name: '',
    industry: ''
  }

  onChangeDate = inputDate => this.setState({ date: inputDate })

  onCollapse = collapsed => {
    console.log(collapsed)
    this.setState({ collapsed })
  }

  onChange = e => {
    this.setState({ ticker: e })
  }

  popclick = popTicker => {
    this.setState({
      fetchInProgress: true
    })
    const {
      date,
      ticker,
      rating,
      arrayvar,
      badheadlines,
      goodcount,
      badcount,
      submitted,
      delta,
      companyMeta,
      dataSource,
      collapsed,
      recentStock,
      recenterStock,
      fetchInProgress,
      related
    } = this.state
    const tickerObject = { date: date, ticker: popTicker }
    let all_json
    var x = this.props
      .getTicker(tickerObject, this.handleRedirect, this.handleFailure)
      .then(responseJSON => {
        // do stuff with responseJSON here...
        all_json = responseJSON
        this.setState({
          recentStock: recenterStock
        })

        this.setState({
          recenterStock: tickerObject.ticker
        })

        this.setState({
          rating: all_json['rating']
        })

        this.setState({
          arrayvar: [...this.state.arrayvar, ...all_json['good_headlines']]
        })

        this.setState(
          {
            companyMeta: []
          },
          function() {
            // called by React after the state is updated
            this.setState({
              companyMeta: [
                ...this.state.companyMeta,
                ...all_json['company_meta']
              ]
            })
          }
        )

        this.setState(
          {
            badheadlines: []
          },
          function() {
            // called by React after the state is updated
            this.setState({
              badheadlines: [
                ...this.state.badheadlines,
                ...all_json['bad_list']
              ]
            })
          }
        )

        this.setState({
          goodcount: all_json['good_count']
        })

        this.setState({
          badcount: all_json['bad_count']
        })

        this.setState({
          delta: all_json['delta']
        })
      })

    sleep(500).then(() => {
      //do stuff

      this.setState({
        fetchInProgress: false
      })
    })

    sleep(500).then(() => {
      //do stuff

      this.setState({
        ticker: popTicker
      })
    })
  }

  applclick = () => {
    this.setState({
      fetchInProgress: true
    })
    const {
      date,
      ticker,
      rating,
      arrayvar,
      badheadlines,
      goodcount,
      badcount,
      submitted,
      delta,
      companyMeta,
      dataSource,
      collapsed,
      recentStock,
      recenterStock,
      fetchInProgress
    } = this.state
    const tickerObject = { date: date, ticker: 'AAPL' }
    let all_json
    var x = this.props
      .getTicker(tickerObject, this.handleRedirect, this.handleFailure)
      .then(responseJSON => {
        // do stuff with responseJSON here...
        all_json = responseJSON
        this.setState({
          recentStock: recenterStock
        })

        this.setState({
          recenterStock: tickerObject.ticker
        })

        this.setState({
          rating: all_json['rating']
        })

        this.setState({
          arrayvar: [...this.state.arrayvar, ...all_json['good_headlines']]
        })

        this.setState(
          {
            companyMeta: []
          },
          function() {
            // called by React after the state is updated
            this.setState({
              companyMeta: [
                ...this.state.companyMeta,
                ...all_json['company_meta']
              ]
            })
          }
        )

        this.setState(
          {
            badheadlines: []
          },
          function() {
            // called by React after the state is updated
            this.setState({
              badheadlines: [
                ...this.state.badheadlines,
                ...all_json['bad_headlines']
              ]
            })
          }
        )

        this.setState({
          goodcount: all_json['good_count']
        })

        this.setState({
          badcount: all_json['bad_count']
        })

        this.setState({
          delta: all_json['delta']
        })
      })

    sleep(700).then(() => {
      //do stuff

      this.setState({
        fetchInProgress: false
      })
    })

    sleep(700).then(() => {
      //do stuff

      this.setState({
        ticker: 'AAPL'
      })
    })
  }

  msftclick = () => {
    this.setState({
      ticker: 'MSFT'
    })
    this.popclick('MSFT')
  }

  fbclick = () => {
    this.setState({
      ticker: 'FB'
    })
    this.popclick('FB')
  }

  workclick = () => {
    this.setState({
      ticker: 'BABA'
    })
    this.popclick('BABA')
  }

  googlclick = () => {
    this.setState({
      ticker: 'GOOG'
    })
    this.popclick('GOOG')
  }

  twtrclick = () => {
    this.setState({
      ticker: 'TWTR'
    })
    this.popclick('TWTR')
  }

  onSubmit = event => {
    event.preventDefault()
    this.setState({
      submitted: true
    })
    this.setState({
      fetchInProgress: true
    })
    const {
      date,
      ticker,
      rating,
      arrayvar,
      badheadlines,
      goodcount,
      badcount,
      submitted,
      delta,
      companyMeta,
      dataSource,
      collapsed,
      recentStock,
      recenterStock,
      fetchInProgress,
      name,
      industry
    } = this.state
    const tickerObject = { date: date, ticker: ticker.toUpperCase() }
    let all_json
    var x = this.props
      .getTickerFuture(tickerObject, this.handleRedirect, this.handleFailure)
      .then(responseJSON => {
        // do stuff with responseJSON here...
        all_json = responseJSON

        this.setState(
          {
            badheadlines: []
          },
          function() {
            // called by React after the state is updated
            this.setState({
              badheadlines: [
                ...this.state.badheadlines,
                ...all_json['bad_list']
              ]
            })
          }
        )

        this.setState(
          {
            arrayvar: []
          },
          function() {
            // called by React after the state is updated
            this.setState({
              arrayvar: [...this.state.arrayvar, ...all_json['good_list']]
            })
          }
        )

        this.setState({
          rating: all_json['prediction_formatted']
        })

        this.setState({
          name: all_json['name']
        })

        this.setState({
          industry: all_json['industry']
        })

        this.setState({
          fetchInProgress: false
        })
      })
  }

  onSubmiteventless = () => {
    this.setState({
      submitted: true
    })
    this.setState({
      fetchInProgress: true
    })
    console.log('SUBMIT TAKING TOO LONG')
    const {
      date,
      ticker,
      rating,
      arrayvar,
      badheadlines,
      goodcount,
      badcount,
      submitted,
      delta,
      companyMeta,
      dataSource,
      collapsed,
      recentStock,
      recenterStock
    } = this.state
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
          recentStock: recenterStock
        })

        this.setState({
          recenterStock: tickerObject.ticker
        })

        this.setState({
          rating: all_json['rating']
        })

        this.setState({
          arrayvar: [...this.state.arrayvar, ...all_json['good_headlines']]
        })

        this.setState(
          {
            companyMeta: []
          },
          function() {
            // called by React after the state is updated
            this.setState({
              companyMeta: [
                ...this.state.companyMeta,
                ...all_json['company_meta']
              ]
            })
          }
        )

        this.setState(
          {
            badheadlines: []
          },
          function() {
            // called by React after the state is updated
            this.setState({
              badheadlines: [
                ...this.state.badheadlines,
                ...all_json['bad_headlines']
              ]
            })
          }
        )

        this.setState({
          goodcount: all_json['good_count']
        })

        this.setState({
          badcount: all_json['bad_count']
        })

        this.setState({
          delta: all_json['delta']
        })

        console.log(this.state.rating)
        console.log('Number of good headlines is')
        console.log(this.state.arrayvar.length)
        console.log('Number of bad headlines is')
        console.log(this.state.badheadlines.length)

        console.log('TESTING OUT THIS GOOGLE STOCKS API STUFF RIGHT NOWWWWW')
        this.setState({
          fetchInProgress: false
        })
      })

    console.log(x)
  }

  handleRedirect = () => {}

  handleFailure = () => {}

  onSearch = value => {
    this.setState({ ticker: value })
    this.setState({
      submitted: true
    })
    this.setState({
      fetchInProgress: true
    })
    const {
      date,
      ticker,
      rating,
      arrayvar,
      badheadlines,
      goodcount,
      badcount,
      submitted,
      delta,
      companyMeta,
      dataSource,
      collapsed,
      recentStock,
      recenterStock,
      fetchInProgress
    } = this.state
    const tickerObject = { date: date, ticker: value.toUpperCase() }
    let all_json
    var x = this.props
      .getTicker(tickerObject, this.handleRedirect, this.handleFailure)
      .then(responseJSON => {
        // do stuff with responseJSON here...
        all_json = responseJSON
        this.setState({
          recentStock: recenterStock
        })

        this.setState({
          recenterStock: tickerObject.ticker
        })

        this.setState({
          rating: all_json['rating']
        })

        this.setState(
          {
            arrayvar: []
          },
          function() {
            // called by React after the state is updated
            this.setState({
              arrayvar: [...this.state.arrayvar, ...all_json['good_headlines']]
            })
          }
        )

        this.setState(
          {
            companyMeta: []
          },
          function() {
            // called by React after the state is updated
            this.setState({
              companyMeta: [
                ...this.state.companyMeta,
                ...all_json['company_meta']
              ]
            })
          }
        )

        this.setState(
          {
            badheadlines: []
          },
          function() {
            // called by React after the state is updated
            this.setState({
              badheadlines: [
                ...this.state.badheadlines,
                ...all_json['bad_headlines']
              ]
            })
          }
        )

        this.setState({
          goodcount: all_json['good_count']
        })

        this.setState({
          badcount: all_json['bad_count']
        })

        this.setState({
          delta: all_json['delta']
        })

        sleep(500).then(() => {
          //do stuff

          this.setState({
            fetchInProgress: false
          })
        })
      })
  }

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
      i <
      Math.min(
        10,
        Math.max(this.state.arrayvar.length, this.state.badheadlines.length)
      );
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
          You should {this.state.rating.toLowerCase()}, most of the news is
          positive{' '}
        </span>
      )
    } else if (this.state.rating === 'SELL') {
      ushould = (
        <span className="you-should-probably-red">
          You should {this.state.rating.toLowerCase()}, most of the news is
          negative{' '}
        </span>
      )
    } else {
      ushould = (
        <span className="you-should-probably">
          {this.state.rating.toLowerCase()}{' '}
        </span>
      )
    }
    return ushould
  }

  createCountGoodBad = () => {
    let object_gb

    object_gb = (
      <span className="you-should-probably">
        There were {this.state.goodcount} good headlines and{' '}
        {this.state.badcount} bad headlines.
      </span>
    )
    return object_gb
  }

  render() {
    const goodcountlocal = this.state.goodcount
    let pie

    if (goodcountlocal != 0) {
      pie = (
        <VictoryPie
          style={{
            labels: { fill: 'black', fontSize: 20, fontWeight: 'bold' }
          }}
          colorScale={['green', 'tomato']}
          innerRadius={100}
          height={350}
          data={[
            { x: '+', y: this.state.goodcount },
            { x: '-', y: this.state.badcount }
          ]}
        />
      )
    } else {
      pie = <hr />
    }

    const thissubmittedaapl = this.state.fetchInProgress
    let donut
    if (!thissubmittedaapl) {
      donut = (
        <div className="donut">
          <Doughnut
            data={{
              labels: ['Bad Articles', 'Good Articles'],
              datasets: [
                {
                  data: [this.state.badcount, this.state.goodcount],
                  backgroundColor: ['#ff6347', ' #47ff63'],
                  hoverBackgroundColor: ['#e5593f', '#3fe559']
                }
              ]
            }}
          />
        </div>
      )
    } else {
      donut = (
        <div className="example">
          <Spin />
        </div>
      )
    }

    const thissubmittedmetadata = this.state.fetchInProgress
    let mt
    if (!thissubmittedmetadata) {
      mt = (
        <Card size="small" title="Information" className="cc" hoverable="true">
          <p>{'Company Name: '.concat(this.state.companyMeta[0])}</p>
          <p>{'Sector: '.concat(this.state.companyMeta[1])}</p>
          <p>{'Industry: '.concat(this.state.companyMeta[2])}</p>
        </Card>
      )
    } else {
      mt = (
        <div className="example">
          <Spin />
        </div>
      )
    }

    const tstvw = this.state.fetchInProgress
    let tvw
    if (!tstvw) {
      tvw = (
        <TradingViewWidget
          symbol={this.state.ticker}
          theme={Themes.LIGHT}
          interval={IntervalTypes.W}
          style={BarStyles.HOLLOW_CANDLES}
          width="550"
          height="300"
          news={['headlines']}
        />
      )
    } else {
      tvw = (
        <div className="example">
          <Spin />
        </div>
      )
    }

    const thissubmitted = this.state.submitted
    let button
    if (!thissubmitted) {
      button = (
        <Button
          color="teal"
          icon="check"
          size="lg"
          type="button"
          onClick={this.onSubmit}
        >
          Submit
        </Button>
      )
    } else {
      button = (
        <Button loading color="teal" size="lg">
          Submit
        </Button>
      )
    }

    let form
    const ratinglocal = this.state.rating
    const fetchInProgresss = this.state.fetchInProgress
    const dater = this.state.date
    if (ratinglocal === 'NULL') {
      form = (
        <div className="center-review-div-one">
          {/*     <Calendar
            className="calendar"
            onChange={this.onChangeDate}
            value={this.state.date}
            maxDate={new Date(2019, 8, 2)}
            minDate={new Date(2019, 2, 2)}
          /> */}
          <div className="predict-a-stock">
            {' '}
            <span className="ptspfd">
              {' '}
              Predict the Stock Price for {dater.toString()}{' '}
            </span>{' '}
          </div>
          <form className="input-field-form">
            <div className="smalltext-signup">
              <h4 className="n-o-ta"> Name of Ticker </h4>
            </div>

            <AutoComplete
              className="certain-category-search-wrapper"
              style={{ width: 150 }}
              dataSource={dataSource}
              onChange={this.onChange}
              placeholder="XXXX"
              filterOption={(inputValue, option) =>
                option.props.children
                  .toUpperCase()
                  .indexOf(inputValue.toUpperCase()) !== -1
              }
            />

            {/*
            <FieldGroup
              id="formControlsTicker"
              size="5"
              maxlength="5"
              label="Ticker"
              placeholder="XXXX"
              className="input-field-login"
              onChange={this.onChangeTicker}
            /> */}

            <div className="hr-div"></div>

            <div className="button-div">
              {/*
              <button loading
                className={this.submitted ? "submit-button signup-submit-button btn-loading btn btn-primary" : "submit-button signup-submit-button btn btn-primary"}
                 type="button"
                onClick={this.onSubmit}
              >
                Submit
              </button>
              */}
              {button}
            </div>
          </form>
          <h3 className="n-o-t">
            By using our product you agree to our terms and services
          </h3>
        </div>
      )
    } else {
      form = (
        <div className="scrunching-layout">
          <Layout style={{ minHeight: '100vh' }}>
            <Sider
              className="lets-try-to-edit-antd"
              collapsible
              collapsed={this.state.collapsed}
              onCollapse={this.onCollapse}
              style={{ background: '#fff' }}
              theme="light"
            >
              <div className="logo" />
              <Menu defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1">
                  <Search
                    placeholder="Input Ticker"
                    onSearch={this.onSearch}
                    style={{ width: 140 }}
                  />
                </Menu.Item>

                <Menu.Item key="2" onClick={this.info}>
                  <Icon type="eye" />
                  <span>News</span>
                </Menu.Item>

                {/*
                     <Modal
                    title={"News Headlines for ".concat(this.state.ticker)}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    >
              <table class="table table-striped table-bordered personaltable">
                {this.createTable()}
              </table>

                    </Modal> */}
                <SubMenu
                  key="sub1"
                  title={
                    <span>
                      <Icon type="fire" />
                      <span>Popular Stocks</span>
                    </span>
                  }
                >
                  <Menu.Item key="3">
                    {' '}
                    <Icon type="apple" />
                    <span>AAPL</span>
                  </Menu.Item>
                  <Menu.Item key="4">
                    {' '}
                    <Icon type="windows" />
                    <span>MSFT</span>
                  </Menu.Item>
                  <Menu.Item key="5">
                    {' '}
                    <Icon type="facebook" />
                    <span>FB</span>
                  </Menu.Item>
                  <Menu.Item key="6">
                    {' '}
                    <Icon type="alibaba" />
                    <span>BABA</span>
                  </Menu.Item>
                  <Menu.Item key="7">
                    {' '}
                    <Icon type="google" />
                    <span>GOOGL</span>
                  </Menu.Item>
                  <Menu.Item key="8">
                    {' '}
                    <Icon type="twitter" />
                    <span>TWTR</span>
                  </Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub2"
                  title={
                    <span>
                      <Icon type="team" />
                      <span>Recent Stocks</span>
                    </span>
                  }
                >
                  <Menu.Item key="9">asdf</Menu.Item>
                  <Menu.Item key="10">asdf</Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Layout>
              <Header style={{ background: '#fff', padding: 0 }} />
              <Content style={{ margin: '0 16px' }}>
                <Breadcrumb
                  style={{ margin: '16px 0px 0px 16px' }}
                  className="bc-style"
                >
                  <Breadcrumb.Item>
                    {' '}
                    <Icon type="stock" />
                    Ticker
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>{this.state.ticker}</Breadcrumb.Item>
                </Breadcrumb>
                <div
                  style={{ padding: 24, background: '#fff', minHeight: 360 }}
                >
                  {' '}
                  <Row gutter={16}>
                    <Col span={12}>
                      <Statistic
                        title="Company Name"
                        value={this.state.name}
                        hoverable="true"
                      />
                    </Col>
                    <Col span={12}>
                      {' '}
                      <Statistic
                        title="Industry"
                        value={this.state.industry}
                        hoverable="true"
                      />
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Statistic
                        title="Prediction"
                        value={this.state.rating}
                        hoverable="true"
                      />
                    </Col>
                    <Col span={12}>
                      {' '}
                      <Statistic
                        title="Number of Bad Articles"
                        value={this.state.badheadlines.length}
                        hoverable="true"
                      />
                    </Col>
                  </Row>
                  <div
                    className="gr2"
                    style={{ background: '#ECECEC', padding: '30px' }}
                  >
                    <Row gutter={16}>
                      <Col span={12}>
                        <Card hoverable="true">{tvw}</Card>
                      </Col>
                      <Col span={12}>
                        <div>
                          <table class="table table-bordered personaltable">
                            {this.createTable()}
                          </table>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Content>
              <Footer style={{ textAlign: 'center' }} className="footer">
                © 2019 Deutsche Bank AG By accessing and using this page you
                agree to the Terms and Conditions. Corporate Headquarters:
                Taunusanlage 12 60325 FRANKFURT AM MAIN (for letters and
                postcards: 60262) {this.state.related}
                <Icon flag name="de" className="german-flag" />
              </Footer>
            </Layout>
          </Layout>
        </div>
      )
    }
    return (
      <div>
        {' '}
        <Helmet>
          <title>{TITLE}</title>
        </Helmet>
        {form}
      </div>
    )
  }
}
