import React from 'react';
import { Page, Text, Document, StyleSheet, Image, Font, View } from '@react-pdf/renderer';
import fontFile from '../../../../../src/assets/fonts/fontFile';
import InfidelityInfo from './infidelityInfo'
import BloodCellTransfusion from './bloodCellTransfusion'
import {
  Accurate_logo,
  Download,
  AuthorizeCheck
} from '../../../../../src/assets/images';
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
});

// Create Document Component
const PDF = ({ props }) => {

  //const { allegedFather, allegedMother, child, additionalPersons, other, relation, beneficiaries, grandFather, grandMother, allegedAunt, allegedUncle } = props;
  return <Document>
    <Page size="A4" style={styles.page}>
      <Image src={Accurate_logo} style={styles.logoImage} />
      <Text style={styles.title}>Infidelity Test</Text>
      <View style={styles.formBox}>
        <Text style={styles.label}>Name </Text>
        <Text style={styles.label}>Phone Number</Text>
        <Text style={styles.label}>Email</Text>
      </View>

      <View style={styles.formInputGroup}>
        <Text style={styles.input}>{props.name}</Text>
        <Text style={styles.input}>{props.phone}</Text>
        <Text style={styles.input}>{props.email} </Text>
      </View>

      <View style={styles.formBox}>

        <Text style={styles.label}>Driving License</Text>

      </View>
      <View style={styles.formInputGroup}>
        <Text style={styles.input}>{props.drivingLicence}</Text>
      </View>
      <View style={styles.formInputGroup}>
        {props && <InfidelityInfo formData={props} />}
      </View>

      {props.bloodCellTransfusion && <BloodCellTransfusion bloodCellTransfusion={props.bloodCellTransfusion} />}

    </Page>
  </Document>
};

export default PDF