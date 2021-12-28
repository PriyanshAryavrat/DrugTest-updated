import React from 'react';
import { Link } from 'react-router-dom';
import './index.css'
import { Container, Row, Col } from 'react-bootstrap';
import {
  Accurate_logo,
} from '../../../../../assets/images';



class DnaOther extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Container>
          <div className="loginpage outer-margin home-screen1">
            <Row>
              <Col md={12}>
                <div className="login-logo text-center margin-bottom20">
                  <img src={Accurate_logo} alt="logo" />
                </div>
              </Col>
            </Row>
            <Row>
              <Col sm={1}></Col>
              <Col lg={5} md={5} sm={5}>
                <div className="home-cardbox">
                  <Link to="/maternity"><h3>Maternity</h3></Link>
                </div>
              </Col>
              <Col lg={5} md={5} sm={5}>
                <div className="home-cardbox">
                  <Link to="/grandparentage"> <h3>Grandparentage</h3></Link>
                </div>
              </Col>
              <Col sm={1}></Col>
            </Row>
            <Row>
              <Col sm={1}></Col>
              <Col lg={5} md={5} sm={5}>
                <div className="home-cardbox">
                  <Link to="/avuncular"><h3>Avuncular(Aunt/Uncle)</h3></Link>
                </div>
              </Col>
              <Col lg={5} md={5} sm={5}>
                <div className="home-cardbox">
                  <Link to="/siblingship"> <h3>Siblingship</h3></Link>
                </div>
              </Col>
              <Col sm={1}></Col>
            </Row>
            </div>
            </Container>
      </React.Fragment>
    );
  }
}

export default DnaOther;
