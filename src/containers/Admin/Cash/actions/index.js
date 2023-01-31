import _ from 'lodash';
import api from 'appRedux/api';
import {
  FETCH_SUCCESS,
  LOADING_STATE,
  LOADING_STATE_INNER,
  SAVE_STATE,
  SUCCESSFUL_CODE,
  FETCH_START,
  SUCCESSFUL_TRANSACTION,
  WALLET_TRANS,
} from 'appRedux/constants';
import {
  handleError,
  openNotificationWithIcon,
  openNotificationWithIconErr,
} from 'appRedux/actions/Common';
import { redirectToPaypalPaymentLink } from 'routes/RedirectRoutes';
import { objectValuesStringify, removeCommaAmount } from 'helpers/utils';
import {
  FETCH_DASHBOARD_STATS_START,
  FETCH_DASHBOARD_TRANSACTION_START,
  FETCH_DASHBOARD_TRANSACTION_SUCCESS,
  FETCH_DASHBOARD_TRANSACTION_FAILURE,
} from './actionTypes';
import { navigate } from '@reach/router';
import { errorMessage } from 'helpers/utils';
export const fetchStatsStart = () => ({
  type: FETCH_DASHBOARD_STATS_START,
  payload: { loading: true },
});

export const fetchTransactionsStart = () => ({
  type: FETCH_DASHBOARD_TRANSACTION_START,
  payload: { transactionLoading: true },
});

export const fetchTransactions = req => {
  // extract dates for startDate & endDate
  const startDate =
    typeof req.startDate === 'string'
      ? req.startDate
      : req.startDate.format('YYYY-MM-DDTHH:mm:ss');
  const endDate =
    typeof req.endDate === 'string'
      ? req.endDate
      : req.endDate.format('YYYY-MM-DDTHH:mm:ss');
  console.log('werty2', req, startDate, endDate);
  return dispatch => {
    dispatch(fetchTransactionsStart());
    let url = '';
    if (req.terminals) {
      url = `transactions/list?page=0&pageSize=50&startDate=${startDate}&endDate=${endDate}&terminal=${req.terminals}`;
    } else {
      url = `transactions/list?page=0&pageSize=50&startDate=${startDate}&endDate=${endDate}`;
    }

    api
      .get(url)
      .then(response => {
        const { data } = response;
        if (data.status && data.statusCode === SUCCESSFUL_CODE) {
          // openNotificationWithIcon(data.message, `Transactions List`);
          dispatch({
            type: FETCH_DASHBOARD_TRANSACTION_SUCCESS,
            payload: data.data.content,
          });
        } else {
          dispatch({ type: FETCH_DASHBOARD_TRANSACTION_FAILURE });
          dispatch(
            handleError(
              _.isEmpty(data.message) ? 'Network Error' : data.message,
            ),
          );
        }
      })
      .catch(error => {
        dispatch({ type: FETCH_DASHBOARD_TRANSACTION_FAILURE, payload: error });
        handleError(error.message);
      });
  };
};

// Transfer Cash

export const transferCash = ({
  amount,
  userId,
  currency,
  transactionPin,
  stopSubmit,
}) => dispatch => {
  dispatch({ type: FETCH_START });
  const amountInCentsOrKobo = removeCommaAmount(amount) * 100;
  const url = '/wallet/transfer';
  const payload = {
    amount: amountInCentsOrKobo,
    currency,
    userId,
    transactionPin,
  };
  console.log(payload);

  api
    .post(url, payload)
    .then(({ data }) => {
      if (data.data) {
        // console.log('data dey', data.data);

        dispatch({ type: FETCH_SUCCESS, payload: true });
        dispatch({
          type: WALLET_TRANS,
          payload: { transMessage: data.message },
        });
        dispatch({ type: SUCCESSFUL_TRANSACTION, payload: 2 });
        openNotificationWithIcon(data.message, 'Cash Transfer', 'success');
        navigate('/bank/transfer');
      } else {
        dispatch(
          handleError(_.isEmpty(data.message) ? 'Network Error' : data.message),
        );
        // same as "FETCH_ERROR"
        dispatch({ type: SUCCESSFUL_TRANSACTION, payload: 0 });
      }
    })
    .catch(error => {
      console.log('error', error.data.message);
      if (error.data.errors) {
        // dispatch(handleError(objectValuesStringify(error.data.errors)));
        // same as "FETCH_ERROR"
        openNotificationWithIconErr(
          errorMessage(error),
          'Cash Transfer',
          'error',
        );
        dispatch({
          type: WALLET_TRANS,
          payload: { transMessage: error.data.message },
        });
        dispatch({ type: SUCCESSFUL_TRANSACTION, payload: 3 });
      } else {
        // dispatch(handleError(error.data.message)); // same as "FETCH_ERROR"
        openNotificationWithIconErr(
          errorMessage(error),
          'Cash Transfer',
          'error',
        );
        dispatch({
          type: WALLET_TRANS,
          payload: { transMessage: errorMessage(error) },
        });
        dispatch({ type: SUCCESSFUL_TRANSACTION, payload: 3 });
        // console.log('err', error.data.message);
      }
    })
    .finally(() => stopSubmit());
};
// End Transfer Cash

