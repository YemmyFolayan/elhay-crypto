import {
  EDIT_STRIPEACCOUNT,
  KYC_STATUS,
  FETCH_ALL_COUNTRIES,
  FETCH_ALL_STATES,
  FETCH_ERROR,
  HANDLE_EVENT,
  HIDE_MESSAGE,
  REMINDER_EVENT,
  WALLET_TRANS,
  HANDLE_ANNOUNCEMENT,
} from 'appRedux/constants';

import { notification } from 'antd';
// import { redirectLogin } from 'routes/RedirectRoutes';
import { ON_SHOW_LOADER } from 'appRedux/constants';
import api from 'appRedux/api';
// import successSvg from "../../assets/notification-success.svg"
// import errorSvg from "../../assets/notification-error.svg"
// import React from 'react';
export const hideCommonMessage = () => ({
  type: HIDE_MESSAGE,
});

export const openNotificationWithIcon = (
  message,
  title = null,
  type = 'success',
) => {
  if (title != null) {
    notification[type]({
      message: title,
      description: message,
      duration: 5,
      // icon: <Image
      //   width={40}
      //   src={successSvg}
      // />,
      // icon: React.createElement(
      //   "img",
      //   {src: successSvg},
      //   {alt: "Success Image Icon"}
      // ),
      style: {
        width: 450,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#4DDA89',
        borderRadius: 10,
        backgroundColor: '#F5FFF9',
        color: '#12743C',
        marginTop: 100,
        zIndex: 9999999,
      },
    });
  } else {
    notification[type]({
      description: message,
    });
  }
};
export const openNotificationWithIconErr = (
  message,
  title = null,
  type = 'error',
) => {
  if (title != null) {
    notification[type]({
      message: title,
      description: message,
      duration: 5,
      // icon:  `<img src={errorSvg} style={{ width: '40px', height: '40px'}} alt="Error SVG Notification" />`,
      // icon: React.createElement(
      //   "img",
      //   {src: errorSvg},
      //   {alt: "Error Image Icon"}
      // ),
      style: {
        width: 450,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#DD2323',
        borderRadius: 10,
        backgroundColor: '#FFF0F0',
        color: '#BB1414',
        marginTop: 100,
        zIndex: 9999999,
      },
    });
  } else {
    notification[type]({
      description: message,
    });
  }
};
export const openNotificationWithIconPending = (
  message,
  title = null,
  type = 'warning',
) => {
  if (title != null) {
    notification[type]({
      message: title,
      description: message,
      duration: 5,
      // icon:  `<img src={errorSvg} style={{ width: '40px', height: '40px'}} alt="Error SVG Notification" />`,
      // icon: React.createElement(
      //   "img",
      //   {src: errorSvg},
      //   {alt: "Error Image Icon"}
      // ),
      style: {
        width: 450,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#BB8211',
        borderRadius: 10,
        backgroundColor: '#FFF9F0',
        color: '#FFBE3E',
        // zIndex:280000,
        marginTop: 100,
        zIndex: 9999999,
      },
    });
  } else {
    notification[type]({
      description: message,
    });
  }
};

export const handleError = errorData => {
  console.log('err', errorData);
  let errors = '';
  if (typeof errorData === 'string') {
    errors = errorData;
  } else {
    errors = Object.values(errorData.errors).join(', ');
  }
  // if (errorCode === '401') {
  //   const newErrorMessage = 'Your Session has expired';
  //   openNotificationWithIcon(newErrorMessage, 'Error!', 'error');
  //   return redirectLogin();
  // }
  openNotificationWithIconErr(errors, errorData.message, 'error');
  return { type: FETCH_ERROR, payload: errors };
};

export const showAuthLoader = () => ({
  type: ON_SHOW_LOADER,
});

export const editStripeAccountModal = value => ({
  type: EDIT_STRIPEACCOUNT,
  payload: { stripeaccount: value },
});

export const openEventInvite = value => ({
  type: HANDLE_EVENT,
  payload: { event: value },
});
export const handleAnnouncement = value => ({
  type: HANDLE_ANNOUNCEMENT,
  payload: { announcement: value },
});

