import React, { useEffect, useState } from "react";
import Moment from "moment";

import { Table, TableHeader, TableCell, DataTableCell, TableBody } from "@david.kucsai/react-pdf-table";
const sampleTypes = {
  BS: "Buccal Swab",
  OS: "Other",
};
const sexTypes = {
  MA: "Male",
  FE: "Female",
};

const Alleged = ({ formData }) => {

  const [data, setData] = useState([]);
  useEffect(() => {

    let alldata = [];
    if (formData.allegedFather && formData.allegedFather.firstName) {
      formData.allegedFather.relation = "Alleged Father"
      alldata.push(formData.allegedFather);
    }
    if (formData.grandFather && formData.grandFather.firstName) {
      formData.grandFather.relation = "Grand Father"
      alldata.push(formData.grandFather);
    }
    if (formData.grandMother && formData.grandMother.firstName) {
      formData.grandMother.relation = "Grand Mother"
      alldata.push(formData.grandMother);
    }
    if (formData.allegedAunt && formData.allegedAunt.firstName) {
      formData.allegedAunt.relation = "Alleged Aunt"
      alldata.push(formData.allegedAunt);
    }
    if (formData.allegedUncle && formData.allegedUncle.firstName) {
      formData.allegedUncle.relation = "Alleged Uncle"
      alldata.push(formData.allegedUncle);
    }
    if (formData.allegedMother && formData.allegedMother.firstName) {
      formData.allegedMother.relation = "Alleged Mother"
      alldata.push(formData.allegedMother);
    }
    if (formData.mother2 && formData.mother2.firstName) {
      formData.mother2.relation = "Mother 2"
      alldata.push(formData.mother2);
    }
    if (formData.child1 && formData.child1.firstName) {
      formData.child1.relation = "Child 1"
      alldata.push(formData.child1);
    }
    if (formData.child2 && formData.child2.firstName) {
      formData.child2.relation = "Child 2"
      alldata.push(formData.child2);
    }
    if (formData.other && formData.other.firstName) {
      formData.other.relation = formData.other.relationshipOther
      alldata.push(formData.other);
    }
    if (formData.child && formData.child.firstName) {
      formData.child.relation = "Child"
      alldata.push(formData.child);
    }
    if (formData.additionalPersons) {
      alldata.push(...formData.additionalPersons);
    }
    setData(alldata);
  }, [formData]);
  let counter = 1;

  return <Table
    data={data}
  >
    <TableHeader fontSize={"8px"} textAlign={"center"}>
      <TableCell weighting={0.3}>
        Sr.
        No.
</TableCell>
      <TableCell>
        Relation
</TableCell>
      <TableCell>
        Name
</TableCell>
      <TableCell>
        DOB
</TableCell>
      <TableCell>
        Sample Type
</TableCell>
      <TableCell weighting={0.5}>
        Sex
</TableCell>
      <TableCell>
        Race/
        Ethnicity
</TableCell>
      <TableCell >
        Phone No.
</TableCell>
      <TableCell>
        Email
</TableCell>
      <TableCell>
        DL Number
</TableCell>
      <TableCell>
        DL State
</TableCell>
      <TableCell >
        Password
</TableCell>
    </TableHeader><TableBody fontSize={"7px"} textAlign={"center"} >
      <DataTableCell weighting={0.3} textAlign={"center"} getContent={(r) => counter++} />
      <DataTableCell getContent={(r) => r.relation} />
      <DataTableCell getContent={(r) => r.middleName ? r.firstName + " " + r.middleName + " " + r.lastName : r.firstName + " " + r.lastName} />

      <DataTableCell getContent={(r) => Moment(r.dob).format("MM/DD/YYYY").toString()} />
      <DataTableCell getContent={(r) => r.sampleType != "OT" ? sampleTypes[r.sampleType] : r.sampleTypeOther} />
      <DataTableCell weighting={0.5} getContent={(r) => sexTypes[r.gender]} />
      <DataTableCell getContent={(r) => r.race !== "Other" ? r.race : r.raceOther} />
      <DataTableCell getContent={(r) => r.phone} />
      <DataTableCell getContent={(r) => r.email} />
      <DataTableCell getContent={(r) => r.drivingLicence} />
      <DataTableCell getContent={(r) => r.dlState} />
      <DataTableCell getContent={(r) => r.password} />
    </TableBody>

  </Table>
}

export default Alleged;

