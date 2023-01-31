import React from 'react';
import './radiobutton.scss';

const RadioButton = props => {
  return (
    <div className="RadioButton">
      <input
        id={props.id}
        onChange={props.changed}
        value={props.value}
        type="radio"
        checked={props.isSelected}
      />
      <label htmlFor={props.id}></label>
      <div className="paymentoption-detail">
        <p>{props.label}</p>
        <p>{props.sublabel}</p>
      </div>
    </div>
  );
};

export default RadioButton;

export const RadioOption = props => {
  return (
    <div
      className={`radiooption ${props.isSelected && ' --active'} `}
      onClick={() => props.changed(props.value)}
    >
      <div className="radiooption__left">
        {props.image && <img src={props.image} alt={props.label} />}
        <span className="radiooption__titlesub">
          <p>{props.label}</p>
          <p>{props.sublabel}</p>
        </span>
      </div>

      <input
        id={props.id}
        value={props.value}
        type="radio"
        checked={props.isSelected}
      />
      <label htmlFor={props.id}></label>
    </div>
  );
};
