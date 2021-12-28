import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import './index.css'
import { Container, Row, Col } from 'react-bootstrap';
import { Tabs, Tab } from "react-bootstrap-tabs";
import InnerHeader from "../../../Component/Customer/InnerHeader/index";
import Swal from "sweetalert2";
import {NotificationContainer, NotificationManager} from 'react-notifications';

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
});

class TcpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0
    };
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo} />;
    }
    return (
      <React.Fragment>
        <InnerHeader />
        <div className="form-container">
          <Container>
            <div className="header-content">
              <div className="header-left">
                <h2>New TCP Application</h2>
              </div>
              <p>
                <Link to="/customer" title="Back"><i className="mdi mdi-arrow-left"></i></Link>
              </p>
            </div>
            <Tabs
              selected={this.state.tabIndex}
              className="drug-formtab1"
              onSelect={(index, label) => {
                this.setState({
                  tabIndex: index
                });
              }} >
              <Tab label="New TCP">
                <div className="cpuc-enrollment-sections clearfix">
                  <div className="consortium-section-outer formsteps clearfix margin-bottom20 bottom-bordernone">
                    {/* <h3>New TCP Application</h3> */}
                    <div className="tcp-application-box">
                      <h4><strong>Individual/Sole Proprietorship</strong></h4>
                      <ul className="tcp-listing">
                        <li>Driver’s License</li>
                        <li>Commercial Vehicle Registration</li>
                        <li>$1000 check made payable to CPUC</li>
                        <li>The name on the check must be the name of the applicant/individua</li>
                        <li>A $5 fee per driver in a check made payable to DMV</li>
                      </ul>
                    </div>

                    <div className="tcp-application-box">
                    <h4><strong>Partnership</strong></h4>
                    <ul className="tcp-listing">
                      <li>$1000 check made payable to "CPUC"</li>
                      <li>The name on the check must be the names of the one or more of the partners</li>
                      <li>A $5 fee per driver in a check made payable to DMV</li>
                      <li>Driver’s License for all partners</li>
                      <li>Commercial Vehicle Registration</li>
                      <li>All partners must be present to sign the paperwork</li>
                    </ul>
                    </div>
                   
                   <div className="tcp-application-box">
                   <h4><strong>LLC or Corporation</strong></h4>
                    <ul className="tcp-listing">
                      <li>$1000 check made payable to "CPUC"</li>
                      <li>The name on the check must be the name of the LLC/Corporation or the name of a member of the LLC/Corporation that is listed in the Statement of Information</li>
                      <li>A $5 fee per driver in a check made payable to DMV</li>
                      <li>Driver’s License</li>
                      <li>Commercial Vehicle Registration</li>
                      <li>Articles of Organization</li>
                      <li>Statement of Information </li>
                      <li>EIN or Tax ID # for LLC/Corp</li>
                      <li><strong>If Corporation:</strong> All owners/members must be present to sign paperwork</li>
                      <li><strong>If LLC:</strong> At least one LLC member must be present to sign paperwork</li>
                    </ul>
                   </div>
                   <div className="tcp-application-box">
                    <h4><strong>DMV Pull Notice:</strong> (916) 657-6346 </h4>
                    <h4><strong>LegalZoom:</strong> (800) 773-0888</h4>
                    </div>
  

                    <div className="cpuc-enrollment-sections clearfix">
                      <div className="company-checkbox">
                        <label className="form-check-label previous-heading  margin-right10">Do you wish to proceed? </label> 
                        <div className="form-check">
                          <label className="form-check-label">
                            <input type="radio" className="form-check-input" name="hasPreviousEmployer" value="true" /> Yes <i className="input-helper"></i>
                            </label>
                        </div>
                        <div className="form-check">
                          <label className="form-check-label">
                            <input type="radio" className="form-check-input" name="hasPreviousEmployer" value="true" /> No <i className="input-helper"></i>
                          </label>
                        </div>
                      </div>
                      </div>

                    <div className="bottom-btn-group pull-right clearfix">
                      <button type="submit" className="bluebg " onClick={() => { this.setState({ tabIndex: 1 }) }}> Next </button>
                    </div>
                  </div>

                </div>
                  </Tab>

               <Tab label="More Assistance">
                <div className="cpuc-enrollment-sections clearfix">
                  <div className="consortium-section-outer formsteps bottom-bordernone">
                    <h5>Do you require assistance with any of the following items ? (Check all that apply)</h5>
                    <Row>
                      <Col md={12}>
                        <div className="form-check deficiency-checks">
                          <label className="form-check-label">
                            <input type="checkbox" className="form-check-input" name="optionsCheckbox" value="" /> Add/Delete vehicle PL 604 <i className="input-helper"></i>
                          </label>
                        </div>
                        <div className="form-check deficiency-checks">
                          <label className="form-check-label">
                            <input type="checkbox" className="form-check-input" name="optionsCheckbox2" value="" /> Change address/email/phone number/contact person <i className="input-helper"></i>
                          </label>
                        </div>
                        <div className="form-check deficiency-checks">
                          <label className="form-check-label">
                            <input type="checkbox" className="form-check-input" name="optionsCheckbox2" value="" /> Voluntary suspension PL 902 <i className="input-helper"></i>
                          </label>
                        </div>
                        <div className="form-check deficiency-checks">
                          <label className="form-check-label">
                            <input type="checkbox" className="form-check-input" name="optionsCheckbox2" value="" /> Reinstatement of suspension authorization TL 528 <i className="input-helper"></i>
                          </label>
                        </div>
                        <div className="form-check deficiency-checks">
                          <label className="form-check-label">
                            <input type="checkbox" className="form-check-input" name="optionsCheckbox2" value="" /> Revocation of operation TL 831 <i className="input-helper"></i>
                          </label>
                        </div>
                        <div className="form-check deficiency-checks">
                          <label className="form-check-label">
                            <input type="checkbox" className="form-check-input" name="optionsCheckbox2" value="" /> Reinstatement of revoked authorization PL 702 <i className="input-helper"></i>
                          </label>
                        </div>
                        <div className="form-check deficiency-checks">
                          <label className="form-check-label">
                            <input type="checkbox" className="form-check-input" name="optionsCheckbox2" value="" /> PUCTRA <i className="input-helper"></i>
                          </label>
                        </div>
                        <div className="form-check deficiency-checks">
                          <label className="form-check-label">
                            <input type="checkbox" className="form-check-input" name="optionsCheckbox2" value="" /> Other DOT form <i className="input-helper"></i>
                          </label>
                        </div>
                        <div className="form-check deficiency-checks">
                          <label className="form-check-label">
                            <input type="checkbox" className="form-check-input" name="optionsCheckbox2" value="" /> Supervisor training <i className="input-helper"></i>
                          </label>
                        </div>
                        <div className="form-check deficiency-checks">
                          <label className="form-check-label">
                            <input type="checkbox" className="form-check-input" name="optionsCheckbox2" value="" /> DMV employee pull notice <i className="input-helper"></i>
                          </label>
                        </div>
                        <div className="bottom-btn-group pull-right ">
                          <button onClick={() =>{
                            NotificationManager.success("Form Submitted Successfully!","Success",2000);
                            setTimeout(() => {
                              this.setState({ redirectTo: "/customer" });
                            }, 2000);
                          }} className="bluebg margin-right10">Save</button>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Tab>
            </Tabs>
          </Container>
          <NotificationContainer/>
        </div>

      </React.Fragment>
    );
  }
}

export default TcpForm;