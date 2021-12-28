import React from 'react';
import './index.css'
import { Container, Row, Col } from 'react-bootstrap';

class MoreAssistance extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div>
          <Container>
            <Row>
              <Col md={12}>
                <div className="cpuc-enrollment-form">
                  <div className="cpuc-enrollment-sections">
                    <div className="consortium-section-outer margin-bottom20 bottom-bordernone">
                      <div className="newtcp-form">
                        <p>Do you require assistance with any of the following items ? (Check all that apply)</p>
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
                              <button className="bluebg margin-right10">Save</button>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </div>
                </div>
              </Col> 
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default MoreAssistance;

