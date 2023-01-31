import React from 'react';
import coin from '../../../assets/coins.svg';
import setup from '../../../assets/setup.svg';
import './getstarted.scss';

export const Getstarted = () => {
  return (
    <div className="getstarted-container">
      <div className="getstarted-inner">
        <div className="mt-5 pt-5 getstarted-inner top">
          <p>Get Started In Few Minutes</p>
          <p className="text-center">
            We protect your data with military-grade security and fraud systems.
            Your money is insured through our partner banks with the FDIC and
            the NDIC.
          </p>
        </div>

        <div className="getstarted-inner bottom">
          <Singlestarted
            image={setup}
            reverse={false}
            title="Set Up In Minutes"
            subtitle="From your bed or office desk, you can get a NetWebPay account
                        without lifting a finger, decide which country to migrate to, pay for your immigration fees and make other financial transactions."
          />
          <Singlestarted
            image={coin}
            reverse={true}
            title="Trust is Everything"
            subtitle="At NetWebPay, our people comes first. We believe protecting you, your data and money is our number one priority."
            subtext="As a result we comply with the highest standards of security the market offers and lead with integrity."
          />
        </div>
      </div>
    </div>
  );
};

const Singlestarted = props => {
  return (
    <div
      className={` ${
        props.reverse ? 'single-reverse-container' : 'single-started-container'
      }  `}
    >
      <div
        className={` ${
          props.reverse
            ? 'single-reverse-container right'
            : 'single-started-container left'
        }  `}
      >
        <p>{props.title}</p>
        <p>{props.subtitle}</p>
        <p>{props.subtext}</p>
      </div>

      <img className="img-fluid h-50" src={props.image} alt="" />
    </div>
  );
};
