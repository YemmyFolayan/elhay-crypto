import React from 'react';
// import bkg from "../../../assets/background.svg";
import './top.scss';
export const Top = props => {
  return (
    <div className="top-background-container">
      {/* <img src={bkg} alt="background"/> */}
      <div className="top-background-content">
        <p>{props.title}</p>
        <p>{props.body}</p>
      </div>
    </div>
  );
};
