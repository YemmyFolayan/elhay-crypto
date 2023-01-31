import React, { useEffect } from 'react';
import { Card } from 'reactstrap';

import { connect } from 'react-redux';
import { getMeWithToken } from 'appRedux/actions/auth';
import Loader from 'components/Loader';

const Verification = ({ message, loading, props, getMeWithToken }) => {
  useEffect(() => {
    // getMeWithToken(token[token.length - 1])
    getMeWithToken(props.token);
    localStorage.setItem('tourGuideTrigger', true);

    console.log(`checking here ${message}`);
  }, [message, loading, props, getMeWithToken]);

  const tokenGenerateResponse = (
    <div>
      <h3 className="email-card__header">Email is being Verified</h3>
      <h4 className="email-card__subheader">
        Please wait for the email verification
      </h4>
      <h6 className="email-card__text">Thank you.</h6>
    </div>
  );

  return (
    <>
      <div className="">
        <div className="row">
          <div
            className="col-sm-12 col-md-12 isw-container"
            style={{ height: '100vh', width: '100%', overflow: 'scroll' }}
          >
            <div className=" flex_page_container d-flex align-items-center justify-content-center">
              <div className="login-form">
                <Card className="email-card">
                  {loading === true ? <Loader /> : tokenGenerateResponse}
                </Card>
              </div>{' '}
            </div>{' '}
          </div>{' '}
        </div>{' '}
      </div>
    </>
  );
};

const mapStateToProps = ({ common }) => {
  const { display, message, loading } = common;
  return { display, message, loading };
};

Verification.defaultName = 'Verification';
export default connect(mapStateToProps, { getMeWithToken })(Verification);
