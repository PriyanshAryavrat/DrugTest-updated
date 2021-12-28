import React from "react";
import { Link, Redirect } from "react-router-dom";
import "./index.css";
import Swal from "sweetalert2";
import { Row, Col, Table } from "react-bootstrap";
import Pagination from "react-js-pagination";
import apiPath from "../../../Environment/ApiPath";
import axios from "axios";
import Switch from "react-switch";
import Moment from "moment";
const driverTypes = {
  "OP": "Owner Operator/Individual",
  "LM": "LLC Member",
  "CO": "Corporate Officer",
  "DO": "Driver Only",
}

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
});

class SubscriptionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      formType: "",
      driverType: "",
      clientName: "",
      company: "",
      users: [],
      currentPage: 1,
      totalRows: 10
    };
  }
  getData = () => {
    const url = apiPath.list_subscriptions;
    axios
      .get(url, {
        // params: {
        //   page: pageNumber,
        //   formType: this.state.formType,
        //   driverType: this.state.driverType,
        //   clientName: this.state.clientName,
        //   companyName: this.state.company,
        // },
      })
      .then((response) => {

        if (response.data.data.length > 0) {
          this.setState({
            users: response.data.data,
          });
        } else {
          this.setState({ users: [] });
        }
      });
  };
  resetData = () => {
    this.setState(
      {
        formType: "",
        driverType: "",
        clientName: "",
        company: "",
      },
      () => {
        this.getData();
      }
    );
  };

  itemsStatus = (status) => {
    return (status === undefined || status === true) ? true : false
  }

  componentDidMount() {
    let token = sessionStorage.getItem("authToken");
    if (!token) {
      this.setState({ redirectTo: "/login" })
    }
    this.getData();
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo} />;
    }
    return (
      <React.Fragment>
        <div className="content-outer">
          <div className="content-wrapper">
            <div className="main-content">
              <div className="page-header">
                <Row>
                  <Col lg={6} md={6} sm={6}>
                    <div className="topheading">
                      <h3>Subscription List</h3>
                    </div>
                  </Col>
                  <Col lg={6} md={6} sm={6}>
                    <div className="search-btngroup pull-right">
                      {/* <Link to="/customerForm" className="mr-5">
                      <button type="button" className="bluebg">
                        Add New Client
                      </button>
                    </Link> */}
                    <a target="_blank" href={`${apiPath.list_subscriptions}?isExport=true`} className="btn bluebg">
                            Export
                    </a>
                    </div>
                  </Col>
                </Row>
              </div>


              <div className="card innercard-bg margin-bottom30 padding-top0">

                <div className="detailbox-table">
                  <div className="table-responsive">
                    <Table className="table table-hover tablestyle border-bottom tableth-topalign">
                      <thead>
                        <tr>
                          <th>Sr. No.</th>
                          <th>TCP</th>
                          <th>Driver Name</th>
                          <th>DL</th>
                          <th>Company Name</th>
                          <th>Start Date</th>
                          <th>End Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.users.map((items, key) => {
                          let { company, driver } = items;
                          return (
                            <tr key={key}>
                              <td>{key + 1}</td>
                              <td>
                                {(company && (company.tcp || company.tcpStatus)) || "-"}
                              </td>
                              <td className="fullname-column">
                                {(driver && (driver.firstName + (driver.middleName || "") + (driver.lastName || "")) || "-")}
                              </td>
                              <td>
                                {(driver && (driver.drivingLicence) || "-")}

                              </td>
                              <td>
                                {(company && company.companyName) || "-"}

                              </td>
                              <td>
                                {Moment(items.startDate).format("MM/DD/YYYY").toString()}{" "}

                              </td>
                              <td>
                                {items.type && (items.type == "CPUC" || items.type== "DOT") && Moment(items.endDate).format("MM/DD/YYYY").toString()}{" "}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                    <div className="right-pagination">
                      <Pagination
                        activeClass={this.state.activePage}
                        activeLinkClass={"page-link active"}
                        itemClass={"page-item"}
                        linkClass={"page-link"}
                        activePage={this.state.currentPage}
                        itemsCountPerPage={10}
                        totalItemsCount={this.state.totalRows}
                        pageRangeDisplayed={5}
                        prevPageText="Previous"
                        nextPageText="Next"
                        firstPageText="<"
                        lastPageText=">"
                        onChange={(pageNumber) => {
                          this.getData(pageNumber);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SubscriptionList;
