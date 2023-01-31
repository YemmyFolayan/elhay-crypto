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
  UPDATE_PROFILE,
} from 'appRedux/constants';
import api from 'appRedux/api';
import {
  openNotificationWithIcon,
  openNotificationWithIconErr,
} from './Common';
import { errorMessage } from 'helpers/utils';
import { navigate } from '@reach/router';
import { userSignOut } from './auth';
export const fetchProfiles = (param = '', page) => {
  return dispatch => {
    dispatch({ type: FETCH_PROFILE_START });
    const url =
      param === ''
        ? '/profiles'
        : `/profiles?search=${param}&page=${page}&page_limit=15`;
    api
      .get(url)
      .then(response => {
        const data = response.data;
        // console.log(data)
        return dispatch({ type: FETCH_PROFILES, payload: data });
      })
      .catch(error => {
        dispatch({ type: FETCH_PROFILE_FAIL, payload: error });
      });
  };
};

export const fetchSingleProfile = id => {
  return dispatch => {
    dispatch({ type: FETCH_PROFILE_START });
    const url = `/profiles/${id}`;
    api
      .get(url)
      .then(response => {
        const data = response.data.data;
        // console.log('got it', data)
        dispatch({ type: FETCH_PROFILE_SINGLE, payload: data });
      })
      .catch(error => {
        dispatch({ type: FETCH_PROFILE_FAIL, payload: error });
      });
  };
};

export const fetchUserData = () => {
  return dispatch => {
    dispatch({ type: FETCH_PROFILE_START });
    const url = `/auth/logged-in-user`;
    api
      .get(url)
      .then(response => {
        const data = response.data.data;
        // console.log('got it', data)
        dispatch({ type: FETCH_PROFILE_SINGLE, payload: data });
      })
      .catch(error => {
        // console.log('got it', error)
        dispatch({ type: FETCH_PROFILE_FAIL, payload: error });
      });
  };
};

export const sendVerificationMail = payload => {
  return dispatch => {
    dispatch({ type: SEND_VERIFICATION, loading: true });
    const url = `/auth/verify-account`;
    api
      .post(url, { userId: payload })
      .then(response => {
        openNotificationWithIcon(response.data.message, 'Verification Mail');
        dispatch({ type: SEND_VERIFICATION, loading: true });
      })
      .catch(error => {
        openNotificationWithIconErr(error.data.message, 'Verification');
        dispatch({ type: SEND_VERIFICATION, loading: false });
      });
  };
};

export const updateTransPIN = (payload, cb) => {
  return dispatch => {
    dispatch({ type: UPDATE_PROFILE, payload: true });
    const url = '/auth/pin/change';
    api
      .post(url, payload)
      .then(response => {
        openNotificationWithIcon(
          `You have successfully updated your transaction pin.`,
          'Transaction PIN',
        );
        dispatch({ type: UPDATE_PROFILE, loading: false });
        setTimeout(() => {
          cb();
          dispatch(userSignOut());
        }, 200);
      })
      .catch(error => {
        openNotificationWithIconErr(errorMessage(error), 'Transaction PIN');
        dispatch({ type: UPDATE_PROFILE, loading: false });
      });
  };
};
export const updatePassword = (payload, cb) => {
  return dispatch => {
    dispatch({ type: UPDATE_PROFILE, payload: true });
    const url = '/auth/change-password';
    api
      .post(url, payload)
      .then(response => {
        openNotificationWithIcon(
          `You have successfully updated your password, you will be logged out in a second.`,
          'Account Password',
        );
        dispatch({ type: UPDATE_PROFILE, loading: false });
        cb();
        setTimeout(() => {
          navigate('/auth');
        }, 1000);
      })
      .catch(error => {
        openNotificationWithIconErr(errorMessage(error), 'Account Password');
        dispatch({ type: UPDATE_PROFILE, loading: false });
      });
  };
};

export const updateUsername = username => ({
  type: UPDATE_USERNAME,
  payload: username,
});

export const updateLocation = location => ({
  type: UPDATE_LOCATION,
  payload: location,
});

export const updateEmail = email => ({
  type: UPDATE_EMAIL,
  payload: email,
});

export const updateNumber = number => ({
  type: UPDATE_NUMBER,
  payload: number,
});
