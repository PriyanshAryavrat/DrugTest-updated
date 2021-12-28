import React from "react";
import { Link, Redirect } from "react-router-dom";
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

var array = [];
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
});
var age;
class Paternity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      name: "",
      phoneNumber: "",
      email: "",
      drivingLicence: "",
      dateofbirth: "",
      motherdateofbirth: "",
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
      allegedFather: true,
      motherpassword: "",
      childpassword: "",
      relationpassword: "",
      fatherEmailme: false,
      fatherCallme: false,
      fatherisDl: false,
      fatherDlState: "California",
      motherDlState: "California",
      childDlState: "California",
      dlState: "California",
      relationEmailme: false,
      ap: [],
      relationCallme: false,
      fatherdateRead: false,
      childCallme: false,
      childEmailme: false,
      childdateRead: false,
    };
  }

  componentDidMount() {


    let { allegedMother, child, allegedFather, other, additionalPersons, bloodCellTransfusion } = this.props.formData;

    if (allegedFather) {
      this.setState({
        fatherFirstName: allegedFather.firstName,
        fatherLastName: allegedFather.lastName,
        fatherMiddleName: allegedFather.middleName,
        dateofbirth: (allegedFather.dob) ? new Date(allegedFather.dob) : null,
        sex: allegedFather.gender,
        phoneNo: allegedFather.phone,
        fatheremail: allegedFather.email,
        password: allegedFather.password,
        fatherdrivingLicence: allegedFather.drivingLicence,
        fatherDlState: allegedFather.dlState,
        fathersampleType: allegedFather.sampleType,
        fathersampleTypeOther: allegedFather.sampleTypeOther,
        fatherraceEthnicity: allegedFather.race,
        fatherraceEthnicityOther: allegedFather.raceOther,
        fatherEmailme: allegedFather.pickupPreference,
        fatherCallme: allegedFather.allowCall,
        fatherisDl: allegedFather.hasDL == 'true' ? true : false,
        fatherdateRead: allegedFather.hasDL == 'true' ? true : false,
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
        motherisdl: allegedMother.hasDL == 'true' ? true : false,
        motherdateRead: allegedMother.hasDL == 'true' ? true : false
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
        childdateRead: child.hasDL == 'true' ? true : false,
        childEmailme: child.pickupPreference,
        childCallme: child.allowCall
      })
      if (child.dob) {
        this.handleChanges(new Date(child.dob));
      }

    }

    if (other) {
      this.setState({
        otherFirstName: other.firstName,
        otherMiddleName: other.middleName,
        otherlastName: other.lastName,
        otherdateofbirth: other.dob ? new Date(other.dob) : null,
        otherSex: other.gender,
        otherphoneNo: other.phone,
        otheremail: other.email,
        otherpassword: other.password,
        otherdrivingLicence: other.drivingLicence,
        otherDlState: other.dlState,
        othersampleType: other.sampleType,
        othersampleTypeOther: other.sampleTypeOther,
        otherraceEthnicity: other.race,
        otherraceEthnicityOther: other.raceOther,
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
      drivingLicence: this.props.formData.drivingLicence,
      relationship: this.props.formData.relationship,
      allegedFather: allegedFather && allegedFather.dob ? true : false,
      mother: allegedMother && allegedMother.dob ? true : false,
      child: child && child.dob ? true : false,
    })

  }
  handleChanges(date) {
    console.log(date);
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
    if (age >= 18) {
      this.setState({
        childAge: true,
      });
    } else if (age < 18) {
      this.setState({
        childAge: false,
      });
    }
  }

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
      drivingLicence: this.state.drivingLicence,
      relationship: this.state.relationship,
      allegedFather: {
        firstName: this.state.fatherFirstName,
        lastName: this.state.fatherLastName,
        middleName: this.state.fatherMiddleName,
        dob: this.state.dateofbirth,
        gender: this.state.sex,
        phone: this.state.fatherCallme ? "" : this.state.phoneNo,
        email: this.state.fatherEmailme ? "" : this.state.fatheremail,
        drivingLicence: this.state.fatherdateRead ? "" : this.state.fatherdrivingLicence,
        dlState: this.state.fatherdateRead ? "" : this.state.fatherDlState,
        password: this.state.password,
        sampleType: this.state.fathersampleType,
        sampleTypeOther: this.state.fathersampleTypeOther,
        race: this.state.fatherraceEthnicity,
        raceOther: this.state.fatherraceEthnicityOther,
        pickupPreference: this.state.fatherEmailme,
        allowCall: this.state.fatherCallme,
        hasDL: this.state.fatherdateRead
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
        hasDL: this.state.childdateRead,
        pickupPreference: this.state.childEmailme,
        allowCall: this.state.childCallme,
      },
      additionalPersons: this.state.ap,
      bloodCellTransfusion: {
        status: this.state.hasTransplant,
        party: this.state.hasTransplant ? this.state.party : null,
        when: this.state.hasTransplant ? this.state.transplantDate : null,
      },
    };
    if (this.state.allegedFather == false) {
      formData.allegedFather = {};
    }
    if (this.state.mother == false) {
      formData.allegedMother = {};
    }
    if (this.state.child == false) {
      formData.child = {};
    }

    axios
      .post(apiPath.save_paternity_form, formData, {
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
          hasDL: false
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
                <h2>Paternity</h2>
              </div>

            </div>
            <ValidatorForm
              onError={(e) => {
                console.log(e);
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
                          disabled={true}
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
                          disabled={true}
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
                          disabled={true}
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
                          Driving License
                              <sup className="redstarText">*</sup>{" "}
                        </label>
                        <TextValidator
                          type="text"
                          disabled={true}
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
                                checked={this.state.relationship == "Legal/Court admissible" ? true : false}
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
                                checked={this.state.relationship != "Legal/Court admissible" ? true : false}
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
                  <Row>
                    <Col lg={3} md={4} sm={12}>
                      <div className="form-group formbox m0">
                        <label>
                          Relationship<sup className="redstarText">*</sup>
                        </label>
                      </div>
                    </Col>
                    <Col lg={9} md={8} sm={12}>
                      <Row>
                        <Col lg={4} md={6} sm={4}>
                          <div className="form-group formbox">
                            <div className="form-check">
                              <label className="form-check-label">
                                <input
                                  type="checkbox"
                                  checked={this.state.allegedFather}
                                  className="form-check-input"
                                  name="optionscheckbox"
                                  value=""
                                  onChange={(e) => {
                                    // this.setState({
                                    //   allegedFather:!this.state.allegedFather
                                    // })
                                  }}
                                />{" "}
                                    Alleged Father
                                    <i className="input-helper"></i>
                              </label>
                            </div>
                          </div>
                        </Col>
                        <Col lg={4} md={6} sm={4}>
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
                        <Col lg={4} md={6} sm={4}>
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
                                      childAge: false,
                                    });
                                  }}
                                />{" "}
                                    Child
                                    <i className="input-helper"></i>
                              </label>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>
                {this.state.allegedFather ? (
                  <div className="consortium-section-outer formsteps bottom-bordernone">
                    <h3>Alleged Father</h3>
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
                          <label className="control-label">
                            Middle Name
                              </label>
                          <TextValidator
                            name="name"
                            type="text"
                            value={this.state.fatherMiddleName}
                            placeholder="Middle Name"
                            onChange={(e) => {
                              let value = e.target.value;
                              value = value.replace(/[^A-Za-z\s]/gi, "");
                              this.setState({
                                fatherMiddleName: value,
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
                            selected={this.state.dateofbirth}
                            onChange={(date) => {
                              this.setState({
                                dateofbirth: date,
                              });
                            }}
                            className="form-control"
                            name="dateofbirth"
                            dateFormat="MM/dd/yyyy"
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            errorMessages={["This field is required"]}
                          />
                          <TextValidator
                            name="enddate"
                            className="mrgbotm"
                            tabIndex={-1}
                            autoComplete="off"
                            style={{ opacity: 0, height: 0, padding: 0 }}
                            value={this.state.dateofbirth}
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
                            value={this.state.sex}
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                            onChange={(e) => {
                              this.setState({ sex: e.target.value });
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
                                Phone{this.state.fatherCallme ? null : (<sup className="redstarText">*</sup>)}
                          </label>
                          <PhoneValidator
                            disabled={this.state.fatherCallme}
                            validators={this.state.fatherCallme ? [] : ["required"]}
                            errorMessages={this.state.inputError}
                            value={this.state.phoneNo}
                            onChange={(phone) =>
                              this.setState({ phoneNo: phone })
                            }
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox">
                          <label className="control-label"> Email{this.state.fatherEmailme ? null : (<sup className="redstarText">*</sup>)}</label>
                          <TextValidator
                            disabled={this.state.fatherEmailme}
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={this.state.fatheremail}
                            validators={this.state.fatherEmailme ? ["isEmail"] : ["required", "isEmail"]}
                            errorMessages={this.state.fatherEmailme ? [
                              "Email is not valid",
                            ] : [
                                "This field is required",
                                "Email is not valid",
                              ]}
                            onChange={(e) => {
                              this.setState({
                                fatheremail: e.target.value,
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
                            type="text"
                            placeholder="Password"
                            value={this.state.password}
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                            onChange={(e) => {
                              const re = /^[0-9\b]+$/;
                              if (
                                e.target.value === "" ||
                                re.test(e.target.value)
                              ) {
                                this.setState({ password: e.target.value });
                              }
                            }}
                          />
                        </div>
                      </Col>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox">
                          <label>Driving License {this.state.fatherdateRead ? null : (<sup className="redstarText">*</sup>)}</label>
                          <TextValidator
                            disabled={this.state.fatherdateRead}
                            type="text"
                            value={this.state.fatherdrivingLicence}
                            placeholder="DL Number"
                            validators={this.state.fatherdateRead ? [] : ["required"]}
                            errorMessages={["This field is required"]}
                            onChange={(e) => {
                              this.setState({
                                fatherdrivingLicence: e.target.value,
                              });
                            }}
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox ">
                          <label> DL State {this.state.fatherdateRead ? null : (<sup className="redstarText">*</sup>)}</label>
                          <TextValidator
                            disabled={this.state.fatherdateRead}
                            type="select"
                            validators={this.state.fatherdateRead ? [] : ["required"]}
                            value={this.state.fatherDlState}
                            errorMessages={["This field is required"]}
                            onChange={(e) => {
                              this.setState({
                                fatherDlState: e.target.value,
                              });
                            }}
                          >
                            <option>Select State</option>
                            {StateData.map((item) => {
                              return (
                                <option key={item.name}>{item.name}</option>
                              );
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
                            value={this.state.fathersampleType}
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                            onChange={(e) => {
                              this.setState({
                                fathersampleType: e.target.value,
                              });
                            }}
                          >
                            <option>--Select Sample Type--</option>
                            <option value="BS">Buccal Swab</option>
                            <option value="OT">Other</option>
                          </TextValidator>
                        </div>
                      </Col>
                      {this.state.fathersampleType === "OT" ? (
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
                              placeholder="Enter Other"
                              value={this.state.fathersampleTypeOther}
                              onChange={(e) => {
                                this.setState({
                                  fathersampleTypeOther: e.target.value,
                                });
                              }}
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
                            value={this.state.fatherraceEthnicity}
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                            onChange={(e) => {
                              this.setState({
                                fatherraceEthnicity: e.target.value,
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
                      {this.state.fatherraceEthnicity === "Other" ? (
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
                              value={this.state.fatherraceEthnicityOther}
                              onChange={(e) => {
                                this.setState({
                                  fatherraceEthnicityOther: e.target.value,
                                });
                              }}
                              type="text"
                              required="required"
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
                                checked={this.state.fatherEmailme}
                                onChange={(e) => {
                                  this.setState({
                                    fatherEmailme: !this.state
                                      .fatherEmailme,
                                  });
                                }}
                              />{" "}
                                  I prefer to pick up the results. Do not email
                                  me.
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
                                checked={this.state.fatherCallme}
                                onChange={(e) => {
                                  this.setState({
                                    fatherCallme: !this.state
                                      .fatherCallme,
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
                                value={this.state.fatherdateRead}
                                checked={this.state.fatherdateRead}
                                onChange={(value) => {
                                  if (this.state.fatherdateRead === false) {
                                    this.setState({
                                      fatherhasDL: true,
                                      fatherdateRead: true
                                    });
                                  } else {
                                    this.setState({
                                      fatherhasDL: false,
                                      fatherdateRead: false
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
                          <label className="control-label">
                            Middle Name
                              </label>
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
                              this.setState({
                                motheremail: e.target.value,
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
                                this.setState({
                                  motherpassword: e.target.value,
                                });
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
                            validators={this.state.motherdateRead ? [] : ["required"]}
                            type="text"
                            value={this.state.motherdrivingLicence}
                            placeholder="DL Number"
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
                            disabled={
                              this.state.motherdateRead
                            }
                            validators={this.state.motherdateRead ? [] : ["required"]}
                            type="select"
                            errorMessages={["This field is required"]}
                            value={this.state.motherDlState}
                            onChange={(e) => {
                              this.setState({
                                motherDlState: e.target.value,
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
                            value={this.state.mothersampleType}
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                            onChange={(e) => {
                              this.setState({
                                mothersampleType: e.target.value,
                              });
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
                                  Sample Type
                                  <sup className="redstarText">*</sup>
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
                            Race/Ethnicity
                                <sup className="redstarText">*</sup>
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
                                  Race/Ethnicity
                                  <sup className="redstarText">*</sup>
                            </label>
                            <TextValidator
                              validators={["required"]}
                              errorMessages={["This field is required"]}
                              type="text"
                              value={this.state.motherraceEthnicityOther}
                              placeholder="Enter Other"
                              onChange={(e) => {
                                this.setState({
                                  motherraceEthnicityOther: e.target.value,
                                });
                              }}
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
                                onChange={(e) => {
                                  this.setState({
                                    motherEmailme: !this.state
                                      .motherEmailme,
                                  });
                                }}
                              />{" "}
                                  I prefer to pick up the results. Do not email
                                  me.
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
                                checked={this.state.motherdateRead}
                                value={this.state.motherdateRead}
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
                          <label className="control-label">
                            Middle Name
                              </label>
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
                              this.handleChanges(date);
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
                                this.setState({
                                  childpassword: e.target.value,
                                });
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
                            type="select"
                            errorMessages={["This field is required"]}
                            value={this.state.childDlState}
                            onChange={(e) => {
                              this.setState({
                                childDlState: e.target.value,
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
                            value={this.state.childsampleType}
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                            onChange={(e) => {
                              this.setState({
                                childsampleType: e.target.value,
                              });
                            }}
                          >
                            {" "}
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
                                  Sample Type
                                  <sup className="redstarText">*</sup>
                            </label>
                            <TextValidator
                              validators={["required"]}
                              errorMessages={this.state.inputError}
                              type="text"
                              value={this.state.childsampleTypeOther}
                              onChange={(e) => {
                                this.setState({
                                  childsampleTypeOther: e.target.value,
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
                                  I prefer to pick up the results. Do not email
                                  me.
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
                                value={this.state.childdateRead}
                                checked={this.state.childdateRead}
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
                          <label className="control-label">
                            Middle Name
                              </label>
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
                              this.handleChanges(date);
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
                              this.setState({
                                childsampleType: e.target.value,
                              });
                            }}
                          >
                            {" "}
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
                                  Sample Type
                                  <sup className="redstarText">*</sup>
                            </label>
                            <TextValidator
                              validators={["required"]}
                              errorMessages={this.state.inputError}
                              type="text"
                              value={this.state.childsampleTypeOther}
                              onChange={(e) => {
                                this.setState({
                                  childsampleTypeOther: e.target.value,
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
                              type="text"
                              value={this.state.childraceEthnicityOther}
                              onChange={(e) => {
                                this.setState({
                                  childraceEthnicityOther: e.target.value,
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
                        <div className="addplus-box add-additional">
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
                            <label className="control-label">
                              Relation
                                </label>
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
                              value={
                                this.state.ap[idx].firstName
                              }
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
                            <label className="control-label">
                              Middle Name
                                </label>
                            <TextValidator
                              name="middleName"
                              type="text"
                              value={
                                this.state.ap[idx].middleName
                              }
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
                              value={
                                this.state.ap[idx].lastName
                              }
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
                              selected={
                                this.state.ap[idx].dob ? new Date(this.state.ap[idx].dob) : null
                              }
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
                              disabled={
                                this.state.ap[idx].hasDL
                              }
                              type="text"
                              value={
                                this.state.ap[idx].drivingLicence
                              }
                              validators={this.state.ap[idx].hasDL ? [] : ["required"]}
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
                              disabled={
                                this.state.ap[idx].hasDL
                              }
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
                                  Sample Type
                                  <sup className="redstarText">*</sup>
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
                                    Sample Type
                                    <sup className="redstarText">*</sup>
                              </label>
                              <TextValidator
                                validators={["required"]}
                                name="sampleTypeOther"
                                errorMessages={this.state.inputError}
                                type="text"
                                value={
                                  this.state.ap[idx].sampleTypeOther
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
                        <Col lg={4} md={4} sm={4}>
                          <div className="form-group formbox selectbox">
                            <label>
                              Race/Ethnicity
                                  <sup className="redstarText">*</sup>
                            </label>
                            <TextValidator
                              type="select"
                              name="race"
                              value={
                                this.state.ap[idx].race
                              }
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
                        {this.state.ap[idx].race ===
                          "Other" ? (
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
                                  checked={this.state.ap[idx].pickupPreference}
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
                                    I prefer to pick up the results. Do not
                                    email me.
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
                                  checked={this.state.ap[idx].allowCall}
                                  onChange={(e) => {
                                    let ap = [...this.state.ap];
                                    ap[e.target.dataset.id][
                                      e.target.name
                                    ] = !ap[e.target.dataset.id][
                                    e.target.name
                                    ];
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
                                  checked={this.state.ap[idx].hasDL}
                                  value={this.state.ap[idx].hasDL}
                                  data-id={idx}
                                  onChange={(e) => {
                                    if (
                                      this.state.ap[idx]
                                        .hasDL === false
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
                                      debugger
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
                      <sup className="redstarText">*</sup> Have any of the
                          individuals sampled undergone a blood cell transfusion
                          or stem/bone marrow transplant?
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
                                  Which Party?
                                  <sup className="redstarText">*</sup>
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

export default Paternity;
