import React from 'react';
import './becomeprovider.scss';
import provider from '../../assets/provide.svg';
// import { useState } from "react"
export const Becomeprovider = props => {
  // const [check, setCheck] = useState(false);

  return (
    <div className="becomeprovider-container">
      <div className="becomeprovider-inner">
        <img src={provider} alt="Empty SVG" />
        <p>Become a NetWebPay Provider</p>
        <p>
          You can create services you are willing to offer, so intending users
          can enroll for such services
        </p>
        <button className="becomeprovider-btn" onClick={props.open}>
          Apply To Be a NetWebPay Provider
        </button>
      </div>
    </div>
  );
};
