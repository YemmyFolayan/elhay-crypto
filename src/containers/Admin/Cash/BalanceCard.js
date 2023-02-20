import React, { useState, useRef } from 'react';
import { toWholeCurrency } from 'helpers/utils';

const BalanceCard = ({
  onClick,
  nairaAmount,
  dollarAmount,
  transfer,
  accountNumber,
  toggleCurrency,
  currency,
  request,
}) => {
  const [showAmount, setShowAmount] = useState(false);
  const toggleShow = () => setShowAmount(!showAmount);
  const board = useRef(null);
  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(accountNumber);
  };
  //   true ? naira : usd

  return (
    <div
      className="w-100 d-flex flex-column p-4 balancecard"
      style={{
        background: '#FCFFFA',
        border: '0.5px solid #000000',
        borderRadius: '20px',
        height: '230px',
      }}
    >
      <div className="text-uppercase mb-3 d-flex justify-content-between">
        {/* <span>{!showAmount ? 'Your Providus Account Number' : 'your NetWebPay Balance' }</span> */}
        <span>your NetWebPay Balance</span>

        <span
          className="d-inline-flex justify-content-between align-items-center position-relative"
          onClick={toggleCurrency}
          style={{
            height: '34px',
            width: '84px',
            backgroundColor: '#F0F3EE',
            cursor: 'pointer',
            position: 'absolute',
            border: '0.5px solid #E4AD50',
            borderRadius: '5px',
            padding: '5px 8px',
            color: '#000000',
          }}
        >
          <span
            className="position-absolute"
            style={{
              backgroundColor: '#000000',
              borderRadius: '5px',
              bottom: '4px',
              height: '26px',
              left: '4px',
              transition: '.4s',
              width: '38px',

              ...(!currency && { transform: 'translateX(38px)' }),
            }}
          ></span>
          <span
            style={{
              zIndex: 0,
              transition: '.4s',
              ...(currency && { color: '#F0F3EE' }),
            }}
            className="user-select-none font-weight-bold"
          >
            NGN
          </span>
          <span
            style={{
              zIndex: 0,
              transition: '.4s',
              ...(!currency && { color: '#F0F3EE' }),
            }}
            className="user-select-none font-weight-bold"
          >
            USD
          </span>
        </span>
      </div>

      <div className="mb-3 d-flex">
        {/* {showAmount && <span
          style={{ fontSize: '1.5rem' }}
          className="d-flex flex-column align-items-start mr-2"
        >
          {currency ? '₦' : '$'}
        </span>} */}
        <span
          style={{
            lineHeight: '65px',
            fontSize: '35px',
          }}
          className="mr-2"
        >
          {showAmount && (currency ? '₦' : '$')}
          {showAmount
            ? toWholeCurrency(currency ? nairaAmount : dollarAmount)
            : '****'}
        </span>

        <span
          style={{ fontSize: '1.5rem', cursor: 'pointer' }}
          className="d-flex flex-column align-items-start"
          onClick={toggleShow}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <g clipPath="url(#clip0)">
              <path
                d="M12.0003 8.72729C10.1948 8.72729 8.72754 10.1945 8.72754 12C8.72754 13.8055 10.1948 15.2727 12.0003 15.2727C13.8057 15.2727 15.273 13.8055 15.273 12C15.273 10.1945 13.8057 8.72729 12.0003 8.72729Z"
                fill="#000000"
              />
              <path
                d="M12 3.81812C6.54546 3.81812 1.88729 7.21081 0 11.9999C1.88729 16.789 6.54546 20.1818 12 20.1818C17.46 20.1818 22.1128 16.789 24.0001 11.9999C22.1128 7.21081 17.46 3.81812 12 3.81812ZM12 17.4545C8.98911 17.4545 6.54546 15.0108 6.54546 11.9999C6.54546 8.98898 8.98911 6.54537 12 6.54537C15.0109 6.54537 17.4546 8.98903 17.4546 11.9999C17.4546 15.0108 15.0109 17.4545 12 17.4545Z"
                fill="#000000"
              />
            </g>
            <defs>
              <clipPath id="clip0">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </span>

        {/* {transfer && <span
          style={{
            lineHeight: '65px',
            fontSize: '65px',
          }}
          className="mr-2"
        >
          {isNaN( toWholeCurrency(currency ? nairaAmount : dollarAmount)) ? '******' :toWholeCurrency(currency ? nairaAmount : dollarAmount) }
        </span> } */}
      </div>

      {accountNumber
        ? currency && (
            <div
              ref={board}
              className="balance-account"
              onClick={() => copyCodeToClipboard()}
            >
              <p>Providus Account Number</p>
              <p className="balance-account__subtitle">{accountNumber}</p>
              {/* <Shortinfo
            subject="Click to copy to clipboard"
          /> */}
            </div>
          )
        : currency && (
            <button
              onClick={() => request()}
              style={{
                color: '#000000',
                width: 'fit-content',
                fontSize: '1rem',
              }}
              // onClick={onClick}
              className="bg-transparent px-0 text-left"
            >
              Request For An Account number <i class="fas fa-arrow-right"></i>
            </button>
          )}
      {/* <div>
        <button
          style={{ color: '#000000' }}
          onClick={onClick}
          className="bg-transparent px-0 text-left"
        >
          Fund vesti Wallet
          <span className="ml-2 d-inline-flex align-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="11"
              viewBox="0 0 12 11"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.219 10.7797C5.28867 10.8495 5.37143 10.9049 5.46255 10.9427C5.55367 10.9805 5.65135 11 5.75 11C5.84865 11 5.94633 10.9805 6.03745 10.9427C6.12857 10.9049 6.21133 10.8495 6.281 10.7797L10.781 6.27966C10.8508 6.20999 10.9063 6.12723 10.9441 6.03611C10.9819 5.94499 11.0013 5.84731 11.0013 5.74866C11.0013 5.65001 10.9819 5.55233 10.9441 5.46121C10.9063 5.37009 10.8508 5.28733 10.781 5.21766L6.281 0.717661C6.14017 0.576831 5.94916 0.497714 5.75 0.497714C5.55083 0.497714 5.35983 0.576831 5.219 0.717661C5.07817 0.858491 4.99905 1.0495 4.99905 1.24866C4.99905 1.44782 5.07817 1.63883 5.219 1.77966L9.1895 5.74866L5.219 9.71766C5.14915 9.78733 5.09374 9.87009 5.05593 9.96121C5.01812 10.0523 4.99866 10.15 4.99866 10.2487C4.99866 10.3473 5.01812 10.445 5.05593 10.5361C5.09374 10.6272 5.14915 10.71 5.219 10.7797Z"
                fill="#000000"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 5.74854C0 5.94745 0.0458074 6.13821 0.127345 6.27887C0.208883 6.41952 0.319471 6.49854 0.434783 6.49854L9.56522 6.49854C9.68053 6.49854 9.79112 6.41952 9.87265 6.27887C9.95419 6.13821 10 5.94745 10 5.74854C10 5.54962 9.95419 5.35886 9.87265 5.2182C9.79112 5.07755 9.68053 4.99854 9.56522 4.99854L0.434783 4.99854C0.319471 4.99854 0.208883 5.07755 0.127345 5.2182C0.0458074 5.35886 0 5.54962 0 5.74854Z"
                fill="#000000"
              />
            </svg>
          </span>
        </button>
      </div> */}
    </div>
  );
};

export default BalanceCard;
