import React from "react";
import Moment from "moment";
import { Tabs, Tab } from "react-bootstrap-tabs";
import { Row, Col, Container, } from "react-bootstrap";
const BloodCellTransfusion=({bloodCellTransfusion})=>{
    return    <div className="transfusion-box">
    <h4>
      Have any of the individuals sampled undergone a
      blood cell transfusion or stem/bone marrow
      transplant?
    </h4>
    <Row>
      <Col lg={1} md={1} sm={1}>
       <strong> {(bloodCellTransfusion.status===true)?"Yes":"No"}</strong>
      </Col>
      <Col lg={1} md={1} sm={1}>
      </Col>
      </Row>
      {bloodCellTransfusion.status &&
      <Row>
      <Col lg={4} md={6} sm={6}>
        <div className="individual-question">
          <label>Which Party?</label>
          <input
            type="text"
            disabled="disabled"
            value={bloodCellTransfusion.party}
            className="form-check-input"
          />
        </div>
      </Col>
      <Col lg={4} md={4} sm={4}>
        <div className="individual-question">
          <label>When?</label>
          <input
            type="text"
            disabled="disabled"
            className="form-check-input"
            value={Moment(bloodCellTransfusion.when).format('MM/DD/YYYY').toString()}
          />
        </div>
      </Col>
    </Row>
      } </div>

}
export default BloodCellTransfusion;