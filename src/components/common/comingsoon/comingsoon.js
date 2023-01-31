import React from 'react';
import coming from '../../../assets/coming.svg';
import './comingsoon.scss';

export const Comingsoon = props => {
  return (
    <div className="comingsoon-container">
      <div className="comingsoon-inner">
        <img src={coming} alt="coming trophy svg" />
        <div className="comingsoon-inner c-content">
          <p>{props.title}</p>
          <p>{props.subtitle}</p>
          {props.onClick && (
            <button className="comingsoon-btn" onClick={() => props.onClick()}>
              {props.button ? props.button : 'Close'}
            </button>
          )}
          {props.children}
        </div>
      </div>
    </div>
  );
};
