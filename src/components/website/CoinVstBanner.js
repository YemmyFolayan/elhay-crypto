import React from 'react';
import coingreen from '../../assets/coingreen.svg';
import comingsoon from '../../assets/comingsoon.svg';
import './Styles/CoinVstBanner.scss';
import bkg from '../../assets/background.svg';
import './top/top.scss';

function CoinVstBanner(props) {
  return (
    <div className="Coin-page">
      <div className="top-background-container">
        <img src={bkg} alt="background" />
      </div>
      <div className="container">
        <div className="coin-image text-center">
          <img className="img-fluid h-100" src={coingreen} alt="Coins" />
        </div>
        <div className="coin-text text-center">
          <div className="coming-soon">
            <img className="img-fluid h-100" src={comingsoon} alt="New" />
          </div>
          <p>
            Introducing <span className="vst">vesti Coin VST</span>
          </p>
          <p>
            Join the vesti Coin Waitlist, We are always working to get our
            services to all our users. Be the first to know when we launch.
          </p>
        </div>
        <div
          className="waitlist-btn text-center"
          onClick={() => props.showModal()}
        >
          Join The Waitlist
        </div>
      </div>
    </div>
  );
}

export default CoinVstBanner;
