import { editStripeAccountModal } from 'appRedux/actions/Common';
import { walletAction } from 'appRedux/actions/wallets';
import Loader from 'components/Loader';
import { __renderWalletName, __renderWalletSvg } from 'helpers/utils';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './balancecard.scss';

export const Wallets = props => {
  // const [active, setActive] = useState(0)
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  var data = [
    {
      name: 'Founders Wallet',
      amount: props.foundersBalance,
      currency: '$',
      buttons: [
        // {
        //     name:`See Details`,
        //     click: () => dispatch(editStripeAccountModal(true))
        // },
        {
          name: `Send Money`,
          click: () =>
            dispatch(walletAction({ open: true, action: 'withdraw' })),
        },
        {
          name: `Add Money`,
          click: () =>
            dispatch(walletAction({ open: true, action: 'deposit' })),
        },
      ],
    },
    {
      name: 'Naira wallet',
      amount: props.nairaAmount,
      accountNumber: props.accountNumber,
      currency: '₦',
      buttons: [
        {
          name: `Send Money`,
          click: () => props.withdraw(),
        },
        {
          name: `Add Money`,
          click: () => props.deposit(),
        },
      ],
    },
    {
      name: 'Usd wallet',
      currency: '$',
      amount: props.currency ? props.nairaAmount : props.dollarAmount,
      buttons: [
        {
          name: `Send Money`,
          click: () => props.withdrawUsd(),
        },
        {
          name: `Add Money`,
          click: () => props.depositUsd(),
        },
      ],
    },
  ];
  const [fulldata, setData] = useState(data);

  useEffect(() => {
    props.stripeVirtualAccountNumber
      ? props.transfer
        ? setData(data.slice(1, 3))
        : setData(data)
      : setData(data.slice(1, 3));
    // eslint-disable-next-line
  }, [props.userdata, props.foundersBalance, props.currency]);
  if (props.userdata.walletInNGNKobo) {
    return (
      <div className="wallets">
        <div className="wallets__row">
          <Singlebalance
            data={fulldata[props.active]}
            show={show}
            transfer={props.transfer}
            setShow={setShow}
            userdata={props.userdata}
            request={props.request}
            seeDetails={() => dispatch(editStripeAccountModal(true))}
            nairaAccount={props.nairaAccount}
            stripeVirtualAccountNumber={props.stripeVirtualAccountNumber}
          />
        </div>
        <div className="wallets__boxes">
          {(props.transfer ? data.slice(1, 3) : fulldata ?? []).map(
            (item, index) => (
              <div
                key={index}
                className={`balancecontainer__boxes__box${
                  props.active === index ? ' --active' : ''
                }`}
                onClick={() => props.setActive(index)}
              ></div>
            ),
          )}
        </div>
      </div>
    );
  } else {
    return <Loader />;
  }
};

const Singlebalance = props => {
  var __renderLink = () => {
    switch (props.data.name) {
      case 'Founders Wallet':
        return <Seedetails click={props.seeDetails} />;
      case 'Naira wallet':
        return props.userdata.providusAccountNumber ? (
          <Seedetails click={() => props.nairaAccount()} />
        ) : (
          <p className="wallet__details" onClick={() => props.request()}>
            Request account number <i class="fas fa-arrow-right" />{' '}
          </p>
        );
      default:
        return <p className="wallet__details"></p>;
    }
  };
  return (
    <div
      className={`wallet  ${__renderWalletName(props.data.name)}`}
      key={props.key}
    >
      <img src={__renderWalletSvg(props.data.name)} alt="wallet" />
      <div className="wallet__top">
        <p className="wallet__title">{props.data.name}</p>
        <span className="wallet__balance">
          <p>
            {props.data.currency}{' '}
            {props.show
              ? props.data.amount.toString() === 'NaN'
                ? 0.0
                : props.data.amount.toLocaleString('en-US')
              : 'XXX'}
          </p>
          <i
            className={`fas fa-${props.show ? 'eye' : 'eye-slash'}`}
            onClick={() => props.setShow(!props.show)}
          />
        </span>
      </div>
      {!props.transfer && (
        <div className="wallet__bottom">
          {__renderLink()}
          <div className="wallet__btns">
            {props.data.buttons.map((item, index) => (
              <button
                key={index}
                className="wallet__btn "
                onClick={() => item.click()}
              >
                {' '}
                {item.name}{' '}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const Seedetails = props => {
  return (
    <p className="wallet__details" onClick={() => props.click()}>
      Click to see account details
      <i class="far fa-question-circle" />
    </p>
  );
};
