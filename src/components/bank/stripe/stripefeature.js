import React from 'react';
import approved from 'assets/main_img2.svg';
import pend from 'assets/founderp.svg';
import fail from 'assets/foundera.svg';
// import card from "assets/card00.svg"
import ccard from 'assets/founderc.svg';
import { connect } from 'react-redux';
import Loader from 'components/Loader';
import { stripeConnect } from 'appRedux/actions/waitlist';
import './stripe.scss';
import { Shortinfo } from 'components/common/shortinfo/shortinfo';

const Stripefeature = props => {
  const __renderSvg = () => {
    switch (props.status) {
      case 'APPROVED':
        return approved;
      case 'DISAPPROVED':
        return fail;
      case 'PENDING':
        return pend;
      default:
        return approved;
    }
  };
  const __renderClass = () => {
    switch (props.status) {
      case 'APPROVED':
        return ' --approved';
      case 'DISAPPROVED':
        return ' --fail';
      case 'PENDING':
        return ' --pending';
      default:
        return ' --normal';
    }
  };
  const __renderSub = () => {
    switch (props.status) {
      case 'APPROVED':
        return 'Founders card application has been approved, you can click button below to proceed';
      case 'DISAPPROVED':
        return 'Founders card application has been disapproved.';
      case 'PENDING':
        return ' Founders card application is pending.';
      default:
        return ' Get a Visa card that works for you as a Founder/Business owners that works everywhere on the internet';
    }
  };

  if (props.stripeStatus === 'VERIFIED') {
    return (
      <Stripefeatuecard
        waitlist={props.waitlist}
        stripeConnect={props.stripeConnect}
      />
    );
  } else {
    return (
      <div className={`stripefeature ${__renderClass()}`}>
        <div className="stripefeature__top">
          <span>
            <h4 className={__renderClass()}>Founders Card</h4>
            <p className={__renderClass()}>{__renderSub()}</p>
          </span>
          {props.status === 'APPROVED' && (
            <Shortinfo subject="Please allow pop up and redirects on your browser." />
          )}
          {props.loading ? (
            <div className="stripefeature__loader">
              {' '}
              <Loader />{' '}
            </div>
          ) : (
            <button
              className={`stripefeature__btn ${__renderClass()}`}
              disabled={
                props.status === 'APPROVED' ||
                props.status === null ||
                props.status === 'NOAPPLICATION' ||
                props.status === 'DISAPPROVED'
                  ? false
                  : true
              }
              onClick={() =>
                props.status === 'APPROVED'
                  ? props.stripeConnect()
                  : props.waitlist()
              }
            >
              {!props.status
                ? 'Join The Queue'
                : props.status === 'APPROVED'
                ? 'Click To Continue'
                : props.status === 'DISAPPROVED'
                ? 'Try Again'
                : 'Join The Queue'}
            </button>
          )}
        </div>
        <img className="stripefeature__img" src={__renderSvg()} alt="card" />
      </div>
    );
  }
};

const Stripefeatuecard = props => {
  return (
    <div className={`stripefeature --createcard`}>
      <div className="stripefeature__top">
        <span>
          <h4 className="--approved">Founders Card</h4>
          <p className="--approved">
            You have successfully completed your onboarding through our partner
            the next step is to create
          </p>
        </span>
        {props.loading ? (
          <div className="stripefeature__loader">
            {' '}
            <Loader />{' '}
          </div>
        ) : (
          <button
            className={`stripefeature__btn --createcard`}
            onClick={() => props.waitlist()}
          >
            Create Card
          </button>
        )}
      </div>
      <img className="stripefeature__img --createcard" src={ccard} alt="card" />
    </div>
  );
};
const mapStateToProps = ({ waitlist }) => {
  const { message, loading } = waitlist;

  return {
    message,
    loading,
  };
};
const mapDispatchToProps = {
  stripeConnect,
};

export default connect(mapStateToProps, mapDispatchToProps)(Stripefeature);
