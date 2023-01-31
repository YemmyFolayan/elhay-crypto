import {
  OPEN_UPDATE_KYC,
  CLOSE_UPDATE_KYC,
  OPEN_UPGRADE,
  CLOSE_UPGRADE,
} from 'appRedux/constants';

const INIT_STATE = {
  openBox: false,
  openUpgrade: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case OPEN_UPDATE_KYC: {
      return { ...state, openBox: true };
    }
    case CLOSE_UPDATE_KYC: {
      return { ...state, openBox: false };
    }
    case OPEN_UPGRADE: {
      return { ...state, openUpgrade: true };
    }
    case CLOSE_UPGRADE: {
      return { ...state, openUpgrade: false };
    }

    default:
      return state;
  }
};
