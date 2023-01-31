import {
  FETCH_PROFILES,
  FETCH_PROFILE_START,
  FETCH_PROFILE_SINGLE,
  FETCH_PROFILE_FAIL,
  UPDATE_LOCATION,
  UPDATE_NUMBER,
  UPDATE_USERNAME,
  UPDATE_EMAIL,
  SEND_VERIFICATION,
} from 'appRedux/constants';

const INIT_STATE = {
  loading: false,
  profiles: [],
  singleProfile: {},
  error: null,
  isSuccessful: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_PROFILE_START:
      return {
        ...state,
        loading: true,
      };
    case SEND_VERIFICATION:
      return {
        ...state,
        loading: action.payload,
      };
    case FETCH_PROFILES:
      return {
        ...state,
        loading: false,
        isSuccessful: true,
        profiles: action.payload,
      };

    case FETCH_PROFILE_SINGLE:
      return {
        ...state,
        isSuccessful: true,
        loading: false,
        singleProfile: action.payload,
      };

    case FETCH_PROFILE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case UPDATE_USERNAME:
      return {
        ...state,
        singleProfile: {
          ...state.singleProfile,
          username: action.payload,
        },
      };
    case UPDATE_LOCATION:
      return {
        ...state,
        singleProfile: {
          ...state.singleProfile,
          location: action.payload,
          country: action.payload,
        },
      };
    case UPDATE_NUMBER:
      return {
        ...state,
        singleProfile: {
          ...state.singleProfile,
          phoneNumber: action.payload,
        },
      };

    case UPDATE_EMAIL:
      return {
        ...state,
        singleProfile: {
          ...state.singleProfile,
          email: action.payload,
        },
      };

    default:
      return state;
  }
};
