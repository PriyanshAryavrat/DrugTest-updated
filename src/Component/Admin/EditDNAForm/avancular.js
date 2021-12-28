import React from "react";
import "./index.css";
import { Redirect } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

import InnerHeader from "../../../Component/Customer/InnerHeader/index";
import { ValidatorForm } from "react-form-validator-core";
import TextValidator from "../../../Form/TextValidator/Index";
import PhoneValidator from "../../../Form/PhoneValidator/Index";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import StateData from "../../../Config/CountryStates.json";
import Swal from "sweetalert2";
import axios from "axios";
import apiPath from "../../../Environment/ApiPath";
import {NotificationContainer, NotificationManager} from 'react-notifications';
var age;
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
});

class AvuncularOther extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phoneNumber: "",
      email: "",
      drivingLicence: "",
      dateofbirth: "",
      motherdateofbirth: "",
      uncledateRead: false,
      childdateofbirth: "",
      dob: "",
      sampleType: "",
      sex: "",
      raceEthnicity: "",
      password: "",
      tabIndex: 0,
      inputError: "This field is required",
      dateRead: false,
      motherdateRead: false,
      relationdateRead: false,
      inputRead: true,
      mother: false,
      child: false,
      additionalPerson: false,
      phoneNo: "",
      hasTransplant: null,
      additionalPersonName: "",
      childAge: false,
      uncle: false,
      aunt: true,
      ap: [],
      relationEmailme: false,
      relationCallme: false,
      auntdateRead: false,
      motherEmailme: false,
      motherCallme: false,
      childCallme: false,
      childEmailme: false,
      childdateRead: false,
      uncleCallme: false,
      uncleEmailme: false,
      uncledateRead: false,
      auntCallme: false,
      auntEmailme: false,
      auntdateRead: false,
    };
  }

  handleTransplantDateChange = (date) => {
    this.setState({
      transplantDate: date,
    });
  };
  componentDidMount() {


    let { allegedMother, child, allegedAunt, allegedUncle, additionalPersons, bloodCellTransfusion } = this.props.formData;

    if (allegedAunt) {
      this.setState({
        auntFirstName: allegedAunt.firstName,
        auntLastName: allegedAunt.lastName,
        auntMiddleName: allegedAunt.middleName,
        auntdateofbirth: allegedAunt.dob ? new Date(allegedAunt.dob) : null,
        auntsex: allegedAunt.gender,
        auntphoneNo: allegedAunt.phone,
        auntemail: allegedAunt.email,
        auntpassword: allegedAunt.password,
        auntdrivingLicence: allegedAunt.drivingLicence,
        auntDlState: allegedAunt.DlState,
        auntsampleType: allegedAunt.sampleType,
        auntsampleTypeOther: allegedAunt.sampleTypeOther,
        auntraceEthnicity: allegedAunt.race,
        auntraceEthnicityOther: allegedAunt.raceOther,
        auntEmailme: allegedAunt.pickupPreference,
        auntCallme: allegedAunt.allowCall,
        auntisDl: allegedAunt.hasDL,
        auntidateRead: allegedAunt.hasDL,
      });
    }

    if (allegedUncle) {
      this.setState({
        uncleFirstName: allegedUncle.firstName,
        uncleLastName: allegedUncle.lastName,
        uncleMiddleName: allegedUncle.middleName,
        uncledateofbirth: allegedUncle.dob ? new Date(allegedUncle.dob) : null,
        unclesex: allegedUncle.gender,
        unclephoneNo: allegedUncle.phone,
        uncleemail: allegedUncle.email,
        unclepassword: allegedUncle.password,
        uncledrivingLicence: allegedUncle.drivingLicence,
        uncleDlState: allegedUncle.DlState,
        unclesampleType: allegedUncle.sampleType,
        unclesampleTypeOther: allegedUncle.sampleTypeOther,
        uncleraceEthnicity: allegedUncle.race,
        uncleraceEthnicityOther: allegedUncle.raceOther,
        uncleEmailme: allegedUncle.pickupPreference,
        uncleCallme: allegedUncle.allowCall,
        uncleisDl: allegedUncle.hasDL,
        uncledateRead: allegedUncle.hasDL,
      });
    }
    if (allegedMother) {
      this.setState({
        motherFirstName: allegedMother.firstName,
        motherMiddleName: allegedMother.middleName,
        motherLastName: allegedMother.lastName,
        motherdateofbirth: allegedMother.dob ? new Date(allegedMother.dob) : null,
        mothersex: allegedMother.gender,
        motherphoneNo: allegedMother.phone,
        motheremail: allegedMother.email,
        motherpassword: allegedMother.password,
        motherdrivingLicence: allegedMother.drivingLicence,
        motherDlState: allegedMother.dlState,
        mothersampleType: allegedMother.sampleType,
        mothersampleTypeOther: allegedMother.sampleTypeOther,
        motherraceEthnicity: allegedMother.race,
        motherraceEthnicityOther: allegedMother.raceOther,
        motherEmailme: allegedMother.pickupPreference,
        motherCallme: allegedMother.allowCall,
        motherisdl: allegedMother.hasDL,
        motherdateRead: allegedMother.hasDL,
      });
    }

    if (child) {
      this.setState({
        childFirstName: child.firstName,
        childMiddleName: child.middleName,
        childLastName: child.lastName,
        childdateofbirth: child.dob ? new Date(child.dob) : null,
        childsex: child.gender,
        childphoneNo: child.phone,
        childemail: child.email,
        childpassword: child.password,
        childdrivingLicence: child.drivingLicence,
        childDlState: child.dlState,
        childsampleType: child.sampleType,
        childsampleTypeOther: child.sampleTypeOther,
        childraceEthnicity: child.race,
        childraceEthnicityOther: child.raceOther,
        childdateRead: child.hasDL,
        childEmailme: child.pickupPreference,
        childCallme: child.allowCall,
        childisdl: child.hasDL,
      })
      if (child.dob) {
        this.handleChanges(new Date(child.dob))
      }
    }

    if (bloodCellTransfusion) {
      this.setState({
        hasTransplant: bloodCellTransfusion.status,
        party: bloodCellTransfusion.party,
        transplantDate: bloodCellTransfusion.when ? new Date(bloodCellTransfusion.when) : null,

      })
    }
    if (additionalPersons) {
      this.setState({
        ap: additionalPersons
      })
    }

    this.setState({
      id: this.props.formData._id,
      name: this.props.formData.name,
      phoneNumber: this.props.formData.phone,
      email: this.props.formData.email,
      drivingLicence: this.props.formData.drivingLicence,
      relationship: this.props.formData.relationship,
      uncle: allegedUncle && allegedUncle.dob ? true : false,
      mother: allegedMother && allegedMother.dob ? true : false,
      child: child && child.dob ? true : false,
      aunt: allegedAunt && allegedAunt.dob ? true : false,
    })

  }
  handleSubmit = async (evt) => {
    // evt.preventDefault();
    console.log("form submitted");
    let formData = {
      id: this.state.id,
      name: this.state.name,
      phone: this.state.phoneNumber,
      email: this.state.email,
      drivingLicence: this.state.drivingLicence,
      relationship: this.state.relationship,
      allegedAunt: {
        firstName: this.state.auntFirstName,
        middleName: this.state.auntMiddleName,
        lastName: this.state.auntLastName,
        dob: this.state.auntdateofbirth,
        gender: this.state.auntsex,
        password: this.state.auntpassword,
        phone: this.state.auntCallme ? "" : this.state.auntphoneNo,
        email: this.state.auntEmailme ? "" : this.state.auntemail,
        drivingLicence: this.state.auntdateRead ? "" : this.state.auntdrivingLicence,
        dlState: this.state.auntdateRead ? "" : this.state.auntDlState,
        sampleType: this.state.auntsampleType,
        sampleTypeOther: this.state.auntsampleTypeOther,
        race: this.state.auntraceEthnicity,
        raceOther: this.state.auntraceEthnicityOther,
        pickupPreference: this.state.auntEmailme,
        allowCall: this.state.auntCallme,
        hasDL: this.state.auntdateRead
      },
      allegedUncle: {
        firstName: this.state.uncleFirstName,
        middleName: this.state.uncleMiddleName,
        lastName: this.state.uncleLastName,
        dob: this.state.uncledateofbirth,
        gender: this.state.unclesex,
        password: this.state.unclepassword,
        phone: this.state.uncleCallme ? "" : this.state.unclephoneNo,
        email: this.state.uncleEmailme ? "" : this.state.uncleemail,
        drivingLicence: this.state.uncledateRead ? "" : this.state.uncledrivingLicence,
        dlState: this.state.uncledateRead ? "" : this.state.uncleDlState,
        sampleType: this.state.unclesampleType,
        sampleTypeOther: this.state.unclesampleTypeOther,
        race: this.state.uncleraceEthnicity,
        raceOther: this.state.uncleraceEthnicityOther,
        pickupPreference: this.state.uncleEmailme,
        allowCall: this.state.uncleCallme,
        hasDL: this.state.uncledateRead,
      },
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
        hasDL: this.state.motherdateRead,
      },
      child: {
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
      additionalPersons: this.state.ap,
      bloodCellTransfusion: {
        status: this.state.hasTransplant,
        party: this.state.hasTransplant ? this.state.party : null,
        when: this.state.hasTransplant ? this.state.transplantDate : null,
      },
    };

    if (this.state.uncle == false) {
      formData.allegedUncle = {};
    }
    if (this.state.aunt == false) {
      formData.allegedAunt = {};
    }
    if (this.state.mother == false) {
      formData.allegedMother = {};
    }
    if (this.state.child == false) {
      formData.child = {};
    }

    axios
      .post(apiPath.save_avuncular_form, formData, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((res) => {
        if (res.data && res.data.status === "failure") {
          NotificationManager.error(res.data.message,"Error",2000);
          return;
        }
        NotificationManager.success("Data saved successfully!","Success",2000);
        setTimeout(() => {
          window.history.back();
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
          auntDlState: "California",
          uncleDlState: "California",
          motherDlState: "California",
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

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo} />;
    }
    return (
      <React.Fragment>
        <InnerHeader />

        <div className="form-container">
          <Container>
            <div className="header-content">
              <div className="header-left">
                <h2>Avuncular</h2>
              </div>

            </div>
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
                <div className="consortium-section-outer formsteps margin-bottom20">
                  <h3>Relationship</h3>
                  <Row className="margin-bottom20">
                    <Col lg={3} md={4} sm={6}>
                      <div className="form-group formbox m0">
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
                        <Col lg={4} md={6} sm={6}>
                          <div className="form-check">
                            <label className="form-check-label">
                              <input
                                type="radio"
                                className="form-check-input"
                                name="optionsRadios5"
                                value="Legal/Court admissible"
                                checked={this.state.relationship == "Legal/Court admissible" ? true : false}
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
                                checked={this.state.relationship == "Personal/Peace of mind" ? true : false}
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
                  <Row>
                    <Col lg={3} md={4} sm={6}>
                      <div className="form-group formbox m0">
                        <label>
                          Relationship<sup className="redstarText">*</sup>
                        </label>
                      </div>
                    </Col>
                    <Col lg={9} md={8} sm={8}>
                      <Row>
                        <Col lg={3} md={3} sm={3}>
                          <div className="form-group formbox">
                            <div className="form-check">
                              <label className="form-check-label">
                                <input
                                  type="radio"
                                  className="form-check-input"
                                  name="optionscheckbox"
                                  value=""
                                  checked={this.state.aunt}
                                  onChange={(e) => {
                                    this.setState({
                                      aunt: true,
                                      uncle: false,
                                    });
                                  }}
                                />{" "}
                            Aunt
                            <i className="input-helper"></i>
                              </label>
                            </div>
                          </div>
                        </Col>
                        <Col lg={3} md={3} sm={3}>
                          <div className="form-group formbox">
                            <div className="form-check">
                              <label className="form-check-label">
                                <input
                                  type="radio"
                                  className="form-check-input"
                                  name="optionscheckbox"
                                  value=""
                                  checked={this.state.uncle}
                                  onChange={(e) => {
                                    this.setState({
                                      aunt: false,
                                      uncle: true,
                                    });
                                  }}
                                />{" "}
                            Uncle
                            <i className="input-helper"></i>
                              </label>
                            </div>
                          </div>
                        </Col>
                        <Col lg={3} md={3} sm={3}>
                          <div className="form-group formbox">
                            <div className="form-check">
                              <label className="form-check-label">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  name="optionscheckbox"
                                  value=""
                                  checked={this.state.child}
                                  onChange={(e) => {
                                    this.setState({
                                      child: !this.state.child,
                                    });
                                  }}
                                />{" "}
                            Child
                            <i className="input-helper"></i>
                              </label>
                            </div>
                          </div>
                        </Col>
                        <Col lg={3} md={3} sm={3}>
                          <div className="form-group formbox">
                            <div className="form-check">
                              <label className="form-check-label">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  name="optionscheckbox"
                                  value=""
                                  checked={this.state.mother}
                                  onChange={(e) => {
                                    this.setState({
                                      mother: !this.state.mother,
                                    });
                                  }}
                                />{" "}
                            Mother
                            <i className="input-helper"></i>
                              </label>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>
                {this.state.aunt ? (
                  <div className="consortium-section-outer formsteps bottom-bordernone">
                    <h3>Alleged Aunt</h3>
                    <Row>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox">
                          <label className="control-label">
                            First Name<sup className="redstarText">*</sup>
                          </label>
                          <TextValidator
                            name="name"
                            type="text"
                            value={this.state.auntFirstName}
                            placeholder="First Name"
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                            onChange={(e) => {
                              let value = e.target.value;
                              value = value.replace(/[^A-Za-z\s]/gi, "");
                              this.setState({
                                auntFirstName: value,
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
                            value={this.state.auntMiddleName}
                            placeholder="Middle Name"
                            onChange={(e) => {
                              let value = e.target.value;
                              value = value.replace(/[^A-Za-z\s]/gi, "");
                              this.setState({
                                auntMiddleName: value,
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
                            value={this.state.auntLastName}
                            placeholder="Last Name"
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                            onChange={(e) => {
                              let value = e.target.value;
                              value = value.replace(/[^A-Za-z\s]/gi, "");
                              this.setState({
                                auntLastName: value,
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
                            selected={this.state.auntdateofbirth}
                            onChange={(date) => {
                              this.setState({
                                auntdateofbirth: date
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
                            value={this.state.auntdateofbirth}
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
                            value={this.state.auntsex}
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                            onChange={(e) => {
                              this.setState({ auntsex: e.target.value });
                            }}
                          >
                            <option value="">Select gender</option>
                            <option value="MA">Male</option>
                            <option value="FE">Female</option>
                          </TextValidator>
                        </div>
                      </Col>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox">
                          <label className="control-label">
                            {" "}
                        Phone{this.state.auntCallme ? null : (<sup className="redstarText">*</sup>)}
                          </label>
                          <PhoneValidator
                            disabled={this.state.auntCallme}
                            validators={this.state.auntCallme ? [] : ["required"]}
                            errorMessages={this.state.inputError}
                            value={this.state.auntphoneNo}
                            onChange={(phone) =>
                              this.setState({ auntphoneNo: phone })
                            }
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox">
                          <label className="control-label"> Email  {this.state.auntEmailme ? null : (<sup className="redstarText">*</sup>)}</label>
                          <TextValidator
                            disabled={this.state.auntEmailme}
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={this.state.auntemail}
                            validators={this.state.auntEmailme ? ["isEmail"] : ["required", "isEmail"]}
                            errorMessages={this.state.auntEmailme ? [
                              "Email is not valid",
                            ] : [
                                "This field is required",
                                "Email is not valid",
                              ]}
                            onChange={(e) => {
                              this.setState({ auntemail: e.target.value });
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
                          <input
                            maxLength="4"
                            name="Password"
                            type="text"
                            pattern="^[0-9]{4}$"
                            placeholder="Password"
                            autoComplete="off"
                            value={this.state.auntpassword}
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                            onChange={(e) => {
                              const re = /^[0-9\b]+$/;
                              if (
                                e.target.value === "" ||
                                re.test(e.target.value)
                              ) {
                                this.setState({ auntpassword: e.target.value });
                              }
                            }}
                          />
                        </div>
                      </Col>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox">
                          <label>Driving License{this.state.auntdateRead ? null : (<sup className="redstarText">*</sup>)} </label>
                          <TextValidator
                            disabled={this.state.auntdateRead}
                            type="text"
                            value={this.state.auntdrivingLicence}
                            placeholder="DL Number"
                            validators={this.state.auntdateRead ? [] : ["required"]}
                            errorMessages={["This field is required"]}
                            onChange={(e) => {
                              this.setState({
                                auntdrivingLicence: e.target.value,
                              });
                            }}
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox ">
                          <label> DL State {this.state.auntdateRead ? null : (<sup className="redstarText">*</sup>)}</label>
                          <TextValidator
                            disabled={this.state.auntdateRead ? true : false}
                            validators={this.state.auntdateRead ? [] : ["required"]}
                            errorMessages={["This field is required"]}
                            type="select"
                            value={this.state.auntDlState}
                            onChange={(e) => {
                              this.setState({ auntDlState: e.target.value });
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
                            value={this.state.auntsampleType}
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                            onChange={(e) => {
                              this.setState({ auntsampleType: e.target.value });
                            }}
                          >
                            <option>--Select Sample Type--</option>
                            <option value="BS">Buccal Swab</option>
                            <option value="OT">Other</option>
                          </TextValidator>
                        </div>
                      </Col>

                      {this.state.auntsampleType === "OT" ? (
                        <Col lg={4} md={4} sm={4}>
                          <div className="form-group formbox">
                            <label>
                              {" "}
                          Sample Type<sup className="redstarText">*</sup>
                            </label>
                            <TextValidator
                              validators={["required"]}
                              errorMessages={this.state.inputError}
                              value={this.state.auntsampleTypeOther}
                              onChange={(e) => {
                                this.setState({
                                  auntsampleTypeOther: e.target.value,
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
                            value={this.state.auntraceEthnicity}
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                            onChange={(e) => {
                              this.setState({
                                auntraceEthnicity: e.target.value,
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
                      {this.state.auntraceEthnicity === "Other" ? (
                        <Col lg={4} md={4} sm={4}>
                          <div className="form-group formbox">
                            <label>
                              {" "}
                          Race/Ethnicity<sup className="redstarText">*</sup>
                            </label>
                            <TextValidator
                              validators={["required"]}
                              errorMessages={["This field is required"]}
                              value={this.state.auntraceEthnicityOther}
                              onChange={(e) => {
                                this.setState({
                                  auntraceEthnicityOther: e.target.value,
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
                      <Col lg={4} md={12} sm={12}>
                        <div className="form-group formbox">
                          <div className="form-check">
                            <label className="form-check-label">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                name="optionscheckbox"
                                value=""
                                checked={this.state.auntEmailme}
                                onChange={(e) => {
                                  this.setState({
                                    auntEmailme: !this.state.auntEmailme,
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
                                checked={this.state.auntCallme}
                                onChange={(e) => {
                                  this.setState({
                                    auntCallme: !this.state.auntCallme,
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
                                checked={this.state.auntdateRead}
                                value={this.state.auntdateRead}
                                onChange={(value) => {
                                  if (this.state.auntdateRead === false) {
                                    this.setState({
                                      auntdateRead: true,
                                    });
                                  } else {
                                    this.setState({
                                      auntdateRead: false,
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
                {this.state.uncle ? (
                  <div className="consortium-section-outer formsteps bottom-bordernone">
                    <h3>Alleged Uncle</h3>
                    <Row>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox">
                          <label className="control-label">
                            First Name<sup className="redstarText">*</sup>
                          </label>
                          <TextValidator
                            name="name"
                            type="text"
                            value={this.state.uncleFirstName}
                            placeholder="First Name"
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                            onChange={(e) => {
                              let value = e.target.value;
                              value = value.replace(/[^A-Za-z\s]/gi, "");
                              this.setState({
                                uncleFirstName: value,
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
                            value={this.state.uncleMiddleName}
                            placeholder="Middle Name"
                            onChange={(e) => {
                              let value = e.target.value;
                              value = value.replace(/[^A-Za-z\s]/gi, "");
                              this.setState({
                                uncleMiddleName: value,
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
                            value={this.state.uncleLastName}
                            placeholder="Last Name"
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                            onChange={(e) => {
                              let value = e.target.value;
                              value = value.replace(/[^A-Za-z\s]/gi, "");
                              this.setState({
                                uncleLastName: value,
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
                            selected={this.state.uncledateofbirth}
                            onChange={(date) => {
                              this.setState({
                                uncledateofbirth: date
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
                            value={this.state.uncledateofbirth}
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
                            value={this.state.unclesex}
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                            onChange={(e) => {
                              this.setState({ unclesex: e.target.value });
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
                        Phone {this.state.uncleCallme ? null : (<sup className="redstarText">*</sup>)}
                          </label>
                          <PhoneValidator
                            disabled={this.state.uncleCallme}
                            validators={this.state.uncleCallme ? [] : ["required"]}
                            errorMessages={this.state.inputError}
                            value={this.state.unclephoneNo}
                            onChange={(phone) =>
                              this.setState({ unclephoneNo: phone })
                            }
                          />
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox">
                          <label className="control-label"> Email  {this.state.uncleEmailme ? null : (<sup className="redstarText">*</sup>)}</label>
                          <TextValidator
                            disabled={this.state.uncleEmailme}
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={this.state.uncleemail}
                            validators={this.state.uncleEmailme ? ["isEmail"] : ["required", "isEmail"]}
                            errorMessages={this.state.uncleEmailme ? [
                              "Email is not valid",
                            ] : [
                                "This field is required",
                                "Email is not valid",
                              ]}
                            onChange={(e) => {
                              this.setState({ uncleemail: e.target.value });
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
                          <input
                            maxLength="4"
                            name="Password"
                            type="text"
                            pattern="^[0-9]{4}$"
                            placeholder="Password"
                            autoComplete="off"
                            value={this.state.unclepassword}
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                            onChange={(e) => {
                              const re = /^[0-9\b]+$/;
                              if (
                                e.target.value === "" ||
                                re.test(e.target.value)
                              ) {
                                this.setState({ unclepassword: e.target.value });
                              }
                            }}
                          />
                        </div>
                      </Col>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox">
                          <label>Driving License {this.state.uncledateRead ? null : (<sup className="redstarText">*</sup>)}</label>
                          <TextValidator
                            disabled={this.state.uncledateRead}
                            type="text"
                            value={this.state.uncledrivingLicence}
                            placeholder="DL Number"
                            validators={this.state.uncledateRead ? [] : ["required"]}
                            errorMessages={["This field is required"]}
                            onChange={(e) => {
                              this.setState({
                                uncledrivingLicence: e.target.value,
                              });
                            }}
                          />
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox ">
                          <label>DL State {this.state.uncledateRead ? null : (<sup className="redstarText">*</sup>)}</label>
                          <TextValidator
                            disabled={this.state.uncledateRead}
                            validators={this.state.uncledateRead ? [] : ["required"]}
                            errorMessages={["This field is required"]}
                            type="select"
                            value={this.state.uncleDlState}
                            onChange={(e) => {
                              this.setState({ uncleDlState: e.target.value });
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
                            value={this.state.unclesampleType}
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                            onChange={(e) => {
                              this.setState({ unclesampleType: e.target.value });
                            }}
                          >
                            <option>--Select Sample Type--</option>
                            <option value="BS">Buccal Swab</option>
                            <option value="OT">Other</option>
                          </TextValidator>
                        </div>
                      </Col>

                      {this.state.unclesampleType === "OT" ? (
                        <Col lg={4} md={4} sm={4}>
                          <div className="form-group formbox">
                            <label>
                              {" "}
                          Sample Type<sup className="redstarText">*</sup>
                            </label>
                            <TextValidator
                              validators={["required"]}
                              errorMessages={this.state.inputError}
                              value={this.state.unclesampleTypeOther}
                              onChange={(e) => {
                                this.setState({
                                  unclesampleTypeOther: e.target.value,
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
                            value={this.state.uncleraceEthnicity}
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                            onChange={(e) => {
                              this.setState({
                                uncleraceEthnicity: e.target.value,
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
                      {this.state.uncleraceEthnicity === "Other" ? (
                        <Col lg={4} md={4} sm={4}>
                          <div className="form-group formbox">
                            <label>
                              {" "}
                          Race/Ethnicity<sup className="redstarText">*</sup>
                            </label>
                            <TextValidator
                              validators={["required"]}
                              errorMessages={["This field is required"]}
                              value={this.state.uncleraceEthnicityOther}
                              onChange={(e) => {
                                this.setState({
                                  uncleraceEthnicityOther: e.target.value,
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
                      <Col lg={4} md={12} sm={12}>
                        <div className="form-group formbox">
                          <div className="form-check">
                            <label className="form-check-label">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                name="optionscheckbox"
                                value=""
                                checked={this.state.uncleEmailme}
                                onChange={(e) => {
                                  this.setState({
                                    uncleEmailme: !this.state.uncleEmailme,
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
                                checked={this.state.uncleCallme}
                                value={this.state.uncleCallme}
                                onChange={(e) => {
                                  this.setState({
                                    uncleCallme: !this.state.uncleCallme,
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
                                checked={this.state.uncledateRead}
                                value={this.state.uncledateRead}
                                onChange={(value) => {
                                  if (this.state.uncledateRead === false) {
                                    this.setState({
                                      uncledateRead: true,
                                    });
                                  } else {
                                    this.setState({
                                      uncledateRead: false,
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
                          <label className="control-label"> Email  {this.state.motherEmailme ? null : (<sup className="redstarText">*</sup>)}</label>
                          <TextValidator
                            disabled={this.state.motherEmailme}
                            name="email"
                            type="email"
                            placeholder="Email"
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
                          <input
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
                      <Col lg={4} md={12} sm={12}>
                        <div className="form-group formbox">
                          <div className="form-check">
                            <label className="form-check-label">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                name="optionscheckbox"
                                value=""

                                checked={this.state.motherEmailme}
                                onChange={(value) => {
                                  if (this.state.motherEmailme === false) {
                                    this.setState({
                                      motherEmailme: true,
                                    });
                                  } else {
                                    this.setState({
                                      motherEmailme: false,
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
                                name="optionscheckbox"
                                value=""
                                checked={this.state.motherCallme}
                                onChange={(value) => {
                                  if (this.state.motherCallme === false) {
                                    this.setState({
                                      motherCallme: true,
                                    });
                                  } else {
                                    this.setState({
                                      motherCallme: false,
                                    });
                                  }
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
                                value={this.state.motherdateRead}
                                checked={this.state.motherdateRead}
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

                {this.state.childAge ? (
                  <div className="consortium-section-outer formsteps bottom-bordernone">
                    <h3>Child</h3>
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
                            selected={this.state.childdateofbirth}
                            placeholderText="Select a date"
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
                            {" "}
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
                          <label className="control-label"> Email{this.state.childEmailme ? null : (<sup className="redstarText">*</sup>)}</label>
                          <TextValidator
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={this.state.childemail}
                            disabled={this.state.childEmailme}
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
                          <input
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
                          <label>Driving License {this.state.childdateRead ? null : (<sup className="redstarText">*</sup>)}</label>
                          <TextValidator
                            disabled={this.state.childdateRead}
                            validators={this.state.childdateRead ? [] : ["required"]}
                            type="text"
                            value={this.state.childdrivingLicence}
                            placeholder="DL Number"
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
                          <label>DL State {this.state.childdateRead ? null : (<sup className="redstarText">*</sup>)}</label>
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
                                this.setState({ childsampleType: e.target.value });
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
                      <Col lg={4} md={12} sm={12}>
                        <div className="form-group formbox">
                          <div className="form-check">
                            <label className="form-check-label">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                name="optionscheckbox"
                                value=""
                                checked={this.state.childEmailme}
                                onChange={() => this.setState({ childEmailme: !this.state.childEmailme })}
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
                                checked={this.state.childCallme}
                                onChange={() => this.setState({ childCallme: !this.state.childCallme })}
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
                                checked={this.state.childdateRead}
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
                {this.state.child && !this.state.childAge ? (
                  <div className="consortium-section-outer formsteps bottom-bordernone">
                    <h3>Child</h3>
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
                                this.setState({ childsampleTypeOther: e.target.value });
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
                          Race/Ethnicity
                          <sup className="redstarText">*</sup>
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
                <div className="consortium-section-outer formsteps bottom-bordernone">
                  <h3>Additional Persons</h3>
                  {this.state.ap.map((val, idx) => (
                    <div className="multiple-persons-outer">
                      <div className="multiple-persons-header">
                        <h3>Additional Person {idx + 1}</h3>
                        {/* {this.state.ap.length > 1 && */}
                        <div className="addplus-box add-additional right-deleteicon">
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
                              selected={this.state.ap[idx].dob ? new Date(this.state.ap[idx].dob) : null}
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
                              disabled={this.state.ap[idx].pickupPreference}
                              name="email"
                              type="email"
                              placeholder="Email"
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
                            <input
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
                              type="text"
                              disabled={this.state.ap[idx].hasDL}
                              value={this.state.ap[idx].drivingLicence}
                              placeholder="DL Number"
                              name="drivingLicence"
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
                              disabled={this.state.ap[idx].hasDL ? true : false}
                              validators={this.state.ap[idx].hasDL ? [] : ["required"]}
                              errorMessages={["This field is required"]}
                              type="select"
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
                                type="text"
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
                                  checked={this.state.ap[idx].pickupPreference}
                                  data-id={idx}
                                  onChange={(e) => {
                                    let ap = [...this.state.ap];
                                    ap[e.target.dataset.id][e.target.name] = !ap[
                                      e.target.dataset.id
                                    ][e.target.name];
                                    ap[e.target.dataset.id]["phone"] = "";
                                    this.setState({
                                      ap,
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
                                  name="allowCall"
                                  checked={this.state.ap[idx].allowCall}
                                  data-id={idx}
                                  onChange={(e) => {
                                    if (
                                      this.state.ap[idx]
                                        .allowCall === false
                                    ) {
                                      let ap = [...this.state.ap];
                                      ap[e.target.dataset.id][
                                        "allowCall"
                                      ] = true;
                                      ap[e.target.dataset.id]["phone"] = "";
                                      this.setState({
                                        ap,
                                      });
                                    } else {
                                      let ap = [...this.state.ap];
                                      ap[e.target.dataset.id][
                                        "allowCall"
                                      ] = false;
                                      this.setState({
                                        ap,
                                      });
                                    }
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
                                  checked={this.state.ap[idx].hasDL}
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
                                checked={!this.state.hasTransplant}
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
                                checked={this.state.hasTransplant}
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
                      {this.state.hasTransplant ? (
                        <Col lg={4} md={4} sm={4}>
                          <div className="form-group formbox">
                            <label>
                              {" "}
                          Which Party?<sup className="redstarText">*</sup>
                            </label>
                            <input
                              value={this.state.party}
                              onChange={(e) => {
                                this.setState({
                                  party: e.target.value,
                                });
                              }}
                              type="text"
                              placeholder=" Which Party?"
                            />
                          </div>
                        </Col>
                      ) : null}
                      {this.state.hasTransplant ? (
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
                    Save
              </button>
                  {/* <button type="submit" className="bluebg margin-right10"> Print </button>
              <button type="submit" className="bluebg "> Next </button> */}
                </div>
              </div>
            </ValidatorForm>
          </Container>
          <NotificationContainer/>
        </div>
      </React.Fragment>
    );
  }
}

export default AvuncularOther;
