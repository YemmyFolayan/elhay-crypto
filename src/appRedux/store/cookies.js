import Cookies from 'js-cookie';
// import { COOKIES_TIME } from 'appRedux/constants';

// var inThirtyMinutes = new Date(new Date().getTime() + 30 * 60 * 1000)
export const setSession = value => {
  // Cookies.set('__session', value, { expires: 2 * 60 * 1000 });
  Cookies.set('__session', value, {
    expires: new Date(new Date().getTime() + 28 * 60 * 1000),
  });
};

export const setSessionWithValue = (value, key) => {
  Cookies.set(key, value, { expires: 28 * 60 * 1000 });
};

export const getSessionWithKey = key => {
  return Cookies.get(key);
};

export const getPinFromSession = () => {
  // set pin here
};

export const getSession = () => {
  const jwt = Cookies.get('__session');
  // eslint-disable-next-line
  let session = null;
  try {
    if (typeof jwt !== undefined) {
      session = jwt;
      return jwt;
    }
  } catch (error) {
    // console.log('');
    return jwt;
  }
  // return Cookies.get('__session');
  // return session;
};

export const clearSession = () => {
  Cookies.remove('__session');
};
