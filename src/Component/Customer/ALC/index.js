import React from "react";
import { Link, Redirect } from "react-router-dom";
import "./index.css";
import { Container, Row, Col } from "react-bootstrap";
import Agreement from "../../../Component/Customer/Agreement/index";
import axios from "axios";
import apiPath from "../../../Environment/ApiPath";
import Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css";
import { ValidatorForm } from "react-form-validator-core";
import TextValidator from "../../../Form/TextValidator/Index";
import StateData from "../../../Config/CountryStates.json";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import SignatureCanvas from "react-signature-canvas";
import { Tabs, Tab } from "react-bootstrap-tabs";
import InnerHeader from "../../../Component/Customer/InnerHeader/index";
import PhoneValidator from "../../../Form/PhoneValidator/Index";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import {Eraser} from '../../../../src/assets/images';

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
});

class Alc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyName: "",
      companyAddress: "",
      ownerName: "",
      ownerPhoneNumber: "",
      ownerCity: "",
      ownerState: "California",
      ownerEmail: "",
      ownerZipcode: "",
      signature: "",
      firstName: "",
      middleName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      drivingLicence: "",
      city: "",
      state: "",
      dlState: "California",
      zipCode: "",
      address: "",
      userType: "",
      // fileUrl: "",
      dateOfRegistration: new Date(),
      redirectTo: false,
      termsError: "",
      tabIndex: 0,
      inputError: "This field is required",
      disabled: false
    };
  }
  componentDidMount() {
    if (window.sessionStorage.length > 0 && window.sessionStorage.getItem("userType") == "Individual") {
      let data = JSON.parse(window.sessionStorage.getItem("userData"));
      window.sessionStorage.removeItem('userType');
      window.sessionStorage.removeItem('userData');
      if (data) {
        this.setState({
          ...data
        })
      }
    }

  }
  sigCanvas = {}

  clearSignature = () => {
    this.sigCanvas.clear()
    this.setState({
      signature: ""
    });
  }

  handleChange = (date) => {
    console.log(date.toISOString());
    this.setState({
      dateOfRegistration: date,
    });
  };

  checkUser = () => {
    debugger
    let userdata = { userType: this.state.userType, drivingLicence: this.state.drivingLicence, email: this.state.email, tcp: this.state.tcp, companyName: this.state.companyName }
    axios.post(apiPath.check_detail, userdata).then((response) => {
      debugger
      console.log(response.data.data);
      let formData = response.data.data;
      if (formData.data) {
        if (this.state.userType == "Company") {
          this.setState({
            companyName: formData.data.companyName,
            ownerName: formData.data.ownerName,
            ownerPhoneNumber: formData.data.ownerPhoneNumber,
            ownerEmail: formData.data.ownerEmail,
            dba: formData.data.dba,
            tcpStatus: formData.data.tcpStatus,
            companyAddress: formData.data.companyAddress,
            ownerState: formData.data.ownerState,
            companyType: formData.data.companyType,
            ownerCity: formData.data.ownerCity,
            ownerZipcode: formData.data.ownerZipcode,
          });
        } else {

          this.setState({
            // ...formData.data
            drivingLicence: formData.data.drivingLicence,
            firstName: formData.data.firstName,
            middleName: formData.data.middleName,
            lastName: formData.data.lastName,
            phoneNumber: formData.data.phoneNumber,
            dlState: formData.data.dlState,
          });

        }
      }
    });
  };

  checkForm = () => {
    this.refs.form.isFormValid(false).then((isFormValid) => {
      if (isFormValid) {
        this.setState({ tabIndex: 1 });
      }
    });
  }

  handleSubmit = async (evt) => {
    evt.preventDefault();

    let isValid = true;
    let errObj = {}
    if (!this.state.signature) {
      errObj["fileError"] = "Please add a signature";
      isValid = false;
    }
    if (!isValid) {
      errObj['tabIndex'] = 1;
      this.setState(errObj);
      // this.setState({disabled: false});
      return;
    }
    if (this.state.disabled) {
      return;
    }
    this.setState({ disabled: true });

    const formData = new FormData();
    formData.append("companyName", this.state.companyName);
    formData.append("companyAddress", this.state.companyAddress);
    formData.append("ownerName", this.state.ownerName);
    formData.append("ownerPhoneNumber", this.state.ownerPhoneNumber);
    formData.append("ownerCity", this.state.ownerCity);
    formData.append("ownerState", this.state.ownerState);
    formData.append("ownerZipcode", this.state.ownerZipcode);
    formData.append("ownerEmail", this.state.ownerEmail);
    formData.append("firstName", this.state.firstName);
    formData.append("middleName", this.state.middleName);
    formData.append("lastName", this.state.lastName);
    formData.append("drivingLicence", this.state.drivingLicence);
    formData.append("state", this.state.state);
    formData.append("city", this.state.city);
    formData.append("zipCode", this.state.zipCode);
    formData.append("address", this.state.address);
    formData.append("email", this.state.email);
    formData.append("phoneNumber", this.state.phoneNumber);
    formData.append("dlState", this.state.dlState);
    formData.append("signature", this.state.signature);
    formData.append("formType", "ALC");

    axios.post(apiPath.base_url, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {

        if (res.data && res.data.status === "failure") {
          NotificationManager.error(res.data.message, "Error", 2000);
          this.setState({ disabled: false });
          return;
        }
        NotificationManager.success("Data saved successfully!", "Success", 2000);
        setTimeout(() => {
          this.setState({ redirectTo: "/alc-pdf/" + res.data.data.formId });
          this.setState({ disabled: false });
        }, 2000);
      });
  };
  render() {
    if (this.state.redirectTo) {
      window.open(this.state.redirectTo);
      return <Redirect to={"/"} />;
      // return <Redirect to={this.state.redirectTo} target="_blank" />;
    }
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
                  <h2>ALC</h2>
                </div>
                <p>
                  <Link to="/customer" title="Back"><i className="mdi mdi-arrow-left"></i></Link>
                </p>
              </div>
              <Tabs
                selected={this.state.tabIndex}
                className="drug-formtab1"
                onSelect={(index, label) => {
                  // this.setState({
                  //   tabIndex: index
                  // });
                }}
              >
                <Tab label="Enrollment Form">
                  <div className="cpuc-enrollment-sections clearfix">
                    <div className="consortium-section-outer margin-bottom20 formsteps">
                      <h3>Company Information</h3>
                      <Row>
                        <Col lg={4} md={4} sm={4}>
                          <div className="form-group formbox">
                            <label className="control-label">
                              Company Name<sup className="redstarText">*</sup>
                            </label>
                            <TextValidator
                              name="companyName"
                              type="text"
                              value={this.state.companyName}
                              placeholder="Company Name"
                              validators={["required","trim"]}
                              errorMessages={["This field is required","Can not be empty"]}
                              maxlength="30"
                              onChange={(e) => {
                                this.setState({ companyName: e.target.value });
                              }}
                              onBlur={() => {
                                this.state.userType = "Company"
                                this.checkUser()
                              }}
                            />
                          </div>
                        </Col>
                        <Col lg={4} md={4} sm={4}>
                          <div className="form-group formbox">
                            <label className="control-label">
                              Owner Name<sup className="redstarText">*</sup>
                            </label>
                            <TextValidator
                              name="ownerName"
                              type="text"
                              value={this.state.ownerName}
                              placeholder="Owner Name"
                              maxlength="20"
                              validators={["required","trim"]}
                              errorMessages={["This field is required","can not be empty"]}
                              onChange={(e) => {
                                this.setState({ ownerName: e.target.value });
                              }}
                            />
                          </div>
                        </Col>
                        <Col lg={4} md={4} sm={4}>
                          <div className="form-group formbox">
                            <label className="control-label">
                              Owner Phone Number{" "}<sup className="redstarText">*</sup>
                            </label>
                            <PhoneInput
                              country={'us'}
                              disableCountryCode="true"
                              onlyCountries={['us']}
                              buttonStyle={{ display: "none" }}
                              placeholder="eg: (123) 121-4444"
                              value={this.state.ownerPhoneNumber}
                              onChange={phone => this.setState({ ownerPhoneNumber: phone })}
                            />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={4} md={4} sm={4}>
                          <div className="form-group formbox">
                            <label className="control-label">
                              Owner Email<sup className="redstarText">*</sup>
                            </label>
                            <TextValidator
                              name="ownerEmail"
                              type="email"
                              placeholder="Owner Email"
                              value={this.state.ownerEmail}
                              validators={["required" , 'matchRegexp:^([a-zA-Z0-9])(([a-zA-Z0-9])*([\._\+-])*([a-zA-Z0-9]))*@([a-zA-Z0-9])*.(([a-zA-Z]{2,4}?)*((\.)[a-zA-Z]{2,4}?))$']}
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
                        <Col lg={8} md={8} sm={8}>
                          <div className="form-group formbox">
                            <label className="control-label">
                              Company Address{" "}<sup className="redstarText">*</sup>
                            </label>
                            <TextValidator
                              type="text"
                              value={this.state.companyAddress}
                              placeholder="Company Address"
                              validators={["required","trim"]}
                              maxlength="100"
                              errorMessages={["This field is required","Can not be Empty"]}
                              onChange={(e) => {
                                this.setState({ companyAddress: e.target.value });
                              }}
                            />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={4} md={4} sm={4}>
                          <div className="form-group formbox">
                            <label className="control-label">
                              City<sup className="redstarText">*</sup>
                            </label>
                            <TextValidator
                              type="text"
                              value={this.state.ownerCity}
                              placeholder="City"
                              maxlength="10"
                              validators={["required","trim"]}
                              errorMessages={["This field is required","can not be empty"]}
                              onChange={(e) => {
                                this.setState({ ownerCity: e.target.value });
                              }}
                            />
                          </div>
                        </Col>
                        <Col lg={4} md={4} sm={4}>
                          <div className="form-group formbox selectbox">
                            <label>
                              State<sup className="redstarText">*</sup>
                            </label>
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
                                return <option>{item.name}</option>;
                              })}
                            </TextValidator>
                          </div>
                        </Col>
                        <Col lg={4} md={4} sm={4}>
                          <div className="form-group formbox">
                            <label>
                              Zipcode<sup className="redstarText">*</sup>
                            </label>
                            <TextValidator
                              type="text"
                              value={this.state.ownerZipcode}
                              placeholder="Zip Code"
                              validators={["trim","required","isNumber"]}
                              maxlength="8"
                              errorMessages={["Can not be empty","This field is required","please enter valid zip code",]}
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
                      <Row>
                        <Col lg={4} md={4} sm={4}>
                          <div className="form-group formbox">
                            <label className="control-label">
                              First Name<sup className="redstarText">*</sup>
                            </label>
                            <TextValidator
                              name="firstName"
                              type="text"
                              value={this.state.firstName}
                              validators={["required" , "matchRegexp:^[a-zA-Z]+$"  ]}
                              errorMessages={["This field is required" , "Please Enter Valid Name"]}
                              maxLength="30"
                              onChange={(e) => {
                                this.setState({ firstName: e.target.value })
                              }}
                            />
                          </div>
                        </Col>
                        <Col lg={4} md={4} sm={4}>
                          <div className="form-group formbox">
                            <label className="control-label">
                              Middle Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Middle Name"
                              value={this.state.middleName}
                              onChange={(e) => {
                                this.setState({ middleName: e.target.value });
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
                              type="text"
                              value={this.state.lastName}
                              placeholder="Last Name"
                              validators={["required" , "matchRegexp:^[a-zA-Z]+$"  ]}
                              errorMessages={["This field is required" , "Please Enter Valid Name"]}
                              maxLength="30"
                              onChange={(e) => {
                                this.setState({ lastName: e.target.value });
                              }}
                            />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={4} md={4} sm={4}>
                          <div className="form-group formbox">
                            <label className="control-label">
                              Phone Number<sup className="redstarText">*</sup>
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
                        <Col lg={4} md={4} sm={4}>
                          <div className="form-group formbox">
                            <label className="control-label"> Email<sup className="redstarText">*</sup></label>
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
                            <label className="control-label">
                              Drivers License{" "}<sup className="redstarText">*</sup>
                            </label>
                            <TextValidator
                              type="text"
                              value={this.state.drivingLicence}
                              placeholder="DL Number"
                              validators={["required"]}
                              errorMessages={["This field is required"]}
                              onChange={(e) => {
                                this.setState({
                                  drivingLicence: e.target.value
                                });
                              }}
                              onBlur={() => {
                                this.state.userType = "Driver"
                                this.checkUser()
                              }}
                            />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={4} md={4} sm={4}>
                          <div className="form-group formbox selectbox">
                            <label>
                              DL State<sup className="redstarText">*</sup>
                            </label>
                            <TextValidator
                              type="select"
                              value={this.state.dlState}
                              validators={["required"]}
                              errorMessages={["This field is required"]}
                              onChange={(e) => {
                                this.setState({ dlState: e.target.value });
                              }}>
                              <option>Select State</option>
                              {StateData.map((item) => {
                                return <option>{item.name}</option>;
                              })}
                            </TextValidator>
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <div className="bottom-btn-group pull-right clearfix">
                      <button type="button" onClick={this.checkForm} className="bluebg "> Next </button>
                    </div>
                  </div>
                </Tab>

                <Tab disabled="true" label="Agreement Form">
                  <div className="drug-agreement-header">
                    <h4>Agreement With Respect to Drug and Alcohol Testing</h4>
                    <p><i className="mdi mdi-map-marker"></i> 8105 Edgewater Dr., Suite 225 Oakland, CA 94621</p>
                    <p className="phonespan"><i className="mdi mdi-phone"></i> <span>T: (510) 394-3985</span>  <span>F: (510) 777-0905</span></p>
                  </div>
                  <div className="alc-agreement-detail">
                    <Agreement />
                    <Row>
                      <Col md={12}>
                        <div className="form-group formbox signature-box m8">
                          <label>Driver or Owner Signature<sup className="redstarText">*</sup></label>
                          <div className="signature-outer">
                            <SignatureCanvas ref={(ref) => { this.sigCanvas = ref }} penColor='black' onEnd={() => {
                              this.setState({ signature: this.sigCanvas.toDataURL() });
                            }}
                              canvasProps={{ className: 'sigCanvas' }} />
                            <button className="erase-btn" type="button" onClick={this.clearSignature}>
                              <img src={Eraser} alt="Eraser" />
                            </button>
                          </div>

                          <div className="text-danger clearfix">{this.state.fileError}</div>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <div className="bottom-btn-group pull-right clearfix">
                          <button type="submit" className="bluebg margin-right10" disabled={this.state.disabled}> Save </button>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Tab>
              </Tabs>
            </Container>
            <NotificationContainer />
          </div>
        </ValidatorForm>
      </React.Fragment>
    );
  }
}

export default Alc;
