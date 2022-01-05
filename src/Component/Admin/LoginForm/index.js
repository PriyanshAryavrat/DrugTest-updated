import React from 'react';
import { Link ,Redirect } from 'react-router-dom';
import './index.css'
import { Container, Row, Col, Button } from 'react-bootstrap';
import apiPath from '../../../Environment/ApiPath';
import TextValidator from '../../../Form/TextValidator/Index';
import { ValidatorForm } from 'react-form-validator-core';
import axios from "axios";
import Swal from 'sweetalert2';


const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});


class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      IsLogin: false,
      redirectTo: false
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', this.state.username);
    formData.append('password', this.state.password);
    const url = apiPath.login_url;
    axios.post(url, formData, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }).then((res) => {
      if(res.data.status === "success" && res.data.data && res.data.data.token){
        sessionStorage.setItem("authToken",res.data.data.token);
        Toast.fire({
          type: "success",
          title: "Login Successfully!"
        });
      } else {
        Toast.fire({
          type: "failure",
          title: res.data.message
        });
      }
      setTimeout(() => {
        this.setState({ redirectTo: '/admin' });
      }, 1000)
    })
  }


  render() {
    if (this.state.redirectTo) {
      return (<Redirect to={this.state.redirectTo} />)
    }
    return (
      <React.Fragment>
        <Container>
          <ValidatorForm onSubmit={this.handleSubmit}>
            <div className="loginpage outer-margin login-form-outer">
              <Row>
                <Col md={12}>
                  <div className="login-form">
                    <h3>Login</h3>
                    <div className="form-group formbox">
                      <label>Email</label>
                      <TextValidator type="email" name="email" placeholder="Enter Your Email" value={this.state.username}
                         validators={["required" , 'matchRegexp:^([a-zA-Z0-9])(([a-zA-Z0-9])*([\._\+-])*([a-zA-Z0-9]))*@([a-zA-Z0-9])*.(([a-zA-Z]{2,4}?)*((\.)[a-zA-Z]{2,4}?))$']}
                         errorMessages={[
                           "This field is required",
                           "Email is not valid"
                         ]}
                        onChange={(e) => { this.setState({ username: e.target.value }) }}
                      />
                    </div>
                    <div className="form-group formbox">
                      <label>Password</label>
                      <TextValidator type="password" name="password" placeholder="Password" value={this.state.password}
                        validators={['required','trim']}
                        errorMessages={['This field is required','Please Enter valid Password']}
                        onChange={(e) => { this.setState({ password: e.target.value }) }}
                      />
                    </div>
                    <div className="form-group formbox pull-left m8">
                      <div className="form-check">
                        <label className="form-check-label">
                          <input type="checkbox" 
                          onChange={(e) => {
                            this.setState({ agreeToTerms: !this.state.agreeToTerms });
                          }} 
                          className="form-check-input" name="optionscheckbox" value="" /> Remember me
                              <i className="input-helper"></i>
                        </label>
                      </div>
                    </div>
                    <div className="forgot-link">
                      <Link>Forgot password?</Link>
                    </div>
                    <div className="home-cardbox clearfix">
                      <Button type="submit" >Submit</Button>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </ValidatorForm>
        </Container>
      </React.Fragment>
    );
  }
}

export default Login;