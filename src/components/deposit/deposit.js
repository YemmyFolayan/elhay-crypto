import React, { useState } from 'react';
import { Depositmodes } from './depositmodes';
// import { Currencyamount } from "components/currencyandamount/currencyamount";
import api from 'appRedux/api';
import { errorMessage, removeCommaAmount } from 'helpers/utils';
import {
  openNotificationWithIcon,
  openNotificationWithIconErr,
} from 'appRedux/actions/Common';
import { Referal } from 'components/referal/referal';
import { Titlesubtitle } from '../common/titlesubtitle/titlesubtitle';
// import Singleinputlabelcol from "components/common/inputs/singleinputlabelcol";
import Inputfloat from 'components/common/inputs/inputfloat';
import { Backcontinue } from 'components/common/backcontinue/backcontinue';
import { Platformbutton } from 'components/common/button/button';
import errorsvg from 'assets/error-2.svg';
import { Success } from 'components/common/success/success';
import { Amountinputcurrency } from 'components/common/inputs/amountinput';
import { useAmount } from 'helpers/hooks';
export const Depositwallet = props => {
  const [step, setStep] = useState(0);
  const { amount, handleAmount } = useAmount(0);
  const [state, setState] = useState({
    amount: '',
    description: '',
  });
  const [message, setMessage] = useState();
  const [option, setOption] = useState('');
  const setDepositOption = value => {
    // setOption(e.target.value)
    setOption(value);
  };
  var setPayToNgn = () => {
    setStep(1);
  };
  var depositProvidus = () => {
    setStep(2);
  };

  var setAmount = e => {
    // var name = e.target.name;
    var value = parseFloat(
      e.target.value
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        .replace(/,/g, ''),
    ).toLocaleString('en-US');
    e.target.validity.valid && setState({ ...state, amount: value });
  };

  var depositPaystack = () => {
    const url = option === 'Paystack' ? 'paystack/wallet/pay' : 'wallet/pay';
    const payload = {
      amount: removeCommaAmount(amount) * 100,
      currency: 'NGN_KOBO',
      redirectURL: 'https://google.com',
    };

    api
      .post(url, payload)
      .then(({ data }) => {
        openNotificationWithIcon(data.message, 'Deposit', 'success');

        setTimeout(() => {
          window.open(data.data.paymentURL, '_blank');
          props.cb();
        }, 1500);
      })
      .catch(error => {
        console.log('error', error.message);
        if (error.data) {
          openNotificationWithIconErr(errorMessage(error), 'Deposit', 'error');
        } else {
          openNotificationWithIconErr(errorMessage(error), 'Deposit', 'error');
        }
      });
  };
  var depositLink = () => {
    const payload = {
      amount: amount.replace(/,/g, '') * 100,
      // currency:'NGN_KOBO',
      description: state.description,
    };

    api
      .post('mono/direct-payment/payment', payload)
      .then(({ data }) => {
        openNotificationWithIcon(
          'Generated payment link',
          'Deposit',
          'success',
        );

        setTimeout(() => {
          window.open(data.payment_link, '_blank');
          props.cb();
        }, 500);
        setTimeout(() => {
          initReference();
        }, 120000);
      })
      .catch(error => {
        console.log('error', error.message);
        setMessage(error.data.message);
        if (error.data) {
          openNotificationWithIconErr(errorMessage(error), 'Deposit', 'error');
        } else {
          openNotificationWithIconErr(errorMessage(error), 'Deposit', 'error');
        }
      });
  };

  var initReference = () => {
    api
      .post('mono/direct-payment/verify')
      .then(({ data }) => {})
      .catch(() => {});
  };
  const myData = localStorage.getItem('userData');

  switch (step) {
    case 0:
      return (
        <>
          <Titlesubtitle
            steps={` Step 1`}
            // steps={` Step 1 of ${ props.currency === "NGN_KOBO" ? 3:2}`}
            title={`Add cash into your wallet`}
            subtitle="Enter the amount of cash you want to add."
          />
          <Amountinputcurrency
            type="text"
            currency="₦"
            name="amount"
            label="Amount"
            value={props.amount === 'NaN' ? 0 : amount.toLocaleString('en-US')}
            disabled={false}
            placeholder="Enter amount to add"
            onChange={handleAmount}
            pattern="[0-9,.]*"
          />
          {/* <Inputfloat
                        type="text"
                        name="amountCents"
                        label="Amount"
                        value={ state.amount ==='NaN' ? 0: state.amount.toLocaleString('en-US')}
                        disabled={false}
                        placeholder="Enter amount to deposit"
                        onChange={setAmount}
                        pattern="[0-9,.]*"
                        // error={parseInt(props.state.amount.replace(/,/g, '')) <= 500 && 'amount should not be less than 6'}
                    /> */}
          <span className="mt-4"></span>
          <Platformbutton
            name="Continue"
            type="normal"
            disabled={removeCommaAmount(amount) < 100 ? true : false}
            click={() => setPayToNgn()}
          />
          {/* <button className="depositoptions__btn" disabled={removeCommaAmount(amount) < 100 ? true : false} onClick={()=> setPayToNgn()}>
                        Continue to fund your NGN Wallet <i class="fas fa-arrow-right"></i>
                    </button> */}
        </>
      );

    case 1:
      return (
        <Depositmodes
          option={option}
          depositPaystack={depositPaystack}
          depositProvidus={depositProvidus}
          setDepositOption={setDepositOption}
          setStep={setStep}
          amount={amount}
          userData={props.userData}
        />
      );
    case 2:
      return (
        <Referal
          title={
            props.userData.providusAccountNumber &&
            props.userData.providusAccountNumber !== 'No Account'
              ? 'Copy Your Providus Account Number'
              : 'Click Button Below To Request for An Account number'
          }
          name="Account number"
          link={
            props.userData.providusAccountNumber &&
            props.userData.providusAccountNumber !== 'No Account'
              ? props.userData.providusAccountNumber
              : false
          }
        >
          {props.userData.providusAccountNumber &&
          props.userData.providusAccountNumber !== 'No Account' ? (
            <p className="referal__inner__extra">
              This is a <strong>PROVIDUS Bank</strong> account number, with
              account name{' '}
              <strong>
                {JSON.parse(myData).firstName +
                  ' ' +
                  JSON.parse(myData).lastName}
              </strong>
              , you can transfer money from any source to{' '}
              <strong> {props.userData.providusAccountNumber} </strong>, select{' '}
              <strong> PROVIDUS Bank </strong> as destination and{' '}
              <strong> FUNDS </strong>
              will be deposited into your <strong>vesti Wallet.</strong>
            </p>
          ) : (
            <>
              {' '}
              <span className="mb-4 mt-4"></span>{' '}
              <Platformbutton
                type="normal"
                name="Request for Account"
                click={() => props.request()}
              />{' '}
              <span className="mb-2"></span>
            </>
          )}
        </Referal>
      );
    case 4:
      return (
        <>
          <Titlesubtitle
            steps={` Step 3 of 3`}
            title={`Transaction Description`}
            subtitle="Select wallet and enter the amount you want to fund with."
          />
          <Inputfloat
            type="text"
            name="amountCents"
            label="Amount"
            value={
              state.amount === 'NaN' ? 0 : state.amount.toLocaleString('en-US')
            }
            disabled={false}
            placeholder="Enter amount to deposit"
            onChange={setAmount}
            pattern="[0-9,.]*"
            // error={parseInt(props.state.amount.replace(/,/g, '')) <= 500 && 'amount should not be less than 6'}
          />
          <span className="mt-2"></span>
          <Inputfloat
            type="text"
            label="DEPOSIT DESCRIPTION"
            name="description"
            placeholder="Enter transaction description"
            value={state.description}
            disabled={false}
            onChange={e => setState({ ...state, description: e.target.value })}
          />
          <span className="mt-4"></span>
          <Backcontinue goBack={() => setStep(1)}>
            <button
              className="depositoptions__btn"
              disabled={state.description ? false : true}
              onClick={() => depositLink()}
            >
              Initiate Deposit <i class="fas fa-arrow-right"></i>
            </button>
          </Backcontinue>
        </>
      );
    case 5:
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
      return <>Nothing dey sup for here </>;
  }
};

