/* eslint-disable */

import React, { useEffect, useState } from 'react';
import './accordion.scss';
import './kycupload.scss';
import vertwo from '../../assets/vertwo.svg';
import { Modal } from 'antd';
import Accordion from './accordion';
import { errorMessage } from 'helpers/utils';
import picture from '../../assets/picture.svg';
import { Titlesubtitle } from 'components/common/titlesubtitle/titlesubtitle';
import {
  openNotificationWithIcon,
  openNotificationWithIconErr,
} from 'appRedux/actions/Common';
import api from 'appRedux/api';
import { Shortinfo } from 'components/common/shortinfo/shortinfo';
import { Singleselect } from 'components/common/inputs/singleselect';
import { Success } from 'components/common/success/success';
import errorsvg from '../../assets/errorsvg.svg';
import { navigate } from '@reach/router';
import { Platformbutton } from 'components/common/button/button';
import caretup from '../../assets/caretup.svg';
import caretdown from '../../assets/caretdown.svg';
import kycbad from '../../assets/kycbad.svg';
import kycfailed from '../../assets/kycfailed.svg';
import successnew from '../../assets/successnew.svg';
import { useUserData } from '../../helpers/hooks';
import circle from '../../assets/circle-check.svg';

function KycLv2(props) {
  const [modal, showModal] = useState(false);
  const { userData } = useUserData();

  var closeModal = () => {
    showModal(false);
  };

  const handleKyc = () => {
    showModal(true);
  };

  return (
    <>
      <Modal
        cancelButtonProps={{ style: { display: 'none' } }}
        visible={modal}
        onCancel={closeModal}
        destroyOnClose
        footer=""
        centered={true}
        okButtonProps={{ style: { display: 'none' } }}
        maskStyle={{
          background: 'rgba(103, 169, 72, 0.2)',
          backdropFilter: 'blur(4px)',
        }}
      >
        <Kyc2
          onClick={closeModal}
          refetch={props.refetch}
          userdata={props.userdata}
        />
      </Modal>
      {userData.kycLevel === 'Level1' &&
      userData.kycDocumentStatus === 'DISAPPROVED' ? (
        <Accordion
          handleKyc={handleKyc}
          caretdown={kycfailed}
          caretup={kycfailed}
          title="Level 2 Verification"
          subtitle="Upload a Document"
          subtext={'Upload the document you used for LEVEL 1 verification'}
          tinytext={'2'}
          number1={'Intl/Local Passport'}
          number2={'vNIN'}
          number3={'BVN'}
          number4={'Voter’s card'}
          children={
            <>
              <div className="side-inner">
                <img src={circle} alt="" />
                <li>Instant Withdrawal and Transfer limits of ₦500,000.</li>
              </div>
              <div className="side-inner">
                <img src={circle} alt="" />
                <li>Daily Withdrawal and Transfer limits of ₦1,000,000.</li>
              </div>
              <div className="side-inner">
                <img src={circle} alt="" />
                <li>Access to our virtual and Physical card offerings.</li>
              </div>
            </>
          }
          image={kycbad}
          picture={kycfailed}
          buttontext={'Start L2 Verification Process'}
          color="#FDE7E8"
          topcolor="#C43138"
          bottomcolor="#C43138"
          leftcolor="#C43138"
          rightcolor="#C43138"
        />
      ) : (
        <Accordion
          check={
            props.userdata.kycLevel === 'Level1' &&
            props.userdata.passedKyc === true
              ? true
              : false
          }
          handleKyc={handleKyc}
          caretup={caretup}
          caretdown={caretdown}
          title="Level 2 Verification"
          subtitle="Upload a Document"
          subtext={'Upload the document you used for LEVEL 1 verification'}
          tinytext={'2'}
          number1={'Intl/Local Passport'}
          number2={'vNIN'}
          // number3={'BVN'}
          number4={'Voter’s card'}
          children={
            <>
              <div className="side-inner">
                <img src={circle} alt="" />
                <li>Instant Withdrawal and Transfer limits of ₦500,000.</li>
              </div>
              <div className="side-inner">
                <img src={circle} alt="" />
                <li>Daily Withdrawal and Transfer limits of ₦1,000,000.</li>
              </div>
              <div className="side-inner">
                <img src={circle} alt="" />
                <li>Access to our virtual and Physical card offerings.</li>
              </div>
            </>
          }
          image={vertwo}
          buttontext={'Start L2 Verification Process'}
        />
      )}
    </>
  );
}

export default KycLv2;

