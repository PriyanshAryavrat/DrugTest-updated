import React from "react";
import "./index.css";
import { Redirect } from "react-router-dom";
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

class SibblingShipOther extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phoneNumber: "",
      email: "",
      driversLicense: "",
      dateofbirth: "",
      child2dateofbirth: "",
      motherdateofbirth: "",
      childdateofbirth: "",
      dob: "",
      siblingship: null,
      sampleType: "",
      sex: "",
      raceEthnicity: "",
      password: "",
      tabIndex: 0,
      inputError: "This field is required",
      dateRead: false,
      motherdateRead: false,
      relationdateRead: false,
      childdateRead: false,
      inputRead: true,
      mother: false,
      mother2: false,
      child: false,
      additionalPerson: false,
      phoneNo: "",
      additionalPersonName: "",
      childAge: false,
      childs: true,
      child1: true,
      fullvshalf: false,
      fullvsunrelated: false,
      halfvsunrelatedd: false,
      sibblingType: false,
      hasTransplant: false,
      additionalPersonName: "",
      childAge: false,
      motherpassword: "",
      childpassword: "",
      relationpassword: "",
      childEmailme: false,
      childCallme: false,
      childdateRead: false,
      child2Emailme: false,
      child2Callme: false,
      child2dateRead: false,
      motherEmailme: false,
      motherCallme: false,
      motherisDl: false,
      fatherDlState: "California",
      motherDlState: "California",
      mother2DlState: "California",
      childDlState: "California",
      child2DlState: "California",
      dlState: "California",
      ap: [],
      relationEmailme: false,
      relationCallme: false,
      mother2Callme: false,
      mother2Emailme: false,
      mother2dateRead: false,
      relationship: null,
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
        childAged: true,
      });
    } else if (age < 18) {
      this.setState({
        childAged: false,
      });
    }
  };

  handleChanged = (date) => {
    this.setState({
      child2dateofbirth: date,
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

  handleChange = (date) => {
    this.setState({
      dateofbirth: date,
    });
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
      siblingship: this.state.siblingship,
      allegedMother: {
        firstName: this.state.motherFirstName,
        middleName: this.state.motherMiddleName,
        lastName: this.state.motherLastName,
        dob: this.state.motherdateofbirth,
        gender: this.state.mothersex,
        password: this.state.motherpassword,
        phone: this.state.motherCallme ? "" : this.state.motherphoneNo,
        email: this.state.motherEmailme ? "" : this.state.motheremail,
        drivingLicence: this.state.motherdateRead ? "" : this.state.motherdrivingLicence,
        dlState: this.state.motherdateRead ? "" : this.state.motherDlState,
        sampleType: this.state.mothersampleType,
        sampleTypeOther: this.state.mothersampleTypeOther,
        race: this.state.motherraceEthnicity,
        raceOther: this.state.motherraceEthnicityOther,
        pickupPreference: this.state.motherEmailme,
        allowCall: this.state.motherCallme,
        hasDL: this.state.motherisdl
      },
      mother2: {
        firstName: this.state.mother2FirstName,
        middleName: this.state.mother2MiddleName,
        lastName: this.state.mother2LastName,
        dob: this.state.mother2dateofbirth,
        gender: this.state.mother2sex,
        password: this.state.mother2password,
        phone: this.state.mother2Callme ? "" : this.state.mother2phoneNo,
        email: this.state.mother2Emailme ? "" : this.state.mother2email,
        drivingLicence: this.state.mother2dateRead ? "" : this.state.mother2drivingLicence,
        dlState: this.state.mother2dateRead ? "" : this.state.mother2DlState,
        sampleType: this.state.mother2sampleType,
        sampleTypeOther: this.state.mother2sampleTypeOther,
        race: this.state.mother2raceEthnicity,
        raceOther: this.state.mother2raceEthnicityOther,
        pickupPreference: this.state.mother2Emailme,
        allowCall: this.state.mother2Callme,
        hasDL: this.state.mother2isdl
      },
      child1: {
        firstName: this.state.childFirstName,
        middleName: this.state.childMiddleName,
        lastName: this.state.childLastName,
        dob: this.state.childdateofbirth,
        gender: this.state.childsex,
        password: this.state.childpassword,
        phone: this.state.childCallme ? "" : this.state.childphoneNo,
        email: this.state.childEmailme ? "" : this.state.childemail,
        drivingLicence: this.state.childdateRead ? "" : this.state.childdrivingLicence,
        dlState: this.state.childdateRead ? "" : this.state.childDlState,
        sampleType: this.state.childsampleType,
        sampleTypeOther: this.state.childsampleTypeOther,
        race: this.state.childraceEthnicity,
        raceOther: this.state.childraceEthnicityOther,
        pickupPreference: this.state.childEmailme,
        allowCall: this.state.childCallme,
        hasDL: this.state.childdateRead,
      },
      child2: {
        firstName: this.state.child2FirstName,
        middleName: this.state.child2MiddleName,
        lastName: this.state.child2LastName,
        dob: this.state.child2dateofbirth,
        gender: this.state.child2sex,
        password: this.state.child2password,
        phone: this.state.child2Callme ? "" : this.state.child2phoneNo,
        email: this.state.child2Emailme ? "" : this.state.child2email,
        drivingLicence: this.state.child2dateRead ? "" : this.state.child2drivingLicence,
        dlState: this.state.child2dateRead ? "" : this.state.child2DlState,
        sampleType: this.state.child2sampleType,
        sampleTypeOther: this.state.childs2ampleTypeOther,
        race: this.state.child2raceEthnicity,
        raceOther: this.state.child2raceEthnicityOther,
        pickupPreference: this.state.child2Emailme,
        allowCall: this.state.child2Callme,
        hasDL: this.state.child2dateRead,
      },
      additionalPersons: this.state.ap,
      bloodCellTransfusion: {
        status: this.state.hasTransplant,
        party: this.state.hasTransplant ? this.state.party : null,
        when: this.state.hasTransplant ? this.state.transplantDate : null,
      },
    };
    if (this.state.mother == false) {
      formData.allegedMother = {};
    }
    if (this.state.mother2 == false) {
      formData.mother2 = {};
    }
    if (this.state.child1 == false) {
      formData.child1 = {};
    }
    if (this.state.child2 == false) {
      formData.child2 = {};
    }
    axios
      .post(apiPath.save_sibblingship_form, formData, {
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
          this.setState({ redirectTo: "/pdf/Siblingship/" + res.data.data.formId });

          //  this.setState({ redirectTo: "/customer" });
        }, 2000);
      });
  };

  addAdditionalPerson = (e) => {
    this.setState((prevState) => ({
      ap: [
        ...prevState.ap,
        {
          relation: "",
          firstName: "",
          middleName: "",
          lastName: "",
          name: "",
          dob: "",
          gender: "",
          phone: "",
          email: "",
          password: "",
          drivingLicence: "",
          dlState: "California",
          sampleType: "",
          sampleTypeOther: "",
          race: "",
          raceOther: "",
          pickupPreference: false,
          allowCall: false,
          hasDL: false,
          additionalPersonMiddleName: "",
          additionalPersonLastName: "",
          relationdateRead: false,
          relationEmailme: false,
          relationCallme: false
        },
      ],
    }));
  };

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo} />;
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
                      validators={["required"]}
                      errorMessages={this.state.inputError}
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
                    <label>
                      Driving License<sup className="redstarText">*</sup>
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

            <div className="consortium-section-outer formsteps margin-bottom20">
              <h3>Relationship</h3>
              <Row className="margin-bottom20">
                <Col lg={3} md={4} sm={6}>
                  <div className="form-group formbox">
                    <label>
                      Please Select One<sup className="redstarText">*</sup>
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
                    <Col lg={6} md={6} sm={6}>
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
              <Row className="margin-bottom20">
                <Col lg={3} md={4} sm={6}>
                  <div className="form-group formbox">
                    <label>
                      Siblingship<sup className="redstarText">*</sup>
                    </label>
                    <TextValidator
                      name="siblingship"
                      type="hidden"
                      value={this.state.siblingship}
                      validators={["required"]}
                      errorMessages={["This field is required"]}
                    />
                  </div>
                </Col>
                <Col lg={9} md={8} sm={12}>
                  <Row>
                    <Col lg={3} md={6} sm={4}>
                      <div className="form-group formbox">
                        <div className="form-check">
                          <label className="form-check-label">
                            <input
                              type="radio"
                              checked={this.state.fullvsunrelated}
                              className="form-check-input"
                              name="optionsRadios6"
                              onChange={(e) => {
                                this.setState({
                                  siblingship: "Full vs Half",
                                  sibblingType: false,
                                  fullvsunrelated: true,
                                  fullvshalf: false,
                                  halfvsunrelatedd: false,
                                });
                              }}
                            />{" "}
                            Full vs Half
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </div>
                    </Col>
                    <Col lg={3} md={6} sm={4}>
                      <div className="form-group formbox">
                        <div className="form-check">
                          <label className="form-check-label">
                            <input
                              type="radio"
                              checked={this.state.fullvshalf}
                              className="form-check-input"
                              name="optionsRadios6"
                              value="full vs unrelated"
                              onChange={(e) => {
                                this.setState({
                                  siblingship: "Half vs Unrelated",
                                  sibblingType: false,
                                  fullvsunrelated: false,
                                  fullvshalf: true,
                                  halfvsunrelatedd: false,
                                  sibblingship: e.target.value,
                                });
                              }}
                            />{" "}
                            Half vs Unrelated
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </div>
                    </Col>
                    <Col lg={3} md={6} sm={4}>
                      <div className="form-group formbox">
                        <div className="form-check">
                          <label className="form-check-label">
                            <input
                              type="radio"
                              checked={this.state.halfvsunrelatedd}
                              className="form-check-input"
                              name="optionsRadios6"
                              value="full vs half"
                              onChange={(e) => {
                                this.setState({
                                  siblingship: "Twins",
                                  sibblingType: false,
                                  fullvsunrelated: false,
                                  fullvshalf: false,
                                  halfvsunrelatedd: true,
                                });
                              }}
                            />{" "}
                            Twins
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                {this.state.sibblingType ? (
                  <Col lg={3} md={4} sm={6}>
                    <div className="form-group formbox">
                      <label> Other</label>
                      <input
                        value=""
                        type="text"
                        placeholder="Enter Other"
                        onChange={(e) => {
                          this.setState({
                            sibblingship: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </Col>
                ) : null}
              </Row>
              <Row>
                <Col lg={3} md={4} sm={12}>
                  <div className="form-group formbox">
                    <label>
                      Relationship<sup className="redstarText">*</sup>
                    </label>
                    {!this.state.child && !this.state.child1 && !this.state.allegedMother && !this.state.mother2 &&
                      <TextValidator
                        name="child"
                        type="hidden"
                        value={null}
                        placeholder="child"
                        validators={["required"]}
                        errorMessages={["This field is required"]}
                      />}
                  </div>
                </Col>
                <Col lg={9} md={8} sm={12}>
                  <Row>
                    <Col lg={3} md={6} sm={3}>
                      <div className="form-group formbox">
                        <div className="form-check">
                          <label className="form-check-label">
                            <input
                              type="checkbox"
                              checked={this.state.child1}
                              className="form-check-input"
                              name="optionscheckbox"
                              value=""
                              onChange={(e) => {
                                this.setState({
                                  child1: !this.state.child1,
                                  childAge1: false,
                                });
                              }}
                            />{" "}
                            Child1
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </div>
                    </Col>
                    <Col lg={3} md={6} sm={3}>
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
                                  child: !this.state.child,
                                  childAge: false,
                                });
                              }}
                            />{" "}
                            Child2
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </div>
                    </Col>
                    <Col lg={3} md={6} sm={3}>
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
                                  mother: !this.state.mother,
                                });
                              }}
                            />{" "}
                            Mother1
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </div>
                    </Col>
                    <Col lg={3} md={6} sm={3}>
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
                                  mother2: !this.state.mother2,
                                });
                              }}
                            />{" "}
                            Mother2
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>

            {this.state.child1 && this.state.childAged ? (
              <div className="consortium-section-outer formsteps bottom-bordernone">
                <h3>Child 1</h3>
                <Row>
                  <Col lg={4} md={4} sm={4}>
                    <div className="form-group formbox">
                      <label className="control-label">
                        First Name<sup className="redstarText">*</sup>
                      </label>
                      <TextValidator
                        name="name"
                        type="text"
                        value={this.state.childFirstName}
                        placeholder="First Name"
                        validators={["required"]}
                        errorMessages={["This field is required"]}
                        onChange={(e) => {
                          let value = e.target.value;
                          value = value.replace(/[^A-Za-z\s]/gi, "");
                          this.setState({
                            childFirstName: value,
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
                        value={this.state.childMiddleName}
                        placeholder="Middle Name"
                        onChange={(e) => {
                          let value = e.target.value;
                          value = value.replace(/[^A-Za-z\s]/gi, "");
                          this.setState({
                            childMiddleName: value,
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
                        value={this.state.childLastName}
                        placeholder="Last Name"
                        validators={["required"]}
                        errorMessages={["This field is required"]}
                        onChange={(e) => {
                          let value = e.target.value;
                          value = value.replace(/[^A-Za-z\s]/gi, "");
                          this.setState({
                            childLastName: value,
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
                        selected={this.state.childdateofbirth}
                        onChange={(date) => {
                          this.setState({
                            childdateofbirth: date
                          })
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
                        value={this.state.childdateofbirth}
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
                        value={this.state.childsex}
                        validators={["required"]}
                        errorMessages={["This field is required"]}
                        onChange={(e) => {
                          this.setState({ childsex: e.target.value });
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
                        Phone{this.state.childCallme ? null : (<sup className="redstarText">*</sup>)}
                      </label>
                      <PhoneValidator
                        disabled={this.state.childCallme}
                        validators={this.state.childCallme ? [] : ["required"]}
                        errorMessages={this.state.inputError}
                        value={this.state.childphoneNo}
                        onChange={(phone) =>
                          this.setState({ childphoneNo: phone })
                        }
                      />
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col lg={4} md={4} sm={4}>
                    <div className="form-group formbox">
                      <label className="control-label"> Email {this.state.childEmailme ? null : (<sup className="redstarText">*</sup>)}</label>
                      <TextValidator
                        disabled={this.state.childEmailme}
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={this.state.childemail}
                        validators={this.state.childEmailme ? ["isEmail"] : ["required", "isEmail"]}
                        errorMessages={this.state.childEmailme ? [
                          "Email is not valid",
                        ] : [
                            "This field is required",
                            "Email is not valid",
                          ]}
                        onChange={(e) => {
                          this.setState({ childemail: e.target.value });
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
                        value={this.state.childpassword}
                        validators={["required"]}
                        errorMessages={["This field is required"]}
                        onChange={(e) => {
                          const re = /^[0-9\b]+$/;
                          if (
                            e.target.value === "" ||
                            re.test(e.target.value)
                          ) {
                            this.setState({ childpassword: e.target.value });
                          }
                        }}
                      />
                    </div>
                  </Col>
                  <Col lg={4} md={4} sm={4}>
                    <div className="form-group formbox">
                      <label>Driving License{this.state.childdateRead ? null : (<sup className="redstarText">*</sup>)}</label>
                      <TextValidator
                        disabled={this.state.childdateRead}
                        type="text"
                        disabled={this.state.childdateRead}
                        validators={this.state.childdateRead ? [] : ["required"]}
                        placeholder="DL Number"
                        value={this.state.childdrivingLicence}
                        errorMessages={["This field is required"]}
                        onChange={(e) => {
                          this.setState({
                            childdrivingLicence: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col lg={4} md={4} sm={4}>
                    <div className="form-group formbox ">
                      <label>DL State{this.state.childdateRead ? null : (<sup className="redstarText">*</sup>)}</label>
                      <TextValidator
                        disabled={this.state.childdateRead}
                        validators={this.state.childdateRead ? [] : ["required"]}
                        errorMessages={["This field is required"]}
                        type="select"
                        value={this.state.childDlState}
                        onChange={(e) => {
                          this.setState({ childDlState: e.target.value });
                        }}
                      >
                        <option>Select State</option>
                        {StateData.map((item) => {
                          return <option key={item.name}>{item.name}</option>;
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
                        value={this.state.childsampleType}
                        validators={["required"]}
                        errorMessages={["This field is required"]}
                        onChange={(e) => {
                          this.setState({ childsampleType: e.target.value });
                        }}
                      >
                        <option>--Select Sample Type--</option>
                        <option value="BS">Buccal Swab</option>
                        <option value="OT">Other</option>
                      </TextValidator>
                    </div>
                  </Col>

                  {this.state.childsampleType === "OT" ? (
                    <Col lg={4} md={4} sm={4}>
                      <div className="form-group formbox">
                        <label>
                          {" "}
                          Sample Type<sup className="redstarText">*</sup>
                        </label>
                        <TextValidator
                          validators={["required"]}
                          errorMessages={this.state.inputError}
                          value={this.state.childsampleTypeOther}
                          onChange={(e) => {
                            this.setState({
                              childsampleTypeOther: e.target.value,
                            });
                          }}
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
                        value={this.state.childraceEthnicity}
                        validators={["required"]}
                        errorMessages={["This field is required"]}
                        onChange={(e) => {
                          this.setState({
                            childraceEthnicity: e.target.value,
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
                  {this.state.childraceEthnicity === "Other" ? (
                    <Col lg={4} md={4} sm={4}>
                      <div className="form-group formbox">
                        <label>
                          {" "}
                          Race/Ethnicity<sup className="redstarText">*</sup>
                        </label>
                        <TextValidator
                          validators={["required"]}
                          errorMessages={["This field is required"]}
                          value={this.state.childraceEthnicityOther}
                          onChange={(e) => {
                            this.setState({
                              childraceEthnicityOther: e.target.value,
                            });
                          }}
                          type="text"
                          placeholder="Enter Other"
                        />
                      </div>
                    </Col>
                  ) : null}
                </Row>

                <Row>
                  <Col lg={4} md={4} sm={4}>
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
                                childEmailme: !this.state.childEmailme,
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
                                childCallme: !this.state.childCallme,
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
                            value={this.state.childdateRead}
                            onChange={(value) => {
                              if (this.state.childdateRead === false) {
                                this.setState({
                                  childdateRead: true,
                                });
                              } else {
                                this.setState({
                                  childdateRead: false,
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
            ) : null}
            {this.state.child1 && !this.state.childAged ? (
              <div className="consortium-section-outer formsteps bottom-bordernone">
                <h3>Child 1</h3>
                <Row>
                  <Col lg={4} md={4} sm={4}>
                    <div className="form-group formbox">
                      <label className="control-label">
                        First Name<sup className="redstarText">*</sup>
                      </label>
                      <TextValidator
                        name="name"
                        type="text"
                        value={this.state.childFirstName}
                        placeholder="First Name"
                        validators={["required"]}
                        errorMessages={["This field is required"]}
                        onChange={(e) => {
                          let value = e.target.value;
                          value = value.replace(/[^A-Za-z\s]/gi, "");
                          this.setState({
                            childFirstName: value,
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
                        value={this.state.childMiddleName}
                        placeholder="Name"
                        onChange={(e) => {
                          let value = e.target.value;
                          value = value.replace(/[^A-Za-z\s]/gi, "");
                          this.setState({
                            childMiddleName: value,
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
                        value={this.state.childLastName}
                        placeholder="Last Name"
                        validators={["required"]}
                        errorMessages={["This field is required"]}
                        onChange={(e) => {
                          let value = e.target.value;
                          value = value.replace(/[^A-Za-z\s]/gi, "");
                          this.setState({
                            childLastName: value,
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
                        selected={this.state.childdateofbirth}
                        onChange={this.handleChanges}
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
                        value={this.state.childdateofbirth}
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
                        value={this.state.childsex}
                        validators={["required"]}
                        errorMessages={["This field is required"]}
                        onChange={(e) => {
                          this.setState({ childsex: e.target.value });
                        }}
                      >
                        <option value="">Select Sex</option>
                        <option value="MA">Male</option>
                        <option value="FE">Female</option>
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
                        value={this.state.childsampleType}
                        validators={["required"]}
                        errorMessages={["This field is required"]}
                        onChange={(e) => {
                          this.setState({ childsampleType: e.target.value });
                        }}
                      >
                        <option>--Select Sample Type--</option>
                        <option value="BS">Buccal Swab</option>
                        <option value="OT">Other</option>
                      </TextValidator>
                    </div>
                  </Col>
                </Row>
                <Row>
                  {this.state.childsampleType === "OT" ? (
                    <Col lg={4} md={4} sm={4}>
                      <div className="form-group formbox">
                        <label>
                          {" "}
                          Sample Type<sup className="redstarText">*</sup>
                        </label>
                        <TextValidator
                          validators={["required"]}
                          errorMessages={this.state.inputError}
                          value={this.state.childsampleTypeOther}
                          onChange={(e) => {
                            this.setState({
                              childsampleTypeOther: e.target.value,
                            });
                          }}
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
                        value={this.state.childraceEthnicity}
                        validators={["required"]}
                        errorMessages={["This field is required"]}
                        onChange={(e) => {
                          this.setState({
                            childraceEthnicity: e.target.value,
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
                  {this.state.childraceEthnicity === "Other" ? (
                    <Col lg={4} md={4} sm={4}>
                      <div className="form-group formbox">
                        <label>
                          {" "}
                          Race/Ethnicity<sup className="redstarText">*</sup>
                        </label>
                        <TextValidator
                          validators={["required"]}
                          errorMessages={["This field is required"]}
                          value={this.state.childraceEthnicityOther}
                          onChange={(e) => {
                            this.setState({
                              childraceEthnicityOther: e.target.value,
                            });
                          }}
                          type="text"
                          placeholder="Enter Other"
                        />
                      </div>
                    </Col>
                  ) : null}
                </Row>
              </div>
            ) : null}
            {this.state.mother ? (
              <div className="consortium-section-outer formsteps bottom-bordernone">
                <h3>Mother</h3>
                <Row>
                  <Col lg={4} md={4} sm={4}>
                    <div className="form-group formbox">
                      <label className="control-label">
                        First Name<sup className="redstarText">*</sup>
                      </label>
                      <TextValidator
                        name="name"
                        type="text"
                        value={this.state.motherFirstName}
                        placeholder="First Name"
                        validators={["required"]}
                        errorMessages={["This field is required"]}
                        onChange={(e) => {
                          let value = e.target.value;
                          value = value.replace(/[^A-Za-z\s]/gi, "");
                          this.setState({
                            motherFirstName: value,
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
                        value={this.state.motherMiddleName}
                        placeholder="Middle Name"
                        onChange={(e) => {
                          let value = e.target.value;
                          value = value.replace(/[^A-Za-z\s]/gi, "");
                          this.setState({
                            motherMiddleName: value,
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
                        value={this.state.motherLastName}
                        placeholder="Last Name"
                        validators={["required"]}
                        errorMessages={["This field is required"]}
                        onChange={(e) => {
                          let value = e.target.value;
                          value = value.replace(/[^A-Za-z\s]/gi, "");
                          this.setState({
                            motherLastName: value,
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
                        selected={this.state.motherdateofbirth}
                        onChange={(date) => {
                          this.setState({
                            motherdateofbirth: date
                          })
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
                        value={this.state.motherdateofbirth}
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
                        value={this.state.mothersex}
                        validators={["required"]}
                        errorMessages={["This field is required"]}
                        onChange={(e) => {
                          this.setState({ mothersex: e.target.value });
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
                        Phone{this.state.motherCallme ? null : (<sup className="redstarText">*</sup>)}
                      </label>
                      <PhoneValidator
                        disabled={this.state.motherCallme}
                        validators={this.state.motherCallme ? [] : ["required"]}
                        errorMessages={this.state.inputError}
                        value={this.state.motherphoneNo}
                        onChange={(phone) =>
                          this.setState({ motherphoneNo: phone })
                        }
                      />
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col lg={4} md={4} sm={4}>
                    <div className="form-group formbox">
                      <label className="control-label"> Email {this.state.motherEmailme ? null : (<sup className="redstarText">*</sup>)}</label>
                      <TextValidator
                        name="email"
                        type="email"
                        placeholder="Email"
                        disabled={this.state.motherEmailme}
                        value={this.state.motheremail}
                        validators={this.state.motherEmailme ? ["isEmail"] : ["required", "isEmail"]}
                        errorMessages={this.state.motherEmailme ? [
                          "Email is not valid",
                        ] : [
                            "This field is required",
                            "Email is not valid",
                          ]}
                        onChange={(e) => {
                          this.setState({ motheremail: e.target.value });
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
                        value={this.state.motherpassword}
                        validators={["required"]}
                        errorMessages={["This field is required"]}
                        onChange={(e) => {
                          const re = /^[0-9\b]+$/;
                          if (
                            e.target.value === "" ||
                            re.test(e.target.value)
                          ) {
                            this.setState({ motherpassword: e.target.value });
                          }
                        }}
                      />
                    </div>
                  </Col>
                  <Col lg={4} md={4} sm={4}>
                    <div className="form-group formbox">
                      <label>Driving License {this.state.motherdateRead ? null : (<sup className="redstarText">*</sup>)}</label>
                      <TextValidator
                        disabled={this.state.motherdateRead}
                        type="text"
                        value={this.state.motherdrivingLicence}
                        placeholder="DL Number"
                        validators={this.state.motherdateRead ? [] : ["required"]}
                        errorMessages={["This field is required"]}
                        onChange={(e) => {
                          this.setState({
                            motherdrivingLicence: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col lg={4} md={4} sm={4}>
                    <div className="form-group formbox ">
                      <label> DL State {this.state.motherdateRead ? null : (<sup className="redstarText">*</sup>)}</label>
                      <TextValidator
                        disabled={this.state.motherdateRead}
                        validators={this.state.motherdateRead ? [] : ["required"]}
                        errorMessages={["This field is required"]}
                        type="select"
                        value={this.state.motherDlState}
                        onChange={(e) => {
                          this.setState({ motherDlState: e.target.value });
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
                        value={this.state.mothersampleType}
                        validators={["required"]}
                        errorMessages={["This field is required"]}
                        onChange={(e) => {
                          this.setState({ mothersampleType: e.target.value });
                        }}
                      >
                        <option>--Select Sample Type--</option>
                        <option value="BS">Buccal Swab</option>
                        <option value="OT">Other</option>
                      </TextValidator>
                    </div>
                  </Col>
                  {this.state.mothersampleType === "OT" ? (
                    <Col lg={4} md={4} sm={4}>
                      <div className="form-group formbox">
                        <label>
                          {" "}
                          Sample Type<sup className="redstarText">*</sup>
                        </label>
                        <TextValidator
                          validators={["required"]}
                          errorMessages={this.state.inputError}
                          value={this.state.mothersampleTypeOther}
                          onChange={(e) => {
                            this.setState({
                              mothersampleTypeOther: e.target.value,
                            });
                          }}
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
                        value={this.state.motherraceEthnicity}
                        validators={["required"]}
                        errorMessages={["This field is required"]}
                        onChange={(e) => {
                          this.setState({
                            motherraceEthnicity: e.target.value,
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

                  {this.state.motherraceEthnicity === "Other" ? (
                    <Col lg={4} md={4} sm={4}>
                      <div className="form-group formbox">
                        <label>
                          {" "}
                          Race/Ethnicity<sup className="redstarText">*</sup>
                        </label>
                        <TextValidator
                          validators={["required"]}
                          errorMessages={["This field is required"]}
                          value={this.state.motherraceEthnicityOther}
                          onChange={(e) => {
                            this.setState({
                              motherraceEthnicityOther: e.target.value,
                            });
                          }}
                          type="text"
                          placeholder="Enter Other"
                        />
                      </div>
                    </Col>
                  ) : null}
                </Row>
                <Row>
                  <Col lg={4} md={4} sm={4}>
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
                                motherEmailme: !this.state.motherEmailme,
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
                                motherCallme: !this.state.motherCallme,
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
                            value={this.state.dateRead}
                            onChange={(value) => {
                              if (this.state.motherdateRead === false) {
                                this.setState({
                                  motherdateRead: true,
                                });
                              } else {
                                this.setState({
                                  motherdateRead: false,
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
            ) : null}
            {this.state.mother2 ? (
              <div className="consortium-section-outer formsteps bottom-bordernone">
                <h3>Mother 2</h3>
                <Row>
                  <Col lg={4} md={4} sm={4}>
                    <div className="form-group formbox">
                      <label className="control-label">
                        First Name<sup className="redstarText">*</sup>
                      </label>
                      <TextValidator
                        name="name"
                        type="text"
                        value={this.state.mother2FirstName}
                        placeholder="First Name"
                        validators={["required"]}
                        errorMessages={["This field is required"]}
                        onChange={(e) => {
                          let value = e.target.value;
                          value = value.replace(/[^A-Za-z\s]/gi, "");
                          this.setState({
                            mother2FirstName: value,
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
                        value={this.state.mother2MiddleName}
                        placeholder="Middle Name"
                        onChange={(e) => {
                          let value = e.target.value;
                          value = value.replace(/[^A-Za-z\s]/gi, "");
                          this.setState({
                            mother2MiddleName: value,
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
                        value={this.state.mother2LastName}
                        placeholder="Last Name"
                        validators={["required"]}
                        errorMessages={["This field is required"]}
                        onChange={(e) => {
                          let value = e.target.value;
                          value = value.replace(/[^A-Za-z\s]/gi, "");
                          this.setState({
                            mother2LastName: value,
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
                        selected={this.state.mother2dateofbirth}
                        onChange={(date) => {
                          this.setState({
                            mother2dateofbirth: date
                          })
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
                        value={this.state.mother2dateofbirth}
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
                        value={this.state.mother2sex}
                        validators={["required"]}
                        errorMessages={["This field is required"]}
                        onChange={(e) => {
                          this.setState({ mother2sex: e.target.value });
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
                        Phone{this.state.mother2Callme ? null : (<sup className="redstarText">*</sup>)}
                      </label>
                      <PhoneValidator
                        disabled={this.state.mother2Callme}
                        validators={this.state.mother2Callme ? [] : ["required"]}
                        errorMessages={this.state.inputError}
                        value={this.state.mother2phoneNo}
                        onChange={(phone) =>
                          this.setState({ mother2phoneNo: phone })
                        }
                      />
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col lg={4} md={4} sm={4}>
                    <div className="form-group formbox">
                      <label className="control-label"> Email {this.state.mother2Emailme ? null : (<sup className="redstarText">*</sup>)}</label>
                      <TextValidator
                        name="email"
                        type="email"
                        placeholder="Email"
                        disabled={this.state.mother2Emailme}
                        value={this.state.mother2email}
                        validators={this.state.mother2Emailme ? ["isEmail"] : ["required", "isEmail"]}
                        errorMessages={this.state.mother2Emailme ? [
                          "Email is not valid",
                        ] : [
                            "This field is required",
                            "Email is not valid",
                          ]}
                        onChange={(e) => {
                          this.setState({ mother2email: e.target.value });
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
                        value={this.state.mother2password}
                        validators={["required"]}
                        errorMessages={["This field is required"]}
                        onChange={(e) => {
                          const re = /^[0-9\b]+$/;
                          if (
                            e.target.value === "" ||
                            re.test(e.target.value)
                          ) {
                            this.setState({ mother2password: e.target.value });
                          }
                        }}
                      />
                    </div>
                  </Col>
                  <Col lg={4} md={4} sm={4}>
                    <div className="form-group formbox">
                      <label>Driving License {this.state.mother2dateRead ? null : (<sup className="redstarText">*</sup>)}</label>
                      <TextValidator
                        disabled={this.state.mother2dateRead}
                        type="text"
                        value={this.state.mother2drivingLicence}
                        placeholder="DL Number"
                        validators={this.state.mother2dateRead ? [] : ["required"]}
                        errorMessages={["This field is required"]}
                        onChange={(e) => {
                          this.setState({
                            mother2drivingLicence: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col lg={4} md={4} sm={4}>
                    <div className="form-group formbox ">
                      <label> DL State{this.state.mother2dateRead ? null : (<sup className="redstarText">*</sup>)}</label>
                      <TextValidator
                        disabled={this.state.mother2dateRead}
                        validators={this.state.mother2dateRead ? [] : ["required"]}
                        errorMessages={["This field is required"]}
                        type="select"
                        value={this.state.mother2DlState}
                        onChange={(e) => {
                          this.setState({ mother2DlState: e.target.value });
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
                        value={this.state.mother2sampleType}
                        validators={["required"]}
                        errorMessages={["This field is required"]}
                        onChange={(e) => {
                          this.setState({ mother2sampleType: e.target.value });
                        }}
                      >
                        <option>--Select Sample Type--</option>
                        <option value="BS">Buccal Swab</option>
                        <option value="OT">Other</option>
                      </TextValidator>
                    </div>
                  </Col>
                  {this.state.mother2sampleType === "OT" ? (
                    <Col lg={4} md={4} sm={4}>
                      <div className="form-group formbox">
                        <label>
                          {" "}
                          Sample Type<sup className="redstarText">*</sup>
                        </label>
                        <TextValidator
                          validators={["required"]}
                          errorMessages={this.state.inputError}
                          value={this.state.mother2sampleTypeOther}
                          onChange={(e) => {
                            this.setState({
                              mother2sampleTypeOther: e.target.value,
                            });
                          }}
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
                        value={this.state.mother2raceEthnicity}
                        validators={["required"]}
                        errorMessages={["This field is required"]}
                        onChange={(e) => {
                          this.setState({
                            mother2raceEthnicity: e.target.value,
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

                  {this.state.mother2raceEthnicity === "Other" ? (
                    <Col lg={4} md={4} sm={4}>
                      <div className="form-group formbox">
                        <label>
                          {" "}
                          Race/Ethnicity<sup className="redstarText">*</sup>
                        </label>
                        <TextValidator
                          validators={["required"]}
                          errorMessages={["This field is required"]}
                          value={this.state.mother2raceEthnicityOther}
                          onChange={(e) => {
                            this.setState({
                              mother2raceEthnicityOther: e.target.value,
                            });
                          }}
                          type="text"
                          placeholder="Enter Other"
                        />
                      </div>
                    </Col>
                  ) : null}
                </Row>
                <Row>
                  <Col lg={4} md={4} sm={4}>
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
                                mother2Emailme: !this.state.mother2Emailme,
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
                                mother2Callme: !this.state.mother2Callme,
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
                            value={this.state.date2Read}
                            onChange={(value) => {
                              if (this.state.mother2dateRead === false) {
                                this.setState({
                                  mother2dateRead: true,
                                });
                              } else {
                                this.setState({
                                  mother2dateRead: false,
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
            ) : null}

            {this.state.childAge ? (
              <div className="consortium-section-outer formsteps bottom-bordernone">
                <h3>Child 2</h3>
                <Row>
                  <Col lg={4} md={4} sm={4}>
                    <div className="form-group formbox">
                      <label className="control-label">
                        First Name<sup className="redstarText">*</sup>
                      </label>
                      <TextValidator
                        name="name"
                        type="text"
                        value={this.state.child2FirstName}
                        placeholder="First Name"
                        validators={["required"]}
                        errorMessages={["This field is required"]}
                        onChange={(e) => {
                          let value = e.target.value;
                          value = value.replace(/[^A-Za-z\s]/gi, "");
                          this.setState({
                            child2FirstName: value,
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
                        value={this.state.child2MiddleName}
                        placeholder="Middle Name"
                        onChange={(e) => {
                          let value = e.target.value;
                          value = value.replace(/[^A-Za-z\s]/gi, "");
                          this.setState({
                            child2MiddleName: value,
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
                        value={this.state.child2LastName}
                        placeholder="Last Name"
                        validators={["required"]}
                        errorMessages={["This field is required"]}
                        onChange={(e) => {
                          let value = e.target.value;
                          value = value.replace(/[^A-Za-z\s]/gi, "");
                          this.setState({
                            child2LastName: value,
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
                        selected={this.state.child2dateofbirth}
                        onChange={this.handleChanged}
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
                        value={this.state.child2dateofbirth}
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
                        value={this.state.child2sex}
                        validators={["required"]}
                        errorMessages={["This field is required"]}
                        onChange={(e) => {
                          this.setState({ child2sex: e.target.value });
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
                        Phone{this.state.child2Callme ? null : (<sup className="redstarText">*</sup>)}
                      </label>
                      <PhoneValidator
                        disabled={this.state.child2Callme}
                        validators={this.state.child2Callme ? [] : ["required"]}
                        errorMessages={this.state.inputError}
                        value={this.state.child2phoneNo}
                        onChange={(phone) =>
                          this.setState({ child2phoneNo: phone })
                        }
                      />
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col lg={4} md={4} sm={4}>
                    <div className="form-group formbox">
                      <label className="control-label"> Email{this.state.child2Emailme ? null : (<sup className="redstarText">*</sup>)}</label>
                      <TextValidator
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={this.state.child2email}
                        validators={["required", "isEmail"]}
                        errorMessages={[
                          "This field is required",
                          "Email is not valid",
                        ]}
                        onChange={(e) => {
                          this.setState({ child2email: e.target.value });
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
                        value={this.state.child2password}
                        validators={["required"]}
                        errorMessages={["This field is required"]}
                        onChange={(e) => {
                          const re = /^[0-9\b]+$/;
                          if (
                            e.target.value === "" ||
                            re.test(e.target.value)
                          ) {
                            this.setState({ child2password: e.target.value });
                          }
                        }}
                      />
                    </div>
                  </Col>
                  <Col lg={4} md={4} sm={4}>
                    <div className="form-group formbox">
                      <label>Driving License </label>
                      <TextValidator
                        disabled={this.state.child2dateRead}
                        type="text"
                        value={this.state.child2drivingLicence}
                        placeholder="DL Number"
                        validators={["required"]}
                        errorMessages={["This field is required"]}
                        onChange={(e) => {
                          this.setState({
                            child2drivingLicence: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col lg={4} md={4} sm={4}>
                    <div className="form-group formbox ">
                      <label>DL State</label>
                      <TextValidator
                        disabled={this.state.child2dateRead}
                        errorMessages={["This field is required"]}
                        type="select"
                        value={this.state.child2DlState}
                        onChange={(e) => {
                          this.setState({ child2DlState: e.target.value });
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
                        value={this.state.child2sampleType}
                        validators={["required"]}
                        errorMessages={["This field is required"]}
                        onChange={(e) => {
                          this.setState({ child2sampleType: e.target.value });
                        }}
                      >
                        <option>--Select Sample Type--</option>
                        <option value="BS">Buccal Swab</option>
                        <option value="OT">Other</option>
                      </TextValidator>
                    </div>
                  </Col>
                  {this.state.child2sampleType === "OT" ? (
                    <Col lg={4} md={4} sm={4}>
                      <div className="form-group formbox">
                        <label>
                          {" "}
                          Sample Type<sup className="redstarText">*</sup>
                        </label>
                        <TextValidator
                          validators={["required"]}
                          errorMessages={this.state.inputError}
                          value={this.state.childs2ampleTypeOther}
                          onChange={(e) => {
                            this.setState({
                              childs2ampleTypeOther: e.target.value,
                            });
                          }}
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
                        value={this.state.child2raceEthnicity}
                        validators={["required"]}
                        errorMessages={["This field is required"]}
                        onChange={(e) => {
                          this.setState({
                            child2raceEthnicity: e.target.value,
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
                  {this.state.child2raceEthnicity === "Other" ? (
                    <Col lg={4} md={4} sm={4}>
                      <div className="form-group formbox">
                        <label>
                          {" "}
                          Race/Ethnicity<sup className="redstarText">*</sup>
                        </label>
                        <TextValidator
                          validators={["required"]}
                          errorMessages={["This field is required"]}
                          value={this.state.child2raceEthnicityOther}
                          onChange={(e) => {
                            this.setState({
                              child2raceEthnicityOther: e.target.value,
                            });
                          }}
                          type="text"
                          placeholder="Enter Other"
                        />
                      </div>
                    </Col>
                  ) : null}
                </Row>
                <Row>
                  <Col lg={4} md={4} sm={4}>
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
                                child2Emailme: !this.state.child2Emailme,
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
                                child2Callme: !this.state.child2Callme,
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
                            value={this.state.child2dateRead}
                            onChange={(value) => {
                              if (this.state.child2dateRead === false) {
                                this.setState({
                                  child2dateRead: true,
                                });
                              } else {
                                this.setState({
                                  child2dateRead: false,
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
            ) : null}
            {this.state.child && !this.state.childAge ? (
              <div className="consortium-section-outer formsteps bottom-bordernone">
                <h3>Child 2</h3>
                <Row>
                  <Col lg={4} md={4} sm={4}>
                    <div className="form-group formbox">
                      <label className="control-label">
                        First Name<sup className="redstarText">*</sup>
                      </label>
                      <TextValidator
                        name="name"
                        type="text"
                        value={this.state.child2FirstName}
                        placeholder="First Name"
                        validators={["required"]}
                        errorMessages={["This field is required"]}
                        onChange={(e) => {
                          let value = e.target.value;
                          value = value.replace(/[^A-Za-z\s]/gi, "");
                          this.setState({
                            child2FirstName: value,
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
                        value={this.state.child2MiddleName}
                        placeholder="Middle Name"
                        onChange={(e) => {
                          let value = e.target.value;
                          value = value.replace(/[^A-Za-z\s]/gi, "");
                          this.setState({
                            child2MiddleName: value,
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
                        value={this.state.child2LastName}
                        placeholder="Last Name"
                        validators={["required"]}
                        errorMessages={["This field is required"]}
                        onChange={(e) => {
                          let value = e.target.value;
                          value = value.replace(/[^A-Za-z\s]/gi, "");
                          this.setState({
                            child2LastName: value,
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
                        selected={this.state.child2dateofbirth}
                        onChange={this.handleChanged}
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
                        value={this.state.child2dateofbirth}
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
                        value={this.state.child2sex}
                        validators={["required"]}
                        errorMessages={["This field is required"]}
                        onChange={(e) => {
                          this.setState({ child2sex: e.target.value });
                        }}
                      >
                        <option value="">Select Sex</option>
                        <option value="MA">Male</option>
                        <option value="FE">Female</option>
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
                        value={this.state.child2sampleType}
                        validators={["required"]}
                        errorMessages={["This field is required"]}
                        onChange={(e) => {
                          this.setState({ child2sampleType: e.target.value });
                        }}
                      >
                        <option>--Select Sample Type--</option>
                        <option value="BS">Buccal Swab</option>
                        <option value="OT">Other</option>
                      </TextValidator>
                    </div>
                  </Col>
                </Row>
                <Row>
                  {this.state.child2sampleType === "OT" ? (
                    <Col lg={4} md={4} sm={4}>
                      <div className="form-group formbox">
                        <label>
                          {" "}
                          Sample Type<sup className="redstarText">*</sup>
                        </label>
                        <TextValidator
                          validators={["required"]}
                          errorMessages={this.state.inputError}
                          value={this.state.childs2ampleTypeOther}
                          onChange={(e) => {
                            this.setState({
                              childs2ampleTypeOther: e.target.value,
                            });
                          }}
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
                        value={this.state.child2raceEthnicity}
                        validators={["required"]}
                        errorMessages={["This field is required"]}
                        onChange={(e) => {
                          this.setState({
                            child2raceEthnicity: e.target.value,
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
                  {this.state.child2raceEthnicity === "Other" ? (
                    <Col lg={4} md={4} sm={4}>
                      <div className="form-group formbox">
                        <label>
                          {" "}
                          Race/Ethnicity<sup className="redstarText">*</sup>
                        </label>
                        <TextValidator
                          validators={["required"]}
                          errorMessages={["This field is required"]}
                          value={this.state.child2raceEthnicityOther}
                          onChange={(e) => {
                            this.setState({
                              child2raceEthnicityOther: e.target.value,
                            });
                          }}
                          type="text"
                          placeholder="Enter Other"
                        />
                      </div>
                    </Col>
                  ) : null}
                </Row>
              </div>
            ) : null}
            <div className="consortium-section-outer formsteps bottom-bordernone">
              <h3>Additional Persons</h3>
              {this.state.ap.map((val, idx) => (
                <div className="multiple-persons-outer">

                  <div className="multiple-persons-header">
                    <h3>Additional Person {idx + 1}</h3>
                    {/* {this.state.ap.length > 1 && */}
                    <div className="addplus-box add-additional right-deleteicon clearfix">
                      <Button
                        data-id={idx}
                        onClick={(e) => {
                          let ap = [...this.state.ap];
                          ap.splice(e.target.dataset.id, 1);
                          this.setState({
                            ap,
                          });
                        }}
                      >
                        {" "}
                        <i className="mdi mdi-delete" />
                      </Button>
                    </div>
                    {/* } */}
                  </div>

                  <Row>
                    <Col lg={4} md={4} sm={4}>
                      <div className="form-group formbox">
                        <label className="control-label">Relation</label>
                        <TextValidator
                          name="relation"
                          type="text"
                          value={this.state.ap[idx].relation}
                          placeholder="Relation"
                          validators={["required"]}
                          errorMessages={["This field is required"]}
                          data-id={idx}
                          onChange={(e) => {
                            let ap = [...this.state.ap];
                            ap[e.target.dataset.id][e.target.name] =
                              e.target.value;
                            this.setState({
                              ap,
                            });
                          }}
                        />
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
                          name="firstName"
                          type="text"
                          value={this.state.ap[idx].firstName}
                          placeholder="First Name"
                          validators={["required"]}
                          errorMessages={["This field is required"]}
                          data-id={idx}
                          onChange={(e) => {
                            let ap = [...this.state.ap];
                            ap[e.target.dataset.id][e.target.name] =
                              e.target.value;
                            this.setState({
                              ap,
                            });
                          }}
                        />
                      </div>
                    </Col>
                    <Col lg={4} md={4} sm={4}>
                      <div className="form-group formbox">
                        <label className="control-label">Middle Name</label>
                        <TextValidator
                          name="middleName"
                          type="text"
                          value={this.state.ap[idx].middleName}
                          placeholder="Middle Name"
                          data-id={idx}
                          onChange={(e) => {
                            let ap = [...this.state.ap];
                            ap[e.target.dataset.id][e.target.name] =
                              e.target.value;
                            this.setState({
                              ap,
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
                          name="lastName"
                          type="text"
                          value={this.state.ap[idx].lastName}
                          placeholder="Last Name"
                          validators={["required"]}
                          errorMessages={["This field is required"]}
                          data-id={idx}
                          onChange={(e) => {
                            let ap = [...this.state.ap];
                            ap[e.target.dataset.id][e.target.name] =
                              e.target.value;
                            this.setState({
                              ap,
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
                          selected={this.state.ap[idx].dob}
                          data-id={idx}
                          onChange={(date) => {
                            let ap = [...this.state.ap];
                            ap[idx]["dob"] = date;
                            this.setState({
                              ap,
                            });
                          }}
                          className="form-control"
                          name="dob"
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
                          value={this.state.ap[idx].dob}
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
                          value={this.state.ap[idx].gender}
                          validators={["required"]}
                          errorMessages={["This field is required"]}
                          name="gender"
                          data-id={idx}
                          onChange={(e) => {
                            let ap = [...this.state.ap];
                            ap[e.target.dataset.id][e.target.name] =
                              e.target.value;
                            this.setState({
                              ap,
                            });
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
                          Phone{this.state.ap[idx].allowCall ? null : (<sup className="redstarText">*</sup>)}
                        </label>
                        <PhoneValidator
                          disabled={this.state.ap[idx].allowCall}
                          validators={this.state.ap[idx].allowCall ? [] : ["required"]}
                          errorMessages={this.state.inputError}
                          value={this.state.ap[idx].phone}
                          name="phone"
                          data-id={idx}
                          onChange={(phone) => {
                            let ap = [...this.state.ap];
                            ap[idx]["phone"] = phone;
                            this.setState({
                              ap,
                            });
                          }}
                        />
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={4} md={4} sm={4}>
                      <div className="form-group formbox">
                        <label className="control-label"> Email {this.state.ap[idx].pickupPreference ? null : (<sup className="redstarText">*</sup>)}</label>
                        <TextValidator
                          name="email"
                          type="email"
                          placeholder="Email"

                          disabled={this.state.ap[idx].pickupPreference}
                          value={this.state.ap[idx].email}
                          validators={this.state.ap[idx].pickupPreference ? ["isEmail"] : ["required", "isEmail"]}
                          errorMessages={this.state.ap[idx].pickupPreference ? [
                            "Email is not valid",
                          ] : [
                              "This field is required",
                              "Email is not valid",
                            ]}

                          data-id={idx}
                          onChange={(e) => {
                            let ap = [...this.state.ap];
                            ap[e.target.dataset.id][e.target.name] =
                              e.target.value;
                            this.setState({
                              ap,
                            });
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
                          name="password"
                          type="text"
                          pattern="^[0-9]{4}$"
                          placeholder="Password"
                          autoComplete="off"
                          value={this.state.ap[idx].password}
                          validators={["required"]}
                          errorMessages={["This field is required"]}
                          data-id={idx}
                          onChange={(e) => {
                            let ap = [...this.state.ap];
                            ap[e.target.dataset.id][e.target.name] =
                              e.target.value;
                            const re = /^[0-9\b]+$/;
                            if (
                              e.target.value === "" ||
                              re.test(e.target.value)
                            ) {
                              this.setState({
                                ap,
                              });
                            }
                          }}
                        />
                      </div>
                    </Col>
                    <Col lg={4} md={4} sm={4}>
                      <div className="form-group formbox">
                        <label>Driving License {this.state.ap[idx].hasDL ? null : (<sup className="redstarText">*</sup>)}</label>
                        <TextValidator
                          disabled={this.state.ap[idx].hasDL}
                          validators={this.state.ap[idx].hasDL ? [] : ["required"]}
                          type="text"
                          value={this.state.ap[idx].drivingLicence}
                          placeholder="DL Number"
                          name="drivingLicence"
                          errorMessages={["This field is required"]}
                          data-id={idx}
                          onChange={(e) => {
                            let ap = [...this.state.ap];
                            ap[e.target.dataset.id][e.target.name] =
                              e.target.value;
                            this.setState({
                              ap,
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
                          DL State {this.state.ap[idx].hasDL ? null : (<sup className="redstarText">*</sup>)}
                        </label>
                        <TextValidator
                          disabled={this.state.ap[idx].hasDL}
                          validators={this.state.ap[idx].hasDL ? [] : ["required"]}
                          type="select"
                          errorMessages={["This field is required"]}
                          name="dlState"
                          value={this.state.ap[idx].dlState}
                          data-id={idx}
                          onChange={(e) => {
                            let ap = [...this.state.ap];
                            ap[e.target.dataset.id][e.target.name] =
                              e.target.value;
                            this.setState({
                              ap,
                            });
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
                          name="sampleType"
                          value={this.state.ap[idx].sampleType}
                          validators={["required"]}
                          errorMessages={["This field is required"]}
                          data-id={idx}
                          onChange={(e) => {
                            let ap = [...this.state.ap];
                            ap[e.target.dataset.id][e.target.name] =
                              e.target.value;
                            this.setState({
                              ap,
                            });
                          }}
                        >
                          <option>--Select Sample Type--</option>
                          <option value="BS">Buccal Swab</option>
                          <option value="OT">Other</option>
                        </TextValidator>
                      </div>
                    </Col>
                    {this.state.ap[idx].sampleType === "OT" ? (
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox">
                          <label>
                            {" "}
                            Sample Type<sup className="redstarText">*</sup>
                          </label>
                          <TextValidator
                            validators={["required"]}
                            name="sampleTypeOther"
                            errorMessages={this.state.inputError}
                            type="text"
                            value={this.state.ap[idx].sampleTypeOther}
                            data-id={idx}
                            onChange={(e) => {
                              let ap = [...this.state.ap];
                              ap[e.target.dataset.id][e.target.name] =
                                e.target.value;
                              this.setState({
                                ap,
                              });
                            }}
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
                          name="race"
                          value={this.state.ap[idx].race}
                          validators={["required"]}
                          errorMessages={["This field is required"]}
                          data-id={idx}
                          onChange={(e) => {
                            let ap = [...this.state.ap];
                            ap[e.target.dataset.id][e.target.name] =
                              e.target.value;
                            this.setState({
                              ap,
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
                    {this.state.ap[idx].race === "Other" ? (
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
                            name="raceOther"
                            value={
                              this.state.ap[idx].raceOther
                            }
                            data-id={idx}
                            onChange={(e) => {
                              let ap = [...this.state.ap];
                              ap[e.target.dataset.id][e.target.name] =
                                e.target.value;
                              this.setState({
                                ap,
                              });
                            }}
                            placeholder="Enter Other"
                          />
                        </div>
                      </Col>
                    ) : null}
                  </Row>
                  <Row>
                    <Col lg={4} md={12} sm={12}>
                      <div className="form-group formbox">
                        <div className="form-check">
                          <label className="form-check-label">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              name="pickupPreference"
                              data-id={idx}
                              onChange={(e) => {
                                if (
                                  this.state.ap[idx]
                                    .pickupPreference === false
                                ) {
                                  let ap = [...this.state.ap];
                                  ap[e.target.dataset.id][
                                    "pickupPreference"
                                  ] = true;
                                  ap[e.target.dataset.id]["email"] = "";

                                  this.setState({
                                    ap,
                                  });
                                } else {
                                  let ap = [...this.state.ap];
                                  ap[e.target.dataset.id][
                                    "pickupPreference"
                                  ] = false;
                                  this.setState({
                                    ap,
                                  });
                                }
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
                              name="allowCall"
                              data-id={idx}
                              onChange={(e) => {
                                let ap = [...this.state.ap];
                                ap[e.target.dataset.id][e.target.name] = !ap[
                                  e.target.dataset.id
                                ][e.target.name];
                                if (ap[e.target.dataset.id
                                ][e.target.name]) {
                                  ap[e.target.dataset.id]["phone"] = "";
                                }
                                this.setState({
                                  ap,
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
                              value={this.state.ap[idx].hasDL}
                              data-id={idx}
                              onChange={(e) => {
                                if (
                                  this.state.ap[idx].hasDL === false
                                ) {
                                  let ap = [...this.state.ap];
                                  ap[e.target.dataset.id][
                                    "hasDL"
                                  ] = true;
                                  ap[e.target.dataset.id][
                                    "dlState"
                                  ] = "";
                                  ap[e.target.dataset.id][
                                    "drivingLicence"
                                  ] = "";
                                  this.setState({
                                    ap,
                                  });
                                } else {
                                  let ap = [...this.state.ap];
                                  ap[e.target.dataset.id][
                                    "hasDL"
                                  ] = false;
                                  this.setState({
                                    ap,
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
              ))}
            </div>
            <div className="addplus-box add-additional clearfix margin-bottom10">
              <Button
                className="plus-iconbtn"
                onClick={this.addAdditionalPerson}
              >
                {" "}
                <i className="mdi mdi-plus" />
              </Button>
              <h4>Add Additional Person</h4>
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
                                inputRead: true,
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
                                inputRead: false,
                              });
                            }}
                          />{" "}
                          Yes
                          <i className="input-helper"></i>
                        </label>
                      </div>
                    </div>
                  </Col>
                  {this.state.inputRead === false ? (
                    <Col lg={4} md={4} sm={4}>
                      <div className="form-group formbox">
                        <label>
                          {" "}
                          Which Party?<sup className="redstarText">*</sup>
                        </label>
                        <input
                          value={this.state.party}
                          onChange={(e) => {
                            this.setState({ party: e.target.value });
                          }}
                          type="text"
                          placeholder=" Which Party?"
                        />
                      </div>
                    </Col>
                  ) : null}
                  {this.state.inputRead === false ? (
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
              </div>
            </div>
            <div className="bottom-btn-group pull-right clearfix">
              <button type="submit" className="bluebg margin-right10">
                {" "}
                Save{" "}
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

export default SibblingShipOther;
