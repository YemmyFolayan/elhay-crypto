import React from 'react';
import './balancecard.scss';

export const Accounttoggle = props => {
  return (
    <span
      className="d-inline-flex justify-content-between align-items-center position-relative"
      onClick={() => props.toggleCurrency()}
      style={{
        height: '34px',
        width: '90px',
        // backgroundColor: '#F0F3EE',
        backgroundColor: 'red',
        cursor: 'pointer',
        position: 'absolute',
        border: '0.5px solid #3E6F26',
        borderRadius: '5px',
        padding: '5px 8px',
        color: '#518C36',
        display: 'flex',
        gap: '7px',
      }}
    >
      <span
        className="position-absolute"
        style={{
          backgroundColor: '#000000',
          borderRadius: '5px',
          bottom: '4px',
          height: '26px',
          left: '4px',
          transition: '.4s',
          width: '45px',

          ...(!props.currency && { transform: 'translateX(38px)' }),
        }}
      ></span>
      <span
        style={{
          zIndex: 0,
          transition: '.4s',
          ...(props.currency && { color: '#F0F3EE' }),
        }}
        className="user-select-none font-weight-bold"
      >
        NGN
      </span>
      <span
        style={{
          zIndex: 0,
          transition: '.4s',
          ...(!props.currency && { color: '#F0F3EE' }),
        }}
        className="user-select-none font-weight-bold"
      >
        USD
      </span>
    </span>
  );
};
