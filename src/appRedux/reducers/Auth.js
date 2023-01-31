import {
  ON_SHOW_LOADER,
  SHOW_MESSAGE,
  SIGNIN_USER_NOT_ACTIVE,
  RESET_LINK_SUCCESS,
  SIGNIN_USER_SUCCESS,
  SIGNOUT_USER_SUCCESS,
  SIGNUP_ERROR,
  SIGNUP_USER_SUCCESS,
  USER_TOKEN_SET,
  OPENREG,
  SEND_2FA,
} from 'appRedux/constants';
import { getSession } from 'appRedux/store/cookies';

const INIT_STATE = {
  token: getSession(),
  createdPin: 1111,
  loader: false,
  alertMessage: '',
  showMessage: false,
  initURL: '',
  userEmail: null,
  openReg: false,
  // authUser: localStorage.getItem('user'),
  authUser: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SHOW_MESSAGE: {
      return {
        ...state,
        alertMessage: action.payload,
        showMessage: true,
        //loader: false
      };
    }
    case ON_SHOW_LOADER: {
      return {
        ...state,
        loader: true,
      };
    }
    case SIGNIN_USER_SUCCESS: {
      //localStorage.setItem('user', action.payload)
      return {
        ...state,
        //loader: false,
        authUser: action.payload,
      };
    }
    case RESET_LINK_SUCCESS: {
      //localStorage.setItem('user', action.payload)
      return {
        ...state,
        //loader: false,
        userEmail: action.payload,
      };
    }
    case SIGNUP_USER_SUCCESS: {
      return {
        ...state,
        loader: false,
      };
    }
    case SIGNUP_ERROR: {
      return {
        ...state,
        loader: false,
        showMessage: false,
        authUser: null,
      };
    }
    case SIGNIN_USER_NOT_ACTIVE: {
      return {
        ...state,
        alertMessage: action.payload,
        showMessage: true,
        loader: false,
        authUser: null,
      };
    }
    case USER_TOKEN_SET: {
      return {
        ...state,
        token: action.payload,
      };
    }
    case SIGNOUT_USER_SUCCESS: {
      return {
        ...state,
        token: null,
        authUser: null,
        initURL: '',
      };
    }
    case OPENREG: {
      return {
        ...state,
        openReg: action.payload,
      };
    }
    case SEND_2FA: {
      return {
        ...state,
        ...action.payload,
      };
    }

    default:
      return state;
  }
};
