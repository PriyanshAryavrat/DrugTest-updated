import React from "react";
import { Redirect } from "react-router-dom";
import "./index.css";
import { Row, Col } from "react-bootstrap";
import { ValidatorForm } from "react-form-validator-core";
import TextValidator from "../../../Form/TextValidator/Index";
import StateData from "../../../Config/CountryStates.json";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import apiPath from "../../../Environment/ApiPath";
import Moment from "moment";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
});

class AddClient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formType: "",
      firstName: "",
      middleName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      drivingLicence: "",
      city: "",
      state: "",
      zipCode: "",
      ownerZipcde: "",
      address: "",
      driverName: "",
      driverType: "",
      tcp: "",
      dba: "",
      companyName: "",
      companyType: "",
      ownerCity: "",
      ownerZipcode: "",
      ownerState: "",
      ownerPhoneNumber: "",
      ownerName: "",
      ownerNumber: "",
      ownerEmail: "",
      tabIndex: 0,
      currentForm: {},
      dateOfRegistration: new Date(),
    };
  }

  handleChange = (date) => {
    this.setState({
      dateOfRegistration: date,
    });
  };

  setCompanyType = (type, driverType) => {
    this.setState({
      companyType: type,
    });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    let isValid = true;
    let errObj = {};
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
      this.setState(errObj);
      return;
    }
    const formData = new FormData();
    formData.append("formType", this.state.formType);
    formData.append("tcpStatus", this.state.tcpStatus);
    formData.append("companyType", this.state.companyType);
    formData.append("tcp", this.state.tcp);
    formData.append("dba", this.state.dba);
    formData.append("companyName", this.state.companyName);
    formData.append("companyAddress", this.state.companyAddress);
    formData.append("ownerName", this.state.ownerName);
    formData.append("ownerEmail", this.state.ownerEmail);
    formData.append("ownerPhoneNumber", this.state.ownerPhoneNumber);
    formData.append("ownerCity", this.state.ownerCity);
    formData.append("ownerState", this.state.ownerState);
    formData.append("ownerZipcode", this.state.ownerZipcode);
    formData.append("firstName", this.state.firstName);
    formData.append("middleName", this.state.middleName);
    formData.append("lastName", this.state.lastName);
    formData.append("phoneNumber", this.state.phoneNumber);
    formData.append("email", this.state.email);
    formData.append("drivingLicence", this.state.drivingLicence);
    formData.append("city", this.state.city);
    formData.append("driverType",this.state.driverType);
    formData.append("dlState", this.state.dlState);
    formData.append("state", this.state.state);
    formData.append("zipCode", this.state.zipCode);
    formData.append("address", this.state.address);
    formData.append(
      "dateOfRegistration",
      this.state.dateOfRegistration.toISOString()
    );

    axios
      .post(apiPath.add_client, formData, {
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
          title: "Data Saved Successfully!",
        });
        setTimeout(() => {
          this.setState({ redirectTo: "/admin" });
        }, 2000);
      });
  };

  componentDidMount() {
    let token = sessionStorage.getItem("authToken");
    if (!token) {
      this.setState({ redirectTo: "/login" });
    }
  }

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
          <div className="content-wrapper">
            <div className="main-content">
              <div className="page-header inner-header">
                <h2 className="page-title">Add New Client</h2>
              </div>
              <div className="card innercard-bg margin-bottom30 clearfix padding0">
                <div className="addinner-header">
                  <div className="user-heading clearfix">
                    <h3>{this.state.driverName}</h3>
                  </div>
                  <div className="clearfix">
                    <Row>
                      <Col lg={6} md={6} sm={6}>
                        <div className="userbutton-group"></div>
                      </Col>
                    </Row>
                  </div>
                </div>
                <div className="detailbox-table addclienttb">
                  <ValidatorForm>
                    <fieldset className="form-fieldset">
                      <legend>Personal Details</legend>
                      <Row>
                        <Col lg={4} md={4} sm={4}>
                          <div className="form-group formbox">
                            <label className="control-label">
                              First Name <sup className="redstarText">*</sup>
                            </label>
                            <TextValidator
                              name="firstName"
                              type="text"
                              value={this.state.firstName}
                              placeholder="First Name"
                              validators={["required"]}
                              errorMessages={["This field is required"]}
                              onChange={(e) => {
                                this.setState({ firstName: e.target.value });
                              }}
                            />
                          </div>
                        </Col>
                        <Col lg={4} md={4} sm={4}>
                          <div className="form-group formbox">
                            <label className="control-label">Middle Name</label>
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
                              Last Name <sup className="redstarText">*</sup>
                            </label>
                            <TextValidator
                              type="text"
                              value={this.state.lastName}
                              placeholder="Last Name"
                              validators={["required"]}
                              errorMessages={["This field is required"]}
                              onChange={(e) => {
                                this.setState({ lastName: e.target.value });
                              }}
                            />
                          </div>
                        </Col>
                        <Col lg={4} md={4} sm={4}>
                          <div className="form-group formbox">
                            <label>
                              Phone No. <sup className="redstarText">*</sup>
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
                        <Col lg={4} md={4} sm={4}>
                          <div className="form-group formbox">
                            <label>
                              Email <sup className="redstarText">*</sup>
                            </label>
                            <TextValidator
                              name="email"
                              type="text"
                              placeholder="Email"
                              value={this.state.email}
                              validators={["required"]}
                              errorMessages={["This field is required"]}
                              onChange={(e) => {
                                this.setState({ email: e.target.value });
                              }}
                            />
                          </div>
                        </Col>
                        <Col lg={4} md={4} sm={4}>
                          <div className="form-group formbox">
                            <label>
                              DL Number <sup className="redstarText">*</sup>
                            </label>
                            <TextValidator
                              name="drivingLicence"
                              type="text"
                              placeholder="DL Number"
                              value={this.state.drivingLicence}
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
                      <Row>
                        <Col lg={4} md={4} sm={4}>
                          <div className="form-group formbox">
                            <label>
                              {" "}
                              DL State <sup className="redstarText">*</sup>
                            </label>
                            <TextValidator
                              type="select"
                              value={this.state.dlState}
                              validators={["required"]}
                              errorMessages={["This field is required"]}
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
                          <div className="form-group formbox">
                            <label>
                              Driver Type <sup className="redstarText">*</sup>
                            </label>
                            <TextValidator
                              name="driverType"
                              type="select"
                              placeholder="Driver Name"
                              value={this.state.driverType}
                              validators={["required"]}
                              errorMessages={["This field is required"]}
                              onChange={(e) => {
                                this.setState({ driverType: e.target.value });
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
                        <Col lg={8} md={8} sm={4}>
                          <div className="form-group formbox">
                            <label>
                              Address <sup className="redstarText">*</sup>
                            </label>
                            <TextValidator
                              name="address"
                              type="text"
                              placeholder="Address"
                              value={this.state.address}
                              validators={["required"]}
                              errorMessages={["This field is required"]}
                              onChange={(e) => {
                                this.setState({ address: e.target.value });
                              }}
                            />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={4} md={4} sm={4}>
                          <div className="form-group formbox">
                            <label>
                              City <sup className="redstarText">*</sup>
                            </label>
                            <TextValidator
                              name="city"
                              type="text"
                              placeholder="City"
                              value={this.state.city}
                              validators={["required"]}
                              errorMessages={["This field is required"]}
                              onChange={(e) => {
                                this.setState({ city: e.target.value });
                              }}
                            />
                          </div>
                        </Col>
                        <Col lg={4} md={4} sm={4}>
                          <div className="form-group formbox">
                            <label>
                              State <sup className="redstarText">*</sup>
                            </label>
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
                        <Col lg={4} md={4} sm={4}>
                          <div className="form-group formbox">
                            <label>
                              Zip code <sup className="redstarText">*</sup>
                            </label>
                            <TextValidator
                              name="city"
                              type="text"
                              placeholder="Zipcode"
                              value={this.state.zipCode}
                              validators={["required"]}
                              errorMessages={["This field is required"]}
                              onChange={(e) => {
                                this.setState({ zipCode: e.target.value });
                              }}
                            />
                          </div>
                        </Col>
                      </Row>
                    </fieldset>
                    <fieldset className="form-fieldset">
                      <legend>Other Information</legend>
                      <Row>
                        <Col lg={4} md={4} sm={4}>
                          <div className="form-group formbox">
                            <label>
                              Form Type <sup className="redstarText">*</sup>
                            </label>
                            <TextValidator
                              type="select"
                              name="formType"
                              value={this.state.formType}
                              validators={["required"]}
                              errorMessages={["This field is required"]}
                              onChange={(e) => {
                                this.setState({
                                  formType: e.target.value,
                                });
                              }}
                            >
                              <option key="--">Select</option>
                              <option key="OP" value="DOT">
                                DOT
                              </option>
                              <option key="LM" value="CPUC">
                                CPUC
                              </option>
                            </TextValidator>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={4} md={4} sm={4}>
                          <div className="form-group formbox">
                            <label>
                              TCP <sup className="redstarText">*</sup>
                            </label>
                            <TextValidator
                              name="tcp"
                              type="text"
                              maxLength="5"
                              placeholder="TCP"
                              value={this.state.tcp}
                              // validators={["required"]}
                              // errorMessages={["This field is required"]}
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
                                  checked={
                                    this.state.tcpStatus === "TCP Pending"
                                  }
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
                            </div>
                          </div>
                          <div className="text-danger">
                            {this.state.tcpStatusError}
                          </div>
                        </Col>

                        <Col lg={8} md={8} sm={8}>
                          <div className="form-group formbox">
                            <label>
                              Company Name <sup className="redstarText">*</sup>
                            </label>
                            <TextValidator
                              name="companyName"
                              type="text"
                              placeholder="Company Name"
                              value={this.state.companyName}
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
                            <label className="margin-right10">
                              {" "}
                              This company is an{" "}
                            </label>
                            <div className="form-check">
                              <label className="form-check-label">
                                <input
                                  type="radio"
                                  onClick={(e) => {
                                    this.setCompanyType("LLC", "LM");
                                  }}
                                  checked={this.state.companyType === "LLC"}
                                  value="LLC"
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
                                  checked={
                                    this.state.companyType === "Corporation"
                                  }
                                  onClick={(e) => {
                                    this.setCompanyType("Corporation", "CO");
                                  }}
                                  value="Corporation"
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
                                  checked={
                                    this.state.companyType === "Partnership"
                                  }
                                  onClick={(e) => {
                                    this.setCompanyType("Partnership", "DO");
                                  }}
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
                                  checked={
                                    this.state.companyType === "Individual"
                                  }
                                  onClick={(e) => {
                                    this.setCompanyType("Individual", "OP");
                                  }}
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
                        <Col lg={4} md={4} sm={4}>
                          <div className="form-group formbox">
                            <label>DBA</label>
                            <TextValidator
                              name="dba"
                              type="text"
                              placeholder="DBA"
                              value={this.state.dba}
                              // validators={["required"]}
                              // errorMessages={["This field is required"]}
                              onChange={(e) => {
                                this.setState({ dba: e.target.value });
                              }}
                            />
                          </div>
                        </Col>
                        <Col lg={4} md={4} sm={4}>
                          <div className="form-group formbox">
                            <label>
                              Owner Name <sup className="redstarText">*</sup>
                            </label>
                            <TextValidator
                              name="ownerName"
                              type="text"
                              placeholder="Owner Name"
                              value={this.state.ownerName}
                              validators={["required"]}
                              errorMessages={["This field is required"]}
                              onChange={(e) => {
                                this.setState({ ownerName: e.target.value });
                              }}
                            />
                          </div>
                        </Col>
                        <Col lg={4} md={4} sm={4}>
                          <div className="form-group formbox">
                            <label>
                              Owner Phone <sup className="redstarText">*</sup>
                            </label>
                            <PhoneInput
                              country={"us"}
                              disableCountryCode="true"
                              onlyCountries={["us"]}
                              buttonStyle={{ display: "none" }}
                              placeholder="eg: (123) 121-4444"
                              value={this.state.ownerPhoneNumber}
                              onChange={(phone) =>
                                this.setState({ ownerPhoneNumber: phone })
                              }
                            />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={4} md={4} sm={4}>
                          <div className="form-group formbox">
                            <label>
                              Owner Email <sup className="redstarText">*</sup>
                            </label>
                            <TextValidator
                              name="ownerEmail"
                              type="text"
                              placeholder="Owner Email"
                              value={this.state.ownerEmail}
                              validators={["required"]}
                              errorMessages={["This field is required"]}
                              onChange={(e) => {
                                this.setState({ ownerEmail: e.target.value });
                              }}
                            />
                          </div>
                        </Col>
                        <Col lg={4} md={4} sm={4}>
                          <div className="form-group formbox">
                            <label>
                              Date of Registration{" "}
                              <sup className="redstarText">*</sup>
                            </label>
                            <DatePicker
                              // selected={this.state.dateOfRegistration}
                              className="form-control"
                              onChange={this.handleChange}
                              name="dateOfRegistration"
                              dateFormat="MM/dd/yyyy"
                              placeholderText="Select a date"
                              value={Moment(this.state.dateOfRegistration)
                                .format("MM/DD/YYYY")
                                .toString()}
                            />
                          </div>
                        </Col>
                        <Col lg={4} md={4} sm={4}>
                          <div className="form-group formbox">
                            <label>
                              Company Address{" "}
                              <sup className="redstarText">*</sup>
                            </label>
                            <TextValidator
                              name="companyAddress"
                              type="text"
                              placeholder="Company Address"
                              value={this.state.companyAddress}
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
                        <Col lg={4} md={4} sm={4}>
                          <div className="form-group formbox">
                            <label>
                              City <sup className="redstarText">*</sup>
                            </label>
                            <TextValidator
                              name="ownerCity"
                              type="text"
                              placeholder="City"
                              value={this.state.ownerCity}
                              validators={["required"]}
                              errorMessages={["This field is required"]}
                              onChange={(e) => {
                                this.setState({
                                  ownerCity: e.target.value,
                                });
                              }}
                            />
                          </div>
                        </Col>
                        <Col lg={4} md={4} sm={4}>
                          <div className="form-group formbox">
                            <label>
                              State <sup className="redstarText">*</sup>
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
                                return (
                                  <option key={item.name}>{item.name}</option>
                                );
                              })}
                            </TextValidator>
                          </div>
                        </Col>
                        <Col lg={4} md={4} sm={4}>
                          <div className="form-group formbox">
                            <label>
                              Zip code <sup className="redstarText">*</sup>
                            </label>
                            <TextValidator
                              name="city"
                              type="text"
                              placeholder="Zipcode"
                              value={this.state.ownerZipcode}
                              validators={["required"]}
                              errorMessages={["This field is required"]}
                              onChange={(e) => {
                                this.setState({ ownerZipcode: e.target.value });
                              }}
                            />
                          </div>
                        </Col>
                      </Row>
                    </fieldset>
                    <div className="bottom-btn-group pull-right clearfix">
                      <button type="submit" className="bluebg">
                        Submit
                      </button>
                    </div>
                    <br />
                    <br />
                  </ValidatorForm>
                </div>
              </div>
            </div>
          </div>
        </ValidatorForm>
      </React.Fragment>
    );
  }
}

export default AddClient;
