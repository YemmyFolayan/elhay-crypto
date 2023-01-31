import { PAY_MERCHANT } from 'appRedux/constants';

const INIT_STATE = {
  error: '',
  loading: false,
  message: '',
  fetchLoading: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case PAY_MERCHANT:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
