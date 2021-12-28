import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import './index.css'
import { Navbar, Nav, Button } from 'react-bootstrap';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectTo:false
    }
  }

addClass(){
  if(document.body.classList.value === ''){
    document.body.classList.add('sidebar-icon-only');
  }  else if( document.body.classList.value === 'sidebar-icon-only'){
    document.body.classList.remove('sidebar-icon-only');
  }
}

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo} />;
    }
    return (
      <React.Fragment>
        <div className="topheader fixed-top">
          <Navbar>
            <div className="navbar-menu-wrapper">
              <Button className="navbar-toggler" type="button"  onClick={this.addClass} >
                <span className="mdi mdi-menu" />
              </Button>
              <Nav className="mr-auto navbar-nav navbar-nav-right">
                <li className="nav-item nav-profile dropdown">
                  <Link className="nav-link dropdown-toggle" id="profileDropdown" to="#" data-toggle="dropdown" aria-expanded="false">
                  <div className="nav-profile-text">
                      <i className="mdi mdi-account-circle" />
                      <p>Accurate <span>Superadmin</span></p>
                    </div>
                  </Link>

                  <div className="dropdown-menu navbar-dropdown" aria-labelledby="profileDropdown">
                    <Link className="dropdown-item" to="#" onClick={()=> {
                      sessionStorage.removeItem("authToken");
                      this.setState({redirectTo:"/login"});
                      }}><i className="mdi mdi-logout" /> Signout</Link>
                  </div>
                </li>
              </Nav>
            </div>
          </Navbar>
        </div>
      </React.Fragment>
    );
  }
}

export default Header;

