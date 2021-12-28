import React, { Component } from 'react'
import styles from './Invoice.module.scss'
import LineItems from './LineItems'
import { Row, Col } from "react-bootstrap";
import uuid from 'react-uuid'
import { Link, Redirect } from 'react-router-dom';
import Moment from 'moment';
import apiPath from "../../Environment/ApiPath";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ValidatorForm } from "react-form-validator-core";
import TextValidator from "../../Form/TextValidator/Index";
import Swal from "sweetalert2";
import {
  Accurate_logo1,
} from '../../../src/assets/images';
import "./index.css";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
});


class Invoice extends Component {

  locale = 'en-US'
  currency = 'USD'

  state = {
    
  }

  constructor(props) {
    super(props);
    let { id } = this.props.match.params;
    this.state = {
      id: id,
      priceListObj:{},
      taxRate: 0.00,
      // invoiceDate:Moment().format('MM/DD/YYYY').toString(),
      lineItems: [
        {
          id: 'initial',      // react-beautiful-dnd unique key
          itemId: '',
          name:"",
          description: '',
          quantity: 1,
          price: 0.00,
          qbRefId:"",
        },
      ],
      description:"",
      invoiceNumber:"",
      currentPage: 1,
      totalRows: 100,
      driverType: "",
      clientsList:[],
      priceList:[],
    }
  }

  componentDidMount() {
    let token = sessionStorage.getItem("authToken");
    if(!token){
      this.setState({redirectTo:"/login"})
    }
    if(this.state.id){
      const url = `${apiPath.invoice_detail}/${this.state.id}`;
      axios.get(url).then((response) => {
        console.log(response.data.data);
        let invoiceData = response.data.data;

        if(!invoiceData){
          return this.setState({redirectTo:'/admin'})
        }
        this.getClientsList(1,invoiceData.formType);
        this.getPriceList(invoiceData.formType);
        invoiceData.invoiceDate = new Date(invoiceData.invoiceDate);
        this.setState({...invoiceData});
      });
    }
  }

  handleInvoiceChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleLineItemChange = (elementIndex) => (event) => {
    let lineItems = this.state.lineItems.map((item, i) => {
      if (elementIndex !== i) return item
      if(event.target.name == "name" && this.state.priceListObj[event.target.value] !== undefined){
        console.log(event.target);
        let itemData = {
          ...item,
          [event.target.name]: event.target.value,
          "itemId":event.target.value,
          "description":this.state.priceListObj[event.target.value].price_text,
          "qbRefId":this.state.priceListObj[event.target.value].qbRefId
        };
        if(this.state.priceListObj[event.target.value].price > 0){
          itemData["price"] = this.state.priceListObj[event.target.value].price;
        } else {
          itemData["price"] = 0;
        }
        return itemData;
      } else {
        return {...item, [event.target.name]: event.target.value}
      }
    })
    this.setState({lineItems})
  }

  handleAddLineItem = (event) => {
    this.setState({
      // use optimistic uuid for drag drop; in a production app this could be a database id
      lineItems: this.state.lineItems.concat(
        [{ id: uuid(), name: '', description: '', quantity: 0, price: 0.00 }]
      )
    })
  }

  handleRemoveLineItem = (elementIndex) => (event) => {
    this.setState({
      lineItems: this.state.lineItems.filter((item, i) => {
        return elementIndex !== i
      })
    })
  }

  handleReorderLineItems = (newLineItems) => {
    this.setState({
      lineItems: newLineItems,
    })
  }

  handleFocusSelect = (event) => {
    event.target.select()
  }

  handlePayButtonClick = () => {
    alert('Not implemented')
  }

