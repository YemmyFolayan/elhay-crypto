import React, { useEffect, useState } from 'react';
import { Singleselect } from 'components/common/inputs/singleselect';
import { Titlesubtitle } from 'components/common/titlesubtitle/titlesubtitle';
import { Backcontinue } from 'components/common/backcontinue/backcontinue';
import { Shortinfo } from 'components/common/shortinfo/shortinfo';
import ModernDatepicker from 'react-modern-datepicker';
import Input from 'react-phone-number-input/input';
import 'react-phone-number-input/style.css';
import './createapto.scss';
import Inputfloat from 'components/common/inputs/inputfloat';
import api from 'appRedux/api';
import {
  openNotificationWithIcon,
  openNotificationWithIconErr,
} from 'appRedux/actions/Common';
import { errorMessage } from 'helpers/utils';
import DividedPinInput from 'components/common/DividedPinInput';
import { Form } from 'antd';

export const Createapto = props => {
  const [step, setStep] = useState(1);
  const [process, setProcess] = useState({});
  const [btn, setButton] = useState(false);
  const [err, setErr] = useState();
  var nameOptionsUSA = [
    {
      label: 'My Family card',
      value: 'My Family card',
    },
    {
      label: 'My School card',
      value: 'My School card',
    },
    {
      label: 'My Pocket money card',
      value: 'My Pocket money card',
    },
    {
      label: 'My Tuition and Rent card',
      value: 'My Tuition and Rent card',
    },
  ];

  var setOtp = value => {
    props.setData({ ...props.data, otp: value });
  };

  const goBack = () => {
    step === 1 ? props.setStep(2) : setStep(1);
    setErr('');
  };

  const goContinue = e => {
    e.preventDefault();
    props.setStep(6);
  };
  const moveTwo = () => {
    setErr('');
    setStep(2);
  };

  var setInput = e => {
    var name = e.target.name;
    var value = e.target.value;
    props.setData({ ...props.data, [name]: value });
  };
  var startPhone = () => {
    setButton(true);
    api
      .post('apto/mobile/startPhoneVerificationMobile', {
        phoneNumber: props.data.phoneNumber.substring(2),
      })
      .then(res => {
        setProcess(res.data);
        console.log(res.data);
        setButton(false);
        openNotificationWithIcon(res.data.message, ' Phone Number', 'success');
        setErr('');
      })
      .catch(err => {
        openNotificationWithIconErr(
          errorMessage(err),
          ' Phone Number',
          'error',
        );
        setErr(errorMessage(err));
        setButton(false);
      });
  };
  var verifyPhone = () => {
    setErr('');
    setButton(true);
    api
      .post('apto/mobile/completePhoneVerificationMobile', {
        phoneNumber: props.data.phoneNumber.substring(2),
        otp: props.data.otp,
        phone_entity_id: process.phone_entity_id,
        date_of_birth: props.data.dob,
      })
      .then(res => {
        setProcess(res.data);
        openNotificationWithIcon(
          res.data.message,
          ' OTP Verification',
          'success',
        );
        setProcess(res.data);
        props.setData({
          ...props.data,
          dob_entity_id: res.data.dob_entity_id,
          phone_entity_id: res.data.phone_entity_id,
        });
        setButton(false);
        // setStep(3)
        setErr('');
        // setTimeout(()=> {
        //     verifyDob()
        // }, 100)
      })
      .catch(err => {
        openNotificationWithIconErr(
          errorMessage(err),
          ' OTP Verification',
          'error',
        );
        setButton(false);
        setErr(err.data.message);
      });
  };

  var verifyDob = () => {
    setButton(true);
    api
      .post('apto/mobile/completeDateOfBirthVerificationMobile', {
        date_of_birth: props.data.dob,
        dob_entity_id: props.data.dob_entity_id,
        phone_entity_id: process.phone_entity_id,
      })
      .then(res => {
        setProcess(res.data);
        setButton(false);
        openNotificationWithIcon(
          res.data.message,
          ' DOB Verification',
          'success',
        );
        props.setData({
          ...props.data,
          dob_entity_id: res.data.dob_entity_id,
          phone_entity_id: res.data.phone_entity_id,
        });
        setStep(3);
        setErr('');
      })
      .catch(err => {
        openNotificationWithIconErr(
          errorMessage(err),
          ' DOB Verification',
          'error',
        );
        setButton(false);
        setErr(err.data.message);
      });
  };

  var createFirst = () => {
    setButton(true);
    var data = {
      data_points: {
        type: 'list',
        data: [
          {
            data_type: 'phone',
            verified: true,
            verification: {
              type: 'verification',
              verification_type: 'phone',
              verification_mechanism: 'phone',
              verification_id: process.phone_entity_id,
              status: 'passed',
            },
            not_specified: true,
            country_code: '1',
            phone_number: props.data.phoneNumber.substring(2),
          },
          {
            type: 'birthdate',
            date: props.data.dob,
          },
          {
            type: 'email',
            email: props.userdata.email,
          },
          {
            type: 'name',
            first_name: props.userdata.firstName,
            last_name: props.userdata.lastName,
          },
          {
            type: 'address',
            street_one: props.data.billingAddress,
            street_two: ' ',
            locality: props.data.city,
            region: props.data.state.value,
            postal_code: props.data.postalCode,
            country: 'USA',
          },
        ],
      },
    };
    api
      .post('apto/mobile/createMobileAPiCardHolderSigned', data)
      .then(res => {
        setButton(false);
        props.setStep(6);
      })
      .catch(err => {
        setButton(false);
        // setErr(err.data.message)
      });
  };

  useEffect(() => {
    props.data.dob_entity_id !== '' ? verifyDob() : console.log('');
    // console.log('')
    // eslint-disable-next-line
  }, [props.data.dob_entity_id]);
  switch (step) {
    case 1:
      return (
        <Phonenumber
          setInput={setInput}
          data={props.data}
          goBack={goBack}
          goContinue={goContinue}
          setStep={setStep}
          setData={props.setData}
          process={process}
          btn={btn}
          setOtp={setOtp}
          startPhone={startPhone}
          verifyPhone={verifyPhone}
          err={err}
          setErr={setErr}
          moveTwo={moveTwo}
        />
      );
    case 2:
      return (
        <Dob
          setInput={setInput}
          setStep={setStep}
          data={props.data}
          goContinue={goContinue}
          btn={btn}
          setData={props.setData}
          verifyDob={verifyPhone}
          err={err}
          setErr={setErr}
        />
      );
    case 3:
      return (
        <Finalize
          setInput={setInput}
          nameOptionsUSA={nameOptionsUSA}
          data={props.data}
          setData={props.setData}
          states={props.states}
          createCard={props.create}
          setStep={setStep}
          set={props.setStep}
          create={createFirst}
          err={err}
          btn={btn}
        />
      );
    default:
      return <></>;
  }
};

