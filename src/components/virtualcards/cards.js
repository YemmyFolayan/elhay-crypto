import React, { useState } from 'react';
import { Singlecard } from './singlecard';
import './cards.scss';
import { navigate } from '@reach/router';
// import api from "appRedux/api";
import pendingcard from 'assets/info-yell.svg';
import Loader from 'components/Loader';

export const Cards = props => {
  const [active, setActive] = useState(0);

  var goTo = () => {
    navigate(`/mycard`, {
      state: {
        cdata: props.cdata[active],
        rate: props.rate,
        balance: props.userData.walletInNGNKobo,
      },
    });
  };

  var fundCard = () => {
    props.setFundmodal({
      value: true,
      id: props.cdata[active].cardId,
      name: props.cdata[active].providerName,
    });
  };
  if (props.loading) {
    return <Loader />;
  } else {
    return (
      <div className="cards">
        {props.cdata.length >= 1 ? (
          <div className="cards__top">
            {props.cdata.length > 0 ? (
              <Singlecard
                userdata={props.userData}
                data={props.cdata[active]}
                goTo={goTo}
                active={active}
                from="true"
                fundCard={fundCard}
              />
            ) : (
              <></>
            )}

            <div className="cards__top__boxes">
              {(props.cdata ?? []).map((item, index) => (
                <div
                  key={index}
                  className={`cards__top__boxes__box${
                    active === index ? ' --active' : ''
                  }`}
                  onClick={() => setActive(index)}
                ></div>
              ))}
            </div>
          </div>
        ) : (
          props.userData.hasVirtualCard === 'PENDING' && (
            <div className={`pendingcard --yellow`}>
              <img src={pendingcard} alt="PENDING" />
              <p className="pendingtitle">
                Your card request has been submitted And your KYC is being
                reviewed by our partner if you do not see your card after
                15minutes, please email support help@elhay.com after which you
                may need to create a card again.
              </p>
            </div>
          )
        )}

        {(props.userData.hasVirtualCard === 'true' ||
          props.userData.hasVirtualCard === true ||
          props.userData.hasVirtualCard === 'false' ||
          props.userData.hasVirtualCard === false) && (
          <div className="cards__createcard" onClick={() => props.create()}>
            <p className='whitetext'>
              {' '}
              <i className="fas fa-plus" ></i> Create New Card
            </p>
          </div>
        )}
      </div>
    );
  }
};
