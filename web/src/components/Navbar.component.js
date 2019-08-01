import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from './../'
import './../styles/navbar.css'
import { Flag, Icon } from 'tabler-react'

class Navbar extends PureComponent {
  render() {
    return (
      <div className="login-navbar">
        <Link to={ROUTES.INDEX}>
          <img
            src="images/sentstockdb.png"
            alt="install the frickin dependency"
            className="login-imgnav"
          />
        </Link>
        <div className="lir-div">
          <a
            target="_blank"
            href="https://documenter.getpostman.com/view/8309272/SVYnSgEo?version=latest&fbclid=IwAR3EAU-sL3GChFDZ_eLB6mvqDbMhrdyDaNIITBYDLIbA9K5zUP7qilpTOu4"
            className="sign-in-box"
          >
            API
          </a>

          <Link to={ROUTES.METHODS} className="login-itemr">
            Methods
          </Link>

          <Link to={ROUTES.REVIEW} className="login-itemr">
            Review
          </Link>

          <Link to={ROUTES.PREDICT} className="login-itemr">
            Predict
          </Link>
        </div>
      </div>
    )
  }
}

export default Navbar
