import React, { useEffect } from "react";
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


const InfidelityInfo = ({ formData }) => {
  const getname = (additionalItems) => {
    let str = ""
    additionalItems.map((item, index) => {
      str = item.name;
      if (index !== additionalItems.length - 1) {
        str += ", ";
      }
      return str;
    })
    return str;
  }
  let counter = 1;
  return <Table
    data={[formData.relation]} margin={"100px"} weight={"10%"}
  >
    <TableHeader fontSize={"8px"} textAlign={"center"}>
      <TableCell>
        Sr. No.
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
      <TableCell>
        Sex
  </TableCell>
      <TableCell>
        Race/Ethnicity
  </TableCell>
      <TableCell>
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
      <TableCell>
        Password
  </TableCell>
      <TableCell>
        Item To Be Tested
  </TableCell>
      <TableCell>
        Additional Items
  </TableCell>
    </TableHeader>
    <TableBody fontSize={"7px"} textAlign={"center"} >
      <DataTableCell getContent={(r) => counter++} />
      <DataTableCell getContent={(r) => r.firstName + " " + r.middleName + " " + r.lastName} />
      <DataTableCell getContent={(r) => Moment(r.dob).format("MM/DD/YYYY").toString()} />
      <DataTableCell getContent={(r) => r.sampleType != "OT" ? sampleTypes[r.sampleType] : r.sampleTypeOther} />
      <DataTableCell getContent={(r) => sexTypes[r.gender]} />
      <DataTableCell getContent={(r) => r.race !== "Other" ? r.race : r.raceOther} />
      <DataTableCell getContent={(r) => r.phone} />
      <DataTableCell getContent={(r) => r.email} />
      <DataTableCell getContent={(r) => r.drivingLicence} />
      <DataTableCell getContent={(r) => r.dlState} />
      <DataTableCell getContent={(r) => r.password} />
      <DataTableCell getContent={(r) => r.itemToBeTested} />
      <DataTableCell getContent={(r) => r.additionalItems ? getname(r.additionalItems) : ""} />
    </TableBody>
  </Table>
}

export default InfidelityInfo;