  formatCurrency = (amount) => {
    return (new Intl.NumberFormat(this.locale, {
      style: 'currency',
      currency: this.currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount))
  }

  calcTaxAmount = (c) => {
    return c * (this.state.taxRate / 100)
  }

  calcLineItemsTotal = () => {
    return this.state.lineItems.reduce((prev, cur) => (prev + (cur.quantity * cur.price)), 0)
  }

  calcTaxTotal = () => {
    return this.calcLineItemsTotal() * (this.state.taxRate / 100)
  }

  calcGrandTotal = () => {
    return this.calcLineItemsTotal() + this.calcTaxTotal()
  }

  handleDriverTypeChange = (e) => {
    this.setState({
      driverType: e.target.value
    })
    this.getClientsList(1,e.target.value);
    this.getPriceList(e.target.value);
  }

  getClientsList = (pageNumber, formType) => {
    const url = apiPath.list_form_data;
    axios
      .get(url, {
        params: {
          page: pageNumber,
          formType: formType,
          // driverType: this.state.driverType,
          // clientName: this.state.clientName,
          // companyName: this.state.company,
        },
      })
      .then((response) => {
        if (response.data.data.data.length > 0) {
          this.setState({
            clientsList: response.data.data.data,
            totalRows: response.data.data.totalRecords,
            currentPage: response.data.data.pageNo
          });
        } else {
          this.setState({ clientsList: [] });
        }
      });
  };

  getPriceList = (formType) => {
    const url = apiPath.list_prices;
    axios
      .get(url, {
        params: {
          formType: formType
        },
      })
      .then((response) => {
        if (response.data.data.length > 0) {
          let priceListObj = {}
          for(const item of response.data.data){
            priceListObj[item._id] = item;
          }
          this.setState({
            priceList: response.data.data,
            priceListObj:priceListObj
          });
        } else {
          this.setState({ priceList: [] });
        }
      });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    let isValid = true;
    let errObj = {};
    // if (!this.state.signature) {
    //   errObj["fileError"] = "Please add a signature";
    //   isValid = false;
    // }
    // if (!this.state.agreeToTerms) {
    //   errObj["termsError"] = "You must agree to terms and conditions";
    //   isValid = false;
    // }
    if (!isValid) {
      this.setState(errObj);
      return;
    }

    let formData = {
      invoiceNumber:this.state.invoiceNumber,
      invoiceDate:this.state.invoiceDate,
      invoiceTotal:this.calcGrandTotal(),
      driverType: this.state.driverType,
      driverId: this.state.driverId,
      lineItems:this.state.lineItems,
      description:this.state.description
    }

    axios
    .post(apiPath.create_invoice, formData, {
      headers: {
        "content-type": "application/json",
      },
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
        setTimeout(() => {
          this.setState({ redirectTo: "/invoices-list"});
        }, 2000);
      });
  };

  render = () => {
    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo} />;
    }
    return (
      <ValidatorForm
          ref="form"
          instantValidate="true"
          onError={(e) => {
            this.preventDefault();
            console.log(this.refs.form.errorMessages);
            console.log("Form Errors");
          }}
          onSubmit={this.handleSubmit}
        >
      <div className="invoice-background">
        <div className={styles.invoice}>
          <Row>
            <Col lg={6} md={6} sm={6}>
            <div className={styles.brand}>
              <img src={Accurate_logo1} alt="Logo" className={styles.logo}/>
            </div>
            </Col>
            <Col lg={6} md={6} sm={6}>
              <div className="search-btngroup buttonleft-group pull-right">
                <Link to="/admin">
                  <button type="button" className="redbg mr-5">Cancel </button>
                </Link>
                {/* <button type="button" className="bluebg mr-5">Update</button> */}
                <button type="submit" className="bluebg ">Save</button>
              </div>
            </Col>
          </Row>

          <div className="invoice-search">
            <Row>
              <Col lg={4} md={4} sm={4}>
                <div className="form-group formbox selectbox">
                  <label>Company/Driver Type<sup className="redstarText">*</sup></label>
                  <TextValidator
                        validators={["required"]}
                        errorMessages={["This field is required"]}
                        type="select"
                        value={this.state.driverType}
                        onChange={this.handleDriverTypeChange}
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
                    </TextValidator>
                </div>
              </Col>
              <Col lg={4} md={4} sm={4}>
                <div className="form-group formbox selectbox">
                  <label>Company/Driver<sup className="redstarText">*</sup></label>
                  <TextValidator
                        validators={["required"]}
                        errorMessages={["This field is required"]}
                        type="select"
                        value={this.state.driverId}
                        onChange={(e) => {
                          this.setState({
                            driverId:e.target.value
                          })
                        }}
                      >
                    <option value="">--Select--</option>
                    {this.state.clientsList.map((item)=> {
                      return (<option value={item._id}>{item.firstName}</option>)
                    })}
                  </TextValidator>
                </div>
              </Col>
              <Col lg={4} md={4} sm={4}>
                <div className="form-group formbox selectbox">
                  <label>Invoice Date<sup className="redstarText">*</sup></label>
                  <DatePicker
                    placeholderText="Select a date"
                    selected={this.state.invoiceDate}
                    onChange={(date) => {
                      console.log(date.toISOString());
                      this.setState({
                        invoiceDate: date,
                      });
                    }}
                    // minDate={new Date()}
                    className="form-control"
                    name="invoiceDate"
                    dateFormat="MM/dd/yyyy"
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                  />
                  <TextValidator
                    name="invoiceDate"
                    className="mrgbotm"
                    tabIndex={-1}
                    autoComplete="off"
                    style={{ opacity: 0, height: 0, padding: 0 }}
                    value={this.state.invoiceDate}
                    readOnly
                    validators={["required"]}
                    errorMessages={["This field is required"]}
                  />
                </div>
              </Col>
              <Col lg={4} md={4} sm={4}>
                <div className="form-group formbox selectbox">
                  <label>Invoice No<sup className="redstarText">*</sup></label>
                  <TextValidator
                    name="invoiceNumber"
                    type="text"
                    value={this.state.invoiceNumber}
                    placeholder="Invoice Number"
                    validators={["required"]}
                    errorMessages={["This field is required"]}
                    onChange={(e) => {
                      this.setState({ invoiceNumber: e.target.value });
                    }}
                  />
                </div>
              </Col>
              <Col lg={8} md={8} sm={8}>
                <div className="form-group formbox selectbox">
                  <label>Notes</label>
                  <textarea rows={3} onChange={(e) => {
                    this.setState({description:e.target.value})
                  }} className="form-control" placeholder="Notes" ></textarea>
                </div>
              </Col>
            </Row>
          </div>
          <LineItems
            items={this.state.lineItems}
            currencyFormatter={this.formatCurrency}
            addHandler={this.handleAddLineItem}
            changeHandler={this.handleLineItemChange}
            focusHandler={this.handleFocusSelect}
            deleteHandler={this.handleRemoveLineItem}
            reorderHandler={this.handleReorderLineItems}
            priceList={this.state.priceList}
          />

          <div className={styles.totalContainer}>
            {/* <form>
              <div className={styles.valueTable}>
                <div className={styles.row}>
                  <div className={styles.label}>Tax Rate (%)</div>
                  <div className={styles.value}><input name="taxRate" type="number" step="0.01" value={this.state.taxRate} onChange={this.handleInvoiceChange} onFocus={this.handleFocusSelect} /></div>
                </div>
              </div>
            </form> */}
            {/* <form className="totalamount"> */}
              <div className="righttotal-amount">
                  <div className="amount-label">Total Amount:</div>
                  <div className="amount-value">{this.formatCurrency(this.calcGrandTotal())}</div>
                </div>
            {/* </form> */}
          </div>
        </div>
      </div>
      </ValidatorForm>
    )
  }

}

export default Invoice
