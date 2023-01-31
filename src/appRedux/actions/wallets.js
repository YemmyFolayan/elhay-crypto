import { FOUNDERS_WALLET, USD_WALLET } from 'appRedux/constants';

export const walletAction = value => ({
  type: FOUNDERS_WALLET,
  payload: value,
});

export const walletUsdAction = value => ({
  type: USD_WALLET,
  payload: value,
});
