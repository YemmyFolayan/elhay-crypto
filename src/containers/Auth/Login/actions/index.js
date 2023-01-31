import {
  ADMIN_EMAIL,
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  ON_SHOW_LOADER,
  SIGNIN_USER_NOT_ACTIVE,
  SIGNIN_USER_SUCCESS,
  SUCCESSFUL_CODE,
  USER_TOKEN_SET,
  RESET_LINK_SUCCESS,

  // FETCH_ERROR_MESSAGE,
} from 'appRedux/constants';
import { opennReg, showAuthMessage } from 'appRedux/actions/auth';
import {
  // getSession,
  setSession,
  clearSession,
  setSessionWithValue,
  // getSession,
} from 'appRedux/store/cookies';
// import { savePermissions } from 'appRedux/actions/Permission';
// import { saveRoles } from 'appRedux/actions/Roles';
import api, { setToken } from 'appRedux/api';
import {
  handleError,
  openNotificationWithIcon,
  openNotificationWithIconErr,
  openReminder,
} from 'appRedux/actions/Common';
import _ from 'lodash';
import {
  // redirectPinSetUp,
  // redirectFeedsDashboard,
  redirectResetPassword,
  redirectLogin,
} from 'routes/RedirectRoutes';

// import { getUserCorporateData } from 'containers/PinSetup/actions';
// import { useLocation, navigate } from '@reach/router';
import { navigate } from '@reach/router';
import { openAction } from 'appRedux/actions/domore';
// import { isError } from 'lodash';
export const userSignIn = (user, goto, openModal) =>
  signInUserWithEmailPasswordRequest(user, goto, openModal);
export const userSigninno = user => signInUserNoRedirect(user);
export const userSignInWithToken = user =>
  signInUserWithEmailPasswordRequestWithToken(user);
export const userSignInWithToken2 = user =>
  signInUserWithEmailPasswordRequestWithToken2(user);
export const userSendResetPasswordLink = (user, link) =>
  userSendResetPasswordLinkFn(user, link);
export const userResetPassword = data => userResetPasswordFn(data);

export const clearCurrentLoggedInUser = () => dispatch => {
  localStorage.removeItem('user');
  clearSession();
};

export const showAuthLoader = () => ({
  type: ON_SHOW_LOADER,
});

export const userSignInSuccess = authUser => ({
  type: SIGNIN_USER_SUCCESS,
  payload: authUser,
});

export const userResetLinkSentSuccess = userEmail => ({
  type: RESET_LINK_SUCCESS,
  payload: userEmail,
});

export const userSignInNotActive = message => ({
  type: SIGNIN_USER_NOT_ACTIVE,
  payload: message,
});

const signInUserWithEmailPasswordRequest = (
  userData,
  goto,
  openModal,
) => dispatch => {
  const user = JSON.parse(userData);
  const dataLogin = {
    email: user.username,
    password: user.password,
  };
  if (user.remember_me && !_.isEmpty(user.remember_me)) {
    setSessionWithValue(user.username, 'remember_me');
  }
  // const lastLocation = useLocation();
  dispatch({ type: FETCH_START });
  const url = '/auth/login';
  api
    .post(url, dataLogin)
    .then(({ data }) => {
      clearSession();
      if (data.token) {
        const { token, data: loggedInUser } = data;
        // console.log(token)
        setToken(token);
        setSession(token);
        dispatch({ type: USER_TOKEN_SET, payload: token });
        dispatch({ type: FETCH_SUCCESS, payload: true });
        localStorage.setItem('userData', JSON.stringify(loggedInUser));
        var famodal;
        if (loggedInUser.FactorAuth) {
          setTimeout(() => {
            openModal(loggedInUser, token);
            famodal = true;
          }, 500);
        } else {
          openNotificationWithIcon(
            'Continue from where you left off.',
            `Hello ${
              JSON.parse(localStorage.getItem('userData')).firstName === 'User'
                ? 'There'
                : JSON.parse(localStorage.getItem('userData')).firstName
            }, Welcome Back 👋🏽.`,
          );

          dispatch(userSignInSuccess(data.data.user));
          dispatch(showAuthMessage(data.message));
          dispatch({ type: FETCH_SUCCESS, payload: true });

          if (goto) {
            goto === '/auth' || goto === 'auth' || goto === '/'
              ? navigate('/bank')
              : navigate(goto);
          } else {
            navigate('/bank');
          }
        }
        // console.log(goto)
        // alert(goto)
        var localdata = JSON.parse(localStorage.getItem('userData'));
        console.log(localdata);
        // alert(getSession())
        // alert(token)
        // setTimeout( ()=> {
        //   setToken(token);
        //   setSession(token);
        //   console.log(getSession())
        // },200)

        setTimeout(() => {
          famodal === true
            ? console.log()
            : localdata.firstName === 'User' ||
              localdata.lastName === '' ||
              localdata.lastName === null
            ? dispatch(opennReg(true))
            : localdata.kycLevel !== 'Level0'
            ? dispatch(openAction())
            : dispatch(openReminder(true));
        }, 500);

        // (localdata.firstName === "User" || localdata.lastName === "" || localdata.lastName === null ) ? dispatch(opennReg(true)): console.log('hi')
      } else {
        dispatch(handleError(data.message ? data.message : 'Network Error'));
      }
    })
    .catch(error => {
      dispatch({ type: FETCH_ERROR, payload: error.message });
      openNotificationWithIconErr(
        `Please contact '${ADMIN_EMAIL}'`,
        error.data ? error.data.message : 'Error Occurred',
      );
    });
};