const Phonenumber = props => {
  return (
    <div className="createapto" style={{ width: '100%' }}>
      <Titlesubtitle
        steps="Step 2 of 5"
        title={
          props.process.data && props.process.data.verification_type === 'phone'
            ? 'Verify OTP'
            : 'Verify Phone Number'
        }
        subtitle={
          props.process.data && props.process.data.verification_type === 'phone'
            ? ` Enter OTP sent to ${props.data.phoneNumber}`
            : 'Enter your active phone number'
        }
      />

      <Input
        className="my-input-class"
        inputClass="my-input-class"
        placeholder="Enter US Phone Number"
        country="US"
        value={props.data.phoneNumber}
        onChange={phone => props.setData({ ...props.data, phoneNumber: phone })}
      />
      {props.process.phone_entity_id ? (
        <Otp data={props.data} setOtp={props.setOtp} />
      ) : (
        <></>
      )}
      {props.err && (
        <p className={`createapto ${props.err ? ' --error' : ''}`}>
          {props.err}
        </p>
      )}
      <Backcontinue text="Confirm and  Continue" goBack={props.goBack}>
        {props.process.data &&
        props.process.data.verification_type === 'phone' ? (
          <button
            className="backcontinue__continue"
            disabled={props.data.otp ? (props.btn ? true : false) : true}
            onClick={e => props.moveTwo()}
          >
            {' '}
            Verify OTP
          </button>
        ) : (
          <button
            className="backcontinue__continue"
            disabled={
              props.data.phoneNumber ? (props.btn ? true : false) : true
            }
            onClick={e => props.startPhone()}
          >
            {' '}
            Verify Phone number
          </button>
        )}
      </Backcontinue>
    </div>
  );
};

