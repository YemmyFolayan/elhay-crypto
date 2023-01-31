import React, { useState } from 'react';
import './CardOfferings.scss';
import numberone from '../../../assets/numberone.svg';
import numbertwo from '../../../assets/numbertwo.svg';
import numberthree from '../../../assets/numberthree.svg';
import virtual from '../../../assets/virtualcard1.png';
import globalgeng from '../../../assets/vcard-2.png';
import dollar from '../../../assets/vcard-3.png';

const CardOfferings = () => {
  const [show, setShow] = useState('image1');

  const handleClick = value => {
    setShow(value);
  };

  return (
    <div>
      <div className="cardofferings-container">
        <div className="cardofferings-inner">
          <div className="mt-5 pt-5 cardofferings-inner top">
            <p>Our Card Offerings.</p>
            <p className="text-center">
              Spend safely online, in-store and abroad choosing from a variety
              of our new cards.
            </p>
          </div>
          <div className="cardofferings-inner bottom">
            <div className="bottom-inner">
              <SingleCardOfferings
                onClick={handleClick}
                show={show}
                image={numberone}
                title="Virtual Dollar Card (Founders' Card)"
                text="Get a Virtual Dollar Card on us. 
                Thousands of people choose the 
                Virtual Dollar Card to make Immigration payments,  
                application fees, tuition and other utilities. Issued
                in partnership with Stripe"
                active="image1"
                number="1"
              />
              <SingleCardOfferings
                onClick={handleClick}
                show={show}
                image={numbertwo}
                title="GlobalGeng Card (Naira Debit Card)"
                text="Moving abroad soon, get the GlobalGeng card, so your financial transitions are easy. A Card that works everywhere.
                Issued in partnership with Providus Bank Nigeria"
                active="image2"
                number="2"
              />
              <SingleCardOfferings
                onClick={handleClick}
                show={show}
                image={numberthree}
                title="Dreamers' Card (Coming Soon)"
                text="Need the comfort of a high profile pyhsical card, 
                                and the lifestyle that comes with it? Then this is your card."
                active="image3"
                number="3"
              />
            </div>
            <div className="matching-images">
              <img
                src={virtual}
                className={`${show === 'image1' ? ' active' : ''}`}
                alt=""
              />
              <img
                src={globalgeng}
                className={`${show === 'image2' ? ' active' : ''}`}
                alt=""
              />
              <img
                src={dollar}
                className={`${show === 'image3' ? ' active' : ''}`}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardOfferings;

const SingleCardOfferings = props => {
  return (
    <>
      <div
        className={`card ${props.show === props.active ? ' active' : ''}`}
        style={{ width: '25rem' }}
        onClick={() => props.onClick(props.active)}
      >
        <div className="card-body">
          <div className="card-number">{props.number}</div>
          <h5 className="card-title mb-2">{props.title}</h5>
          <p className="card-text">{props.text}</p>
        </div>
      </div>
    </>
  );
};
