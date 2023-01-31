import React from 'react';
import './singleuser.scss';

export const Singleuser = props => {
  return (
    <div className="singleuser-container" onClick={props.onClick}>
      <div className="singleuser-inner-container">
        <div className="singleuser-inner-container left">
          <img src={props.image} alt="user profile" />
        </div>
        <div className="singleuser-inner-container right">
          <p>
            {props.firstname} {props.lastname}
          </p>
          <p>
            Proceed to send cash <i class="fas fa-arrow-right"></i>
          </p>
        </div>
      </div>
    </div>
  );
};
