import React from 'react';
import sprinter from '../../assets/sprinter.svg';
import './Styles/CoinVstSuccess.scss';
import bkg from '../../assets/background.svg';
import './top/top.scss';

function CoinVstSuccess() {
  return (
    <div className="coin-page">
      <div className="top-background-container">
        <img src={bkg} alt="background" />
      </div>
      <div className="container">
        <div className="coin-image text-center">
          <img className="img-fluid h-100" src={sprinter} alt="Coins" />
        </div>
        <div className="coin-texts text-center">
          <p>Thank you</p>
          <p>
            Thank you for joining our Waitlist. You will get a mail once the
            vesti Coin VST launches. Let's build better products! Help us spread
            the word to your audience.
          </p>
        </div>
        <div className="waitlist-btn text-center">Help Spread The Word!!</div>
      </div>
    </div>
  );
}

export default CoinVstSuccess;
