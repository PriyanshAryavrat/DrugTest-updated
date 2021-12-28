import React from "react";
import Moment from "moment";

const sampleTypes = {
  BS: "Buccal Swab",
  OS: "Other",
};
const sexTypes = {
  MA: "Male",
  FE: "Female",
};
const Alleged = ({ formData }) => {
  let counter = 1;
  return (
    <tbody>
      {formData.allegedFather && formData.allegedFather.firstName && (
        <tr>
          <td>{counter++}</td>
          <td>Alleged Father</td>
          <td className="userName-column">
            <span>
              {formData.allegedFather.firstName}
              {formData.allegedFather.middleName
                ? " " + formData.allegedFather.middleName
                : ""}{" "}
              {formData.allegedFather.lastName != ""
                ? " " + formData.allegedFather.lastName
                : ""}
            </span>
          </td>
          <td>
            {Moment(formData.allegedFather.dob).format("MM/DD/YYYY").toString()}{" "}
          </td>
          <td>
            {formData.allegedFather.sampleType !== "OT"
              ? sampleTypes[formData.allegedFather.sampleType]
              : formData.allegedFather.sampleTypeOther}{" "}
          </td>
          <td>{sexTypes[formData.allegedFather.gender]}</td>
          <td>
            {formData.allegedFather.race !== "Other"
              ? formData.allegedFather.race
              : formData.allegedFather.raceOther}
          </td>
          <td>{formData.allegedFather.phone}</td>
          <td>{formData.allegedFather.email}</td>
          {formData.formSubtype !== "Passport" && (
            <td>{formData.allegedFather.drivingLicence}</td>
          )}
          {formData.formSubtype !== "Passport" && (
            <td>
              {formData.allegedFather.drivingLicence
                ? formData.allegedFather.dlState: ""}
            </td>
          )}
          <td>{formData.allegedFather.password}</td>
        </tr>
      )}
      {formData.grandFather && formData.grandFather.firstName && (
        <tr>
          <td>{counter++}</td>
          <td>Grand Father</td>
          <td className="userName-column">
            <span>
              {formData.grandFather.firstName}
              {formData.grandFather.middleName
                ? " " + formData.grandFather.middleName
                : ""}{" "}
              {formData.grandFather.lastName != ""
                ? " " + formData.grandFather.lastName
                : ""}
            </span>
          </td>
          <td>
            {Moment(formData.grandFather.dob).format("MM/DD/YYYY").toString()}{" "}
          </td>
          <td>
            {formData.grandFather.sampleType !== "OT"
              ? sampleTypes[formData.grandFather.sampleType]
              : formData.grandFather.sampleTypeOther}{" "}
          </td>
          <td>{sexTypes[formData.grandFather.gender]}</td>
          <td>
            {formData.grandFather.race !== "Other"
              ? formData.grandFather.race
              : formData.grandFather.raceOther}
          </td>
          <td>{formData.grandFather.phone}</td>
          <td>{formData.grandFather.email}</td>
          <td>{formData.grandFather.drivingLicence}</td>
          <td>
            {formData.grandFather.drivingLicence
              ? formData.grandFather.dlState
              : ""}
          </td>
          <td>{formData.grandFather.password}</td>
        </tr>
      )}
      {formData.grandMother && formData.grandMother.firstName && (
        <tr>
          <td>{counter++}</td>
          <td>Grand Mother</td>
          <td className="userName-column">
            <span>
              {formData.grandMother.firstName}
              {formData.grandMother.middleName
                ? " " + formData.grandMother.middleName
                : ""}{" "}
              {formData.grandMother.lastName != ""
                ? " " + formData.grandMother.lastName
                : ""}
            </span>
          </td>
          <td>
            {Moment(formData.grandMother.dob).format("MM/DD/YYYY").toString()}{" "}
          </td>
          <td>
            {formData.grandMother.sampleType !== "OT"
              ? sampleTypes[formData.grandMother.sampleType]
              : formData.grandMother.sampleTypeOther}{" "}
          </td>
          <td>{sexTypes[formData.grandMother.gender]}</td>
          <td>
            {formData.grandMother.race !== "Other"
              ? formData.grandMother.race
              : formData.grandMother.raceOther}
          </td>
          <td>{formData.grandMother.phone}</td>
          <td>{formData.grandMother.email}</td>
          <td>{formData.grandMother.drivingLicence}</td>
          <td>
            {formData.grandMother.drivingLicence
              ? formData.grandMother.dlState
              : ""}
          </td>
          <td>{formData.grandMother.password}</td>
        </tr>
      )}
      {formData.allegedAunt && formData.allegedAunt.firstName && (
        <tr>
          <td>{counter++}</td>
          <td>Alleged Aunt</td>
          <td className="userName-column">
            <span>
              {formData.allegedAunt.firstName}
              {formData.allegedAunt.middleName
                ? " " + formData.allegedAunt.middleName
                : ""}{" "}
              {formData.allegedAunt.lastName != ""
                ? " " + formData.allegedAunt.lastName
                : ""}
            </span>
          </td>
          <td>
            {Moment(formData.allegedAunt.dob).format("MM/DD/YYYY").toString()}{" "}
          </td>
          <td>
            {formData.allegedAunt.sampleType !== "OT"
              ? sampleTypes[formData.allegedAunt.sampleType]
              : formData.allegedAunt.sampleTypeOther}{" "}
          </td>
          <td>{sexTypes[formData.allegedAunt.gender]}</td>
          <td>
            {formData.allegedAunt.race !== "Other"
              ? formData.allegedAunt.race
              : formData.allegedAunt.raceOther}
          </td>
          <td>{formData.allegedAunt.phone}</td>
          <td>{formData.allegedAunt.email}</td>
          <td>{formData.allegedAunt.drivingLicence}</td>
          <td>
            {formData.allegedAunt.drivingLicence
              ? formData.allegedAunt.dlState
              : ""}
          </td>
          <td>{formData.allegedAunt.password}</td>
        </tr>
      )}
      {formData.allegedUncle && formData.allegedUncle.firstName && (
        <tr>
          <td>{counter++}</td>
          <td>Alleged Uncle</td>
          <td className="userName-column">
            <span>
              {formData.allegedUncle.firstName}
              {formData.allegedUncle.middleName
                ? " " + formData.allegedUncle.middleName
                : ""}{" "}
              {formData.allegedUncle.lastName != ""
                ? " " + formData.allegedUncle.lastName
                : ""}
            </span>
          </td>
          <td>
            {Moment(formData.allegedUncle.dob).format("MM/DD/YYYY").toString()}{" "}
          </td>
          <td>
            {formData.allegedUncle.sampleType !== "OT"
              ? sampleTypes[formData.allegedUncle.sampleType]
              : formData.allegedUncle.sampleTypeOther}{" "}
          </td>
          <td>{sexTypes[formData.allegedUncle.gender]}</td>
          <td>
            {formData.allegedUncle.race !== "Other"
              ? formData.allegedUncle.race
              : formData.allegedUncle.raceOther}
          </td>
          <td>{formData.allegedUncle.phone}</td>
          <td>{formData.allegedUncle.email}</td>
          <td>{formData.allegedUncle.drivingLicence}</td>
          <td>
            {formData.allegedUncle.drivingLicence
              ? formData.allegedUncle.dlState
              : ""}
          </td>
          <td>{formData.allegedUncle.password}</td>
        </tr>
      )}
      {formData.allegedMother && formData.allegedMother.firstName && (
        <tr>
          <td>{counter++}</td>
          <td>Mother</td>
          <td className="userName-column">
            <span>
              {formData.allegedMother.firstName}
              {formData.allegedMother.middleName
                ? " " + formData.allegedMother.middleName
                : ""}{" "}
              {formData.allegedMother.lastName != ""
                ? " " + formData.allegedMother.lastName
                : ""}
            </span>
          </td>
          <td>
            {Moment(formData.allegedMother.dob).format("MM/DD/YYYY").toString()}{" "}
          </td>
          <td>
            {formData.allegedMother.sampleType !== "OT"
              ? sampleTypes[formData.allegedMother.sampleType]
              : formData.allegedMother.sampleTypeOther}{" "}
          </td>
          <td>{sexTypes[formData.allegedMother.gender]}</td>
          <td>
            {formData.allegedMother.race !== "Other"
              ? formData.allegedMother.race
              : formData.allegedMother.raceOther}
          </td>
          <td>{formData.allegedMother.phone}</td>
          <td>{formData.allegedMother.email}</td>
          {formData.formSubtype !== "Passport" && (
            <td>{formData.allegedMother.drivingLicence}</td>
          )}
          {formData.formSubtype !== "Passport" && (
            <td>
              {formData.allegedMother.drivingLicence
                ? formData.allegedMother.dlState
                : ""}
            </td>
          )}
          <td>{formData.allegedMother.password}</td>
        </tr>
      )}
      {formData.mother2 && formData.mother2.firstName && (
        <tr>
          <td>{counter++}</td>
          <td>Mother 2</td>
          <td className="userName-column">
            <span>
              {formData.mother2.firstName}
              {formData.mother2.middleName
                ? " " + formData.mother2.middleName
                : ""}{" "}
              {formData.mother2.lastName != ""
                ? " " + formData.mother2.lastName
                : ""}
            </span>
          </td>
          <td>
            {Moment(formData.mother2.dob).format("MM/DD/YYYY").toString()}{" "}
          </td>
          <td>
            {formData.mother2.sampleType !== "OT"
              ? sampleTypes[formData.mother2.sampleType]
              : formData.mother2.sampleTypeOther}{" "}
          </td>
          <td>{sexTypes[formData.mother2.gender]}</td>
          <td>
            {formData.mother2.race !== "Other"
              ? formData.mother2.race
              : formData.mother2.raceOther}
          </td>
          <td>{formData.mother2.phone}</td>
          <td>{formData.mother2.email}</td>
          <td>{formData.mother2.drivingLicence}</td>
          <td>
            {formData.mother2.drivingLicence ? formData.mother2.dlState : ""}
          </td>
          <td>{formData.mother2.password}</td>
        </tr>
      )}
      {formData.child1 && formData.child1.firstName && (
        <tr>
          <td>{counter++}</td>
          <td>Child 1</td>
          <td className="userName-column">
            <span>
              {formData.child1.firstName}
              {formData.child1.middleName
                ? " " + formData.child1.middleName
                : ""}{" "}
              {formData.child1.lastName != ""
                ? " " + formData.child1.lastName
                : ""}
            </span>
          </td>
          <td>
            {Moment(formData.child1.dob).format("MM/DD/YYYY").toString()}{" "}
          </td>
          <td>
            {formData.child1.sampleType !== "OT"
              ? sampleTypes[formData.child1.sampleType]
              : formData.child1.sampleTypeOther}{" "}
          </td>
          <td>{sexTypes[formData.child1.gender]}</td>
          <td>
            {formData.child1.race !== "Other"
              ? formData.child1.race
              : formData.child1.raceOther}
          </td>
          <td>{formData.child1.phone}</td>
          <td>{formData.child1.email}</td>
          <td>{formData.child1.drivingLicence}</td>
          <td>
            {formData.child1.drivingLicence ? formData.child1.dlState : ""}
          </td>
          <td>{formData.child1.password}</td>
          {/* <td>
            <div className="action-group">
              <Link to="#" title="Edit">
                <i className="mdi mdi-pencil"></i>
              </Link>
            </div>
          </td> */}
        </tr>
      )}
      {formData.child2 && formData.child2.firstName && (
        <tr>
          <td>{counter++}</td>
          <td>Child 2</td>
          <td className="userName-column">
            <span>
              {formData.child2.firstName}
              {formData.child2.middleName
                ? " " + formData.child2.middleName
                : ""}{" "}
              {formData.child2.lastName != ""
                ? " " + formData.child2.lastName
                : ""}
            </span>
          </td>
          <td>
            {Moment(formData.child2.dob).format("MM/DD/YYYY").toString()}{" "}
          </td>
          <td>
            {formData.child2.sampleType !== "OT"
              ? sampleTypes[formData.child2.sampleType]
              : formData.child2.sampleTypeOther}{" "}
          </td>
          <td>{sexTypes[formData.child2.gender]}</td>
          <td>
            {formData.child2.race !== "Other"
              ? formData.child2.race
              : formData.child2.raceOther}
          </td>
          <td>{formData.child2.phone}</td>
          <td>{formData.child2.email}</td>
          <td>{formData.child2.drivingLicence}</td>
          <td>
            {formData.child2.drivingLicence ? formData.child2.dlState : ""}
          </td>
          <td>{formData.child2.password}</td>
          {/* <td>
            <div className="action-group">
              <Link to="#" title="Edit">
                <i className="mdi mdi-pencil"></i>
              </Link>
            </div>
          </td> */}
        </tr>
      )}
      {formData.other && formData.other.firstName && (
        <tr>
          <td>{counter++}</td>
          <td>{formData.relationshipOther}</td>
          <td className="userName-column">
            <span>
              {formData.other.firstName}
              {formData.other.middleName
                ? " " + formData.other.middleName
                : ""}{" "}
              {formData.other.lastName != ""
                ? " " + formData.other.lastName
                : ""}
            </span>
          </td>
          <td>{Moment(formData.other.dob).format("MM/DD/YYYY").toString()} </td>
          <td>
            {formData.other.sampleType !== "OT"
              ? sampleTypes[formData.other.sampleType]
              : formData.other.sampleTypeOther}{" "}
          </td>
          <td>{sexTypes[formData.other.gender]}</td>
          <td>
            {formData.other.race !== "Other"
              ? formData.other.race
              : formData.other.raceOther}
          </td>
          <td>{formData.other.phone}</td>
          <td>{formData.other.email}</td>
          {formData.formSubtype !== "Passport" && (
            <td>{formData.other.drivingLicence}</td>
          )}
          {formData.formSubtype !== "Passport" && (
            <td>
              {formData.other.drivingLicence ? formData.other.dlState : ""}
            </td>
          )}
          <td>{formData.other.password}</td>
        </tr>
      )}
      {formData.child && formData.child.firstName && (
        <tr>
          <td>{counter++}</td>
          <td>Child</td>
          <td className="userName-column">
            <span>
              {formData.child.firstName}
              {formData.child.middleName
                ? " " + formData.child.middleName
                : ""}{" "}
              {formData.child.lastName != ""
                ? " " + formData.child.lastName
                : ""}
            </span>
          </td>
          <td>{Moment(formData.child.dob).format("MM/DD/YYYY").toString()} </td>
          <td>
            {formData.child.sampleType !== "OT"
              ? sampleTypes[formData.child.sampleType]
              : formData.child.sampleTypeOther}{" "}
          </td>
          <td>{sexTypes[formData.child.gender]}</td>
          <td>
            {formData.child.race !== "Other"
              ? formData.child.race
              : formData.child.raceOther}
          </td>
          <td>{formData.child.phone}</td>
          <td>{formData.child.email}</td>
          {formData.formSubtype !== "Passport" && (
            <td>{formData.child.drivingLicence}</td>
          )}
          {formData.formSubtype !== "Passport" && (
            <td>
              {formData.child.drivingLicence ? formData.child.dlState : ""}
            </td>
          )}
          <td>{formData.child.password}</td>
        </tr>
      )}
      {formData.relation && formData.relation.firstName && (
        <tr>
          <td>{counter++}</td>
          <td className="userName-column">
            <span>
              {formData.relation.firstName}
              {formData.relation.middleName
                ? " " + formData.relation.middleName
                : ""}{" "}
              {formData.relation.lastName != ""
                ? " " + formData.relation.lastName
                : ""}
            </span>
          </td>
          <td>
            {Moment(formData.relation.dob).format("MM/DD/YYYY").toString()}{" "}
          </td>
          <td>
            {formData.relation.sampleType !== "OT"
              ? sampleTypes[formData.relation.sampleType]
              : formData.relation.sampleTypeOther}{" "}
          </td>
          <td>{sexTypes[formData.relation.gender]}</td>
          <td>
            {formData.relation.race !== "Other"
              ? formData.relation.race
              : formData.relation.raceOther}
          </td>
          <td>{formData.relation.phone}</td>
          <td>{formData.relation.email}</td>
          {formData.formSubtype !== "Passport" && (
            <td>{formData.relation.drivingLicence}</td>
          )}
          {formData.formSubtype !== "Passport" && (
            <td>
              {formData.relation.drivingLicence
                ? formData.relation.dlState
                : ""}
            </td>
          )}
          <td>{formData.relation.password}</td>
          <td>{formData.relation.itemToBeTested}</td>
          <td>
            {formData.additionalItems.map((item, index) => {
              let str = item.name;
              if (index !== formData.additionalItems.length - 1) {
                str += ", ";
              }
              return str;
            })}
          </td>
        </tr>
      )}
      {formData.additionalPersons && (
        <AdditionalPersons
          persons={formData.additionalPersons}
          counter={counter}
          sexTypes={sexTypes}
          sampleTypes={sampleTypes}
          formSubtype={formData.formSubtype}
        />
      )}
    </tbody>
  );
};
export default Alleged;

const AdditionalPersons = ({
  persons,
  counter,
  sexTypes,
  sampleTypes,
  formSubtype,
}) => {
  return (
    persons &&
    persons.map((item) => {
      if (item.firstName) {
        return (
          <tr key={item.relation}>
            <td>{counter++}</td>
            <td>{item.relation}</td>
            <td className="userName-column">
              <span>
                {item.firstName}
                {item.middleName ? " " + item.middleName : ""}{" "}
                {item.lastName != "" ? " " + item.lastName : ""}
              </span>
            </td>
            <td>{Moment(item.dob).format("MM/DD/YYYY").toString()} </td>
            <td>
              {item.sampleType !== "OT"
                ? sampleTypes[item.sampleType]
                : item.sampleTypeOther}{" "}
            </td>
            <td>{sexTypes[item.gender]}</td>
            <td>{item.race !== "Other" ? item.race : item.raceOther}</td>
            <td>{item.phone}</td>
            <td>{item.email}</td>
            {formSubtype !== "Passport" && <td>{item.drivingLicence}</td>}
            {formSubtype !== "Passport" && (
              <td>{item.drivingLicence ? item.dlState : ""}</td>
            )}
            <td>{item.password}</td>
          </tr>
        );
      }
    })
  );
};
