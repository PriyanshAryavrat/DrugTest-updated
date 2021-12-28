import React from 'react';
import './index.css'
import { Link, Redirect } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import { ValidatorForm } from "react-form-validator-core";
import TextValidator from "../../../Form/TextValidator/Index";
import SignatureCanvas from "react-signature-canvas";
import DatePicker from "react-datepicker";
import axios from "axios";
import apiPath from "../../../Environment/ApiPath";
import "react-datepicker/dist/react-datepicker.css";
import InnerHeader from "../../../Component/Customer/InnerHeader/index";
import Swal from "sweetalert2";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {Eraser} from '../../../../src/assets/images';

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
});

class Acknowledgement extends React.Component {
  constructor(props) {
    super(props);
    //let { id } = this.props.match.params;
    this.state = {
      id: localStorage.getItem('id') || "",
      employeeName: localStorage.getItem('name') || "",
      dateOfRegistration: new Date(),
      dlNumber: localStorage.getItem('dlNumber') || "",
      email: localStorage.getItem('email') || "",
      redirectTo: false,
      signature: localStorage.getItem('signature') || "",
      redirectfrom: localStorage.getItem('redirectfrom') || "",
    };
  }
  sigCanvas = {};

  clearSignature = () => {
    this.sigCanvas.clear();
    this.setState({
      signature:""
    });
  };


  

  componentDidMount() {
    this.sigCanvas.fromDataURL(this.state.signature)
  }

  handleChange = (date) => {
    console.log(date.toISOString());
    this.setState({
      dateOfRegistration: date,
    });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    // debugger
    let isValid = true;
    let errObj = {};
    if (!this.state.signature) {
      errObj["fileError"] = "Please add a signature";
      isValid = false;
    }
    if (!isValid) {
      this.setState(errObj);
      return;
    }
    const formData = new FormData();
    formData.append("printedName", this.state.employeeName);
    formData.append(
      "dateOfRegistration",
      this.state.dateOfRegistration.toISOString()
    );
    formData.append("dlNumber", this.state.dlNumber);
    formData.append("email", this.state.email);
    formData.append("signature", this.state.signature);

    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('dlNumber');
    localStorage.removeItem('id');

    axios.put(apiPath.ack_dot_form + `/${this.state.id}`, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        // debugger
        if (res.data && res.data.status === "failure") {
          NotificationManager.error(res.data.message,"Error",2000);
          this.setState({disabled: false});
          return;
        }
        // debugger
        NotificationManager.success("Form Submitted Successfully!","Success",2000);
        setTimeout(() => {
          this.setState({ redirectTo: "/ack-pdf/" + this.state.id });
          this.setState({disabled: false});
          //  this.setState({ redirectTo: "/acknowledgement" });
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
                  <h2>Acknowledgment And Receipt</h2>
                </div>
                <p>
                  <Link to="/customer" title="Back"><i className="mdi mdi-home"></i></Link>
                  {/* <Link to="#" title="Print"><i className="mdi mdi-printer"></i></Link> */}
                  {/* <span title="Save"><button type="submit"> <i className="mdi mdi-content-save"></i> </button></span> */}
                </p>
              </div>
              <div className="drug-formtab" >
                <div className="cpuc-enrollment-sections clearfix">
                  <div className="consortium-section-outer formsteps bottom-bordernone">
                    {/* <h3>Company Information</h3> */}
                    <div className="request-information">
                    <p>I have received a copy or the COMPANY'S DOT Drug and Alcohol Testing Policy and understand that in order to continue my employment with the COMPANY, I must abide by the terms of this policy</p>
                    <p>I also verify that I have received information on the effects of alcohol and controlled substance on my health, work and personal life, signs and symptoms of a problem and available methods of intervening when a problem is suspected.</p>
                  </div>
                    <Row>
                    <Col lg={4} md={4} sm={4}>
                      <div className="form-group formbox">
                        <label>Employee's Printed Name</label>
                        <TextValidator
                          name="firstName"
                          type="text"
                          value={this.state.employeeName}
                          placeholder="Employee's Printed Name"
                          validators={["required"]}
                          errorMessages={["This field is required"]}
                          onChange={(e) => {this.setState({ employeeName: e.target.value });
                        }}
                        />
                      </div>
                    </Col>
                    <Col lg={4} md={4} sm={4}>
                      <div className="form-group formbox">
                        <label>Date <sup className="redstarText">*</sup></label>
                        <DatePicker
                          placeholderText="Select a date"
                          selected={this.state.dateOfRegistration}
                          onChange={this.handleChange}
                          minDate={new Date()}
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
                    <Col lg={4} md={4} sm={4}>
                      <div className="form-group formbox">
                        <label>DL Number</label>
                        <TextValidator
                          name="dlNumber"
                          type="text"
                          value={this.state.dlNumber}
                          placeholder="DL Number"
                          validators={["required"]}
                          errorMessages={["This field is required"]}
                          onChange={(e) => {
                            this.setState({ dlNumber: e.target.value });
                          }}
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={4} md={4} sm={4}>
                      <div className="form-group formbox">
                        <label>Email</label>
                        <TextValidator
                          name="email"
                          type="text"
                          value={this.state.email}
                          placeholder="Email"
                          validators={["required"]}
                          errorMessages={["This field is required"]}
                          onChange={(e) => {
                            this.setState({ email: e.target.value });
                          }}
                        />
                      </div>
                    </Col>
                  </Row>
                  <div className="form-group formbox">
                    <div className="signature-outer">
                      <SignatureCanvas
                        ref={(ref) => { 
                          this.sigCanvas = ref;
                        }}
                        clearOnResize="false"
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
                    <label>Employee's Signature</label>
                    <div className="text-danger">
                      {this.state.fileError}
                    </div>
                  </div>
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

export default Acknowledgement;