const Dob = props => {
  return (
    <div className="createapto" style={{ width: '100%' }}>
      <Titlesubtitle
        steps="Step 3 of 5"
        title="Verify Date of Birth"
        subtitle="Enter your Date of Birth in YYYY-MM-DD format."
      />
      <div style={{ position: 'relative', zIndex: '99998', width: '100%' }}>
        <ModernDatepicker
          date={new Date(props.data.dob)}
          className="dob"
          format={'YYYY-MM-DD'}
          showBorder
          onChange={date =>
            props.setData({
              ...props.data,
              dob: new Date(date).toISOString().slice(0, 10),
            })
          }
          placeholder={'Select your date of birth'}
          primaryColor={'#000000'}
        />
      </div>

      {props.err && (
        <p className={`createapto ${props.err ? ' --error' : ''}`}>
          {props.err}
        </p>
      )}
      <Backcontinue
        text="Confirm and  Continue"
        goBack={() => {
          props.setErr('');
          props.setStep(1);
        }}
      >
        <button
          className="backcontinue__continue"
          disabled={props.data.dob ? (props.btn ? true : false) : true}
          onClick={() => props.verifyDob()}
        >
          {props.err ? 'Try Again' : 'Continue Create Card'}
        </button>
      </Backcontinue>
    </div>
  );
};
const Finalize = props => {
  return (
    <div className="createapto" style={{ width: '100%' }}>
      <Titlesubtitle
        steps="Step 4 of 5"
        title="Black Dollar "
        subtitle="Easily create virtual cards to cater for your needs."
      />
      <Singleselect
        value={props.data.cardName}
        options={props.nameOptionsUSA}
        onChange={value => props.setData({ ...props.data, cardName: value })}
        placeholder="Select Card Name"
      />
      <Singleselect
        value={props.data.state}
        options={props.states}
        onChange={value => props.setData({ ...props.data, state: value })}
        placeholder="Select States"
      />

      <div className="createapto__location">
        <Inputfloat
          type="text"
          label="City"
          name="city"
          placeholder="Enter Your City"
          value={props.data.city}
          disabled={false}
          onChange={props.setInput}
        />

        <Inputfloat
          type="number"
          label="Postal Code"
          name="postalCode"
          placeholder="Postal Code"
          value={props.data.postalCode}
          disabled={false}
          onChange={props.setInput}
        />
      </div>

      <Inputfloat
        type="text"
        label="Billing Address"
        name="billingAddress"
        placeholder="Enter Your Home Address"
        value={props.data.billingAddress}
        disabled={false}
        onChange={props.setInput}
      >
        <p className="apto-error">
          {props.data.billingAddress.split(' ').length > 3
            ? 'This is more than the format provided'
            : ' '}
        </p>
        <Shortinfo subject="E.g 504 Ammonite Ct " />
      </Inputfloat>
      {props.err && (
        <p className={`createapto ${props.err ? ' --error' : ''}`}>
          {props.err}
        </p>
      )}
      <Backcontinue
        text="Confirm and  Continue"
        goBack={() => props.setStep(2)}
      >
        {/* disabled={Object.values(props.data).slice(0,10).every(value => !!value) && props.data.billingAddress.split(' ').length <= 3 ?  false : true     }  */}
        <button
          className="backcontinue__continue"
          disabled={
            Object.values(props.data)
              .slice(0, 13)
              .every(value => !!value) &&
            props.data.billingAddress.split(' ').length <= 3
              ? props.btn
                ? true
                : false
              : true
          }
          onClick={() => props.create()}
        >
          Continue To Set PIN
        </button>
      </Backcontinue>
    </div>
  );
};

const Otp = props => {
  return (
    <div className="createapto">
      <Form style={{ width: '100%' }}>
        <div className="w-100 flex-fill pt-4" style={{ width: '100%' }}>
          <p>Enter OTP sent to {props.data.phoneNumber}</p>
          <DividedPinInput onChange={props.setOtp} len={6} />
        </div>
      </Form>
    </div>
  );
};
