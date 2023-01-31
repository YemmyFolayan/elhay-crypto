import axios from 'axios';
import { getSession } from 'appRedux/store/cookies';
import _ from 'lodash';

const settings = {
  //baseURL: 'http://localhost:5000/api/ https://api.wevesti.com/api/ http://staging-paystack.us-east-1.elasticbeanstalk.com/api/ http://vesti-working-production.us-east-1.elasticbeanstalk.com/api ',
  baseURL: 'https://api.wevesti.com/api/',
  // baseURL:  ' http://staging-paystack.us-east-1.elasticbeanstalk.com/api/ http://vesti-working-production.us-east-1.elasticbeanstalk.com/api ',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    Accept: 'application/json,text/plain,*/*',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  },
};

const settingsTwo = {
  baseURL:
    'http://vesti-founders-applications.us-east-1.elasticbeanstalk.com/api/',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    Accept: 'application/json,text/plain,*/*',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  },
};

const instance = axios.create(settings);
const instanceTwo = axios.create(settingsTwo);
const token = getSession();
if (token != null && !_.isEmpty(token)) {
  instance.defaults.headers.common.Authorization = `Bearer ${getSession()}`;
  instanceTwo.defaults.headers.common.Authorization = `Bearer ${getSession()}`;
}

var rendInstance = value => {
  switch (value) {
    case 'stripe':
      return instanceTwo;
    default:
      return instance;
  }
};

export default {
  get(url, request, type) {
    return rendInstance(type ? type : '')
      .get(url, request)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  post(url, request, type) {
    return rendInstance(type ? type : '')
      .post(url, request)
      .then(response => Promise.resolve(response))
      .catch(error => {
        if (error.response) {
          return Promise.reject(error.response);
        }
        return Promise.reject(error);
      });
  },
  put(url, request, type) {
    return rendInstance(type ? type : '')
      .put(url, request)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  patch(url, request, type) {
    return rendInstance(type ? type : '')
      .patch(url, request)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  delete(url, request) {
    return instance
      .delete(url, request)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
};

export const setToken = token => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  instanceTwo.defaults.headers.common.Authorization = `Bearer ${token}`;
};
