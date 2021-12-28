import React from 'react';
import { Link } from 'react-router-dom';
import './index.css'
import { Navbar, Nav } from 'react-bootstrap';
import {
  LogoIcon
} from '../../../../src/assets/images';

class SideBar extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Navbar className="sidebar sidebar-offcanvas" id="minimize">
          <Navbar.Brand href="#home" className="navbar-brand-wrapper">
            <div className="navbar-brand brand-logo">Accurate Screens <span>SCREENING FOR A SAFER WORKPLACE </span></div>
            <div className="navbar-brand brand-logo-mini"><img src={LogoIcon} alt="logo" /></div>
          </Navbar.Brand>

          <Nav>
            <ul className="nav">
              <li className="nav-item">
                <Link to="/admin" className="nav-link">
                  <i className="mdi mdi-account-supervisor menu-icon" />
                  <span className="menu-title">Clients</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/invoices-list" className="nav-link">
                  <i className="mdi mdi-file-document menu-icon" />
                  <span className="menu-title">Invoices</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/subscriptions" className="nav-link">
                  <i className="mdi mdi-file-document-outline menu-icon" />
                  <span className="menu-title">Subscriptions</span>
                </Link>
              </li>
            </ul>
          </Nav>
        </Navbar>
      </React.Fragment>
    );
  }
}

export default SideBar;

