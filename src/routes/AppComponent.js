import React, { useEffect, useState } from 'react';
import { getSession } from 'appRedux/store/cookies';
import { Redirect } from '@reach/router';
import { connect } from 'react-redux';
import _ from 'lodash';
import { getUser, userSignOut } from '../appRedux/actions/auth';
import { useQuery } from 'react-query';
import { openNotificationWithIconErr } from 'appRedux/actions/Common';
import { useDispatch } from 'react-redux';
import api from 'appRedux/api';
import { MINUTE_SESSION } from 'appRedux/constants';

function AppComponent(props) {
  const { component, path, auth } = props;
  // const session = getSession();
  // eslint-disable-next-line
  const [session, setSess] = useState(getSession());
  const { isLoading, isError } = useQuery(
    'userData',
    async () =>
      await api
        .get('/auth/logged-in-user')
        .then(res => res.data.data)
        .catch(err => err),
  );
  const dispatch = useDispatch();

  var handleTimeout = () => {
    openNotificationWithIconErr(
      'Session Timed out',
      'Session Timed out, you will be logged out',
      'error',
    );
    dispatch(userSignOut());
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (session === undefined && auth === true) {
        handleTimeout();
      }
    }, MINUTE_SESSION);

    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [session]);

  if (!isError && isLoading) return <></>;

  if (typeof auth !== 'undefined' && auth === false) {
    const session = getSession(); // current loggedin user token
    if (session !== null) {
      // return <Redirect from={path} to="/bank" noThrow />;
      console.log('');
      // return <Redirect from={path} to="/feeds" noThrow />;
    }
  }

  if (typeof auth !== 'undefined' && auth === true) {
    // check if auth needed for component
    const session = getSession(); // current loggedin user token
    if (
      typeof getSession() === 'undefined' ||
      session === null ||
      session === ''
    ) {
      const login = '/auth';
      // user not currently logged in
      return <Redirect from={path} to={login} noThrow state={{ from: path }} />;
      // console.log(path)
      //   return  <Redirect
      //   from={path}
      //   to={{
      //     pathname: login,
      //     state: { from: props.location }
      //   }}
      //   noThrow
      // />
    }
  }

  if (typeof auth !== 'undefined' && auth === true) {
    // check if auth needed for component
    const session = getSession(); // current logged in user token
    if (
      _.isEmpty(session) ||
      typeof getSession() === 'undefined' ||
      session === null ||
      session === ''
    ) {
      // this is to check the token sent from the API
    } else {
      // check/get current user
      if (
        (path !== '/auth/sign-up' || path !== '/home') &&
        (_.isEmpty(props.authUser) === true ||
          _.isEmpty(props.authUser) === null)
      ) {
        props.getUser();
      }
    }
  }
  if (
    !localStorage.getItem('userData') &&
    auth === true &&
    (session === null || session === '')
  ) {
    // check if auth needed for component
    // alert('ererrerweewe')
    if (!window.location.href.includes('auth') && auth === true) {
      const login = '/auth';
      // user not currently logged in
      return <Redirect from={path} to={login} noThrow state={{ from: path }} />;
    }
  }

  return React.createElement(component, {
    path,
    props,
    ...props,
  });
}

const mapStateToProps = ({ auth }) => {
  const { authUser } = auth;
  return { authUser };
};

export default connect(mapStateToProps, { getUser, userSignOut })(AppComponent);
