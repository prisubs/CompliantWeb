import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from './../'
import './../styles/navbar.css'
import { Flag, Icon } from 'tabler-react'

class Navbar extends PureComponent {
  render() {
    var navbar = (
      <div className="navbar">
        <Link to={ROUTES.INDEX}>
          <img
            className="imgnav"
            alt="logo in white"
            src="images/white-logo.png"
          />
        </Link>
        {
          // {!this.props.isLoggedIn && (
          //   <Link to={ROUTES.LOGIN} className="itemr">
          //     Sign In
          //   </Link>
          // )}
        }

        {this.props.isLoggedIn && (
          <div className="dropdown">
            <button className="dropbtn">
              <img
                src="images/account.svg"
                alt="account"
                className="user"
                id="1"
              />
            </button>
            <div className="dropdown-content">
              <Link to={ROUTES.INDEX}>Account Info</Link>
              <Link to={ROUTES.BUY}>Settings</Link>
              <Link to={ROUTES.INDEX} onClick={() => this.props.logout()}>
                {' '}
                Logout
              </Link>
            </div>
          </div>
        )}
      </div>
    )

    var loginNavbar = (
      <div className="login-navbar">
        <a href="http://localhost:3000/">
          <img
            src="images/white-logo.png"
            alt="priyanka install the frickin driver smh"
            className="login-imgnav"
          />
        </a>
        <div> "Sentimental Stocks" </div>
        <img src="images/white-logo.png" />
        <div className="lir-div">
          <Link to={ROUTES.INDEX} className="login-itemr sign-in-box">
            Sign In
          </Link>

          <Link
            to={ROUTES.INDEX}
            className={
              this.props.location.pathname === ROUTES.INDEX
                ? 'login-itemr login-itemr-selected'
                : 'login-itemr'
            }
          >
            Predict
          </Link>

          <Link
            to={ROUTES.REVIEW}
            className={
              this.props.location.pathname === ROUTES.INDEX
                ? 'login-itemr login-itemr-selected'
                : 'login-itemr'
            }
          >
            Review
          </Link>

          <Link
            to={ROUTES.INDEX}
            className={
              this.props.location.pathname === ROUTES.INDEX
                ? 'login-itemr login-itemr-selected'
                : 'login-itemr'
            }
          >
            Home
          </Link>

          <Link
            to={ROUTES.INDEX}
            className={
              this.props.location.pathname === ROUTES.INDEX
                ? 'login-itemr login-itemr-selected'
                : 'login-itemr'
            }
          >
            How it Works
          </Link>
        </div>
      </div>
    )

    var sidebar = (
      <ul className="side-bar-class">
        <li>
          <span className="lakeview">Cook County</span>
          <br />
          <span className="ACTIVE-FILING-PERIOD">ACTIVE FILING PERIOD</span>
        </li>
        <li className="days-left-li">
          <span className="days-left">12 Days Left</span>
          <br />
          <span className="to-submit-an-appeal">to submit an appeal</span>
        </li>
        <li
          className={
            this.props.location.pathname === ROUTES.INDEX
              ? 'sidebar-button-white'
              : 'sidebar-button'
          }
        >
          <Link
            to={ROUTES.INDEX}
            className={
              this.props.location.pathname === ROUTES.INDEX
                ? 'HOME-white'
                : 'HOME'
            }
          >
            HOME
          </Link>
        </li>
        <li
          className={
            this.props.location.pathname === ROUTES.INDEX
              ? 'sidebar-button-two-white'
              : 'sidebar-button-two'
          }
        >
          <Link
            to={ROUTES.INDEX}
            className={
              this.props.location.pathname === ROUTES.INDEX
                ? 'HOME-white'
                : 'HOME'
            }
          >
            GUARANTEE PORTAL
          </Link>
        </li>
        <li
          className={
            this.props.location.pathname === ROUTES.INDEX
              ? 'sidebar-button-two-white'
              : 'sidebar-button-two'
          }
        >
          <Link
            to={ROUTES.INDEX}
            className={
              this.props.location.pathname === ROUTES.INDEX
                ? 'HOME-white'
                : 'HOME'
            }
          >
            FAQ
          </Link>
        </li>
        <li
          className={
            this.props.location.pathname === ROUTES.INDEX
              ? 'sidebar-button-two-white'
              : 'sidebar-button-two'
          }
        >
          <Link
            to={ROUTES.INDEX}
            className={
              this.props.location.pathname === ROUTES.INDEX
                ? 'HOME-white'
                : 'HOME'
            }
          >
            CONTACT US
          </Link>
        </li>
      </ul>
    )

    {
      /*    <div>
        <nav class="navbar">
          <img
            className="logo-ssdb"
            src="images/white-logo.png"
            alt="logo"
          />
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon" />
          </button>
          <div class="collapse navbar-collapse" id="navbarNavDropdown">

            <ul class="navbar-nav">
              <li class="nav-item">
                <Link class="nav-link" to={ROUTES.INDEX}>
                  Home
                </Link>
              </li>
              <li class="nav-item active">
                <Link class="nav-link" to={ROUTES.BUY}>
                  Review <span class="sr-only">(current)</span>
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to={ROUTES.BUY}>
                  Predict <span class="sr-only">(current)</span>
                </Link>
              </li>
            </ul>

          </div>
        </nav>
      </div> */
    }

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
          <Link to={ROUTES.INDEX} className="sign-in-box">
            Sign In
          </Link>

          <Link to={ROUTES.INDEX} className="login-itemr">
            Home
          </Link>

          <Link to={ROUTES.REVIEW} className="login-itemr">
            Review
          </Link>

          <Link to={ROUTES.PREDICT} className="login-itemr">
            Predict
          </Link>

          <Link to={ROUTES.METHODS} className="login-itemr">
            Methods
          </Link>
          <Icon flag name="de" className="german-flag" />
          <Icon flag name="us" />
        </div>
      </div>
    )
  }
}

export default Navbar
