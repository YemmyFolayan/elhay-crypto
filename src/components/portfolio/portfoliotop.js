import React from 'react';
import { Percentage } from './percentage';
import lowrl from '../../assets/lowrl.svg';
import './portfoliotop.scss';

export const Portfoliotop = props => {
  const data = ['Today', 'All Time'];
  return (
    <div className="portfolio-top">
      <div className="portfolio-top__top">
        <div className={`my-image ${props.circle ? '--circle' : ''}`}></div>
        <div className="portfolio-top__top __top-left">
          <div className="left-details">
            <p> {props.title ? props.title : 'Low Risk Portfolio'}</p>
            <p>
              {props.subtitle
                ? props.subtitle
                : 'This portfolio is for user whose risk appetite is very conservative.'}
            </p>
          </div>
          {props.circle && <button className="asset-button">Add Asset</button>}
        </div>
      </div>
      <hr />
      <div className="portfolio-top__bottom">
        {data.map((item, index) => (
          <Detail key={index} title={item} />
        ))}
        <Detail title="Risk Level">
          <Level />
        </Detail>
      </div>
      <hr />
    </div>
  );
};

const Detail = props => {
  return (
    <div className="detail">
      <p>{props.title}</p>
      {props.children ? props.children : <Percentage price="5.0%" />}
    </div>
  );
};

const Level = () => {
  return (
    <div className="risklevel">
      <img src={lowrl} alt="" />
      <p>Low Risk</p>
    </div>
  );
};
