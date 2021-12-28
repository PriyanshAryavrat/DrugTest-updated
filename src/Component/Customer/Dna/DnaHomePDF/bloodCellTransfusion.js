import React from "react";
import Moment from "moment";
import { Page, Text, Document, StyleSheet, Image, Font, View, Canvas } from '@react-pdf/renderer';
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
  formBox2: {
    textAlign: 'left',
    flexDirection: 'row',
    marginBottom: '5px',
    marginTop: '10px',
  },

  label: {
    fontSize: '12px',
    color: '#424e58',
    width: '100%'
  },
  label2: {
    fontSize: '11px',
    color: '#424e58',
    width: '90%',
    textAlign: 'left',
    alignItems: 'left',
    display: 'flex'
  },
  label3: {
    fontSize: '12px',
    color: '#525f69',
    width: '10%',
    textAlign: 'left',
    alignItems: 'left',
    flex: 1

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

const BloodCellTransfusion = ({ bloodCellTransfusion }) => {
  return <View>
    <View style={styles.formBox2}></View>
    <View style={styles.formBox}>
      <Text style={styles.label2}>
        Have any of the individuals sampled undergone a
        blood cell transfusion or stem/bone marrow
        transplant?
    </Text>
      <Text style={styles.label3}>{(bloodCellTransfusion.status === true) ? "Yes" : "No"}</Text>
    </View>
    {bloodCellTransfusion.status && <View style={styles.formBox}>

      <Text style={styles.label}>Which Party? </Text>

      <Text style={styles.label}>When</Text>
    </View>}
    {bloodCellTransfusion.status && <View style={styles.formInputGroup}>

      <Text style={styles.input}>{bloodCellTransfusion.party}</Text>
      <Text style={styles.input}>{Moment(bloodCellTransfusion.when).format('MM/DD/YYYY').toString()} </Text>
    </View>}
  </View>
}

export default BloodCellTransfusion;