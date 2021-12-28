import React from "react";
import { Redirect } from "react-router-dom";
import "./index.css";
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

class PassportOther extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      motherDlState: "California",
      childDlState: "California",
      dlState: "California",
      name: "",
      phoneNumber: "",
      email: "",
      driversLicense: "",
      dateofbirth: "",
      motherdateofbirth: "",
      childDateOfBirth: "",
      dob: "",
      sampleType: "",
      sex: "Male",
      raceEthnicity: "",
      password: "",
      tabIndex: 0,
      inputError: "This field is required",
      dateRead: false,
      motherdateRead: false,
      relationdateRead: false,
      inputRead: false,
      mother: false,
      child: false,
      additionalPerson: false,
      phoneNo: "",
      additionalPersonName: "",
      childAge: false,
      grandFather: true,
      ap: [],

      childCallme: false,
      childEmailme: false,
      childdateRead: false,
      otherCallme: false,
      otherEmailme: false,
      otherdateRead: false,
      fatherCallme: false,
      fatherEmailme: false,
      fatherdateRead: false,
      motherCallme: false,
      motherEmailme: false,
      motherdateRead: false,
      fatherphoneNo: "",
      motherphoneNo: "",
      fatheremail: "",
      motheremail: "",
      otherEmail: ""
    };
  }

  componentDidMount() {
    debugger
    let { allegedMother, child, allegedFather, other, additionalPersons, bloodCellTransfusion } = this.props.formData;

    if (allegedFather) {
      this.setState({
        fatherFirstName: allegedFather.firstName,
        fatherLastName: allegedFather.lastName,
        fatherMiddleName: allegedFather.middleName,
        fatherDateOfBirth: allegedFather.dob ? new Date(allegedFather.dob) : null,
        fatherSex: allegedFather.gender,
        fatherphoneNo: allegedFather.phone,
        fatheremail: allegedFather.email,
        fatherPassword: allegedFather.password,
        fatherdrivingLicence: allegedFather.drivingLicence,
        fatherDlState: allegedFather.DlState,
        fatherSampleType: allegedFather.sampleType,
        fatherSampleTypeOther: allegedFather.sampleTypeOther,
        fatherRaceEthnicity: allegedFather.race,
        fatherRaceEthnicityOther: allegedFather.raceOther,
        fatherEmailme: allegedFather.pickupPreference,
        fatherCallme: allegedFather.allowCall,
        fatherisDl: allegedFather.hasDL,
      });
    }

    if (allegedMother) {
      this.setState({
        motherFirstName: allegedMother.firstName,
        motherMiddleName: allegedMother.middleName,
        motherLastName: allegedMother.lastName,
        motherDateOfBirth: allegedMother.dob ? new Date(allegedMother.dob) : null,
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
      });
    }

    if (child) {
      this.setState({
        childFirstName: child.firstName,
        childMiddleName: child.middleName,
        childLastName: child.lastName,
        childDateOfBirth: child.dob ? new Date(child.dob) : null,
        childSex: child.gender,
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
        childCallme: child.allowCall
      })
    }


    if (other) {
      this.setState({
        otherFirstName: other.firstName,
        otherMiddleName: other.middleName,
        otherLastName: other.lastName,
        otherDateOfBirth: other.dob ? new Date(other.dob) : null,
        otherSex: other.gender,
        otherPhoneNo: other.phone,
        otherEmail: other.email,
        otherPassword: other.password,
        otherDrivingLicence: other.drivingLicence,
        otherDlState: other.dlState,
        otherSampleType: other.sampleType,
        otherSampleTypeOther: other.sampleTypeOther,
        otherRaceEthnicity: other.race,
        otherRaceEthnicityOther: other.raceOther,
        otherdateRead: other.hasDL,
        otherEmailme: other.pickupPreference,
        otherCallme: other.allowCall,
      });
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
      driversLicense: this.props.formData.drivingLicence,
      relationship: this.props.formData.relationship,
      //allegedFather:allegedFather?true:false,
      // mother:allegedMother?true:false,
      // child:child?true:false,
      testType: this.props.formData.testType,
      additionalTest: this.props.formData.relationshipOther,
      relation: this.props.formData.relation,
      other: this.props.formData.relationshipOther ? true : false,
      grandFather: this.props.formData.relation == "Father" ? true : false,
      grandMother: this.props.formData.relation == "Mother" ? true : false,
    })

  }
  handleChanges = (date) => {
    this.setState({
      childDateOfBirth: date,
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
      id: this.state.id,
      name: this.state.name,
      phone: this.state.phoneNumber,
      email: this.state.email,
      drivingLicence: this.state.driversLicense,
      relationship: this.state.relationship,
      relationshipOther: this.state.additionalTest,
      passport: this.state.passport,
      relation: this.state.relation,
      testType: this.state.testType,
      allegedFather: {
        firstName: this.state.fatherFirstName,
        lastName: this.state.fatherLastName,
        middleName: this.state.faterMiddleName,
        dob: this.state.fatherDateOfBirth,
        gender: this.state.fatherSex,
        password: this.state.fatherPassword,
        phone: this.state.fatherCallme ? "" : this.state.fatherphoneNo,
        email: this.state.fatherEmailme ? "" : this.state.fatheremail,
        drivingLicence: this.state.fatherdateRead ? "" : this.state.fatherdrivingLicence,
        dlState: this.state.fatherdateRead ? "" : this.state.fatherDlState,
        sampleType: this.state.fatherSampleType,
        sampleTypeOther: this.state.fatherSampleTypeOther,
        itemTested: this.state.fatherTestedName,
        race: this.state.fatherRaceEthnicity,
        raceOther: this.state.fatherRaceEthnicityOther,
        pickupPreference: this.state.fatherEmailme,
        allowCall: this.state.fatherCallme,
        hasDL: this.state.fatherhasDL
      },
      allegedMother: {
        name: this.state.motherName,
        dob: this.state.motherdateofbirth,
        gender: this.state.mothersex,
        password: this.state.motherpassword,
        phone: this.state.motherCallme ? "" : this.state.motherphoneNo,
        email: this.state.motherEmailme ? "" : this.state.motheremail,
        drivingLicence: this.state.motherdateRead ? "" : this.state.motherdrivingLicence,
        dlState: this.state.motherdateRead ? "" : this.state.motherDlState,
        sampleType: this.state.mothersampleType,
        sampleTypeOther: this.state.mothersampleTypeOther,
        itemTested: this.state.testedname,
        race: this.state.motherraceEthnicity,
        raceOther: this.state.motherraceEthnicityOther,
        pickupPreference: this.state.motherEmailme,
        allowCall: this.state.motherCallme,
        hasDL: this.state.motherisdl,
        allegedMotherMiddleName: this.state.allegedMotherMiddleName,
        allegedMotherLastName: this.state.allegedMotherLastName,
      },
      other: {
        firstName: this.state.otherFirstName,
        lastName: this.state.otherLastName,
        middleName: this.state.otherMiddleName,
        dob: this.state.otherDateOfBirth,
        gender: this.state.otherSex,
        password: this.state.otherPassword,
        phone: this.state.otherCallme ? "" : this.state.otherPhoneNo,
        email: this.state.otherEmailme ? "" : this.state.otherEmail,
        drivingLicence: this.state.otherdateRead ? "" : this.state.otherdrivingLicence,
        dlState: this.state.otherdateRead ? "" : this.state.otherDlState,
        sampleType: this.state.otherSampleType,
        sampleTypeOther: this.state.otherSampleTypeOther,
        itemTested: this.state.otherTestedName,
        race: this.state.otherRaceEthnicity,
        raceOther: this.state.otherRaceEthnicityOther,
        pickupPreference: this.state.otherEmailme,
        allowCall: this.state.otherCallme,
        hasDL: this.state.otherhasDL
      },
      child: {
        firstName: this.state.childFirstName,
        lastName: this.state.childLastName,
        middleName: this.state.childMiddleName,
        dob: this.state.childDateOfBirth,
        gender: this.state.childSex,
        password: this.state.childPassword,
        phone: this.state.childCallme ? "" : this.state.childphoneNo,
        email: this.state.childEmailme ? "" : this.state.childEmail,
        drivingLicence: this.state.childdateRead ? "" : this.state.childdrivingLicence,
        dlState: this.state.childdateRead ? "" : this.state.childDlState,
        sampleType: this.state.childSampleType,
        sampleTypeOther: this.state.childSampleTypeOther,
        race: this.state.childRaceEthnicity,
        raceOther: this.state.childRaceEthnicityOther,
        pickupPreference: this.state.childEmailme,
        allowCall: this.state.childCallme,
        hasDL: this.state.childhasDL,
      },
      additionalPersons: this.state.ap,
      bloodCellTransfusion: {
        status: this.state.hasTransplant,
        party: this.state.hasTransplant ? this.state.party : null,
        when: this.state.hasTransplant ? this.state.transplantDate : null,
      },
    };
    console.log(formData);
    if (this.state.grandMother == false) {
      formData.allegedMother = {};
    }
    if (this.state.grandFather == false) {
      formData.allegedFather = {};
    }
    if (this.state.other == false) {
      formData.other = {};
    }
    if (this.state.child == false) {
      formData.child = {};
    }
    axios
      .post(apiPath.save_passport_form, formData, {
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
          sampleType: "",
          sampleTypeOther: "",
          race: "",
          raceOther: "",
          pickupPreference: false,
          allowCall: false,
          hasDL: false,
          additionalPersonMiddleName: "",
          additionalPersonLastName: "",
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
        <InnerHeader />

        <div className="form-container">
          <Container>
            <div className="header-content">
              <div className="header-left">
                <h2>Passport</h2>
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
                          Driving License<sup className="redstarText">*</sup>
                        </label>
                        <TextValidator
                          type="text"
                          value={this.state.driversLicense}
                          placeholder="DL Number"
                          validators={["required"]}
                          errorMessages={["This field is required"]}
                          onChange={(e) => {
                            this.setState({
                              driversLicense: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="consortium-section-outer formsteps margin-bottom20">
                  <h3>
                    Relationship:{" "}
                    <span className="light-textcolor">Legal/Court admissible</span>
                  </h3>
                  <Row className="margin-bottom20">
                    <Col lg={2} md={3} sm={3}>
                      <div className="form-group formbox m0">
                        <label>
                          Select Test Type<sup className="redstarText">*</sup>
                        </label>
                      </div>
                    </Col>
                    <Col lg={10} md={9} sm={9}>
                      <Row>
                        <Col lg={3} md={4} sm={6}>
                          <div className="form-group formbox">
                            <div className="form-check">
                              <label className="form-check-label">
                                <input
                                  type="radio"
                                  className="form-check-input"
                                  name="selecttest"
                                  checked={this.state.testType == "Paternity" ? true : false}
                                  onChange={() => this.setState({ testType: "Paternity" })}
                                />
                            Paternity
                            <i className="input-helper"></i>
                              </label>
                            </div>
                          </div>
                        </Col>
                        <Col lg={3} md={4} sm={6}>
                          <div className="form-group formbox">
                            <div className="form-check">
                              <label className="form-check-label">
                                <input
                                  type="radio"
                                  className="form-check-input"
                                  checked={this.state.testType == "Maternity" ? true : false}
                                  name="selecttest"
                                  onChange={() => this.setState({ testType: "Maternity" })}
                                />
                            Maternity
                            <i className="input-helper"></i>
                              </label>
                            </div>
                          </div>
                        </Col>
                        <Col lg={3} md={4} sm={6}>
                          <div className="form-group formbox">
                            <div className="form-check">
                              <label className="form-check-label">
                                <input
                                  type="radio"
                                  className="form-check-input"
                                  checked={this.state.testType == "Grandparentage" ? true : false}
                                  name="selecttest"
                                  onChange={() => this.setState({ testType: "Grandparentage" })}
                                />
                            Grandparentage
                            <i className="input-helper"></i>
                              </label>
                            </div>
                          </div>
                        </Col>
                        <Col lg={3} md={4} sm={6}>
                          <div className="form-group formbox">
                            <div className="form-check">
                              <label className="form-check-label">
                                <input
                                  type="radio"
                                  className="form-check-input"
                                  checked={this.state.testType == "Avuncular(Aunt/Uncle)" ? true : false}
                                  name="selecttest"
                                  onChange={() => this.setState({ testType: "Avuncular(Aunt/Uncle)" })}
                                />
                            Avuncular(Aunt/Uncle)
                            <i className="input-helper"></i>
                              </label>
                            </div>
                          </div>
                        </Col>
                        <Col lg={3} md={4} sm={6}>
                          <div className="form-group formbox">
                            <div className="form-check">
                              <label className="form-check-label">
                                <input
                                  type="radio"
                                  className="form-check-input"
                                  checked={this.state.testType == "Siblingship" ? true : false}
                                  name="selecttest"
                                  onChange={() => this.setState({ testType: "Siblingship" })}
                                />
                            Siblingship
                            <i className="input-helper"></i>
                              </label>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={2} md={3} sm={3}>
                      <div className="form-group formbox m0">
                        <label>
                          Relationship<sup className="redstarText">*</sup>
                        </label>
                      </div>
                    </Col>
                    <Col lg={10} md={9} sm={9}>
                      <Row>
                        <Col lg={3} md={4} sm={6}>
                          <div className="form-group formbox">
                            <div className="form-check">
                              <label className="form-check-label">
                                <input
                                  type="radio"
                                  className="form-check-input"
                                  name="optionscheckbox"
                                  value=""
                                  checked={this.state.relation == "Father" ? true : false}
                                  onChange={(e) => {
                                    this.setState({
                                      grandMother: false,
                                      grandFather: true,
                                      other: false,
                                      relation: "Father",
                                    });
                                  }}
                                />{" "}
                            Father
                            <i className="input-helper"></i>
                              </label>
                            </div>
                          </div>
                        </Col>
                        <Col lg={3} md={4} sm={6}>
                          <div className="form-group formbox">
                            <div className="form-check">
                              <label className="form-check-label">
                                <input
                                  type="radio"
                                  className="form-check-input"
                                  name="optionscheckbox"
                                  value=""
                                  checked={this.state.relation == "Mother" ? true : false}
                                  onChange={(e) => {
                                    this.setState({
                                      grandMother: true,
                                      grandFather: false,
                                      other: false,
                                      relation: "Mother",
                                    });
                                  }}
                                />{" "}
                            Mother
                            <i className="input-helper"></i>
                              </label>
                            </div>
                          </div>
                        </Col>
                        <Col lg={3} md={4} sm={6}>
                          <div className="form-group formbox">
                            <div className="form-check">
                              <label className="form-check-label">
                                <input
                                  type="radio"
                                  className="form-check-input"
                                  name="optionscheckbox"
                                  value=""
                                  checked={this.state.relation == "Other" ? true : false}
                                  onChange={(e) => {
                                    this.setState({
                                      grandMother: false,
                                      grandFather: false,
                                      other: true,
                                      relation: "Other",
                                    });
                                  }}
                                />{" "}
                            Other
                            <i className="input-helper"></i>
                              </label>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  {this.state.relation == "Other" ? (
                    <Row>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox">
                          <label>
                            {" "}
                      Other<sup className="redstarText">*</sup>
                          </label>
                          <TextValidator
                            validators={["required"]}
                            errorMessages={this.state.inputError}
                            type="text"
                            placeholder="Enter Other"
                            value={this.state.additionalTest}
                            onChange={(e) => {
                              this.setState({ additionalTest: e.target.value });
                            }}
                          />
                        </div>
                      </Col>
                    </Row>
                  ) : null}
                </div>
                {this.state.grandFather ? (
                  <div className="consortium-section-outer formsteps bottom-bordernone">
                    <h3>Father</h3>
                    <Row>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox">
                          <label className="control-label">
                            First Name<sup className="redstarText">*</sup>
                          </label>
                          <TextValidator
                            name="name"
                            type="text"
                            value={this.state.fatherFirstName}
                            placeholder="First Name"
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                            onChange={(e) => {
                              let value = e.target.value;
                              value = value.replace(/[^A-Za-z\s]/gi, "");
                              this.setState({
                                fatherFirstName: value,
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
                            value={this.state.faterMiddleName}
                            placeholder="Middle Name"
                            onChange={(e) => {
                              let value = e.target.value;
                              value = value.replace(/[^A-Za-z\s]/gi, "");
                              this.setState({
                                faterMiddleName: value,
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
                            value={this.state.fatherLastName}
                            placeholder="Last Name"
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                            onChange={(e) => {
                              let value = e.target.value;
                              value = value.replace(/[^A-Za-z\s]/gi, "");
                              this.setState({
                                fatherLastName: value,
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
                            selected={this.state.fatherDateOfBirth}
                            onChange={(date) => {
                              this.setState({
                                fatherDateOfBirth: date,
                              });
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
                            value={this.state.fatherDateOfBirth}
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
                            value={this.state.fatherSex}
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                            onChange={(e) => {
                              this.setState({ fatherSex: e.target.value });
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
                        Phone<sup className="redstarText">*</sup>{" "}
                          </label>
                          <PhoneValidator
                            validators={["required"]}
                            errorMessages={this.state.inputError}
                            value={this.state.fatherphoneNo}
                            onChange={(phone) =>
                              this.setState({ fatherphoneNo: phone })
                            }
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox">
                          <label className="control-label"> Email<sup className="redstarText">*</sup></label>
                          <TextValidator
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={this.state.fatheremail}
                            validators={["required", "isEmail"]}
                            errorMessages={[
                              "This field is required",
                              "Email is not valid",
                            ]}
                            onChange={(e) => {
                              this.setState({ fatheremail: e.target.value });
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
                            value={this.state.fatherPassword}
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                            onChange={(e) => {
                              const re = /^[0-9\b]+$/;
                              if (
                                e.target.value === "" ||
                                re.test(e.target.value)
                              ) {
                                this.setState({ fatherPassword: e.target.value });
                              }
                            }}
                          />
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
                            value={this.state.fatherSampleType}
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                            onChange={(e) => {
                              this.setState({ fatherSampleType: e.target.value });
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
                      {this.state.fatherSampleType === "OT" ? (
                        <Col lg={4} md={4} sm={4}>
                          <div className="form-group formbox">
                            <label>
                              {" "}
                          Sample Type<sup className="redstarText">*</sup>
                            </label>
                            <TextValidator
                              validators={["required"]}
                              errorMessages={this.state.inputError}
                              type="text"
                              value={this.state.fatherSampleTypeOther}
                              onChange={(e) => {
                                this.setState({
                                  fatherSampleTypeOther: e.target.value,
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
                            value={this.state.fatherRaceEthnicity}
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                            onChange={(e) => {
                              this.setState({
                                fatherRaceEthnicity: e.target.value,
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
                      {this.state.fatherRaceEthnicity === "Other" ? (
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
                              value={this.state.fatherRaceEthnicityOther}
                              onChange={(e) => {
                                this.setState({
                                  fatherRaceEthnicityOther: e.target.value,
                                });
                              }}
                              placeholder="Enter Other"
                            />
                          </div>
                        </Col>
                      ) : null}
                    </Row>
                  </div>
                ) : null}
                {this.state.grandMother ? (
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
                            value={this.state.allegedMotherMiddleName}
                            placeholder="Middle Name"
                            onChange={(e) => {
                              let value = e.target.value;
                              value = value.replace(/[^A-Za-z\s]/gi, "");
                              this.setState({
                                allegedMotherMiddleName: value,
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
                            value={this.state.allegedMotherLastName}
                            placeholder="Last Name"
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                            onChange={(e) => {
                              let value = e.target.value;
                              value = value.replace(/[^A-Za-z\s]/gi, "");
                              this.setState({
                                allegedMotherLastName: value,
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
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                            onChange={(date) => {
                              this.setState({
                                motherdateofbirth: date,
                              });
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
                        Phone<sup className="redstarText">*</sup>{" "}
                          </label>
                          <PhoneValidator
                            validators={["required"]}
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
                          <label className="control-label"> Email<sup className="redstarText">*</sup></label>
                          <TextValidator
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={this.state.motheremail}
                            validators={["required", "isEmail"]}
                            errorMessages={[
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
                            <option value="OT">Other</option>
                          </TextValidator>
                        </div>
                      </Col>
                    </Row>
                    <Row>
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
                              type="text"
                              value={this.state.mothersampleTypeOther}
                              onChange={(e) => {
                                this.setState({
                                  mothersampleTypeOther: e.target.value,
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
                              type="text"
                              value={this.state.motherraceEthnicityOther}
                              onChange={(e) => {
                                this.setState({
                                  motherraceEthnicityOther: e.target.value,
                                });
                              }}
                              placeholder="Enter Other"
                            />
                          </div>
                        </Col>
                      ) : null}
                    </Row>
                  </div>
                ) : null}

                {this.state.other ? (
                  <div className="consortium-section-outer formsteps bottom-bordernone">
                    <h3>{this.state.additionalTest || "Other"}</h3>
                    <Row>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox">
                          <label className="control-label">
                            First Name<sup className="redstarText">*</sup>
                          </label>
                          <TextValidator
                            name="name"
                            type="text"
                            value={this.state.otherFirstName}
                            placeholder="First Name"
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                            onChange={(e) => {
                              let value = e.target.value;
                              value = value.replace(/[^A-Za-z\s]/gi, "");
                              this.setState({
                                otherFirstName: value,
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
                            value={this.state.otherMiddleName}
                            placeholder="Middle Name"
                            onChange={(e) => {
                              let value = e.target.value;
                              value = value.replace(/[^A-Za-z\s]/gi, "");
                              this.setState({
                                otherMiddleName: value,
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
                            value={this.state.otherLastName}
                            placeholder="Last Name"
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                            onChange={(e) => {
                              let value = e.target.value;
                              value = value.replace(/[^A-Za-z\s]/gi, "");
                              this.setState({
                                otherLastName: value,
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
                            selected={this.state.otherDateOfBirth}
                            onChange={(date) => {
                              this.setState({
                                otherDateOfBirth: date,
                              });
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
                            value={this.state.otherDateOfBirth}
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
                            value={this.state.otherSex}
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                            onChange={(e) => {
                              this.setState({ otherSex: e.target.value });
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
                        Phone<sup className="redstarText">*</sup>{" "}
                          </label>
                          <PhoneValidator
                            validators={["required"]}
                            errorMessages={this.state.inputError}
                            value={this.state.otherPhoneNo}
                            onChange={(phone) =>
                              this.setState({ otherPhoneNo: phone })
                            }
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox">
                          <label className="control-label"> Email <sup className="redstarText">*</sup></label>
                          <TextValidator
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={this.state.otherEmail}
                            validators={["required", "isEmail"]}
                            errorMessages={[
                              "This field is required",
                              "Email is not valid",
                            ]}
                            onChange={(e) => {
                              this.setState({ otherEmail: e.target.value });
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
                            value={this.state.otherPassword}
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                            onChange={(e) => {
                              const re = /^[0-9\b]+$/;
                              if (
                                e.target.value === "" ||
                                re.test(e.target.value)
                              ) {
                                this.setState({ otherPassword: e.target.value });
                              }
                            }}
                          />
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
                            value={this.state.otherSampleType}
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                            onChange={(e) => {
                              this.setState({ otherSampleType: e.target.value });
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
                      {this.state.otherSampleType === "OT" ? (
                        <Col lg={4} md={4} sm={4}>
                          <div className="form-group formbox">
                            <label>
                              {" "}
                          Sample Type<sup className="redstarText">*</sup>
                            </label>
                            <TextValidator
                              validators={["required"]}
                              errorMessages={this.state.inputError}
                              type="text"
                              value={this.state.otherSampleTypeOther}
                              onChange={(e) => {
                                this.setState({
                                  otherSampleTypeOther: e.target.value,
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
                            value={this.state.otherRaceEthnicity}
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                            onChange={(e) => {
                              this.setState({
                                otherRaceEthnicity: e.target.value,
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
                      {this.state.otherRaceEthnicity === "Other" ? (
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
                              value={this.state.otherRaceEthnicityOther}
                              onChange={(e) => {
                                this.setState({
                                  otherRaceEthnicityOther: e.target.value,
                                });
                              }}
                              placeholder="Enter Other"
                            />
                          </div>
                        </Col>
                      ) : null}
                    </Row>
                  </div>
                ) : null}

                {this.state.childAge ? (
                  <div className="consortium-section-outer formsteps bottom-bordernone">
                    <h3>Child</h3>
                    <Row>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox">
                          <label className="control-label">Name</label>
                          <TextValidator
                            name="name"
                            type="text"
                            value={this.state.childFirstName}
                            placeholder="Name"
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
                          <label>DOB</label>
                          <DatePicker
                            placeholderText="Select a date"
                            selected={this.state.childDateOfBirth}
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
                            value={this.state.childDateOfBirth}
                            readOnly
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                          />
                        </div>
                      </Col>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox selectbox">
                          <label>Sex</label>
                          <TextValidator
                            type="select"
                            value={this.state.childSex}
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                            onChange={(e) => {
                              this.setState({ childSex: e.target.value });
                            }}
                          >
                            <option value="">Select Sex</option>
                            <option value="MA">Male</option>
                            <option value="FE">Female</option>
                          </TextValidator>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox">
                          <label className="control-label"> Phone </label>
                          <PhoneValidator
                            validators={["required"]}
                            errorMessages={this.state.inputError}
                            value={this.state.childPhoneNo}
                            onChange={(phone) =>
                              this.setState({ childPhoneNo: phone })
                            }
                          />
                        </div>
                      </Col>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox">
                          <label className="control-label"> Email<sup className="redstarText">*</sup></label>
                          <TextValidator
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={this.state.childEmail}
                            validators={["required", "isEmail"]}
                            errorMessages={[
                              "This field is required",
                              "Email is not valid",
                            ]}
                            onChange={(e) => {
                              this.setState({ childEmail: e.target.value });
                            }}
                          />
                        </div>
                      </Col>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox">
                          <label className="control-label"> Password</label>
                          <TextValidator
                            maxLength="4"
                            name="Password"
                            type="text"
                            pattern="^[0-9]{4}$"
                            placeholder="Password"
                            autoComplete="off"
                            value={this.state.childPassword}
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                            onChange={(e) => {
                              const re = /^[0-9\b]+$/;
                              if (
                                e.target.value === "" ||
                                re.test(e.target.value)
                              ) {
                                this.setState({ childPassword: e.target.value });
                              }
                            }}
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox">
                          <label>Driving License </label>
                          <TextValidator
                            disabled={this.state.childdateRead}
                            type="text"
                            value={this.state.childDrivingLicence}
                            placeholder="DL Number"
                            onChange={(e) => {
                              this.setState({
                                childDrivingLicence: e.target.value,
                              });
                            }}
                          />
                        </div>
                      </Col>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox ">
                          <label>
                            DL State <sup className="redstarText">*</sup>
                          </label>
                          <TextValidator
                            disabled={this.state.childdateRead ? true : false}
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
                          <label> Sample Type</label>
                          <TextValidator
                            type="select"
                            value={this.state.childSampleType}
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                            onChange={(e) => {
                              this.setState({ childSampleType: e.target.value });
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
                            <label> Sample Type</label>
                            <TextValidator
                              validators={["required"]}
                              errorMessages={this.state.inputError}
                              type="text"
                              value={this.state.childSampleTypeOther}
                              onChange={(e) => {
                                this.setState({
                                  childSampleTypeOther: e.target.value,
                                });
                              }}
                              placeholder="Enter Other"
                            />
                          </div>
                        </Col>
                      ) : null}

                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox selectbox">
                          <label>Race/Ethnicity</label>
                          <TextValidator
                            type="select"
                            value={this.state.childRaceEthnicity}
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                            onChange={(e) => {
                              this.setState({
                                childRaceEthnicity: e.target.value,
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
                      {this.state.childRaceEthnicity === "Other" ? (
                        <Col lg={4} md={4} sm={4}>
                          <div className="form-group formbox">
                            <label> Race/Ethnicity</label>
                            <TextValidator
                              validators={["required"]}
                              errorMessages={["This field is required"]}
                              type="text"
                              value={this.state.childRaceEthnicityOther}
                              onChange={(e) => {
                                this.setState({
                                  childRaceEthnicityOther: e.target.value,
                                });
                              }}
                              placeholder="Enter Other"
                            />
                          </div>
                        </Col>
                      ) : null}
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
                          <label>DOB</label>
                          <DatePicker
                            placeholderText="Select a date"
                            selected={this.state.childDateOfBirth}
                            onChange={(date) => {
                              this.setState({
                                childDateOfBirth: date,
                              });
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
                            value={this.state.childDateOfBirth}
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
                            value={this.state.childSex}
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                            onChange={(e) => {
                              this.setState({ childSex: e.target.value });
                            }}
                          >
                            <option value="">Select Sex</option>
                            <option value="MA">Male</option>
                            <option value="FE">Female</option>
                          </TextValidator>
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox selectbox">
                          <label>
                            {" "}
                        Sample Type<sup className="redstarText">*</sup>
                          </label>
                          <TextValidator
                            type="select"
                            value={this.state.childSampleType}
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                            onChange={(e) => {
                              this.setState({ childSampleType: e.target.value });
                            }}
                          >
                            <option value="">Select Sample Type</option>
                            <option value="BS">Buccal Swab</option>
                            <option value="OT">Other</option>
                          </TextValidator>
                        </div>
                      </Col>
                      {this.state.childSampleType === "OT" ? (
                        <Col lg={4} md={4} sm={4}>
                          <div className="form-group formbox">
                            <label>
                              {" "}
                          Sample Type
                          <sup className="redstarText">*</sup>
                            </label>
                            <TextValidator
                              validators={["required"]}
                              errorMessages={this.state.inputError}
                              type="text"
                              value={this.state.childSampleTypeOther}
                              onChange={(e) => {
                                this.setState({
                                  childSampleTypeOther: e.target.value,
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
                            Race/Ethnicity
                        <sup className="redstarText">*</sup>
                          </label>
                          <TextValidator
                            type="select"
                            value={this.state.childRaceEthnicity}
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                            onChange={(e) => {
                              this.setState({
                                childRaceEthnicity: e.target.value,
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
                              type="text"
                              value={this.state.childRaceEthnicityOther}
                              onChange={(e) => {
                                this.setState({
                                  childRaceEthnicityOther: e.target.value,
                                });
                              }}
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
                              Phone<sup className="redstarText">*</sup>{" "}
                            </label>
                            <PhoneValidator
                              validators={["required"]}
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
                              <label> Race/Ethnicity</label>
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
                      <sup className="redstarText">*</sup> Have any of the
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
                                checked={this.state.hasTransplant}
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
                      {this.state.inputRead === false ? (
                        <Col lg={4} md={4} sm={4}>
                          <div className="form-group formbox">
                            <label>
                              {" "}
                          Which Party?<sup className="redstarText">*</sup>
                            </label>
                            <input
                              type="text"
                              value={this.state.party}
                              onChange={(e) => {
                                this.setState({
                                  party: e.target.value,
                                });
                              }}
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
                  <div className="beneficiary-heading passport-content">
                    <p>
                      {" "}
                  Passport Test Results sent directly to US Department of State
                  Western Passport Center 44132 Mercure Circle PO Box 1178
                  Sterling, Virginia 20166-1178
                </p>
                    <p>
                      Please have the letter from the USCIS or US Passport Center
                      requesting proof of relationship ready.
                </p>
                  </div>

                  <div className="bottom-btn-group pull-right clearfix">
                    <button type="submit" className="bluebg margin-right10">
                      {" "}
                  Save{" "}
                    </button>
                  </div>
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

export default PassportOther;
