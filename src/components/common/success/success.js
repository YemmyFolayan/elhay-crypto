import React from 'react';
// import success from "../../../assets/success.svg"
import newsuccess from '../../../assets/newsuccess.svg';
import { Platformbutton } from '../button/button';
import './success.scss';

export const Success = props => {
  return (
    <div className="success">
      <div className="success__inner">
        <img
          src={
            props.type === 'new'
              ? newsuccess
              : props.image
              ? props.image
              : newsuccess
          }
          alt="success trophy svg"
        />
        <div
          className={`success__content ${
            props.type === 'error' ? '--error' : ''
          }`}
        >
          <span className="success__body">
            <p>{props.title}</p>
            <p>{props.subtitle}</p>
          </span>

          {props.onClick && (
            <Platformbutton
              name={props.button ? props.button : 'Close'}
              type="normal"
              small="yes"
              click={() => props.onClick()}
            />
          )}
          {props.secondBtn && <div className="mb-2"></div>}
          {props.secondBtn && (
            <Platformbutton
              name={props.secondBtntext}
              type="secondary"
              small="yes"
              click={() => props.secondBtn()}
            />
          )}
        </div>
      </div>
    </div>
  );
};
