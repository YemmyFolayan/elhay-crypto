import React, { useEffect, useState } from 'react';
import errorsvg from 'assets/error-2.svg';
import api from 'appRedux/api';
import { Comptransaction } from 'components/common/completetransaction/comptransaction';
import Inputfloat from 'components/common/inputs/inputfloat';
import { Shortinfo } from 'components/common/shortinfo/shortinfo';
import { Success } from 'components/common/success/success';
import { Titlesubtitle } from 'components/common/titlesubtitle/titlesubtitle';
import { Singleselect } from 'components/common/inputs/singleselect';
import {
  openNotificationWithIcon,
  openNotificationWithIconErr,
} from 'appRedux/actions/Common';
import './pof.scss';
import { saveAs } from 'file-saver';
import { Pofprompt } from './pofprompt';
// import { Backcontinue } from "components/common/backcontinue/backcontinue";

export const Proofofofund = props => {
  const [form, setForm] = useState({
    loanAmount: '',
    loanTenure: '',
    purpose: '',
    countryOfChoice: '',
    currency: 'NGN',
    pin: '',
  });

  const [step, setStep] = useState(1);
  // const [countries, setCountries] = useState('')
  const [btn, setButton] = useState('');
  const [message, setMessage] = useState('');

  var setInput = e => {
    var name = e.target.name;

    if (name === 'loanAmount') {
      var value = parseFloat(
        e.target.value
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          .replace(/,/g, ''),
      ).toLocaleString('en-US');
      e.target.validity.valid && setForm({ ...form, [name]: value });
    } else {
      setForm({ ...form, [name]: e.target.value });
    }
  };

  var setPin = value => {
    setForm({ ...form, pin: value });
  };
  var handleChange = value => {
    console.log(value);
    setForm({ ...form, countryOfChoice: value });
  };

  var pofApplication = e => {
    e.preventDefault();
    setButton('Requesting...');
    var url = `/proof-of-funds-application`;
    api
      .post(url, {
        loanAmount: form.loanAmount.replace(/,/g, '') * 100,
        loanTenure: form.loanTenure,
        purpose: form.purpose,
        countryOfChoice: form.countryOfChoice.value,
        currency: 'NGN_KOBO',
      })
      .then(res => {
        openNotificationWithIcon(res.data.message, 'Waitlisting', 'success');
        setMessage(res.data.message);
        props.setData(res.data.data);
        setButton('');
        setStep(3);
        props.refetch();
      })
      .catch(err => {
        setButton('');
        setMessage(err.data.message);
        openNotificationWithIconErr(
          'Waitlisting failed ',
          'Waitlisting',
          'error',
        );
        setStep(4);
      });
  };

  var payInterest = () => {
    setButton('Finalizing...');
    var url = `/deposit-pof-interest/${props.data.redemptionCode}/${props.data.interest}/NGN_KOBO`;

    api
      .post(url, { transactionPin: form.pin })
      .then(res => {
        openNotificationWithIcon(
          res.data.message,
          'Transaction Successful',
          'success',
        );
        setMessage(res.data.message);
        // props.setData(res.data.data)
        setButton('');
        setStep(5);
        saveFile();
      })
      .catch(err => {
        setButton('');
        setMessage(err.data.message);
        openNotificationWithIconErr(
          'Transaction failed ',
          'POF interest Payment',
          'error',
        );
        setStep(4);
      });
  };

  const saveFile = () => {
    setButton('Dowloading...');
    saveAs(
      'https://res.cloudinary.com/wevesti/raw/upload/v1651401205/lur8vpchxo6wphqwvvsl',
      'bankformvesti.pdf',
    );
    setButton('');
    props.refetch();
    // props.closePof()
  };

  useEffect(() => {
    setStep(props.step);
    // eslint-disable-next-line
  }, []);

  switch (step) {
    case 0:
      return <Pofprompt move={() => setStep(1)} />;
    case 1:
      return (
        <Pofform
          setForm={setForm}
          form={form}
          btn={btn}
          pofApplication={pofApplication}
          setInput={setInput}
          countries={props.countries}
          handleChange={handleChange}
        />
      );
    case 2:
      return (
        <Interestfee
          data={props.data}
          form={form}
          setPin={setPin}
          btn={btn}
          Finalize={payInterest}
        />
      );
    case 3:
      return (
        <Success
          title={
            message && message.includes('paid the interest')
              ? 'Transaction Successful'
              : 'Loan Request Approved'
          }
          subtitle={message}
          button={
            message && message.includes('paid the interest')
              ? 'Download Form'
              : 'Continue To Pay Interest'
          }
          onClick={() =>
            message && message.includes('paid the interest')
              ? setStep(2)
              : setStep(2)
          }
        />
      );
    case 4:
      return (
        <Success
          type="error"
          image={errorsvg}
          title={
            message &&
            (message.includes('insufficient') || message.includes('pin'))
              ? 'Transaction failed'
              : 'Loan Request failed'
          }
          subtitle={message}
          button={
            message && message.includes('insufficient')
              ? 'Try Again'
              : 'Try Again'
          }
          // eslint-disable-next-line
          onClick={() =>
            (message &&
              (message.includes('insufficient') || message.includes('pin'))) ||
            message.includes('interest deposit')
              ? setStep(2)
              : setStep(1)
          }
        />
      );
    case 5:
      return (
        <Success
          title={'Interest has been paid'}
          subtitle={
            message
              ? message
              : `You have paid for the interest ${
                  props.userData.isLoanFormUploaded
                    ? ' and you have uploaded the bankform, click the button below to close this modal'
                    : ', click the button below to download the form and fill'
                } `
          }
          button={
            btn
              ? btn
              : props.userData.isLoanFormUploaded
              ? 'okay, thanks'
              : 'Download Form'
          }
          onClick={() =>
            props.userData.isLoanFormUploaded ? props.closePof() : saveFile()
          }
        />
      );
    default:
      return <></>;
  }
};

