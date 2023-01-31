import {
  EDIT_STRIPEACCOUNT,
  FETCH_ALL_COUNTRIES,
  FETCH_ALL_STATES,
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  HIDE_MESSAGE,
  SHOW_MESSAGE,
  HANDLE_EVENT,
  REMINDER_EVENT,
  KYC_STATUS,
  HANDLE_ANNOUNCEMENT,
} from 'appRedux/constants';

const INIT_STATE = {
  display: false,
  event: false,
  reminder: false,
  error: '',
  loading: false,
  allLoading: false,
  stripeaccount: false,
  announcement: false,
  message: '',
  fetchLoading: false,
  kycStatus: false,
  countries: [],
  states: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_START: {
      return { ...state, error: '', message: '', loading: true };
    }
    case FETCH_SUCCESS: {
      return {
        ...state,
        error: '',
        message: '',
        loading: false,
        display: true,
      };
    }
    case SHOW_MESSAGE: {
      return { ...state, error: '', message: action.payload, loading: false };
    }
    case FETCH_ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload,
        display: true,
      };
    }
    case HIDE_MESSAGE: {
      return {
        ...state,
        loading: false,
        error: '',
        message: '',
        display: false,
      };
    }
    case FETCH_ALL_COUNTRIES:
      return {
        ...state,
        fetchLoading: false,
        error: null,
        ...action.payload,
      };
    case FETCH_ALL_STATES:
      return {
        ...state,
        fetchLoading: false,
        allLoading: false,
        error: null,
        ...action.payload,
      };

    case HANDLE_EVENT:
    case REMINDER_EVENT:
    case HANDLE_ANNOUNCEMENT:
    case KYC_STATUS:
    case EDIT_STRIPEACCOUNT: {
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
};
