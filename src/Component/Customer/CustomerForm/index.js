import React from "react";
import { Link, Redirect } from "react-router-dom";
import "./index.css";
import { Container, Row, Col } from "react-bootstrap";
import { Accurate_logo1, Accurate_Home } from "../../../../src/assets/images";
import axios from "axios";
import apiPath from "../../../Environment/ApiPath";
import Swal from "sweetalert2";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import TextValidator from "../../../Form/TextValidator/Index";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
});

class CustomerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tcp: "",
      userType: "",
      drivingLicence: "",
      email: "",
      redirectTo: false,
      inputError: "This field is required",
    };
  }

  checkUser = () => {
    debugger
    //  const url = `${apiPath.check_detail}?userType=${this.state.userType}&drivingLicence=${}&email=${this.state.email}&tcp=${}`;
    let errObj = {};
    // if (this.state.userType == "Company") {
    //   if (this.state.tcp !== "" && this.state.tcp.length !== 5) {
    //   errObj["tcpStatusError"] = "TCP should be of 5 digits";
    //   return
    // }
    // }
    let userdata = { userType: this.state.userType, drivingLicence: this.state.drivingLicence, email: this.state.email, tcp: this.state.tcp }
    axios.post(apiPath.check_detail, userdata).then((response) => {
debugger
      console.log(response.data.data);
      let formData = response.data.data;
      if (!formData.data) {
        NotificationManager.error("Data not found!","Error",2000);
        //  return this.setState({ redirectTo: "/admin" });
      } else {
        formData.data.driverName = `${formData.data.firstName || ""} ${formData.data.middleName || ""} ${formData.data.lastName || ""}`;
        formData.data.name = `${formData.data.firstName || ""} ${formData.data.middleName || ""} ${formData.data.lastName || ""}`;
        formData.data.driversLicense = formData.data.drivingLicence;
        window.sessionStorage.setItem("userType", this.state.userType);
        window.sessionStorage.setItem("userData", JSON.stringify(formData.data));
        return this.setState({ redirectTo: "/customer" });

      }


      //   this.setState({
      //     //formData:formData,
      //     company: formData.company,
      //     firstName: formData.firstName || "",
      //     middleName: formData.middleName || "",
      //     lastName: formData.lastName || "",
      //     driverName: `${formData.firstName || ""} ${formData.middleName || ""} ${formData.lastName || ""
      //       }`,
      //     tcp: "",
      //     dba: "",
      //     companyName: "",
      //     phoneNumber: formData.phoneNumber,
      //     ownerName: "",
      //     ownerNumber: "",
      //     ownerEmail: "",
      //     address: formData.address,
      //     drivingLicence: formData.drivingLicence,
      //     dateOfRegistration: formData.dateOfRegistration || "",
      //     email: formData.email,
      //     state: formData.state,
      //     dlState: formData.dlState,
      //     driverType: formData.driverType,
      //     formType: formData.formType,
      //     city: formData.city,
      //     zipCode: formData.zipCode,
      //     forms: formData.forms,
      //     redirectTo: false,
      //   });
    });
  };

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo} />;
    }
    return (
      <React.Fragment>
        <div className="accurate-home">
          <Container fluid>
            <Row>
              <Col lg={6} md={6} sm={6}>
                <div className="accurate-left-group">
                  <div className="accurate-logo">
                    <img src={Accurate_logo1} alt="Accurate Logo" />
                  </div>
                  <div className="customer-form"  >
                    <Row>
                      <Col lg={6} md={6} sm={6}>
                        <label>You are a...</label>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={6} md={6} sm={6}>
                        <div className="form-check">
                          <label className="form-check-label">
                            <input
                              type="radio"
                              onClick={(e) => {
                                this.setState({ isNew: true });
                              }}
                              checked={this.state.isNew === true}
                              className="form-check-input"
                              name="optionsRadiosNew"
                            />{" "}
                            New User <i className="input-helper" />
                          </label>
                        </div>
                      </Col>
                      <Col lg={6} md={6} sm={6}>
                        <div className="form-check">
                          <label className="form-check-label">
                            <input
                              type="radio"
                              checked={this.state.isNew === false}
                              onClick={(e) => {
                                this.setState({ isNew: false });
                              }}
                              className="form-check-input"
                              name="optionsRadiosNew"
                            />{" "}
                            Existing User <i className="input-helper" />
                          </label>
                        </div>
                      </Col>
                    </Row>
                    {this.state.isNew == false &&
                      <React.Fragment>
                        <Row>
                          <Col lg={6} md={6} sm={6}>
                            <label>Company Type</label>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg={6} md={6} sm={6}>
                            <div className="form-check">
                              <label className="form-check-label">
                                <input
                                  type="radio"
                                  onClick={(e) => {
                                    this.setState({ userType: "Individual" });
                                  }}
                                  checked={this.state.userType === "Individual"}
                                  value="Individual"
                                  className="form-check-input"
                                  name="optionsRadios"
                                />{" "}
                                Individual <i className="input-helper" />
                              </label>
                            </div>
                          </Col>
                          <Col lg={6} md={6} sm={6}>
                            <div className="form-check">
                              <label className="form-check-label">
                                <input
                                  type="radio"
                                  checked={this.state.userType === "Company"}
                                  onClick={(e) => {
                                    this.setState({ userType: "Company" });
                                  }}
                                  value="Company"
                                  className="form-check-input"
                                  name="optionsRadios"
                                />{" "}
                                Company <i className="input-helper" />
                              </label>
                            </div>
                          </Col>
                        </Row>
                        {this.state.userType == "Individual" && (
                          <Row>
                            <Col lg={6} md={6} sm={6}>
                              <div className="customer-form-group">
                                <label>
                                  DL Number<sup className="redstarText">*</sup>
                                </label>
                                <input type="text" value={this.state.drivingLicence} onChange={(e) => this.setState({ drivingLicence: e.target.value })} placeholder="DL Number" />
                              </div>
                            </Col>
                            <Col lg={6} md={6} sm={6}>
                              <div className="customer-form-group">
                                <label>
                                  Email<sup className="redstarText">*</sup>
                                </label>
                                <input type="email" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} placeholder="Email" />
                              </div>
                            </Col>
                          </Row>
                        )}

                        {this.state.userType == "Company" && (
                          <Row>
                            <Col lg={12} md={12} sm={12}>
                              <div className="customer-form-group">
                                <label className="control-label">TCP</label>
                                {/* <TextValidator
                                  name="tcp"
                                  type="text"
                                  value={this.state.tcp}
                                  maxLength="5"
                                  placeholder="TCP"
                                  validators={[
                                    "required",
                                    "minStringLength:5",
                                  ]}
                                  errorMessages={["This field is required","TCP should be of 5 digits",]}
                                  onChange={(e) => {
                                    this.setState({ tcp: e.target.value });
                                  }}
                                /> */}
                                <input 
                                type="text"
                                validators={[
                                "required",
                                "minStringLength:5",
                              ]}
                              errorMessages={["This field is required","TCP should be of 5 digits",]}
                                value={this.state.tcp} 
                                onChange={(e) => 
                                this.setState({ tcp: e.target.value }
                                )} 
                                placeholder="TCP" 
                                />
                              </div>
                            </Col>
                            {/* <Col lg={6} md={6} sm={6}>
                          <div className="customer-form-group">
                            <label>Middle Name</label>
                            <input type="text" placeholder="Middle Name" />
                          </div>
                        </Col> */}
                          </Row>
                        )}
                      </React.Fragment>
                    }
                    {this.state.isNew === true ? (<div className="button-card">
                      <Link
                        to="/customer" >Next</Link>
                    </div>) : (
                        this.state.userType &&
                        (<div className="button-card">
                          <button
                            type="button"
                            onClick={() => {
                              this.checkUser();
                            }}
                          >
                            Next
                        </button>
                        </div>)
                      )}
                  </div>
                </div>
                <Link
                  to="/login"
                  style={{
                    position: "fixed",
                    left: "10px",
                    bottom: "10px",
                    zIndex: "99999",
                  }}
                >
                  Admin?
                </Link>
                <div className="ocean">
                  <div className="wave"></div>
                  <div className="wave"></div>
                </div>
              </Col>
              <Col lg={6} md={6} sm={6}>
                <div className="accurate-right-group">
                  <img src={Accurate_Home} alt="Accurate Home" />
                </div>
              </Col>
            </Row>
          </Container>
          <NotificationContainer/>
        </div>
      </React.Fragment>
    );
  }
}

export default CustomerForm;
