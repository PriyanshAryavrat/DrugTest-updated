import React from "react";
import "./index.css";
import { Link, withRouter } from "react-router-dom";
import { Tabs, Tab } from "react-bootstrap-tabs";
import { Row, Col, Container, } from "react-bootstrap";
import axios from "axios";
import apiPath from "../../../Environment/ApiPath";
import Moment from "moment";
import Paternity from "./paternity";
import Immigration from "./immigration";
import Maternity from "./Maternity";
import Avancular from "./avancular";
import Grandparentage from "./grandparentage";
import Infidelity from "./infidelity";
import Passport from "./passport";
import Sibblingship from "./sibblingship";
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
    let { formSubtype, id } = this.props.match.params;
    console.log(formSubtype, id);
    this.state = {
      id: id,
      formSubtype: formSubtype,
     // formData:{}
    };
  }

  componentDidMount() {
    
    const url = `${apiPath.dna_form_detail}/${this.state.id}/${this.state.formSubtype}`;
    axios.get(url, {}).then((response) => {
      let formData = response.data.data;
      if (!formData) {
        //return this.props.history.goBack();
      }
      this.setState({
        formData: formData,
      });
    });
  }

  render() {
    const { formSubtype, formData } = this.state;
    const mainTabsList = ["Paternity", "Immigration", "Passport", "Infidelity","Maternity","Grandparentage","Avuncular","Siblingship",];
    let mainTabKey = mainTabsList.indexOf(formSubtype);
console.log(formData,"formdata",formSubtype)
    return (
      <React.Fragment>
{(formSubtype=="Paternity"&&formData) && <Paternity formData={formData}/>}
{(formSubtype=="Immigration"&&formData) && <Immigration formData={formData}/>}
{(formSubtype=="Passport"&&formData) && <Passport formData={formData}/>}
{(formSubtype=="Infidelity"&&formData) && <Infidelity formData={formData}/>}
{(formSubtype=="Maternity"&&formData) && <Maternity formData={formData}/>}
{(formSubtype=="Grandparentage"&&formData) && <Grandparentage formData={formData}/>}
{(formSubtype=="Avuncular"&&formData) && <Avancular formData={formData}/>}
{(formSubtype=="Siblingship"&&formData) && <Sibblingship formData={formData}/>}

      </React.Fragment>
    );
  }
}

export default withRouter(DNAForm);
