import React from 'react';
import { connect } from 'react-redux';
import {
  closeNotificationBox,
  closeNotificationSkillBox,
  closeNotificationSavingsBox,
  closeNotificationKycBox,
} from 'appRedux/actions/Alertbox';
import './notifybox.scss';
const Notifybox = props => {
  return (
    <div
      className={`notifybox-container ${
        props.name === 'Refer'
          ? props.closeBox
            ? ' closed'
            : ''
          : props.name === 'Saving'
          ? props.closeSavingBox
            ? ' closed'
            : ''
          : props.closeSkillBox
          ? ' closed'
          : props.closeKycBox
          ? ' closed'
          : ''
      } `}
    >
      <div className="notifybox-inner">
        <img src={props.image} alt="svg icon" />
        <div className="notifybox-inner right">
          <p>{props.title}</p>
          <p>{props.subtitle}</p>
          <button className="notify-box-btn" onClick={() => props.click()}>
            {props.button}
          </button>
        </div>
        <p className="notifybox-close">
          <i
            className="fas fa-times"
            onClick={
              props.name === 'Refer'
                ? props.closeNotificationBox
                : props.name === 'Saving'
                ? props.closeNotificationSavingsBox
                : props.name === 'KYC'
                ? props.closeNotificationKycBox
                : props.closeNotificationSkillBox
            }
          ></i>
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = ({ alertbox }) => {
  const { closeBox, closeSkillBox, closeSavingBox, closeKycBox } = alertbox;
  return {
    closeBox,
    closeSkillBox,
    closeSavingBox,
    closeKycBox,
  };
};

export default connect(mapStateToProps, {
  closeNotificationBox,
  closeNotificationSkillBox,
  closeNotificationSavingsBox,
  closeNotificationKycBox,
})(Notifybox);
