import { useLocation } from '@reach/router';
// import { openLoan } from 'appRedux/actions/domore';
import { useDispatch } from 'react-redux';
import { navigate } from '@reach/router';
import black from 'assets/vcards/gg-black.svg';
import blue from 'assets/vcards/gg-blue.svg';
import green from 'assets/vcards/gg-green.svg';
import purple from 'assets/vcards/gg-purple.svg';
import yellow from 'assets/vcards/gg-yellow.svg';
import save from 'assets/save_tr.svg';
import deposit from 'assets/deposit_tr.svg';
import withdraw from 'assets/withdraw_tr.svg';
import airtime from 'assets/airtime_tr.svg';
import transfer from 'assets/transfer_tr.svg';

import {
  usd,
  naira,
  nairapattern,
  founders
} from 'assets/assets';

export const objectValuesStringify = obj => Object.values(obj).join(', ');

export const useUrlQuery = queryParam => {
  const search = new URLSearchParams(useLocation().search);
  console.log('qp', queryParam);
  return search.get(queryParam);
};

export const roundToXDigits = (value, digits) => {
  if (!digits) {
    digits = 2;
  }
  value = value * Math.pow(10, digits);
  value = Math.round(value);
  value = value / Math.pow(10, digits);
  return value;
};

export const formatAmount = (amount, n, x) => {
  const re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
  return amount.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};

export const getCurrency = cur => {
  switch (cur) {
    case 'USD_CENTS':
      return '$';
    case 'CAD_CENTS':
      return 'C$';
    case 'NGN_KOBO':
      return '₦';
    default:
      return '';
  }
};

export const getCurrencyName = cur => {
  switch (cur) {
    case 'USD_CENTS':
      return 'USD';
    case 'CAD_CENTS':
      return 'CAD';
    case 'NGN_KOBO':
      return 'Naira';
    default:
      return '';
  }
};

export const getCardImage = cur => {
  switch (cur) {
    case 'Black':
      return black;
    case 'Blue':
      return blue;
    case 'Green':
      return green;
    case 'Purple':
      return purple;
    case 'Yellow':
      return yellow;
    default:
      return '';
  }
};

export const getCardApi = value => {
  switch (value) {
    case 'Stripe':
      return 'stripe/fundCardFromWallet';
    case 'Juice':
      return 'juice/fundCardFromWallet';
    case 'Mono':
      return 'mono/fund_card';
    default:
      return '';
  }
};

export const getCardPinApi = value => {
  switch (value) {
    case 'Stripe':
      return 'stripe/changeCardPin';
    case 'Juice':
      return 'juice/changeCardPin';
    case 'Mono':
      return 'mono/cards/update_pin';
    default:
      return '';
  }
};

export const __renderRouting = value => {
  switch (value) {
    case 'ROUTING_NUMBER':
      return 'Routing Number';
    case 'SWIFT':
      return 'Swift Code';
    case 'BIC':
      return 'BIC';
    default:
      return '';
  }
};

export const __renderWalletName = value => {
  switch (value) {
    // case 'CRYPTO WALLET BALANCE':
    //   return ' --Founders';
    case 'NAIRA WALLET BALANCE':
      return ' --Naira';
    case 'USD WALLET BALANCE':
      return ' --Usd';
    default:
      return '';
  }
};

export const __renderWalletSvg = value => {
  switch (value) {
    // case 'CRYPTO WALLET BALANCE':
    //   return founders;
    case 'NAIRA WALLET BALANCE':
      return nairapattern;
    case 'USD WALLET BALANCE':
      return nairapattern;
    default:
      return '';
  }
};

export const toWholeCurrency = num => num.toLocaleString();

export const errorMessage = error => {
  if (error?.data?.errors) {
    return objectValuesStringify(error?.data?.errors);
  } else {
    return error?.data?.message || error.message;
  }
};

export const pathwayActionFunc = (value, name) => {
  // eslint-disable-next-line
  var dispatch = useDispatch;
  switch (value) {
    // case 'Proof of fund' || 'Proof of Funds'  || 'Proof of Fund' || 'proof of fund' || 'proof of funding':
    //   return dispatch(openLoan())
    // case 'Pay for Proof of Funds':
    //   return dispatch(openLoan())
    case 'Pay for Initial Evaluation':
      return window.open('https://calendly.com/vesti/founderpaid');
    case 'Virtual Call Meeting':
      return window.open('https://calendly.com/vesti/founderpaid');
    default:
      return navigate(`/merchants?merchant=${name}`);
  }
};

export const pathwayActionLink = value => {
  switch (value) {
    case 'Virtual Call Meeting':
      return 'Schedule Meeting';
    case 'Pay for Initial Evaluation':
      return 'Schedule Meeting';
    case 'Apply for Proof of Fund':
      return 'Apply For Proof Of Fund';
    default:
      return value;
  }
};

export const openLink = value => {
  window.open(value);
};

export const openMail = value => {
  window.location.href = `mailto:${value}`;
};
export const removeCommaAmount = value => {
  return parseFloat(
    value
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      .replace(/,/g, ''),
  );
};

export const returnAmount = value => {
  return value === 'NaN' ? 0 : value.toLocaleString('en-US');
};

export const transImg = value => {
  switch (value) {
    case 'WITHDRAWAL':
    case 'DEBIT':
    case 'LIEN':
    case 'PLACE':
      return withdraw;
    case 'TRANSFER':
      return transfer;
    case 'SAVING':
      return save;
    case 'AIRTIME':
      return airtime;
    default:
      return deposit;
  }
};

export const transColor = value => {
  switch (value) {
    case 'WITHDRAWAL':
    case 'DEBIT':
    case 'TRANSFER':
    case 'LIEN':
    case 'PLACE':
    case 'SAVING':
      return '-red';
    case 'AIRTIME':
      return '-red';
    default:
      return '-green';
  }
};

export const transSign = value => {
  switch (value) {
    case 'WITHDRAWAL':
    case 'DEBIT':
    case 'LIEN':
    case 'PLACE':
    case 'TRANSFER':
      return '- ';
    case 'SAVING':
    case 'AIRTIME':
      return '- ';
    default:
      return '+';
  }
};
