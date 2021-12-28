import React, { useEffect, useState } from 'react';
import { PDFViewer, StyleSheet } from '@react-pdf/renderer';
import apiPath from "../../../../Environment/ApiPath";
import axios from "axios";
import Paternity from "./paternity";
import Immigration from "./immigration";
import Maternity from "./Maternity";
import Avancular from "./avancular";
import Grandparentage from "./grandparentage";
import Infidelity from "./infidelity";
import Passport from "./passport";
import Sibblingship from "./sibblingship";
const styles = StyleSheet.create({
  pdfviewer: {
    //   flexDirection: 'row',
    width: '100%',
    margin: 'auto',
    height: '99.2vh'
  },
});

const PDFView = (props) => {

  const [formData, setFormData] = useState();
  const [subType, setSubType] = useState(null);
  useEffect(() => {
    setSubType(props.match.params.subtype);
    const url = `${apiPath.dna_form_detail}/${props.match.params.id}/${props.match.params.subtype}`;
    axios.get(url).then((response) => {
      console.log(response.data.data);
      let formData = response.data.data;
      if (props.match.params.subtype == "Infidelity" && formData) {
        formData.relation.additionalItems = formData.additionalItems;
      }
      setFormData(formData);
    })

  }, [])
  return <PDFViewer style={styles.pdfviewer}>
    {(subType == "Paternity" && formData) && <Paternity props={formData} />}
    {(subType == "Immigration" && formData) && <Immigration props={formData} />}
    {(subType == "Passport" && formData) && <Passport props={formData} />}
    {(subType == "Infidelity" && formData) && <Infidelity props={formData} />}
    {(subType == "Maternity" && formData) && <Maternity props={formData} />}
    {(subType == "Grandparentage" && formData) && <Grandparentage props={formData} />}
    {(subType == "Avuncular" && formData) && <Avancular props={formData} />}
    {(subType == "Siblingship" && formData) && <Sibblingship props={formData} />}
  </PDFViewer>
}

export default PDFView;