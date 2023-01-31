import React, { useState, useEffect } from 'react';
import Loader from 'components/Loader';
import sorry from '../../assets/error-2.svg';
import mail from 'assets/checkmail.svg';
import './verifyuser.scss';
import { Success } from 'components/common/success/success';
import { navigate } from '@reach/router';
import { errorMessage } from 'helpers/utils';
import api from 'appRedux/api';
import {
  openNotificationWithIcon,
  openNotificationWithIconErr,
} from 'appRedux/actions/Common';
export const Verifyuser = ({ userId }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [step, setStep] = useState(0);

  var verfiyMe = () => {
    api
      .post(`auth/new-email-verification`, { userId: userId })
      .then(response => {
        openNotificationWithIcon(
          `Congratulations, You just got verified`,
          'Verification',
          'success',
        );
        setData({
          type: 'success',
          message: response.data.message,
        });
        setLoading(false);

        setTimeout(() => {
          navigate('/auth');
        }, 1500);
      })
      .catch(err => {
        openNotificationWithIconErr(err.data.message, 'Verification', 'error');
        console.log(userId);
        setData({
          type: 'Error',
          message:
            'The verification link is either expired or invalid, click the button below to get another link.',
        });
        console.log(errorMessage(err));
        setLoading(false);
      });
  };

  var resendVerification = () => {
    api
      .post('auth/verify-account', { userId: userId })
      .then(() => {
        openNotificationWithIcon(
          `Verification email successful resent.`,
          'Resend Verification',
          'success',
        );
        setStep(1);
      })
      .catch(error => {
        console.log(error);

        openNotificationWithIconErr(
          error.data.message,
          'Resend Verification',
          'error',
        );

        setData({
          type: 'Error',
          message: error.data.message,
        });
      });
  };

  var goToLogin = () => {
    navigate('/auth');
  };

  // eslint-disable-next-line
  useEffect(() => {
    verfiyMe();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <Loader />;
  } else if (data.type === 'success') {
    return (
      <div className="verification">
        <div className="verification__inner">
          <Success
            title="Verification Successful"
            subtitle={data.message}
            button="Login into Account"
            onClick={goToLogin}
          />
        </div>
      </div>
    );
  } else {
    switch (step) {
      case 0:
        return (
          <div className="verification">
            <div className="verification__inner">
              <Success
                image={sorry}
                type="error"
                title="Verification Failed"
                subtitle={data.message}
                button="Resend Verification"
                onClick={resendVerification}
              />
            </div>
          </div>
        );
      case 1:
        return (
          <div className="verification">
            <div className="verification__inner">
              <Success
                image={mail}
                title="Check Your Mail"
                subtitle="We just sent you a new verification mail, kindly check the email address you registered with."
              />
            </div>
          </div>
        );
      default:
        return <> Nothing To See </>;
    }
  }
};
