import React from 'react';
import './international.scss';
import hassle from '../../../assets/hassle.svg';
import fast from '../../../assets/fast-time.svg';
import real from '../../../assets/rocket.svg';
import secure from '../../../assets/secure.svg';
import phone from '../../../assets/phone.png';

export const International = () => {
  return (
    <div className="international-payments-container">
     
    </div>
  );
};

const Singleinternational = props => {
  return (
    <div className="single-international-container">
      <img src={props.image} alt="real" />
      <div className="single-international-container right">
        <p>{props.title}</p>
        <p>{props.subtitle}</p>
      </div>
    </div>
  );
};
