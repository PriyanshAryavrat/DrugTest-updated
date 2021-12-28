import React from "react";
import { Link, Redirect } from "react-router-dom";
import "./index.css";
import Swal from "sweetalert2";
import { Row, Col, Table, Button } from "react-bootstrap";
import { Tabs, Tab } from "react-bootstrap-tabs";
import { ValidatorForm } from "react-form-validator-core";
import TextValidator from "../../../Form/TextValidator/Index";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import apiPath from "../../../Environment/ApiPath";
import Moment from 'moment';
import PhoneValidator from "../../../Form/PhoneValidator/Index";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
});
let dotSubstance = [
  { substance: "6-ACETYLMORPHINE", screen: "10", confirm: "10", result: "", unitOfMeasure: "ng/mL" },
  { substance: "AMPHETAMINES", screen: "500", confirm: "250", result: "", unitOfMeasure: "ng/mL" },
  { substance: "COCAINE METABOLITES", screen: "150", confirm: "100", result: "", unitOfMeasure: "ng/mL" },
  { substance: "MARIJUANA METABOLITES", screen: "50", confirm: "15", result: "", unitOfMeasure: "ng/mL" },
  { substance: "MDA-ANALOGUES", screen: "500", confirm: "250", result: "", unitOfMeasure: "ng/mL" },
  { substance: "OPIATES", screen: "2000", confirm: "2000", result: "", unitOfMeasure: "ng/mL" },
  { substance: "OPIATES (SEMI-SYNTHETIC)", screen: "300", confirm: "100", result: "", unitOfMeasure: "ng/mL" },
  { substance: "OXYCODONES", screen: "100", confirm: "100", result: "", unitOfMeasure: "ng/mL" },
  { substance: "PHENCYCLIDINE", screen: "25", confirm: "25", result: "", unitOfMeasure: "ng/mL" },
]
let CPUCandALCSubstance = [
  { substance: "AMPHETAMINES", screen: "1000", confirm: "500", result: "", unitOfMeasure: "ng/mL" },
  { substance: "COCAINE METABOLITES", screen: "300", confirm: "150", result: "", unitOfMeasure: "ng/mL" },
  { substance: "MARIJUANA METABOLITES", screen: "50", confirm: "15", result: "", unitOfMeasure: "ng/mL" },
  { substance: "MDA-ANALOGUES", screen: "500", confirm: "250", result: "", unitOfMeasure: "ng/mL" },
  { substance: "OPIATES", screen: "2000", confirm: "2000", result: "", unitOfMeasure: "ng/mL" },
  { substance: "PHENCYCLIDINE", screen: "25", confirm: "25", result: "", unitOfMeasure: "ng/mL" },
  // { substance: "CREATININE", screen: "", confirm: "", result: "", unitOfMeasure: "ng/mL" },
  // { substance: "OXIDIZING ADULTERANTS", screen: "", confirm: "", result: "", unitOfMeasure: "ng/mL" },
  // { substance: "pH", screen: "", confirm: "", result: "", unitOfMeasure: "ng/mL" },
]

let ALCandALCSubstance = [
  { substance: "AMPHETAMINES", screen: "1000", confirm: "500", result: "", unitOfMeasure: "ng/mL" },
  { substance: "COCAINE METABOLITES", screen: "300", confirm: "150", result: "", unitOfMeasure: "ng/mL" },
  { substance: "MARIJUANA METABOLITES", screen: "50", confirm: "15", result: "", unitOfMeasure: "ng/mL" },
  { substance: "MDA-ANALOGUES", screen: "500", confirm: "250", result: "", unitOfMeasure: "ng/mL" },
  { substance: "OPIATES", screen: "2000", confirm: "2000", result: "", unitOfMeasure: "ng/mL" },
  { substance: "PHENCYCLIDINE", screen: "25", confirm: "25", result: "", unitOfMeasure: "ng/mL" },
  { substance: "CREATININE", screen: "", confirm: "", result: "", unitOfMeasure: "ng/mL" },
  { substance: "OXIDIZING ADULTERANTS", screen: "", confirm: "", result: "", unitOfMeasure: "ng/mL" },
  { substance: "pH", screen: "", confirm: "", result: "", unitOfMeasure: "ng/mL" },
]
let testType = ["Breath alcohol", "Drug–urine", "Drug–other"];
let testReason = ["Pre-employment", "Random"];
let dotTestReason = ["Pre-employment", "Random","Post-accident","Follow-up","Return to duty","Reasonable suspicion/cause","Other"];

class ViewClient extends React.Component {
  constructor(props) {
    super(props);
    let { id } = this.props.match.params;
    this.state = {
      id: id,
      selectedResultType:"",
      company: {
        tcp: "",
        tcpStatus: "",
        companyType: "",
        companyName: "",
        companyAddress: "",
        ownerName: "",
        ownerPhoneNumber: "",
        ownerCity: "",
        ownerState: ""
      },
      driverName: "",
      driverType: "",
      tcp: "",
      dba: "",
      companyName: "",
      companyType: "",
      phoneNumber: "",
      ownerName: "",
      ownerNumber: "",
      ownerEmail: "",
      address: "",
      drivingLicence: "",
      email: "",
      state: "",
      tabIndex: 0,
      currentForm: {},
      formData: "",
      dateOfRegistration: new Date(),
      drugDetail: {
        testType: "",
        testDate: "",
        testReason: "",
        testResults: [],
        testResult: null,
        driverId: id,
        formId: "",
        testTypeOther: "",
        attachment: null,
      },
      drugResults: [],
      invoices: [],
      testResults: [],
      disabled:false
    };
  }

