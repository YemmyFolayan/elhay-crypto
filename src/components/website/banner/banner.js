import React from 'react';
import './banner.scss';
import banner from '../../../assets/coins.svg';
import { Download } from './download';
import playstore from '../../../assets/playstore.svg';
import apple from '../../../assets/apple.svg';
import Typewriter from 'typewriter-effect';
export const Banner = () => {
  return (
    <div className="banner-container">
      <div className="banner-inner-container">
        <div className="banner-inner-container left">
          <div className="top">
            <Typewriter
              style={{ width: '384px' }}
              onInit={typewriter => {
                typewriter
                  .typeString(
                    '<p className=""> Elhay Cryptocurrency </p>',
                  )
                  .pauseFor(2500)
                  .start();
              }}
            />
            <p>
            NetWebPay is a global web-based payment platform that enables you to send and receive money, make payments and perform complex financial transations.
            </p>
          </div>
      
        </div>
        <div className="banner-inner-container right">
          <img src={banner} alt="Banner SVG" />
        </div>
      </div>
    </div>
  );
};
