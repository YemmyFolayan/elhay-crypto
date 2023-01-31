import React from 'react';
import vestiw from '../../assets/main_img1.svg';
import facebook from '../../assets/facebook-logo.svg';
import ig from '../../assets/instagram-logo.svg';
import link from '../../assets/linkedin-logo.svg';
import twitter from '../../assets/twitter-logo.svg';
import soon from '../../assets/soon.svg';
import { Link } from '@reach/router';
import './Styles/Footer.scss';

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-inner">
        {/* <div className="footer-inner top">
         
        </div> */}
        <hr />
        <div className="footer-inner bottom">
          {/* <div className="social-media-links">
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://web.facebook.com/vesticash"
            >
              <img
                className=".img-fluid mw-100 h-auto"
                src={facebook}
                alt="fb"
              />
            </a>
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://www.instagram.com/vestiofficial/"
            >
              <img className=".img-fluid mw-100 h-auto" src={ig} alt="insta" />
            </a>
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://www.linkedin.com/company/vestiofficial/mycompany/"
            >
              <img
                className=".img-fluid mw-100 h-auto"
                src={link}
                alt="linkedin"
              />
            </a>
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://twitter.com/vestiofficial"
            >
              <img
                className=".img-fluid mw-100 h-auto"
                src={twitter}
                alt="twitter"
              />
            </a>
            {/* <a href="/">
                <img
                  className=".img-fluid mw-100 h-auto"
                  src={youtube}
                  alt="youtube"
                />
              </a> 
          </div> // */}

          <div className="doc-links">
            <Link className="footer-link" to="/disclosure">
              TERMS OF SERVICE &nbsp; •
            </Link>
            <Link className="footer-link" to="/privacy">
              PRIVACY
            </Link>
            <Link className="footer-link" to="/aml">
              • &nbsp; AML
            </Link>
            <Link className="footer-link" to="/fees">
              • &nbsp; FEES
            </Link>
         
          </div>
          <p className="white-footer">
            &copy;2023 NetWebPay by Folayan Iluyemi Michael. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