const Pofform = props => {
  var percentage =
    parseFloat(
      props.form.loanAmount
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        .replace(/,/g, ''),
    ) > 10000000
      ? 3.8
      : 4;
  var interest = (
    (percentage / 100) *
    props.form.loanAmount
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      .replace(/,/g, '')
  ).toLocaleString('en-US');

  return (
    <div className="pofform">
      <Titlesubtitle
        steps="Step 1 of 2"
        title="Proof of fund loan"
        subtitle="Fill in the required information as displayed on a government issued ID"
      />
      <form className="pofform__form" onSubmit={e => props.pofApplication(e)}>
        <div className="pofform__form__tenure">
          <Inputfloat
            type="number"
            label="LOAN TENURE (MONTHS)"
            name="loanTenure"
            placeholder="Loan tenure e.g 5"
            value={props.form.loanTenure}
            disabled={false}
            onChange={props.setInput}
          />

          <Singleselect
            value={props.form.countryOfChoice}
            options={props.countries}
            onChange={props.handleChange}
          />
        </div>

        <Inputfloat
          type="text"
          inputmode="numeric"
          label="Amount Naira"
          name="loanAmount"
          placeholder="Enter Amount (NAIRA) YOU NEED"
          value={
            props.form.loanAmount === 'NaN'
              ? 0
              : props.form.loanAmount.toLocaleString('en-US')
          }
          disabled={false}
          onChange={props.setInput}
          // step="any"
          pattern="[0-9,.]*"
        >
          <Shortinfo subject="For fees above ₦10million, we offer 3.8% interest on loan, and for fees below 10million we offer 4% interest on loan." />
          {// eslint-disable-next-line
          props.form.loanAmount && props.form.loanAmount !== 'NaN' && (
            <p className="pofform__interest">
              {' '}
              {percentage +
                '% ' +
                ' of ₦' +
                props.form.loanAmount +
                ' ≈ ₦' +
                interest +
                '/Month'}{' '}
            </p>
          )}
        </Inputfloat>

        <Inputfloat
          type="text"
          label="LOAN PURPOSE"
          name="purpose"
          placeholder="Enter Loan Purpose"
          value={props.form.purpose}
          disabled={false}
          onChange={props.setInput}
        >
          {/* <Shortinfo
                        subject="You will be asked to show proof for this purpose in order to get this proof of fund loan."
                    /> */}
        </Inputfloat>
        {/* disabled={Object.values(props.form).every(value => !!value) ? props.btn ===''? false:true : true} */}
        <button
          className="pofform__form__button"
          disabled={
            Object.values(props.form)
              .slice(0, 5)
              .every(value => !!value)
              ? props.btn === ''
                ? false
                : true
              : true
          }
        >
          {props.btn === '' ? 'Request For Loan' : props.btn}
        </button>
      </form>
    </div>
  );
};

const Interestfee = props => {
  return (
    <div className="interestpayment">
      <Titlesubtitle
        steps="Step 2 of 2"
        title="Interest Payment"
        subtitle="Enter your transaction PIN to pay for your loan interest."
      />

      <div className="interestpayment__details">
        <span className="interestpayment__details__top">
          {' '}
          INTEREST ON{' '}
          <p>
            {' '}
            ₦
            {props.data.loanAmount
              ? parseFloat(props.data.loanAmount / 100).toLocaleString('en-US')
              : 0}{' '}
          </p>{' '}
          LOAN for {props.data.loanTenure} Month(s)
        </span>
        <p>
          {' '}
          ₦{' '}
          {props.data.interest
            ? (props.data.interest / 100).toLocaleString('en-US')
            : 0}
        </p>
        <p>
          You have to pay this interest within 72hrs or else, you will have to
          start the process all over and we might not approve the next time
        </p>
      </div>

      <Comptransaction
        setPin={props.setPin}
        goBack={() => props.setStep(3)}
        onFinish={props.Finalize}
        len={4}
        lower={true}
      >
        <button
          className="interestpayment__button"
          type="submit"
          style={{ marginTop: '30px' }}
          disabled={props.form.pin ? (props.btn === '' ? false : true) : true}
        >
          {props.btn !== '' ? props.btn : `Finalize Interest Payment`}
        </button>
      </Comptransaction>
    </div>
  );
};