export const openReminder = value => ({
  type: REMINDER_EVENT,
  payload: { reminder: value },
});

// fetch countries and states

export const fetchAllCountries = payload => {
  return dispatch => {
    dispatch({ type: FETCH_ALL_COUNTRIES, payload: { fetchLoading: true } });
    const url = 'https://restcountries.com/v3.1/all';
    api
      .get(url)
      .then(res => {
        var options = (res.data ?? []).map((item, index) => ({
          label: item.name.common,
          value: item.cca3,
        }));
        dispatch({
          type: FETCH_ALL_COUNTRIES,
          payload: { fetchLoading: false, countries: options },
        });
      })
      .catch(error => error);
  };
};
export const fetchAllCardStates = payload => {
  return dispatch => {
    dispatch({ type: FETCH_ALL_STATES, payload: { allLoading: true } });
    const url = 'https://countriesnow.space/api/v0.1/countries/states';
    api
      .post(url, payload)
      .then(res => {
        var options = (res.data.data.states ?? []).map((item, index) => ({
          value: item.state_code,
          label: item.name,
        }));
        dispatch({
          type: FETCH_ALL_STATES,
          payload: { allLoading: false, states: options },
        });
      })
      .catch(error => error);
  };
};
export const fetchAllStates = payload => {
  return dispatch => {
    dispatch({ type: FETCH_ALL_STATES, payload: { fetchLoading: true } });
    const url = 'https://countriesnow.space/api/v0.1/countries/states';
    api
      .post(url, payload)
      .then(res => {
        var options = (res.data.data.states ?? []).map((item, index) => ({
          value: item.state_code,
          label: item.name,
        }));
        dispatch({
          type: FETCH_ALL_STATES,
          payload: { fetchLoading: false, states: options },
        });
      })
      .catch(error => error);
  };
};

export const fetchAllStatesNoLoad = payload => {
  return dispatch => {
    const url = 'https://countriesnow.space/api/v0.1/countries/states';
    api
      .post(url, payload)
      .then(res => {
        var options = (res.data.data.states ?? []).map((item, index) => ({
          value: item.state_code,
          label: item.name,
        }));
        dispatch({
          type: FETCH_ALL_STATES,
          payload: { fetchLoading: false, states: options },
        });
      })
      .catch(error => error);
  };
};

export const fetchUserKycStatus = cb => {
  return dispatch => {
    dispatch({ type: KYC_STATUS, payload: { kycStatus: true } });
    const url = '/identity/retrieve_status';
    api
      .get(url)
      .then(res => {
        cb(res.data.data.data.status.toUpperCase());
        dispatch({ type: KYC_STATUS, payload: { kycStatus: false } });
      })
      .catch(error => {
        cb(error.response.data.data.data.status.toUpperCase());
        dispatch({ type: KYC_STATUS, payload: { kycStatus: false } });
      });
  };
};

// plaid link  token and link account

export const fetchLinkToken = (url, cb) => {
  return dispatch => {
    dispatch({ type: WALLET_TRANS, payload: { transLoading: true } });
    api
      .get(url)
      .then(res => {
        // cb(res.data.data[1].link_token)
        cb(res.data.data.link_token);
        dispatch({ type: WALLET_TRANS, payload: { transLoading: false } });
      })
      .catch(error => {
        cb(error.response.data.data.data.status.toUpperCase());
        dispatch({ type: WALLET_TRANS, payload: { transLoading: false } });
      });
  };
};

export const fetchLinkAccount = (url, payload, cb, cbb) => {
  return dispatch => {
    dispatch({ type: WALLET_TRANS, payload: { transLoading: true } });
    api
      .post(url, payload)
      .then(res => {
        cb();
        dispatch({
          type: WALLET_TRANS,
          payload: { transLoading: false, transMessage: res.data.message },
        });
      })
      .catch(error => {
        cbb();
        dispatch({
          type: WALLET_TRANS,
          payload: { transLoading: false, transMessage: error.data.message },
        });
      });
  };
};
