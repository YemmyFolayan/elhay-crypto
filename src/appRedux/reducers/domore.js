import {
  OPEN_LOAN,
  CLOSE_LOAN,
  OPEN_REWARD,
  CLOSE_REWARD,
  OPEN_ACCWAIT,
  CLOSE_ACCWAIT,
  OPEN_CWAIT,
  CLOSE_CWAIT,
  OPEN_VCARD,
  CLOSE_VCARD,
  OPEN_ACTION,
  CLOSE_ACTION,
  OPEN_BVN_VERIFICATION,
  CLOSE_BVN_VERIFICATION,
  OPEN_FEES,
  AIRTIME_RECHARGE,
  HANDLE_SHUTTLERS,
  DOMORE_ACTION,
} from 'appRedux/constants';

const INIT_STATE = {
  openReward: false,
  openLoan: false,
  openAccWait: false,
  openVirtual: false,
  openAction: false,
  openBvn: false,
  openWait: false,
  openFees: false,
  openShuttlers: false,
  cardType: '',
  loading: '',
  message: '',
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case OPEN_LOAN: {
      return { ...state, openLoan: true };
    }
    case CLOSE_LOAN: {
      return { ...state, openLoan: false };
    }
    case OPEN_REWARD: {
      return { ...state, openReward: true };
    }
    case CLOSE_REWARD: {
      return { ...state, openReward: false };
    }
    case OPEN_ACCWAIT: {
      return { ...state, openAccWait: true };
    }
    case CLOSE_ACCWAIT: {
      return { ...state, openAccWait: false };
    }
    case OPEN_CWAIT: {
      return { ...state, openWait: true };
    }
    case CLOSE_CWAIT: {
      return { ...state, openWait: false };
    }
    case OPEN_VCARD: {
      return { ...state, openVirtual: true, cardType: action.payload };
    }
    case CLOSE_VCARD: {
      return { ...state, openVirtual: false };
    }

    case OPEN_ACTION: {
      return { ...state, openAction: true };
    }
    case CLOSE_ACTION: {
      return { ...state, openAction: false };
    }

    case OPEN_BVN_VERIFICATION: {
      return { ...state, openBvn: true };
    }
    case CLOSE_BVN_VERIFICATION: {
      return { ...state, openBvn: false };
    }
    case OPEN_FEES:
    case HANDLE_SHUTTLERS:
    case AIRTIME_RECHARGE:
    case DOMORE_ACTION: {
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
};
