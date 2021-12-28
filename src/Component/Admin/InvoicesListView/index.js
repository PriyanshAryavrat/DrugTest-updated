import React from "react";
import { Link, Redirect } from "react-router-dom";
import "./index.css";
import Swal from "sweetalert2";
import { Row, Col, Table } from "react-bootstrap";
import Pagination from "react-js-pagination";
import apiPath from "../../../Environment/ApiPath";
import axios from "axios";
import Moment from 'moment';

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

class ClientList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      formType: "",
      invoiceTo:"",
      invoiceDate:"",
      invoiceStatus:"",
      invoices: [],
      currentPage: 1,
      totalRows: 10
    };
  }


  getData = (pageNumber) => {
    const url = apiPath.list_invoices;
    axios
      .get(url, {
        params: {
          page: pageNumber,
          formType: this.state.formType,
          invoiceTo: this.state.invoiceTo,
          invoiceDate: this.state.invoiceDate,
          invoiceStatus: this.state.invoiceStatus,
        },
      })
      .then((response) => {
        if (response.data.data.data.length > 0) {
          this.setState({
            invoices: response.data.data.data,
            totalRows: response.data.data.totalRecords,
            currentPage: response.data.data.pageNo
          });
        } else {
          this.setState({ invoices: [] });
        }
      });
  };

  resetData = () => {
    this.setState(
      {
        formType: "",
        invoiceTo:"",
        invoiceDate:"",
        invoiceStatus:"",
      },
      () => {
        this.getData(1);
      }
    );
  };

  componentDidMount() {
    let token = sessionStorage.getItem("authToken");
    if (!token) {
      this.setState({ redirectTo: "/login" })
    }
    this.getData(1);
  }

  deleteInvoice = (e) => {
    const url = apiPath.delete_invoice + "/" + e.target.dataset.id;
    axios
      .get(url, {
        params: {},
      })
      .then((res) => {
        if (res.data && res.data.status === "failure") {
          Toast.fire({
            type: "error",
            title: res.data.message,
          });
          return;
        }
        Toast.fire({
          type: "success",
          title: "Data Saved Successfully!",
        });
        this.getData();
      });
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
                    <h3>Invoices List</h3>
                  </div>
                </Col>
                <Col lg={6} md={6} sm={6}>
                  <div className="search-btngroup pull-right">
                    <Link to="/invoice"><button type="button" className="bluebg"> Create Invoice</button></Link>
                  </div>
                </Col>
              </Row>
              </div>
              <div className="card innercard-bg margin-bottom30 padding-top0">
                <div className="search-filter margin-top0 margin-bottom0">
                  <Row>
                    <Col lg={2} md={4} sm={4}>
                      <div className="form-group formbox selectbox">
                        <label>Invoice To</label>
                        <input type="text"
                          value={this.state.invoiceTo}
                          onChange={(e) => {
                            this.setState({ invoiceTo: e.target.value });
                          }}
                          className="form-control"
                          placeholder="Invoice To" />
                      </div>
                    </Col>
                    <Col lg={2} md={4} sm={4}>
                      <div className="form-group formbox">
                        <label>Invoice Date</label>
                        <input type="Date"
                        value={this.state.invoiceDate}
                        onChange={(e) => {
                          this.setState({ invoiceDate: e.target.value });
                        }}
                        className="form-control" placeholder="DD/MM/YYYY"  />
                      </div>
                    </Col>
                    <Col lg={2} md={4} sm={4}>
                      <div className="form-group formbox selectbox">
                        <label>Forms</label>
                        <select className="form-control"
                        value={this.state.formType}
                        onChange={(e) => {
                          this.setState({ formType: e.target.value });
                        }}
                        >
                          <option value="">--Select--</option>
                          <option value="CPUC">CPUC</option>
                          <option value="DOT">DOT</option>
                          <option value="ALC">ALC</option>
                          <option value="DNA">DNA</option>
                          <option value="USCG">USCG</option>
                          <option value="Taxi">Taxi</option>
                          <option value="Personal">Personal</option>
                          <option value="Lan Do">Lando</option>
                        </select>
                      </div>
                    </Col>
                    <Col lg={2} md={4} sm={4}>
                      <div className="form-group formbox selectbox">
                        <label>Status</label>
                        <select className="form-control" onChange={(e) => {
                            this.setState({ invoiceStatus: e.target.value });
                          }}>
                          <option value="">--Select Status--</option>
                          <option value="Paid">Paid</option>
                          <option value="Pending">Pending </option>
                          {/* <option value="F">Failed </option> */}
                          </select>
                          </div>
                    </Col>
                    <Col lg={4} md={8} sm={8}>
                      <div className="middlescreenbtn">
                        <div className="search-btngroup btnmargintop buttonleft-group">
                          <button type="button" className="bluebg mr-5" onClick={(e) => this.getData(1)}>
                            Search
                          </button>
                          <button type="button" className="redbg mr-5" onClick={(e) => this.resetData()} >
                            Reset
                          </button>
                          <a target="_blank" href={`${apiPath.list_invoices}?invoiceTo=${this.state.invoiceTo}&formType=${this.state.formType}&invoiceDate=${this.state.invoiceDate}&invoiceStatus=${this.state.invoiceStatus}&isExport=true`} className="btn bluebg">
                            Export
                          </a>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="detailbox-table">
                  <div className="table-responsive">
                    <Table className="table table-hover tablestyle border-bottom tableth-topalign">
                      <thead>
                        <tr>
                          <th>Sr. No.</th>
                          <th>Invoice No</th>
                          <th>Invoice Date</th>
                          <th>Invoice To</th>
                          <th>Form Type</th>
                          <th>Amount</th>
                          <th className="text-center">Status</th>
                          <th className="text-right column-width60">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.invoices.map( (item, key) => {
                          return (
                            <tr  key={key}>
                            <td>{(this.state.currentPage * 10 - 10) + key + 1}</td>
                            <td>{item.invoiceNumber}</td>
                            <td>{Moment(item.invoiceDate).format('MM/DD/YYYY').toString()}</td>
                            <td>{item.invoiceTo}</td>
                            <td>{item.driverType}</td>
                            <td>{item.invoiceTotal}</td>
                            <td className="green-text text-center"><strong>{item.status}</strong></td>
                            <td className="action-group text-right column-width60">
                              <div className="table-dropdown">
                                <i className="mdi mdi-dots-horizontal"></i>
                                <ul className="action-dropdown">
                                  <li><Link to={`/admin/view-invoice/${item._id}`}><i className="mdi mdi-eye bg-green"></i> View </Link></li>
                                  <li><Link to={`/admin/edit-invoice/${item._id}`}><i className="mdi mdi-square-edit-outline bluebg"></i> Edit </Link></li>
                                  <li><a href="javascript:null" data-id={item._id} onClick={this.deleteInvoice}><i className="mdi mdi-trash-can redbg"></i> Delete </a></li>
                                </ul>
                              </div>
                            </td>
                          </tr>
                          )
                        })}
                      </tbody>
                    </Table>
                    <div className="right-pagination">
                    <Pagination
                      activeClass={this.state.activePage.toString()}
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

export default ClientList;
