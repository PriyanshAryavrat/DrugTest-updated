import React from 'react';
import { Page, Text, Document, StyleSheet, Image, Font, View } from '@react-pdf/renderer';
import fontFile from '../../../../src/assets/fonts/fontFile';
import {Accurate_logo , Download} from '../../../../src/assets/images';


Font.register({
  family: 'Roboto',
  fonts: [
    {
      src: fontFile,
    },
  ],
});

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fff',
    padding: '20px 0 20px 20px',
    textAlign: 'center'
  },

  logoImage: {
    marginVertical: 15,
    marginHorizontal: 180
  },

  title: {
    fontSize: '18px',
    margin: '0 0 8px 0',
    color: '#525f69',
    fontFamily: 'Roboto',
    fontWeight: '700'
  },
  title2: {
    fontSize: '18px',
    margin: '0 0 30px 0',
    color: '#525f69',
    fontFamily: 'Roboto',
    fontWeight: '700'
  },
  formBox: {
    textAlign: 'left',
    flexDirection: 'row',
    marginBottom: '5px'
  },

  label: {
    fontSize: '12px',
    color: '#424e58',
    width: '100%'
  },

  formInputGroup: {
    flexDirection: 'row',
    textAlign: 'left'
  },

  input: {
    fontSize: '11px',
    border: '1px solid #cccccc',
    borderRadius: '5px',
    padding: '6px 8px',
    color: '#868585',
    width: '100%',
    marginRight: '20px',
    marginBottom: '15px'
  },

  signatureSign: {
    border: '1px solid #ccc',
    borderRadius: '5px',
    width: '200px',
    marginBottom: '10px'
  },

  authorize: {
    flexDirection: 'row',
    textAlign: 'left',
    marginTop: '10px',
    color: '#424e58'
  },

  checkIcon: {
    width: '12px',
    height: '12px',
    marginRight: '5px'
  },

  authorizeLabel: {
    fontSize: '11px'
  },
  addresscol: {
    fontSize: '12px',
    color: '#424e58',
    width: '100%'
  },
  ownerlabel: {
    fontSize: '12px',
    color: '#424e58',
    width: '50%'
  },
  onerenailinput: {
    fontSize: '11px',
    border: '1px solid #cccccc',
    borderRadius: '5px',
    padding: '6px 8px',
    color: '#868585',
    width: '47%',
    marginRight: '20px',
    marginBottom: '15px'
  },
  addressinput: {
    fontSize: '11px',
    border: '1px solid #cccccc',
    borderRadius: '5px',
    padding: '6px 8px',
    color: '#868585',
    width: '100%',
    marginRight: '20px',
    marginBottom: '15px'
  },

  bordertop: {
    borderTop: '1px solid #0264a2',
    margin: '10px 18px 30px 0'
  },
  title3: {
    fontSize: '13px',
    color: '#333',
    marginTop: '15px'
  },


  agreementouter: {
    border: "2px solid #424e58",
    borderRadius: '4px',
    margin: '0 20px 20px 0'
  },
  agreementsmalltitle: {
    fontSize: '12px',
    color: '#333',
    marginTop: '10px'
  },
  agreementtitle: {
    fontSize: '15px',
    margin: '10px 0 10px 0',
    color: '#3c4850',
    fontFamily: 'Roboto',
    fontWeight: '600'
  },
  agreement: {
    marginRight: '20px'
  },
  agreementDes: {
    fontSize: '11px',
    color: '#424e58',
    lineHeight: '1.9',
    textAlign: 'left',
    marginBottom: '10px'
  },

});


// Create Document Component
const PDF = ({ props }) => {
  const { acknowledge } = props;

  return <Document>
    <Page size="A4" style={styles.page}>
      <Image src={Accurate_logo} style={styles.logoImage} />
      <Text style={styles.title}>Acknowledgment And Receipt</Text>
      <View style={styles.agreement}>
        <Text style={styles.agreementDes}>
          I have received a copy or the COMPANY'S DOT Drug and Alcohol Testing Policy and understand that in order to continue 
          my employment with the COMPANY, I must abide by the terms of this policy
          I also verify that I have received information on the effects of alcohol and controlled
          substance on my health, work and personal life, signs and symptoms of a problem and available methods of 
          intervening when a problem is suspected.
        </Text>
      </View>
      {
        acknowledge && <div>
          <View style={styles.formBox}>
            <Text style={styles.label}>Employee's Printed Name</Text>
            <Text style={styles.label}>Date</Text>
            <Text style={styles.label}>Dl Number</Text>
          </View>
          <View style={styles.formInputGroup}>
            <Text style={styles.input}>{acknowledge.printedName}</Text>
            <Text style={styles.input}>{acknowledge.date}</Text>
            <Text style={styles.input}>{acknowledge.dlNumber}</Text>
          </View>


          <View style={styles.formBox}>
            <Text style={styles.label}>Email</Text>
            
          </View>
          <View style={styles.formInputGroup}>
            
            <Text style={styles.input}>{acknowledge.email}</Text>
          </View>
          
          <View style={styles.formBox}>
            <Text style={styles.label}>Signature</Text>
          </View>
          <View style={styles.signImage}>
            {acknowledge.signature && <Image src={acknowledge.signature} style={styles.signatureSign} />}
          </View>
        </div>
      }

      

    </Page>
  </Document>
}

export default PDF