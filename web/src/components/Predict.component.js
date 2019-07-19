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
        <AccountDropdown
          avatarURL="./demo/faces/female/25.jpg"
          name="Jane Pearson"
          description="Administrator"
          options={[
            'profile',
            { icon: 'settings', value: 'Settings', to: '/settings' },
            'mail',
            'message',
            'divider',
            'help',
            'logout'
          ]}
        />
      </div>
    )
  }
}
