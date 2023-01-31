import React from 'react';
import vaultnew from '../../../assets/vaultnew.svg';
import lock from '../../../assets/lock.svg';
import './assured.scss';

export const Assuredd = () => {
  return (
    <div className="assured-container">
      <div className="assured-inner">
        <div className="mt-5 pt-5 assured-inner top">
          <p>Be Rest Assured</p>
          <p className="text-center">
            Learn how we help people and talent migrate to the country of their
            choice.
          </p>
        </div>
        <div className="assured-inner bottom">
          <Singleassure
            image={vaultnew}
            title="Bank level security"
            subtitle="We use state-of-the-art data encryption when handling
                        financial information and (2FA) protection. We're backed
                        by top financial market operators and we not only meet 
                        traditional banking security standards, we exceed them."
          />
          <Singleassure
            image={lock}
            title="Protected by NG & US SEC "
            subtitle="Accounts are held by our banking partner, a 
                        firm duly registered by the Central Bank of Nigeria
                        (CBN). Nigerian and US Securities are coming soon
                        on this platform."
          />
          <Singleassure
            image={lock}
            title="Protected by NG & US SEC "
            subtitle="Accounts are held by our banking partner, a 
                        firm duly registered by the Central Bank of Nigeria
                        (CBN). Nigerian and US Securities are coming soon
                        on this platform."
          />
        </div>
      </div>
    </div>
  );
};

const Singleassure = props => {
  return (
    <div className="single-assureance">
      <img src={props.image} alt="" />
      <p className="text-center">{props.title}</p>
      <p className="text-center">{props.subtitle}</p>
    </div>
  );
};