  componentDidMount() {
    this.getDrugResultData()
  }

  getDrugResultData() {
    let token = sessionStorage.getItem("authToken");
    if (!token) {
      this.setState({ redirectTo: "/login" })
    }
    const url = `${apiPath.driver_detail}/${this.state.id}`;
    axios.get(url).then((response) => {
      debugger
      console.log(response.data.data);
      let formData = response.data.data;
      if (!formData) {
        return this.setState({ redirectTo: '/admin' })
      }
      this.setState({
        formData: formData,
        company: formData.company,
        firstName: formData.firstName || "",
        middleName: formData.middleName || "",
        lastName: formData.lastName || "",
        driverName: `${formData.firstName || ""} ${formData.middleName || ""} ${formData.lastName || ""}`,
        tcp: "",
        dba: "",
        companyName: "",
        companyType: "",
        phoneNumber: formData.phoneNumber,
        ownerName: "",
        ownerNumber: "",
        ownerEmail: "",
        address: formData.address,
        drivingLicence: formData.drivingLicence,
        dateOfRegistration: formData.dateOfRegistration || "",
        email: formData.email,
        state: formData.state,
        dlState: formData.dlState,
        driverType: formData.driverType,
        formType: formData.formType,
        city: formData.city,
        zipCode: formData.zipCode,
        forms: formData.forms,
        redirectTo: false,
        drugResults: formData.drugResults,
        invoices: formData.invoices,


      });
    });
  }