const signInUserNoRedirect = userData => dispatch => {
  const user = JSON.parse(userData);
  const dataLogin = {
    email: user.username,
    password: user.password,
  };
  if (user.remember_me && !_.isEmpty(user.remember_me)) {
    setSessionWithValue(user.username, 'remember_me');
  }

  dispatch({ type: FETCH_START });
  const url = '/auth/login';
  api
    .post(url, dataLogin)
    .then(({ data }) => {
      if (data.token) {
        const { token, data: loggedInUser } = data;
        setToken(token);
        setSession(token);

        dispatch({ type: USER_TOKEN_SET, payload: token });
        dispatch({ type: FETCH_SUCCESS, payload: true });

        localStorage.setItem('userData', JSON.stringify(loggedInUser));
        // redirectDashboard();
        // redirectFeedsDashboard();
        openNotificationWithIcon(
          'Welcome to Your Immigration Account',
          'Account logged in successfully',
        );
        dispatch(userSignInSuccess(data.data.user));
        dispatch(showAuthMessage(data.message));
        dispatch({ type: FETCH_SUCCESS, payload: true });
      } else {
        dispatch(handleError(data.message ? data.message : 'Network Error'));
      }
    })
    .catch(error => {
      dispatch({ type: FETCH_ERROR, payload: error.message });
      openNotificationWithIconErr(
        `Please contact '${ADMIN_EMAIL}'`,
        error.data ? error.data.message : 'Error Occurred',
      );
    });
};

