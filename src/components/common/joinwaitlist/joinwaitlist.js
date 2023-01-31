import React from 'react';
import './joinwaitlist.scss';
import { useState } from 'react';
import api from 'appRedux/api';
import { navigate } from '@reach/router';
import {
  openNotificationWithIconErr,
  openNotificationWithIcon,
} from 'appRedux/actions/Common';

export const Joinwaitlist = () => {
  const [field, setField] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [error, setError] = useState('');
  const handleChange = e => {
    var name = e.target.name;
    var value = e.target.value;
    if (name === 'email') {
      // eslint-disable-next-line
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        setField({ ...field, [name]: value });
        setError('');
      } else {
        setError('Please input a valid email address');
      }
    } else {
      setField({ ...field, [name]: value });
    }
  };
  const handleMail = e => {
    var name = e.target.name;
    var value = e.target.value;

    // eslint-disable-next-line
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
      setField({ ...field, [name]: value });
      setError('');
    } else {
      setError('Please input a valid email address');
    }
  };

  const joinList = e => {
    e.preventDefault();
    var formData = new FormData(); //formdata object

    formData.append('firstName', field.firstName); //append the values with key, value pair
    formData.append('lastName', field.lastName);
    formData.append('email', field.email);
    console.log(field);
    // console.log(JSON.stringify(formData))
    api
      .post('/addUserToCoinWaitlist', formData)
      .then(({ data }) => {
        console.log(data);
        openNotificationWithIcon(`${data.message}`, 'Success', 'success');
        navigate('/vesticoinsuccess');
        setField({ firstName: '', lastName: '', email: '' });
      })
      .catch(error => {
        console.log('Error', error);
        openNotificationWithIconErr(`${error.data.message}`, 'Error', 'error');
      });
  };
  // eslint-disable-next-line
  const emoji = '🚀🚀';
  return (
    <div className="joinwaitlist-container">
      <div className="joinwaitlist-inner">
      

        <form onSubmit={e => joinList(e)}>
          <div className="form-top">
            <input
              name="firstName"
              type="text"
              placeholder="E.g John"
              value={field.firstName}
              onChange={e => handleChange(e)}
            />
            <input
              name="lastName"
              type="text"
              placeholder="E.g Doe"
              value={field.lastName}
              onChange={e => handleChange(e)}
            />
          </div>

          <input
            name="email"
            type="text"
            className="email"
            placeholder="E.g Johndoe@gmail.com"
            onChange={e => handleMail(e)}
          />
          {error && <p className="waitlist-error">{error}</p>}

          <button
            className="waitlist-button"
            disabled={
              field.firstName === '' ||
              field.lastName === '' ||
              field.email === '' ||
              error !== ''
                ? true
                : false
            }
          >
            Join The Waitlist
          </button>
        </form>
      </div>
    </div>
  );
};
