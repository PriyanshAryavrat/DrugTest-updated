import React from "react";
import { Redirect } from "react-router-dom";
import "./index.css";
import { Row, Col } from "react-bootstrap";
import { ValidatorForm } from "react-form-validator-core";
import TextValidator from "../../../../Form/TextValidator/Index";
import PhoneValidator from "../../../../Form/PhoneValidator/Index";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import StateData from "../../../../Config/CountryStates.json";
import CountryData from "../../../../Config/Countries.json";
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

class ImmigrationOther extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasAdditionalTest: false,
      name: "",
      phoneNumber: "",
      email: "",
      driversLicense: "",
      dateofbirth: "",
      beneficiarydateofbirth: "",
      motherdateofbirth: "",
      childdateofbirth: "",
      relationdateofbirth: "",
      sampleType: "",
      sex: "",
      raceEthnicity: "",
      tabIndex: 0,
      inputError: "This field is required",
      hasDl: false,
      motherdateRead: false,
      relationdateRead: false,
      inputRead: false,
      mother: false,
      child: false,
      additionalPerson: false,
      phoneNo: "",
      additionalPersonName: "",
      childAge: false,
      childCallme: false,
      childEmailme: false,
      childdateRead: false,
      relationToBeneficiary: null,
      dlState: "California",
    };
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
    evt.preventDefault();

    let formData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      middleName: this.state.middleName,
      passport: this.state.passport,
      dob: this.state.dateofbirth,
      currentLocation: this.state.location,
      race: this.state.raceEthnicity1,
      raceOther: this.state.raceOther1,
      gender: this.state.sex,
      phoneNumber: this.state.phoneNo1,
      phoneNumber2: this.state.phoneNo2,
      phoneNumber3: this.state.phoneNo3,
      email: this.state.email,
      drivingLicence: this.state.drivingLicence,
      dlState: this.state.dlState,
      hasDl: this.state.hasDl,
      isTested: this.state.isTested,
      relationToBeneficiary: this.state.relationToBeneficiary,
      relationToBeneficiaryOther: this.state.relationToBeneficiaryOther,
      beneficiaries: [
        {
          relationship: this.state.BeneficiaryRelation,
          firstName: this.state.Beneficiaryfirstname,
          lastName: this.state.BeneficiarylastName,
          middleName: this.state.Beneficiarymiddlename,
          dob: this.state.beneficiarydateofbirth,
          case: this.state.BeneficiaryCase,
          currentLocation: this.state.BeneficiaryLocation,
          race: this.state.raceEthnicity,
          raceOther: this.state.raceEthnicityOther,
          gender: this.state.relationsex,
          phoneNumber: this.state.BeneficiaryphoneNo1,
          phoneNumber2: this.state.BeneficiaryphoneNo2,
          phoneNumber3: this.state.BeneficiaryphoneNo3,
          email: this.state.beneficiaryemail,
        },
      ],
    };

    console.log(formData);
    axios
      .post(apiPath.save_immigration_form, formData, {
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
          this.setState({ redirectTo: "/pdf/Immigration/" + res.data.data.formId });

          //this.setState({ redirectTo: "/customer" });
        }, 2000);
      });

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
            // e.preventDefault();
          }}
          onSubmit={this.handleSubmit}
        >
          <div className="cpuc-enrollment-sections clearfix">
            <div className="consortium-section-outer margin-bottom20 formsteps">
              <h3>Petitioner Info</h3>
              <Row>
                <Col lg={4} md={4} sm={4}>
                  <div className="form-group formbox">
                    <label> First name <sup className="redstarText">*</sup> </label>
                    <TextValidator
                      name="name"
                      type="text"
                      value={this.state.firstName}
                      placeholder="First Name"
                            validators={["required" , "matchRegexp:^[a-zA-Z]+$"  ]}
                                errorMessages={["This field is required" , "Please Enter Valid Name"]}
                                maxLength="30"  
                      onChange={(e) => {
                        let value = e.target.value;
                        value = value.replace(/[^A-Za-z\s]/gi, "");
                        this.setState({
                          firstName: value,
                        });
                      }}
                    />
                  </div>
                </Col>
                <Col lg={4} md={4} sm={4}>
                  <div className="form-group formbox">
                    <label> Middle Name </label>
                    <TextValidator
                      name="name"
                      type="text"
                      value={this.state.middleName}
                      placeholder="Middle Name"
                      onChange={(e) => {
                        let value = e.target.value;
                        value = value.replace(/[^A-Za-z\s]/gi, "");
                        this.setState({
                          middleName: value,
                        });
                      }}
                    />
                  </div>
                </Col>
                <Col lg={4} md={4} sm={4}>
                  <div className="form-group formbox">
                    <label> Last name <sup className="redstarText">*</sup> </label>
                    <TextValidator
                      name="name"
                      type="text"
                      value={this.state.lastName}
                      placeholder="First Name"
                      validators={["required" , "matchRegexp:^[a-zA-Z]+$"  ]}
                      errorMessages={["This field is required" , "Please Enter Valid Name"]}
                      maxLength="30"  
                      onChange={(e) => {
                        let value = e.target.value;
                        value = value.replace(/[^A-Za-z\s]/gi, "");
                        this.setState({
                          lastName: value,
                        });
                      }}
                    />
                  </div>
                </Col>
              </Row>
              <div className="beneficiary-heading petitioner-heading">
                <p>
                  <sup className="redstarText">*</sup> The name entered must
                  match the Petitioner's government issued ID or the case may be
                  delayed or rejected.
                </p>
              </div>
              <Row>
                <Col lg={4} md={4} sm={4}>
                  <div className="form-group formbox">
                    <label> Date of Birth <sup className="redstarText">*</sup> </label>
                    <DatePicker
                      placeholderText="Select a date"
                      selected={this.state.dateofbirth}
                      onChange={this.handleChange}
                      validators={["required"]}
                      errorMessages={["This field is required"]}
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
                      value={this.state.dateofbirth}
                      readOnly
                      validators={["required"]}
                      errorMessages={["This field is required"]}
                    />
                  </div>
                </Col>
                <Col lg={4} md={4} sm={4}>
                  <div className="form-group formbox selectbox">
                    <label>Current Location <sup className="redstarText">*</sup></label>
                    <div>
                      <TextValidator
                        type="select"
                        validators={["required"]}
                        value={this.state.location}
                        errorMessages={["This field is required"]}
                        onChange={(e) => {
                          this.setState({ location: e.target.value });
                        }}>
                        <option>-- Current Location --</option>
                        {CountryData.map((item) => {
                          return <option>{item.name}</option>;
                        })}
                      </TextValidator>
                    </div>
                  </div>
                </Col>
                <Col lg={4} md={4} sm={4}>
                  <div className="form-group formbox">
                    <label>
                      Passport
                    </label>
                    <TextValidator
                      name="name"
                      type="text"
                      value={this.state.passport}
                      placeholder="Passport Number"
                      validators={["required" , "matchRegexp:^[0-9a-zA-Z]+$"]}
                      errorMessages={["This field is required" , "Please Enter Valid Passport Number"]}
                      maxLength="20"  
                      onChange={(e) => {
                        let value = e.target.value;
                        // value = value.replace(/[^A-Za-z\s]/gi, "");
                        this.setState({
                          passport: value,
                        });
                      }}
                    />
                  </div>
                </Col>
              </Row>

              <Row>
                <Col lg={4} md={4} sm={4}>
                  <div className="form-group formbox selectbox">
                    <label> Sex <sup className="redstarText">*</sup></label>
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
                    <label> Phone 1 <sup className="redstarText">*</sup> </label>
                    <PhoneValidator
                      validators={["required"]}
                      errorMessages={this.state.inputError}
                      value={this.state.phoneNo1}
                      onChange={(phone) => this.setState({ phoneNo1: phone })}
                    />
                  </div>
                </Col>
                <Col lg={4} md={4} sm={4}>
                  <div className="form-group formbox">
                    <label>Phone 2</label>
                    <PhoneValidator
                      value={this.state.phoneNo2}
                      onChange={(phone) => this.setState({ phoneNo2: phone })}
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg={4} md={4} sm={4}>
                  <div className="form-group formbox">
                    <label>Phone 3</label>
                    <PhoneValidator
                      value={this.state.phoneNo3}
                      onChange={(phone) => this.setState({ phoneNo3: phone })}
                    />
                  </div>
                </Col>
                <Col lg={4} md={4} sm={4}>
                  <div className="form-group formbox">
                    <label> Email <sup className="redstarText">*</sup> </label>
                    <TextValidator
                      name="email"
                      type="email"
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
                <Col lg={4} md={4} sm={4}>
                  <div className="form-group formbox">
                    <label> Drivers License Number {this.state.hasDl ? null : (<sup className="redstarText">*</sup>)}
                    </label>
                    <TextValidator
                      disabled={this.state.hasDl}
                      type="text"
                      value={this.state.drivingLicence}
                      placeholder="DL Number"
                      maxlength="30"
                      validators={["required","trim"]}
                      errorMessages={["This field is required","Please Enter valid DL Number"]}
                      onChange={(e) => {
                        this.setState({
                          drivingLicence: e.target.value,
                        });
                      }}
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg={4} md={4} sm={4}>
                  <div className="form-group formbox ">
                    <label>Drivers License State {this.state.hasDl ? null : (<sup className="redstarText">*</sup>)}</label>
                    <TextValidator
                      disabled={this.state.hasDl ? true : false}
                      type="select"
                      validators={this.state.hasDl ? [] : ["required"]}
                      errorMessages={["This field is required"]}
                      value={this.state.dlState}
                      onChange={(e) => {
                        this.setState({ dlState: e.target.value });
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
                    <label> Race/Ethnicity <sup className="redstarText">*</sup> </label>
                    <TextValidator
                      type="select"
                      value={this.state.raceEthnicity1}
                      validators={["required"]}
                      errorMessages={["This field is required"]}
                      onChange={(e) => {
                        this.setState({ raceEthnicity1: e.target.value });
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
                {this.state.raceEthnicity1 === "Other" ? (
                  <Col lg={4} md={4} sm={4}>
                    <div className="form-group formbox">
                      <label> Race/Ethnicity<sup className="redstarText">*</sup></label>
                      <TextValidator
                        validators={["required"]}
                        errorMessages={this.state.inputError}
                        type="text" value={this.state.raceOther1}
                        onChange={(e) => {
                          this.setState({
                            raceOther1: e.target.value
                          })
                        }}
                        placeholder="Enter Other" />
                    </div>
                  </Col>
                ) : null}
              </Row>
              <Row>
                <Col lg={4} md={8} sm={12}>
                  <div className="form-check margin-bottom20imp">
                    <label className="form-check-label">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name="optionscheckbox"
                        value=""
                        onChange={(value) => {
                          if (this.state.hasDl === false) {
                            this.setState({
                              hasDl: true,
                            });
                          } else {
                            this.setState({
                              hasDl: false,
                            });
                          }
                        }}
                      />{" "}
                      I do not have a drivers license & state ID
                      <i className="input-helper"></i>
                    </label>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg={4} md={4} sm={4}>
                  <div className="form-group formbox">
                    <label> Is Petitioner Being Tested?{" "} <sup className="redstarText">*</sup> </label>
                    <TextValidator
                      name="isTested"
                      type="hidden"
                      value={this.state.isTested}
                      placeholder="isTested"
                      validators={["required"]}
                      errorMessages={["This field is required"]}
                    />
                    <div className="sex-radiobox margin-top6">
                      <div className="form-check">
                        <label className="form-check-label">
                          <input
                            type="radio"
                            className="form-check-input"
                            name="optionsRadios5"
                            value={true}
                            onChange={() => {
                              this.setState({
                                isTested: true
                              })
                            }}
                          />{" "}
                          Yes
                          <i className="input-helper"></i>
                        </label>
                      </div>
                      <div className="form-check">
                        <label className="form-check-label">
                          <input
                            type="radio"
                            className="form-check-input"
                            name="optionsRadios5"
                            value=""
                            onChange={() => {
                              this.setState({
                                isTested: false
                              })
                            }}
                          />{" "}
                          No
                          <i className="input-helper"></i>
                        </label>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg={8} md={12} sm={12}>
                  <div className="form-group formbox">
                    <label>Relationship to Beneficiary/Ies{" "} <sup className="redstarText">*</sup> </label>
                    <TextValidator
                      name="relationToBeneficiary"
                      type="hidden"
                      value={this.state.relationToBeneficiary}
                      placeholder="relationToBeneficiary"
                      validators={["required"]}
                      errorMessages={["This field is required"]}
                    />
                    <div className="beneficiary-check margin-top6">
                      <div className="form-group formbox">
                        <div className="form-check">
                          <label className="form-check-label">
                            <input
                              type="radio"
                              className="form-check-input"
                              name="optionscheckbox"
                              value=""
                              onChange={(e) => {
                                this.setState({
                                  relationToBeneficiary: "Mother",
                                  hasAdditionalTest: false
                                })
                              }}
                            />{" "}
                            Mother
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </div>
                      <div className="form-group formbox">
                        <div className="form-check">
                          <label className="form-check-label">
                            <input
                              type="radio"
                              className="form-check-input"
                              name="optionscheckbox"
                              value=""
                              onChange={(e) => {
                                this.setState({
                                  relationToBeneficiary: "Father",
                                  hasAdditionalTest: false
                                })
                              }}
                            />{" "}
                            Father
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </div>
                      <div className="form-group formbox">
                        <div className="form-check">
                          <label className="form-check-label">
                            <input
                              type="radio"
                              className="form-check-input"
                              name="optionscheckbox"
                              value=""
                              onChange={(e) => {
                                this.setState({
                                  relationToBeneficiary: "Son",
                                  hasAdditionalTest: false
                                })
                              }}
                            />{" "}
                            Son
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </div>
                      <div className="form-group formbox">
                        <div className="form-check">
                          <label className="form-check-label">
                            <input
                              type="radio"
                              className="form-check-input"
                              name="optionscheckbox"
                              value=""
                              onChange={(e) => {
                                this.setState({
                                  relationToBeneficiary: "Daughter",
                                  hasAdditionalTest: false
                                })
                              }}
                            />{" "}
                            Daughter
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </div>
                      <div className="form-group formbox">
                        <div className="form-check">
                          <label className="form-check-label">
                            <input
                              type="radio"
                              className="form-check-input"
                              name="optionscheckbox"
                              value=""
                              onChange={(e) => {
                                this.setState({
                                  relationToBeneficiary: "Sister",
                                  hasAdditionalTest: false
                                })
                              }}
                            />{" "}
                            Sister
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </div>
                      <div className="form-group formbox">
                        <div className="form-check">
                          <label className="form-check-label">
                            <input
                              type="radio"
                              className="form-check-input"
                              name="optionscheckbox"
                              value=""
                              onChange={(e) => {
                                this.setState({
                                  relationToBeneficiary: "Brother",
                                  hasAdditionalTest: false
                                })
                              }}
                            />{" "}
                            Brother
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </div>
                      <div className="form-group formbox">
                        <div className="form-check">
                          <label className="form-check-label">
                            <input
                              type="radio"
                              className="form-check-input"
                              name="optionscheckbox"
                              onChange={(e) => {
                                this.setState({
                                  relationToBeneficiary: "Other",
                                  hasAdditionalTest: true
                                })
                              }}
                            />
                            Other
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              {this.state.hasAdditionalTest ? (
                <Row>
                  <Col lg={4} md={4} sm={4}>
                    <div className="form-group formbox">
                      <label> Other<sup className="redstarText">*</sup></label>
                      <TextValidator
                        validators={["required"]}
                        errorMessages={this.state.inputError}
                        type="text"
                        placeholder="Enter Other"
                        onChange={(e) => {
                          this.setState({
                            additionalTest: e.target.value,
                            relationToBeneficiaryOther: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </Col>
                </Row>
              ) : null}
            </div>
            <div className="consortium-section-outer bottom-bordernone">
              <h3>Beneficiary Info</h3>
              <Row>
                <Col lg={4} md={4} sm={4}>
                  <div className="form-group formbox">
                    <label> First Name <sup className="redstarText">*</sup></label>
                    <TextValidator
                      name="name"
                      type="text"
                      value={this.state.Beneficiaryfirstname}
                      placeholder="First Name"
                      validators={["required" , "matchRegexp:^[a-zA-Z]+$"  ]}
                      errorMessages={["This field is required" , "Please Enter Valid Name"]}
                      maxLength="30"  
                      onChange={(e) => {
                        let value = e.target.value;
                        value = value.replace(/[^A-Za-z\s]/gi, "");
                        this.setState({
                          Beneficiaryfirstname: value,
                        });
                      }}
                    />
                  </div>
                </Col>
                <Col lg={4} md={4} sm={4}>
                  <div className="form-group formbox">
                    <label> Middle Name</label>
                    <TextValidator
                      name="name"
                      type="text"
                      value={this.state.Beneficiarymiddlename}
                      placeholder="Middle Name"
                      onChange={(e) => {
                        let value = e.target.value;
                        value = value.replace(/[^A-Za-z\s]/gi, "");
                        this.setState({
                          Beneficiarymiddlename: value,
                        });
                      }}
                    />
                  </div>
                </Col>
                <Col lg={4} md={4} sm={4}>
                  <div className="form-group formbox">
                    <label> Last Name <sup className="redstarText">*</sup></label>
                    <TextValidator
                      name="name"
                      type="text"
                      value={this.state.BeneficiarylastName}
                      placeholder="Last Name"
                      validators={["required" , "matchRegexp:^[a-zA-Z]+$"  ]}
                      errorMessages={["This field is required" , "Please Enter Valid Name"]}
                      maxLength="30"  
                      onChange={(e) => {
                        let value = e.target.value;
                        value = value.replace(/[^A-Za-z\s]/gi, "");
                        this.setState({
                          BeneficiarylastName: value,
                        });
                      }}
                    />
                  </div>
                </Col>
              </Row>
              <div className="beneficiary-heading petitioner-heading">
                <p>
                  <sup className="redstarText">*</sup> The name entered must
                  match the Beneficiary's government issued ID or the case may
                  be delayed or rejected.
                </p>
              </div>
              <Row>
                <Col lg={4} md={4} sm={4}>
                  <div className="form-group formbox">
                    <label> Date of Birth <sup className="redstarText">*</sup></label>
                    <DatePicker
                      placeholderText="Select a date"
                      selected={this.state.beneficiarydateofbirth}
                      onChange={(date) => {
                        this.setState({
                          beneficiarydateofbirth: date
                        })
                      }}
                      validators={["required"]}
                      errorMessages={this.state.inputError}
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
                      value={this.state.beneficiarydateofbirth}
                      readOnly
                      validators={["required"]}
                      errorMessages={["This field is required"]}
                    />
                  </div>
                </Col>
                <Col lg={4} md={4} sm={4}>
                  <div className="form-group formbox">
                    <label> Case <sup className="redstarText">*</sup></label>
                    <input type="text"
                      value={this.state.BeneficiaryCase}
                      onChange={(e) => {
                        let value = e.target.value;
                        // value = value.replace(/[^A-Za-z\s]/gi, "");
                        this.setState({
                          BeneficiaryCase: value,
                        });
                      }}
                      placeholder="Case " />
                  </div>
                </Col>
                <Col lg={4} md={4} sm={4}>
                  <div className="form-group formbox">
                    <label> Relationship to petitioner{" "} <sup className="redstarText">*</sup> </label>
                    <input
                      type="text"
                      value={this.state.BeneficiaryRelation}
                      onChange={(e) => {
                        let value = e.target.value;
                        value = value.replace(/[^A-Za-z\s]/gi, "");
                        this.setState({
                          BeneficiaryRelation: value,
                        });
                      }}
                      placeholder="Relationship to petitioner "
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg={4} md={4} sm={4}>
                  <div className="form-group formbox">
                    <label> Current Location <sup className="redstarText">*</sup> </label>
                    <TextValidator
                      type="select"
                      validators={["required"]}
                      value={this.state.BeneficiaryLocation}
                      errorMessages={["This field is required"]}
                      onChange={(e) => {
                        this.setState({ BeneficiaryLocation: e.target.value });
                      }}>
                      <option>-- Current Location --</option>
                      {CountryData.map((item) => {
                        return <option>{item.name}</option>;
                      })}
                    </TextValidator>
                  </div>
                </Col>
                <Col lg={4} md={4} sm={4}>
                  <div className="form-group formbox selectbox">
                    <label> Sex <sup className="redstarText">*</sup></label>
                    <TextValidator
                      type="select"
                      value={this.state.relationsex}
                      validators={["required"]}
                      errorMessages={["This field is required"]}
                      onChange={(e) => {
                        this.setState({ relationsex: e.target.value });
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
                    <label> Phone 1 <sup className="redstarText">*</sup> </label>
                    <PhoneValidator
                      validators={["required"]}
                      errorMessages={this.state.inputError}
                      value={this.state.BeneficiaryphoneNo1}
                      onChange={(phone) =>
                        this.setState({ BeneficiaryphoneNo1: phone })
                      }
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg={4} md={4} sm={4}>
                  <div className="form-group formbox">
                    <label>Phone 2</label>
                    <PhoneValidator
                      value={this.state.BeneficiaryphoneNo2}
                      onChange={(phone) =>
                        this.setState({ BeneficiaryphoneNo2: phone })
                      }
                    />
                  </div>
                </Col>
                <Col lg={4} md={4} sm={4}>
                  <div className="form-group formbox">
                    <label>Phone 3</label>
                    <PhoneValidator
                      value={this.state.BeneficiaryphoneNo3}
                      onChange={(phone) =>
                        this.setState({ BeneficiaryphoneNo3: phone })
                      }
                    />
                  </div>
                </Col>
                <Col lg={4} md={4} sm={4}>
                  <div className="form-group formbox">
                    <label> Email <sup className="redstarText">*</sup> </label>
                    <TextValidator
                      name="email"
                      type="email"
                      placeholder="Email"
                      value={this.state.beneficiaryemail}
                      validators={["required" , 'matchRegexp:^([a-zA-Z0-9])(([a-zA-Z0-9])*([\._\+-])*([a-zA-Z0-9]))*@([a-zA-Z0-9])*.(([a-zA-Z]{2,4}?)*((\.)[a-zA-Z]{2,4}?))$']}
                              errorMessages={[
                                "This field is required",
                                "Email is not valid",
                              ]}
                      onChange={(e) => {
                        this.setState({ beneficiaryemail: e.target.value });
                      }}
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg={4} md={4} sm={4}>
                  <div className="form-group formbox selectbox">
                    <label> Race/Ethnicity <sup className="redstarText">*</sup></label>
                    <TextValidator
                      type="select"
                      value={this.state.raceEthnicity}
                      validators={["required"]}
                      errorMessages={["This field is required"]}
                      onChange={(e) => {
                        this.setState({ raceEthnicity: e.target.value });
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
                {this.state.raceEthnicity === "Other" ? (
                  <Col lg={4} md={4} sm={4}>
                    <div className="form-group formbox">
                      <label> Race/Ethnicity<sup className="redstarText">*</sup></label>
                      <TextValidator
                        validators={["required"]}
                        errorMessages={["This field is required"]}
                        type="text" value={this.state.raceEthnicityOther}
                        onChange={(e) => {
                          this.setState({
                            raceEthnicityOther: e.target.value
                          });
                        }}
                        placeholder="Enter Other" />
                    </div>
                  </Col>
                ) : null}
              </Row>
              <div className="beneficiary-heading">
                <p>Please have letter from the USCIS, US Embassy, or Department of Homeland Security requesting proof relationship ready</p>
              </div>
            </div>
            <div className="bottom-btn-group pull-right clearfix">
              <button type="submit" className="bluebg margin-right10">
                {" "} Save{" "}
              </button>
            </div>
          </div>
        </ValidatorForm>
      </React.Fragment>
    );
  }
}

export default ImmigrationOther;
