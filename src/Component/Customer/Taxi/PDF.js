import React from 'react';
import { Page, Text, Document, StyleSheet, Image, Font, View } from '@react-pdf/renderer';
import fontFile from '../../../../src/assets/fonts/fontFile';
import {
  Accurate_logo,
  Download
} from '../../../../src/assets/images';

import Moment from 'moment';
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
    margin: '0 0 30px 0',
    color: '#525f69',
    fontFamily: 'Roboto',
    fontWeight: '700',
  },

  formBox: {
    textAlign: 'left',
    flexDirection: 'row',
    marginBottom: '5px',
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

  accurateheading: {
    fontSize: '12px',
    textAlign: 'left',
    marginBottom: '20px',
    color: '#424e58',
    paddingRight: '20px',
    flexDirection: 'row'
  },

  inputlabel: {
    fontSize: '12px',
    borderBottom: '1px solid #ccc',
    width: '200px',
    margin: '0 10px'
  },
  accurateAuthorize: {
    width: '800px',
    lineHeight: '1.5px'
  },
});

// Create Document Component
const PDF = ({ props }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Image src={Accurate_logo} style={styles.logoImage} />
      <Text style={styles.title}>Taxi Release Authorization</Text>

      <View style={styles.formBox}>
        <Text style={styles.label}>Date</Text>
      </View>

      <View style={styles.formInputGroup}>
        <Text style={styles.input}>{Moment(props.dateOfRegistration).format('MM/DD/YYYY').toString()} </Text>
      </View>

      <View style={styles.accurateheading}>
        <Text>I</Text>
        <Text style={styles.inputlabel}> {props.firstName} {props.middleName} {props.lastName}</Text>
        <Text style={styles.accurateAuthorize}> authorize Accurate C&S Services, Inc. to release my drug and/or alcohol test results to Oakland Taxi</Text>
      </View>

      <View style={styles.formBox}>
        <Text style={styles.label}>Driver's License</Text>
        <Text style={styles.label}>State</Text>
      </View>

      <View style={styles.formInputGroup}>
        <Text style={styles.input}>{props.drivingLicence}</Text>
        <Text style={styles.input}>{props.dlState}</Text>
      </View>

      <View style={styles.formBox}>
        <Text style={styles.label}>Phone Number </Text>
        <Text style={styles.label}>Email</Text>
      </View>

      <View style={styles.formInputGroup}>
        <Text style={styles.input}>{props.phoneNumber}</Text>
        <Text style={styles.input}>{props.email} </Text>
      </View>

      <View style={styles.formBox}>
        <Text style={styles.label}>Email a copy of my results to</Text>
      </View>

      <View style={styles.formInputGroup}>
        {/* <Text style={styles.input}>kschuerholz@oaklandca.gov</Text> */}
        <Text style={styles.input}>{props.email}</Text>
      </View>
      <View style={styles.formBox}>
        <Text style={styles.label}>Signature</Text>
      </View>
      <View style={styles.signImage}>
        {props.signature && <Image src={props.signature} style={styles.signatureSign} />}
      </View>


    </Page>
  </Document>
);

export default PDF;