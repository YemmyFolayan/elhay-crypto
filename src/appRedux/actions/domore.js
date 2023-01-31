import {
  OPEN_LOAN,
  CLOSE_LOAN,
  OPEN_REWARD,
  CLOSE_REWARD,
  OPEN_ACCWAIT,
  CLOSE_ACCWAIT,
  OPEN_VCARD,
  CLOSE_VCARD,
  CLOSE_ACTION,
  OPEN_ACTION,
  OPEN_BVN_VERIFICATION,
  CLOSE_BVN_VERIFICATION,
  OPEN_CWAIT,
  CLOSE_CWAIT,
  OPEN_FEES,
  AIRTIME_RECHARGE,
  DOMORE_ACTION,
} from 'appRedux/constants';
import {
  openNotificationWithIcon,
  openNotificationWithIconErr,
} from './Common';
import api from 'appRedux/api';

export const openLoan = () => ({
  type: OPEN_LOAN,
});

export const closeLoan = () => ({
  type: CLOSE_LOAN,
});

export const openReward = () => ({
  type: OPEN_REWARD,
});

export const closeReward = () => ({
  type: CLOSE_REWARD,
});

export const openAccWait = () => ({
  type: OPEN_ACCWAIT,
});

export const closeAccWait = () => ({
  type: CLOSE_ACCWAIT,
});

export const openVirtual = value => ({
  type: OPEN_VCARD,
  payload: value,
});

export const closeVirtual = () => ({
  type: CLOSE_VCARD,
});

export const openWaitlist = () => ({
  type: OPEN_CWAIT,
});

export const closeWaitlist = () => ({
  type: CLOSE_CWAIT,
});

export const openAction = () => ({
  type: OPEN_ACTION,
});

export const closeAction = () => ({
  type: CLOSE_ACTION,
});

export const openBvn = () => ({
  type: OPEN_BVN_VERIFICATION,
});

export const closeBvn = () => ({
  type: CLOSE_BVN_VERIFICATION,
});

export const handleFees = value => ({
  type: OPEN_FEES,
  payload: { openFees: value },
});

export const handleShuttlers = value => ({
  type: OPEN_FEES,
  payload: { openShuttlers: value },
});

export const getRechargeOperators = cb => {
  return dispatch => {
    dispatch({ type: AIRTIME_RECHARGE, payload: { loading: true } });
    const url = '/get-recharge-card-Operator';
    api
      .get(url)
      .then(res => {
        dispatch({
          type: AIRTIME_RECHARGE,
          payload: { loading: false, message: res.data.message, success: true },
        });
        // console.log(res.data.data)
        cb(res.data.data);
      })
      .catch(error => {
        dispatch({
          type: AIRTIME_RECHARGE,
          payload: {
            loading: false,
            message: error.data.message,
            success: false,
          },
        });
      });
  };
};

export const buyAirtime = (payload, cb) => {
  return dispatch => {
    dispatch({ type: AIRTIME_RECHARGE, payload: { loading: true } });
    const url = 'recharge-card-reloadly';
    api
      .post(url, payload)
      .then(res => {
        dispatch({
          type: AIRTIME_RECHARGE,
          payload: { loading: false, message: res.data.message, success: true },
        });
        openNotificationWithIcon(res.data.message, 'Airtime');
        // console.log(res.data.data)
        cb(1);
      })
      .catch(error => {
        openNotificationWithIconErr(error.data.message, 'Airtime');
        dispatch({
          type: AIRTIME_RECHARGE,
          payload: {
            loading: false,
            message: error.data.message,
            success: false,
          },
        });
        cb(2);
      });
  };
};

export const shuttlersCode = (payload, cb) => {
  return dispatch => {
    dispatch({ type: DOMORE_ACTION, payload: { loading: true } });
    const url = '/user/shuttlers_promo';
    api
      .patch(url)
      .then(res => {
        dispatch({ type: DOMORE_ACTION, payload: { loading: false } });
        openNotificationWithIcon(res.data.message, 'NetWebPay X Shuttlers');
        // cb(1)
      })
      .catch(error => {
        // cb(2)
      });
  };
};
