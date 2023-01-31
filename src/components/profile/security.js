import React, { useState, useEffect } from 'react';
import api from 'appRedux/api';
import {
  openNotificationWithIcon,
  openNotificationWithIconErr,
} from 'appRedux/actions/Common';
import { errorMessage } from 'helpers/utils';
import './security.scss';
import { Twofa } from './2fa';
import { Simplemodal } from 'components/common/simplifiedmodal';
import { Platformbutton } from 'components/common/button/button';
import Inputfloat from 'components/common/inputs/inputfloat';
import { Comptransaction } from 'components/common/completetransaction/comptransaction';
import { Titlesubtitle } from 'components/common/titlesubtitle/titlesubtitle';
import { connect } from 'react-redux';
import { updatePassword, updateTransPIN } from 'appRedux/actions/profile';

const Security = props => {
  const [inputs, setInputs] = useState({
    oldPassword: '',
    newPassword: '',
    modal: false,
  });
  const [check, setCheck] = useState(false);
  const [error, setError] = useState({
    newTransactionPin: '',
    oldTransactionPin: '',
  });
  const [pins, setPin] = useState({
    newTransactionPin: '',
    password: '',
    modal: false,
  });

  var setInput = e => {
    console.log(e.target.value);
    setInputs({ ...inputs, [e.target.name]: e.target.value }, [inputs]);
  };

  // eslint-disable-next-line
  var setNewPin = e => {
    // console.log(e.target.value)
    var pinRegex = RegExp(/^(\d{4}|\d{6})$/);
    if (pinRegex.test(e.target.value)) {
      setPin({ ...pins, [e.target.name]: e.target.value }, [pins]);
      setError({ ...error, [e.target.name]: '' });
    } else {
      setPin({ ...pins, [e.target.name]: e.target.value }, [pins]);
      setError({ ...error, [e.target.name]: 'invalid pin format' });
    }
  };

  var setPassword = e => {
    var value = e.target.value;
    setPin({ ...pins, password: value });
  };

  var updatePassword = e => {
    e.preventDefault();
    props.updatePassword(
      { oldPassword: inputs.oldPassword, newPassword: inputs.newPassword },
      () => setInputs({ ...inputs, modal: false }),
    );
  };

  var updatePin = e => {
    e.preventDefault();
    props.updateTransPIN(
      { newTransactionPin: pins.newTransactionPin, password: pins.password },
      () => setPin({ ...pins, modal: false }),
    );
  };

  var setTwofa = () => {
    setCheck(!check);
    var url = check ? '/factorAuth/disable' : '/factorAuth/Enable';
    api
      .post(url, { email: props.userdata.email })
      .then(res => {
        openNotificationWithIcon(res.data.message, '2-FA', 'success');
      })
      .catch(() => {
        openNotificationWithIconErr(errorMessage(error), '2-FA', 'error');
      });
  };

  useEffect(() => {
    var value = props.userdata.FactorAuth ? true : false;
    setCheck(value);
    // eslint-disable-next-line
  }, []);
  return (
    <div className="security-container">
      <Simplemodal
        onClick={() => setPin({ ...pins, modal: false })}
        visible={pins.modal}
      >
        <Titlesubtitle
          title="Update Transaction PIN"
          subtitle="Enter your new PIN and your account password."
        />
        <form className="securityform" onSubmit={e => updatePin(e)}>
          <Comptransaction
            setPin={value => setPin({ ...pins, newTransactionPin: value })}
            len={4}
            open={true}
            lower={true}
            pin={pins.newTransactionPin}
            title={`Enter your new Four (4) digits transaction PIN `}
          >
            <></>
          </Comptransaction>
          <div className="mb-4"></div>
          {pins.newTransactionPin.length >= 4 ? (
            <Inputfloat
              type="password"
              label="AccountPassword"
              name="password"
              value={pins.password}
              disabled={false}
              placeholder="Account password"
              onChange={setPassword}
            />
          ) : (
            <></>
          )}

          <div className="mb-4"></div>
          <div className="mb-2"></div>
          <Platformbutton
            disabled={pins.newTransactionPin && pins.password ? false : true}
            name="Update Transaction Pin"
            type="submit"
          />
        </form>
      </Simplemodal>
      <Simplemodal
        onClick={() => setInputs({ ...inputs, modal: false })}
        visible={inputs.modal}
      >
        <Titlesubtitle
          title="Update Account Password"
          subtitle="Fill in these fields to update your password"
        />
        <div className="mb-2"></div>
        <form className="securityform" onSubmit={e => updatePassword(e)}>
          <Inputfloat
            type="password"
            label="Old Password"
            name="oldPassword"
            value={inputs.oldPassword}
            placeholder="Enter your old password"
            disabled={false}
            onChange={setInput}
          />
          <div className="mb-4"></div>
          <Inputfloat
            type="password"
            label="New Password"
            name="newPassword"
            value={inputs.newPassword}
            placeholder="Enter your new password"
            disabled={false}
            onChange={setInput}
          />
          <div className="mb-4"></div>
          <div className="mb-2"></div>
          <div className="updateprofile-btn-box">
            <Platformbutton
              type="submit"
              name="Update Password"
              disabled={props.loading ? true : false}
            />
            {/* <button className="save-changes">
                            Update Password
                        </button> */}
          </div>
        </form>
      </Simplemodal>
      <div className="security-inner-container">
        <Titlesubtitle title="Security" />
        <Titleinfo
          title="Account Password"
          link="update account password"
          click={() => setInputs({ ...inputs, modal: true })}
        />

        <Titleinfo
          title="Transaction PIN"
          link="update transaction PIN"
          click={() => setPin({ ...pins, modal: true })}
        />

        <Twofa
          check={check}
          setCheck={setCheck}
          factorAuth={props.userdata.FactorAuth}
          setTwofa={setTwofa}
        />
      </div>
    </div>
  );
};

const Titleinfo = props => {
  return (
    <div className="titleinfo">
      <span>
        <p>{props.title}</p>
        <p>edit {props.title}</p>
      </span>

      <p className="titleinfo__link" onClick={() => props.click()}>
        {props.link} <i class="fas fa-arrow-right"></i>{' '}
      </p>
    </div>
  );
};

const mapStateToProps = ({ profile }) => {
  const { message, loading } = profile;
  return {
    message,
    loading,
  };
};

const mapDispatchToProps = {
  updateTransPIN,
  updatePassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(Security);
