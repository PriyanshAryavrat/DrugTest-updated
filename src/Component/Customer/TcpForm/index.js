import React from 'react';
import { Link } from 'react-router-dom';
import './index.css'
import { Container, Row, Col } from 'react-bootstrap';



class TcpForm extends React.Component {
  constructor(props) {
    super(props);
    let { id } = this.props.match.params;
    this.state = {
      tabIndex: 0,
      id:id
    };
  }

  render() {
    return (
      <React.Fragment>
        <Container>
          <div className="loginpage outer-margin home-screen1">
            <h3 className="text-center">I Need Help With</h3>
            <Row>
              <Col lg={4} md={4} sm={4}>
                <div className="home-cardbox">
                  <Link to={"/new-tcp/"+ this.state.id}><h3>New TCP</h3></Link>
                </div>
              </Col>
              <Col lg={4} md={4} sm={4}>
                <div className="home-cardbox">
                  <Link to={"/transfer_tcp/"+this.state.id}><h3>Transfer TCP</h3></Link>
                </div>
              </Col>
              <Col lg={4} md={4} sm={4}>
                <div className="home-cardbox">
                  <Link to={"/renewal-tcp/"+this.state.id}><h3>Renewal TCP</h3></Link>
                </div>
              </Col>
            </Row>
            <Row>
            <Col sm={2}></Col>
              <Col lg={4} md={4} sm={4}>
                <div className="home-cardbox">
                  <Link to="/cpuc-owner-enrollment"><h3>CPUC Form</h3></Link>
                </div>
              </Col>
              <Col lg={4} md={4} sm={4}>
                <div className="home-cardbox">
                  <Link to="/customer"><h3>None</h3></Link>
                </div>
              </Col>
              <Col sm={2}></Col>
            </Row>
          </div>
        </Container>

      </React.Fragment>
    );
  }
}

export default TcpForm;