  handleChange = (date) => {
    let drugdata = { ...this.state.drugDetail, testDate: date }
    this.setState({
      drugDetail: drugdata,
    });
  };
  getFiles(e) {

    let files = e.target.files;

    // Process each file
    var allFiles = [];
    for (var i = 0; i < files.length; i++) {

      let file = files[i];

      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {

        // Make a fileInfo Object
        let fileInfo = {
          name: file.name,
          type: file.type,
          size: Math.round(file.size / 1000) + ' kB',
          base64: reader.result,
          file: file,
        };
        let drugdata = { ...this.state.drugDetail, attachment: fileInfo.base64 }
        this.setState({
          drugDetail: drugdata,
        });

      }

    }

  }
  handleSubmit = async (evt) => {
    evt.preventDefault();
    if (this.state.disabled) {
        return;
    }
    this.setState({disabled: true});

    debugger
    var formData = {
      testType: this.state.drugDetail.testType,
      testDate: this.state.drugDetail.testDate,
      testReason: this.state.drugDetail.testReason,
      testResults: this.state.drugDetail.testResults,
      testResult: this.state.drugDetail.testResult,
      driverId: this.state.drugDetail.driverId,
      formId: this.state.drugDetail.formId,
      testTypeOther: this.state.drugDetail.testTypeOther,
      attachment: this.state.drugDetail.attachment,

    }
    // const formData = new FormData();
    // formData.append("testType", this.state.drugDetail.testType);
    // formData.append("testDate", this.state.drugDetail.testDate);
    // formData.append("testReason", this.state.drugDetail.testReason);
    // formData.append("testResults", this.state.drugDetail.testResults);
    // formData.append("testResult", this.state.drugDetail.testResult);
    // formData.append("driverId", this.state.drugDetail.driverId);
    // formData.append("formId", this.state.drugDetail.formId);
    // formData.append("testTypeOther", this.state.drugDetail.testTypeOther);

    axios
      .post(apiPath.save_drug_result, formData, {
        // headers: {
        //   "content-type": "multipart/form-data",
        // },
      })
      .then((res) => {
        this.setState({disabled: false});
        if (res.data && res.data.status === "failure") {
          Toast.fire({
            type: "error",
            title: res.data.message,
          });
          return;
        }
        document.getElementById("clsbtn").click();
        this.getDrugResultData()
        Toast.fire({
          type: "success",
          title: "Data Saved Successfully!",
        });

      });
  };
  render() {
    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo} />;
    }
    return (
      <React.Fragment>
        <div className="content-wrapper">
          <div className="main-content">
            <div className="page-header inner-header">
              <Link className="hearder-lefticon" to="/admin"><i className="mdi mdi-chevron-left"></i></Link>
              <h2 className="page-title"> Client Detail  </h2>
            </div>
            <div className="card innercard-bg margin-bottom30 clearfix padding0">
              <div className="addinner-header">
                <div className="user-heading clearfix">
                  <h3>
                    {this.state.driverName}
                  </h3>
                  {/* <div className="onoffswitch3 userbutton-group">
                    <Link to={`/admin/edit-client/${this.state.id}`}><button className="bluebg">Edit</button></Link>
                  </div> */}
                </div>
              </div>
              <div className="detailbox-table addclienttb">
                <ValidatorForm>
                  <fieldset className="form-fieldset">
                    <legend>Personal Details</legend>
                    <Row>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox view-form-group">
                          <label className="control-label">
                            First Name <sup className="redstarText">*</sup>
                          </label>
                          <TextValidator
                            name="firstName"
                            type="text"
                            value={this.state.firstName}
                            disabled="disabled"
                            
                          />
                        </div>
                      </Col>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox view-form-group">
                          <label className="control-label">Middle Name</label>
                          <input
                            type="text"
                            className="form-control"
                           
                            disabled="disabled"
                            value={this.state.middleName}
                          />
                        </div>
                      </Col>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox view-form-group">
                          <label className="control-label">
                            Last Name <sup className="redstarText">*</sup>
                          </label>
                          <TextValidator
                            type="text"
                            value={this.state.lastName}
                           
                            disabled="disabled"
                          />
                        </div>
                      </Col>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox view-form-group">
                          <label>Phone No.</label>
                          {/* <TextValidator
                            name="pNumber"
                            type="text"
                            
                            disabled="disabled"
                            value={this.state.phoneNumber}
                          /> */}
                          <PhoneValidator
                            name="pNumber"
                            type="text"
                            placeholder=""
                            disabled="disabled"
                            value={this.state.phoneNumber}
                          />
                        </div>
                      </Col>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox view-form-group">
                          <label>Email</label>
                          <TextValidator
                            name="email"
                            type="text"
                            
                            disabled="disabled"
                            value={this.state.email}
                          />
                        </div>
                      </Col>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox view-form-group">
                          <label>DL Number</label>
                          <TextValidator
                            name="drivingLicence"
                            type="text"
                           
                            disabled="disabled"
                            value={this.state.drivingLicence}
                          />
                        </div>
                      </Col>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox view-form-group">
                          <label> DL State</label>
                          <TextValidator
                            type="text"
                            value={this.state.dlState}
                            disabled="disabled"
                          ></TextValidator>
                        </div>
                      </Col>
                      {this.state.driverType !== "" &&
                        <Col lg={4} md={4} sm={4}>
                          <div className="form-group formbox view-form-group">
                            <label>Driver Type</label>
                            <TextValidator
                              name="driverType"
                              type="text"
                              
                              disabled="disabled"
                              value={this.state.driverType}
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
                      }
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox view-form-group">
                          <label>Address</label>
                          <TextValidator
                            name="address"
                            type="text"
                           
                            value={this.state.address}
                            disabled="disabled"
                          />
                        </div>
                      </Col>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox view-form-group">
                          <label>City</label>
                          <TextValidator
                            name="city"
                            type="text"
                            
                            disabled="disabled"
                            value={this.state.city}
                          />
                        </div>
                      </Col>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox view-form-group">
                          <label>State</label>
                          <TextValidator
                            type="text"
                            value={this.state.state}
                            disabled="disabled"
                          ></TextValidator>
                        </div>
                      </Col>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox view-form-group">
                          <label>Zipcode</label>
                          <TextValidator
                            name="city"
                            type="text"
                           
                            value={this.state.zipCode}
                            disabled="disabled"
                          />
                        </div>
                      </Col>
                    </Row>
                  </fieldset>
                  <fieldset className="form-fieldset hide">
                    <legend>Other Information</legend>
                    <Row>
                      {(this.state.company && (this.state.company.tcp !== "" || this.state.company.tcpStatus !== "")) &&
                        <Col lg={4} md={4} sm={4}>
                          <div className="form-group formbox view-form-group">
                            <label>TCP</label>
                            <TextValidator
                              name="tcp"
                              type="text"
                              
                              value={this.state.company.tcp || this.state.company.tcpStatus}
                              disabled="disabled"
                            />
                          </div>
                        </Col>
                      }

                      {this.state.company && this.state.company.companyName !== "" &&
                        <Col lg={4} md={4} sm={4}>
                          <div className="form-group formbox view-form-group">
                            <label>Company Name</label>
                            <TextValidator
                              name="companyName"
                              type="text"
                              
                              disabled="disabled"
                              value={this.state.company.companyName}
                            />
                          </div>
                        </Col>
                      }
                      {this.state.company && this.state.company.companyType !== "" &&
                        <Col lg={4} md={4} sm={4}>
                          <div className="form-group formbox view-form-group">
                            <label>Company Type</label>
                            <TextValidator
                              name="companyType"
                              type="text"
                             
                              disabled="disabled"
                              value={this.state.company.companyType}
                            />
                          </div>
                        </Col>
                      }
                      {this.state.company && this.state.company.dba !== "" &&
                        <Col lg={4} md={4} sm={4}>
                          <div className="form-group formbox view-form-group">
                            <label>DBA</label>
                            <TextValidator
                              name="dba"
                              type="text"
                              
                              disabled="disabled"
                              value={this.state.company.dba !=="undefined" ? this.state.company.dba :""}
                            />
                          </div>
                        </Col>
                      }
                      {this.state.company && this.state.company.ownerName !== "" &&
                        <Col lg={4} md={4} sm={4}>
                          <div className="form-group formbox view-form-group">
                            <label>Owner Name</label>
                            <TextValidator
                              name="ownerName"
                              type="text"
                             
                              disabled="disabled"
                              value={this.state.company.ownerName}
                            />
                          </div>
                        </Col>
                      }
                      {this.state.company && this.state.company.ownerPhoneNumber !== "" &&
                        <Col lg={4} md={4} sm={4}>
                          <div className="form-group formbox view-form-group">
                            <label>Owner Phone</label>
                            <TextValidator
                              name="ownerPhoneNumber"
                              type="text"
                             
                              disabled="disabled"
                              value={this.state.company.ownerPhoneNumber}
                            />
                          </div>
                        </Col>
                      }
                      {this.state.company && this.state.company.ownerEmail !== "" &&
                        <Col lg={4} md={4} sm={4}>
                          <div className="form-group formbox view-form-group">
                            <label>Owner Email</label>
                            <TextValidator
                              name="ownerEmail"
                              type="text"
                              
                              disabled="disabled"
                              value={this.state.company.ownerEmail}
                            />
                          </div>
                        </Col>
                      }
                      {this.state.dateOfRegistration !== "" &&
                        <Col lg={4} md={4} sm={6}>
                          <div className="form-group formbox view-form-group">
                            <label>Date of Registration</label>
                            <DatePicker
                              className="form-control"
                              placeholderText="Select a date"
                              name="dateOfRegistration"
                              disabled="disabled"
                              dateFormat="MM/dd/yyyy"
                              value={Moment(this.state.dateOfRegistration).format('MM/DD/YYYY').toString()}
                            />
                          </div>
                        </Col>
                      }
                      {this.state.company && this.state.company.companyAddress !== "" &&
                        <Col lg={4} md={4} sm={4}>
                          <div className="form-group formbox view-form-group">
                            <label>Company Address</label>
                            <TextValidator
                              name="companyAddress"
                              type="text"
                              placeholder="Company Address"
                              disabled="disabled"
                              value={this.state.company.companyAddress}
                            />
                          </div>
                        </Col>
                      }
                      {this.state.company && this.state.company.ownerCity !== "" &&
                        <Col lg={4} md={4} sm={4}>
                          <div className="form-group formbox view-form-group">
                            <label>City</label>
                            <TextValidator
                              name="city"
                              type="text"
                              placeholder="City"
                              disabled="disabled"
                              value={this.state.company.ownerCity}
                            />
                          </div>
                        </Col>
                      }
                      {this.state.company && this.state.company.ownerState !== "" &&
                        <Col lg={4} md={4} sm={4}>
                          <div className="form-group formbox view-form-group">
                            <label>State</label>
                            <TextValidator
                              type="text"
                              value={this.state.company.ownerState}
                              disabled="disabled"
                            ></TextValidator>
                          </div>
                        </Col>
                      }
                      {this.state.company && this.state.company.ownerZipcode !== "" &&
                        <Col lg={4} md={4} sm={4}>
                          <div className="form-group formbox view-form-group">
                            <label>Zipcode</label>
                            <TextValidator
                              name="city"
                              type="text"
                              placeholder="Zipcode"
                              disabled="disabled"
                              value={this.state.company.ownerZipcode}
                            />
                          </div>
                        </Col>
                      }

                    </Row>
                  </fieldset>
                </ValidatorForm>
                <Tabs
                  selected={this.state.tabIndex}
                  className="tab-outerbox"
                  onSelect={(index, label) => console.log(label + " selected")}
                >
                  <Tab label="Test Info">
                    <div className="tabdetail-box">
                      <div className="table-responsive">

                        <Table className="table table-hover tablestyle border-bottom tableth-topalign">
                          <thead>
                            <tr>
                              <th>Sr No. </th>
                              <th>Test Type</th>
                              <th>Test Date</th>
                              <th>Test Reason</th>
                              <th>Test Result</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.drugResults && this.state.drugResults.map((element, index) => {
                              return <tr>
                                <td>{index + 1}</td>
                                <td>{element.testType}</td>
                                <td>{Moment(element.testDate).format('MM/DD/YYYY').toString()}</td>
                                <td>{element.testReason}</td>
                                <td>{element.testResults && element.testResults.length > 0 ? (<Link to="#testresultModal" onClick={() => {
                                  this.setState({
                                    testResults: element.testResults,
                                    tabIndex: 0
                                  });
                                }} data-toggle="modal" title="View"><i className="mdi mdi-eye"></i></Link>) : element.testResult}
                                  <span>{" "}</span> {element.attachment && <a href={`${apiPath.pdf_download_url}/${element._id}`} title="Download PDF" target="_blank"><i className="mdi mdi-file-pdf"></i></a>}
                                </td>

                              </tr>
                            })}
                            {/* <tr>
                              <td>1</td>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                              <td>
                                <div className="action-group text-center">
                                  <Link to="/more-assistance">
                                    <i className="mdi mdi-file-pdf-outline"></i>
                                  </Link>
                                  <Link to="/more-assistance" title="View">
                                    <i className="mdi mdi-eye"></i>
                                  </Link>
                                </div>
                              </td>
                              <td></td>
                            </tr> */}
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  </Tab>
                  <Tab label="Forms">
                    <div className="tabdetail-box">
                      <div className="table-responsive">
                        <Table className="table table-hover tablestyle border-bottom tableth-topalign">
                          <thead>
                            <tr>
                              <th>Sr No. </th>
                              <th>Form Type</th>
                              <th>Date of Registration</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.forms && this.state.forms.map((element, index) => {
                              return <tr>
                                <td>{index + 1}</td>
                                <td>{element.formType}{element.formSubtype && " " + `(${element.formSubtype})`}</td>
                                <td>{Moment(element.createdAt).format('MM/DD/YYYY').toString()}</td>
                                <td>
                                  <div className="action-group text-center">
                                    {(element.formType !== "DNA") ?
                                      (<div><Link to="#myModal" onClick={() => {
                                        let currentFormData = { ...element, ...this.state.formData, ...this.state.formData.company };
                                        this.setState({
                                          currentForm: currentFormData,
                                          tabIndex: 1
                                        });
                                      }} data-toggle="modal" title="View"><i className="mdi mdi-eye"></i></Link>
                                        <Link to={`/admin/edit/${element.formType}/${element._id}`} onClick={() => {
                                        }} title="View"><i className="mdi mdi-pencil"></i></Link>
                                        {element.formType == "ALC" && <Link target="_blank" to={`/alc-pdf/${element._id}`} onClick={() => {
                                        }} title="PDF"><i className="mdi mdi-file-pdf"></i></Link>}
                                        {element.formType == "Taxi" && <Link target="_blank" to={`/taxi-pdf/${element._id}`} onClick={() => {
                                        }} title="PDF"><i className="mdi mdi-file-pdf"></i></Link>}
                                        {element.formType == "Personal Test" && <Link target="_blank" to={`/personal-pdf/${element._id}`} onClick={() => {
                                        }} title="PDF"><i className="mdi mdi-file-pdf"></i></Link>}
                                        {/* {element.formType == "ALC" && <Link to={`/taxi-pdf/${element._id}`} onClick={() => {
                                        }} title="PDF"><i className="mdi mdi-file-pdf"></i></Link>} */}
                                        {element.formType == "USCG" && <Link target="_blank" to={`/uscg-pdf/${element._id}`} onClick={() => {
                                        }} title="PDF"><i className="mdi mdi-file-pdf"></i></Link>}
                                        {element.formType == "CPUC" && <Link target="_blank" to={`/cpuc-pdf/${element._id}`} onClick={() => {
                                        }} title="PDF"><i className="mdi mdi-file-pdf"></i></Link>}
                                        {element.formType == "DOT" && <Link target="_blank" to={`/dot-pdf/${element._id}`} onClick={() => {
                                        }} title="PDF"><i className="mdi mdi-file-pdf"></i></Link>}
                                        <Link to="#testModal" onClick={() => {
                                          let detail = {
                                            testType: "",
                                            testDate: "",
                                            testReason: "",
                                            testResults: element.formType == "DOT" ? [...dotSubstance] : element.formType == "ALC" ? [...ALCandALCSubstance] : element.formType == "CPUC" ? [...CPUCandALCSubstance] : [],
                                            testResult: null,
                                            selectedResultType:element.formType,
                                            driverId: this.state.id,
                                            formId: element._id,
                                            testTypeOther: "",
                                            attachment: null
                                          }
                                          this.setState({ drugDetail: detail, tabIndex: 1 })
                                        }
                                        } data-toggle="modal" title="View"><a href="#">Add Result</a></Link>
                                      </div>) : (
                                        <div><Link to={`/admin/dnaForm/${element.formSubtype}/${element._id}`} onClick={() => {
                                        }} title="View"><i className="mdi mdi-eye"></i></Link>
                                          <Link to={`/admin/editdnaForm/${element.formSubtype}/${element._id}`} onClick={() => {
                                          }} title="View"><i className="mdi mdi-pencil"></i></Link>
                                          <Link to={`/pdf/${element.formSubtype}/${element._id}`} onClick={() => {
                                          }} title="PDF"><i className="mdi mdi-file-pdf"></i></Link>

                                          <Link to="#testModal" onClick={() => {
                                            let detail = {
                                              testType: "",
                                              testDate: "",
                                              testReason: "",
                                              testResults: [],
                                              testResult: null,
                                              driverId: this.state.id,
                                              formId: element._id,
                                              testTypeOther: "",
                                              attachment: null
                                            }
                                            this.setState({ drugDetail: detail, tabIndex: 1 })
                                          }
                                          } data-toggle="modal" title="View"><a href="#">Add Result</a></Link>
                                        </div>

                                      )}
                                  </div>
                                </td>
                              </tr>
                            })}
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  </Tab>
                  <Tab label="Invoices">
                    <div className="tabdetail-box">
                      <div className="table-responsive">
                        <Table className="table table-hover tablestyle border-bottom tableth-topalign">
                          <thead>
                            <tr>
                              <th>Sr No. </th>
                              <th>Invoice No.</th>
                              <th>invoice Date</th>
                              <th>Amount</th>
                              <th></th>
                              {/* <th className="text-center">Generate Invoice</th> */}
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.invoices && this.state.invoices.map((element, index) => {
                              return <tr>
                                <td>{index + 1}</td>
                                <td>{element.invoiceNumber}</td>
                                <td>{Moment(element.invoiceDate).format('MM/DD/YYYY').toString()}</td>
                                <td>{element.invoiceTotal}</td>
                                <td><Link to={`/admin/view-invoice/${element._id}`} target="_blank" title="View"><i className="mdi mdi-eye"></i></Link></td>
                              </tr>
                            })}
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade" id="myModal" role="dialog" aria-labelledby="myModalLabel">
          <div className="modal-dialog formModal modal-lg" role="document">
            <div className="modal-content clearfix">
              <div className="modal-header border0 padding0">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              </div>
              <div className="modal-body border0 padding0">
                <div className="formdate-modal clearfix">
                  <h3>{this.state.currentForm.formType || ""}</h3>
                  <div>
                    <Row>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox"><label>First Name</label>
                          <input name="firstName" placeholder="First Name" type="text" value={this.state.currentForm.firstName || ""} disabled />
                        </div>
                      </Col>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox"><label>Middle Name</label>
                          <input name="firstName" placeholder="Middle Name" type="text" value={this.state.currentForm.middleName || ""} disabled />
                        </div>
                      </Col>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox"><label>Last Name</label>
                          <input name="firstName" placeholder="Last Name" type="text" value={this.state.currentForm.lastName || ""} disabled />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox"><label>Phone Number</label>
                          <input name="firstName" placeholder="Phone Number" type="text" value={this.state.currentForm.phoneNumber || ""} disabled />
                        </div>
                      </Col>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox"><label>Email</label>
                          <input name="firstName" placeholder="Email" type="text" value={this.state.currentForm.email || ""} disabled />
                        </div>
                      </Col>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox"><label>Date</label>
                          <input name="firstName" placeholder="Date" type="text" value={Moment(this.state.currentForm.dateOfRegistration).format('MM/DD/YYYY').toString() || ""} disabled />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox"><label>Driving License</label>
                          <input name="firstName" placeholder="Driving License" type="text" value={this.state.currentForm.drivingLicence || ""} disabled />
                        </div>
                      </Col>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox"><label>DL State </label>
                          <input name="firstName" type="text" value={this.state.currentForm.dlState || ""} disabled />
                        </div>
                      </Col>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox"><label>Address </label>
                          <input name="firstName" type="text" value={this.state.currentForm.address || ""} disabled />
                        </div>
                      </Col>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox"><label>City </label>
                          <input name="firstName" type="text" value={this.state.currentForm.city || ""} disabled />
                        </div>
                      </Col>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox"><label>State </label>
                          <input name="firstName" type="text" value={this.state.currentForm.state || ""} disabled />
                        </div>
                      </Col>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox"><label>Zip code</label>
                          <input name="firstName" type="text" value={this.state.currentForm.zipCode || ""} disabled />
                        </div>
                      </Col>
                    </Row>
                  </div>
                  {this.state.currentForm.formType === "ALC" &&
                    <Row>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox">
                          <label>Company Name</label>
                          <input type="text" value={this.state.currentForm.companyName || ""} disabled />
                        </div>
                      </Col>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox">
                          <label>Owner Name</label>
                          <input type="text" value={this.state.currentForm.ownerName || ""} disabled />
                        </div>
                      </Col>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox">
                          <label>Owner Phone</label>
                          <input type="text" value={this.state.currentForm.ownerPhoneNumber || ""} disabled />
                        </div>
                      </Col>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox">
                          <label>Owner Email</label>
                          <input type="text" value={this.state.currentForm.ownerEmail || ""} disabled />
                        </div>
                      </Col>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox">
                          <label>Company Address</label>
                          <input type="text" value={this.state.currentForm.companyAddress || ""} disabled />
                        </div>
                      </Col>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox">
                          <label>City</label>
                          <input type="text" value={this.state.currentForm.ownerCity || ""} disabled />
                        </div>
                      </Col>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox">
                          <label>State</label>
                          <input type="text" value={this.state.currentForm.ownerState || ""} disabled />
                        </div>
                      </Col>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox">
                          <label>Zip code</label>
                          <input type="text" value={this.state.currentForm.ownerZipcode || ""} disabled />
                        </div>
                      </Col>
                    </Row>
                  }
                  {this.state.currentForm.formType === "CPUC" &&
                    <Row>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox">
                          <label>TCP</label>
                          <input type="text" value={this.state.currentForm.tcp || this.state.currentForm.tcpStatus || ""} disabled />
                        </div>
                      </Col>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox">
                          <label>Company Name</label>
                          <input type="text" value={this.state.currentForm.companyName || ""} disabled />
                        </div>
                      </Col>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox">
                          <label>Company Type</label>
                          <input type="text" value={this.state.currentForm.companyType || ""} disabled />
                        </div>
                      </Col>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox">
                          <label>DBA</label>
                          <input type="text" value={this.state.currentForm.dba || ""} disabled />
                        </div>
                      </Col>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox">
                          <label>Owner Name</label>
                          <input type="text" value={this.state.currentForm.ownerName || ""} disabled />
                        </div>
                      </Col>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox">
                          <label>Owner Phone</label>
                          <input type="text" value={this.state.currentForm.ownerPhoneNumber || ""} disabled />
                        </div>
                      </Col>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox">
                          <label>Owner Email</label>
                          <input type="text" value={this.state.currentForm.ownerEmail || ""} disabled />
                        </div>
                      </Col>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox">
                          <label>Company Address</label>
                          <input type="text" value={this.state.currentForm.companyAddress || ""} disabled />
                        </div>
                      </Col>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox">
                          <label>City</label>
                          <input type="text" value={this.state.currentForm.ownerCity || ""} disabled />
                        </div>
                      </Col>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox">
                          <label>State</label>
                          <input type="text" value={this.state.currentForm.ownerState || ""} disabled />
                        </div>
                      </Col>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox">
                          <label>Zipcode</label>
                          <input type="text" value={this.state.currentForm.ownerZipcode || ""} disabled />
                        </div>
                      </Col>
                    </Row>
                  }
                  <div className="form-group formbox"><label>Signature</label>
                    <div className="uploadfile-image"><img src={this.state.currentForm.signature} alt="logo" /></div>
                  </div>
                  {/* <div className="bottom-btn-group pull-right">
                    <button className="bluebg">Print</button>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade" id="testModal" role="dialog" aria-labelledby="testModalLabel">
          <div className="modal-dialog formModal modal-lg" role="document">
            <div className="modal-content clearfix">
              <div className="modal-header border0 padding0">
                <button type="button" id="clsbtn" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              </div>
              <div className="modal-body border0 padding0">
                <ValidatorForm
                  ref="form"
                  onError={(e) => {
                    this.preventDefault();
                  }}
                  onSubmit={this.handleSubmit}
                >
                  <div className="formdate-modal clearfix">
                    <h3>Test Result</h3>
                    <div>
                      <Row>
                        <Col lg={4} md={4} sm={4}>
                          <div className="form-group formbox"><label>Test Type<sup className="redstarText">*</sup></label>
                            <TextValidator
                              type="select"
                              value={this.state.drugDetail.testType}
                              validators={["required"]}
                              errorMessages={["This field is required"]}
                              onChange={(e) => {
                                let drugdata = { ...this.state.drugDetail, testType: e.target.value }
                                this.setState({
                                  drugDetail: drugdata,
                                });

                              }}
                            >
                              <option>Select Test Type</option>
                              {testType.map((item) => {
                                return <option>{item}</option>;
                              })}
                            </TextValidator>
                          </div>
                        </Col>
                        {this.state.drugDetail.testType == "drug–other" && <Col lg={4} md={4} sm={4}>
                          <div className="form-group formbox"><label>Test Type Other<sup className="redstarText">*</sup></label>
                            <TextValidator
                              type="text"
                              value={this.state.drugDetail.testTypeOther}
                              validators={["required"]}
                              errorMessages={["This field is required"]}
                              onChange={(e) => {
                                let drugdata = { ...this.state.drugDetail, testTypeOther: e.target.value }
                                this.setState({
                                  drugDetail: drugdata,
                                });

                              }}
                            >

                            </TextValidator> </div>
                        </Col>}
                        <Col lg={4} md={4} sm={4}>
                          <div className="form-group formbox"><label>Test Date<sup className="redstarText">*</sup></label>
                            <DatePicker
                              placeholderText="Select a date"
                              selected={this.state.drugDetail.testDate}
                              onChange={this.handleChange}
                              // minDate={new Date()}
                              className="form-control"
                              name="TestDate"
                              dateFormat="MM/dd/yyyy"
                              peekNextMonth
                              showMonthDropdown
                              showYearDropdown
                              dropdownMode="select"
                            />
                          </div>
                        </Col>
                        <Col lg={4} md={4} sm={4}>
                          <div className="form-group formbox"><label>Test Reason<sup className="redstarText">*</sup></label>
                            {(this.state.drugDetail.selectedResultType == "CPUC" || this.state.drugDetail.selectedResultType == "DOT" || this.state.drugDetail.selectedResultType == "USCG") ?
                            <TextValidator
                              type="select"
                              value={this.state.drugDetail.testReason}
                              validators={["required"]}
                              errorMessages={["This field is required"]}
                              onChange={(e) => {
                                let drugdata = { ...this.state.drugDetail, testReason: e.target.value }
                                this.setState({
                                  drugDetail: drugdata,
                                });

                              }}
                            >
                              <option>Select Test Reasons</option>
                              {dotTestReason.map((item) => {
                                return <option>{item}</option>;
                              })}
                            </TextValidator> :
                             <TextValidator
                              type="select"
                              value={this.state.drugDetail.testReason}
                              validators={["required"]}
                              errorMessages={["This field is required"]}
                              onChange={(e) => {
                                let drugdata = { ...this.state.drugDetail, testReason: e.target.value }
                                this.setState({
                                  drugDetail: drugdata,
                                });

                              }}
                            >
                              <option>Select Test Reason</option>
                              {testReason.map((item) => {
                                return <option>{item}</option>;
                              })}
                            </TextValidator>
                             }
                          </div>
                        </Col>
                        <Col lg={4} md={4} sm={4}>
                          <div className="form-group "><label>Test Attachment</label>
                            <input
                              type="file"
                              onChange={this.getFiles.bind(this)}
                              accept="application/pdf" />
                            {/* <FileBase64
                              multiple={false}
                              onDone={this.getFiles.bind(this)}
                              a

                            /> */}
                          </div>
                        </Col>

                        {
                          // substance: "6-ACETYLMORPHINE", screen: "10", confirm: "10", result: "", unitOfMeasure: "ng/mL"
                          this.state.drugDetail.testResults && this.state.drugDetail.testResults.length > 0 ? (<Col lg={12} md={12} sm={12}>
                            <Col className="text-align-center" lg={4} md={4} sm={4}>  <label>Substance</label></Col>
                            <Col className="text-align-center" lg={1} md={1} sm={1}>  <label>Screen</label></Col>
                            <Col className="text-align-center" lg={1} md={1} sm={1}>  <label>Confirm</label></Col>
                            <Col className="text-align-center" lg={1} md={1} sm={1}>  <label>U.O.M.</label></Col>
                            <Col className="text-align-center" lg={4} md={4} sm={4}>  <label>Result</label></Col>
                            {this.state.drugDetail.testResults.map((item, idx) => {
                              return <Col lg={12} md={12} sm={12}>
                                <Col lg={4} md={4} sm={4}>{this.state.drugDetail.testResults[idx].substance}</Col>
                                <Col lg={1} md={1} sm={1}>{this.state.drugDetail.testResults[idx].screen}</Col>
                                <Col lg={1} md={1} sm={1}>{this.state.drugDetail.testResults[idx].confirm}</Col>
                                <Col lg={1} md={1} sm={1}>{this.state.drugDetail.testResults[idx].unitOfMeasure}</Col>
                                <Col lg={4} md={4} sm={4}>
                                  <Col lg={6} md={6} sm={6}>
                                    <div className="form-check">
                                      <label className="form-check-label">
                                        <input
                                          type="radio"
                                          className="form-check-input"
                                          name={"optionsRadios" + idx}
                                          value="Positive"
                                          checked={this.state.drugDetail.testResults[idx].result == "Positive"}
                                          data-id={idx}
                                          onChange={(e) => {
                                            let ap = [...this.state.drugDetail.testResults];
                                            ap[e.target.dataset.id]["result"] =
                                              e.target.value;
                                            let drugdata = { ...this.state.drugDetail, testResults: ap }
                                            this.setState({
                                              drugDetail: drugdata,
                                            });
                                          }}
                                        />{" "}
                         Positive
                          <i className="input-helper"></i>
                                      </label>
                                    </div>
                                  </Col>
                                  <Col lg={6} md={6} sm={6}>
                                    <div className="form-check">
                                      <label className="form-check-label">
                                        <input
                                          type="radio"
                                          className="form-check-input"
                                          name={"optionsRadios" + idx}
                                          value="Negative"
                                          checked={this.state.drugDetail.testResults[idx].result == "Negative"}
                                          data-id={idx}
                                          onChange={(e) => {

                                            let ap = [...this.state.drugDetail.testResults];
                                            ap[e.target.dataset.id]["result"] =
                                              e.target.value;
                                            let drugdata = { ...this.state.drugDetail, testResults: ap }
                                            this.setState({
                                              drugDetail: drugdata,
                                            });
                                          }}
                                        />{" "}
                          Negative
                          <i className="input-helper"></i>
                                      </label>
                                    </div>
                                  </Col>


                                </Col>
                              </Col>
                            })}

                          </Col>) : (<Col lg={4} md={4} sm={4}>
                            <div className="form-group formbox">
                              <Col lg={12} md={12} sm={12}>
                                <label>Test Result <sup className="redstarText">*</sup></label>
                                <TextValidator
                                  name="testResult"
                                  type="hidden"
                                  value={this.state.drugDetail.testResult}
                                  placeholder="testResult"
                                  validators={["required"]}
                                  errorMessages={["This field is required"]}
                                />
                              </Col>
                              <Col lg={6} md={6} sm={6}>
                                <div className="form-check">
                                  <label className="form-check-label">
                                    <input
                                      type="radio"
                                      className="form-check-input"
                                      name="optionsRadios5"
                                      value="Positive"

                                      checked={this.state.drugDetail.testResult == "Positive"}
                                      onChange={(e) => {
                                        let drugdata = { ...this.state.drugDetail, testResult: e.target.value }
                                        this.setState({
                                          drugDetail: drugdata,
                                        });

                                      }}
                                    />{" "}
                         Positive
                          <i className="input-helper"></i>
                                  </label>
                                </div>
                              </Col>
                              <Col lg={6} md={6} sm={6}>
                                <div className="form-check">
                                  <label className="form-check-label">
                                    <input
                                      type="radio"
                                      className="form-check-input"
                                      name="optionsRadios5"
                                      value="Negative"
                                      checked={this.state.drugDetail.testResult == "Negative"}
                                      onChange={(e) => {
                                        let drugdata = { ...this.state.drugDetail, testResult: e.target.value }
                                        this.setState({
                                          drugDetail: drugdata,
                                        });

                                      }}
                                    />{" "}
                          Negative
                          <i className="input-helper"></i>
                                  </label>
                                </div>
                              </Col>
                            </div>
                          </Col>)
                        }

                      </Row>
                    </div>

                    <div className="bottom-btn-group pull-right">
                      <button className="bluebg" disabled={this.state.disabled}>Save</button>
                    </div>

                  </div>
                </ValidatorForm>
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade" id="testresultModal" role="dialog" aria-labelledby="testresultModalLabel">
          <div className="modal-dialog formModal modal-lg" role="document">
            <div className="modal-content clearfix">
              <div className="modal-header border0 padding0">
                <button type="button" id="clsbtn" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              </div>
              <div className="modal-body border0 padding0">
                <ValidatorForm
                  ref="form"
                  onError={(e) => {
                    this.preventDefault();
                  }}
                  onSubmit={this.handleSubmit}
                >
                  <div className="formdate-modal clearfix">
                    <h3>Test Results</h3>
                    <div>
                      <Row>


                        <Col lg={12} md={12} sm={12}>
                          <Col className="text-align-center" lg={4} md={4} sm={4}>  <label>Substance</label></Col>
                          <Col className="text-align-center" lg={1} md={1} sm={1}>  <label>Screen</label></Col>
                          <Col className="text-align-center" lg={1} md={1} sm={1}>  <label>Confirm</label></Col>
                          <Col className="text-align-center" lg={1} md={1} sm={1}>  <label>U.O.M.</label></Col>
                          <Col className="text-align-center" lg={4} md={4} sm={4}>  <label>Result</label></Col>
                          {this.state.testResults.map((item, idx) => {
                            return <Col lg={12} md={12} sm={12}>
                              <Col lg={4} md={4} sm={4}>{this.state.testResults[idx].substance}</Col>
                              <Col lg={1} md={1} sm={1}>{this.state.testResults[idx].screen}</Col>
                              <Col lg={1} md={1} sm={1}>{this.state.testResults[idx].confirm}</Col>
                              <Col lg={1} md={1} sm={1}>{this.state.testResults[idx].unitOfMeasure}</Col>
                              <Col lg={4} md={4} sm={4}>
                                <Col lg={6} md={6} sm={6}>
                                  <div className="form-check">
                                    <label className="form-check-label">
                                      <input
                                        type="radio"
                                        className="form-check-input"
                                        name={"optionsRadios" + idx}
                                        value="Positive"
                                        checked={this.state.testResults[idx].result == "Positive"}
                                        data-id={idx}
                                      />{" "}
                         Positive 
                          <i className="input-helper"></i>
                                    </label>
                                  </div>
                                </Col>
                                <Col lg={6} md={6} sm={6}>
                                  <div className="form-check">
                                    <label className="form-check-label">
                                      <input
                                        type="radio"
                                        className="form-check-input"
                                        name={"optionsRadios" + idx}
                                        value="Negative"
                                        checked={this.state.testResults[idx].result == "Negative"}
                                        data-id={idx}
                                      />{" "}
                          Negative
                          <i className="input-helper"></i>
                                    </label>
                                  </div>
                                </Col>


                              </Col>
                            </Col>
                          })}

                        </Col>


                      </Row>
                    </div>


                  </div>
                </ValidatorForm>
              </div>
            </div>
          </div>
        </div>

      </React.Fragment >
    );
  }
}

export default ViewClient;
