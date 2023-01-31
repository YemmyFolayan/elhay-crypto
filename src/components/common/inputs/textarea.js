import React from 'react';
import './textarea.scss';

export const Textarea = props => {
  return (
    <div className="textarea">
      {props.label && <label>{props.label} </label>}
      <textarea
        className="textarea__input"
        value={props.value}
        name={props.name}
        onChange={props.onChange}
        rows={5}
        cols={5}
        placeholder={props.placeholder ? props.placeholder : ''}
      />
      {props.children}
    </div>
  );
};
