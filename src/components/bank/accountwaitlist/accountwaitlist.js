import React, { useState } from 'react';
import { Backcontinue } from 'components/common/backcontinue/backcontinue';
import { Fileupload } from 'components/common/fileupload/fileupload';
import Singleinputlabelcol from 'components/common/inputs/singleinputlabelcol';
import { Singleselect } from 'components/common/inputs/singleselect';
import RadioButton from 'components/common/radiobutton/radiobutton';
import { Shortinfo } from 'components/common/shortinfo/shortinfo';
import { Success } from 'components/common/success/success';
import { Titlesubtitle } from 'components/common/titlesubtitle/titlesubtitle';
import errorsvg from 'assets/error-2.svg';
import './accountwaitlist.scss';
import api from 'appRedux/api';
import {
  openNotificationWithIcon,
  openNotificationWithIconErr,
} from 'appRedux/actions/Common';
import { useDispatch } from 'react-redux';
import { closeAccWait, openVirtual } from 'appRedux/actions/domore';
import useAnalyticsEventTracker from 'components/common/ganalytics/gaanalytics';
export const Accountwaitlist = props => {
  const [state, setState] = useState({
    location: '',
    kyc: '',
    kyc_number: '',
    address: '',
    docType: '',
    document: '',
    iDoc: '',
  });
  const [btn, setButton] = useState('');
  const [name, setName] = useState('');
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  var location = e => {
    var value = e.target.value;
    setState({ ...state, location: value });
  };

  var setRadioVisa = e => {
    var value = e.target.value;
    setState({ ...state, docType: value });
  };
  var kycType = value => {
    setState({ ...state, kyc: value });
  };
  var handleDoc = e => {
    // var value = e.target.files[0]
    let reader = new FileReader();
    reader.readAsDataURL(e.currentTarget.files[0]);
    reader.onload = function() {
      setState({ ...state, document: reader.result });
    };
    // setState({...state, document:e.target.files[0]})
    setName(e.target.files[0]);
  };
  const gaEventTracker = useAnalyticsEventTracker('US Waitlisting');

  var setInputs = e => {
    var name = e.target.name;
    var value = e.target.value;
    // console.log(e.target.files)

    setState({ ...state, [name]: value });
  };

  var submitApplication = () => {
    setButton('Submitting...');
    var url = state.kyc_number
      ? `/usaccount/waitlist/apply/US`
      : '/usaccount/waitlist/apply/NGN';
    var formData = new FormData();
    // state.kyc_number && formData.append( state.kyc.value.includes('SSN') ?'SSN': 'TIN', state.kyc_number)
    state.kyc_number !== '' &&
      formData.append(
        state.kyc.value.includes('SSN') ? 'SSN' : 'TIN',
        state.kyc_number,
      );
    state.kyc_number !== '' &&
      state.kyc.value.includes('SSN') &&
      formData.append('TIN', 'empty');
    state.kyc_number !== ''
      ? state.kyc.value.includes('TIN') && formData.append('SSN', 'empty')
      : (() => {})();
    formData.append('document', state.document);
    state.kyc_number && formData.append('address', state.address);

    // state.kyc_number === '' && formData.append('SSN', 'User Empty')
    // state.kyc_number === '' && formData.append('TIN', 'User Empty')
    // state.address === '' && formData.append('address', 'User Empty')

    api
      .post(url, formData)
      .then(res => {
        openNotificationWithIcon(
          'Waitlisting successful',
          'Waitlisting',
          'success',
        );
        setMessage(res.data.message);
        setButton('');
        gaEventTracker(
          'USA ACCOUNT Waitlisting',
          'User That are tyring to waitlist',
        );
        setStep(5);
      })
      .catch(err => {
        setButton('');
        console.log(err);
        var message = '';
        for (var val in err.data.data.errors) {
          console.log(err.data.data.errors[val][0]);
          message += err.data.data.errors[val][0];
        }
        setMessage(message);
        openNotificationWithIconErr(
          'Waitlisting failed',
          'Waitlisting',
          'error',
        );
        setStep(6);
      });
  };

  var submitApplicationNo = () => {
    setButton('Submitting...');
    var url = `/usaccount/waitlist/apply/US`;
    var formData = new FormData();

    formData.append('document', 'User does not have.');
    // state.kyc_number && formData.append('address', state.address);

    state.kyc_number === '' && formData.append('SSN', 'User Empty');
    state.kyc_number === '' && formData.append('TIN', 'User Empty');
    state.address === '' && formData.append('address', 'User Empty');

    api
      .post(url, formData)
      .then(res => {
        openNotificationWithIcon(res.data.message, 'Waitlisting', 'success');
        setMessage(res.data.message);
        setButton('');
        gaEventTracker(
          'USA ACCOUNT Waitlisting',
          'User That are tyring to waitlist',
        );
        setStep(5);
      })
      .catch(err => {
        console.log(err);
        var message = '';
        for (var val in err.data.data.errors) {
          console.log(err.data.data.errors[val][0]);
          message += err.data.data.errors[val][0];
        }
        setButton('');
        setMessage(message);
        openNotificationWithIconErr(
          'Waitlisting failed ',
          'Waitlisting',
          'error',
        );
        setStep(6);
      });
  };

  var closeModal = () => {
    dispatch(closeAccWait());

    setTimeout(() => {
      dispatch(openVirtual());
    }, 200);
  };

  switch (step) {
    case 1:
      return (
        <Firststep
          state={state}
          location={location}
          setStep={setStep}
          step={step}
        />
      );
    case 2:
      return (
        <Details
          state={state}
          location={location}
          setStep={setStep}
          step={step}
          setInputs={setInputs}
          kycType={kycType}
          submit={submitApplication}
          btn={btn}
        />
      );
    case 3:
      return (
        <Thirdstep
          state={state}
          setStep={setStep}
          step={step}
          setRadioVisa={setRadioVisa}
          submit={submitApplicationNo}
        />
      );
    case 4:
      return (
        <Uploaddocs
          state={state}
          setStep={setStep}
          step={step}
          setState={setState}
          handleDoc={handleDoc}
          name={name}
          setName={setName}
          submit={submitApplication}
          btn={btn}
        />
      );
    case 5:
      return (
        <Success
          title="Successfully Waitlisted"
          subtitle={message}
          onClick={() => props.closeModal(false)}
          secondBtn={() => closeModal()}
          secondBtntext={'Create Virtual Card'}
        />
      );
    case 6:
      return (
        <Success
          image={errorsvg}
          type="error"
          title="Waitlisting Failed"
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
        steps={`Step 1 of ${props.state.location.includes('Yes') ? 2 : 2}`}
        title="US Account Waitlist"
        subtitle="If you are moving to the United States Soon, vesti is ready
                to help you get started"
      />

      <div className="waitlist__firststep__bottom">
        <p className="waitlist__firststep__bottom__header">
          Are you in the United States
        </p>
        <div className="waitlist__firststep__bottom__radios">
          <RadioButton
            changed={props.location}
            id="1"
            isSelected={props.state.location === 'Yes, I’m in the states'}
            label="Yes, I’m in the states"
            sublabel="I’m already in the states"
            value="Yes, I’m in the states"
          />

          <RadioButton
            changed={props.location}
            id="2"
            isSelected={
              props.state.location === 'No, I’m not yet in the states'
            }
            label="No, I’m not yet in the states"
            sublabel="I’m not yet in the states"
            value="No, I’m not yet in the states"
          />
        </div>
      </div>
      <button
        className="waitlist__firststep__button"
        disabled={props.state.location ? false : true}
        onClick={() =>
          props.state.location.includes('Yes')
            ? props.setStep(2)
            : props.setStep(3)
        }
      >
        Continue
      </button>
    </section>
  );
};

const Details = props => {
  var options = [
    {
      value: 'SSN',
      label: 'SSN - Social Security Number',
    },
    {
      value: 'TIN',
      label: 'TIN - Tax Identification Number',
    },
  ];
  return (
    <section className="waitlist__details">
      <Titlesubtitle
        steps="Step 2 of 2"
        title="US Account Waitlist"
        subtitle="Get a US Bank account without monthly fees. Join the waitlist now."
      />
      <div className="waitlist__details__bottom">
        <Singleselect
          value={props.state.kyc}
          options={options}
          onChange={props.kycType}
          placeholder="Select your choice"
        />
        {props.state.kyc && (
          <>
            <Singleinputlabelcol
              type="text"
              name="kyc_number"
              value={`${props.state.kyc_number}`}
              disabled={false}
              placeholder={`Enter your ${props.state.kyc.value}`}
              onChange={props.setInputs}
            >
              <Shortinfo
                subject={`Note - Your ${props.state.kyc.value} will be subject to review for verifications.`}
              />
            </Singleinputlabelcol>

            <Singleinputlabelcol
              type="text"
              name="address"
              value={props.state.address}
              disabled={false}
              placeholder={`Enter your address`}
              onChange={props.setInputs}
            />
          </>
        )}
      </div>
      <Backcontinue
        text="Continue"
        goBack={() => props.setStep(1)}
        // continue = {goContinue}
      >
        <button
          className="backcontinue__continue"
          disabled={
            Object.values(props.state)
              .slice(1, 4)
              .every(value => !!value)
              ? props.btn === ''
                ? false
                : true
              : true
          }
          onClick={() => props.submit()}
        >
          {props.btn !== '' ? props.btn : 'Finalize & Submit'}
        </button>
      </Backcontinue>
    </section>
  );
};

const Thirdstep = props => {
  return (
    <section className="waitlist__thirdstep">
      <Titlesubtitle
        steps="Step 2 of 3"
        title="US Account Waitlist"
        subtitle="If you are moving to the United States Soon, vesti is ready
                to help you get started"
      />

      <div className="waitlist__thirdstep__bottom">
        <p className="waitlist__thirdstep__bottom__header">
          Do you have Student/Work visa ?
        </p>
        <div className="waitlist__thirdstep__bottom__radios">
          <RadioButton
            changed={props.setRadioVisa}
            id="1"
            isSelected={props.state.docType === 'Yes, I do'}
            label="Yes, I do"
            sublabel="Yes, I have a Valid United States Visa"
            value="Yes, I do"
          />

          <RadioButton
            changed={props.setRadioVisa}
            id="2"
            isSelected={props.state.docType === 'No, but I have either i10/i20'}
            label="No, but I have either i10/i20"
            sublabel="No, I do not have a Valid United States Visa, but I do have either i10/i20."
            value="No, but I have either i10/i20"
          />

          <RadioButton
            changed={props.setRadioVisa}
            id="3"
            isSelected={props.state.docType === 'No, I do not'}
            label="No, I do not"
            sublabel="No, I do not have a Valid United States Visa, an i10 or i20"
            value="No, I do not"
          />
        </div>
      </div>
      <Backcontinue
        text="Continue"
        goBack={() => props.setStep(1)}
        // continue = {goContinue}
      >
        <button
          className="backcontinue__continue"
          disabled={props.state.docType ? false : true}
          onClick={() =>
            props.state.docType.includes('Yes') ||
            props.state.docType.includes('No, but I have either i10/i20')
              ? props.setStep(4)
              : props.submit()
          }
        >
          Continue
        </button>
      </Backcontinue>
    </section>
  );
};

const Uploaddocs = props => {
  return (
    <section className="waitlist__uploaddocs">
      <Titlesubtitle
        steps="Step 3 of 3"
        title="US Account Waitlist"
        subtitle="Get a US Bank account without monthly fees. Join the waitlist now"
      />

      {props.state.docType.includes('Yes') ? (
        <div className="waitlist__uploaddocs__docs">
          <p>Upload your US Student/Work Visa page</p>
          <Fileupload
            id={1}
            value={props.name}
            name="visaDoc"
            setValue={props.handleDoc}
            remove={() => {
              props.setName('');
              props.setState({ ...props.state, document: '' });
            }}
          />
        </div>
      ) : (
        <div className="waitlist__uploaddocs__docs">
          <p>Upload either i-10 or i-20 doc</p>
          <Fileupload
            id={2}
            value={props.name}
            name="iDoc"
            setValue={props.handleDoc}
            remove={() => {
              props.setName('');
              props.setState({ ...props.state, document: '' });
            }}
          />
        </div>
      )}

      <Backcontinue
        text="Continue"
        goBack={() => props.setStep(3)}
        // continue = {goContinue}
      >
        <button
          className="backcontinue__continue"
          disabled={
            props.state.document ? (props.btn === '' ? false : true) : true
          }
          onClick={() => props.submit()}
        >
          {props.btn !== '' ? props.btn : 'Finalize & Submit'}
        </button>
      </Backcontinue>
    </section>
  );
};
