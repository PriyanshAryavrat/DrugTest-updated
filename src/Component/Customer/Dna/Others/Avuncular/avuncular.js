import React from 'react';

const Avuncular = () => {
  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="cpuc-enrollment-form">
              <div className="cpuc-enrollment-sections">
                <div className="row">
                  <div className="col-md-12">
                    <div className="thisdrivertext ">
                      <h3 className="text-center">Are all parties here for the test today ?</h3>
                      <div className="row">
                        <div className="col-sm-4 col-xs-3" />
                        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-3">
                          <div className="form-check checknoyesbox margin-left20">
                            <label className="form-check-label">
                              <input type="radio" className="form-check-input" name="optionsRadio" defaultValue /> No <i className="input-helper" />
                            </label>
                          </div>
                        </div>
                        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-3">
                          <div className="form-check checknoyesbox margin-left20">
                            <label className="form-check-label">
                              <input type="radio" className="form-check-input" name="optionsRadio" defaultValue /> Yes <i className="input-helper" />
                            </label>
                          </div>
                        </div>
                        <div className="col-sm-4 col-xs-3" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="cpuc-enrollment-form">
              <div className="cpuc-enrollment-header drugtopheader ">
                <h2 className="margin-bottom0">Avuncular(Aunt/Uncle) Test</h2>
              </div>
              <div className="dnaconsent-formtable clearfix">
                <h5>Do not use this form for Immigration Casework</h5>
                <div className="table-responsive margin-bottom20">
                  <table border={2} width="100%" className="consent-outertable">
                    <tbody><tr>
                      <th className="consent-table-header" colSpan={8}>Please Check One:</th>
                    </tr>
                      <tr className="legal-fillout">
                        <td className="tablecheck-one" colSpan={8}>
                          <div className="form-check">
                            <label className="form-check-label">
                              <input type="radio" className="form-check-input" name="optionsRadios3" defaultValue />Legal/Court
                              admissible
                              <i className="input-helper" />
                            </label>
                          </div>
                          <div className="form-check">
                            <label className="form-check-label">
                              <input type="radio" className="form-check-input" name="optionsRadios3" defaultValue /> Personal/Peace of
                              mind
                              <i className="input-helper" />
                            </label>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={8} className="consent-table-header">Form may be used as a Legal Document - Please fill out
                          completely</td>
                      </tr>
                      <tr className="legal-fillout">
                        <th>Sr No.</th>
                        <th>Relationship <span>(Select One)</span></th>
                        <th>Full Legal Name &amp; <span>Consent Signature</span></th>
                        <th>Date of Birth/ <span>Sample Type</span> </th>
                        <th>Sex</th>
                        <th>Race/Ethnicity <span>(Select One)</span></th>
                      </tr>
                      <tr className="legal-fillout">
                        <td rowSpan={2}>1</td>
                        <td rowSpan={2}>
                          <div className="form-check">
                            <label className="form-check-label">
                              <input type="radio" className="form-check-input" name="optionsRadios1" defaultValue /> Aunt
                              <i className="input-helper" />
                            </label>
                          </div>
                          <div className="form-check">
                            <label className="form-check-label">
                              <input type="radio" className="form-check-input" name="optionsRadios1" defaultValue /> Uncle
                              <i className="input-helper" />
                            </label>
                          </div>
                        </td>
                        <td rowSpan={2}>
                          <p>Legal Name of Tested Party </p>
                        </td>
                        <td>
                          <p>MM/DD/YYYY</p>
                        </td>
                        <td rowSpan={2}>
                          <div className="form-check">
                            <label className="form-check-label">
                              <input type="radio" className="form-check-input" name="optionsRadios3" defaultValue /> M
                              <i className="input-helper" />
                            </label>
                          </div>
                          <div className="form-check">
                            <label className="form-check-label">
                              <input type="radio" className="form-check-input" name="optionsRadios3" defaultValue /> F
                              <i className="input-helper" />
                            </label>
                          </div>
                        </td>
                        <td rowSpan={2}>
                          <div className="form-check">
                            <label className="form-check-label">
                              <input type="radio" className="form-check-input" name="optionsRadios4" defaultValue /> Asian
                              <i className="input-helper" />
                            </label>
                          </div>
                          <div className="form-check">
                            <label className="form-check-label">
                              <input type="radio" className="form-check-input" name="optionsRadios4" defaultValue /> Black
                              <i className="input-helper" />
                            </label>
                          </div>
                          <div className="form-check">
                            <label className="form-check-label">
                              <input type="radio" className="form-check-input" name="optionsRadios4" defaultValue /> Caucasian
                              <i className="input-helper" />
                            </label>
                          </div>
                          <div className="form-check">
                            <label className="form-check-label">
                              <input type="radio" className="form-check-input" name="optionsRadios4" defaultValue /> Hispanic
                              <i className="input-helper" />
                            </label>
                          </div>
                          <div className="form-check">
                            <label className="form-check-label">
                              <input type="radio" className="form-check-input" name="optionsRadios4" defaultValue /> Other
                              <i className="input-helper" />
                            </label>
                          </div>
                        </td>
                      </tr>
                      <tr className="legal-fillout">
                        <td>
                          <div className="form-check">
                            <label className="form-check-label">
                              <input type="radio" className="form-check-input" name="optionsRadios2" defaultValue /> Buccal Swab
                              <i className="input-helper" />
                            </label>
                          </div>
                          <div className="form-check">
                            <label className="form-check-label otherlabel">
                              <input type="radio" className="form-check-input" name="optionsRadios2" defaultValue /> Other
                              <i className="input-helper" />
                            </label>
                            <input className="otherinput" type="text" />
                          </div>
                        </td>
                      </tr>
                      <tr className="legal-fillout">
                        <td rowSpan={2}>2</td>
                        <td rowSpan={2}>
                          <div className="form-check">
                            <label className="form-check-label">
                              <input type="radio" className="form-check-input" name="optionsRadios1" defaultValue /> Child
                              <i className="input-helper" />
                            </label>
                          </div>
                        </td>
                        <td rowSpan={2}>
                          <p>Legal Name of Tested Party </p>
                        </td>
                        <td>
                          <p>MM/DD/YYYY</p>
                        </td>
                        <td rowSpan={2}>
                          <div className="form-check">
                            <label className="form-check-label">
                              <input type="radio" className="form-check-input" name="optionsRadios3" defaultValue /> M
                              <i className="input-helper" />
                            </label>
                          </div>
                          <div className="form-check">
                            <label className="form-check-label">
                              <input type="radio" className="form-check-input" name="optionsRadios3" defaultValue /> F
                              <i className="input-helper" />
                            </label>
                          </div>
                        </td>
                        <td rowSpan={2}>
                          <div className="form-check">
                            <label className="form-check-label">
                              <input type="radio" className="form-check-input" name="optionsRadios4" defaultValue /> Asian
                              <i className="input-helper" />
                            </label>
                          </div>
                          <div className="form-check">
                            <label className="form-check-label">
                              <input type="radio" className="form-check-input" name="optionsRadios4" defaultValue /> Black
                              <i className="input-helper" />
                            </label>
                          </div>
                          <div className="form-check">
                            <label className="form-check-label">
                              <input type="radio" className="form-check-input" name="optionsRadios4" defaultValue /> Caucasian
                              <i className="input-helper" />
                            </label>
                          </div>
                          <div className="form-check">
                            <label className="form-check-label">
                              <input type="radio" className="form-check-input" name="optionsRadios4" defaultValue /> Hispanic
                              <i className="input-helper" />
                            </label>
                          </div>
                          <div className="form-check">
                            <label className="form-check-label">
                              <input type="radio" className="form-check-input" name="optionsRadios4" defaultValue /> Other
                              <i className="input-helper" />
                            </label>
                          </div>
                        </td>
                      </tr>
                      <tr className="legal-fillout">
                        <td>
                          <div className="form-check">
                            <label className="form-check-label">
                              <input type="radio" className="form-check-input" name="optionsRadios2" defaultValue /> Buccal Swab
                              <i className="input-helper" />
                            </label>
                          </div>
                          <div className="form-check">
                            <label className="form-check-label otherlabel">
                              <input type="radio" className="form-check-input" name="optionsRadios2" defaultValue /> Other
                              <i className="input-helper" />
                            </label>
                            <input className="otherinput" type="text" />
                          </div>
                        </td>
                      </tr>
                      <tr className="legal-fillout">
                        <td rowSpan={2}>3</td>
                        <td rowSpan={2}>
                          <div className="form-check">
                            <label className="form-check-label">
                              <input type="radio" className="form-check-input" name="optionsRadios1" defaultValue /> Mother
                              <i className="input-helper" />
                            </label>
                          </div>
                        </td>
                        <td rowSpan={2}>
                          <p>Legal Name of Tested Party </p>
                        </td>
                        <td>
                          <p>MM/DD/YYYY</p>
                        </td>
                        <td rowSpan={2}>
                          <div className="form-check">
                            <label className="form-check-label">
                              <input type="radio" className="form-check-input" name="optionsRadios3" defaultValue /> M
                              <i className="input-helper" />
                            </label>
                          </div>
                          <div className="form-check">
                            <label className="form-check-label">
                              <input type="radio" className="form-check-input" name="optionsRadios3" defaultValue /> F
                              <i className="input-helper" />
                            </label>
                          </div>
                        </td>
                        <td rowSpan={2}>
                          <div className="form-check">
                            <label className="form-check-label">
                              <input type="radio" className="form-check-input" name="optionsRadios4" defaultValue /> Asian
                              <i className="input-helper" />
                            </label>
                          </div>
                          <div className="form-check">
                            <label className="form-check-label">
                              <input type="radio" className="form-check-input" name="optionsRadios4" defaultValue /> Black
                              <i className="input-helper" />
                            </label>
                          </div>
                          <div className="form-check">
                            <label className="form-check-label">
                              <input type="radio" className="form-check-input" name="optionsRadios4" defaultValue /> Caucasian
                              <i className="input-helper" />
                            </label>
                          </div>
                          <div className="form-check">
                            <label className="form-check-label">
                              <input type="radio" className="form-check-input" name="optionsRadios4" defaultValue /> Hispanic
                              <i className="input-helper" />
                            </label>
                          </div>
                          <div className="form-check">
                            <label className="form-check-label">
                              <input type="radio" className="form-check-input" name="optionsRadios4" defaultValue /> Other
                              <i className="input-helper" />
                            </label>
                          </div>
                        </td>
                      </tr>
                      <tr className="legal-fillout">
                        <td>
                          <div className="form-check">
                            <label className="form-check-label">
                              <input type="radio" className="form-check-input" name="optionsRadios2" defaultValue /> Buccal Swab
                              <i className="input-helper" />
                            </label>
                          </div>
                          <div className="form-check">
                            <label className="form-check-label otherlabel">
                              <input type="radio" className="form-check-input" name="optionsRadios2" defaultValue /> Other
                              <i className="input-helper" />
                            </label>
                            <input className="otherinput" type="text" />
                          </div>
                        </td>
                      </tr>
                      <tr className="legal-fillout">
                        <td colSpan={6}>
                          <div className="addplus-box add-additional">
                            <i className="mdi mdi-plus" />
                            <h4>Add Additional Person</h4>
                          </div>
                        </td>
                      </tr>
                      <tr className="legal-fillout">
                        <td colSpan={8} className="individual-checkbox">
                          <p>Have any of the individuals sampled undergone a blood cell transfusion or stem/bone marrow
                            transplant? </p>
                          <div className="pull-left">
                            <div className="form-check">
                              <label className="form-check-label">
                                <input type="radio" className="form-check-input" name="optionsRadios5" defaultValue /> No
                                <i className="input-helper" />
                              </label>
                            </div>
                            <div className="form-check">
                              <label className="form-check-label">
                                <input type="radio" className="form-check-input" name="optionsRadios5" defaultValue /> Yes
                                <i className="input-helper" />
                              </label>
                            </div>
                            <div className="individual-question">
                              <label>Which Party?</label>
                              <input type="text" className="form-check-input" />
                            </div>
                            <div className="individual-question">
                              <label>When?</label>
                              <input type="text" className="form-check-input" />
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody></table>
                </div>
                <div className="search-btngroup pull-right margin-right10">
                  <a href="javascript:void(0);"><button type="button" className="bluebg"> Save </button></a>
                  <a href="javascript:void(0);"><button type="button" className="bluebg"> Save &amp; Print</button></a>
                </div>
              </div>
            </div>
            <div className="cpuc-enrollment-form">
              <div className="cpuc-enrollment-sections">
                <div className="row">
                  <div className="col-md-12">
                    <div className="allegedform clearfix">
                      <h4>Alleged Aunt/Uncle</h4>
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6">
                          <div className="form-group common-form clearfix">
                            <div className="row">
                              <div className="col-lg-3 col-md-3 col-sm-3">
                                <div className="form-control-label">
                                  <label className="control-label">Phone Number</label>
                                </div>
                              </div>
                              <div className="col-lg-9 col-md-9 col-sm-9">
                                <div className="form-input">
                                  <input type="text" className="form-control" placeholder="Phone Number" />
                                  <div className="form-check">
                                    <label className="form-check-label">
                                      <input type="checkbox" className="form-check-input" name="optionsCheckbox" defaultValue /> Do
                                      not call
                                      <i className="input-helper" />
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6">
                          <div className="form-group common-form clearfix">
                            <div className="row">
                              <div className="col-lg-3 col-md-3 col-sm-3">
                                <div className="form-control-label">
                                  <label className="control-label">Password</label>
                                </div>
                              </div>
                              <div className="col-lg-9 col-md-9 col-sm-9">
                                <div className="form-input password-field">
                                  <input type="text" className="form-control" placeholder="Password" />
                                  <span>(Something short that you can remember)</span>
                                  <span className="show-password"><i className="mdi mdi-lock" /></span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6">
                          <div className="form-group common-form clearfix">
                            <div className="row">
                              <div className="col-lg-3 col-md-3 col-sm-3">
                                <div className="form-control-label">
                                  <label className="control-label">Email</label>
                                </div>
                              </div>
                              <div className="col-lg-9 col-md-9 col-sm-9">
                                <div className="form-input">
                                  <input type="email" className="form-control" placeholder="Email" />
                                  <div className="form-check">
                                    <label className="form-check-label">
                                      <input type="checkbox" className="form-check-input" name="optionsCheckbox" defaultValue />I
                                      prefer to pick up the results. Do not email me.
                                      <i className="input-helper" />
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6">
                          <div className="form-group common-form clearfix">
                            <div className="row">
                              <div className="col-lg-3 col-md-3 col-sm-3">
                                <div className="form-control-label">
                                  <label className="control-label">Drivers License Number</label>
                                </div>
                              </div>
                              <div className="col-lg-9 col-md-9 col-sm-9">
                                <div className="form-input">
                                  <input type="email" className="form-control" placeholder="Drivers License Number" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6">
                          <div className="form-group formbox common-form selectbox">
                            <div className="row">
                              <div className="col-lg-3 col-md-3 col-sm-3">
                                <div className="form-control-label">
                                  <label className="control-label">Drivers License State</label>
                                </div>
                              </div>
                              <div className="col-lg-9 col-md-9 col-sm-9">
                                <div className="form-input">
                                  <select>
                                    <option value selected="selected">Select a State</option>
                                    <option value="AL">Alabama</option>
                                    <option value="AK">Alaska</option>
                                    <option value="AZ">Arizona</option>
                                    <option value="AR">Arkansas</option>
                                    <option value="CA">California</option>
                                    <option value="CO">Colorado</option>
                                    <option value="CT">Connecticut</option>
                                    <option value="DE">Delaware</option>
                                    <option value="DC">District Of Columbia</option>
                                    <option value="FL">Florida</option>
                                    <option value="GA">Georgia</option>
                                    <option value="HI">Hawaii</option>
                                    <option value="ID">Idaho</option>
                                    <option value="IL">Illinois</option>
                                    <option value="IN">Indiana</option>
                                    <option value="IA">Iowa</option>
                                    <option value="KS">Kansas</option>
                                    <option value="KY">Kentucky</option>
                                    <option value="LA">Louisiana</option>
                                    <option value="ME">Maine</option>
                                    <option value="MD">Maryland</option>
                                    <option value="MA">Massachusetts</option>
                                    <option value="MI">Michigan</option>
                                    <option value="MN">Minnesota</option>
                                    <option value="MS">Mississippi</option>
                                    <option value="MO">Missouri</option>
                                    <option value="MT">Montana</option>
                                    <option value="NE">Nebraska</option>
                                    <option value="NV">Nevada</option>
                                    <option value="NH">New Hampshire</option>
                                    <option value="NJ">New Jersey</option>
                                    <option value="NM">New Mexico</option>
                                    <option value="NY">New York</option>
                                    <option value="NC">North Carolina</option>
                                    <option value="ND">North Dakota</option>
                                    <option value="OH">Ohio</option>
                                    <option value="OK">Oklahoma</option>
                                    <option value="OR">Oregon</option>
                                    <option value="PA">Pennsylvania</option>
                                    <option value="RI">Rhode Island</option>
                                    <option value="SC">South Carolina</option>
                                    <option value="SD">South Dakota</option>
                                    <option value="TN">Tennessee</option>
                                    <option value="TX">Texas</option>
                                    <option value="UT">Utah</option>
                                    <option value="VT">Vermont</option>
                                    <option value="VA">Virginia</option>
                                    <option value="WA">Washington</option>
                                    <option value="WV">West Virginia</option>
                                    <option value="WI">Wisconsin</option>
                                    <option value="WY">Wyoming</option>
                                  </select>
                                  <i className="mdi mdi-chevron-down" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6">
                          <div className="form-check">
                            <label className="form-check-label">
                              <input type="checkbox" className="form-check-input" name="optionsCheckbox" defaultValue />I
                              do not have a drivers license &amp; state ID
                              <i className="input-helper" />
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="bottom-btn-group pull-right margin-top0">
                        <button className="bluebg">Submit</button>
                      </div>
                    </div>
                    <div className="allegedform clearfix">
                      <h4> Mother</h4>
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6">
                          <div className="form-group common-form clearfix">
                            <div className="row">
                              <div className="col-lg-3 col-md-3 col-sm-3">
                                <div className="form-control-label">
                                  <label className="control-label">Phone Number</label>
                                </div>
                              </div>
                              <div className="col-lg-9 col-md-9 col-sm-9">
                                <div className="form-input">
                                  <input type="text" className="form-control" placeholder="Phone Number" />
                                  <div className="form-check">
                                    <label className="form-check-label">
                                      <input type="checkbox" className="form-check-input" name="optionsCheckbox" defaultValue /> Do
                                      not call
                                      <i className="input-helper" />
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6">
                          <div className="form-group common-form clearfix">
                            <div className="row">
                              <div className="col-lg-3 col-md-3 col-sm-3">
                                <div className="form-control-label">
                                  <label className="control-label">Password</label>
                                </div>
                              </div>
                              <div className="col-lg-9 col-md-9 col-sm-9">
                                <div className="form-input">
                                  <input type="text" className="form-control" placeholder="Password" />
                                  <span>(Something short that you can remember)</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6">
                          <div className="form-group common-form clearfix">
                            <div className="row">
                              <div className="col-lg-3 col-md-3 col-sm-3">
                                <div className="form-control-label">
                                  <label className="control-label">Email</label>
                                </div>
                              </div>
                              <div className="col-lg-9 col-md-9 col-sm-9">
                                <div className="form-input">
                                  <input type="email" className="form-control" placeholder="Email" />
                                  <div className="form-check">
                                    <label className="form-check-label">
                                      <input type="checkbox" className="form-check-input" name="optionsCheckbox" defaultValue />I
                                      prefer to pick up the results. Do not email me.
                                      <i className="input-helper" />
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6">
                          <div className="form-group common-form clearfix">
                            <div className="row">
                              <div className="col-lg-3 col-md-3 col-sm-3">
                                <div className="form-control-label">
                                  <label className="control-label">Drivers License Number</label>
                                </div>
                              </div>
                              <div className="col-lg-9 col-md-9 col-sm-9">
                                <div className="form-input">
                                  <input type="email" className="form-control" placeholder="Drivers License Number" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6">
                          <div className="form-group formbox common-form selectbox">
                            <div className="row">
                              <div className="col-lg-3 col-md-3 col-sm-3">
                                <div className="form-control-label">
                                  <label className="control-label">Drivers License State</label>
                                </div>
                              </div>
                              <div className="col-lg-9 col-md-9 col-sm-9">
                                <div className="form-input">
                                  <select>
                                    <option value selected="selected">Select a State</option>
                                    <option value="AL">Alabama</option>
                                    <option value="AK">Alaska</option>
                                    <option value="AZ">Arizona</option>
                                    <option value="AR">Arkansas</option>
                                    <option value="CA">California</option>
                                    <option value="CO">Colorado</option>
                                    <option value="CT">Connecticut</option>
                                    <option value="DE">Delaware</option>
                                    <option value="DC">District Of Columbia</option>
                                    <option value="FL">Florida</option>
                                    <option value="GA">Georgia</option>
                                    <option value="HI">Hawaii</option>
                                    <option value="ID">Idaho</option>
                                    <option value="IL">Illinois</option>
                                    <option value="IN">Indiana</option>
                                    <option value="IA">Iowa</option>
                                    <option value="KS">Kansas</option>
                                    <option value="KY">Kentucky</option>
                                    <option value="LA">Louisiana</option>
                                    <option value="ME">Maine</option>
                                    <option value="MD">Maryland</option>
                                    <option value="MA">Massachusetts</option>
                                    <option value="MI">Michigan</option>
                                    <option value="MN">Minnesota</option>
                                    <option value="MS">Mississippi</option>
                                    <option value="MO">Missouri</option>
                                    <option value="MT">Montana</option>
                                    <option value="NE">Nebraska</option>
                                    <option value="NV">Nevada</option>
                                    <option value="NH">New Hampshire</option>
                                    <option value="NJ">New Jersey</option>
                                    <option value="NM">New Mexico</option>
                                    <option value="NY">New York</option>
                                    <option value="NC">North Carolina</option>
                                    <option value="ND">North Dakota</option>
                                    <option value="OH">Ohio</option>
                                    <option value="OK">Oklahoma</option>
                                    <option value="OR">Oregon</option>
                                    <option value="PA">Pennsylvania</option>
                                    <option value="RI">Rhode Island</option>
                                    <option value="SC">South Carolina</option>
                                    <option value="SD">South Dakota</option>
                                    <option value="TN">Tennessee</option>
                                    <option value="TX">Texas</option>
                                    <option value="UT">Utah</option>
                                    <option value="VT">Vermont</option>
                                    <option value="VA">Virginia</option>
                                    <option value="WA">Washington</option>
                                    <option value="WV">West Virginia</option>
                                    <option value="WI">Wisconsin</option>
                                    <option value="WY">Wyoming</option>
                                  </select>
                                  <i className="mdi mdi-chevron-down" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6">
                          <div className="form-check">
                            <label className="form-check-label">
                              <input type="checkbox" className="form-check-input" name="optionsCheckbox" defaultValue />I
                              do not have a drivers license &amp; state ID
                              <i className="input-helper" />
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="bottom-btn-group pull-right margin-top0">
                        <button className="bluebg">Submit</button>
                      </div>
                    </div>
                    <div className="allegedform clearfix">
                      <h4> Child</h4>
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6">
                          <div className="form-group common-form clearfix">
                            <div className="row">
                              <div className="col-lg-3 col-md-3 col-sm-3">
                                <div className="form-control-label">
                                  <label className="control-label">Phone Number</label>
                                </div>
                              </div>
                              <div className="col-lg-9 col-md-9 col-sm-9">
                                <div className="form-input">
                                  <input type="text" className="form-control" placeholder="Phone Number" />
                                  <div className="form-check">
                                    <label className="form-check-label">
                                      <input type="checkbox" className="form-check-input" name="optionsCheckbox" defaultValue /> Do
                                      not call
                                      <i className="input-helper" />
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6">
                          <div className="form-group common-form clearfix">
                            <div className="row">
                              <div className="col-lg-3 col-md-3 col-sm-3">
                                <div className="form-control-label">
                                  <label className="control-label">Password</label>
                                </div>
                              </div>
                              <div className="col-lg-9 col-md-9 col-sm-9">
                                <div className="form-input">
                                  <input type="text" className="form-control" placeholder="Password" />
                                  <span>(Something short that you can remember)</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6">
                          <div className="form-group common-form clearfix">
                            <div className="row">
                              <div className="col-lg-3 col-md-3 col-sm-3">
                                <div className="form-control-label">
                                  <label className="control-label">Email</label>
                                </div>
                              </div>
                              <div className="col-lg-9 col-md-9 col-sm-9">
                                <div className="form-input">
                                  <input type="email" className="form-control" placeholder="Email" />
                                  <div className="form-check">
                                    <label className="form-check-label">
                                      <input type="checkbox" className="form-check-input" name="optionsCheckbox" defaultValue />I
                                      prefer to pick up the results. Do not email me.
                                      <i className="input-helper" />
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6">
                          <div className="form-group common-form clearfix">
                            <div className="row">
                              <div className="col-lg-3 col-md-3 col-sm-3">
                                <div className="form-control-label">
                                  <label className="control-label">Drivers License Number</label>
                                </div>
                              </div>
                              <div className="col-lg-9 col-md-9 col-sm-9">
                                <div className="form-input">
                                  <input type="email" className="form-control" placeholder="Drivers License Number" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6">
                          <div className="form-group formbox common-form selectbox">
                            <div className="row">
                              <div className="col-lg-3 col-md-3 col-sm-3">
                                <div className="form-control-label">
                                  <label className="control-label">Drivers License State</label>
                                </div>
                              </div>
                              <div className="col-lg-9 col-md-9 col-sm-9">
                                <div className="form-input">
                                  <select>
                                    <option value selected="selected">Select a State</option>
                                    <option value="AL">Alabama</option>
                                    <option value="AK">Alaska</option>
                                    <option value="AZ">Arizona</option>
                                    <option value="AR">Arkansas</option>
                                    <option value="CA">California</option>
                                    <option value="CO">Colorado</option>
                                    <option value="CT">Connecticut</option>
                                    <option value="DE">Delaware</option>
                                    <option value="DC">District Of Columbia</option>
                                    <option value="FL">Florida</option>
                                    <option value="GA">Georgia</option>
                                    <option value="HI">Hawaii</option>
                                    <option value="ID">Idaho</option>
                                    <option value="IL">Illinois</option>
                                    <option value="IN">Indiana</option>
                                    <option value="IA">Iowa</option>
                                    <option value="KS">Kansas</option>
                                    <option value="KY">Kentucky</option>
                                    <option value="LA">Louisiana</option>
                                    <option value="ME">Maine</option>
                                    <option value="MD">Maryland</option>
                                    <option value="MA">Massachusetts</option>
                                    <option value="MI">Michigan</option>
                                    <option value="MN">Minnesota</option>
                                    <option value="MS">Mississippi</option>
                                    <option value="MO">Missouri</option>
                                    <option value="MT">Montana</option>
                                    <option value="NE">Nebraska</option>
                                    <option value="NV">Nevada</option>
                                    <option value="NH">New Hampshire</option>
                                    <option value="NJ">New Jersey</option>
                                    <option value="NM">New Mexico</option>
                                    <option value="NY">New York</option>
                                    <option value="NC">North Carolina</option>
                                    <option value="ND">North Dakota</option>
                                    <option value="OH">Ohio</option>
                                    <option value="OK">Oklahoma</option>
                                    <option value="OR">Oregon</option>
                                    <option value="PA">Pennsylvania</option>
                                    <option value="RI">Rhode Island</option>
                                    <option value="SC">South Carolina</option>
                                    <option value="SD">South Dakota</option>
                                    <option value="TN">Tennessee</option>
                                    <option value="TX">Texas</option>
                                    <option value="UT">Utah</option>
                                    <option value="VT">Vermont</option>
                                    <option value="VA">Virginia</option>
                                    <option value="WA">Washington</option>
                                    <option value="WV">West Virginia</option>
                                    <option value="WI">Wisconsin</option>
                                    <option value="WY">Wyoming</option>
                                  </select>
                                  <i className="mdi mdi-chevron-down" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6">
                          <div className="form-check">
                            <label className="form-check-label">
                              <input type="checkbox" className="form-check-input" name="optionsCheckbox" defaultValue />I
                              do not have a drivers license &amp; state ID
                              <i className="input-helper" />
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="bottom-btn-group pull-right margin-top0">
                        <button className="bluebg">Submit</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </React.Fragment>
  )
}

export default Avuncular;

