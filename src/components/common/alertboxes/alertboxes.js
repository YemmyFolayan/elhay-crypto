import React from 'react';
import './alertboxes.scss';
import infobox from 'assets/infobox.svg';
export const AlertSuccess = () => {
  return <div></div>;
};

export const AlertError = props => {
  return (
    <div className="alertboxes --error">
      <i class="fas fa-times-circle"></i>
      <p>{props.body}</p>
    </div>
  );
};

export const AlertWarning = () => {
  return <div></div>;
};

export const AlertInfo = props => {
  return (
    <div className="alertboxes --infobox">
      <img src={infobox} alt="info" />
      <p>{props.body}</p>
    </div>
  );
};
