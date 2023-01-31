import React from 'react';
import './titlesubtitle.scss';

export const Titlesubtitle = props => {
  return (
    <div className="titlesubtitle">
      {props.steps && <p className="titlesubtitle__steps">{props.steps}</p>}
      <p className="titlesubtitle__title">{props.title}</p>

      <h6 className="titlesubtitle__subtitle">{props.subtitle}</h6>
      {props.children}
    </div>
  );
};

export const Icontitlesubtitle = props => {
  return (
    <div className="titlesubtitle">
      <span>
        <p className="titlesubtitle__title">{props.title}</p>
        <img src={props.image} alt="icon" />
      </span>

      <h6 className="titlesubtitle__subtitle">{props.subtitle}</h6>
    </div>
  );
};

export const Smalltitlesubtitle = props => {
  return (
    <div className="titlesubtitle --small">
      <p className="titlesubtitle__title">{props.title}</p>

      <h6 className="titlesubtitle__subtitle">{props.subtitle}</h6>
    </div>
  );
};
//
