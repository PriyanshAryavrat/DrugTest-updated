import React from 'react';
import { Page, Text, Document, StyleSheet, Image, Font, View } from '@react-pdf/renderer';
import fontFile from '../../../../src/assets/fonts/fontFile';
import {
  Accurate_logo,
  Download
} from '../../../../src/assets/images';


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
  const { driver, workedSafetyPosition } = props;

  return <Document>
    <Page size="A4" style={styles.page}>
      <Image src={Accurate_logo} style={styles.logoImage} />
      <Text style={styles.title}>DOT</Text>
      {/* <Text style={styles.title2}>Drug and Alcohol Testing Enrollment Form</Text> */}

      <View style={styles.formBox}>
        <Text style={styles.label}>TCP</Text>
        <Text style={styles.label}>Company Name</Text>
      </View>

      <View style={styles.formInputGroup}>
        <Text style={styles.input}>{props.tcp}</Text>
        <Text style={styles.input}>{props.companyName}</Text>
      </View>

      <View style={styles.bordertop}></View>

      <View style={styles.formBox}>
        <Text style={styles.label}>Owner/Supervisor Name</Text>
        <Text style={styles.label}>Owner Cell Phone Number</Text>
        <Text style={styles.label}>Owner/Supervisor Email</Text>
      </View>
      <View style={styles.formInputGroup}>
        <Text style={styles.input}>{props.ownerName}</Text>
        <Text style={styles.input}>{props.ownerPhoneNumber}</Text>
        <Text style={styles.input}>{props.ownerEmail}</Text>
      </View>

      <View style={styles.formBox}>
        <Text style={styles.ownerlabel}>DBA</Text>
        <Text style={styles.addresscol}>Company Address</Text>
      </View>

      <View style={styles.formInputGroup}>
        <Text style={styles.onerenailinput}>{props.dba !== "undefined" ? props.dba : ""}</Text>
        <Text style={styles.addressinput}>{props.companyAddress}</Text>
      </View>

      <View style={styles.formBox}>
        <Text style={styles.label}>City</Text>
        <Text style={styles.label}>State</Text>
        <Text style={styles.label}>Zipcode</Text>
      </View>
      <View style={styles.formInputGroup}>
        <Text style={styles.input}>{props.ownerCity}</Text>
        <Text style={styles.input}>{props.ownerState}</Text>
        <Text style={styles.input}>{props.ownerZipcode}</Text>
      </View>
      {
        driver && <div>
          <View style={styles.bordertop}>
            <Text style={styles.title3}>The following driver(s)/owner(s) will drive for this company</Text>
          </View>

          <View style={styles.formBox}>
            <Text style={styles.label}>First Name</Text>
            <Text style={styles.label}>Middle Name</Text>
            <Text style={styles.label}>Last Name</Text>
          </View>

          <View style={styles.formInputGroup}>
            <Text style={styles.input}>{driver.firstName}</Text>
            <Text style={styles.input}>{driver.middleName}</Text>
            <Text style={styles.input}>{driver.lastName}</Text>
          </View>

          <View style={styles.formBox}>
            <Text style={styles.label}>Phone Number</Text>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.label}>Drivers License</Text>
          </View>

          <View style={styles.formInputGroup}>
            <Text style={styles.input}>{driver.phoneNumber}</Text>
            <Text style={styles.input}>{driver.email}</Text>
            <Text style={styles.input}>{driver.drivingLicence}</Text>
          </View>

          <View style={styles.formBox}>
            <Text style={styles.label}>DL State</Text>
            <Text style={styles.label}>Driver Type</Text>

          </View>

          <View style={styles.formInputGroup}>
            <Text style={styles.input}>{driver.dlState}</Text>
            <Text style={styles.input}>{driver.driverType}</Text>

          </View>
        </div>
      }

      {/* {
        workedSafetyPosition && <div> */}
          <View style={styles.bordertop}>
            <Text style={styles.title3}>Previous Employer Information</Text>
          </View>

          <View style={styles.formBox}>
            <Text style={styles.label}>Previous Employer Name</Text>
            <Text style={styles.label}>Previous Employer Email Address</Text>
            <Text style={styles.label}>Previous Employer Phone Number</Text>
          </View>

          <View style={styles.formInputGroup}>
            <Text style={styles.input}>{props.prevEmployerName}</Text>
            <Text style={styles.input}>{props.prevEmployerEmailAddress}</Text>
            <Text style={styles.input}>{props.prevEmployerPhoneNumber}</Text>
          </View>

          <View style={styles.formBox}>
            <Text style={styles.label}>City</Text>
            <Text style={styles.label}>State</Text>
            <Text style={styles.label}>Zip Code</Text>
          </View>

          <View style={styles.formInputGroup}>
            <Text style={styles.input}>{props.prevOwnerCity}</Text>
            <Text style={styles.input}>{props.prevOwnerState}</Text>
            <Text style={styles.input}>{props.prevOwnerZipcode}</Text>
          </View>

        {/* </div>
      } */}

    </Page>

    <Page size="A4" style={styles.page}>
      <View style={styles.agreementouter}>
        <Image src={Accurate_logo} style={styles.logoImage} />
        <Text style={styles.agreementsmalltitle}>8105 Edgewater Dr., Suite 225 Oakland, CA 94621</Text>
        <Text style={styles.agreementsmalltitle}>T: (510) 394-3985</Text>
        <Text style={styles.agreementsmalltitle}>F: (510) 777-0905</Text>
        <Text style={styles.agreementtitle}>AGREEMENT WITH RESPECT TO DRUG AND ALCOHOL TESTING</Text>
      </View>

      <View style={styles.agreement}>
        <Text style={styles.agreementDes}>
          With my signature, 1 hereby agree to participate in the Accurate C&S Services (Service Agent), consortium which operates
          in accordance to 49 CFR Parts 40.1 further agree to abide by the Service Agent rules, policies and procedures including
          testing, notification, enrollment and removal instructions of the Service Agent. Upon receipt of my signed application
          and applicable fees, the Service Agent, will forward me a complete membership package. If my covered employees have not
          been enrolled in a random testing pool, they will submit to a pre-employment test as required by 49 CFR Part 40 regulations.
          If I am an owner-operator company or company owner, I agree to submit and have all driver(s) submit to a pre-employment test
          and random testing will selected. I agree that the Service Agent will contract with a DHHS certified laboratory, MRO & collection
          sites on my company's behalf and authorize them to receive all test results from the MRO. As supervisor, I agree to inform the
          Service Agent of address and phone number changes and current employee status via employee ADD/DELETE Employee forms enclosed in
          the welcome packet. Non-compliance may result in an administration fee or removal from the consortium, PLEASE REMEMBER THAT it is
          important to inform us of email, mailing address and telephone number changes to ensure you receive all random selection notifications
          because "no-shows" are considered a Refusal to Test which is a positive drug test result. As an employee or driver, I authorize the
          release of my drug test results to my company supervisor or designee and/or DOT agent and/or the CPUC.
        </Text>
        <Text style={styles.agreementDes}>
          ENROLLMENT: Enrollment includes: Pre-Employment Urine Screen, Company Certificate of Enrollment, Company Policy, Employee Educational
          Materials, Random Pool Enrollment, Laboratory Summary Reports and MIS Reports, upon request, a list of Substance Abuse Professional
          (SAP) will be referred for an employee who violates the drug and alcohol testing Regulations by testing positive or not appearing for
          a random selection test, if employee is not terminated after a positive urine screen. The SAP will determine the number of
          return-to-duty and follow-up testing requirements for such employees. As supervisor, I agree to maintain all SAP reports and
          evaluations and notifying the Service Agent of all required testing.
        </Text>
        <Text style={styles.agreementDes}>
          POST ACCIDENTS:As Supervisor, I agree to notify the Service Agent to perform a drug and alcohol test when an employee is involved in an
          accident that results in a human fatality; citation AND bodily injury requiring medical attention away from accident scene or disabling
          damage to any vehicle requiring tow away. Breath alcohol testing must occur within 2 hours following an accident but no later than 8
          hours. Drug testing must occur immediately but no later than 32 hours following an accident. Upon notification of random selection, as
          supervisor/owner I will ensure each driver selected for random testing is notified and receives testing.
        </Text>
        <Text style={styles.agreementDes}>
          Non-compliance may result in removal from the program. ! (driver) may be discharged or otherwise disciplined for any violation by me
          of said Anti Drug and Alcohol Abuse Policy, for any failure or refusal to provide urine specimens when requested by Accurate C&S
          Services. Refusal to Test includes, but are not limited to, No-show (failure to appear at the test collection site for random,
          post-accident, return-to-duty and follow-up testing); Failure to remain at the testing site until the collection is completed;
          Adulteration (urine specimen containing a substance or a concentration of a substance inconsistent with human urine); Substitution
          (urine specimen containing creatinine and specific gravity levels inconsistent with human urine); Failure to cooperate with any part
          of the testing process; e.g., not responding to random selections and disputing the process. I further understand that I must submit
          to direct observation testing if a specimen test is reported as Invalid or Negative Dilute with a creatinine 2mg/dL but  5mg/dL, per
          MRO request, or per collector's request due to temp. out of range, etc. I further agree that the Service Agent may notify the CPUC,
          Employer, DOT and/or the California Highway Patrol of any non-compliance and removal from the consortium.
        </Text>
        <Text style={styles.agreementDes}>
          SERVICE FEES:For non-DOT clients: Annual enrollment is $120 in January thru June which includes enrollment for the current calendar
          year. From July to October, we pro-rate enrollment and the fee is $165 which includes enrollment through the current and next calendar
          year. From November to December, we pro-rate enrollment and the fee is $140 which includes enrollment through the current and next calendar
          year. For DOT clients: Annual enrollment is $120 in January thru October. From November to December, enrollment is pro-rated and includes
          enrollment through the current and next calendar year. I agree to these prices and understand that the enrollment must be renewed yearly.
          Annual Renewal fee is $120.00 for each calendar year (Jan.- Dec.) This fee includes all random testing and one (1) post-accid ent test
          performed WITHIN our Oakland or SF office during the enrollment period. Failure to pay this annual renewal fee in a timely manner will lead
          to removal from the drug testing consortium and the DOT, CPUC, or CHP may be notified. Non-DOT clients who let their membership lapse due
          to non-payment of the annual renewal fee will be charged $220.00 to be re-enrolled in the program. Any returned credit card charges may be
          subject to charge back fees.
        </Text>
        <Text style={styles.agreementDes}>
          SUPERVISOR TRAINING:Reasonable Suspicion training for supervisors is required. The company needs to have an individual trained in
          physical, behavioral, speech and performance indicators of probable alcohol misuse and use of a controlled substance. The purpose of
          this training is to enable supervisors to determine whether reasonable suspicion exists to require a driver to undergo testing.
          Supervisor training is $75.00 per Supervisor.
        </Text>
        <Text style={styles.agreementDes}>
          RETESTING SPLIT SPECIMEN BOTTLE B:If the donor requests a retest (i.e. wishes to test the second specimen bottle B, if there is one),
          the company must pay for the retest immediately. The cost of testing specimen bottle B is $275.
        </Text>
      </View>

      <View style={styles.signImage}>
        {props.signature && <Image src={props.signature} style={styles.signatureSign} />}
      </View>

      <View style={styles.formBox}>
        <Text style={styles.label}>Signature</Text>
      </View>

    </Page>
  </Document>
}

export default PDF