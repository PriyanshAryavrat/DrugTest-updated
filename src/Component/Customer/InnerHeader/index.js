import React from 'react';
import './index.css'
import { Link } from "react-router-dom";
import { Container, Dropdown } from "react-bootstrap";
import {
  Accurate_logo1,
} from '../../../../src/assets/images';


class InnerHeader extends React.Component { 
  constructor(props){
    super(props)
    this.state= {
      CPUC: false
    }
  }
  render() {  
  return (
    <React.Fragment>
      <div className="header-section">
            <Container>
            {/* <Dropdown className="menubox">
                <Dropdown.Toggle id="cpucDropdown">
                  <i className="mdi mdi-view-grid"></i>
                </Dropdown.Toggle>
                
                <Dropdown.Menu className="dropdownmenu">
                  <ul>
                  <li><Link to="/dot-owner-enrollment">DOT</Link></li>
                  <li>  
                    <Dropdown.Toggle id="innerDrop">
                    Home
                  </Dropdown.Toggle>
                    <Dropdown.Menu className="inner-submenu">
                      <ul>
                        <li><Link to="">A</Link></li>
                        <li><Link to="">A</Link></li>
                        <li><Link to="">A</Link></li>
                      </ul>
                    </Dropdown.Menu>
                    </li>
                    <li><Link to="/dot-owner-enrollment">DOT</Link></li>
                    <li><Link to="/dot-owner-enrollment">DOT</Link></li>
                    <li><Link to="/dot-owner-enrollment">DOT</Link></li>
                  </ul>              
                  <Dropdown.Item href="/dot-owner-enrollment">DOT</Dropdown.Item>
                  <Dropdown.Item href="#">DNA</Dropdown.Item>
                  <Dropdown.Item href="/taxi">Taxi</Dropdown.Item>
                  <Dropdown.Item href="/personal_test">Personal</Dropdown.Item>
                  <Dropdown.Item href="/uscg">USCG</Dropdown.Item>
                  <Dropdown.Item href="/alc">ALC</Dropdown.Item>
                  <Dropdown.Item href="/lando">Lan Do</Dropdown.Item>
                </Dropdown.Menu>
         
              </Dropdown> */}

              <Dropdown className="menubox">
                <Dropdown.Toggle id="cpucDropdown">
                  <i className="mdi mdi-view-grid"></i>
                </Dropdown.Toggle>
                
                <Dropdown.Menu id="xccd">
                  <Dropdown.Item href="/customer">Home</Dropdown.Item>
                  <Dropdown.Item href="/cpuc-owner-enrollment" onMouseOver={()=>{
                    // this.setState({ 
                    //   CPUC: true
                    // })
                  }} onMouseLeave={()=>{
                    // this.setState({  
                    //   CPUC: false
                    // })
                  }}>CPUC
                  {this.state.CPUC &&
                    <Dropdown.Menu id="sxdns" className="innerdropdown">
                    <Dropdown.Item href="/cpuc-owner-enrollment">Submenu</Dropdown.Item>
                    </Dropdown.Menu>
                  }
                  </Dropdown.Item>
                  <Dropdown.Item href="/dot-owner-enrollment">DOT</Dropdown.Item>
                  <Dropdown.Item href="/alc">ALC</Dropdown.Item>
                  <Dropdown.Item href="/taxi">Taxi</Dropdown.Item>
                  <Dropdown.Item href="/personal_test">Personal</Dropdown.Item>
                  <Dropdown.Item href="/lando">Lan Do</Dropdown.Item>
                  <Dropdown.Item href="/uscg">USCG</Dropdown.Item>
                  <Dropdown.Item href="/dna_home">DNA</Dropdown.Item>
                </Dropdown.Menu>
         
              </Dropdown>
              <div className="header-logo">
                <Link to="/customer"><img src={Accurate_logo1} alt="Accurate Logo"/></Link>
              </div>
            </Container>
          </div>
    </React.Fragment> 
  )}
}

export default InnerHeader;

