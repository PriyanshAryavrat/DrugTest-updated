import React from 'react';
import { Link } from 'react-router-dom';
import './index.css'

class Footer extends React.Component {
    render() {
        return (
            <React.Fragment>
                <footer className="footer">
                    <span>Copyright © 2020 <Link to="#">Accurate Dashboard</Link>. All rights reserved.</span>
                </footer>
            </React.Fragment>
        );
    }
}

export default Footer;