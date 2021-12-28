import React from "react";
import "./index.css";
import { Link, withRouter } from "react-router-dom";
import { Tabs, Tab } from "react-bootstrap-tabs";
import { Row, Col, Container, } from "react-bootstrap";
import axios from "axios";
import apiPath from "../../../Environment/ApiPath";
import Moment from "moment";
import Alleged from './alleged'
import BloodCellTransfusion from './bloodCellTransfusion'
const sampleTypes = {
  "BS": "Buccal Swab",
  "OS": "Other"
}
const sexTypes = {
  "MA": "Male",
  "FE": "Female"
}

class DNAForm extends React.Component {
  constructor(props) {
    super(props);
    let { formSubtype, id } = this.props.match.params;
    console.log(formSubtype, id);
    this.state = {
      id: id,
      formSubtype: formSubtype,
    };
  }

  componentDidMount() {
    debugger
    const url = `${apiPath.dna_form_detail}/${this.state.id}/${this.state.formSubtype}`;
    axios.get(url, {}).then((response) => {
      let formData = response.data.data;
      if (!formData) {
        // return this.props.history.goBack();
      }
      this.setState({
        formData: formData,
      });
      console.log("API Response", response);
      console.log("formData", formData);
    });
  }

  render() {
    const { formSubtype, formData } = this.state;
    const mainTabsList = ["Paternity", "Immigration", "Passport", "Infidelity", "Maternity", "Grandparentage", "Avuncular", "Siblingship",];
    let mainTabKey = mainTabsList.indexOf(formSubtype);

    return (
      <React.Fragment>
        <div className="content-wrapper">
          <div className="main-content">
            <div className="page-header">
              <Link className="hearder-lefticon" to="/admin"><i className="mdi mdi-chevron-left"></i></Link>
              <h2 className="page-title">DNA Form</h2>
            </div>
            <div className="card innercard-bg margin-bottom30 clearfix padding0 dnaAdmin">
              {formData && (
                <div>
                  <div className="container-fluid">
                    <h4>Client Details</h4>
                    <Row>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox">
                          <label className="control-label">
                            Name
                        </label>
                          <input
                            name="firstName"
                            type="text"
                            value={formData.name && !formData.firstName ? formData.name : formData.firstName + " " + formData.middleName + " " + formData.lastName}
                            disabled="disabled"
                            placeholder="First Name"
                          />
                        </div>
                      </Col>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox">
                          <label className="control-label">Email</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder=""
                            disabled="disabled"
                            value={formData.email}
                          />
                        </div>
                      </Col>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox">
                          <label className="control-label">
                            Phone Number
                        </label>
                          <input
                            type="text"
                            value={(formData.phone) ? formData.phone : formData.phoneNumber}
                            placeholder=""
                            disabled="disabled"
                          />
                        </div>
                      </Col>
                      <Col lg={4} md={4} sm={4}>
                        <div className="form-group formbox">
                          <label className="control-label">
                            Driving License
                        </label>
                          <input
                            type="text"
                            value={formData.drivingLicence}
                            placeholder=""
                            disabled="disabled"
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <Tabs event selected={mainTabKey} className="admin-tabs-group">
                    {formSubtype && formSubtype === "Paternity" ? (
                      <Tab eventKey="Paternity" label="Paternity">
                        <div className="admin-dnaform-outer">
                          <div className="admin-dnaform-header">
                            <h3>Paternity Test</h3>
                          </div>
                          <div className="admin-dnacontent">
                            <div className="admin-dna-radiogr">
                              <Row>
                                <Col lg={2} md={3} sm={3}>
                                  <div className="admin-pleasecheck">
                                    <h4>Relationship:</h4>
                                  </div>
                                </Col>
                                <Col lg={3} md={3} sm={3}>
                                  <div className="form-check">
                                    {formData.relationship}
                                  </div>
                                </Col>
                              </Row>
                            </div>
                            <div className="table-responsive">
                              <table className="table table-hover tablestyle border-bottom tableth-topalign">
                                <thead>
                                  <tr>
                                    <th>Sr. No.</th>
                                    <th>Relationship</th>
                                    <th>Name</th>
                                    <th>DOB</th>
                                    <th>Sample Type</th>
                                    <th>Sex</th>
                                    <th>Race/Ethnicity</th>
                                    <th>Phone No. </th>
                                    <th>Email</th>
                                    <th>DL Number</th>
                                    <th>DL State</th>
                                    <th>Password</th>
                                    {/* <th>Action</th> */}
                                  </tr>
                                </thead>
                                {<Alleged formData={formData} />}
                                {/* // <tr>
                                  //   <td>{counter++}</td>
                                  //   <td>Alleged Father</td>
                                  //   <td className="userName-column">
                                  //     <span>{formData.allegedFather.name}</span>
                                  //   </td>
                                  //   <td>{Moment(formData.allegedFather.dob).format('MM/DD/YYYY').toString()} </td>
                                  //   <td>{(formData.allegedFather.sampleType !== "OT")?sampleTypes[formData.allegedFather.sampleType]:formData.allegedFather.sampleTypeOther} </td>
                                  //   <td>{sexTypes[formData.allegedFather.gender]}</td>
                                  //   <td>{(formData.allegedFather.race !== "Other")?formData.allegedFather.race:formData.allegedFather.raceOther}</td>
                                  //   <td>{formData.allegedFather.phone}</td>
                                  //   <td>{formData.allegedFather.email}</td>
                                  //   <td>{formData.allegedFather.drivingLicence}</td>
                                  //   <td>{(formData.allegedFather.drivingLicence)?formData.allegedFather.dlState:""}</td>
                                  //   <td>{formData.allegedFather.password}</td>
                                  
                                  // </tr> */}

                                {/* {(formData.allegedMother && formData.allegedMother.email) &&
                                  <tr>
                                    <td>{counter++}</td>
                                    <td>Mother</td>
                                    <td className="userName-column">
                                      <span>{formData.allegedMother.name}</span>
                                    </td>
                                    <td>{Moment(formData.allegedMother.dob).format('MM/DD/YYYY').toString()} </td>
                                    <td>{(formData.allegedMother.sampleType !== "OT")?sampleTypes[formData.allegedMother.sampleType]:formData.allegedMother.sampleTypeOther} </td>
                                    <td>{sexTypes[formData.allegedMother.gender]}</td>
                                    <td>{(formData.allegedMother.race !== "Other")?formData.allegedMother.race:formData.allegedMother.raceOther}</td>
                                    <td>{formData.allegedMother.phone}</td>
                                    <td>{formData.allegedMother.email}</td>
                                    <td>{formData.allegedMother.drivingLicence}</td>
                                    <td>{(formData.allegedMother.drivingLicence)?formData.allegedMother.dlState:""}</td>
                                    <td>{formData.allegedMother.password}</td>
                                
                                  </tr>
                                  }
                                  {formData.child && formData.child.name &&
                                  <tr>
                                    <td>{counter++}</td>
                                    <td>Child</td>
                                    <td className="userName-column">
                                      <span>{formData.child.name}</span>
                                    </td>
                                    <td>{Moment(formData.child.dob).format('MM/DD/YYYY').toString()} </td>
                                    <td>{(formData.child.sampleType !== "OT")?sampleTypes[formData.child.sampleType]:formData.child.sampleTypeOther} </td>
                                    <td>{sexTypes[formData.child.gender]}</td>
                                    <td>{(formData.child.race !== "Other")?formData.child.race:formData.child.raceOther}</td>
                                    <td>{formData.child.phone}</td>
                                    <td>{formData.child.email}</td>
                                    <td>{formData.child.drivingLicence}</td>
                                    <td>{(formData.child.drivingLicence)?formData.child.dlState:""}</td>
                                    <td>{formData.child.password}</td>
                                   
                                  </tr>
                                  } */}
                                {/* {formData.additionalPersons && formData.additionalPersons.map((item)=> {
                                    if(item.name){
                                    return (<tr key={item.relation}>
                                    <td>{counter++}</td>
                                    <td>{item.relation}</td>
                                    <td className="userName-column">
                                      <span>{item.name}</span>
                                    </td>
                                    <td>{Moment(item.dob).format('MM/DD/YYYY').toString()} </td>
                                    <td>{(item.sampleType !== "OT")?sampleTypes[item.sampleType]:item.sampleTypeOther} </td>
                                    <td>{sexTypes[item.gender]}</td>
                                    <td>{(item.race !== "Other")?item.race:item.raceOther}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.email}</td>
                                    <td>{item.drivingLicence}</td>
                                    <td>{(item.drivingLicence)?item.dlState:""}</td>
                                    <td>{item.password}</td>
                                  </tr>)
                                    }
                                  })
                                  } */}

                                {/* </tbody> */}
                              </table>
                            </div>
                            {formData.bloodCellTransfusion && <BloodCellTransfusion bloodCellTransfusion={formData.bloodCellTransfusion} />}

                          </div>
                        </div>
                      </Tab>
                    ) : (
                        <Tab className="disabledTab" label="" disabled={true}></Tab>
                      )}
                    {formSubtype && formSubtype === "Immigration" ? (
                      <Tab eventKey="Immigration" label="Immigration">
                        <div className="admin-dnaform-outer">
                          <div className="admin-dnaform-header">
                            <h3>Petitioner Info</h3>
                          </div>
                          <div className="admin-dnacontent">
                            <div className="table-responsive">
                              <table className="table table-hover tablestyle border-bottom tableth-topalign">
                                <thead>
                                  <tr>
                                    <th>Sr. No.</th>
                                    <th>Name</th>
                                    <th>DOB</th>
                                    <th>Current Location</th>
                                    <th>Race/Ethnicity</th>
                                    <th>Gender</th>
                                    <th>Phone No. </th>
                                    <th>Email</th>
                                    <th>DL Number</th>
                                    <th>DL State</th>
                                    <th>Passport</th>
                                    <th>Is Petitioner Being Tested? </th>
                                    {/* <th>Relationship to Beneficiary/Ies </th> */}
                                    {/* <th>Action</th> */}
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>1</td>
                                    <td className="user-email-column">
                                      <span>
                                        <Link to="#">{formData.firstName} {formData.middleName} {formData.lastName} </Link>{" "}
                                      </span>
                                    </td>
                                    <td>{Moment(formData.dob).format('MM/DD/YYYY').toString()}</td>
                                    <td>{formData.currentLocation}</td>
                                    <td>{(formData.race !== "Other") ? formData.race : formData.raceOther}</td>
                                    <td>{sexTypes[formData.gender]}</td>
                                    <td className="multiple-phonenum">
                                      <span>{formData.phoneNumber}</span>{" "}
                                      <span>{formData.phoneNumber2}</span>{" "}
                                      <span>{formData.phoneNumber3}</span>
                                    </td>
                                    <td>
                                      <Link to="#">{formData.email}</Link>
                                    </td>
                                    <td>{formData.drivingLicence}</td>
                                    <td>{(formData.drivingLicence) ? formData.dlState : ""}</td>
                                    <td>{formData.passport}</td>
                                    <td>{(formData.isTested) ? "Yes" : "No"}</td>
                                    {/* <td>Father</td> */}
                                    {/* <td>
                                      <div className="action-group">
                                        <Link to="#" title="Edit">
                                          <i className="mdi mdi-pencil"></i>
                                        </Link>
                                      </div>
                                    </td> */}
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                        <div className="admin-dnaform-outer">
                          <div className="admin-dnaform-header">
                            <h3>Beneficiary Info</h3>
                          </div>
                          <div className="admin-dnacontent">
                            <div className="table-responsive">
                              <table className="table table-hover tablestyle border-bottom tableth-topalign">
                                <thead>
                                  <tr>
                                    <th>Sr. No.</th>
                                    <th>Name</th>
                                    <th>DOB</th>
                                    <th>Current Location</th>
                                    <th>Race/Ethnicity</th>
                                    <th>Gender</th>
                                    <th>Phone No. </th>
                                    <th>Email</th>
                                    {/* <th>DL Number</th>
                                    <th>DL State</th> */}
                                    {/* <th>Passport Country </th>
                                    <th>Is Petitioner Being Tested? </th> */}
                                    <th>Relationship to Beneficiary/Ies </th>
                                    <th>Case</th>
                                    {/* <th>Action</th> */}
                                  </tr>
                                </thead>
                                <tbody>
                                  {formData.beneficiaries && formData.beneficiaries.map((item) => {
                                    return (
                                      <tr>
                                        <td>{formData.beneficiaries.indexOf(item) + 1}</td>
                                        <td className="user-email-column">
                                          <span>
                                            <Link to="#">{item.firstName} {item.middleName} {item.lastName} </Link>{" "}
                                          </span>
                                        </td>
                                        <td>{Moment(item.dob).format('MM/DD/YYYY').toString()}</td>
                                        <td>{item.currentLocation}</td>
                                        <td>{(item.race !== "Other") ? item.race : item.raceOther}</td>
                                        <td>{sexTypes[item.gender]}</td>
                                        <td className="multiple-phonenum">
                                          <span>{item.phoneNumber}</span>{" "}
                                          <span>{item.phoneNumber2}</span>{" "}
                                          <span>{item.phoneNumber3}</span>
                                        </td>
                                        <td>
                                          <Link to="#">{item.email}</Link>
                                        </td>
                                        <td>{item.relationship}</td>
                                        <td>{item.case}</td>
                                      </tr>
                                    )
                                  })}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </Tab>
                    ) : (
                        <Tab className="disabledTab" label="" disabled={true}></Tab>
                      )}
                    {formSubtype && formSubtype === "Passport" ? (
                      <Tab eventKey="Passport" label="Passport">
                        <div className="admin-dnaform-outer">
                          <div className="admin-dnaform-header">
                            <h3>Passport DNA</h3>
                          </div>
                          <div className="admin-dnacontent">
                            <div className="admin-dna-radiogr">
                              <Row className="margin-bottom10">
                                <Col lg={2} md={3} sm={3}>
                                  <div className="admin-pleasecheck">
                                    <h4>Test Type:</h4>
                                  </div>
                                </Col>
                                <Col lg={8} md={9} sm={9}>
                                  {formData.testType}
                                </Col>
                              </Row>
                            </div>
                            <div className="table-responsive">
                              <table className="table table-hover tablestyle border-bottom tableth-topalign">
                                <thead>
                                  <tr>
                                    <th>Sr. No.</th>
                                    <th>Relationship</th>
                                    <th>Name</th>
                                    <th>DOB</th>
                                    <th>Sample Type</th>
                                    <th>Sex</th>
                                    <th>Race/Ethnicity</th>
                                    <th>Phone No. </th>
                                    <th>Email</th>
                                    {/* <th>DL Number</th>
                                    <th>DL State</th> */}
                                    <th>Password</th>
                                    {/* <th>Action</th> */}
                                  </tr>
                                </thead>
                                {<Alleged formData={formData} />}
                              </table>
                            </div>
                            {formData.bloodCellTransfusion && <BloodCellTransfusion bloodCellTransfusion={formData.bloodCellTransfusion} />}

                          </div>
                        </div>
                      </Tab>
                    ) : (
                        <Tab className="disabledTab" label="" disabled={true}></Tab>
                      )}
                    {formSubtype && formSubtype === "Infidelity" ? (
                      <Tab eventKey="Infidelity" label="Infidelity">
                        <div className="admin-dnaform-outer">
                          <div className="admin-dnaform-header">
                            <h3>Infidelity Test</h3>
                          </div>
                          <div className="admin-dnacontent">
                            <div className="table-responsive">
                              <table className="table table-hover tablestyle border-bottom tableth-topalign">
                                <thead>
                                  <tr>
                                    <th>Sr. No.</th>
                                    {/* <th>Relationship</th> */}
                                    <th>Name</th>
                                    <th>DOB</th>
                                    <th>Sample Type</th>
                                    <th>Sex</th>
                                    <th>Race/Ethnicity</th>
                                    <th>Phone No. </th>
                                    <th>Email</th>
                                    <th>DL Number</th>
                                    <th>DL State</th>
                                    <th>Password</th>
                                    <th>Item To Be Tested</th>
                                    <th>Additional Items</th>
                                    {/* <th>Action</th> */}
                                  </tr>
                                </thead>
                                {<Alleged formData={formData} />}
                              </table>
                            </div>
                            {formData.bloodCellTransfusion && <BloodCellTransfusion bloodCellTransfusion={formData.bloodCellTransfusion} />}
                            <br />
                            <br />
                            <Row>
                              <Col lg={2} md={3} sm={3}>
                                <label>Semen detection: {formData.semenDetection == "true" ? "Yes" : "No"}</label>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg={2} md={3} sm={3}>
                                <label>Y-STR: {formData.ystr == "true" ? "Yes" : "No"}</label>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg={2} md={3} sm={3}>
                                <label>Salvia detection: {formData.salivaDetection == "true" ? "Yes" : "No"}</label>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg={2} md={3} sm={3}>
                                <label>Other Test: {formData.otherTest ? formData.otherTest : ""}</label>
                              </Col>
                            </Row>
                          </div>
                        </div>
                      </Tab>
                    ) : (
                        <Tab className="disabledTab" label="" disabled={true}></Tab>
                      )}
                    {formSubtype && formSubtype === "Maternity" ? (
                      <Tab eventKey="Maternity" label="Maternity">
                        <div className="admin-dnaform-outer">
                          <div className="admin-dnaform-header">
                            <h3>Maternity Test</h3>
                          </div>
                          <div className="admin-dnacontent">
                            <div className="admin-dna-radiogr">
                              <Row>
                                <Col lg={2} md={3} sm={3}>
                                  <div className="admin-pleasecheck">
                                    <h4>Relationship:</h4>
                                  </div>
                                </Col>
                                <Col lg={3} md={3} sm={3}>
                                  <div className="form-check">
                                    <label className="form-check-label">
                                      {formData.relationship}
                                    </label>
                                  </div>
                                </Col>
                              </Row>
                            </div>

                            <div className="table-responsive">
                              <table className="table table-hover tablestyle border-bottom tableth-topalign">
                                <thead>
                                  <tr>
                                    <th>Sr. No.</th>
                                    <th>Relationship</th>
                                    <th>Name</th>
                                    <th>DOB</th>
                                    <th>Sample Type</th>
                                    <th>Sex</th>
                                    <th>Race/Ethnicity</th>
                                    <th>Phone No. </th>
                                    <th>Email</th>
                                    <th>DL Number</th>
                                    <th>DL State</th>
                                    <th>Password</th>
                                    {/* <th>Action</th> */}
                                  </tr>
                                </thead>
                                {<Alleged formData={formData} />} </table>
                            </div>
                            {formData.bloodCellTransfusion && <BloodCellTransfusion bloodCellTransfusion={formData.bloodCellTransfusion} />}

                          </div>
                        </div>
                      </Tab>
                    ) : (
                        <Tab className="disabledTab" label="" disabled={true}></Tab>
                      )}
                    {formSubtype && formSubtype === "Grandparentage" ? (
                      <Tab
                        eventKey="Grandparentage"
                        label="Grandparentage"
                      >
                        <div className="admin-dnaform-outer">
                          <div className="admin-dnaform-header">
                            <h3>Grandparentage Test</h3>
                          </div>
                          <div className="admin-dnacontent">
                            <div className="admin-dna-radiogr">
                              <Row>
                                <Col lg={2} md={3} sm={3}>
                                  <div className="admin-pleasecheck">
                                    <h4>Relationship</h4>
                                  </div>
                                </Col>
                                <Col lg={3} md={3} sm={3}>
                                  <div className="form-check">
                                    <label className="form-check-label">
                                      {formData.relationship}
                                    </label>
                                  </div>
                                </Col>
                              </Row>
                            </div>

                            <div className="table-responsive">
                              <table className="table table-hover tablestyle border-bottom tableth-topalign">
                                <thead>
                                  <tr>
                                    <th>Sr. No.</th>
                                    <th>Relationship</th>
                                    <th>Name</th>
                                    <th>DOB</th>
                                    <th>Sample Type</th>
                                    <th>Sex</th>
                                    <th>Race/Ethnicity</th>
                                    <th>Phone No. </th>
                                    <th>Email</th>
                                    <th>DL Number</th>
                                    <th>DL State</th>
                                    <th>Password</th>
                                    {/* <th>Action</th> */}
                                  </tr>
                                </thead>
                                {<Alleged formData={formData} />}
                              </table>
                            </div>
                            {formData.bloodCellTransfusion && <BloodCellTransfusion bloodCellTransfusion={formData.bloodCellTransfusion} />}
                          </div>
                        </div>
                      </Tab>
                    ) : (
                        <Tab className="disabledTab" label="" disabled={true}></Tab>
                      )}
                    {formSubtype && formSubtype === "Avuncular" ? (
                      <Tab
                        eventKey="Avuncular"
                        label="Avuncular(Aunt/Uncle)"
                      >
                        <div className="admin-dnaform-outer">
                          <div className="admin-dnaform-header">
                            <h3>Avuncular(Aunt/Uncle) Test</h3>
                          </div>
                          <div className="admin-dnacontent">
                            <div className="admin-dna-radiogr">
                              <Row>
                                <Col lg={2} md={3} sm={3}>
                                  <div className="admin-pleasecheck">
                                    <h4>Relationship</h4>
                                  </div>
                                </Col>
                                <Col lg={3} md={3} sm={3}>
                                  <div className="form-check">
                                    <label className="form-check-label">
                                      {formData.relationship}
                                    </label>
                                  </div>
                                </Col>
                              </Row>
                            </div>

                            <div className="table-responsive">
                              <table className="table table-hover tablestyle border-bottom tableth-topalign">
                                <thead>
                                  <tr>
                                    <th>Sr. No.</th>
                                    <th>Relationship</th>
                                    <th>Name</th>
                                    <th>DOB</th>
                                    <th>Sample Type</th>
                                    <th>Sex</th>
                                    <th>Race/Ethnicity</th>
                                    <th>Phone No. </th>
                                    <th>Email</th>
                                    <th>DL Number</th>
                                    <th>DL State</th>
                                    <th>Password</th>
                                    {/* <th>Action</th> */}
                                  </tr>
                                </thead>
                                {<Alleged formData={formData} />}
                              </table>
                            </div>
                            {formData.bloodCellTransfusion && <BloodCellTransfusion bloodCellTransfusion={formData.bloodCellTransfusion} />}

                          </div>
                        </div>
                      </Tab>
                    ) : (
                        <Tab className="disabledTab" label="" disabled={true}></Tab>
                      )}
                    {formSubtype && formSubtype === "Siblingship" ? (
                      <Tab eventKey="Siblingship" label="Siblingship">
                        <div className="admin-dnaform-outer">
                          <div className="admin-dnaform-header">
                            <h3>Siblingship Test</h3>
                          </div>
                          <div className="admin-dnacontent">
                            <div className="admin-dna-radiogr">
                              <Row className="margin-bottom10">
                                <Col lg={2} md={3} sm={3}>
                                  <div className="admin-pleasecheck">
                                    <h4>Relationship</h4>
                                  </div>
                                </Col>
                                <Col lg={3} md={3} sm={3}>
                                  <div className="form-check">
                                    <label className="form-check-label">
                                      {formData.relationship}
                                    </label>
                                  </div>
                                </Col>
                              </Row>
                              <Row className="margin-bottom10">
                                <Col lg={2} md={3} sm={3}>
                                  <div className="admin-pleasecheck">
                                    <h4>Siblingship:</h4>
                                  </div>
                                </Col>
                                <Col lg={9} md={9} sm={9}>
                                  <Row>
                                    <Col lg={4} md={4} sm={4}>
                                      {formData.siblingship}
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                            </div>

                            <div className="table-responsive">
                              <table className="table table-hover tablestyle border-bottom tableth-topalign">
                                <thead>
                                  <tr>
                                    <th>Sr. No.</th>
                                    <th>Relationship</th>
                                    <th>Name</th>
                                    <th>DOB</th>
                                    <th>Sample Type</th>
                                    <th>Sex</th>
                                    <th>Race/Ethnicity</th>
                                    <th>Phone No. </th>
                                    <th>Email</th>
                                    <th>DL Number</th>
                                    <th>DL State</th>
                                    <th>Password</th>
                                    {/* <th>Action</th> */}
                                  </tr>
                                </thead>
                                {<Alleged formData={formData} />}
                              </table>
                            </div>
                            {formData.bloodCellTransfusion && <BloodCellTransfusion bloodCellTransfusion={formData.bloodCellTransfusion} />}

                          </div>
                        </div>
                      </Tab>
                    ) : (
                        <Tab className="disabledTab" label="" disabled={true}></Tab>
                      )}
                  </Tabs>
                </div>
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(DNAForm);
