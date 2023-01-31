import React from 'react';
import './mytransactions.scss';

export const Equivalence = props => {
  return (
    <p className="equal__get">
      {' '}
      {props.first +
        '' +
        props.amount +
        ` ≈ ${props.second} ` +
        props.equal}{' '}
    </p>
  );
};
