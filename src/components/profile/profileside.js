import React, { useEffect, useState } from 'react';
import './profileside.scss';
import password from '../../assets/password.svg';
import kyc from '../../assets/kyc.svg';
import bank from '../../assets/addbank.svg';
import account from '../../assets/account.svg';
import { navigate } from '@reach/router';

export const Profileside = props => {
  const sideImages = [account, password, bank, kyc];
  const sides = [
    'My Account',
    'Password & PIN',
    'Add New Bank',
    'KYC',
    // "vesti Rates"
  ];
  const [activeSide, setSide] = useState('My Account');

  var changeScreen = (value, id) => {
    if (props.value === 'kyc' || props.value === 'addbank') {
      navigate('/myprofile');
    }
    setSide(value);
    props.setStep(id);
  };

  useEffect(() => {
    if (props.value === 'kyc') {
      setSide('KYC');
    } else if (props.value === 'addbank') {
      setSide('Add New Bank');
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div className="profileside-container">
      <div className="profileside-inner-container">
        {sides.map((title, index) => (
          <Singleside
            key={index}
            id={index}
            image={sideImages[index]}
            side={title}
            activeSide={activeSide}
            changeScreen={changeScreen}
          />
        ))}
      </div>
    </div>
  );
};

const Singleside = props => {
  return (
    <div
      key={props.key}
      className={`singleside-container  ${
        props.activeSide === props.side ? ' active' : ''
      }`}
      onClick={() => props.changeScreen(props.side, props.id)}
    >
      <div className="singleside-inner-container">
        <img src={props.image} alt="side pics" />
        <p>{props.side}</p>
      </div>
    </div>
  );
};
