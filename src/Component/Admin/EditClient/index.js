import React from "react";
import { Link, Redirect } from "react-router-dom";
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

class EditClient extends React.Component {
  constructor(props) {
    super(props);
    let { id } = this.props.match.params;
    this.state = {
      firstName: "",
      middleName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      drivingLicence: "",
      city: "",
      state: "",
      zipCode: "",
      ownerZipcde:"",
      address: "",
      id: id,
      driverName: "",
      driverType: "",
      tcp: "",
      dba: "",
      companyName: "",
      companyAddress:"",
      companyType: "",
      ownerCity:"",
      ownerZipcode:"",
      ownerState:"",
      ownerPhoneNumber: "",
      ownerName: "",
      ownerNumber: "",
      ownerEmail: "",
      tabIndex: 0,
      currentForm: {},
      dateOfRegistration: new Date(),
    };
  }

  handleSubmit = async (evt) => {
    evt.preventDefault();
    let isValid = true;
    let errObj = {};
    // if (!this.state.tcpStatus) {
    //   errObj["tcpStatusError"] = "Please select TCP Status";
    //   isValid = false;
    // }
    // if (!this.state.companyType) {
    //   errObj["companyTypeError"] = "Please select Company Type";
    //   isValid = false;
    // }
    if (!isValid) {
      this.setState(errObj);
      return;
    }
    const formData = new FormData();
    formData.append("driverId", this.state.id);
    formData.append("tcpStatus", this.state.tcpStatus);
    formData.append("companyType", this.state.companyType);
    formData.append("tcp", this.state.tcp);
    formData.append("dba", this.state.dba);
    formData.append("companyName", this.state.companyName);
    formData.append("companyAddress", this.state.companyAddress);
    formData.append("ownerName", this.state.ownerName);
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
    formData.append("dlState", this.state.dlState);
    formData.append("state", this.state.state);
    formData.append("zipCode", this.state.zipCode);
    formData.append("address", this.state.address);

    axios
      .post(apiPath.update_client, formData, {
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
    if(!token){
      this.setState({redirectTo:"/login"})
    }
    const url = `${apiPath.driver_detail}/${this.state.id}`;
    axios.get(url).then((response) => {
      console.log(response.data.data);
      let formData = response.data.data;
      this.setState({
        driverName: `${formData.firstName || ""} ${formData.middleName || ""} ${
          formData.lastName || ""
        }`,
        firstName: formData.firstName,
        middleName: formData.middleName,
        lastName: formData.lastName,
        driverType: formData.driverType,
        dlState: formData.dlState,
        zipCode: formData.zipCode,
        tcp: (formData.company && formData.company.tcp) || "",
        dba: (formData.company && formData.company.dba) || "",
        companyName: (formData.company && formData.company.companyName) || "",
        companyAddress:(formData.company && formData.company.companyAddress) || "",
        companyType: (formData.company && formData.company.companyType) || "",
        phoneNumber: formData.phoneNumber,
        ownerName: (formData.company && formData.company.ownerName) || "",
        ownerNumber: (formData.company && formData.company.ownerNumber) || "",
        ownerEmail: (formData.company && formData.company.ownerEmail) || "",
        ownerPhoneNumber:(formData.company && formData.company.ownerPhoneNumber) || "",
        ownerCity: (formData.company && formData.company.ownerCity) || "",
        ownerState: (formData.company && formData.company.ownerState) || "",
        ownerZipcode: (formData.company && formData.company.ownerZipcode) || "",
        address: formData.address,
        drivingLicence: formData.drivingLicence,
        dateOfRegistration: formData.dateOfRegistration || "",
        email: formData.email,
        state: formData.state,
        city: formData.city,
        formType: formData.formType,
        forms: formData.forms,
      });
    });
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
            <Link className="hearder-lefticon" ><i className="mdi mdi-chevron-left"></i></Link>
              <h2 className="page-title">Client Detail</h2>
            </div>
            <div className="card innercard-bg margin-bottom30 clearfix padding0">
              <div className="addinner-header">
                <div className="user-heading clearfix">
                  <h3>{this.state.driverName}</h3>
                </div>
                <div className="clearfix">
                  <Row>
                    <Col lg={6} md={6} sm={6}>
                      <div className="userbutton-group">
                        {/* <button className="bluebg">Edit</button> */}
                        {/* <button className="bluebg">Create</button> */}
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
              <div className="detailbox-table addclienttb">
                <ValidatorForm>
                  {/* {this.state.users.map((items,key)=>{
                    return( */}
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
                            // validators={["required"]}
                            // errorMessages={["This field is required"]}
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
                            // validators={["required"]}
                            // errorMessages={["This field is required"]}
                            onChange={(e) => {
                              this.setState({ lastName: e.target.value });
                            }}
                          />
                        </div>
                      </Col>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox">
                          <label>Phone No.</label>
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
                          <label>Email</label>
                          <TextValidator
                            name="email"
                            type="text"
                            placeholder="Email"
                            value={this.state.email}
                            // validators={["required"]}
                            // errorMessages={["This field is required"]}
                            onChange={(e) => {
                              this.setState({ email: e.target.value });
                            }}
                          />
                        </div>
                      </Col>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox">
                          <label>DL Number</label>
                          <TextValidator
                            name="drivingLicence"
                            type="text"
                            placeholder="DL Number"
                            value={this.state.drivingLicence}
                            // validators={["required"]}
                            // errorMessages={["This field is required"]}
                            onChange={(e) => {
                              this.setState({ drivingLicence: e.target.value });
                            }}
                          />
                        </div>
                      </Col>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox">
                          <label> DL State</label>
                          <TextValidator
                            type="select"
                            value={this.state.dlState}
                            // validators={["required"]}
                            // errorMessages={["This field is required"]}
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
                      {this.state.driverType !== "" && (
                          <Col lg={4} md={4} sm={4}>
                            <div className="form-group formbox">
                              <label>Driver Type</label>
                              <TextValidator
                                name="driverType"
                                type="select"
                                placeholder="Driver Name"
                                value={this.state.driverType}
                                // validators={["required"]}
                                // errorMessages={["This field is required"]}
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
                        )}
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox">
                          <label>Address</label>
                          <TextValidator
                            name="address"
                            type="text"
                            placeholder="Address"
                            value={this.state.address}
                            // validators={["required"]}
                            // errorMessages={["This field is required"]}
                            onChange={(e) => {
                              this.setState({ address: e.target.value });
                            }}
                          />
                        </div>
                      </Col>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox">
                          <label>City</label>
                          <TextValidator
                            name="city"
                            type="text"
                            placeholder="City"
                            value={this.state.city}
                            // validators={["required"]}
                            // errorMessages={["This field is required"]}
                            onChange={(e) => {
                              this.setState({ city: e.target.value });
                            }}
                          />
                        </div>
                      </Col>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox">
                          <label>State</label>
                          <TextValidator
                            type="select"
                            value={this.state.state}
                            // validators={["required"]}
                            // errorMessages={["This field is required"]}
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
                          <label>Zip code</label>
                          <TextValidator
                            name="city"
                            type="text"
                            placeholder="Zipcode"
                            value={this.state.zipCode}
                            // validators={["required"]}
                            // errorMessages={["This field is required"]}
                            onChange={(e) => {
                              this.setState({ zipCode: e.target.value });
                            }}
                          />
                        </div>
                      </Col>
                    </Row>
                  </fieldset>
                  <fieldset className="form-fieldset margin-bottom10">
                      <legend>Other Information</legend>
                      <Row>
                        {this.state.tcp !== "" && (
                          <Col lg={4} md={4} sm={4}>
                            <div className="form-group formbox">
                              <label>TCP</label>
                              <TextValidator
                                name="tcp"
                                type="text"
                                placeholder="TCP"
                                value={this.state.tcp}
                                // validators={["required"]}
                                // errorMessages={["This field is required"]}
                                onChange={(e) => {
                                  this.setState({ tcp: e.target.value });
                                }}
                              />
                            </div>
                          </Col>
                        )}
                        {this.state.companyName !== "" && (
                          <Col lg={4} md={4} sm={4}>
                            <div className="form-group formbox">
                              <label>Company Name</label>
                              <TextValidator
                                name="companyName"
                                type="text"
                                placeholder="Company Name"
                                value={this.state.companyName}
                                // validators={["required"]}
                                // errorMessages={["This field is required"]}
                                onChange={(e) => {
                                  this.setState({
                                    companyName: e.target.value,
                                  });
                                }}
                              />
                            </div>
                          </Col>
                        )}
                        {this.state.companyType !== "" && (
                          <Col lg={4} md={4} sm={4}>
                            <div className="form-group formbox">
                              <label>Company Type</label>
                              <TextValidator
                                name="companyType"
                                type="text"
                                placeholder="Company Type"
                                value={this.state.companyType}
                                // validators={["required"]}
                                // errorMessages={["This field is required"]}
                                onChange={(e) => {
                                  this.setState({
                                    companyType: e.target.value,
                                  });
                                }}
                              />
                            </div>
                          </Col>
                        )}
                        {this.state.dba !== "" && (
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
                        )}
                        {this.state.ownerName !== "" && (
                          <Col lg={4} md={4} sm={4}>
                            <div className="form-group formbox">
                              <label>Owner Name</label>
                              <TextValidator
                                name="ownerName"
                                type="text"
                                placeholder="Owner Name"
                                value={this.state.ownerName}
                                // validators={["required"]}
                                // errorMessages={["This field is required"]}
                                onChange={(e) => {
                                  this.setState({ ownerName: e.target.value });
                                }}
                              />
                            </div>
                          </Col>
                        )}
                        {this.state.ownerPhoneNumber !== "" && (
                          <Col lg={4} md={4} sm={4}>
                            <div className="form-group formbox">
                              <label>Owner Phone</label>
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
                        )}
                        {this.state.ownerEmail !== "" && (
                          <Col lg={4} md={4} sm={4}>
                            <div className="form-group formbox">
                              <label>Owner Email</label>
                              <TextValidator
                                name="ownerEmail"
                                type="text"
                                placeholder="Owner Email"
                                value={this.state.ownerEmail}
                                // validators={["required"]}
                                // errorMessages={["This field is required"]}
                                onChange={(e) => {
                                  this.setState({ ownerEmail: e.target.value });
                                }}
                              />
                            </div>
                          </Col>
                        )}
                        {this.state.dateOfRegistration !== "" && (
                          <Col lg={4} md={4} sm={4}>
                            <div className="form-group formbox">
                              <label>Date of Registration</label>
                              <DatePicker
                                // selected={this.state.dateOfRegistration}
                                className="form-control"
                                placeholderText="Select a date"
                                onChange={this.handleChange}
                                name="dateOfRegistration"
                                dateFormat="MM/dd/yyyy"
                                value={Moment(this.state.dateOfRegistration)
                                  .format("MM/DD/YYYY")
                                  .toString()}
                              />
                            </div>
                          </Col>
                        )}
                        {this.state.companyAddress !== "" && (
                          <Col lg={4} md={4} sm={4}>
                            <div className="form-group formbox">
                              <label>Company Address</label>
                              <TextValidator
                                name="companyAddress"
                                type="text"
                                placeholder="Company Address"
                                value={this.state.companyAddress}
                                // validators={["required"]}
                                // errorMessages={["This field is required"]}
                                onChange={(e) => {
                                  this.setState({
                                    companyAddress: e.target.value,
                                  });
                                }}
                              />
                            </div>
                          </Col>
                        )}
                        {this.state.ownerCity !== "" && (
                          <Col lg={4} md={4} sm={4}>
                            <div className="form-group formbox">
                              <label>City</label>
                              <TextValidator
                                name="ownerCity"
                                type="text"
                                placeholder="City"
                                value={this.state.ownerCity}
                                // validators={["required"]}
                                // errorMessages={["This field is required"]}
                                onChange={(e) => {
                                  this.setState({
                                    ownerCity: e.target.value,
                                  });
                                }}
                              />
                            </div>
                          </Col>
                        )}
                        {this.state.ownerState !== "" && (
                          <Col lg={4} md={4} sm={4}>
                            <div className="form-group formbox">
                              <label>State</label>
                              <TextValidator
                                type="select"
                                value={this.state.ownerState}
                                // validators={["required"]}
                                // errorMessages={["This field is required"]}
                                onChange={(e) => {
                                  this.setState({ ownerState: e.target.value });
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
                        )}
                        {this.state.ownerZipcode !== "" && (
                          <Col lg={4} md={4} sm={4}>
                            <div className="form-group formbox">
                              <label>Zip code</label>
                              <TextValidator
                                name="city"
                                type="text"
                                placeholder="Zipcode"
                                value={this.state.ownerZipcode}
                                // validators={["required"]}
                                // errorMessages={["This field is required"]}
                                onChange={(e) => {
                                  this.setState({ ownerZipcode: e.target.value });
                                }}
                              />
                            </div>
                          </Col>
                        )}
                      </Row>
                    </fieldset>
                  <div className="bottom-btn-group pull-right clearfix margin-bottom20">
                    <button type="submit" className="bluebg margin-right5">Submit</button>
                    <button type="button" className="graybg">Cancel</button>
                  </div>
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

export default EditClient;
