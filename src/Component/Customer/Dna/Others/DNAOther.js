import React from 'react';
import {Link} from 'react-router-dom';

const DnaOther = () => {
  return (
    <React.Fragment>
<div className="container">
  <div className="row">
    <div className="loginpage outer-margin home-screen1">
      <div className="row">
        <div className="col-md-12">
          <div className="login-logo text-center margin-bottom20">
            <img src="images/logo.jpg" alt="Logo" />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-1" />
        <div className="col-lg-5 col-md-5 col-sm-5">
          <div className="home-cardbox">
            <Link to="/maternity"><h3>Maternity</h3></Link>
          </div>
        </div>
        <div className="col-lg-5 col-md-5 col-sm-5">
          <div className="home-cardbox">
            <Link to="/grandparentage"><h3>Grandparentage </h3></Link>
          </div>
        </div>
        <div className="col-sm-1" />
      </div>
      <div className="row">
        <div className="col-sm-1" />
        <div className="col-lg-5 col-md-5 col-sm-5">
          <div className="home-cardbox">
            <Link to="/avuncular"><h3>Avuncular(Aunt/Uncle)</h3></Link>
          </div>
        </div>
        <div className="col-lg-5 col-md-5 col-sm-5">
          <div className="home-cardbox">
            <Link to="/siblingship"><h3>Siblingship</h3></Link>
          </div>
        </div>
        <div className="col-sm-1" />
      </div>
    </div>
  </div>
</div>

    </React.Fragment>
  )
}

export default DnaOther;


