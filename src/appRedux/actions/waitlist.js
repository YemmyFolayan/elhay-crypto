import {
  CREATE_STRIPE_CARD,
  FOUNDER_WAITLIST_EDIT,
  WAITLIST_EDIT,
} from 'appRedux/constants';
import api from 'appRedux/api';
import {
  openNotificationWithIcon,
  openNotificationWithIconErr,
} from './Common';

export const requestProvidusAccount = (payload, cb) => {
  return dispatch => {
    dispatch({ type: WAITLIST_EDIT, payload: { message: '', loading: true } });
    const url = '/user/request_account_number';
    api
      .post(url, payload)
      .then(res => {
        openNotificationWithIcon(
          res.data.message,
          'Account request successful',
          'success',
        );
        dispatch({
          type: WAITLIST_EDIT,
          payload: { loading: false, message: res.data.message },
        });
        // cb(4)
        cb();
      })
      .catch(error => {
        dispatch({
          type: WAITLIST_EDIT,
          payload: { loading: false, message: error.data.message },
        });
        openNotificationWithIconErr(
          error.data.message,
          'Account request failed',
          'error',
        );
        // cb(5)
        cb();
      });
  };
};

export const autoAssignProvidusAccount = cb => {
  return dispatch => {
    dispatch({ type: WAITLIST_EDIT, payload: { message: '', loading: true } });
    const url = '/user/auto_account_number';
    api
      .get(url)
      .then(res => {
        dispatch({
          type: WAITLIST_EDIT,
          payload: { loading: false, message: res.data.message },
        });
        // cb(4)
        cb();
      })
      .catch(error => {
        dispatch({
          type: WAITLIST_EDIT,
          payload: { loading: false, message: error.data.message },
        });
        openNotificationWithIconErr(
          error.data.message,
          'Account request failed',
          'error',
        );
      });
  };
};

export const globalGengCard = (payload, cb) => {
  return dispatch => {
    dispatch({ type: WAITLIST_EDIT, payload: { message: '', loading: true } });
    const url = '/user/global-geng-card-request';
    api
      .post(url, payload)
      .then(res => {
        openNotificationWithIcon(
          res.data.message,
          'Account request successful',
          'success',
        );
        dispatch({
          type: WAITLIST_EDIT,
          payload: { loading: false, message: res.data.message },
        });
        cb(3);
      })
      .catch(err => {
        dispatch({
          type: WAITLIST_EDIT,
          payload: { loading: false, message: err.data.message },
        });
        openNotificationWithIconErr(
          err.data.message,
          'Account request failed',
          'error',
        );
        cb(4);
      });
  };
};

export const globalGengCardStatus = (payload, cb) => {
  const url = `/user/geng_cards/${payload}`;
  api
    .get(url, '')
    .then(res => {
      // openNotificationWithIcon(res.data.message,"Account request successful",'success')
      cb(res.data.data);
    })
    .catch(err => {
      console.log(err);
    });
};

export const stripeWhitelist = (payload, cb) => {
  return dispatch => {
    dispatch({ type: FOUNDER_WAITLIST_EDIT, payload: { loading: true } });
    const url = 'vc/waitlist_apply';
    api
      .post(url, payload)
      .then(res => {
        openNotificationWithIcon(res.data.message, 'Founders Card', 'success');
        dispatch({
          type: FOUNDER_WAITLIST_EDIT,
          payload: { loading: false, message: res.data.message },
        });
        cb(4);
      })
      .catch(error => {
        dispatch({
          type: FOUNDER_WAITLIST_EDIT,
          payload: { loading: false, message: error.data.message },
        });
        openNotificationWithIconErr(
          error.data.message,
          'Founders Card',
          'error',
        );
        cb(5);
      });
  };
};

export const stripeConnect = () => {
  return dispatch => {
    dispatch({ type: FOUNDER_WAITLIST_EDIT, payload: { loading: true } });
    const url = '/stripe/connectStripeCreateAccount';
    api
      .post(url)
      .then(res => {
        openNotificationWithIcon(res.data.message, 'Founders Card', 'success');
        console.log(res.data.data.url);

        window.open(res.data.data.url);
        dispatch({
          type: FOUNDER_WAITLIST_EDIT,
          payload: { loading: false, message: res.data.message },
        });
      })
      .catch(error => {
        openNotificationWithIconErr(
          error.data.message,
          'Founders Card',
          'error',
        );
        dispatch({
          type: FOUNDER_WAITLIST_EDIT,
          payload: { loading: false, message: error.data.message },
        });
      });
  };
};

export const createStripeCard = (payload, cb) => {
  return dispatch => {
    dispatch({ type: CREATE_STRIPE_CARD, payload: { loading: true } });
    const url = 'stripe/createStripeVirtualCard';
    api
      .post(url, {
        ...payload,
        cardTypes: payload.cardTypes.value,
        country: payload.country.value,
        billingAddressState: payload.billingAddressState.value,
        billingAddressCountry: payload.billingAddressCountry.value,
        cardColor: payload.cardColor.value,
      })
      .then(res => {
        openNotificationWithIcon(res.data.message, 'Founders Card', 'success');
        dispatch({
          type: CREATE_STRIPE_CARD,
          payload: { loading: false, message: res.data.message },
        });
        cb(4);
      })
      .catch(error => {
        openNotificationWithIconErr(
          error.data.message,
          'Founders Card',
          'error',
        );
        dispatch({
          type: CREATE_STRIPE_CARD,
          payload: { loading: false, message: error.data.message },
        });
        cb(5);
      });
  };
};
