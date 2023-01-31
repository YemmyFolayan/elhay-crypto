import {
  CREATE_STRIPE_CARD,
  FOUNDER_WAITLIST_EDIT,
  WAITLIST_EDIT,
} from 'appRedux/constants';

const INIT_STATE = {
  loading: false,
  message: null,
  error: null,
  isSuccessful: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case FOUNDER_WAITLIST_EDIT:
      return {
        ...state,
        loading: false,
        error: null,
        ...action.payload,
      };
    case CREATE_STRIPE_CARD:
      return {
        ...state,
        loading: false,
        error: null,
        ...action.payload,
      };
    case WAITLIST_EDIT:
      return {
        ...state,
        loading: false,
        error: null,
        ...action.payload,
      };
    default:
      return state;
  }
};
