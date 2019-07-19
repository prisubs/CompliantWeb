// @flow

import * as React from 'react'
import { Component } from 'react'
import {
  Page,
  Avatar,
  Icon,
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
import 'tabler-react/dist/Tabler.css'
import C3Chart from 'react-c3js'
import './../styles/predict.css'
import SiteWrapper from './SiteWrapper.react'

export default class Predict extends Component {
  render() {
    return (
      <div className="account-div">
        <Grid.Row cards={true}>
          <Grid.Col width={6} sm={4} lg={2}>
            <StatsCard layout={1} movement={6} total="43" label="New Tickets" />
          </Grid.Col>
          <Grid.Col width={6} sm={4} lg={2}>
            <StatsCard
              layout={1}
              movement={-3}
              total="17"
              label="Closed Today"
            />
          </Grid.Col>
          <Grid.Col width={6} sm={4} lg={2}>
            <StatsCard layout={1} movement={9} total="7" label="New Replies" />
          </Grid.Col>
          <Grid.Col width={6} sm={4} lg={2}>
            <StatsCard
              layout={1}
              movement={3}
              total="27.3k"
              label="Followers"
            />
          </Grid.Col>
          <Grid.Col width={6} sm={4} lg={2}>
            <StatsCard
              layout={1}
              movement={-2}
              total="$95"
              label="Daily earnings"
            />
          </Grid.Col>
          <Grid.Col width={6} sm={4} lg={2}>
            <StatsCard layout={1} movement={-1} total="621" label="Products" />
          </Grid.Col>
        </Grid.Row>

        <Grid.Row cards={true} className="pies-and-big-numbers">
          <Grid.Col sm={6}>
            <Card>
              <Card.Header>
                <Card.Title>Article Ratio </Card.Title>
              </Card.Header>
              <Card.Body>
                <C3Chart
                  style={{ height: '12rem' }}
                  data={{
                    columns: [
                      // each columns data
                      ['data1', 63],
                      ['data2', 37]
                    ],
                    type: 'donut', // default type of chart
                    colors: {
                      data1: colors['green'],
                      data2: colors['red']
                    },
                    names: {
                      // name of each serie
                      data1: 'Positive Articles',
                      data2: 'Negative Articles'
                    }
                  }}
                  legend={{
                    show: false //hide legend
                  }}
                  padding={{
                    bottom: 0,
                    top: 0
                  }}
                />
              </Card.Body>
            </Card>
          </Grid.Col>
          <Grid.Col sm={6}>
            <Card>
              <Card.Header>
                <Card.Title>Sentiment Ratio</Card.Title>
              </Card.Header>
              <Card.Body>
                <C3Chart
                  style={{ height: '12rem' }}
                  data={{
                    columns: [
                      // each columns data
                      ['data1', 63],
                      ['data2', 44],
                      ['data3', 12],
                      ['data4', 14]
                    ],
                    type: 'pie', // default type of chart
                    colors: {
                      data1: colors['blue-darker'],
                      data2: colors['blue'],
                      data3: colors['blue-light'],
                      data4: colors['blue-lighter']
                    },
                    names: {
                      // name of each serie
                      data1: 'A',
                      data2: 'B',
                      data3: 'C',
                      data4: 'D'
                    }
                  }}
                  legend={{
                    show: false //hide legend
                  }}
                  padding={{
                    bottom: 0,
                    top: 0
                  }}
                />
              </Card.Body>
            </Card>
          </Grid.Col>

          <Grid.Col sm={6} className="big-numbers">
            <ProgressCard
              header="New feedback"
              content="62"
              progressColor="red"
              progressWidth={28}
            />
          </Grid.Col>
          <Grid.Col sm={6} className="big-numbers">
            <ProgressCard
              header="Today profit"
              content="$652"
              progressColor="green"
              progressWidth={84}
            />
          </Grid.Col>
        </Grid.Row>
      </div>
    )
  }
}
