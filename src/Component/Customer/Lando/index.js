import React from "react";
import "./index.css";
import { Link, Redirect } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import CheckBox from "../../../Form/CheckBox/index";
import InnerHeader from "../../../Component/Customer/InnerHeader/index";
import axios from "axios";
import apiPath from "../../../Environment/ApiPath";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { ValidatorForm } from "react-form-validator-core";
import TextValidator from "../../../Form/TextValidator/Index";
import StateData from "../../../Config/CountryStates.json";
import PhoneValidator from "../../../Form/PhoneValidator/Index";
import "react-phone-input-2/lib/style.css";
import SignatureCanvas from "react-signature-canvas";
import { Eraser } from '../../../../src/assets/images';


const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
});

class Lando extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signature: "",
      firstName: "",
      middleName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      mailingEmail:"",
      drivingLicence: "",
      city: "",
      state: "",
      dlState: "California",
      zipCode: "",
      address: "",
      userType:"",
      // fileUrl: "",
      dateOfRegistration: new Date(),
      redirectTo: false,
      termsError: "",
      inputError: "This field is required",
      disabled:false
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
  sigCanvas = {};

  clearSignature = () => {
    this.sigCanvas.clear();
    this.setState({
      signature:""
    });
  };

  handleChange = (date) => {
    this.setState({
      dateOfRegistration: date,
    });
  };

  checkUser = () => {
    let userdata = { userType: this.state.userType, drivingLicence: this.state.drivingLicence, email: this.state.email, tcp: this.state.tcp }
    axios.post(apiPath.check_detail, userdata).then((response) => {
      debugger
      console.log(response.data.data);
      let formData = response.data.data;
      if (formData.data) {
        
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
    });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();

    let isValid = true;
    let errObj = {};
    if (!this.state.signature) {
      errObj["fileError"] = "Please add a signature";
      isValid = false;
      // this.setState({disabled: false});
    }
    if (!this.state.agreeToTerms) {
      errObj["termsError"] = "You must agree to terms and conditions";
      isValid = false;
    }
    if (!isValid) {
      this.setState(errObj);
      return;
    }
    if (this.state.disabled) {
        return;
    }
    this.setState({disabled: true});
    const formData = new FormData();
    formData.append("firstName", this.state.firstName);
    formData.append("middleName", this.state.middleName);
    formData.append("lastName", this.state.lastName);
    formData.append("phoneNumber", this.state.phoneNumber);
    formData.append("email", this.state.email);
    // formData.append("mailingEmail", this.state.mailingEmail);
    formData.append("drivingLicence", this.state.drivingLicence);
    formData.append("city", this.state.city);
    formData.append("dlState", this.state.dlState);
    formData.append("state", this.state.state);
    formData.append("zipCode", this.state.zipCode);
    formData.append("address", this.state.address);
    formData.append("formType", "Lan Do");
    formData.append(
      "dateOfRegistration",
      this.state.dateOfRegistration.toISOString()
    );
    formData.append("signature", this.state.signature);

    axios
      .post(apiPath.base_url, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        this.setState({disabled: false});
        if (res.data && res.data.status === "failure") {
          this.setState({disabled: false});
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
          this.setState({ redirectTo: "/lando-pdf/" + res.data.data.formId });
          this.setState({disabled: false});
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
          ref="form"
          instantValidate="true"
          onError={(e) => {
            this.preventDefault();
            console.log(this.refs.form.errorMessages);
            console.log("Form Errors");
          }}
          onSubmit={this.handleSubmit}
        >
          <InnerHeader />
          <div className="form-container">
            <Container>
              <div className="header-content">
                <div className="header-left">
                  <h2>Lan Do & Associates, LLC Release Authorization</h2>
                </div>
                <p>
                  <Link to="/customer" title="Back"><i className="mdi mdi-arrow-left"></i></Link>
                  {/* <span title="Save"><button type="submit"> <i className="mdi mdi-content-save"></i> </button></span> */}
                </p>
              </div>
              <div className="drug-formtab" >
                <div className="cpuc-enrollment-sections clearfix">
                  <div className="consortium-section-outer formsteps bottom-bordernone">
                    <h3>Driver Information</h3>
                    <Row>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox">
                          <label>First Name<sup className="redstarText">*</sup></label>
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
                          <label>Middle Name</label>
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
                          <label>Last Name<sup className="redstarText">*</sup></label>
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
                    </Row>
                    <Row>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox">
                          <label>Phone Number<sup className="redstarText">*</sup></label>
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
                          <label>Email<sup className="redstarText">*</sup></label>
                          <TextValidator
                            name="email"
                            type="email"
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
                            onBlur={() => {
                                  this.state.userType = "Driver"
                                  this.checkUser()
                            }}
                          />
                        </div>
                      </Col>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox">
                          <label>Date<sup className="redstarText">*</sup></label>
                          <DatePicker
                            placeholderText="Select a date"
                            selected={this.state.dateOfRegistration}
                            onChange={this.handleChange}
                            // minDate={new Date()}
                            className="form-control"
                            name="dateOfRegistration"
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
                            value={this.state.dateOfRegistration}
                            readOnly
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox">
                          <label>Driving License<sup className="redstarText">*</sup></label>
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
                            onBlur={() => {
                                  this.state.userType = "Driver"
                                  this.checkUser()
                            }}
                          />
                        </div>
                      </Col>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox selectbox">
                          <label>DL State<sup className="redstarText">*</sup></label>
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
                            <label className="control-label">Address<sup className="redstarText">*</sup></label>
                            <TextValidator
                              type="text"
                              value={this.state.address}
                              placeholder="Address"
                              validators={["required"]}
                              errorMessages={["This field is required"]}
                              onChange={(e) => {
                                this.setState({
                                  address: e.target.value,
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
                              value={this.state.city}
                              placeholder="City"
                              validators={["required"]}
                              errorMessages={["This field is required"]}
                              onChange={(e) => {
                                this.setState({ city: e.target.value });
                              }}
                            />
                          </div>
                        </Col>
                        <Col lg={4} md={4} sm={6}>
                          <div className="form-group formbox">
                            <label className="control-label"> State<sup className="redstarText">*</sup> </label>
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
                              value={this.state.zipCode}
                              placeholder="Zip Code"
                              validators={["required"]}
                              errorMessages={["This field is required"]}
                              onChange={(e) => {
                                this.setState({ zipCode: e.target.value });
                              }}
                            />
                          </div>
                        </Col>
                      </Row>
                    <Row>
                      <Col md={12}>
                        <div className="form-group formbox">
                          <label>Signature<sup className="redstarText">*</sup></label>
                          <div className="signature-outer">
                            <SignatureCanvas
                              ref={(ref) => {
                                this.sigCanvas = ref;
                              }}
                              penColor="black"
                              onEnd={() => {
                                this.setState({
                                  signature: this.sigCanvas.toDataURL(),
                                });
                              }}
                              canvasProps={{
                                className: "sigCanvas",
                              }}
                            />
                            <button className="erase-btn" type="button" onClick={this.clearSignature}>
                              <img src={Eraser} alt="Eraser" />
                            </button>
                          </div>

                          <div className="text-danger">
                            {this.state.fileError}
                          </div>
                        </div>
                        <div className="form-group formbox checkbox-style m0 authorizecheck">
                          <CheckBox
                            onChange={(e) => {
                              this.setState({
                                agreeToTerms: !this.state.agreeToTerms,
                              });
                            }}
                          />
                          <label for="formBasicCheckbox" className="form-check-label">
                            I authorize Accurate C&S Services Inc. to release my drug and/or alcohol test results to Lando & Associates
                            </label>
                        </div>
                        <span className="text-danger clearfix">
                          {this.state.termsError}
                        </span>
                      </Col>
                    </Row>
                    
                  </div>
                  <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox">
                          <label>Mailing address<sup className="redstarText"></sup></label>
                          <TextValidator
                            name="firstName"
                            type="text"
                            value={this.state.mailingEmail}
                            placeholder="Email"
                            validators={['isEmail']}
                            errorMessages={['Email is not valid']}
                            onChange={(e) => {
                              this.setState({ mailingEmail: e.target.value })
                            }}
                          />
                        </div>
                      </Col>
                  <div className="bottom-btn-group pull-right clearfix">
                    <button type="submit" className="bluebg " disabled={this.state.disabled}> Save </button>
                  </div>
                </div>
              </div>
            </Container>
          </div>
        </ValidatorForm>
      </React.Fragment>
    );
  }
}

export default Lando;
