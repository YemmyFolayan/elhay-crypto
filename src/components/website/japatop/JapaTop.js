import React from 'react';
import './JapaTop.scss';
import { Download } from '../banner/download';
import playstore from '../../../assets/playstore.svg';
import apple from '../../../assets/apple.svg';
import dashboardadvice from '../../../assets/dashboardadvice.svg';

export const JapaTop = props => {
  return (
    <div className="japatop-container">
      <div className="japatop-inner-container">
        <div className="japatop-inner-container left">
          <div className="top">
            <span>
              <p className="display-6">
                Want To Move Overseas in 2022 ?
                <strong> Your JAPA Journey Starts Here!</strong>
              </p>
            </span>
            <p>
              Join more than 70,000 Users finding new homes abroad, raising the
              money they need to move and making difficult international
              payments with NetWebPay.
            </p>
            {/* <button onClick={()=>props.onClick()}>Reserve Seat For 26&27/03/22 Seminar</button> */}
          </div>
      
        </div>
        <div className="japatop-inner-container right">
          <img
            className="img-fluid"
            src={dashboardadvice}
            alt="dashboard SVG"
          />
        </div>
      </div>
    </div>
  );
};
