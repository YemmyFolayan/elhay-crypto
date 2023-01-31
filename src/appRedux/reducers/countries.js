import {
  FETCH_COUNTRIES_START,
  FETCH_COUNTRIES,
  FETCH_COUNTRIES_FAIL,
} from 'appRedux/constants';

const INIT_STATE = {
  loading: false,
  data: [],
  error: null,
  isSuccessful: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_COUNTRIES_START:
      return {
        ...state,
        loading: true,
      };

    case FETCH_COUNTRIES:
      return {
        ...state,
        isSuccessful: true,
        loading: false,
        data: action.payload,
      };

    case FETCH_COUNTRIES_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        isSuccessful: false,
      };

    default:
      return state;
  }
};
