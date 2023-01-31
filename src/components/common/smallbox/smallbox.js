import React from 'react';
import './smallbox.scss';
export const Smallbox = props => {
  return (
    <div className="smallbox">
      <div className="smallbox__container">{props.children}</div>
    </div>
  );
};
