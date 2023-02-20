/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import './accordion.scss';
import './kycupload.scss';
import { Success } from 'components/common/success/success';
import Inputfloat from 'components/common/inputs/inputfloat';
import { Singleselect } from 'components/common/inputs/singleselect';
import { Titlesubtitle } from 'components/common/titlesubtitle/titlesubtitle';
import api from 'appRedux/api';
import {
  openNotificationWithIcon,
  openNotificationWithIconErr,
} from 'appRedux/actions/Common';
import verone from '../../assets/verone.svg';
import successnew from '../../assets/successnew.svg';
// import pending from "../../assets/pending.svg";
import { errorMessage } from 'helpers/utils';
import errorsvg from '../../assets/errorsvg.svg';
import Accordion from './accordion';
import caretup from '../../assets/caretup.svg';
import caretdown from '../../assets/caretdown.svg';
import circle from '../../assets/circle-check.svg';
import greyinfo from '../../assets/greyinfo.svg';
import { Smallinfo } from 'components/common/shortinfo/shortinfo';

function KycLv1(props) {
  const [modal, showModal] = useState(false);

  var closeModal = () => {
    showModal(false);
  };

  const handleKyc = () => {
    showModal(true);
  };
  return (
    <div>
      <Modal
        cancelButtonProps={{ style: { display: 'none' } }}
        visible={modal}
        onCancel={() => closeModal()}
        destroyOnClose
        footer=""
        centered={true}
        okButtonProps={{ style: { display: 'none' } }}
        maskStyle={{
          background: 'rgba(103, 169, 72, 0.2)',
          backdropFilter: 'blur(4px)',
        }}
      >
        <Kyc1
          onClick={closeModal}
          state={props.state}
          refetch={props.refetch}
          userdata={props.userdata}
        />
      </Modal>
      <Accordion
        caretdown={caretdown}
        caretup={caretup}
        handleKyc={handleKyc}
        title="Level 1 Verification"
        subtitle="Acceptable verification numbers"
        subtext={'You can select from our variety of documents options'}
        tinytext={'1'}
        number1={'International Passport Number'}
        number2={'Virtual National Identity Number'}
        number3={'Bank Verification Number'}
        number4={'Voter’s card Number'}
        children={
          <>
            <div className="side-inner">
              <img src={circle} alt="" />
              <li>Instant Withdrawal and Transfer limits of ₦100,000.</li>
            </div>
            <div className="side-inner">
              <img src={circle} alt="" />
              <li>Daily Withdrawal and Transfer limits of ₦500,000.</li>
            </div>
          </>
        }
        image={verone}
        buttontext={'Start L1 Verification Process'}
      />
    </div>
  );
}

export default KycLv1;