const signInUserWithEmailPasswordRequestWithToken = userData => dispatch => {
  const user = JSON.parse(userData);
  if (user.remember_me && !_.isEmpty(user.remember_me)) {
    setSessionWithValue(user.username, 'remember_me');
  }

  dispatch({ type: FETCH_START });
  const url = '/auth/forgot-password/confirm';
  api
    .post(url, user)
    .then(({ data }) => {
      if ((data.status && data.statusCode) === SUCCESSFUL_CODE || 201) {
        if (data.data.active === true) {
          const { token } = data.data;
          setToken(token);
          setSession(token);
          dispatch({ type: USER_TOKEN_SET, payload: token });
          dispatch({ type: FETCH_SUCCESS, payload: true });

          if (data.data.changedPassword) {
            redirectLogin();
            openNotificationWithIcon(
              'Password Changed',
              'Login with new password',
              'success',
            );
            dispatch(userSignInSuccess(data.data.user));
            dispatch(showAuthMessage(data.message));
          } else {
            redirectResetPassword();
          }
          dispatch({ type: FETCH_SUCCESS, payload: true });
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: `Account currently not active. Please contact '${ADMIN_EMAIL}'`,
          });
          dispatch(
            userSignInNotActive(
              `Account currently not active. Please contact '${ADMIN_EMAIL}'`,
            ),
          );
        }
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

const signInUserWithEmailPasswordRequestWithToken2 = userData => dispatch => {
  const user = JSON.parse(userData);
  if (user.remember_me && !_.isEmpty(user.remember_me)) {
    setSessionWithValue(user.username, 'remember_me');
  }

  dispatch({ type: FETCH_START });
  const url = '/auth/forgot-password/confirm';
  api
    .post(url, user)
    .then(({ data }) => {
      // alert('asdasda')
      const { token } = user.token || data.data;
      setToken(token);
      setSession(token);
      dispatch({ type: USER_TOKEN_SET, payload: token });
      dispatch({ type: FETCH_SUCCESS, payload: true });

      openNotificationWithIcon(
        'Password Changed',
        'Login with new password',
        'success',
      );

      setTimeout(() => {
        redirectLogin();
      }, 1000);
    })
    .catch(error => {
      dispatch(handleError(error.message)); // same as "FETCH_ERROR"
    });
};

const userSendResetPasswordLinkFn = (email, redirectLinkObj) => dispatch => {
  // const redirectLinkObj = JSON.parse(link);

  dispatch({ type: FETCH_START });
  const url = '/auth/forgot-password';
  api
    .post(url, { email, ...redirectLinkObj })
    .then(({ data }) => {
      if ((data.status && data.statusCode) === SUCCESSFUL_CODE || 201) {
        if (data) {
          dispatch(userResetLinkSentSuccess(email));

          dispatch(showAuthMessage(data.message));
          dispatch({ type: FETCH_SUCCESS, payload: true });
          openNotificationWithIcon(
            `${data.message}`,
            'Please check your mail',
            'success',
          );

          // }
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: `Email not found. Please contact '${ADMIN_EMAIL}'`,
          });
          dispatch(
            userSignInNotActive(
              `Email not found. Please contact '${ADMIN_EMAIL}'`,
            ),
          );
        }
      } else {
        dispatch(
          handleError(_.isEmpty(data.message) ? 'Network Error' : data.message),
        ); // same as "FETCH_ERROR"
      }
    })
    .catch(error => {
      console.log('from 2', error);
      dispatch(userResetLinkSentSuccess(`${email}0000`));
      dispatch(handleError(error.data.message)); // same as "FETCH_ERROR"
      openNotificationWithIconErr(error.data.message, 'Reset Password');
    });
};

const userResetPasswordFn = data => dispatch => {
  const userObj = data;
  // GMdaLpel

  dispatch({ type: FETCH_START });
  const url = '/users/password/change';
  api
    .post(url, userObj)
    .then(({ data }) => {
      if ((data.status && data.statusCode) === SUCCESSFUL_CODE || 201) {
        if (data.data) {
          if (data.data.changedPassword) {
            setTimeout(redirectLogin(), 1000);
            openNotificationWithIcon(
              'Your Password has been Changed',
              'You can Login with your new password now',
            );
            dispatch(showAuthMessage(data.message));
            dispatch(userSignInSuccess(data.data));
            dispatch(showAuthMessage(data.message));

            dispatch({ type: FETCH_SUCCESS, payload: true });

            // }
          } else {
            dispatch({
              type: FETCH_ERROR,
              payload: `An Error Occured. Please contact '${ADMIN_EMAIL}'`,
            });
            openNotificationWithIconErr(
              'An error occured please try again',
              'Password reset',
              // `You can Login with your new password now`,
            );
            // dispatch(
            //   userSignInNotActive(
            //     `Email not found. Please contact '${ADMIN_EMAIL}'`,
            //   ),
            // );
          }
        } else {
          dispatch(
            handleError(
              _.isEmpty(data.message) ? 'Network Error' : data.message,
            ),
          );
          // same as "FETCH_ERROR"
          openNotificationWithIconErr(
            'An error occured please try again',
            'Password reset',
            'error',
            // `You can Login with your new password now`,
          );
        }
      }
    })
    .catch(error => {
      // dispatch(userResetLinkSentSuccess(email + "3"));
      dispatch(handleError(`${error.message}he`)); // same as "FETCH_ERROR"
    });
};
