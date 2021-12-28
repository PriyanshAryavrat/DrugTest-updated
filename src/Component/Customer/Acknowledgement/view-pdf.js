import React, { useEffect, useState } from 'react';
import { PDFViewer, StyleSheet } from '@react-pdf/renderer';
import PDF from './PDF';
import apiPath from "../../../Environment/ApiPath";
import axios from "axios";
const styles = StyleSheet.create({
  pdfviewer: {
    //   flexDirection: 'row',
    width: '100%',
    margin: 'auto',
    height: '99.2vh'
  },
});

const AckPDF = (props) => {

  const [formData, setFormData] = useState({});
  useEffect(() => {
    const url = `${apiPath.form_detail}/${props.match.params.id}`;
    axios.get(url).then((response) => {
      console.log(response.data.data);
      let formData = response.data.data;
      setFormData(formData);
    })
  }, [])
  return <PDFViewer style={styles.pdfviewer}>
    <PDF props={formData} />
  </PDFViewer>
};

export default AckPDF;