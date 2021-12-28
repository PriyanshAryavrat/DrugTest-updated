import React from "react";
// import "./index.css";
import { Link, withRouter } from "react-router-dom";
import { Tabs, Tab } from "react-bootstrap-tabs";
import { Row, Col, Container, } from "react-bootstrap";
import axios from "axios";
import apiPath from "../../../Environment/ApiPath";
// import Moment from "moment";
 import Cpuc from "./cpuc";
 import Dot from "./dot";
 import Alc from "./alc";
 import LanDo from "./lando"
 import PersonalTest from "./personal"
 import USCG from "./uscg"
 import Taxi from "./taxi"
const sampleTypes = {
  "BS":"Buccal Swab",
  "OS" :"Other"
}
const sexTypes = {
  "MA": "Male",
  "FE": "Female"
}

class DNAForm extends React.Component {
  constructor(props) {
    
    super(props);
    let { formType, id } = this.props.match.params;
   // console.log(formSubtype, id);
    this.state = {
      id: id,
      formType: formType,
     // formData:{}
    };
  }

  componentDidMount() {
    
    const url = `${apiPath.form_detail}/${this.state.id}`;
    axios.get(url, {}).then((response) => {
      let formData = response.data.data;
      if (!formData) {  
        return this.props.history.goBack();
      }
      console.log(formData,"fdata")
      this.setState({
        formData: formData,
      });
    });
  }

  render() {
    const { formType, formData } = this.state;
    return (
      <React.Fragment>
          {(formType=="CPUC"&&formData)&&<Cpuc formData={formData}/>}
          {(formType=="DOT"&&formData)&&<Dot formData={formData}/>}
          {(formType=="ALC"&&formData)&&<Alc formData={formData}/>}
          {(formType=="Taxi"&&formData)&&<Taxi formData={formData}/>}
          {(formType=="Personal Test"&&formData)&&<PersonalTest formData={formData}/>}
          {(formType=="Lan Do"&&formData)&&<LanDo formData={formData}/>}
          {(formType=="USCG"&&formData)&&<USCG formData={formData}/>}
          

          
          
          
          
          
{/* {(formSubtype=="Paternity"&&formData) && <Paternity formData={formData}/>}
{(formSubtype=="Immigration"&&formData) && <Immigration formData={formData}/>}
{(formSubtype=="Passport"&&formData) && <Passport formData={formData}/>}
{(formSubtype=="Infidelity"&&formData) && <Infidelity formData={formData}/>}
{(formSubtype=="Maternity"&&formData) && <Maternity formData={formData}/>}
{(formSubtype=="Grandparentage"&&formData) && <Grandparentage formData={formData}/>}
{(formSubtype=="Avuncular"&&formData) && <Avancular formData={formData}/>}
{(formSubtype=="Siblingship"&&formData) && <Sibblingship formData={formData}/>} */}

      </React.Fragment>
    );
  }
}

export default withRouter(DNAForm);
