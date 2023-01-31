import React, { useState } from 'react';
import './accordion.scss';
import api from 'appRedux/api';
import verthree from '../../assets/verthree.svg';
import { Modal } from 'antd';
import Accordion from './accordion';
import caretup from '../../assets/caretup.svg';
import caretdown from '../../assets/caretdown.svg';
import useIdentityPayKYC from 'react-identity-kyc';
function KycLv3(props) {
  const [modal, showModal] = useState(false);

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
        <Kyc3
          onClick={closeModal}
          refetch={props.refetch}
          userdata={props.userdata}
        />
      </Modal>
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
        handleKyc={handleKyc}
        title="Level 3 Verification"
        subtitle="Acceptable verification numbers"
        subtext={'You can select from our variety of documents options'}
        tinytext={'3'}
        number1={'International Passport Number'}
        number2={'National Identity Number'}
        number3={'Bank Verification Number'}
        number4={'Voter’s card Number'}
        text1="Over ₦100k in daily withdrawals."
        text2="Access to over $10,000 monthly wires."
        text3="Access to our virtual card offerings."
        image={verthree}
        buttontext={'Start L3 Verification Process'}
      />
    </>
  );
}

export default KycLv3;

function Kyc3(props) {
  const config = {
    first_name: props.userdata.firstName,
    last_name: props.userdata.lastName,
    email: props.userdata.email,
    merchant_key: 'pgkzokikeysiqgsg9z6l:DWxhBDvohni5mTx919OPIjA-Fjw',
    user_ref: props.userdata.id,
    is_test: false, //set this to through for a test
    callback: response => {
      console.log(response);
      // console.log(response.data.face_data.confidence, response.data.face_data.status,response.data.face_data.response_code,response.data.face_data.message)
      SendData(response);
    },
    // callback: (response)=>alert("finished")
  };

  const verifyWithIdentity = useIdentityPayKYC(config);

  const SendData = response => {
    var data = {
      confidence: response.data.face_data.confidence,
      status: response.data.face_data.status,
      responseDode: response.data.face_data.response_code,
    };
    api.post('/identity/face_verification', data).then(resp => {
      console.log(resp);
    });
  };

  return <button onClick={verifyWithIdentity}>Click to Test</button>;
}
