import React from 'react';
import './index.css'
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Immigration extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Container>
          <div className="cpuc-enrollment-form clearfix">
            <Row>
              <Col md={12}>
                <div className="drugtopheader ">
                  <h2 className="margin-bottom0">Immigration</h2>
                </div>
              </Col>
            </Row>
            <form>
              <fieldset className="form-fieldset">
                <legend>Petitioner Info</legend>
                <Row>
                  <Col lg={6} md={6} sm={6}>
                    <div className="form-group formbox">
                      <label>First name <sup className="redstarText">*</sup></label>
                      <input type="text" placeholder="First name" />
                    </div>

                    <div className="form-group formbox">
                      <label>Last name <sup className="redstarText">*</sup></label>
                      <input type="text" placeholder="Last name " />
                    </div>

                    <div className="form-group formbox">
                      <label>Date of Birth <sup className="redstarText">*</sup></label>
                      <input type="text" placeholder="MM/DD/YYYY" />
                    </div>

                    <div className="form-group formbox">
                      <label>Current Location <sup className="redstarText">*</sup></label>
                      <input type="text" placeholder="Current Location " />
                    </div>

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

                    <div className="form-group formbox">
                      <label>Is Petitioner Being Tested? <sup className="redstarText">*</sup></label>
                      <div className="sex-radiobox margin-top6">
                        <div className="form-check">
                          <label className="form-check-label">
                            <input type="radio" className="form-check-input" name="optionsRadios5" value="" /> Yes
                          <i className="input-helper"></i>
                          </label>
                        </div>
                        <div className="form-check">
                          <label className="form-check-label">
                            <input type="radio" className="form-check-input" name="optionsRadios5" value="" /> No
                          <i className="input-helper"></i>
                          </label>
                        </div>
                      </div>
                    </div>

                    <Row>
                      <Col md={12}>
                        <div className="form-group formbox">
                          <label>Relationship to Beneficiary/Ies <sup className="redstarText">*</sup></label>
                          <div className="beneficiary-check margin-top6">
                            <div className="form-group formbox">
                              <div className="form-check">
                                <label className="form-check-label">
                                  <input type="checkbox" className="form-check-input" name="optionscheckbox" value="" /> Mother
                          <i className="input-helper"></i>
                                </label>
                              </div>
                            </div>
                            <div className="form-group formbox">
                              <div className="form-check">
                                <label className="form-check-label">
                                  <input type="checkbox" className="form-check-input" name="optionscheckbox" value="" /> Father
                          <i className="input-helper"></i>
                                </label>
                              </div>
                            </div>
                            <div className="form-group formbox">
                              <div className="form-check">
                                <label className="form-check-label">
                                  <input type="checkbox" className="form-check-input" name="optionscheckbox" value="" /> Son
                          <i className="input-helper"></i>
                                </label>
                              </div>
                            </div>
                            <div className="form-group formbox">
                              <div className="form-check">
                                <label className="form-check-label">
                                  <input type="checkbox" className="form-check-input" name="optionscheckbox" value="" /> Daughter
                          <i className="input-helper"></i>
                                </label>
                              </div>
                            </div>
                            <div className="form-group formbox">
                              <div className="form-check">
                                <label className="form-check-label">
                                  <input type="checkbox" className="form-check-input" name="optionscheckbox" value="" /> Sister
                          <i className="input-helper"></i>
                                </label>
                              </div>
                            </div>
                            <div className="form-group formbox">
                              <div className="form-check">
                                <label className="form-check-label">
                                  <input type="checkbox" className="form-check-input" name="optionscheckbox" value="" /> Brother
                          <i className="input-helper"></i>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col lg={6} md={6} sm={6}>
                    <div className="beneficiary-heading">
                      <p>The name entered must match the Petitioner's government issued ID or the case may be delayed or
                          rejected.</p>
                    </div>
                    <div className="form-group formbox selectbox">
                      <label>Gender <sup className="redstarText">*</sup></label>
                      <select>
                        <option>Male </option>
                        <option>Female</option>
                      </select>
                    </div>
                    <div className="form-group formbox">
                      <label>Phone 1  <sup className="redstarText">*</sup></label>
                      <input type="text" placeholder="Phone 1 " />
                    </div>
                    <div className="form-group formbox">
                      <label>Phone 2</label>
                      <input type="text" placeholder="Phone 2 " />
                    </div>
                    <div className="form-group formbox">
                      <label>Phone 3</label>
                      <input type="text" placeholder="Phone 3 " />
                    </div>
                    <div className="form-group formbox">
                      <label>Email <sup className="redstarText">*</sup></label>
                      <input type="text" placeholder="Email" />
                    </div>
                    <div className="form-group formbox">
                      <label>Drivers License Number <sup className="redstarText">*</sup></label>
                      <input type="text" placeholder="Drivers License Number" />
                    </div>
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
                    <div className="form-check">
                      <label className="form-check-label">
                        <input type="checkbox" className="form-check-input" name="optionscheckbox" value="" /> I do not have a drivers license & state ID
                          <i className="input-helper"></i>
                      </label>
                    </div>
                  </Col>
                </Row>
              </fieldset>

              <fieldset className="form-fieldset">
                <legend>Beneficiary Info </legend>
                <Row>
                  <Col lg={6} md={6} sm={6}>
                    <div className="form-group formbox">
                      <label>First Name <sup className="redstarText">*</sup></label>
                      <input type="text" placeholder="First Name" />
                    </div>
                    <div className="form-group formbox">
                      <label>Last name <sup className="redstarText">*</sup></label>
                      <input type="text" placeholder="Last name" />
                    </div>
                    <div className="form-group formbox">
                      <label>Date of Birth <sup className="redstarText">*</sup></label>
                      <input type="text" placeholder="MM/DD/YYYY" />
                    </div>
                    <div className="form-group formbox">
                      <label>Case  <sup className="redstarText">*</sup></label>
                      <input type="text" placeholder="Case " />
                    </div>
                    <div className="form-group formbox">
                      <label>Relationship to petitioner  <sup className="redstarText">*</sup></label>
                      <input type="text" placeholder="Relationship to petitioner " />
                    </div>
                    <div className="form-group formbox">
                      <label>Current Location  <sup className="redstarText">*</sup></label>
                      <input type="text" placeholder="Current Location" />
                    </div>
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
                  <Col lg={6} md={6} sm={6}>
                    <div className="beneficiary-heading">
                      <p>The name entered must match the Beneficiary's government issued ID or the case may be delayed or rejected.</p>
                    </div>
                    <div className="form-group formbox selectbox">
                      <label>Gender <sup className="redstarText">*</sup></label>
                      <select>
                        <option>Male </option>
                        <option>Female</option>
                      </select>
                    </div>
                    <div className="form-group formbox">
                      <label>Phone 1  <sup className="redstarText">*</sup></label>
                      <input type="text" placeholder="Phone 1 " />
                    </div>
                    <div className="form-group formbox">
                      <label>Phone 2</label>
                      <input type="text" placeholder="Phone 2 " />
                    </div>
                    <div className="form-group formbox">
                      <label>Phone 3</label>
                      <input type="text" placeholder="Phone 3 " />
                    </div>
                    <div className="form-group formbox">
                      <label>Email <sup className="redstarText">*</sup></label>
                      <input type="text" placeholder="Email" />
                    </div>
                  </Col>
                </Row>
              </fieldset>
            </form>
            <div className="search-btngroup pull-right ">
              <Link><button type="button" className="bluebg margin-bottom10 margin-right10">Add Another
                  beneficiary</button></Link>
              <Link><button type="button" className="bluebg margin-right10"> Save </button></Link>
              <Link><button type="button" className="bluebg"> Save &amp; Print</button></Link>
            </div>
          </div>
        </Container>


      </React.Fragment>
    );
  }
}

export default Immigration;

