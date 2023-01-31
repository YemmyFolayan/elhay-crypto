import React, { useState } from 'react';
import Inputfloat from 'components/common/inputs/inputfloat';
import { Success } from 'components/common/success/success';
import { Titlesubtitle } from 'components/common/titlesubtitle/titlesubtitle';
import errorsvg from 'assets/error-2.svg';
import './bvnidentity.scss';
import api from 'appRedux/api';
import {
  openNotificationWithIcon,
  openNotificationWithIconErr,
} from 'appRedux/actions/Common';
import { useDispatch } from 'react-redux';
import { closeBvn } from 'appRedux/actions/domore';
export const Bvnverification = props => {
  const [bvnnumber, setNumber] = useState('');
  const [btn, setButton] = useState('');
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  var verifyBVN = () => {
    setButton('Verifying...');
    api
      .post('identity/bvn', { bvnNumber: bvnnumber })
      .then(res => {
        res.data.code === '00'
          ? openNotificationWithIcon(
              res.data.message,
              'BVN verification',
              'success',
            )
          : openNotificationWithIconErr(
              res.data.message,
              'BVN Verification',
              'error',
            );
        setMessage(res.data.message);
        setButton('');
        res.data.code === '00' ? setStep(2) : setStep(3);
      })
      .catch(err => {
        console.log(err);
        // var message = ''
        // for (var val in err.data.data.errors){
        //     console.log(err.data.data.errors[val][0])
        //     message += err.data.data.errors[val][0];
        // }
        setButton('');
        setMessage(err.data.message);
        openNotificationWithIconErr(
          'BVN Verification failed',
          'BVN Verification',
          'error',
        );
        setStep(3);
      });
  };

  var closeModal = () => {
    dispatch(closeBvn());
  };

  switch (step) {
    case 1:
      return (
        <Firststep
          bvnnumber={bvnnumber}
          setNumber={setNumber}
          verifyBVN={verifyBVN}
          setStep={setStep}
          step={step}
          btn={btn}
        />
      );
    case 2:
      return (
        <Success
          title="Verification Successful"
          subtitle={message}
          onClick={() => closeModal()}
        />
      );
    case 3:
      return (
        <Success
          image={errorsvg}
          type="error"
          title="BVN verification Failed"
          subtitle={message}
          button="Try Again"
          onClick={() => setStep(1)}
        />
      );
    default:
      return <></>;
  }
};

const Firststep = props => {
  return (
    <section className="waitlist__firststep">
      <Titlesubtitle
        steps={`Step 1 of 1`}
        title="Verify BVN"
        subtitle="If you are moving to the United States Soon, vesti is ready
                to help you get started"
      />

      <Inputfloat
        type="number"
        label="BANK VERIFICATION NUMBER"
        name="loanTenure"
        placeholder="What is your BVN ?"
        value={props.bvnnumber}
        disabled={false}
        onChange={e => props.setNumber(e.target.value)}
      />
      <button
        className="waitlist__firststep__button"
        disabled={
          props.bvnnumber.length === 11 ? (props.btn ? true : false) : true
        }
        onClick={() => props.verifyBVN()}
      >
        {props.btn ? props.btn : 'Verify BVN'}
      </button>
    </section>
  );
};
