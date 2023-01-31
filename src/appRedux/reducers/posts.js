import {
  FETCH_POSTS_START,
  FETCH_POSTS,
  FETCH_POSTS_FAIL,
} from 'appRedux/constants';

const INIT_STATE = {
  loading: false,
  data: [],
  error: null,
  isSuccessful: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_POSTS_START:
      return {
        ...state,
        loading: true,
      };

    case FETCH_POSTS:
      return {
        ...state,
        isSuccessful: true,
        loading: false,
        data: action.payload,
      };

    case FETCH_POSTS_FAIL:
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
