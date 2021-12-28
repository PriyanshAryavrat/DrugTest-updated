import React from 'react';
import { Link } from 'react-router-dom';
import './index.css'
import { Container, Row, Col } from 'react-bootstrap';
import {
  Accurate_logo1,
  Accurate_Home
} from '../../../../src/assets/images';


class HomeScreen extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="accurate-home">
          <Container fluid>
            <Row>
              <Col lg={6} md={6} sm={6}>
                <div className="accurate-left-group">
                  <div className="accurate-logo">
                    <img src={Accurate_logo1} alt="Accurate Logo" />
                  </div>
                  <div className="accurate-button">
                    <Row>
                      <Col lg={6} md={6} sm={6}>
                        <div className="button-card">
                          <Link to="/cpuc-owner-enrollment" className='disabled-link'>CPUC</Link>
                        </div>
                      </Col>
                      <Col lg={6} md={6} sm={6}>
                        <div className="button-card">
                          <Link to="/dot-owner-enrollment">DOT</Link>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                    <Col lg={6} md={6} sm={6}>
                        <div className="button-card">
                          <Link to="/alc" className='disabled-link'>ALC</Link>
                          {/* <Dropdown>
                            <Dropdown.Toggle id="alcDropdown">
                              ALC
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item href="/alc">Enrollment Form</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown> */}
                        </div>
                      </Col>
                      <Col lg={6} md={6} sm={6}>
                        <div className="button-card">
                          <Link to="/taxi" className='disabled-link'>Taxi</Link>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={6} md={6} sm={6}>
                        <div className="button-card">
                          <Link to="/personal_test" className='disabled-link'>Personal</Link>
                        </div>
                      </Col>
                      <Col lg={6} md={6} sm={6}>
                        <div className="button-card">
                          <Link to="/lando">Lan Do</Link>
                          {/* <Dropdown>
                            <Dropdown.Toggle id="landoDropdown">
                              Lan Do
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item href="/lando">Enrollment Form</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown> */}
                        </div>
                      </Col>
                    </Row>
                    <Row>
                    <Col lg={6} md={6} sm={6}>
                        <div className="button-card"> 
                          <Link to="/uscg">USCG</Link>
                          {/* <Dropdown>
                            <Dropdown.Toggle id="uscgDropdown">
                              USCG
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item href="/uscg">Enrollment Form</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown> */}
                        </div>
                      </Col>
                     
                     
                      <Col lg={6} md={6} sm={6}>
                        <div className="button-card">
                          <Link to="/dna_home" className='disabled-link'>DNA</Link>
                        </div>
                      </Col>
                  </Row>
                  </div>
                </div>
                <div className="ocean">
                  <div className="wave"></div>
                  <div className="wave"></div>
                </div>
              </Col>
              <Col lg={6} md={6} sm={6}>
                <div className="accurate-right-group">
                  <img src={Accurate_Home}  alt="Accurate Home"/>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default HomeScreen;