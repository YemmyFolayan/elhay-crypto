import React, { useState, useEffect } from 'react';
import Loader from 'components/Loader';
import { Backcontinue } from 'components/common/backcontinue/backcontinue';
import confirm from 'assets/confirm.svg';
import error from 'assets/errorsvg.svg';
import pend from 'assets/pendsvg.svg';
import api from 'appRedux/api';
import './checkverification.scss';

export const Kycverification = props => {
  const [loading, setLoader] = useState(true);
  const [checkKyc, setCheck] = useState({});

  const goBack = () => {
    props.setRef('go back');
    props.move(2);
  };

  const goContinue = () => {
    props.move(4);
  };

  var checkMyKyc = value => {
    api
      .get(`/sila/check_kyc`)
      .then(response => {
        setCheck(response.data.data[1].data);
        value && props.setReq('');
        setLoader(false);
      })
      .catch(err => {
        console.log('');
      });
  };

  // eslint-disable-next-line
  useEffect(() => {
    checkMyKyc();
    // eslint-disable-next-line
  }, []);
  if (loading) {
    return (
      <div className="kycverify">
        <Loader />
        <p>Give us some seconds, We are trying to verify your details.</p>
      </div>
    );
  } else {
    return (
      <div className="kycverify">
        <div className="kycverify__top">
          <img
            src={
              checkKyc.success === true
                ? confirm
                : checkKyc.message.includes('pending')
                ? pend
                : error
            }
            alt="confirm svg"
          />
          {/* <p>{props.data.handle} has passed ID Verification</p> */}
          {checkKyc.success === true
            ? ' '
            : props.req
            ? checkKyc.message.includes('pending')
              ? props.req
              : props.req +
                ' click the back button to update your details and try again'
            : ''}
          <p
            className={`${
              checkKyc.success === true
                ? 'confirm'
                : checkKyc.message.includes('pending')
                ? 'pending'
                : 'error'
            }`}
          >
            {' '}
            {checkKyc.message}
          </p>
        </div>
        {checkKyc.success === false ? (
          <button
            className="backcontinue__continue"
            style={{ marginTop: '20px' }}
            onClick={() => checkMyKyc('clear')}
          >
            {' '}
            {props.loading
              ? 'Checking Verification ...'
              : 'Check Verification Again'}
          </button>
        ) : (
          <></>
        )}
        <Backcontinue
          text="Go back to registraiton"
          goBack={goBack}
          // continue = {goContinue}
        >
          <button
            className="backcontinue__continue"
            disabled={checkKyc.success === false ? true : false}
            onClick={() => goContinue()}
          >
            Continue
          </button>
        </Backcontinue>
      </div>
    );
  }
};
