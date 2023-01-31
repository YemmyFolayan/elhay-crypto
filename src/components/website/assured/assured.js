import React from 'react';
import vaultnew from '../../../assets/vaultnew.svg';
import lock from '../../../assets/lock.svg';
import './assured.scss';

export const Assured = () => {
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
            subtitle="
                        We use state-of-the-art data encryption when handling
                        financial information and (2FA) protection. We're backed
                        by top financial market operators and we not only meet 
                        traditional banking security standards, we exceed them.
                        "
          />
          <hr />
          <Singleassure
            image={lock}
            title="High Level Protection "
            subtitle="Accounts are held by our banking partners, duly registered by the apex regulatory bodies in the countries we operate."
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
