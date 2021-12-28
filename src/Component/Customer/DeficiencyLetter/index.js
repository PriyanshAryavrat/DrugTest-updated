import React from 'react';
import './index.css'
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class DeficiencyLetter extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div>
          <Container>
            <Row>
              <Col md={12}>
                <div className="cpuc-enrollment-form">
                  <div className="cpuc-enrollment-sections">
                    <div className="consortium-section-outer margin-bottom20 bottom-bordernone">
                      <div className="newtcp-form">
                        <p>You will receive a deficiency letter in the mail from the DOT in approximately 2 - 4 weeks after you
                          submit your TCP Renewal or New application.</p>
                        <div className="bottom-btn-group margin-bottom20">
                          <button className="bluebg">Deficiency Letter</button>
                        </div>
                        <p>You will receive a DMV Employer pull notice letter in the mail in approximately 30 days <br /> Please submit a copy
                          of these letters to Accurate. <br /> Submit by email testing@accuratescreens.com or 510-394-3985</p>
                        <div className="bottom-btn-group margin-bottom20">
                          <button className="bluebg">Pull Notice Letter</button>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-check">
                              <label className="form-check-label">
                                <input type="checkbox" className="form-check-input" name="optionsCheckbox" value="" /> Check to send a
                                 copy of sample deficiency letter to my email <i className="input-helper"></i>
                              </label>
                            </div>
                            <div className="form-check">
                              <label className="form-check-label">
                                <input type="checkbox" className="form-check-input" name="optionsCheckbox2" value="" /> Check to send a
                               copy of both the sample deficiency letter &amp; pull notice <i className="input-helper"></i>
                              </label>
                            </div>
                            <div className="email-enrolment">
                              <h4>Email Address From Enrolment Form</h4>
                            </div>
                            <div className="bottom-btn-group pull-right ">
                              <button className="bluebg margin-right10">Save</button>
                              <Link to="/more-assistance"><button className="bluebg">Next</button></Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default DeficiencyLetter;

