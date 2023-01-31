import React, { useState } from 'react';
import { navigate } from '@reach/router';
import './walletcard.scss';
export const Walletcard = props => {
  const [show, setShow] = useState(false);
  return (
    <div
      className={`singlewallet${
        props.data.id === 1
          ? ' --vesti'
          : props.data.id === 2
          ? ' --sila'
          : ' --third'
      }`}
    >
      <div className="singlewallet__top">
        <p className="singlewallet__top__title">
          YOUR {props.data.name} BALANCE
        </p>
        <div className="singlewallet__top__amount">
          <span>
            <p>{props.data.currency}</p>
            <p>
              {show
                ? props.data.amount
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                : '****'}
            </p>
          </span>
          <i
            class={`fas fa-${show ? 'eye-slash' : 'eye'}`}
            onClick={() => setShow(!show)}
          ></i>
        </div>
      </div>
      {props.children}
      {props.data.link && (
        <p
          className="singlewallet__link"
          onClick={() => navigate(`/${props.data.link}`)}
        >
          {props.data.name} Settings <i class="fas fa-arrow-right"></i>
        </p>
      )}
    </div>
  );
};
