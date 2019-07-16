import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from './../'
import './../styles/ourway.css'

class OurWay extends Component {
  render() {
    return (<div className="home-login-img">
            <div>
          <p>Example Logistic graph</p>
        </div>
        <img className = "img-log"
              src="images/sphx_glr_plot_logistic_001.png"
              alt="graph"/>
        </div>
    )
  }
}

export default OurWay;
