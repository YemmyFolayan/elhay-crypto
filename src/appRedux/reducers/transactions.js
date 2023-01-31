import {
  FETCH_TRANSACTIONS_START,
  FETCH_TRANSACTIONS,
  FETCH_TRANSACTIONS_FAIL,
  SUCCESSFUL_TRANSACTION,
  OPEN_PAUSE,
  CLOSE_PAUSE,
  EDIT_STRIPE,
  STRIPE_TRANSACTION,
  WALLET_TRANS,
  WALLET_TRANSACTION,
} from 'appRedux/constants';

const INIT_STATE = {
  loading: false,
  cardloading: false,
  transLoading: false,
  transMessage: '',
  message: '',
  data: [],
  error: null,
  isSuccessful: false,
  updateOntrans: false,
  updateOntransMessage: '',
  step: 0,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_TRANSACTIONS_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_TRANSACTIONS:
      return {
        ...state,
        isSuccessful: true,
        loading: false,
        data: action.payload,
      };

    case FETCH_TRANSACTIONS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        isSuccessful: false,
      };
    case SUCCESSFUL_TRANSACTION:
      return {
        ...state,
        step: action.payload,
      };
    case OPEN_PAUSE:
      return {
        ...state,
        updateOntrans: true,
        updateOntransMessage: action.payload,
      };
    case CLOSE_PAUSE:
      return {
        ...state,
        updateOntrans: false,
        updateOntransMessage: '',
      };
    case EDIT_STRIPE: {
      return { ...state, ...action.payload };
    }
    case STRIPE_TRANSACTION:
    case WALLET_TRANSACTION: {
      return { ...state, ...action.payload };
    }
    case WALLET_TRANS: {
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
};
