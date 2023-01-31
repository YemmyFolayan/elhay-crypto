import api from 'appRedux/api';
import React, { useEffect, useState } from 'react';
import './vestirate.scss';

export const Vestirate = props => {
  const [rate, setRate] = useState({});
  var rates = () => {
    api
      .get('/merchant-prices')
      .then(res => {
        setRate(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    rates();
  }, []);
  return (
    <span className="vestirate">
      <p>{props.title ? props.title : 'OUR PROVIDER RATE'}</p>
      <span className="vestirate__rate">
        {props.reverse ? (
          <p>
            {Object.keys(rate).length > 0
              ? ` ${
                  props.card
                    ? props.name === 'Mono'
                      ? rate.MONO_CARD_RATE / 100
                      : rate.CARD_EXCHANGE_RATE / 100
                      ? props.rate
                      : rate.CARD_EXCHANGE_RATE / 100
                    : rate.EXCHANGE_RATE / 100
                } NGN  ≈  1 USD`
              : 'rate loading...'}
          </p>
        ) : (
          <p>
            {Object.keys(rate).length > 0
              ? ` 1 USD ≈  ${
                  props.card
                    ? props.name === 'Mono'
                      ? rate.MONO_CARD_RATE / 100
                      : rate.CARD_EXCHANGE_RATE / 100
                      ? props.rate
                      : rate.CARD_EXCHANGE_RATE / 100
                    : rate.EXCHANGE_RATE / 100
                } NGN `
              : 'rate loading...'}
          </p>
        )}
        {props.before && (
          <p className="vestirate__before">{props.before} NGN</p>
        )}
      </span>
    </span>
  );
};
