import React from 'react';
import './percentage.scss';

export const Percentage = props => {
  return (
    <div className={`percentage ${props.drop ? '--drop' : '--active'}`}>
      <div className="percentage__inner">
        <i class={`fas fa-caret-${props.drop ? 'down' : 'up'}`}></i>
        <p>{props.price}</p>
      </div>
    </div>
  );
};
