import React from 'react';
import './SafetyAndSecurity.scss';
import shield from '../../../assets/shield.svg';
import circledcheck from '../../../assets/circled-check.svg';

const SafetyAndSecurity = () => {
  return (
    <div>
      <div className="safetyAndsecurity-container">
        <div className="safetyAndsecurity-inner-container">
          <div className="safetyAndsecurity-inner-container left">
            <div className="top">
              <span>
                <p className="">Safety and security guaranteed.</p>
              </span>
              <p>
                The vesti card lets you spend your money and manage your spend
                using the advanced anayltics and features in the vesti account.
                You can top up your NetWebPay account and card anytime.
              </p>
              &nbsp;&nbsp;&nbsp;
              <p>
                If you feel a concern that you can’t carry your Physical Card,
                then there’s no need to carry your wallet. You can use details
                from your NetWebPay card from within your app, and you can freeze or
                unfreeze it as you wish.
              </p>
              &nbsp;&nbsp;&nbsp;
              <ul>
                <Singlelist
                  title="High Level Protection"
                  subtitle="We are not a bank in Nigeria or the US, our banking partners are NDIC (Nigeria) and FDIC (US) insured. That means it’s a safe to use vesti worldwide"
                />
                <Singlelist
                  title="Compliance"
                  subtitle="Cards are issued in compliance with global security standards and in pursuance with licence from Mastercard through our banking partner, our cards have all industry compliance for security."
                />
              </ul>
            </div>
            {/* <div className="bottom">
                            Order your card now  <img className='img-fluid' src={arrowright} alt="" />
                        </div> */}
          </div>
          <div className="safetyAndsecurity-inner-container right">
            <img
              className="img-fluid "
              src={shield}
              alt="safetyAndsecurity SVG"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Singlelist = props => {
  return (
    <li>
      <img src={circledcheck} alt="" />
      <div className="singlelist-div">
        <strong>{props.title}</strong>
        <p>{props.subtitle}</p>
      </div>
    </li>
  );
};
export default SafetyAndSecurity;