export const Kyc1 = props => {
  const [type, setType] = useState('');
  const [district, setDistrict] = useState('');
  const [step, setStep] = useState();
  const [state, setState] = useState({
    type: '',
    identityNumber: '',
  });
  const [message, setMessage] = useState('');
  const [btn, setBtn] = useState({
    name: 'Submit',
    value: true,
  });

  var options = [
    {
      label: 'Passport',
      value: 'PASSPORT',
    },
    {
      label: 'BVN',
      value: 'BVN',
    },
    {
      label: 'vNIN',
      value: 'NIN',
    },
    {
      label: 'Voters Card',
      value: 'VOTERS_CARD',
    },
  ];

  var __renderStep = value => {
    switch (value) {
      case '00':
        return setStep(1);
      // case '01':
      //     return setStep(1);
      default:
        return setStep(3);
    }
  };

  var setTy = value => {
    // var value = e.target.value;
    setType(value);
    setState({ ...state, type: value });
  };

  var uploadKycno = () => {
    setBtn({ ...btn, value: true, name: 'Validatiing...' });
    var statedis = district
      ? district.label.includes('State')
        ? district.label.slice(0, -6)
        : district.label
      : '';
    var data =
      state.type.value === 'PASSPORT'
        ? {
            ...state,
            firstName: props.userdata.firstName,
            lastName: props.userdata.lastName,
            type: state.type.value,
          }
        : state.type.value === 'VOTERS_CARD'
        ? { ...state, type: state.type.value, state: statedis }
        : { ...state, type: state.type.value };
    api
      .post('/identity/verification', data)
      .then(res => {
        res.data.data.response_code === '00'
          ? openNotificationWithIcon(
              `${state.type.value} validation`,
              `${state.type.value} has been successfully validated.`,
              'success',
            )
          : res.data.response_code === '01' || res.data.response_code === '02'
          ? openNotificationWithIconErr(
              `${state.type.value} validation`,
              `${res.data.message} ID not found`,
              'error',
            )
          : openNotificationWithIconErr(
              `${state.type.value} validation`,
              `An Error occured reach out to help@elhay.com`,
              'error',
            );
        setMessage(res.data.message);
        setStep(1);
        setBtn({ ...btn, value: false, name: 'Submit' });
        props.refetch();

        __renderStep(res.data.data.response_code);
      })
      .catch(error => {
        props.refetch();
        openNotificationWithIconErr(errorMessage(error), 'Error', 'error');
        setBtn({ ...btn, value: false, name: 'Submit' });
        setMessage(error.data.message);
        setStep(3);
      });
  };

  useEffect(() => {
    console.log(props.userdata);
    setStep(2);
    // eslint-disable-next-line
  }, [step]);

  var _renderSteps = () => {
    switch (step) {
      case 1:
        return (
          <Success
            image={successnew}
            title="Successful"
            subtitle={message}
            onClick={() => props.onClick()}
            button="Okay, Thank you."
          />
        );
      case 2:
        return (
          <div className="kycupload-inner-container">
            <Titlesubtitle
              steps="Step 1 "
              title="Level 1 KYC Verification"
              subtitle="You are almost there, you can choose to fill this form now or later to complete your account creation."
            />
            <div className="kycupload-inner-container right">
              <>
                <Singleselect
                  value={state.type}
                  options={options}
                  name="type"
                  // disable={true}
                  placeholder="KYC Document"
                  onChange={setTy}
                />
              </>
              <span className="mt-4"></span>
              {state.type && state.type.value !== '' && (
                <Inputfloat
                  label={`${state.type.label} NUMBER`}
                  type="text"
                  value={state.identityNumber}
                  placeholder={`Enter Your ${
                    state.type ? state.type.label : 'KYC'
                  } Number`}
                  onChange={e =>
                    setState({ ...state, identityNumber: e.target.value })
                  }
                />
              )}
              {state.type && state.type.value === 'NIN' && (
                <>
                  <Smallinfo
                    image={greyinfo}
                    style={{ backgroundColor: 'green' }}
                    subject={
                      <p className="cont" style={{ color: '#2D2F30' }}>
                        The Virtual NIN (vNIN) is designed to replace the raw
                        11-digit NIN for everyday usage.
                        <br />
                        <br />
                        <p style={{ color: '#2D2F30' }}>
                          This can be generated using:
                          <ol style={{ fontSize: '1rem' }}>
                            <li
                              style={{
                                color: '#2D2F30',
                                paddingBottom: '0',
                                fontSize: '1rem',
                              }}
                            >
                              NIMC official mobile app
                            </li>
                            <li style={{ color: '#2D2F30', fontSize: '1rem' }}>
                              USSD -{' '}
                              <strong
                                className=""
                                style={{
                                  color: '#2D2F30',
                                  paddingBottom: '0',
                                  fontSize: '1rem',
                                }}
                              >
                                *346*3*Your NIN*696739#
                              </strong>
                            </li>
                          </ol>
                        </p>
                      </p>
                    }
                  />
                </>
              )}
              <span className="mt-2"></span>
              {state.type.value === 'VOTERS_CARD' && (
                <Singleselect
                  value={district}
                  options={props.state}
                  name="state"
                  // disable={true}
                  onChange={value => setDistrict(value)}
                />
              )}
              <div className="updateprofile-btn-box">
                <button
                  className="save-changes"
                  disabled={
                    state.type && state.identityNumber && btn.name === 'Submit'
                      ? false
                      : true
                  }
                  // disabled={btn.value}
                  onClick={uploadKycno}
                >
                  {btn.name}
                </button>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <Success
            image={errorsvg}
            type="error"
            title="Failed"
            subtitle={
              message ||
              'Your kyc doc failed our verification process, click button below to try again.'
            }
            button="Try Again"
            onClick={() => setStep(2)}
          />
        );
      default:
        return <>default</>;
    }
  };

  return <div className="kycupload-container">{_renderSteps()}</div>;
};
