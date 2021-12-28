import React from 'react';
import { Link, Redirect } from "react-router-dom";
import './index.css'
import { Container, Row, Col } from 'react-bootstrap';
import axios from "axios";
import apiPath from "../../../Environment/ApiPath";
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { ValidatorForm } from 'react-form-validator-core';
import TextValidator from '../../../Form/TextValidator/Index';
import StateData from '../../../Config/CountryStates.json';
import 'react-phone-input-2/lib/style.css'
import SignatureCanvas from 'react-signature-canvas'
import InnerHeader from "../../Customer/InnerHeader/index";
import PhoneValidator from "../../../Form/PhoneValidator/Index";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {
  Eraser
} from '../../../assets/images';


const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

class PersonalTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signature: "",
      firstName: "",
      middleName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      drivingLicence: "",
      city: "",
      state: "",
      zipCode: "",
      address: "",
      // fileUrl: "",
      dateOfRegistration: new Date(),
      redirectTo: false,
      termsError: "",
      tabIndex: 0,
      inputError: "This field is required",
      dlState: "California",
      fax:"",
    };
  }
  handleChange = (date) => {
    this.setState({
      dateOfRegistration: date
    })
  }

  sigCanvas = {}

  clearSignature = () => {
    this.sigCanvas.clear()
    this.setState({
      signature:""
    });
  }
  componentDidMount(){
    this.setState({...this.props.formData})
      if(this.props.formData.signature){
      this.sigCanvas.fromDataURL(this.props.formData.signature)
    }
  }
  handleSubmit = async (evt) => {
    evt.preventDefault();
    let isValid = true;
    let errObj = {}
    if (!this.state.signature) {
      errObj['fileError'] = "Please add a signature";
      isValid = false;
    }
    if (!this.state.agreeToTerms) {
      errObj['termsError'] = "You must agree to terms and conditions";
      isValid = false;
    }
    if (!isValid) {
      this.setState(errObj);
      return;
    }
    const formData = new FormData();
    formData.append("id",this.state._id);
    formData.append('firstName', this.state.firstName);
    formData.append('middleName', this.state.middleName);
    formData.append('lastName', this.state.lastName);
    formData.append('phoneNumber', this.state.phoneNumber);
    formData.append('email', this.state.email);
    formData.append('drivingLicence', this.state.drivingLicence);
    formData.append('dlState', this.state.dlState);
    formData.append('city', this.state.city);
    formData.append('state', this.state.state);
    formData.append('zipCode', this.state.zipCode);
    formData.append('address', this.state.address);
    formData.append('formType', "Personal Test");
    formData.append('dateOfRegistration', this.state.dateOfRegistration.toString());
    formData.append('signature', this.state.signature);
    formData.append('fax',this.state.fax)

    axios.post(apiPath.base_url, formData, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }).then((res) => {
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

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo} />;
    }
    return (
      <React.Fragment>
        <ValidatorForm
          ref="form" instantValidate="true" onError={(e) => {
            this.preventDefault();
            console.log(this.refs.form.errorMessages)
            console.log("Form Errors");
          }}
          onSubmit={this.handleSubmit}>
          <InnerHeader />
          <div className="form-container">
            <Container>
              <div className="header-content">
                <div className="header-left">
                  <h2>Personal Test Release Authorization</h2>
                </div>
              </div>
              <div className="drug-formtab" >
                <div className="cpuc-enrollment-sections clearfix">
                  <div className="consortium-section-outer formsteps bottom-bordernone">
                    <h3>Client Information</h3>
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
                              this.setState({ firstName: e.target.value })
                            }}
                          />
                        </div>
                      </Col>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox">
                          <label>Middle Name</label>
                          <input
                            type="text"
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
                            validators={['required', 'isEmail']}
                            errorMessages={['This field is required', 'Email is not valid']}
                            onChange={(e) => {
                              this.setState({ email: e.target.value });
                            }}
                          />
                        </div>
                      </Col>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox">
                          <label>Date<sup className="redstarText">*</sup></label>
                          <DatePicker
                            placeholderText="Select a date"
                            className="date-picker-form"
                            selected={this.state.dateOfRegistration?new Date(this.state.dateOfRegistration):null}
                            onChange={this.handleChange}
                            style={{ width: "100%" }}
                            minDate={new Date()}
                            name="dateOfRegistration"
                            dateFormat="MM/dd/yyyy"
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                          />
                          <TextValidator name="enddate" className="mrgbotm" tabIndex={-1} autoComplete="off" style={{ opacity: 0, height: 0, padding: 0 }} value={this.state.dateOfRegistration} readOnly
                            validators={['required']}
                            errorMessages={['This field is required']}
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox">
                          <label>Driver's License/State ID Number<sup className="redstarText">*</sup></label>
                          <TextValidator
                            type="text"
                            value={this.state.drivingLicence}
                            placeholder="DL Number"
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                            onChange={(e) => {
                              this.setState({ drivingLicence: e.target.value });
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
                    </Row>
                    <div className="form-group formbox signature-box">
                    <label>Signature<sup className="redstarText">*</sup></label>
                      <div className="signature-outer">
                        <SignatureCanvas ref={(ref) => { this.sigCanvas = ref }} onEnd={() => {
                          this.setState({ signature: this.sigCanvas.toDataURL() });
                        }}
                          canvasProps={{ className: 'sigCanvas' }} />
                        <button className="erase-btn" type="button" onClick={this.clearSignature}>
                          <img src={Eraser} alt="Eraser" />
                        </button>
                      </div>
                      
                      <div className="text-danger">{this.state.fileError}</div>
                    </div>
                    <Row>
                      <Col md={12}>
                        <div className="form-group formbox checkbox-style authorizecheck">
                          <label title="" for="formBasicCheckbox">
                            <input type="checkbox" id="formBasicCheckbox" onChange={(e) => {
                              this.setState({ agreeToTerms: !this.state.agreeToTerms });
                            }} /> I authorize Accurate C&S Services, Inc. to release my drug and/or alcohol test results to:
                        </label>
                        </div>
                        <div className="text-danger clearfix">{this.state.termsError}</div>
                      </Col>
                    </Row> 
                    <Row>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox">
                          <label>Email<sup className="redstarText">*</sup></label>
                          <TextValidator
                            name="firstName"
                            type="text"
                            value={this.state.email}
                            placeholder="Email"
                            validators={['required', 'isEmail']}
                            errorMessages={['This field is required', 'Email is not valid']}
                            onChange={(e) => {
                              this.setState({ email: e.target.value })
                            }}
                          />
                        </div>
                      </Col>
                      {/* <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox">
                          <label>Mailing address</label>
                          <input type="text"
                            placeholder="Mailing address"
                          />
                        </div>
                      </Col> */}
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox">
                          <label>Fax</label>
                          <input
                            type="text"
                            placeholder="Fax"
                            value={this.state.fax}
                            onChange={(e) => {
                              this.setState({ fax: e.target.value })
                            }}
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="bottom-btn-group pull-right clearfix">
                    <button type="submit" className="bluebg "> Save </button>
                  </div>
                </div>
              </div>
            </Container>
            <NotificationContainer/>
          </div>
        </ValidatorForm>
      </React.Fragment>
    );
  }
}

export default PersonalTest;
