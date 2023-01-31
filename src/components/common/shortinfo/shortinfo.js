import React from 'react';
import './shortinfo.scss';
import info from 'assets/info.svg';

export const Shortinfo = props => {
  return (
    <div className={`shortinfo ${props.fail ? ' -fail' : ''}`}>
      <img src={props.image ? props.image : info} alt="info svg" />
      <p> {props.subject}</p>
    </div>
  );
};
export const Smallinfo = props => {
  return (
    <div className={`smallinfo ${props.fail ? ' -fail' : ''}`}>
      <img src={props.image ? props.image : info} alt="info svg" />
      <p> {props.subject}</p>
    </div>
  );
};

export const Shortinfonew = props => {
  return (
    <div className={`shortinfo ${props.fail ? ' -fail' : ''}`}>
      <img src={props.image ? props.image : info} alt="info svg" />
      {props.children}
    </div>
  );
};

export const Infobox = props => {
  return (
    <div className={`infobox`}>
      <img src={props.image ? props.image : info} alt="info svg" />
      {props.children}
    </div>
  );
};
