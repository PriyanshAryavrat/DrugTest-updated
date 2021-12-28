import React from "react";
import { Link, Redirect } from "react-router-dom";
import "./index.css";
import Swal from "sweetalert2";
import { Row, Col, Table, Button } from "react-bootstrap";
import Pagination from "react-js-pagination";
import apiPath from "../../../Environment/ApiPath";
import axios from "axios";
import Switch from "react-switch";

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
      driverType: "",
      clientName: "",
      companyName:"",
      company: "",
      users: [],
      currentPage: 1,
      totalRows: 10
    };
  }
  getData = (pageNumber) => {
    const url = apiPath.list_form_data;
    axios
      .get(url, {
        params: {
          page: pageNumber,
          formType: this.state.formType,
          driverType: this.state.driverType,
          clientName: this.state.clientName,
          companyName: this.state.company,
        },
      })
      .then((response) => {
        if (response.data.data.data.length > 0) {
          this.setState({
            users: response.data.data.data,
            totalRows: response.data.data.totalRecords,
            currentPage: response.data.data.pageNo
          });
        } else {
          this.setState({ users: [] });
        }
      });
  };
  handleStatusChange = (checked,event, id) => {
    const formData = new FormData();
    formData.append("userId", id);
    formData.append("status", checked);
    axios
      .post(apiPath.change_user_status, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data && res.data.status === "error") {
          Toast.fire({
            type: "error",
            title: res.data.message,
          });
          return;
        }
        Toast.fire({
          type: "success",
          title: "Status Changed Successfully!",
        });
        this.getData(this.state.currentPage);
      });
    //this.setState({ checked });
  }

  handleDeleteClient(id) {
    const formData = new FormData();
    formData.append("userId", id);
    formData.append("isDeleted", true);
    axios
      .post(apiPath.change_user_status, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data && res.data.status === "error") {
          Toast.fire({
            type: "error",
            title: res.data.message,
          });
          return;
        }
        Toast.fire({
          type: "success",
          title: "Deleted successfully!",
        });
        this.getData(this.state.currentPage);
      });
    //this.setState({ checked });
  }

  addNote(id) {
    debugger
    const url = `${apiPath.driver_comment}/${id}`;
    var raw = JSON.stringify({"comment":"hii"});
    debugger
    axios
      .put(url, raw, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((res) => {
        debugger
        if (res.data && res.data.status === "error") {
          Toast.fire({
            type: "error",
            title: res.data.message,
          });
          return;
        }
        Toast.fire({
          type: "success",
          title: "Deleted successfully!",
        });
        this.getData(this.state.currentPage);
      });
    
  }

  resetData = () => {
    this.setState(
      {
        formType: "",
        driverType: "",
        clientName: "",
        company: "",
      },
      () => {
        this.getData(1);
      }
    );
  };

  itemsStatus = (status) => {
    return (status === undefined || status === true)?true:false
  }

  componentDidMount() {
    let token = sessionStorage.getItem("authToken");
    if (!token) {
      this.setState({ redirectTo: "/login" })
    }
    this.getData(1);
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
                    <h3>Client List</h3>
                  </div>
                </Col>
                <Col lg={6} md={6} sm={6}>
                  <div className="search-btngroup pull-right">
                    <Link to="/customer" className="mr-5">
                      <button type="button" className="bluebg">
                        Add New Client
                      </button>
                    </Link>
                    <Link to="/invoice"><button type="button" className="bluebg"> Create Invoice</button></Link>
                  </div>
                </Col>
              </Row>
              </div>

              {/* <div className="formdate-modal clearfix">
                    <h3>Test Result</h3>
                  <div>
                  <div className="detailbox-table">
                  <div className="table-responsive">
                    <Table className="table table-hover tablestyle border-bottom tableth-topalign">
                      <thead>
                        <tr>
                          <th>Note</th>
                          <th>Edit</th>
                          <th>Delete</th>
                          
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.users.map((items, key) => {
                          return (
                            <tr key={key}>
                              <td>{(this.state.currentPage * 10 - 10) + key + 1}</td>
                              <td>
                                <Link
                                  to={`/admin/view-client/${items._id}`}
                                  title="View"
                                >
                                  {(items.company && (items.company.tcp || items.company.tcpStatus)) || "-"}
                                </Link>
                              </td>
                              </tr>
                          )}
                        )}
                      </tbody>
                      </Table>
                      </div>
                      </div>
                  </div>
              </div> */}

              <div className="card innercard-bg margin-bottom30 padding-top0">
                <div className="search-filter margin-top0 margin-bottom0">
                  <Row>
                    <Col lg={2} md={4} sm={4}>
                      <div className="form-group formbox selectbox">
                        <label>Forms Type</label>
                        <select
                          type="text"
                          className="form-control"
                          value={this.state.formType}
                          onChange={(e) => {
                            this.setState({ formType: e.target.value });
                          }}
                        >
                          <option value="">--select--</option>
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
                        <label>Driver Type</label>
                        <select
                          type="text"
                          value={this.state.driverType}
                          className="form-control"
                          onChange={(e) => {
                            this.setState({ driverType: e.target.value });
                          }}
                        >
                          <option value="">--select--</option>
                          <option key="OP" value="OP">
                                      Driver Only
                                        </option>
                          <option key="LM" value="LM">
                                      Owner Operator/Individual
                                        </option>
                        </select>
                      </div>
                    </Col>
                    <Col lg={2} md={4} sm={4}>
                      <div className="form-group formbox">
                        <label>Client Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Client Name"
                          value={this.state.clientName}
                          onChange={(e) => {
                            this.setState({ clientName: e.target.value });  
                          }}
                        />
                      </div>
                    </Col>
                    <Col lg={2} md={4} sm={4}>
                      <div className="form-group formbox">
                        <label>Company</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Company"
                          value={this.state.company}
                          onChange={(e) => {
                            this.setState({ company: e.target.value });
                          }}
                        />
                      </div>
                    </Col>
                    {/* <Col lg={4} md={8} sm={8}>
                      <div className="middlescreenbtn">
                        <div className="search-btngroup btnmargintop buttonleft-group">
                          <button type="button" className="bluebg mr-5" onClick={(e) => this.getData(1)}>
                            Search
                          </button>
                          <button type="button" className="redbg" onClick={(e) => this.resetData()} >
                            Reset
                          </button>
                          <a target="_blank" href={`${apiPath.list_form_data}?page=1&formType=${this.state.formType}&driverType=${this.state.driverType}&clientName=${this.state.clientName}&companyName=${this.state.companyName}&isExport=true`} className="btn bluebg">
                            Export
                          </a>
                        </div>
                      </div>
                    </Col> */}
                    <Col lg={4} md={8} sm={8}>
                      <div className="middlescreenbtn">
                        <div className="search-btngroup btnmargintop buttonleft-group">
                          <button type="button" className="bluebg mr-5" onClick={(e) => this.getData(1)}>
                            Search 
                          </button>
                          <button type="button" className="redbg mr-5" onClick={(e) => this.resetData()} >
                            Reset
                          </button>
                          <a target="_blank" href={`${apiPath.list_form_data}?page=1&formType=${this.state.formType}&driverType=${this.state.driverType}&clientName=${this.state.clientName}&companyName=${this.state.companyName}&isExport=true`} className="btn bluebg">
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
                          <th>TCP</th>
                          <th>Driver Name</th>
                          <th>Driver Type</th>
                          <th>Company Name</th>
                          <th>Company Type</th>
                          <th>DL</th>
                          <th>First Drug Test</th>
                          <th>Last Drug Test</th>
                          <th>Notes</th>
                          <th>Status</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.users.map((items, key) => {
                          return (
                            <tr key={key}>
                              <td>{(this.state.currentPage * 10 - 10) + key + 1}</td>
                              <td>
                                <Link
                                  to={`/admin/view-client/${items._id}`}
                                  title="View"
                                >
                                  {(items.company && (items.company.tcp || items.company.tcpStatus)) || "-"}
                                </Link>
                              </td>
                              <td className="fullname-column">
                                <p>
                                  <Link
                                    to={`/admin/view-client/${items._id}`}
                                    title="View"
                                  >
                                    {items.firstName} {items.middleName} {items.lastName}
                                  </Link>
                                </p>
                              </td>
                              <td>
                                <Link
                                  to={`/admin/view-client/${items._id}`}
                                  title="View"
                                >
                                  {driverTypes[items.driverType] || "-"}
                                </Link>
                              </td>
                              <td>
                                <Link
                                  to={`/admin/view-client/${items._id}`}
                                  title="View"
                                >
                                  {(items.company && items.company.companyName) || "-"}
                                </Link>
                              </td>
                              <td>
                                <Link
                                  to={`/admin/view-client/${items._id}`}
                                  title="View"
                                >
                                  {(items.company && items.company.companyType) || "-"}
                                </Link>
                              </td>
                              <td>
                                <Link
                                  to={`/admin/view-client/${items._id}`}
                                  title="View"
                                >
                                  {items.drivingLicence}
                                </Link>
                              </td>
                              <td className="datecolumn">
                                <p>
                                  <Link
                                    to={`/admin/view-client/${items._id}`}
                                    title="View"
                                  >
                                    -
                                  </Link>
                                </p>
                              </td>
                              <td className="datecolumn">
                                <p>
                                  <Link
                                    to={`/admin/view-client/${items._id}`}
                                    title="View"
                                  >
                                    -
                                  </Link>
                                </p>
                              </td>
                              <td className="switch-remove-style">
                                {/* <Button
                                  onClick={() => {
                                    this.addNote(items._id)
                                  }}
                                >
                                  {" "}
                                  <i className="mdi mdi-note" />
                              </Button> */}
                              <div><Link to="#testModal" onClick={() => {
                                          let detail = {
                                            testType: "",
                                            testDate: "",
                                            testReason: "",
                                            testResults: '',
                                            testResult: null,
                                            selectedResultType:"element.formType",
                                            driverId: "this.state.id",
                                            formId: "element._id",
                                            testTypeOther: "",
                                            attachment: null
                                          }
                                          this.setState({ drugDetail: detail, tabIndex: 1 })
                                        }
                                        } data-toggle="modal" title="View"><i className="mdi mdi-note"/></Link>
                                      </div>
                              </td>
                              <td className="switch-remove-style">
                                <Switch id={items._id} onChange={this.handleStatusChange} checked={this.itemsStatus(items.isActive)} />
                              </td>
                              <td className="switch-remove-style">
                                {/* <button type="button" onClick={() => this.handleDeleteClient(items._id)} > <i className="mdi mdi-delete" /> </button> */}
                                <Button
                                  onClick={() => {
                                    this.handleDeleteClient(items._id)
                                  }}
                                >
                                  {" "}
                                  <i className="mdi mdi-delete" />
                              </Button>
                              </td>
                            </tr>
                          );
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
            {/* Modal */}
            <div className="modal fade" id="editstatus" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel">
              <div className="modal-dialog  petitioner-modal" role="document">
                <div className="modal-content">
                  <div className="modal-header border-bottom-none">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">×</span>
                    </button>
                    <h4 className="modal-title" id="myModalLabel">
                      Edit Status
                    </h4>
                  </div>
                  <div className="modal-middle-content clearfix">
                    <div className="clearfix">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group formbox common-form selectbox form-input">
                            {/*<label>Form Type</label> */}
                            <select>
                              <option value="AC">Active</option>
                              <option value="IN">Inactive</option>
                            </select>
                            <i className="mdi mdi-chevron-down" />
                          </div>
                          <div className="form-group formbox editinput">
                            <label>Reason</label>
                            <input text="text" placeholder="Reason" />
                          </div>
                        </div>
                      </div>
                      <div className="search-btngroup margin-bottom10 pull-right">
                        <button type="button" className="bluebg">
                          Save
                        </button>
                      </div>
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
