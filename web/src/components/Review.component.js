import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from './../'
import { SecondaryNavbar } from './'
import Calendar from 'react-calendar'
import { FieldGroup } from './'
import { VictoryPie } from 'victory'
import Thermometer from 'react-thermometer-component'
import { Input, AutoComplete } from 'antd'
import { Helmet } from 'react-helmet'
import { Doughnut } from 'react-chartjs-2'
/*
import {
  Page,
  Avatar,
  Grid,
  Card,
  Text,
  Table,
  Alert,
  Progress,
  colors,
  Dropdown,
  Button,
  StampCard,
  StatsCard,
  ProgressCard,
  Badge,
  AccountDropdown
} from 'tabler-react'
*/
import { Button } from 'tabler-react'
import { Statistic, Card, Row, Col, Icon, Menu, Layout, Breadcrumb } from 'antd'
import * as d3 from 'd3'
import 'tabler-react/dist/Tabler.css'
import C3Chart from 'react-c3js'
import './../styles/predict.css'
import 'antd/dist/antd.css'
// import StripeCheckout from 'react-stripe-checkout'
// import { CardElement } from 'react-stripe-elements'
// import { StripeProvider } from 'react-stripe-elements'
import './../styles/review.css'
import TradingViewWidget, {
  Themes,
  IntervalTypes,
  BarStyles
} from 'react-tradingview-widget'
const TITLE = 'Review Ticker'
const { Option, OptGroup } = AutoComplete
const { SubMenu } = Menu
const { Header, Content, Footer, Sider } = Layout
const dataSource = [
  'AMD',
  'QQQ',
  'INTC',
  'FB',
  'TXN',
  'MSFT',
  'AAPL',
  'V',
  'TSLA'
]
const data = {
  labels: ['Red', 'Green', 'Yellow'],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
    }
  ]
}

export default class Review extends Component {
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
    collapsed: false
  }

  onChangeDate = inputDate => this.setState({ date: inputDate })
  /*
  onChangeTicker = inputTicker => {
    this.setState({
      ticker: inputTicker.target.value
    })
  } */
  onCollapse = collapsed => {
    console.log(collapsed)
    this.setState({ collapsed })
  }

  onChange = e => {
    this.setState({ ticker: e })
  }

  onSubmit = event => {
    event.preventDefault()
    this.setState({
      submitted: true
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
      collapsed
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
          rating: all_json['rating']
        })

        this.setState({
          arrayvar: [...this.state.arrayvar, ...all_json['good_headlines']]
        })

        this.setState({
          companyMeta: [...this.state.companyMeta, ...all_json['company_meta']]
        })

        this.setState({
          badheadlines: [
            ...this.state.badheadlines,
            ...all_json['bad_headlines']
          ]
        })

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

  handleClick = e => {
    console.log('click ', e)
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
    if (ratinglocal === 'NULL') {
      form = (
        <div className="center-review-div-one">
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
            <h3 className="n-o-t">
              By using our product you agree to our terms and services
            </h3>
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
        </div>
      )
    } else {
      /*
      form = (
        <div class="div-sq-master">
          <div class="divSquare">
            <div className="align-sq-pie">
              {this.createUShould()}
              <div>{pie}</div>
            </div>
          </div>

          <div class="divSquare">{this.createCountGoodBad()}</div>

          <div className="simple-clear"></div>

          <div class="divSquare">
            <div className="align-sq">
              <table class="table table-striped table-bordered personaltable">
                {this.createTable()}
              </table>
            </div>
          </div>

          <div class="divSquare">
            <div className="align-sq">
              <Thermometer
                theme="light"
                value={
                  100 *
                  (this.state.goodcount /
                    (this.state.goodcount + this.state.badcount))
                }
                max="100"
                format="°"
                size="large"
                height="450"
                className="thermo"
              />
            </div>
          </div>
        </div>
      ) */
      form = (
        <Layout style={{ minHeight: '100vh' }}>
          <Sider
            className="lets-try-to-edit-antd"
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1">
                <Icon type="pie-chart" />
                <span>Option 1</span>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="desktop" />
                <span>Option 2</span>
              </Menu.Item>
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <Icon type="user" />
                    <span>User</span>
                  </span>
                }
              >
                <Menu.Item key="3">Tom</Menu.Item>
                <Menu.Item key="4">Bill</Menu.Item>
                <Menu.Item key="5">Alex</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                title={
                  <span>
                    <Icon type="team" />
                    <span>Team</span>
                  </span>
                }
              >
                <Menu.Item key="6">Team 1</Menu.Item>
                <Menu.Item key="8">Team 2</Menu.Item>
              </SubMenu>
              <Menu.Item key="9">
                <Icon type="file" />
                <span>File</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }} />
            <Content style={{ margin: '0 16px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Ticker</Breadcrumb.Item>
                <Breadcrumb.Item>AAPL</Breadcrumb.Item>
              </Breadcrumb>
              <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                {' '}
                <Row gutter={16}>
                  <Col span={12}>
                    <Statistic title="Active Users" value={112893} />
                  </Col>
                  <Col span={12}>
                    <Statistic
                      title="Account Balance (CNY)"
                      value={112893}
                      precision={2}
                    />
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Statistic
                      title="Feedback"
                      value={1128}
                      prefix={<Icon type="like" />}
                    />
                  </Col>
                  <Col span={12}>
                    <Statistic title="Unmerged" value={93} suffix="/ 100" />
                  </Col>
                </Row>
                <div style={{ background: '#ECECEC', padding: '30px' }}>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Card>
                        <Statistic
                          title="Active"
                          value={11.28}
                          precision={2}
                          valueStyle={{ color: '#3f8600' }}
                          prefix={<Icon type="arrow-up" />}
                          suffix="%"
                        />
                      </Card>
                    </Col>
                    <Col span={12}>
                      <Card>
                        <Statistic
                          title="Idle"
                          value={9.3}
                          precision={2}
                          valueStyle={{ color: '#cf1322' }}
                          prefix={<Icon type="arrow-down" />}
                          suffix="%"
                        />
                      </Card>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={12}>
                      <Card>
                        <div className="donut">
                          <Doughnut data={data} />
                        </div>
                      </Card>
                    </Col>
                    <Col span={12}>
                      <Card>
                        <Statistic
                          title="Idle"
                          value={9.3}
                          precision={2}
                          valueStyle={{ color: '#cf1322' }}
                          prefix={<Icon type="arrow-down" />}
                          suffix="%"
                        />
                      </Card>
                    </Col>
                  </Row>
                </div>
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Deutsche Bank ©2019 Created by Richard Scherrer
            </Footer>
          </Layout>
        </Layout>
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
