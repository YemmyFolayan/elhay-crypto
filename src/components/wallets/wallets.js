import React, { useState } from 'react';
import { Walletcard } from './walletcard';
import './wallets.scss';

export const Wallets = props => {
  const [active, setActive] = useState(0);

  const data = [
    {
      id: 1,
      name: 'vesti Wallet',
      amount: props.nairaAmount,
      currency: '₦',
    },
    {
      id: 2,
      name: 'Dollar Wallet',
      amount: props.sila_balance / 100,
      currency: '$',
      link: props.link,
    },
  ];

  const data2 = [
    {
      id: 1,
      name: 'vesti Wallet',
      amount: props.nairaAmount,
      currency: '₦',
    },
  ];

  const data3 = [
    {
      id: 1,
      name: 'vesti Wallet',
      amount: props.nairaAmount,
      currency: '₦',
    },
    {
      id: 2,
      name: 'Dollar Wallet',
      amount: props.dollarAmount,
      currency: '$',
    },
  ];
  return (
    <div className="wallets">
      {props.country === 'USA' ? (
        <>
          {' '}
          <Walletcard data={data[active]} />
          <div className="wallets__boxes">
            {(props.silaAccountName !== null ? data : data2).map(
              (item, index) => (
                <div
                  key={index}
                  className={`wallets__boxes__box${
                    active === index ? ' --active' : ''
                  }`}
                  onClick={() => setActive(index)}
                ></div>
              ),
            )}
          </div>{' '}
        </>
      ) : (
        <>
          {' '}
          <Walletcard data={data3[active]} />
          <div className="wallets__boxes">
            {data3.map((item, index) => (
              <div
                key={index}
                className={`wallets__boxes__box${
                  active === index ? ' --active' : ''
                }`}
                onClick={() => setActive(index)}
              ></div>
            ))}
          </div>{' '}
        </>
      )}
    </div>
  );
};