export const getStateLoading = () => dispatch => {
  dispatch({ type: LOADING_STATE });
};

export const getStateByCountryId = countryId => dispatch => {
  dispatch({ type: LOADING_STATE_INNER });

  const url = `/states/${countryId}/list`;
  api
    .get(url)
    .then(({ data }) => {
      if (data.status && data.statusCode === SUCCESSFUL_CODE) {
        dispatch({ type: SAVE_STATE, payload: data.data });
      } else {
        dispatch(
          handleError(_.isEmpty(data.message) ? 'Network Error' : data.message),
        ); // same as "FETCH_ERROR"
      }
    })
    .catch(error => {
      dispatch(handleError(error.message)); // same as "FETCH_ERROR"
    });
};

export const getTransactions = () => dispatch => {
  dispatch({ type: FETCH_START });
  const url = '/wallet/transfer';
  api
    .get(url)
    .then(({ data }) => {
      if (data.data) {
        console.log('transaction dey', data.data);
        dispatch({ type: FETCH_SUCCESS, payload: true });
      } else {
        dispatch(
          handleError(_.isEmpty(data.message) ? 'Network Error' : data.message),
        ); // same as "FETCH_ERROR"
      }
    })
    .catch(error => {
      console.log('transaction erro', error.message);
      if (error.data) {
        dispatch(handleError(objectValuesStringify(error.data.errors))); // same as "FETCH_ERROR"
      } else {
        dispatch(handleError(error.message)); // same as "FETCH_ERROR"
      }
    });
};

export const addCashToWallet = (cash, currency, cb, refetch) => dispatch => {
  dispatch({ type: FETCH_START });
  const cashToCentOrKobo = cash * 1;
  const url = 'paypal/initiate-payment';
  const payload = {
    price: cashToCentOrKobo,
    description: 'user making payment',

    // redirectURL: REDIRECT_URL_CASH,
    // redirectURL: 'https://google.com',
  };

  api
    .post(url, payload)
    .then(({ data }) => {
      if (data) {
        console.log('owo poooooorrr');
        console.log('data dey', data.data);
        // redirectToFlutterwavePaymentLink(data.data.paymentURL);
        openNotificationWithIcon(
          'Redirecting to Paypal...',
          'Deposit',
          'success',
        );
        dispatch({ type: FETCH_SUCCESS, payload: true });
        setTimeout(() => {
          redirectToPaypalPaymentLink(data.redirectLink);
        }, 1500);

        setTimeout(() => {
          cb();
        }, 1500);

        refetch && refetch();
        // dispatch({ type: SAVE_FETCH_LGAS, payload: data.data });
      } else {
        dispatch(
          handleError(_.isEmpty(data.message) ? 'Network Error' : data.message),
        ); // same as "FETCH_ERROR"
      }
    })
    .catch(error => {
      console.log('error', error.message);
      if (error.data) {
        dispatch(handleError(objectValuesStringify(error.data.errors))); // same as "FETCH_ERROR"
        openNotificationWithIconErr(errorMessage(error), 'Deposit', 'error');
      } else {
        dispatch(handleError(error.message)); // same as "FETCH_ERROR"
      }
    });
};
