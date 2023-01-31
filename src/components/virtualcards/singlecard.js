import React, { useState } from 'react';
import vwhite from 'assets/NetWebPaywhite.svg';
import './singlecard.scss';
import { openUpdateBox } from 'appRedux/actions/update';
import { useDispatch } from 'react-redux';
import { getCardImage } from 'helpers/utils';

export const Singlecard = props => {
  const [show, setShow] = useState(false);
  var dispatch = useDispatch();

  var openUpdateModal = () => {
    dispatch(openUpdateBox());
  };

  switch (props.data.providerName) {
    case 'Mono':
      return (
        <Monocard
          userdata={props.userdata}
          data={props.data}
          show={show}
          setShow={setShow}
          goTo={props.goTo}
          from={props.from}
          openUpdateModal={openUpdateModal}
        />
      );
    case 'Stripe':
      return (
        <Founderscard
          userdata={props.userdata}
          data={props.data}
          show={show}
          setShow={setShow}
          goTo={props.goTo}
          from={props.from}
          details={props.details}
          openUpdateModal={openUpdateModal}
        />
      );
    default:
      return (
        <Founderscard
          userdata={props.userdata}
          data={props.data}
          show={show}
          setShow={setShow}
          goTo={props.goTo}
          from={props.from}
          details={props.details}
          openUpdateModal={openUpdateModal}
        />
      );
  }
};

export const Monocard = props => {
  const [show, setShow] = useState(false);
  var cardNumber = props.from ? props.data.cardNumber : props.data.cardNumber;
  return (
    <div
      className={`singlecard${
        props.data.providerName === 'Stripe'
          ? ' --white'
          : ' --' + props.data.cardColor
      }`}
    >
      <div className="singlecard__top">
        <span className="singlecard__name">
          <p className="singlecard__holder">{props.data.cardName}</p>
          {
            <p className="singlecard__number">
              {show
                ? cardNumber.replace(/(\d{4})/g, '$1 ')
                : cardNumber
                ? 'XXXX XXXX XXXX' + cardNumber.slice(-4)
                : 'XXXXXX'}
              <i
                className={`fas fa-${show ? 'eye-slash' : 'eye'}`}
                onClick={() => setShow(!props.show)}
              ></i>
            </p>
          }
        </span>
        <i className="fab fa-cc-visa"></i>
      </div>

      <img
        src={getCardImage(props.data.cardColor)}
        className="singlecard__gg"
        alt="gg"
      />
      <div className="singlecard__bottom">
        <span className="singlecard__balance">
          <p>BALANCE</p>
          <p>
            $
            {props.from
              ? (props.data.customerBalance / 100).toLocaleString('en-us')
              : (parseInt(props.data.customerBalance) / 100).toLocaleString(
                  'en-us',
                )}
          </p>
        </span>

        {props.from ? <></> : <img src={vwhite} alt="NetWebPay white" />}
      </div>

      {!props.details && (
        <span className="singlecard__bottom">
          <p
            className="singlecard__link"
            onClick={() =>
              props.userdata.kylevel === 'Level0'
                ? props.openUpdateModal()
                : props.goTo()
            }
          >
            See card details <i className="fas fa-arrow-right"></i>
          </p>
          <img src={vwhite} alt="NetWebPay white" />
        </span>
      )}

      {props.children}
    </div>
  );
};

export const Founderscard = props => {
  const [show, setShow] = useState(false);
  return (
    <div
      className={`singlecard${
        props.data.providerName === 'Stripe'
          ? ' --white'
          : ' --' + props.data.cardColor
      }`}
    >
      <div className="singlecard__top">
        <span className="singlecard__name">
          <p className="singlecard__holder">
            {props.data.cardObject.card_name ||
              props.data.cardHolderObject.card_name ||
              props.data.cardHolderObject.name}
          </p>
          <p className="singlecard__number">
            {show
              ? props.data.cardNumber
                ? props.data.cardNumber.replace(/(\d{4})/g, '$1 ')
                : props.data.cardNumber
              : props.data.cardDisplay &&
                props.data.cardDisplay.replace(/(\d{4})/g, '$1 ')}
            <i
              className={`fas fa-${show ? 'eye-slash' : 'eye'}`}
              onClick={() => setShow(!show)}
            ></i>
          </p>
        </span>
        {props.data.cardBrand === 'Visa' ? (
          <i className="fab fa-cc-visa"></i>
        ) : (
          <i className="fab fa-cc-mastercard"></i>
        )}
      </div>
      <div className="singlecard__bottom">
        {props.data.providerName !== 'Stripe' && (
          <span className="singlecard__balance">
            <p>BALANCE</p>
            <p>
              $
              {props.from
                ? (props.data.customerBalance / 100).toLocaleString('en-us')
                : (parseInt(props.data.customerBalance) / 100).toLocaleString(
                    'en-us',
                  )}
            </p>
          </span>
        )}

        {props.from ? <></> : <img src={vwhite} alt="NetWebPay white" />}
      </div>
      {!props.details && (
        <span className="singlecard__bottom">
          <p
            className="singlecard__link"
            onClick={() =>
              props.userdata.kylevel === 'Level0'
                ? props.openUpdateModal()
                : props.goTo()
            }
          >
            See card details <i className="fas fa-arrow-right"></i>
          </p>
          <img src={vwhite} alt="NetWebPay white" />
        </span>
      )}

      {props.children}
    </div>
  );
};
