import React from 'react';
import './singleselect.scss';
export const Selectbox = props => {
  return (
    <div className="selectcol-input">
      <div className="label">
        <p> {props.label} </p>
        {props.sublabel && <p>{props.sublabel}</p>}
      </div>
      <select
        value={props.value}
        onChange={props.onChange}
        name={props.name}
        disabled={props.disabled}
      >
        {(props.options ?? []).map((item, index) => (
          <option className="option" value={item.value} key={index}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};
