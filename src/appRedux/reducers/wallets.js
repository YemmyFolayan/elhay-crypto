import { FOUNDERS_WALLET, USD_WALLET } from 'appRedux/constants';

const INIT_STATE = {
  action: '',
  open: false,
  usdOpen: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case FOUNDERS_WALLET:
    case USD_WALLET:
      return {
        ...action.payload,
      };

    default:
      return state;
  }
};
