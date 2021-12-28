import React from "react";
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

const BeneficiaryInfo = ({ formData }) => {

  let counter = 1;

  return <Table
    data={[formData]}
  >
    <TableHeader fontSize={"8px"} textAlign={"center"}>
      <TableCell weighting={0.3}>
        Sr.
        No.
</TableCell>
      <TableCell>
        Name
</TableCell>
      <TableCell>
        DOB
</TableCell>

      <TableCell>
        Current Location
</TableCell>

      <TableCell>
        Race/
        Ethnicity
</TableCell>
      <TableCell weighting={0.5}>
        Sex
</TableCell>
      <TableCell >
        Phone No.
</TableCell>
      <TableCell>
        Email
</TableCell>
      <TableCell>
        DL No.
</TableCell>
      <TableCell>
        D L State
</TableCell>
      <TableCell>
        Passport
</TableCell>
      <TableCell>
        Is Petitioner Being Tested?
</TableCell>
    </TableHeader>
    <TableBody fontSize={"7px"} textAlign={"center"} >
      <DataTableCell weighting={0.3} textAlign={"center"} getContent={(r) => counter++} />
      <DataTableCell getContent={(r) => r.middleName ? r.firstName + " " + r.middleName + " " + r.lastName : r.firstName + " " + r.lastName} />

      <DataTableCell getContent={(r) => Moment(r.dob).format("MM/DD/YYYY").toString()} />
      <DataTableCell getContent={(r) => r.currentLocation} />
      <DataTableCell getContent={(r) => r.race !== "Other" ? r.race : r.raceOther} />
      <DataTableCell weighting={0.5} getContent={(r) => sexTypes[r.gender]} />

      <DataTableCell getContent={(r) => r.phoneNumber + " " + r.phoneNumber2 + " " + r.phoneNumber3} />
      <DataTableCell getContent={(r) => r.email} />
      <DataTableCell getContent={(r) => r.drivingLicence} />
      <DataTableCell getContent={(r) => r.dlState} />
      <DataTableCell getContent={(r) => r.passport} />
      <DataTableCell getContent={(r) => r.isTested ? "Yes" : "No"} />
    </TableBody>

  </Table>
}

export default BeneficiaryInfo;

