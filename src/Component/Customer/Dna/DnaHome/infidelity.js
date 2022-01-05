import React from "react";
import { Redirect } from "react-router-dom";
import "./index.css";
import { Row, Col, Button } from "react-bootstrap";
import { ValidatorForm } from "react-form-validator-core";
import TextValidator from "../../../../Form/TextValidator/Index";
import PhoneValidator from "../../../../Form/PhoneValidator/Index";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import StateData from "../../../../Config/CountryStates.json";
import Swal from "sweetalert2";
import axios from "axios";
import apiPath from "../../../../Environment/ApiPath";
var age;
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
});

class InfidelityOther extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phoneNumber: "",
      email: "",
      drivingLicence: "",
      dateofbirth: "",
      motherdateofbirth: "",
      childdateofbirth: "",
      relationdateofbirth: "",
      sampleType: "",
      sex: "",
      raceEthnicity: "",
      password: "",
      tabIndex: 0,
      inputError: "This field is required",
      dateRead: false,
      relationhasDL: false,
      relationdateRead: false,
      inputRead: false,
      mother: false,
      child: false,
      additionalPerson: false,
      phoneNo: "",
      additionalPersonName: "",
      childAge: false,
      relationEmailMe: false,
      relationCallMe: false,
      motherisDl: false,
      motherDlState: "California",
      dlState: "California",
      relationDlState: "California",
      additionalItems: [],
      relationCallMe: false,
      childCallme: false,
      childEmailme: false,
      childdateRead: false,
      semenDetection: false,
      ystr: false,
      salivaDetection: false,
      otherTest: "",
      hasTransplant: null,
    };
  }
  componentDidMount() {
    if (window.sessionStorage.length > 0 && window.sessionStorage.getItem("userType") == "Individual") {
      let data = JSON.parse(window.sessionStorage.getItem("userData"));
      if (data) {
        this.setState({
          ...data
        })
      }
    }

  }
  handleChanges = (date) => {
    this.setState({
      childdateofbirth: date,
    });
    var today = new Date();
    var birthDate = new Date(date);
    age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    console.log("Age", age);
    if (age >= 18) {
      this.setState({
        childAge: true,
      });
    } else if (age < 18) {
      this.setState({
        childAge: false,
      });
    }
  };

  handleTransplantDateChange = (date) => {
    this.setState({
      transplantDate: date,
    });
  };

  handleSubmit = async (evt) => {
    // evt.preventDefault();
    console.log("form submitted");
    let formData = {
      name: this.state.name,
      phone: this.state.phoneNumber,
      email: this.state.email,
      drivingLicence: this.state.drivingLicence,
      relationship: this.state.relationship,
      semenDetection: this.state.semenDetection,
      ystr: this.state.ystr,
      salivaDetection: this.state.salivaDetection,
      otherTest: this.state.testing ? this.state.otherTest : "",
      relation: {
        relation: this.state.relationName,
        firstName: this.state.relationFirstName,
        middleName: this.state.relationMiddleName,
        lastName: this.state.relationLastName,
        dob: this.state.relationDateOfBirth,
        gender: this.state.relationSex,
        password: this.state.relationPassword,
        phone: this.state.relationCallMe ? "" : this.state.relationPhoneNo,
        email: this.state.relationEmailMe ? "" : this.state.relationEmail,
        drivingLicence: this.state.relationdateRead ? "" : this.state.relationDrivingLicence,
        dlState: this.state.relationdateRead ? "" : this.state.relationDlState,
        sampleType: this.state.relationSampleType,
        sampleTypeOther: this.state.relationSampleTypeOther,
        race: this.state.relationRaceEthnicity,
        raceOther: this.state.relationRaceEthnicityOther,
        pickupPreference: this.state.relationEmailMe,
        allowCall: this.state.relationCallMe,
        hasDL: this.state.relationhasDL,
        itemToBeTested: this.state.testedname
      },
      additionalItems: this.state.additionalItems,
      bloodCellTransfusion: {
        status: this.state.hasTransplant,
        party: this.state.hasTransplant ? this.state.party : null,
        when: this.state.hasTransplant ? this.state.transplantDate : null,
      },
      additionalTesting: this.state.additionalTest,
    };
    axios
      .post(apiPath.save_infidelity_form, formData, {
        headers: {
          "content-type": "application/json",
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
          title: "Data Saved Successfully!",
        });
        setTimeout(() => {
          this.setState({ redirectTo: "/pdf/Infidelity/" + res.data.data.formId });
        }, 2000);
      });
  };

  addAdditionalItem = (e) => {
    this.setState((prevState) => ({
      additionalItems: [
        ...prevState.additionalItems,
        {
          name: "",
        },
      ],
    }));
  };

  render() {
    if (this.state.redirectTo) {
      window.open(this.state.redirectTo);
      return <Redirect to={"/"} />;
      // return <Redirect to={this.state.redirectTo} />;
    }
    return (
      <React.Fragment>
        <ValidatorForm
          onError={(e) => {
            this.preventDefault();
          }}
          onSubmit={this.handleSubmit}
        >
          <div className="cpuc-enrollment-sections clearfix">
            <div className="consortium-section-outer margin-bottom20 formsteps">
              <h3>User Information</h3>
              <Row>
                <Col lg={4} md={4} sm={6}>
                  <div className="form-group formbox">
                    <label className="control-label">
                      Name<sup className="redstarText">*</sup>
                    </label>
                    <TextValidator
                      name="name"
                      type="text"
                      value={this.state.name}
                      placeholder="Name"
                      validators={["required","trim"]}
                      maxlength="30"
                      errorMessages={"This field is required","Please Enter valid name"}
                      onChange={(e) => {
                        let value = e.target.value;
                        value = value.replace(/[^A-Za-z\s]/gi, "");
                        this.setState({
                          name: value,
                        });
                      }}
                    />
                  </div>
                </Col>
                <Col lg={4} md={4} sm={6}>
                  <div className="form-group formbox">
                    <label className="control-label">
                      {" "}
                      Phone<sup className="redstarText">*</sup>{" "}
                    </label>
                    <PhoneValidator
                      validators={["required"]}
                      errorMessages={this.state.inputError}
                      value={this.state.phoneNumber}
                      onChange={(phone) => {
                        this.setState({ phoneNumber: phone });
                      }}
                    />
                  </div>
                </Col>
                <Col lg={4} md={4} sm={6}>
                  <div className="form-group formbox">
                    <label className="control-label">
                      {" "}
                      Email<sup className="redstarText">*</sup>
                    </label>
                    <TextValidator
                      name="email"
                      type="email"
                      autoComplete="off"
                      placeholder="Email"
                      value={this.state.email}
                      validators={["required" , 'matchRegexp:^([a-zA-Z0-9])(([a-zA-Z0-9])*([\._\+-])*([a-zA-Z0-9]))*@([a-zA-Z0-9])*.(([a-zA-Z]{2,4}?)*((\.)[a-zA-Z]{2,4}?))$']}
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
                    <label>
                      Driving License<sup className="redstarText">*</sup>{" "}
                    </label>
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
            </div>
            <div className="consortium-section-outer formsteps bottom-bordernone">
              <h3>
                Relationship:{" "}
                {/* <span className="light-textcolor">Personal/Peace of mind</span> */}
              </h3>
              <Row className="margin-bottom20">
                        <Col lg={3} md={4} sm={6}>
                          <div className="form-group formbox m0">
                            <label>
                              Please Select One
                              <sup className="redstarText">*</sup>
                            </label>
                            <TextValidator
                              name="relationship"
                              type="hidden"
                              value={this.state.relationship}
                              placeholder="relationship"
                              validators={["required"]}
                              errorMessages={["This field is required"]}
                            />
                          </div>
                        </Col>
                        <Col lg={9} md={8} sm={8}>
                          <Row>
                            <Col lg={4} md={6} sm={6}>
                              <div className="form-check">
                                <label className="form-check-label">
                                  <input
                                    type="radio"
                                    className="form-check-input"
                                    name="optionsRadios5"
                                    value="Legal/Court admissible"
                                    onChange={(e) => {
                                      this.setState({
                                        relationship: e.target.value,
                                      });
                                    }}
                                  />{" "}
                                  Legal/Court admissible
                                  <i className="input-helper"></i>
                                </label>
                              </div>
                            </Col>
                            <Col lg={5} md={6} sm={6}>
                              <div className="form-check">
                                <label className="form-check-label">
                                  <input
                                    type="radio"
                                    className="form-check-input"
                                    name="optionsRadios5"
                                    value="Personal/Peace of mind"
                                    onChange={(e) => {
                                      this.setState({
                                        relationship: e.target.value,
                                      });
                                    }}
                                  />{" "}
                                  Personal/Peace of mind
                                  <i className="input-helper"></i>
                                </label>
                              </div>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
              {/* <legend>Relationship</legend>
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
                            <input type="radio" className="form-check-input" name="optionsRadios5" value="" /> Legal/Court admissible
                              <i className="input-helper"></i>
                          </label>
                        </div>
                      </Col>
                      <Col lg={5} md={6} sm={6}>
                        <div className="form-check">
                          <label className="form-check-label">
                            <input type="radio" className="form-check-input" name="optionsRadios5" value="" /> Personal/Peace of mind
                              <i className="input-helper"></i>
                          </label>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row> */}
            </div>

            <div className="consortium-section-outer formsteps bottom-bordernone">
              {/* <h3>Relationship</h3> */}
              <Row>
                <Col lg={4} md={4} sm={4}>
                  <div className="form-group formbox">
                    <label className="control-label"> Reference</label>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg={4} md={4} sm={4}>
                  <div className="form-group formbox">
                    <label className="control-label">
                      First Name<sup className="redstarText">*</sup>
                    </label>
                    <TextValidator
                      name="name"
                      type="text"
                      value={this.state.relationFirstName}
                      placeholder="First Name"
                      validators={["required" , "matchRegexp:^[a-zA-Z]+$"  ]}
                      errorMessages={["This field is required" , "Please Enter Valid Name"]}
                      maxLength="30"  
                      onChange={(e) => {
                        let value = e.target.value;
                        value = value.replace(/[^A-Za-z\s]/gi, "");
                        this.setState({
                          relationFirstName: value,
                        });
                      }}
                    />
                  </div>
                </Col>
                <Col lg={4} md={4} sm={4}>
                  <div className="form-group formbox">
                    <label className="control-label">Middle Name</label>
                    <TextValidator
                      name="name"
                      type="text"
                      value={this.state.relationMiddleName}
                      placeholder="Middle Name"
                      onChange={(e) => {
                        let value = e.target.value;
                        value = value.replace(/[^A-Za-z\s]/gi, "");
                        this.setState({
                          relationMiddleName: value,
                        });
                      }}
                    />
                  </div>
                </Col>
                <Col lg={4} md={4} sm={4}>
                  <div className="form-group formbox">
                    <label className="control-label">
                      Last Name<sup className="redstarText">*</sup>
                    </label>
                    <TextValidator
                      name="name"
                      type="text"
                      value={this.state.relationLastName}
                      placeholder="Last Name"
                      validators={["required" , "matchRegexp:^[a-zA-Z]+$"  ]}
                      errorMessages={["This field is required" , "Please Enter Valid Name"]}
                      maxLength="30"  
                      onChange={(e) => {
                        let value = e.target.value;
                        value = value.replace(/[^A-Za-z\s]/gi, "");
                        this.setState({
                          relationLastName: value,
                        });
                      }}
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg={4} md={4} sm={4}>
                  <div className="form-group formbox">
                    <label>
                      DOB<sup className="redstarText">*</sup>
                    </label>
                    <DatePicker
                      placeholderText="Select a date"
                      selected={this.state.relationDateOfBirth}
                      validators={["required"]}
                      errorMessages={["This field is required"]}
                      onChange={(date) => {
                        this.setState({ relationDateOfBirth: date });
                      }}
                      className="form-control"
                      name="dateofbirth"
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
                      value={this.state.relationDateOfBirth}
                      readOnly
                      validators={["required"]}
                      errorMessages={["This field is required"]}
                    />
                  </div>
                </Col>
                <Col lg={4} md={4} sm={4}>
                  <div className="form-group formbox selectbox">
                    <label>
                      Sex<sup className="redstarText">*</sup>
                    </label>
                    <TextValidator
                      type="select"
                      value={this.state.relationSex}
                      validators={["required"]}
                      errorMessages={["This field is required"]}
                      onChange={(e) => {
                        this.setState({ relationSex: e.target.value });
                      }}
                    >
                      <option value="">Select Sex</option>
                      <option value="MA">Male</option>
                      <option value="FE">Female</option>
                    </TextValidator>
                  </div>
                </Col>
                <Col lg={4} md={4} sm={4}>
                  <div className="form-group formbox">
                    <label className="control-label">
                      {" "}
                      Phone
                      {this.state.relationCallMe ? null : (
                        <sup className="redstarText">*</sup>
                      )}{" "}
                    </label>
                    <PhoneValidator
                      disabled={this.state.relationCallMe}
                      validators={this.state.relationCallMe ? [] : ["required"]}
                      errorMessages={this.state.inputError}
                      value={this.state.relationPhoneNo}
                      onChange={(phone) =>
                        this.setState({ relationPhoneNo: phone })
                      }
                    />
                  </div>
                </Col>
              </Row>

              <Row>
                <Col lg={4} md={4} sm={4}>
                  <div className="form-group formbox">
                    <label className="control-label">
                      {" "}
                      Email{" "}
                      {this.state.relationEmailMe ? null : (
                        <sup className="redstarText">*</sup>
                      )}
                    </label>
                    <TextValidator
                      disabled={this.state.relationEmailMe}
                      name="email"
                      type="email"
                      placeholder="Email"
                      value={this.state.relationEmail}
                      validators={["required" , 'matchRegexp:^([a-zA-Z0-9])(([a-zA-Z0-9])*([\._\+-])*([a-zA-Z0-9]))*@([a-zA-Z0-9])*.(([a-zA-Z]{2,4}?)*((\.)[a-zA-Z]{2,4}?))$']}
                      errorMessages={[
                        "This field is required",
                        "Email is not valid",
                      ]}
                      onChange={(e) => {
                        this.setState({ relationEmail: e.target.value });
                      }}
                    />
                  </div>
                </Col>
                <Col lg={4} md={4} sm={4}>
                  <div className="form-group formbox">
                    <label className="control-label">
                      {" "}
                      Password<sup className="redstarText">*</sup>
                    </label>
                    <TextValidator
                      maxLength="4"
                      name="Password"
                      type="text"
                      pattern="^[0-9]{4}$"
                      placeholder="Password"
                      autoComplete="off"
                      value={this.state.relationPassword}
                      validators={["required"]}
                      errorMessages={["This field is required"]}
                      onChange={(e) => {
                        const re = /^[0-9\b]+$/;
                        if (e.target.value === "" || re.test(e.target.value)) {
                          this.setState({ relationPassword: e.target.value });
                        }
                      }}
                    />
                  </div>
                </Col>
                <Col lg={4} md={4} sm={4}>
                  <div className="form-group formbox">
                    <label>
                      Driving License{" "}
                      {this.state.relationhasDL ? null : (
                        <sup className="redstarText">*</sup>
                      )}
                    </label>
                    <TextValidator
                      disabled={this.state.relationhasDL}
                      type="text"
                      value={this.state.relationDrivingLicence}
                      placeholder="DL Number"
                      validators={this.state.relationhasDL ? [] : ["required"]}
                      errorMessages={["This field is required"]}
                      onChange={(e) => {
                        this.setState({
                          relationDrivingLicence: e.target.value,
                        });
                      }}
                    />
                  </div>
                </Col>
              </Row>

              <Row>
                <Col lg={4} md={4} sm={4}>
                  <div className="form-group formbox ">
                    <label>
                      {" "}
                      DL State{" "}
                      {this.state.relationhasDL ? null : (
                        <sup className="redstarText">*</sup>
                      )}
                    </label>
                    <TextValidator
                      disabled={this.state.relationhasDL}
                      type="select"
                      value={this.state.relationDlState}
                      errorMessages={["This field is required"]}
                      validators={this.state.relationhasDL ? [] : ["required"]}
                      onChange={(e) => {
                        this.setState({ relationDlState: e.target.value });
                      }}
                    >
                      <option>Select State</option>
                      {StateData.map((item) => {
                        return <option>{item.name}</option>;
                      })}
                    </TextValidator>
                  </div>
                </Col>
                <Col lg={4} md={4} sm={4}>
                  <div className="form-group formbox selectbox">
                    <label>
                      {" "}
                      Sample Type<sup className="redstarText">*</sup>
                    </label>
                    <TextValidator
                      type="select"
                      value={this.state.relationSampleType}
                      validators={["required"]}
                      errorMessages={["This field is required"]}
                      onChange={(e) => {
                        this.setState({ relationSampleType: e.target.value });
                      }}
                    >
                      <option>--Select Sample Type--</option>
                      <option value="BS">Buccal Swab</option>
                      <option value="OT">Other</option>
                    </TextValidator>
                  </div>
                </Col>
                {this.state.relationSampleType === "OT" ? (
                  <Col lg={4} md={4} sm={4}>
                    <div className="form-group formbox">
                      <label>
                        {" "}
                        Sample Type<sup className="redstarText">*</sup>
                      </label>
                      <TextValidator
                        errorMessages={["This field is required"]}
                        validators={["required"]}
                        onChange={(e) => {
                          this.setState({
                            relationSampleTypeOther: e.target.value,
                          });
                        }}
                        value={this.state.relationSampleTypeOther}
                        type="text"
                        placeholder="Enter Other"
                      />
                    </div>
                  </Col>
                ) : null}
                <Col lg={4} md={4} sm={4}>
                  <div className="form-group formbox selectbox">
                    <label>
                      Race/Ethnicity<sup className="redstarText">*</sup>
                    </label>
                    <TextValidator
                      type="select"
                      value={this.state.relationRaceEthnicity}
                      validators={["required"]}
                      errorMessages={["This field is required"]}
                      onChange={(e) => {
                        this.setState({
                          relationRaceEthnicity: e.target.value,
                        });
                      }}
                    >
                      <option>--Select Race/Ethnicity--</option>
                      <option>Asian</option>
                      <option>Black</option>
                      <option>Caucasian</option>
                      <option>Hispanic</option>
                      <option>Other</option>
                    </TextValidator>
                  </div>
                </Col>
                {this.state.relationRaceEthnicity === "Other" ? (
                  <Col lg={4} md={4} sm={4}>
                    <div className="form-group formbox">
                      <label>
                        {" "}
                        Race/Ethnicity<sup className="redstarText">*</sup>
                      </label>
                      <TextValidator
                        validators={["required"]}
                        errorMessages={["This field is required"]}
                        type="text"
                        placeholder="Enter Other"
                        value={this.state.relationRaceEthnicityOther}
                        onChange={(e) => {
                          this.setState({
                            relationRaceEthnicityOther: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </Col>
                ) : null}
                <Col lg={4} md={4} sm={4}>
                  <div className="form-group formbox">
                    <label className="control-label">
                      Item to be tested<sup className="redstarText">*</sup>{" "}
                    </label>
                    <TextValidator
                      name="testedname"
                      type="text"
                      value={this.state.testedname}
                      placeholder="Item Name"
                      validators={["required","trim"]}
                      errorMessages={["This field is required","Can not be Empty"]}
                      onChange={(e) => {
                        this.setState({
                          testedname: e.target.value,
                        });
                      }}
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg={4} md={8} sm={8}>
                  <div className="form-group formbox">
                    <div className="form-check">
                      <label className="form-check-label">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="optionscheckbox"
                          value=""
                          onChange={(e) => {
                            this.setState({
                              relationEmailMe: !this.state.relationEmailMe,
                            });
                          }}
                        />{" "}
                        I prefer to pick up the results. Do not email me.
                        <i className="input-helper"></i>
                      </label>
                    </div>
                  </div>
                  <div className="form-group formbox">
                    <div className="form-check">
                      <label className="form-check-label">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="optionscheckbox"
                          value=""
                          onChange={(e) => {
                            this.setState({
                              relationCallMe: !this.state.relationCallMe,
                            });
                          }}
                        />{" "}
                        Do not call me
                        <i className="input-helper"></i>
                      </label>
                    </div>
                  </div>
                  <div className="form-group formbox">
                    <div className="form-check">
                      <label className="form-check-label">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="optionscheckbox"
                          value={this.state.relationhasDL}
                          onChange={(value) => {
                            if (this.state.relationhasDL === false) {
                              this.setState({
                                relationhasDL: true,
                                motherisdl: true,
                              });
                            } else {
                              this.setState({
                                relationhasDL: false,
                                motherisdl: false,
                              });
                            }
                          }}
                        />{" "}
                        I do not have a driver license or a state ID
                        <i className="input-helper"></i>
                      </label>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
            <div className="consortium-section-outer formsteps bottom-bordernone">
              <h3>Additional Items</h3>
              {this.state.additionalItems.map((val, idx) => (
                <div className="multiple-persons-outer">
                  <Row>
                    <Col lg={4} md={4} sm={4}>
                      <div className="form-group formbox">
                        <label className="control-label">
                          Item to be tested{" "}
                        </label>
                        <TextValidator
                          name="name"
                          type="text"
                          value={this.state.additionalItems[idx].name}
                          placeholder="Item Name"
                          validators={["required"]}
                          errorMessages={["This field is required"]}
                          data-id={idx}
                          onChange={(e) => {
                            let additionalItems = [
                              ...this.state.additionalItems,
                            ];
                            additionalItems[e.target.dataset.id][
                              e.target.name
                            ] = e.target.value;
                            this.setState({
                              additionalItems,
                            });
                          }}
                        />
                      </div>
                    </Col>
                    <Col lg={7} md={1} sm={1}></Col>
                    <Col lg={1} md={1} sm={1}>
                      <div className="addplus-box add-additional right-deleteicon clearfix">
                        <Button
                          data-id={idx}
                          onClick={(e) => {
                            let additionalItems = [
                              ...this.state.additionalItems,
                            ];
                            additionalItems.splice(e.target.dataset.id, 1);
                            this.setState({
                              additionalItems,
                            });
                          }}
                          style={{
                            marginTop: 23,
                            backgroundColor: "transparent",
                            borderColor: "transparent",
                          }}
                        >
                          {" "}
                          <i className="mdi mdi-delete" />
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </div>
              ))}
            </div>
            <div className="addplus-box add-additional clearfix margin-bottom20">
              <Button className="plus-iconbtn" onClick={this.addAdditionalItem}>
                {" "}
                <i className="mdi mdi-plus" />
              </Button>
              <h4>Add Additional Items</h4>
            </div>
            <div className="individual-section">
              <div className="form-group formbox clearfix">
                <label>
                  <sup className="redstarText">*</sup>Have any of the
                  individuals sampled undergone a blood cell transfusion or
                  stem/bone marrow transplant?
                </label>
                <Row>
                  <Col lg={4} md={4} sm={4}>
                    <div className="sex-radiobox margin-top20">
                      <div className="form-check">
                        <label className="form-check-label">
                          <input
                            type="radio"
                            className="form-check-input"
                            name="optionsRadiosN"
                            value="No"
                            onChange={(value) => {
                              this.setState({
                                radioValue: value,
                                hasTransplant: false,
                              });
                            }}
                          />{" "}
                          No
                          <i className="input-helper"></i>
                        </label>
                      </div>
                      <div className="form-check">
                        <label className="form-check-label">
                          <input
                            type="radio"
                            className="form-check-input"
                            name="optionsRadiosN"
                            value="Yes"
                            onChange={(value) => {
                              this.setState({
                                radioValue: value,
                                hasTransplant: true,
                              });
                            }}
                          />{" "}
                          Yes
                          <i className="input-helper"></i>
                        </label>
                      </div>
                    </div>
                  </Col>
                  {this.state.hasTransplant === true ? (
                    <Col lg={4} md={4} sm={4}>
                      <div className="form-group formbox">
                        <label>
                          {" "}
                          Which Party?<sup className="redstarText">*</sup>
                        </label>
                        <input
                          type="text"
                          placeholder=" Which Party?"
                          value={this.state.party}
                          onChange={(e) => {
                            this.setState({ party: e.target.value });
                          }}
                        />
                      </div>
                    </Col>
                  ) : null}
                  {this.state.hasTransplant === true ? (
                    <Col lg={4} md={4} sm={4}>
                      <div className="form-group formbox">
                        <label>
                          When?<sup className="redstarText">*</sup>
                        </label>
                        <DatePicker
                          placeholderText="Select a date"
                          selected={this.state.transplantDate}
                          onChange={this.handleTransplantDateChange}
                          className="form-control"
                          name="transplantDate"
                          placeholder="When?"
                          dateFormat="MM/dd/yyyy"
                          peekNextMonth
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                        />
                      </div>
                    </Col>
                  ) : null}
                </Row>
                <Row>
                  <Col lg={4} md={4} sm={4}>
                    <TextValidator
                      name="hasTransplant"
                      type="hidden"
                      value={this.state.hasTransplant}
                      placeholder="hasTransplant"
                      validators={["required"]}
                      errorMessages={["This field is required"]}
                    />
                  </Col>
                </Row>
                <div className="following-address">
                  <label className="margin-bottom10">
                    Additional Testing (Select all that apply)
                    <sup className="redstarText">*</sup>
                  </label>
                  <Row>
                    <Col lg={3} md={3} sm={3}>
                      <div className="form-check">
                        <label className="form-check-label">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            name="optionsCheck"
                            value=""
                            onChange={(value) => {
                              this.setState({
                                testing: false,
                                semenDetection: !this.state.semenDetection,
                              });
                            }}
                          />{" "}
                          Semen detection
                          <i className="input-helper"></i>
                        </label>
                      </div>
                    </Col>
                    <Col lg={3} md={3} sm={3}>
                      <div className="form-check">
                        <label className="form-check-label">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            name="optionsCheck"
                            value=""
                            onChange={(value) => {
                              this.setState({
                                testing: false,
                                ystr: !this.state.ystr,
                              });
                            }}
                          />{" "}
                          Y-STR
                          <i className="input-helper"></i>
                        </label>
                      </div>
                    </Col>
                    <Col lg={3} md={3} sm={3}>
                      <div className="form-check">
                        <label className="form-check-label">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            name="optionsCheck"
                            value=""
                            onChange={(value) => {
                              this.setState({
                                salivaDetection: !this.state.salivaDetection,
                              });
                            }}
                          />
                          Salvia detection
                          <i className="input-helper"></i>
                        </label>
                      </div>
                    </Col>

                    <Col lg={3} md={3} sm={3}>
                      <div className="form-check">
                        <label className="form-check-label">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            name="optionsCheck"
                            value=""
                            onChange={(value) => {
                              this.setState({ testing: true });
                            }}
                          />{" "}
                          Other (Specify)
                          <i className="input-helper"></i>
                        </label>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={4} md={4} sm={4}>
                      {this.state.testing ? (
                        <div className="form-group formbox">
                          <label>
                            {" "}
                            Other<sup className="redstarText">*</sup>
                          </label>
                          <input
                            type="text"
                            placeholder="Enter Other"
                            value={this.state.email}
                      validators={["required","trim"]}
                      errorMessages={[
                        "This field is required",
                        "Please Enter valid value",
                      ]}
                            value={this.state.otherTest}
                            onChange={(e) => {
                              this.setState({ otherTest: e.target.value });
                            }}
                          />
                        </div>
                      ) : null}
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
            <div className="bottom-btn-group pull-right clearfix">
              <button type="submit" className="bluebg margin-right10">
                Save
              </button>
              {/* <button type="submit" className="bluebg margin-right10"> Print </button>
                            <button type="submit" className="bluebg "> Next </button> */}
            </div>
          </div>
        </ValidatorForm>
      </React.Fragment>
    );
  }
}

export default InfidelityOther;
