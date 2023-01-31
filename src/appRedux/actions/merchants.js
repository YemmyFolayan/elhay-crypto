import { PAY_MERCHANT } from 'appRedux/constants';
import api from 'appRedux/api';
import {
  openNotificationWithIcon,
  openNotificationWithIconErr,
} from './Common';
import { objectValuesStringify } from 'helpers/utils';

export const merchantPayViaCard = (payload, cb) => {
  return dispatch => {
    dispatch({ type: PAY_MERCHANT, payload: { loading: true } });
    const url = '/merchant/payforServiceWithCard';
    api
      .post(url, payload)
      .then(res => {
        openNotificationWithIcon(res.data.message, 'Merchant Payment');
        setTimeout(() => {
          window.open(res.data.data.paymentURL);
        }, 100);
        dispatch({ type: PAY_MERCHANT, payload: { loading: false } });
        setTimeout(() => {
          cb();
        }, 500);
      })
      .catch(error => {
        dispatch({
          type: PAY_MERCHANT,
          payload: { loading: false, message: error.data.message },
        });
        openNotificationWithIconErr(error.data.message, 'Merchant Payment');
      });
  };
};

export const merchantPay = (payload, url, cb) => {
  return dispatch => {
    dispatch({ type: PAY_MERCHANT, payload: { loading: true } });
    api
      .post(url, payload)
      .then(res => {
        openNotificationWithIcon(res.data.message, 'Merchant Payment');
        dispatch({ type: PAY_MERCHANT, payload: { loading: false } });
        cb(4);
      })
      .catch(error => {
        if (error?.data?.errors) {
          openNotificationWithIconErr(
            objectValuesStringify(error?.data?.errors),
            'Merchant Payment',
            'error',
          );
        } else {
          const err = error?.data?.message || error.message;
          openNotificationWithIconErr(err, 'Merchant Payment', 'error');
        }
        dispatch({
          type: PAY_MERCHANT,
          payload: { loading: false, message: error.data.message },
        });
        cb(5);
      });
  };
};