const Kyc2 = props => {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [step, setStep] = useState();
  const [type, setType] = useState('passport');
  const [message, setMessage] = useState('');
  const [btn, setBtn] = useState({
    name: 'Upload Document',
    value: true,
  });
  const [state, setState] = useState({
    type: '',
    identityNumber: '',
  });

  var options = [
    {
      label: 'International Passport',
      value: 'passport',
    },
    // {
    //   label: 'BVN',
    //   value: 'BVN',
    // },
    {
      label: 'NIN',
      value: 'NIN',
    },
    {
      label: 'Voters Card',
      value: 'VOTERS_CARD',
    },
  ];

  var setTy = value => {
    // var value = e.target.value;
    setType(value);
    setState({ ...state, type: value });
  };

  useEffect(() => {
    setStep(2);
    // eslint-disable-next-line
  }, []);

  var _renderSteps = () => {
    switch (step) {
      case 0:
        return (
          <Success
            image={successnew}
            title="Successful"
            subtitle={message}
            onClick={() => props.onClick()}
            button="Okay, Thank you"
          />
        );
      case 1:
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
      case 2:
        return (
          <div className="kycupload-inner-container">
            <Titlesubtitle
              steps="Step 1 "
              title="Level 2 KYC Verification"
              subtitle="You are almost there, you can choose to fill this form now or later to complete your account creation."
            />
            <div className="kycupload-inner-container right">
              <>
                <Singleselect
                  value={state.type}
                  options={options}
                  name="type"
                  placeholder="KYC Document"
                  // disable={true}
                  onChange={setTy}
                />
                {(state.type.value === 'passport' ||
                  state.type.value === 'BVN' ||
                  state.type.value === 'NIN' ||
                  state.type.value === 'VOTERS_CARD') && (
                  <Kycdoc
                    value={front}
                    id="front-btn"
                    setValue={setFront}
                    handleChange={handleChange}
                    title="Document"
                    type={type.label}
                    setBtn={setBtn}
                    btn={btn}
                    remove={() => setFront('')}
                  />
                )}
              </>
              <span className="mt-2"></span>

              {(state.type.value === 'passport' ||
                state.type.value === 'BVN' ||
                state.type.value === 'NIN' ||
                state.type.value === 'VOTERS_CARD') && (
                <Shortinfo
                  subject={
                    btn.name.includes('...')
                      ? 'It might take 2-3minutes to upload your document'
                      : 'This is a regulatory requirement for most organizations like ours doing cross border payments. To avoid disruption of service or limits on your transactions, please kindly go ahead and upload your KYC documents below '
                  }
                />
              )}
              <div className="updateprofile-btn-box">
                {state.type.value === 'passport' ||
                state.type.value === 'BVN' ||
                state.type.value === 'NIN' ||
                state.type.value === 'VOTERS_CARD' ? (
                  <Platformbutton
                    disabled={front.name ? false : true}
                    name={btn.name === 'Upload Document' ? 'Submit' : btn.name}
                    type="normal"
                    click={() => uploadKyc()}
                  />
                ) : (
                  <button
                    className="save-changes"
                    disabled={
                      state.type &&
                      state.identityNumber &&
                      btn.name === 'Upload Document'
                        ? false
                        : true
                    }
                    onClick={
                      state.type.value === 'passport' ? uploadKyc : uploadKyc
                    }
                  >
                    {btn.name}
                  </button>
                )}
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

  var uploadKyc = () => {
    setBtn({ ...btn, value: true, name: 'Uploading...' });
    var formData = new FormData();
    formData.append('frontPicture', front);
    formData.append('BackPicture', back);
    var timeoutOne = setTimeout(() => {
      setBtn({ ...btn, value: true, name: 'Still Uploading...' });
    }, 10000);

    var timeoutTwo = setTimeout(() => {
      setBtn({ ...btn, value: true, name: 'Just a little more...' });
    }, 20000);
    api
      .patch('/profiles/level2_kyc_upload', formData)
      .then(response => {
        setMessage(response.data.message);
        setBtn({ ...btn, value: true, name: 'Uploaded' });
        openNotificationWithIcon(
          'KYC Upload',
          'KYC document Uploaded successfully',
          'success',
        );
        setTy('');
        setFront('');
        setBack('');
        setStep(0);
        props.refetch();
        clearTimeout(timeoutOne);
        clearTimeout(timeoutTwo);
        setTimeout(() => {
          // window.location.reload()
          navigate('/myprofile?tab=kyc');
          // window.location.reload()
        }, 500);
      })
      .catch(error => {
        props.refetch();
        openNotificationWithIconErr(errorMessage(error), 'Error', `error`);
        setBtn({ ...btn, value: false, name: 'Upload KYC' });
        clearTimeout(timeoutOne);
        clearTimeout(timeoutTwo);
      });
  };

  return <div className="kycupload-container">{_renderSteps()}</div>;
};

const Kycdoc = props => {
  const MAX_FILE_SIZE = 2000000;
  return (
    <div className="kycdoc-container">
      {/* style={{ backgroundImage: props.value ?`url(${URL.createObjectURL(props.value)})` : '', objectFit:'cover'}}, */}
      <div className="kycdoc-inner-container">
        <img src={picture} alt="upload" />
        {!props.value ? (
          <>
            <input
              type="file"
              id={props.id}
              value={props.value}
              name={props.name}
              accept="image/*"
              onChange={e => {
                const selectedFile = e.currentTarget.files[0];
                selectedFile.size > MAX_FILE_SIZE
                  ? openNotificationWithIconErr(
                      'Image is too large! Please select a file smaller than 2MB.',
                      'Upload Error!',
                      `error`,
                    )
                  : props.setValue(selectedFile);
                props.setBtn({ ...props.btn, value: false });
              }}
              hidden
            />
            <label htmlFor={props.id}>
              {' '}
              Select {props.type} {props.title} To Upload
            </label>
            <p className="info">
              {' '}
              {props.info
                ? props.info
                : 'Image(jpg, jpeg, png) size of limit'}{' '}
              <strong>{` <`} 2MB </strong>
            </p>
          </>
        ) : (
          <button
            className="fileupload__container__remove"
            onClick={props.remove}
          >
            {' '}
            remove -{' '}
            {typeof props.value.name === 'undefined'
              ? props.name.name
              : props.value.name}
          </button>
        )}
      </div>
    </div>
  );
};
