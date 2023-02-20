import React from 'react';

export const Toggle = props => {
  return (
    <span
      className="d-inline-flex justify-content-between align-items-center position-relative"
      onClick={props.handleToggle}
      style={{
        height: '34px',
        width: 'fit-content',
        backgroundColor: '#F0F3EE',
        cursor: 'pointer',
        position: 'absolute',
        border: '0.5px solid #E4AD50',
        borderRadius: '5px',
        padding: '5px 8px',
        color: '#000000',
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
          //   width: '100%',

          ...(!props.toggle && { transform: 'translateX(38px)' }),
        }}
      ></span>
      <span
        style={{
          zIndex: 0,
          transition: '.4s',
          ...(props.toggle && { color: '#DDE1E9' }),
        }}
        className="user-select-none font-weight-bold"
      >
        {props.second}
      </span>
      <span
        style={{
          zIndex: 0,
          transition: '.4s',
          marginLeft: '10px',
          ...(!props.toggle && { color: '#DDE1E9' }),
        }}
        className="user-select-none font-weight-bold"
      >
        {props.first}
      </span>
    </span>
  );
};
