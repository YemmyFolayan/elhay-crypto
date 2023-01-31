import React from 'react';
import './singleteam.scss';
import fbgreen from '../../../assets/fbgreen.svg';
import iggreen from '../../../assets/iggreen.svg';
import twgreen from '../../../assets/twgreen.svg';
import ligreen from '../../../assets/ligreen.svg';
export const Singleteam = props => {
  return (
    <div className="singleteam-container">
      <div className="singleteam-inner">
        <div className="profile-box">
          <img
            src={props.image}
            className="profile"
            alt="placeholder"
            style={{ width: '100%' }}
          />
        </div>

        <p className="vesti-color pt-2">{props.name}</p>
        <p>{props.department}</p>
        <div className="contact-links">
          <a href="no-link">
            <img src={fbgreen} alt="fb" />
          </a>
          <a target="_blank" rel="noopener noreferrer" href={props.linlink}>
            <img src={ligreen} alt="li" />
          </a>
          <a href={props.instlink}>
            <img src={iggreen} alt="ig" />
          </a>
          <a href={props.twtlink}>
            <img src={twgreen} alt="tw" />
          </a>
        </div>
      </div>
    </div>
  );
};
