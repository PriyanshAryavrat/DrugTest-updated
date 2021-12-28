import React from 'react';
import './index.css'
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Passport extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col md={12}>
              <div className="cpuc-enrollment-form">
                <div className="drugtopheader">
                  <h2 className="margin-bottom0">Passport DNA </h2>
                </div>
                <div className="dnaconsent-formtable clearfix">
                  <form>
                    <fieldset className="form-fieldset">
                      <legend>User Information</legend>
                      <Row>
                        <Col lg={4} md={4} sm={6}>
                          <div className="form-group formbox">
                            <label>Name</label>
                            <input type="text" placeholder="Name" />
                          </div>
                        </Col>
                        <Col lg={4} md={4} sm={6}>
                          <div className="form-group formbox">
                            <label>Phone</label>
                            <input type="text" placeholder="Phone" />
                          </div>
                        </Col>
                        <Col lg={4} md={4} sm={6}>
                          <div className="form-group formbox">
                            <label>Email</label>
                            <input type="text" placeholder="Email" />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={4} md={4} sm={6}>
                          <div className="form-group formbox">
                            <label>Drivers License Number</label>
                            <input type="text" placeholder="Drivers License Number" />
                          </div>
                        </Col>
                      </Row>
                    </fieldset>
                    <fieldset className="form-fieldset">
                      <legend>Relationship</legend>
                      <Row>
                        <Col lg={3} md={3} sm={12}>
                          <div className="form-group formbox">
                            <label>Select Test Type:</label>
                          </div>
                        </Col>
                        <Col lg={9} md={9} sm={12}>
                          <Row>
                            <Col lg={3} md={3} sm={3}>
                              <div className="form-check">
                                <label className="form-check-label">
                                  <input type="checkbox" className="form-check-input" name="optionsCheck" value="" /> Paternity
                                  <i className="input-helper"></i>
                                </label>
                              </div>
                            </Col>
                            <Col lg={3} md={3} sm={3}>
                              <div className="form-check">
                                <label className="form-check-label">
                                  <input type="checkbox" className="form-check-input" name="optionsCheck" value="" /> Maternity
                                  <i className="input-helper"></i>
                                </label>
                              </div>
                            </Col>
                            <Col lg={3} md={3} sm={3}>
                              <div className="form-check">
                                <label className="form-check-label">
                                  <input type="checkbox" className="form-check-input" name="optionsCheck" value="" /> Grandparentage
                                  <i className="input-helper"></i>
                                </label>
                              </div>
                            </Col>
                            <Col lg={3} md={3} sm={3}>
                              <div className="form-check">
                                <label className="form-check-label">
                                  <input type="checkbox" className="form-check-input" name="optionsCheck" value="" /> Avuncular
                                  <i className="input-helper"></i>
                                </label>
                              </div>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={3} md={3} sm={12}>
                          <div className="form-group formbox">
                            <label>Siblingship:</label>
                          </div>
                        </Col>
                        <Col lg={9} md={9} sm={12}>
                          <Row>
                            <Col lg={3} md={3} sm={3}>
                              <div className="form-check">
                                <label className="form-check-label">
                                  <input type="checkbox" className="form-check-input" name="optionsCheck" value="" /> Full vs Unrelated
                                  <i className="input-helper"></i>
                                </label>
                              </div>
                            </Col>
                            <Col lg={3} md={3} sm={3}>
                              <div className="form-check">
                                <label className="form-check-label">
                                  <input type="checkbox" className="form-check-input" name="optionsCheck" value="" /> Full vs Half
                                  <i className="input-helper"></i>
                                </label>
                              </div>
                            </Col>
                            <Col lg={3} md={3} sm={3}>
                              <div className="form-check">
                                <label className="form-check-label">
                                  <input type="checkbox" className="form-check-input" name="optionsCheck" value="" /> Half vs Unrelated
                                  <i className="input-helper"></i>
                                </label>
                              </div>
                            </Col>
                            <Col lg={3} md={3} sm={3}>
                              <div className="form-check">
                                <label className="form-check-label">
                                  <input type="checkbox" className="form-check-input" name="optionsCheck" value="" /> Other
                                  <i className="input-helper"></i>
                                </label>
                              </div>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      <div className="relationship-innersection">
                        <div className="relationship-form">
                          <Row>
                            <Col lg={4} md={4} sm={4}>
                              <div className="form-group formbox selectbox">
                                <label>Relationship <sup className="redstarText">*</sup></label>
                                <select>
                                  <option>--Select Relationship--</option>
                                  <option>Alleged Father</option>
                                  <option>Mother</option>
                                  <option>Child</option>
                                  <option>Other (Specify)</option>
                                </select>
                              </div>
                            </Col>
                            <Col lg={4} md={4} sm={4}>
                              <div className="form-group formbox">
                                <label>Full Legal Name	</label>
                                <input type="text" placeholder="Legal Name of Tested Party" />
                              </div>
                            </Col>
                            <Col lg={4} md={4} sm={4}>
                              <div className="form-group formbox">
                                <label>DOB <sup className="redstarText">*</sup></label>
                                <input type="date" placeholder="MM/DD/YYYY" />
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col lg={4} md={4} sm={4}>
                              <div className="form-group formbox selectbox">
                                <label>Sample Type <sup className="redstarText">*</sup></label>
                                <select>
                                  <option value="BS">Buccal Swab</option>
                                  <option value="OT">Other</option>
                                </select>
                              </div>
                            </Col>
                            <Col lg={4} md={4} sm={4}>
                              <div className="form-group formbox">
                                <label>Sex</label>
                                <div className="sex-radiobox">
                                  <div className="form-check">
                                    <label className="form-check-label">
                                      <input type="radio" className="form-check-input" name="optionsRadios5" value="" /> Male
                                    <i className="input-helper"></i>
                                    </label>
                                  </div>
                                  <div className="form-check">
                                    <label className="form-check-label">
                                      <input type="radio" className="form-check-input" name="optionsRadios5" value="" /> Female
                                    <i className="input-helper"></i>
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col lg={4} md={4} sm={4}>
                              <div className="form-group formbox selectbox">
                                <label>Race/Ethnicity <sup className="redstarText">*</sup></label>
                                <select>
                                  <option>--Select Race/Ethnicity--</option>
                                  <option>Asian</option>
                                  <option>Black</option>
                                  <option>Caucasian</option>
                                  <option>Hispanic</option>
                                  <option>Other</option>
                                </select>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </div>
                      <Row>
                        <Col md={12}>
                          <div className="bottom-btn-group pull-right clearfix">
                            <Link to="#"><button className="bluebg">Save</button></Link>
                          </div>
                        </Col>
                      </Row>
                    </fieldset>
                    <fieldset className="form-fieldset">
                      <legend>Alleged Father/Mother/Other Relative</legend>
                      <div className="relationship-innersection">
                        <div className="relationship-form">
                          <Row>
                            <Col lg={4} md={4} sm={4}>
                              <div className="form-group formbox">
                                <label>Name</label>
                                <input type="text" placeholder="Name" />
                              </div>
                            </Col>
                            <Col lg={4} md={4} sm={4}>
                              <div className="form-group formbox">
                                <label>Phone </label>
                                <input type="text" placeholder="Phone" />
                              </div>
                              <div className="form-group formbox">
                                <div className="form-check">
                                  <label className="form-check-label">
                                    <input type="checkbox" className="form-check-input" name="optionscheckbox" value="" /> Do not call
                                    <i className="input-helper"></i>
                                  </label>
                                </div>
                              </div>
                            </Col>
                            <Col lg={4} md={4} sm={4}>
                              <div className="form-group formbox">
                                <label>Email </label>
                                <input type="text" placeholder="Email" />
                              </div>
                              <div className="form-group formbox">
                                <div className="form-check">
                                  <label className="form-check-label">
                                    <input type="checkbox" className="form-check-input" name="optionscheckbox" value="" /> I prefer to pick up the results. Do not email me.
                                    <i className="input-helper"></i>
                                  </label>
                                </div>
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col lg={4} md={4} sm={4}>
                              <div className="form-group formbox">
                                <label>Drivers License Number</label>
                                <input type="text" placeholder="Drivers License Number" />
                              </div>
                            </Col>
                            <Col lg={4} md={4} sm={4}>
                              <div className="form-group formbox selectbox">
                                <label>Drivers License State</label>
                                <select>
                                  <option value selected="selected">Select a State</option>
                                  <option value="AL">Alabama</option>
                                  <option value="AK">Alaska</option>
                                  <option value="AZ">Arizona</option>
                                  <option value="AR">Arkansas</option>
                                  <option value="CA">California</option>
                                  <option value="CO">Colorado</option>
                                  <option value="CT">Connecticut</option>
                                  <option value="DE">Delaware</option>
                                  <option value="DC">District Of Columbia</option>
                                  <option value="FL">Florida</option>
                                  <option value="GA">Georgia</option>
                                  <option value="HI">Hawaii</option>
                                  <option value="ID">Idaho</option>
                                  <option value="IL">Illinois</option>
                                  <option value="IN">Indiana</option>
                                  <option value="IA">Iowa</option>
                                  <option value="KS">Kansas</option>
                                  <option value="KY">Kentucky</option>
                                  <option value="LA">Louisiana</option>
                                  <option value="ME">Maine</option>
                                  <option value="MD">Maryland</option>
                                  <option value="MA">Massachusetts</option>
                                  <option value="MI">Michigan</option>
                                  <option value="MN">Minnesota</option>
                                  <option value="MS">Mississippi</option>
                                  <option value="MO">Missouri</option>
                                  <option value="MT">Montana</option>
                                  <option value="NE">Nebraska</option>
                                  <option value="NV">Nevada</option>
                                  <option value="NH">New Hampshire</option>
                                  <option value="NJ">New Jersey</option>
                                  <option value="NM">New Mexico</option>
                                  <option value="NY">New York</option>
                                  <option value="NC">North Carolina</option>
                                  <option value="ND">North Dakota</option>
                                  <option value="OH">Ohio</option>
                                  <option value="OK">Oklahoma</option>
                                  <option value="OR">Oregon</option>
                                  <option value="PA">Pennsylvania</option>
                                  <option value="RI">Rhode Island</option>
                                  <option value="SC">South Carolina</option>
                                  <option value="SD">South Dakota</option>
                                  <option value="TN">Tennessee</option>
                                  <option value="TX">Texas</option>
                                  <option value="UT">Utah</option>
                                  <option value="VT">Vermont</option>
                                  <option value="VA">Virginia</option>
                                  <option value="WA">Washington</option>
                                  <option value="WV">West Virginia</option>
                                  <option value="WI">Wisconsin</option>
                                  <option value="WY">Wyoming</option>
                                </select>
                              </div>
                            </Col>
                          </Row>
                          <div className="form-group formbox">
                            <div className="form-check">
                              <label className="form-check-label">
                                <input type="checkbox" className="form-check-input" name="optionscheckbox" value="" /> I do not have a driver license or a state ID
                              <i className="input-helper"></i>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Row>
                        <Col md={12}>
                          <div className="bottom-btn-group pull-right clearfix">
                            <Link to="#"><button className="bluebg">Save</button></Link>
                          </div>
                        </Col>
                      </Row>
                    </fieldset>
                  </form>
                  <div className="individual-section">
                    <div className="addplus-box add-additional clearfix">
                      <i className="mdi mdi-plus" />
                      <h4>Add Additional Person</h4>
                    </div>
                    <div className="form-group formbox clearfix">
                      <label>Have any of the individuals sampled undergone a blood cell transfusion or stem/bone marrow transplant?</label>
                      <Row>
                        <Col lg={4} md={4} sm={4}>
                          <div className="sex-radiobox margin-top20">
                            <div className="form-check">
                              <label className="form-check-label">
                                <input type="radio" className="form-check-input" name="optionsRadiosN" value="" /> No
                              <i className="input-helper"></i>
                              </label>
                            </div>
                            <div className="form-check">
                              <label className="form-check-label">
                                <input type="radio" className="form-check-input" name="optionsRadiosN" value="" /> Yes
                              <i className="input-helper"></i>
                              </label>
                            </div>
                          </div>
                        </Col>
                        <Col lg={4} md={4} sm={4}>
                          <div className="form-group formbox">
                            <label> Which Party?</label>
                            <input type="text" placeholder=" Which Party?" />
                          </div>
                        </Col>
                        <Col lg={4} md={4} sm={4}>
                          <div className="form-group formbox">
                            <label>When?</label>
                            <input type="text" placeholder="When?" />
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <div className="following-address">
                      <label>Please send the results to the following address:</label>
                      <textarea rows="4"></textarea>
                    </div>
                  </div>
                  <Row>
                    <Col md={12}>
                      <div className="bottom-btn-group pull-right clearfix">
                        <Link to="#"><button className="bluebg">Submit</button></Link>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default Passport;

