import {
  FETCH_START,
  FETCH_SUCCESS,
  HIDE_MESSAGE,
  SHOW_MESSAGE,
  SIGNOUT_USER_SUCCESS,
  SUCCESSFUL_CODE,
  OPENREG,
  SEND_2FA,
} from 'appRedux/constants';
import { clearSession, setSession } from 'appRedux/store/cookies';
import api, { setToken } from 'appRedux/api';
import _ from 'lodash';
import { redirectLogin } from 'routes/RedirectRoutes';
import { userSignInSuccess } from 'containers/Auth/Login/actions';
import {
  handleError,
  openNotificationWithIcon,
  openNotificationWithIconErr,
} from './Common';
import { navigate } from '@reach/router';
import Axios from 'axios';
export const showAuthMessage = message => ({
  type: SHOW_MESSAGE,
  payload: message,
});

export const hideMessage = () => ({
  type: HIDE_MESSAGE,
});

export const opennReg = value => ({
  type: OPENREG,
  payload: value,
});

export const getMeWithToken = token => dispatch => {
  dispatch({ type: FETCH_START });
  const url = '/users/confirm';
  api
    .post(url, { token })
    .then(({ data }) => {
      // console.log('signUp: ', data);
      redirectLogin();
      /**
       * this need to be implemented
       */
      if (data.status && data.statusCode === SUCCESSFUL_CODE) {
        dispatch({ type: FETCH_SUCCESS, payload: true });
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

export const getUser = (callbackNeeded = false, callback) => dispatch => {
  // dispatch({ type: FETCH_START })
  const url = '/auth/logged-in-user';
  api
    .get(url)
    .then(({ data }) => {
      dispatch(userSignInSuccess(data));
      dispatch({ type: FETCH_SUCCESS });
    })
    .catch(error => {
      dispatch(handleError(error.message)); // same as "FETCH_ERROR"
      callbackNeeded &&
        callback({ status: 'error', data: null, message: error.message });
      dispatch(userSignOut());
      redirectLogin();
      dispatch({ type: FETCH_SUCCESS });
    });
};

export const userSignOut = () => dispatch => {
  dispatch({ type: FETCH_START });

  clearSession();
  dispatch({ type: FETCH_SUCCESS, payload: true });
  dispatch({ type: SIGNOUT_USER_SUCCESS });
  localStorage.removeItem('userData');
  redirectLogin();
};

export const signUpUser = user => dispatch => {
  dispatch({ type: FETCH_START });

  const body = {
    ...user,
  };
  const url = 'auth/register';
  api
    .post(url, body)
    .then(({ data }) => {
      if (data.status === SUCCESSFUL_CODE) {
        dispatch(showAuthMessage(data.message));
        dispatch({ type: FETCH_SUCCESS, payload: true });
      } else {
        dispatch(
          handleError(_.isEmpty(data.message) ? 'Network Error' : data.message),
        ); // same as "FETCH_ERROR"
      }
    })
    .catch(error => {
      console.log('Error', error);

      dispatch(handleError(error.data)); // same as "FETCH_ERROR"
    });
};

export const updateProfile = payload => dispatch => {
  dispatch({ type: FETCH_START });
  const url = '/profiles';
  api
    .patch(url, payload)
    .then(({ data }) => {
      if (data.data) {
        // console.log('data dey', data.data);
        dispatch({ type: FETCH_SUCCESS, payload: true });
        openNotificationWithIcon(data.message, 'Profile', 'success');
        getProfile();
        // dispatch({ type: SAVE_FETCH_LGAS, payload: data.data });
      } else {
        dispatch(
          handleError(_.isEmpty(data.message) ? 'Network Error' : data.message),
        ); // same as "FETCH_ERROR"
      }
    })
    .catch(error => {
      if (error.data) {
        dispatch(handleError(error.data.errors)); // same as "FETCH_ERROR"
      } else {
        dispatch(handleError(error.message)); // same as "FETCH_ERROR"
      }
    });
};

export const updateProfilePicture = formData => dispatch => {
  dispatch({ type: FETCH_START });
  const url = '/profiles/update-profile-picture';

  // console.log(formData);
  api
    .patch(url, formData)
    .then(({ data }) => {
      if (data.data) {
        // console.log('data dey', data.data);
        dispatch({ type: FETCH_SUCCESS, payload: true });
        openNotificationWithIcon(data.message, 'Profile', 'success');
        getProfile();
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
        dispatch(handleError(error.data.errors)); // same as "FETCH_ERROR"
      } else {
        dispatch(handleError(error.message)); // same as "FETCH_ERROR"
      }
    });
};

export const getProfile = () => dispatch => {
  dispatch({ type: FETCH_START });
  const url = '/auth/logged-in-user';
  api
    .get(url)
    .then(({ data }) => {
      // console.log('en', data);
      if (data.data) {
        const { data: loggedInUser } = data;
        dispatch({ type: FETCH_SUCCESS, payload: true });
        localStorage.setItem('userData', JSON.stringify(loggedInUser));
      } else {
        dispatch(handleError(data.message ? data.message : 'Network Error')); // same as "FETCH_ERROR"
      }
    })
    .catch(error => {
      // console.log('error', error.message);
      if (error.data) {
        dispatch(handleError(error.data.errors)); // same as "FETCH_ERROR"
      } else {
        dispatch(handleError(error.message)); // same as "FETCH_ERROR"
      }
    });
};

//  two fa
export const send2faCode = (payload, cb, token, altUrl) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  return dispatch => {
    dispatch({ type: SEND_2FA, payload: { loader: true } });
    const url = altUrl
      ? altUrl
      : 'https://api.wevesti.com/api/twillo/phone/twilloSendCode';
    Axios.post(url, payload, config)
      .then(res => {
        openNotificationWithIcon(
          res.data.message,
          // `Sent code to your ${option}`,
          'Two Factored Authorization',
          'success',
        );
        dispatch({ type: SEND_2FA, payload: { loader: false } });
        setTimeout(() => {
          cb();
        }, 100);
      })
      .catch(error => {
        dispatch({ type: SEND_2FA, payload: { loader: false } });
        openNotificationWithIconErr(
          error.data.message,
          'Two Factored Authorization',
          'error',
        );
      });
  };
};

export const verify2faCode = (payload, from, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  return dispatch => {
    dispatch({ type: SEND_2FA, payload: { loader: true } });
    const url = 'https://api.wevesti.com/api/twillo/phone/twilloVerifyCode';
    Axios.post(url, payload, config)
      .then(res => {
        openNotificationWithIcon(
          'Authentication was successful.',
          // `Sent code to your ${option}`,
          'Two Factored Authorization',
          'success',
        );
        setToken(token);
        setSession(token);
        dispatch({ type: SEND_2FA, payload: { loader: false } });
        setTimeout(() => {
          navigate(from ? from : '/bank');
        }, 100);
      })
      .catch(error => {
        dispatch({ type: SEND_2FA, payload: { loader: false } });
        openNotificationWithIconErr(
          'Error occured while trying to validate your 2FA code, try again.',
          'Two Factored Authorization',
          'error',
        );
      });
  };
};
