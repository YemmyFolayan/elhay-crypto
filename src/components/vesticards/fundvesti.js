import React from 'react';
import wallet from '../../assets/wallet.svg';
import './fundvesti.scss';

export const Fundvesti = props => {
  return (
    <div className="fundcard-container">
      <div className="fundcard-inner">
        {/* <div className="fundcard-inner top">
                    <p>Fund Card • <strong> 3 of 3 </strong></p>
                    <p>
                        vesti Provides Multiple Option For You To Fund Your Wallet,
                        Please Choose One Below.
                    </p>
                </div> */}
        <div className="fundcard-inner center">
          <Fundoption img={wallet} />
          <Fundoption img={wallet} />
          <Fundoption img={wallet} />
        </div>
        <div className="fundcard-inner bottom-btn">
          <button
            className="fundcard-back-btn"
            onClick={() => props.setStep(4)}
          >
            {' '}
            Skip{' '}
          </button>
          <button
            className="fundcard-finish-btn"
            onClick={() => props.setStep(4)}
          >
            {' '}
            Finish{' '}
          </button>
        </div>
      </div>
    </div>
  );
};

const Fundoption = props => {
  return (
    <div className="fundoption-container">
      <div className="fundoption-inner">
        <img src={props.img} alt="" />
        <div className="fundoption-inner right">
          <p>vesti Wallet</p>
          <p>Load your card using vesti wallet easily.</p>
        </div>
      </div>
    </div>
  );
};
