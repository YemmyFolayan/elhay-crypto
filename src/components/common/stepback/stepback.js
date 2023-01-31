import React from 'react';

export const Stepback = props => {
  return (
    <span
      className="d-inline-flex align-items-center mb-5"
      style={{ cursor: 'pointer' }}
      onClick={() => props.onClick()}
    >
      <i
        class="fas fa-arrow-left"
        style={{ color: '#000000', fontSize: '1.5em' }}
      ></i>
      <p
        style={{
          margin: 0,
          marginLeft: '10px',
          color: '#000000',
          fontSize: '1.5em',
        }}
      >
        {' '}
        Go back{' '}
      </p>
    </span>
  );
};
