import React from 'react';
import { Link } from 'react-router-dom';
import './index.css'
import { Container, Row, Col } from 'react-bootstrap';
import {Accurate_logo,} from '../../../src/assets/images';

class Login extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Container>
          <div className="loginpage outer-margin home-screen">
            <Row>
              <Col md={12}>
                <div className="login-logo text-center margin-bottom20">
                  <img src={Accurate_logo} alt="logo" />
                </div>
              </Col>
            </Row>
            <Row>
              <Col sm={2}></Col>
              <Col lg={4} md={4} sm={4}>
                <div className="home-cardbox">
                  <Link to="/admin" ><h3>Admin</h3></Link>
                </div>
              </Col>
              <Col lg={4} md={4} sm={4}>
                <div className="home-cardbox">
                  <Link to="/customer" ><h3>Customer</h3></Link>
                </div>
              </Col>
              <Col sm={2}></Col>
            </Row>
          </div>
        </Container>

      </React.Fragment>
    );
  }
}

export default Login;