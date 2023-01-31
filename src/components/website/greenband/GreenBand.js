import React from 'react';
import './GreenBand.scss';
import yide from '../../../assets/storyolayide.png';
import whitearrow from '../../../assets/whitearrow.svg';

const GreenBand = () => {
  return (
    <div>
      <div className="greenband-container">
        <div className="greenband-inner">
          <div className="contents">
            <div className="left">
              <p>Read Olayide Olumeko’s Japa Story from Nigeria to UK</p>
              <p>
                From getting a Nigerian passport, to joining the vesti
                community, this ambitious vesti User is defying the odds and
                changing the narrative. Learn more about Olayide’s journey.
              </p>
              <a href="/testimonials">
                Read More Stories <img src={whitearrow} alt="arrowright" />
              </a>
            </div>

            <div className="right">
              <img className="img-fluid" src={yide} alt="yide face" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GreenBand;
