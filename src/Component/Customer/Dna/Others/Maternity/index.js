import React from 'react';
import './index.css'
import { Redirect } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
import TextValidator from "../../../../../Form/TextValidator/Index";
import axios from "axios";
import apiPath from "../../../../../Environment/ApiPath";
import Swal from "sweetalert2";
import { ValidatorForm } from "react-form-validator-core";
import ButtonGroup from "../../../../../Form/Button/index";
import PhoneInput from "react-phone-input-2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import StateData from "../../../../../Config/CountryStates.json";
import Select from 'react-select';

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
});
const options = [
  { value: 'Mother', label: 'Mother' },
  { value: 'Child', label: 'Child' },
];
class Maternity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phoneNumber: "",
      email: "",
      drivingLicence: "",
      legalSelect: "",
      fullLegalName: "",
      dateOfBirth: new Date(),
      gender: "",
      motherName: "",
      motherPhoneNumber: "",
      email2: "",
      drivingLicence2: "",
      state: "",
      whichParty: "",
      when: "",
      redirectTo: false,
      termsError: "",
      selectedOption: null
    };
  }
  handleSelectChange = selectedOption => {
    this.setState({ selectedOption });
    // console.log(`Option selected:`, selectedOption);
  };
  handleChange = (date) => {
    console.log(date.toISOString());
    this.setState({
      dateOfBirth: date,
    });
  };


  handleSubmit = async (evt) => {
    evt.preventDefault();
    const formData = new FormData();
    formData.append("name", this.state.name);
    formData.append("phoneNumber", this.state.phoneNumber);
    formData.append("email", this.state.email);
    formData.append("drivingLicence", this.state.drivingLicence);
    formData.append("legalSelect", this.state.legalSelect);
    formData.append("gender", this.state.gender);
    formData.append("motherName", this.state.motherName);
    formData.append("motherPhoneNumber", this.state.motherPhoneNumber);
    formData.append("email2", this.state.email2);
    formData.append("drivingLicence2", this.state.drivingLicence2);
    formData.append("state", this.state.state);
    formData.append(
      "dateOfBirth",
      this.state.dateOfBirth.toISOString()
    );
    formData.append("whichParty", this.state.whichParty);
    formData.append("when", this.state.when);

    axios
      .post(apiPath.base_url, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data && res.data.status === "failure") {
          Toast.fire({
            type: "error",
            title: res.data.message,
          });
          return;
        }
        Toast.fire({
          type: "success",
          title: "Form Submitted Successfully!",
        });
        setTimeout(() => {
          this.setState({ redirectTo: "/" });
        }, 2000);
      });
  };

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo} />;
    }
    const { selectedOption } = this.state;
    return (
      <React.Fragment>
        <ValidatorForm
          ref="form"
          instantValidate="true"
          onError={(e) => {
            this.preventDefault();
            console.log(this.refs.form.errorMessages);
            console.log("Form Errors"); 
          }}
          onSubmit={this.handleSubmit}
          >
          <Container>
            <div className="cpuc-enrollment-form clearfix">
              <Row>
                <Col md={12}>
                  <div className="drugtopheader ">
                    <h2 className="margin-bottom0">Maternity Test</h2>
                  </div>
                </Col>
              </Row>
              <form>
                <fieldset className="form-fieldset">
                  <legend>User Information</legend>
                  <Row>
                    <Col lg={4} md={4} sm={6}>
                      <div className="form-group formbox">
                        <label className="control-label">
                          Name{" "}
                          <sup className="redstarText">*</sup>
                        </label>
                        <TextValidator
                          name="name"
                          type="text"
                          value={this.state.name}
                          placeholder="Name"
                          validators={["required"]}
                          errorMessages={["This field is required"]}
                          onChange={(e) => {
                            this.setState({ name: e.target.value });
                          }}
                        />
                      </div>
                    </Col>
                    <Col lg={4} md={4} sm={6}>
                      <div className="form-group formbox">
                        <label className="control-label">
                          Phone Number{" "}
                          <sup className="redstarText">*</sup>
                        </label>
                        <PhoneInput
                          country={"us"}
                          disableCountryCode="true"
                          onlyCountries={["us"]}
                          buttonStyle={{ display: "none" }}
                          placeholder="eg: (123) 121-4444"
                          value={this.state.phoneNumber}
                          onChange={(phone) =>
                            this.setState({ phoneNumber: phone })
                          }
                        />
                      </div>
                    </Col>
                    <Col lg={4} md={4} sm={6}>
                      <div className="form-group formbox">
                        <label>Email</label>
                        <TextValidator
                          name="email"
                          type="email"
                          placeholder="Email"
                          value={this.state.email}
                          validators={["required", "isEmail"]}
                          errorMessages={[
                            "This field is required",
                            "Email is not valid",
                          ]}
                          onChange={(e) => {
                            this.setState({ email: e.target.value });
                          }}
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={4} md={4} sm={6}>
                      <div className="form-group formbox">
                        <label>Driving License</label>
                        <TextValidator
                          type="text"
                          value={this.state.drivingLicence}
                          placeholder="DL Number"
                          validators={["required"]}
                          errorMessages={["This field is required"]}
                          onChange={(e) => {
                            this.setState({
                              drivingLicence: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </Col>
                  </Row>
                </fieldset>
                <fieldset className="form-fieldset">
                  <legend>Relationship</legend>
                  <Row>
                    <Col lg={3} md={4} sm={6}>
                      <div className="form-group formbox">
                        <label>Please Select One:</label>
                      </div>
                    </Col>
                    <Col lg={9} md={8} sm={8}>
                      <Row>
                        <Col lg={5} md={6} sm={6}>
                          <div className="form-check">
                            <label className="form-check-label">
                              <input
                                type="radio"
                                onClick={(e) => {
                                  this.setState({
                                    legalSelect: e.target.value,
                                  });
                                }}
                                value="NA"
                                className="form-check-input"
                                name="legalSelect"
                              />{" "}
                               Legal/Court admissible <i className="input-helper" />
                            </label>
                          </div>
                        </Col>
                        <Col lg={5} md={6} sm={6}>
                          <div className="form-check">
                            <label className="form-check-label">
                              <input
                                type="radio"
                                onClick={(e) => {
                                  this.setState({
                                    legalSelect: e.target.value,
                                  });
                                }}
                                value="NA"
                                className="form-check-input"
                                name="legalSelect"
                              />{" "}
                                Personal/Peace of mind <i className="input-helper" />
                            </label>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="7"></Col>
                  </Row>
                  <div className="relationship-innersection">
                    <div className="relationship-form">
                      <Row>
                        <Col lg={4} md={4} sm={6}>
                          <div className="form-group formbox selectbox">
                            <label>Relationship <sup className="redstarText">*</sup></label>
                            <Select
                              value={selectedOption}
                              onChange={this.handleSelectChange}
                              options={options}
                              className="selectgroup"
                            />
                          </div>
                        </Col>
                        <Col lg={4} md={4} sm={6}>
                          <div className="form-group formbox">
                            <label className="control-label">
                              Full Legal Name {" "}
                              <sup className="redstarText">*</sup>
                            </label>
                            <TextValidator
                              name="fullLegalName"
                              type="text"
                              value={this.state.fullLegalName}
                              placeholder="Full Legal Name"
                              validators={["required"]}
                              errorMessages={["This field is required"]}
                              onChange={(e) => {
                                this.setState({ fullLegalName: e.target.value });
                              }}
                            />
                          </div>
                        </Col>
                        <Col lg={4} md={4} sm={6}>
                          <div className="form-group formbox">
                            <label>DOB <sup className="redstarText">*</sup></label>
                            <DatePicker
                              placeholderText="Select a date"
                              selected={this.state.dateOfBirth}
                              onChange={this.handleChange}
                              minDate={new Date()}
                              className="form-control"
                              name="dateOfBirth"
                              dateFormat="MM/dd/yyyy"
                              peekNextMonth
                              showMonthDropdown
                              showYearDropdown
                              dropdownMode="select"
                            />
                            <TextValidator
                              name="enddate"
                              className="mrgbotm"
                              tabIndex={-1}
                              autoComplete="off"
                              style={{ opacity: 0, height: 0, padding: 0 }}
                              value={this.state.dateOfBirth}
                              readOnly
                              validators={["required"]}
                              errorMessages={["This field is required"]}
                            />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={4} md={4} sm={6}>
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
                                  <input
                                    type="radio"
                                    onClick={(e) => {
                                      this.setState({
                                        gender: e.target.value,
                                      });
                                    }}
                                    value="Male"
                                    className="form-check-input"
                                    name="gender"
                                  />{" "}
                                  Male <i className="input-helper" />
                                </label>
                              </div>
                              <div className="form-check">
                                <label className="form-check-label">
                                  <input
                                    type="radio"
                                    onClick={(e) => {
                                      this.setState({
                                        gender: "TCP Pending",
                                      });
                                    }}
                                    value="Female"
                                    className="form-check-input"
                                    name="gender"
                                  />{" "}
                                  Female <i className="input-helper" />
                                </label>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col lg={4} md={4} sm={6}>
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
                        <button type="submit" className="bluebg">Save</button>
                      </div>
                    </Col>
                  </Row>
                </fieldset>
                <fieldset className="form-fieldset">
                  <legend>Mother</legend>
                  <div className="relationship-innersection">
                    <div className="relationship-form">
                      <Row>
                        <Col lg={4} md={4} sm={6}>
                          <div className="form-group formbox">
                            <label className="control-label">
                              Name{" "}
                              <sup className="redstarText">*</sup>
                            </label>
                            <TextValidator
                              name="motherName"
                              type="text"
                              value={this.state.motherName}
                              placeholder="Name"
                              validators={["required"]}
                              errorMessages={["This field is required"]}
                              onChange={(e) => {
                                this.setState({
                                  motherName: e.target.value,
                                });
                              }}
                            />
                          </div>
                        </Col>
                        <Col lg={4} md={4} sm={6}>
                          <div className="form-group formbox">
                            <label className="control-label">Phone Number{" "}<sup className="redstarText">*</sup></label>
                            <PhoneInput
                              country={"us"}
                              disableCountryCode="true"
                              onlyCountries={["us"]}
                              buttonStyle={{ display: "none" }}
                              placeholder="eg: (123) 121-4444"
                              value={this.state.motherPhoneNumber}
                              onChange={(phone) =>
                                this.setState({ motherPhoneNumber: phone })
                              }
                            />
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
                        <Col lg={4} md={4} sm={6}>
                          <div className="form-group formbox">
                            <label>Email</label>
                            <TextValidator
                              name="email2"
                              type="email"
                              placeholder="Email"
                              value={this.state.email2}
                              validators={["required", "isEmail"]}
                              errorMessages={[
                                "This field is required",
                                "Email is not valid",
                              ]}
                              onChange={(e) => {
                                this.setState({ email2: e.target.value });
                              }}
                            />
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
                        <Col lg={4} md={4} sm={6}>
                          <div className="form-group formbox">
                            <label>Driving License <sup className="redstarText">*</sup></label>
                            <TextValidator
                              type="text"
                              value={this.state.drivingLicence2}
                              placeholder="DL Number"
                              validators={["required"]}
                              errorMessages={["This field is required"]}
                              onChange={(e) => {
                                this.setState({
                                  drivingLicence2: e.target.value,
                                });
                              }}
                            />
                          </div>
                        </Col>
                        <Col lg={4} md={4} sm={4}>
                          <div className="form-group formbox selectbox">
                            <label>DL State <sup className="redstarText">*</sup></label>
                            <TextValidator
                              type="select"
                              value={this.state.state}
                              validators={["required"]}
                              errorMessages={["This field is required"]}
                              onChange={(e) => {
                                this.setState({ state: e.target.value });
                              }}
                             >
                              <option>Select State</option>
                              {StateData.map((item) => {
                                return <option>{item.name}</option>;
                              })}
                            </TextValidator>
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
                        <button type="submit" className="bluebg">Save</button>
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
                        <label className="control-label">
                          Which Party? {" "}
                          <sup className="redstarText">*</sup>
                        </label>
                        <TextValidator
                          name="whichParty"
                          type="text"
                          value={this.state.whichParty}
                          placeholder="Full Legal Name"
                          validators={["required"]}
                          errorMessages={["This field is required"]}
                          onChange={(e) => {
                            this.setState({ whichParty: e.target.value });
                          }}
                        />
                      </div>
                    </Col>
                    <Col lg={4} md={4} sm={4}>
                      <div className="form-group formbox">
                        <label className="control-label">
                          When? {" "}
                          <sup className="redstarText">*</sup>
                        </label>
                        <TextValidator
                          name="when"
                          type="text"
                          value={this.state.when}
                          placeholder="Full Legal Name"
                          validators={["required"]}
                          errorMessages={["This field is required"]}
                          onChange={(e) => {
                            this.setState({ when: e.target.value });
                          }}
                        />
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
              <ButtonGroup />
              {/* <Row>
              <Col md={12}>
                <div className="bottom-btn-group pull-right clearfix">
                  <Link to="#"><button className="bluebg">Submit</button></Link>
                </div>
              </Col>
            </Row> */}
            </div>
          </Container>
        </ValidatorForm>
      </React.Fragment>
    );
  }
}

export default Maternity;
