import React from 'react';
import {
  PDFViewer,
  StyleSheet
} from '@react-pdf/renderer';
import PDF from './PDF';
import axios from "axios";
import apiPath from "../../../Environment/ApiPath";


const styles = StyleSheet.create({
  pdfviewer: {
    //   flexDirection: 'row',
    width: '100%',
    margin: 'auto',
    height: '99.2vh'
  },
});

class LandoPDF extends React.Component {
  constructor(props) {
    super(props);
    let {
      id
    } = this.props.match.params;
    this.state = {
      id: id,
    }
  }

  componentDidMount() {
    const url = `${apiPath.form_detail}/${this.state.id}`;
    axios.get(url).then((response) => {
      console.log(response.data.data);
      let formData = response.data.data;
      if (!formData) {
        return this.setState({
          redirectTo: '/customer'
        })
      }
      this.setState({
        formData: formData,
      });
    });
  }

  render() {
    return (
      <PDFViewer style={
        styles.pdfviewer
      }>
        {this.state.formData && <PDF {...this.state.formData} />}
      </PDFViewer>
    )
  }
}


export default LandoPDF;