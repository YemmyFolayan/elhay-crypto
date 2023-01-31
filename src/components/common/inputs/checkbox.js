import React from 'react';
import './checkbox.scss';

export const Checkbox = props => {
  return (
    <label class="form-ctrl">
      <input
        type="checkbox"
        name={props.name}
        onChange={() => props.setCheck(!props.check)}
        checked={props.check}
      />
      {props.title && props.title}
    </label>
  );
};
