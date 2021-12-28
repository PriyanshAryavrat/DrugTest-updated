import React from "react";
import { Link, Redirect } from "react-router-dom";
import "./index.css";
import { Container, Row, Col } from "react-bootstrap";
import { ValidatorForm } from "react-form-validator-core";
import TextValidator from "../../../Form/TextValidator/Index";
import StateData from "../../../Config/CountryStates.json";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import apiPath from "../../../Environment/ApiPath";
import Swal from "sweetalert2";
import Agreement from "../../Customer/Agreement/index";
import SignatureCanvas from "react-signature-canvas";
import { Tabs, Tab } from "react-bootstrap-tabs";
import InnerHeader from "../../Customer/InnerHeader/index";
import PhoneValidator from "../../../Form/PhoneValidator/Index";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {
  Eraser
} from '../../../assets/images';


const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
});

class DotOwnerEnrollment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      company: {
        tcp: "",
        tcpStatus: "",
        companyType: "",
        companyName: "",
        companyAddress: "",
        ownerName: "",
        ownerPhoneNumber: "",
        ownerCity: "",
        ownerState: "California"
      },
      tcp: "",
      tcpStatus: "",
      companyType: "",
      companyName: "",
      companyAddress: "",
      ownerName: "",
      ownerEmail: "",
      ownerPhoneNumber: "",
      ownerCity: "",
      ownerState: "California",
      driverType: "",
      city: "",
      state: "",
      zipCode: "",
      address: "",
      fax: "",
      drivingLicence: "",
      employeeName: "",
      employerEmailAddress: "",
      employerPhoneNumber: "",
      employerName: "",
      drivers: [
        {
          firstName: "",
          middleName: "",
          lastName: "",
          phoneNumber: "",
          email: "",
          drivingLicence: "",
          driverType: "",
          address: "",
          city: "",
          state: "",
          zipCode: "",
          dlState: "California",
        },
      ],
      redirectTo: false,
      termsError: "",
      hasPreviousEmployer: false,
      workedSafetyPosition: false,
      tabIndex: 0,
      inputError: "This field is required",
      employeeSignature: "",
      witnessSignature: "",
      prevOwnerCity: "",
      prevOwnerState: "",
      prevOwnerZipcode: "",
    };

  }
  sigCanvas = {};
  witnessSigCanvas = {};
  employeeSigCanvas = {};


  addDriver = (e) => {
    this.setState((prevState) => ({
      drivers: [
        ...prevState.drivers,
        {
          firstName: "",
          middleName: "",
          lastName: "",
          phoneNumber: "",
          email: "",
          address: "",
          city: "",
          state: "",
          zipCode: "",
          dlState: "",
          drivingLicence: "",
          signature: "",
          driverType: this.state.driverType,
        },
      ],
    }));
  };

  setCompanyType = (type, driverType) => {
    if (this.state.drivers && this.state.drivers.length > 0) {
      let drivers = [...this.state.drivers]
      drivers[0]['driverType'] = driverType
      this.setState({
        drivers,
        companyType: type,
        driverType: driverType
      });
    }

  }

  clearSignature = () => {
    this.sigCanvas.clear()
    this.setState({
      signature:""
    });
  }
  employeeClearSignature = () => {
    this.employeeSigCanvas.clear()
    this.setState({
      employeeSignature:""
    });
  }
  witnessclearSignature = () => {
    this.witnessSigCanvas.clear()
    this.setState({
      witnessSignature:""
    });
  }
  componentDidMount() {

    let dr = [];
    if (this.props.formData.driver) {
      dr.push(this.props.formData.driver);
    }
    this.setState({
      ...this.props.formData,
      drivers: dr
    })

    if (this.props.formData.witnessSignature) {
      this.witnessSigCanvas.fromDataURL(this.props.formData.witnessSignature)
    }
    if (this.props.formData.employeeSignature) {
      this.employeeSigCanvas.fromDataURL(this.props.formData.employeeSignature)
    }
  }
  checkForm = () => {

    this.refs.form.isFormValid(false).then((isFormValid) => {
      if (isFormValid) {
        this.setState({ tabIndex: 1 });
      }
    });
  }

  handleChange = (date) => {
    console.log(date.toISOString());
    this.setState({
      dateOfRegistration: date,
    });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    let isValid = true;
    let errObj = {};
    if (!this.state.signature) {
      errObj["fileError"] = "Please add a signature";
      isValid = false;
    } else {
      errObj["fileError"] = "";
    }
    if (this.state.tcp === "" && this.state.tcpStatus === "") {
      errObj["tcpStatusError"] = "Please select TCP";
      isValid = false;
    }
    if (this.state.tcp !== "" && this.state.tcp.length !== 5) {
      errObj["tcpStatusError"] = "TCP should be of 5 digits";
      isValid = false;
    }
    if (!this.state.companyType) {
      errObj["companyTypeError"] = "Please select Company Type";
      isValid = false;
    }
    if (!isValid) {
      errObj['tabIndex'] = 0;
      this.setState(errObj);
      return;
    }
    let formData = {
      "id": this.state._id,
      "tcpStatus": this.state.tcpStatus,
      "companyType": this.state.companyType,
      "tcp": this.state.tcp,
      "companyName": this.state.companyName,
      "dba": this.state.dba,
      "companyAddress": this.state.companyAddress,
      "ownerName": this.state.ownerName,
      "ownerEmail": this.state.ownerEmail,
      "ownerPhoneNumber": this.state.ownerPhoneNumber,
      "ownerCity": this.state.ownerCity,
      "ownerZipcode": this.state.ownerZipcode,
      "ownerState": this.state.ownerState,
      "drivers": JSON.stringify(this.state.drivers),
      "formType": "DOT",
      "signature": this.state.signature,
      "fax": this.state.fax,
      "drivingLicence": this.state.drivingLicence,
      "employerEmailAddress": this.state.employerEmailAddress,
      "employeeName": this.state.employeeName,
      "employerPhoneNumber": this.state.employerPhoneNumber,
      "employeeSignature": this.state.employeeSignature,
      "witnessSignature": this.state.witnessSignature,
      "workedSafetyPosition": this.state.workedSafetyPosition,
      "prevOwnerCity": this.state.prevOwnerCity,
      "prevOwnerState": this.state.prevOwnerState,
      "prevOwnerZipcode": this.state.prevOwnerZipcode
    }
    axios
      .post(apiPath.base_url, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data && res.data.status === "failure") {
          NotificationManager.error(res.data.message,"Error",2000);
          return;
        }
        if (this.state.drivers.length > 0) {
          localStorage.setItem('name', `${this.state.drivers[0].firstName} ${this.state.drivers[0].middleName + " "}${this.state.drivers[0].lastName}`);
          localStorage.setItem('email', this.state.drivers[0].email);
          localStorage.setItem('dlNumber', this.state.drivers[0].drivingLicence);
        }
        localStorage.setItem('signature', this.state.signature);
        localStorage.setItem('redirectfrom', "admin");
        NotificationManager.success("Form submitted successfully!","Success",2000);
        setTimeout(() => {
          window.history.back()
        }, 2000);
      });
  };

  render() {
    return (
      <React.Fragment>
        <ValidatorForm
          ref="form"
          onError={(e) => {
            this.preventDefault();
          }}
          onSubmit={this.handleSubmit}
        >
          <InnerHeader />
          <div className="form-container">
            <Container>
              <div className="header-content">
                <div className="header-left">
                  <h2>DOT</h2>
                </div>

              </div>
              <Tabs
                selected={this.state.tabIndex}
                className="drug-formtab1"
                onSelect={(index, label) => {
                  this.setState({
                    tabIndex: index
                  });
                }} >
                <Tab label="Enrollment Form">
                  <div className="cpuc-enrollment-sections clearfix">
                    <div className="consortium-section-outer margin-bottom20 formsteps">
                      <h3>Company Information</h3>
                      <Row>
                        <Col lg={4} md={4} sm={12}>
                          <div className="form-group formbox">
                            <label className="control-label"> TCP<sup className="redstarText">*</sup> </label>
                            <TextValidator
                              name="tcp"
                              type="text"
                              value={this.state.tcp}
                              maxlength="5"
                              placeholder="TCP"
                              validators={[
                                // "required",
                                // "minStringLength:5",
                              ]}
                              // errorMessages={["TCP should be of 5 digits","TCP should be of 5 digits",]}
                              onChange={(e) => {
                                this.setState({ tcp: e.target.value.replace(/\D/, '') });
                              }}
                            />
                          </div>
                          <div className="company-checkbox margin-bottom20">
                            <div className="form-check">
                              <label className="form-check-label">
                                <input
                                  type="radio"
                                  onClick={(e) => {
                                    this.setState({
                                      tcpStatus: e.target.value,
                                    });
                                  }}
                                  checked={this.state.tcpStatus == "NA" ? true : false}
                                  value="NA"
                                  className="form-check-input"
                                  name="tcpStatus"
                                />{" "}
                                  N/A <i className="input-helper" />
                              </label>
                            </div>
                            {/* <div className="form-check">
                              <label className="form-check-label">
                                <input
                                  type="radio"
                                  onClick={(e) => {
                                    this.setState({
                                      tcpStatus: "TCP Pending",
                                    });
                                  }}
                                  value="TCP Pending"
                                  className="form-check-input"
                                  name="tcpStatus"
                                />{" "}
                                  TCP Pending <i className="input-helper" />
                              </label>
                            </div> */}
                          </div>
                          <div className="text-danger">
                            {this.state.tcpStatusError}
                          </div>
                        </Col>
                        <Col lg={8} md={8} sm={12}>
                          <div className="form-group formbox">
                            <label className="control-label">Company Name{" "}<sup className="redstarText">*</sup> </label>
                            <TextValidator
                              name="companyName"
                              type="text"
                              value={this.state.companyName}
                              placeholder="Company Name"
                              validators={["required"]}
                              errorMessages={["This field is required"]}
                              onChange={(e) => {
                                this.setState({
                                  companyName: e.target.value,
                                });
                              }}
                            />
                          </div>
                          <div className="company-checkbox checkbox-rightsp">
                            <label className="margin-right10"> This company is an{" "} </label>
                            <div className="form-check">
                              <label className="form-check-label">
                                <input
                                  type="radio"
                                  onClick={(e) => {
                                    this.setCompanyType("LLC", "LM")
                                  }}
                                  value="LLC"
                                  checked={this.state.companyType == "LLC" ? true : false}
                                  className="form-check-input"
                                  name="optionsRadios"
                                />{" "}
                                  LLC <i className="input-helper" />
                              </label>
                            </div>
                            <div className="form-check">
                              <label className="form-check-label">
                                <input
                                  type="radio"
                                  onClick={(e) => {
                                    this.setCompanyType("Corporation", "CO")
                                  }}
                                  value="Corporation"
                                  checked={this.state.companyType == "Corporation" ? true : false}
                                  className="form-check-input"
                                  name="optionsRadios"
                                />{" "}
                                  Corporation <i className="input-helper" />
                              </label>
                            </div>
                            <div className="form-check">
                              <label className="form-check-label">
                                <input
                                  type="radio"
                                  onClick={(e) => {
                                    this.setCompanyType("Partnership", "DO");
                                  }}
                                  checked={this.state.companyType == "Partnership" ? true : false}
                                  value="Partnership"
                                  className="form-check-input"
                                  name="optionsRadios"
                                />{" "}
                                  Partnership <i className="input-helper" />
                              </label>
                            </div>
                            <div className="form-check">
                              <label className="form-check-label">
                                <input
                                  type="radio"
                                  onClick={(e) => {
                                    this.setCompanyType("Individual", "OP")
                                  }}
                                  checked={this.state.companyType == "Individual" ? true : false}
                                  value="Individual"
                                  className="form-check-input"
                                  name="optionsRadios"
                                />{" "}
                                      Individual <i className="input-helper" />
                              </label>
                            </div>
                            <div className="text-danger">
                              {this.state.companyTypeError}
                            </div>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={4} md={4} sm={6}>
                          <div className="form-group formbox">
                            <label className="control-label"> Owner/Supervisor Name{" "}<sup className="redstarText">*</sup> </label>
                            <TextValidator
                              name="ownerName"
                              type="text"
                              value={this.state.ownerName}
                              placeholder="Owner/Supervisor Name"
                              validators={["required"]}
                              errorMessages={["This field is required"]}
                              onChange={(e) => {
                                this.setState({ ownerName: e.target.value });
                              }}
                            />
                          </div>
                        </Col>
                        <Col lg={4} md={4} sm={6}>
                          <div className="form-group formbox">
                            <label className="control-label"> Owner Cell Phone Number{" "}<sup className="redstarText">*</sup></label>
                            <PhoneValidator
                              validators={["required"]}
                              errorMessages={this.state.inputError}
                              value={this.state.ownerPhoneNumber}
                              onChange={(phone) => {
                                this.setState({ ownerPhoneNumber: phone });
                              }}
                            />
                          </div>
                        </Col>
                        <Col lg={4} md={4} sm={6}>
                          <div className="form-group formbox">
                            <label className="control-label"> Owner/Supervisor Email{" "}<sup className="redstarText">*</sup> </label>
                            <TextValidator
                              name="ownerEmail"
                              type="email"
                              placeholder="Owner/Supervisor Email"
                              value={this.state.ownerEmail}
                              validators={["required", "isEmail"]}
                              errorMessages={[
                                "This field is required",
                                "Email is not valid",
                              ]}
                              onChange={(e) => {
                                this.setState({ ownerEmail: e.target.value });
                              }}
                            />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={4} md={4} sm={6}>
                          <div className="form-group formbox">
                            <label className="control-label"> DBA </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="DBA"
                              value={this.state.dba}
                              onChange={(e) => {
                                this.setState({ dba: e.target.value });
                              }}
                            />
                          </div>
                        </Col>
                        <Col lg={8} md={8} sm={8}>
                          <div className="form-group formbox">
                            <label className="control-label">Company Address<sup className="redstarText">*</sup></label>
                            <TextValidator
                              type="text"
                              value={this.state.companyAddress}
                              placeholder="Address"
                              validators={["required"]}
                              errorMessages={["This field is required"]}
                              onChange={(e) => {
                                this.setState({
                                  companyAddress: e.target.value,
                                });
                              }}
                            />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={4} md={4} sm={6}>
                          <div className="form-group formbox">
                            <label className="control-label"> City<sup className="redstarText">*</sup> </label>
                            <TextValidator
                              type="text"
                              value={this.state.ownerCity}
                              placeholder="City"
                              validators={["required"]}
                              errorMessages={["This field is required"]}
                              onChange={(e) => {
                                this.setState({ ownerCity: e.target.value });
                              }}
                            />
                          </div>
                        </Col>
                        <Col lg={4} md={4} sm={6}>
                          <div className="form-group formbox">
                            <label className="control-label"> Owner State<sup className="redstarText">*</sup> </label>
                            <TextValidator
                              type="select"
                              value={this.state.ownerState}
                              validators={["required"]}
                              errorMessages={["This field is required"]}
                              onChange={(e) => {
                                this.setState({ ownerState: e.target.value });
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
                        <Col lg={4} md={4} sm={6}>
                          <div className="form-group formbox">
                            <label className="control-label"> Zip Code<sup className="redstarText">*</sup> </label>
                            <TextValidator
                              type="text"
                              value={this.state.ownerZipcode}
                              placeholder="Zip Code"
                              validators={["required"]}
                              errorMessages={["This field is required"]}
                              onChange={(e) => {
                                this.setState({ ownerZipcode: e.target.value });
                              }}
                            />
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <div className="consortium-section-outer formsteps bottom-bordernone">
                      <h3>Driver Information</h3>
                      {this.state.drivers.map((val, idx) => {
                        if (!this.state.drivers[idx]) {
                          return (<React.Fragment>&nbsp;</React.Fragment>)
                        }
                        return (
                          <div key={idx} className="deleteIcon">
                            {this.state.drivers.length > 1 && <i
                              className="mdi mdi-trash-can delete-driver"
                              data-id={idx}
                              onClick={(e) => {
                                let drivers = [...this.state.drivers]
                                drivers.splice(e.target.dataset.id, 1);
                                this.setState({
                                  drivers
                                });
                              }}
                            />}
                            <Row>
                              <Col lg={4} md={4} sm={4}>
                                <div className="form-group formbox">
                                  <label className="control-label"> First Name{" "}<sup className="redstarText">*</sup></label>
                                  <TextValidator
                                    type="text"
                                    name="firstName"
                                    value={this.state.drivers[idx].firstName}
                                    placeholder="First Name"
                                    validators={["required"]}
                                    errorMessages={["This field is required"]}
                                    data-id={idx}
                                    onChange={(e) => {
                                      let drivers = [...this.state.drivers]
                                      drivers[e.target.dataset.id][e.target.name] = e.target.value
                                      this.setState({
                                        drivers
                                      });
                                    }}
                                  />
                                </div>
                              </Col>
                              <Col lg={4} md={4} sm={4}>
                                <div className="form-group formbox">
                                  <label className="control-label"> Middle Name{" "}</label>
                                  <input
                                    type="text"
                                    placeholder="Middle Name"
                                    name="middleName"
                                    value={this.state.drivers[idx].middleName}
                                    className="form-control"
                                    data-id={idx}
                                    onChange={(e) => {
                                      let drivers = [...this.state.drivers]
                                      drivers[e.target.dataset.id][e.target.name] = e.target.value
                                      this.setState({
                                        drivers
                                      });
                                    }}
                                  />
                                </div>
                              </Col>
                              <Col lg={4} md={4} sm={4}>
                                <div className="form-group formbox">
                                  <label className="control-label"> Last Name{" "}<sup className="redstarText">*</sup> </label>
                                  <TextValidator
                                    type="text"
                                    name="lastName"
                                    value={this.state.drivers[idx].lastName}
                                    placeholder="Last Name"
                                    validators={["required"]}
                                    errorMessages={["This field is required"]}
                                    data-id={idx}
                                    onChange={(e) => {
                                      let drivers = [...this.state.drivers]
                                      drivers[e.target.dataset.id][e.target.name] = e.target.value
                                      this.setState({
                                        drivers
                                      });
                                    }}
                                  />
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg={4} md={4} sm={4}>
                                <div className="form-group formbox">
                                  <label>Phone Number<sup className="redstarText">*</sup></label>
                                  {/* <PhoneInput
                                    country={'us'}
                                    disableCountryCode="true"
                                    onlyCountries={['us']}
                                    buttonStyle={{ display: "none" }}
                                    placeholder="eg: (123) 121-4444"
                                    // data-id={idx}
                                    inputProps={{ "data-id": idx, "name": "phoneNumber" }}
                                    value={this.state.drivers[idx].phoneNumber}
                                    onChange={(phone) => {
                                      let drivers = [...this.state.drivers]
                                      drivers[idx]["phoneNumber"] = phone
                                      this.setState({
                                        drivers
                                      });
                                    }}
                                  /> */}
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
                              <Col lg={4} md={4} sm={4}>
                                <div className="form-group formbox">
                                  <label className="control-label"> Email<sup className="redstarText">*</sup></label>
                                  <TextValidator
                                    type="text"
                                    name="email"
                                    value={this.state.drivers[idx].email}
                                    placeholder="Email"
                                    data-id={idx}
                                    validators={["required"]}
                                    errorMessages={["This field is required"]}
                                    onChange={(e) => {
                                      let drivers = [...this.state.drivers]
                                      drivers[e.target.dataset.id][e.target.name] = e.target.value
                                      this.setState({
                                        drivers
                                      });
                                    }}
                                  />
                                </div>
                              </Col>
                              <Col lg={4} md={4} sm={4}>
                                <div className="form-group formbox">
                                  <label className="control-label"> Drivers License{" "}<sup className="redstarText">*</sup> </label>
                                  <TextValidator
                                    type="text"
                                    name="drivingLicence"
                                    value={this.state.drivers[idx].drivingLicence}
                                    placeholder="Drivers License"
                                    validators={["required"]}
                                    errorMessages={["This field is required"]}
                                    data-id={idx}
                                    onChange={(e) => {
                                      let drivers = [...this.state.drivers]
                                      drivers[e.target.dataset.id][e.target.name] = e.target.value
                                      this.setState({
                                        drivers
                                      });
                                    }}
                                  />
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg={4} md={4} sm={4}>
                                <div className="form-group formbox selectbox">
                                  <label> DL State<sup className="redstarText">*</sup> </label>
                                  <TextValidator
                                    type="select"
                                    name="dlState"
                                    value={this.state.drivers[idx].dlState}
                                    validators={["required"]}
                                    errorMessages={["This field is required"]}
                                    data-id={idx}
                                    onChange={(e) => {
                                      let drivers = [...this.state.drivers]
                                      drivers[e.target.dataset.id][e.target.name] = e.target.value
                                      this.setState({
                                        drivers
                                      });
                                    }}
                                  >
                                    <option>Select State</option>
                                    {StateData.map((item) => {
                                      return (
                                        <option key={item.name}>
                                          {item.name}
                                        </option>
                                      );
                                    })}
                                  </TextValidator>
                                </div>
                              </Col>
                              <Col lg={4} md={4} sm={4}>
                                <div className="form-group formbox selectbox">
                                  <label> Driver Type{" "}<sup className="redstarText">*</sup> </label>
                                  <TextValidator
                                    type="select"
                                    name="driverType"
                                    // disabled="disabled"
                                    value={this.state.drivers[idx].driverType}
                                    // value={this.state.driverType}
                                    validators={["required"]}
                                    errorMessages={["This field is required"]}
                                    data-id={idx}
                                    onChange={(e) => {
                                      let drivers = [...this.state.drivers]
                                      drivers[e.target.dataset.id][e.target.name] = e.target.value
                                      this.setState({
                                        drivers
                                      });
                                    }}
                                  >
                                    <option key="--">Select</option>
                                    <option key="OP" value="OP">
                                      Driver Only
                                        </option>
                                    <option key="LM" value="LM">
                                      Owner Operator/Individual
                                        </option>
                                  </TextValidator>
                                </div>
                              </Col>
                            </Row>
                            {this.state.drivers.length > 1 && <hr />}
                          </div>
                        );
                      })}
                      {/* <Row>
                        <Col md={12}>
                          <div className="addplus-box add-additional">
                            <i className="mdi mdi-plus" onClick={this.addDriver} />
                            <h4>Add Additional Drivers</h4>
                          </div>
                        </Col>
                      </Row> */}
                    </div>
                    <div className="cpuc-enrollment-sections clearfix">
                      <div>
                        <div className="worked-posotion margin-bottom20">
                          <h5>Have you worked in a safety sensitive position in the last 2 years that required a Class A or B license?</h5>
                          <Row>
                            <Col lg={4} md={5} sm={5}>
                              <div className="form-check checknoyesbox ">
                                <label className="form-check-label">
                                  <input type="radio"
                                    className="form-check-input"
                                    name="optionsRadio"
                                    value="true"
                                    onClick={(e) => {
                                      this.setState({
                                        workedSafetyPosition: true,
                                      });
                                    }}
                                  /> Yes<i className="input-helper"></i>
                                </label>
                              </div>
                            </Col>
                            <Col lg={4} md={5} sm={5}>
                              <div className="form-check checknoyesbox">
                                <label className="form-check-label">
                                  <input type="radio"
                                    className="form-check-input"
                                    name="optionsRadio"
                                    value="false"
                                    onClick={(e) => {
                                      this.setState({
                                        workedSafetyPosition: false,
                                      });
                                    }}
                                  /> No<i className="input-helper"></i>
                                </label>
                              </div>
                            </Col>
                          </Row>
                        </div>
                        {this.state.workedSafetyPosition &&
                          <div className="consortium-section-outer bottom-bordernone">
                            <div className="request-information">
                              <h4>Previous Employer Information</h4>
                              <p>We require your PREVIOUS EMPLOYER to furnish the requested information regarding your prior drug
                            and alcohol testing information pursuant to Federal Regulation 49 CFR part 40.25.</p>
                            </div>
                            <Row>
                              <Col md={12}>
                                <div className="form-group formbox authorize-input ">
                                  <Row>
                                    <Col lg={4} md={4} sm={4}>
                                      <div className="form-group formbox">
                                        <label className="control-label">Previous Employer Name<sup className="redstarText">*</sup></label>
                                        <TextValidator
                                          name="prevCompanyName"
                                          type="text"
                                          value={this.state.employerName}
                                          placeholder="Previous Employer Name"
                                          validators={["required"]}
                                          errorMessages={["This field is required"]}
                                          onChange={(e) => {
                                            this.setState({
                                              employerName: e.target.value,
                                            });
                                          }}
                                        />
                                      </div>
                                    </Col>
                                    <Col lg={4} md={4} sm={4}>
                                      <div className="form-group formbox">
                                        <label className="control-label">
                                          Previous Employer Email Address
                                        </label>
                                        <TextValidator
                                          type="text"
                                          value={this.state.employerEmailAddress}
                                          placeholder="Previous Employer Email Address"
                                          onChange={(e) => {
                                            this.setState({
                                              employerEmailAddress: e.target.value,
                                            });
                                          }}
                                        />
                                      </div>
                                    </Col>
                                    <Col lg={4} md={4} sm={4}>
                                      <div className="form-group formbox">
                                        <label className="control-label">
                                          Previous Employer Phone Number
                                        </label>
                                        <TextValidator
                                          type="text"
                                          value={this.state.employerPhoneNumber}
                                          placeholder="Previous Employer Phone Number"
                                          onChange={(e) => {
                                            this.setState({
                                              employerPhoneNumber: e.target.value,
                                            });
                                          }}
                                        />
                                      </div>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col lg={4} md={4} sm={4}>
                                      <div className="form-group formbox">
                                        <label className="control-label">City<sup className="redstarText">*</sup></label>
                                        <TextValidator
                                          type="text"
                                          name="prevOwnerCity"
                                          value={this.state.prevOwnerCity}
                                          placeholder="City"
                                          validators={["required"]}
                                          errorMessages={["This field is required"]}
                                          onChange={(e) => {
                                            this.setState({ prevOwnerCity: e.target.value });
                                          }}
                                        />
                                      </div>
                                    </Col>
                                    <Col lg={4} md={4} sm={4}>
                                      <div className="form-group formbox">
                                        <label className="control-label">
                                          State<sup className="redstarText">*</sup>
                                        </label>
                                        <TextValidator
                                          type="select"
                                          name="prevOwnerState"
                                          value={this.state.prevOwnerState}
                                          validators={["required"]}
                                          errorMessages={["This field is required"]}
                                          onChange={(e) => {
                                            this.setState({ prevOwnerState: e.target.value });
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
                                      <div className="form-group formbox">
                                        <label className="control-label">
                                          Zip Code<sup className="redstarText">*</sup>
                                        </label>
                                        <TextValidator
                                          type="text"
                                          name="prevOwnerZipcode"
                                          value={this.state.prevOwnerZipcode}
                                          placeholder="Zip Code"
                                          validators={["required"]}
                                          errorMessages={["This field is required"]}
                                          onChange={(e) => {
                                            this.setState({ prevOwnerZipcode: e.target.value });
                                          }}
                                        />
                                      </div>
                                    </Col>
                                  </Row>
                                </div>
                              </Col>
                            </Row>

                          </div>
                        }
                        <Row>
                          <Col lg={4} md={4} sm={4}>
                            <div className="form-group formbox signature-box m8">
                              <label>Employee Signature<sup className="redstarText">*</sup></label>
                              <div className="signature-outer width100per">
                                <SignatureCanvas ref={(ref) => { this.employeeSigCanvas = ref }} penColor='black' onEnd={() => {
                                  this.setState({ employeeSignature: this.employeeSigCanvas.toDataURL() });
                                }}
                                  canvasProps={{ className: 'sigCanvas' }} />
                                <button className="erase-btn" type="button" onClick={this.employeeClearSignature}>
                                  <img src={Eraser} alt="Eraser" />
                                </button>
                              </div>
                              <div className="text-danger">{this.state.fileError}</div>
                            </div>
                          </Col>
                          <Col lg={4} md={4} sm={4}>
                            <div className="form-group formbox signature-box m8">
                              <label>Witness Signature<sup className="redstarText">*</sup></label>
                              <div className="signature-outer width100per">
                                <SignatureCanvas ref={(ref) => { this.witnessSigCanvas = ref }} penColor='black' onEnd={() => {
                                  this.setState({ witnessSignature: this.witnessSigCanvas.toDataURL() });
                                }}
                                  canvasProps={{ className: 'sigCanvas' }} />
                                <button className="erase-btn" type="button" onClick={this.witnessclearSignature}>
                                  <img src={Eraser} alt="Eraser" />
                                </button>
                              </div>

                              <div className="text-danger">{this.state.fileError}</div>
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={12}>
                            <div className="form-group formbox signature-box m8">
                              <label>Driver or Owner Signature<sup className="redstarText">*</sup></label>
                              <div className="signature-outer">
                                <SignatureCanvas ref={(ref) => { this.sigCanvas = ref; if (this.sigCanvas) { this.sigCanvas.fromDataURL(this.state.signature) } }} penColor='black' onEnd={() => {
                                  this.setState({ signature: this.sigCanvas.toDataURL() });
                                }}
                                  canvasProps={{ className: 'sigCanvas' }} />
                                <button className="erase-btn" type="button" onClick={this.clearSignature}>
                                  <img src={Eraser} alt="Eraser" />
                                </button>
                              </div>

                              <div className="text-danger">{this.state.fileError}</div>
                            </div>
                          </Col>
                        </Row>
                      </div>

                    </div>
                    <div className="bottom-btn-group pull-right clearfix">
                      <button type="submit" className="bluebg margin-right10"> Save </button>
                      {/* <button type="button"  onClick={this.checkForm} className="bluebg "> Next </button> */}
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </Container>
            <NotificationContainer/>
          </div>
        </ValidatorForm>
      </React.Fragment>
    );
  }
}

export default DotOwnerEnrollment;
