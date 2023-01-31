import React, { useEffect, useState } from 'react';
import './accordion.scss';
import api from 'appRedux/api';
import verthree from '../../assets/verthree.svg';
import {
  openNotificationWithIcon,
  openNotificationWithIconErr,
} from 'appRedux/actions/Common';
import Accordion from './accordion';
import caretup from '../../assets/caretup.svg';
import caretdown from '../../assets/caretdown.svg';
import useIdentityPayKYC from 'react-identity-kyc';
import kycbad from '../../assets/kycbad.svg';
import kycfailed from '../../assets/kycfailed.svg';
import { useUserData } from 'helpers/hooks';
import circle from '../../assets/circle-check.svg';
import errorsvg from '../../assets/errorsvg.svg';
import { Success } from 'components/common/success/success';
import successnew from '../../assets/successnew.svg';
import Modal from 'components/common/Modal';

function KycLv3(props) {
  const [step, setStep] = useState();
  const [modal, showModal] = useState(true);
  const [message, setMessage] = useState();
  const { userData } = useUserData();

  var closeModal = () => {
    showModal(false);
  };

  const config = {
    first_name: props.userdata.firstName,
    last_name: props.userdata.lastName,
    email: props.userdata.email,
    merchant_key: 'pgkzokikeysiqgsg9z6l:DWxhBDvohni5mTx919OPIjA-Fjw',
    user_ref: props.userdata.id,
    is_test: false, //set this to true for a test
    callback: response => {
      console.log(response);
      response.code === 'E02'
        ? openNotificationWithIconErr(
            response.message,
            `KYC Level 3`,
            'error',
          ) && props.refetch()
        : response.code === 'E01'
        ? openNotificationWithIconErr(
            `${response.message}`,
            `KYC Level 3`,
            'error',
          ) && props.refetch()
        : SendData(response);
      props.refetch();
    },
  };

  const verifyWithIdentity = useIdentityPayKYC(config);

  const SendData = response => {
    var data = {
      confidence: response.data.face_data.confidence,
      status: response.data.face_data.status,
      responseDode: response.data.face_data.response_code,
    };
    api
      .post('/identity/face_verification', data)
      .then(res => {
        console.log(res);
        openNotificationWithIcon(res.data.message, `KYC Level 3 `, 'success');
        setMessage(res.data.message);
        // setStep(0)
        props.refetch();
      })
      .catch(error => {
        console.log(error);
        openNotificationWithIconErr(error.data.message, 'KYC Level 3', 'error');
        setMessage(error.data.message);
        // setStep(1)
        props.refetch();
      });
  };

  var _renderSteps = () => {
    switch (step) {
      case 0:
        return (
          <>
            {
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
                <Success
                  image={successnew}
                  title="Successful"
                  subtitle={message}
                  onClick={() => closeModal()}
                  button="Okay, Thank you."
                />
              </Modal>
            }
          </>
        );
      case 1:
        return (
          <Success
            image={errorsvg}
            type="error"
            title="Failed"
            subtitle={message}
            button="Try Again"
            onClick={() => setStep(2)}
          />
        );
      case 2:
        return (
          <div>
            {userData.kycLevel === 'Level2' &&
            userData.kycDocumentStatus === 'APPROVED' &&
            userData.passedKyc === false ? (
              <Accordion
                handleKyc={verifyWithIdentity}
                caretdown={kycfailed}
                caretup={kycfailed}
                title="Level 3 Verification"
                subtitle="Upload a Document"
                subtext={
                  'Upload the document you used for LEVEL 1 verification'
                }
                tinytext={'3'}
                number1={'Intl/Local Passport'}
                number2={'vNIN'}
                number3={'BVN'}
                number4={'Voter’s card'}
                children={
                  <>
                    <div className="side-inner">
                      <img src={circle} alt="" />
                      <li>
                        Instant Withdrawal and Transfer limits of ₦500,000
                        (Limit can be enhanced on request).
                      </li>
                    </div>
                    <div className="side-inner">
                      <img src={circle} alt="" />
                      <li>
                        Daily Withdrawal and Transfer limits of ₦3,000,000.
                      </li>
                    </div>
                    <div className="side-inner">
                      <img src={circle} alt="" />
                      <li>
                        Access to our virtual and Physical card offerings.
                      </li>
                    </div>
                    <div className="side-inner">
                      <img src={circle} alt="" />
                      <li>Access to our US Account Waitlisting offering.</li>
                    </div>
                  </>
                }
                image={kycbad}
                picture={kycfailed}
                buttontext={'Start L3 Verification Process'}
                color="#FDE7E8"
                topcolor="#C43138"
                bottomcolor="#C43138"
                leftcolor="#C43138"
                rightcolor="#C43138"
              />
            ) : (
              <Accordion
                check={
                  props.userdata.kycLevel === 'Level2' ||
                  (props.userdata.kycLevel === 'Level2' &&
                    props.userdata.kycDocumentStatus === 'APPROVED')
                    ? true
                    : false
                }
                caretup={caretup}
                caretdown={caretdown}
                handleKyc={verifyWithIdentity}
                title="Level 3 Verification"
                subtitle="Acceptable verification numbers"
                subtext={'You can select from our variety of documents options'}
                tinytext={'3'}
                number1={'International Passport Number'}
                number2={'vNIN'}
                number3={'Bank Verification Number'}
                number4={'Voter’s card Number'}
                children={
                  <>
                    <div className="side-inner">
                      <img src={circle} alt="" />
                      <li>
                        Instant Withdrawal and Transfer limits of ₦500,000
                        (Limit can be enhanced on request).
                      </li>
                    </div>
                    <div className="side-inner">
                      <img src={circle} alt="" />
                      <li>
                        Daily Withdrawal and Transfer limits of ₦3,000,000.
                      </li>
                    </div>
                    <div className="side-inner">
                      <img src={circle} alt="" />
                      <li>
                        Access to our virtual and Physical card offerings.
                      </li>
                    </div>
                    <div className="side-inner">
                      <img src={circle} alt="" />
                      <li>Access to our US Account Waitlisting offering.</li>
                    </div>
                  </>
                }
                image={verthree}
                buttontext={'Start L3 Verification Process'}
              />
            )}
          </div>
        );

      default:
        return <>default</>;
    }
  };

  useEffect(() => {
    setStep(2);
    // eslint-disable-next-line
  }, []);

  return <>{_renderSteps()}</>;
}

export default KycLv3;
