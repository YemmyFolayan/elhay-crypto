import React from 'react';
import './littlebalance.scss';
import bank from 'assets/smallbank.svg';
export const Littlebalance = props => {
  return (
    <div className={`littlebalance ${props.type ? `--${props.type}` : ''}`}>
      <img src={props.img ? props.img : bank} alt="balance" />
      <div className="littlebalance__right">
        <p>{props.title}</p>
        <p>
          {props.currency}
          {props.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </p>
      </div>
    </div>
  );
};