export const Providusaccount = props => {
  return (
    <Referal
      title={
        props.userData.providusAccountNumber &&
        props.userData.providusAccountNumber !== 'No Account'
          ? 'Copy Your Providus Account Number'
          : 'Click Button Below To Request for An Account number'
      }
      name="Account number"
      link={
        props.userData.providusAccountNumber &&
        props.userData.providusAccountNumber !== 'No Account'
          ? props.userData.providusAccountNumber
          : false
      }
    >
      {props.userData.providusAccountNumber &&
      props.userData.providusAccountNumber !== 'No Account' ? (
        <p className="referal__inner__extra">
          This is a <strong>PROVIDUS Bank</strong> account number, with account
          name{' '}
          <strong>
            {JSON.parse(props.myData).firstName +
              ' ' +
              JSON.parse(props.myData).lastName}
          </strong>
          , you can transfer money from any source to{' '}
          <strong> {props.userData.providusAccountNumber} </strong>, select{' '}
          <strong> PROVIDUS Bank </strong> as destination and{' '}
          <strong> FUNDS </strong>
          will be deposited into your <strong>vesti Wallet.</strong>
        </p>
      ) : (
        <>
          {' '}
          <span className="mb-4 mt-4"></span>{' '}
          <Platformbutton
            type="normal"
            name="Request for Account"
            click={() => props.request()}
          />{' '}
          <span className="mb-2"></span>
        </>
      )}
    </Referal>
  );
};
