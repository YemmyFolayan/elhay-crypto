import { CREATE_MONO_CARD, CARD_ACTION, FETCH_CARD } from 'appRedux/constants';

const INIT_STATE = {
  loading: false,
  cardLoading: false,
  message: null,
  error: null,
  isSuccessful: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case CREATE_MONO_CARD:
      return {
        ...state,
        loading: false,
        error: null,
        ...action.payload,
      };
    case CARD_ACTION:
      return {
        ...state,
        ...action.payload,
      };
    case FETCH_CARD:
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
