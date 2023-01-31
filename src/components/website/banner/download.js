import React from 'react';
import './download.scss';

export const Download = props => {
  const openStore = url => {
    window.open(url);
  };
  return (
    <div className="download-container" onClick={() => openStore(props.link)}>
      <div className="download-inner-container">
        <div className="download-inner-container left">
          <img src={props.image} alt="Playstore SVG" />
        </div>
        <div className="download-inner-container right">
          <p>GET IT ON</p>
          <p>{props.title}</p>
        </div>
      </div>
    </div>
  );
};
