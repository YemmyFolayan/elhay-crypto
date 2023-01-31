import React from 'react';
import { Titlesubtitle } from '../titlesubtitle/titlesubtitle';
import './review.scss';

export const Transreview = props => {
  return (
    <>
      <Titlesubtitle title="Transaction Review" />
      <div className="transreview">
        {props.data.map((item, index) => (
          <span className="transreview__single" key={index}>
            <p>{item.title}</p>
            <p>{item.value}</p>
          </span>
        ))}
      </div>
    </>
  );
};
