import { Platformbutton } from 'components/common/button/button';
import { Phonenumberdef } from 'components/common/inputs/phoneinput';
import { Singleselect } from 'components/common/inputs/singleselect';
import { Success } from 'components/common/success/success';
import { accountType, holderType } from 'helpers/data';
import { useAmount, useStep } from 'helpers/hooks';
import Inputfloat from 'components/common/inputs/inputfloat';
import { StepTwoAddress } from './financialaccount';
import React, { useState } from 'react';
import './styles.scss';
import { Titlesubtitle } from 'components/common/titlesubtitle/titlesubtitle';
import { Newprompt } from 'components/common/prompt/prompt';
import vprompt from 'assets/pendingtrans.svg';
import errorsvg from 'assets/newerror.svg';
// import { Backcontinue } from "components/common/backcontinue/backcontinue";

export const Achdeposit = props => {
  const [state, setState] = useState({
    userId: props.id,
    // phone_number:props.phone,
    phone_number: '',
    routing_number: '',
    account_number: '',
    account_type: '',
    account_holder_type: '',
    billingAddressCity: '',
    billingAddressState: '',
    billingAddressLine1: '',
    billingAddressPostalCode: '',
  });
  // eslint-disable-next-line
  const { step, nextStep, setStep, previousStep } = useStep(0);

  var handleSelect = (name, value) => {
    setState({ ...state, [name]: value });
  };
  var callBack = value => {
    props.refetch();
    setStep(value);
  };
  var setInput = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  var __renderSteps = () => {
    switch (step) {
      case 0:
        return (
          <Stepone
            setState={setState}
            data={state}
            setInput={setInput}
            handleSelect={handleSelect}
            continue={nextStep}
            back={previousStep}
            goBack={props.goBack}
          />
        );
      case 1:
        return (
          <StepTwoAddress
            data={state}
            states={props.states}
            setInput={setInput}
            handleSelect={handleSelect}
            continue={() =>
              props.stripeAchOne(
                {
                  ...state,
                  amount: props.amount,
                  account_type: state.account_type.value,
                  account_holder_type: state.account_holder_type.value,
                  billingAddressState: state.billingAddressState.value,
                },
                callBack,
              )
            }
            back={previousStep}
            transLoading={props.transLoading}
          />
        );
      case 2:
        return (
          <Success
            title="Transaction Initiated"
            subtitle={props.transMessage}
            button="Okay, thank you"
            onClick={() => props.closeModal()}
          />
        );
      case 3:
        return (
          <Success
            image={errorsvg}
            title={`Failed`}
            subtitle={props.transMessage}
            onClick={() => setStep(0)}
            button="Try Again"
            type="error"
          />
        );
      default:
        return <></>;
    }
  };

  return (
    <>
      {step < 2 && (
        <Titlesubtitle
          steps={`Step ${step + 1} of 2`}
          title="Deposit via ACH"
          subtitle="fill in these fields to initiate a deposit"
        />
      )}
      {__renderSteps()}
    </>
  );
};

const Stepone = props => {
  var {
    routing_number,
    phone_number,
    account_number,
    account_type,
    account_holder_type,
  } = props.data;
  console.log(props.data);
  return (
    <div className="stepone">
      <div className="stepone__col">
        <span className="createstripe__phone">
          <Phonenumberdef
            value={props.data.phone_number}
            countries={['US']}
            default="US"
            setValue={value =>
              props.setState({ ...props.data, phone_number: value })
            }
          />
        </span>
        <Inputfloat
          type="number"
          name="routing_number"
          label="Routing Number"
          value={props.data.routing_number}
          disabled={false}
          placeholder="Routing Number"
          onChange={props.setInput}
        />
        <Inputfloat
          type="number"
          name="account_number"
          label="Account Number"
          value={props.data.account_number}
          disabled={false}
          placeholder="Account Number"
          onChange={props.setInput}
        />
        <div className="stepone__row">
          <Singleselect
            value={props.data.account_type}
            options={accountType}
            placeholder="Account Type"
            onChange={value => props.handleSelect('account_type', value)}
          />
          <Singleselect
            value={props.data.account_holder_type}
            options={holderType}
            placeholder="Account Holder Type"
            onChange={value => props.handleSelect('account_holder_type', value)}
          />
        </div>
      </div>
      <div className="stepone__btns">
        <Platformbutton
          name="Back"
          type="secondary"
          click={() => props.goBack()}
        />
        <Platformbutton
          name="Continue"
          type="normal"
          click={() => props.continue()}
          disabled={
            !phone_number ||
            !routing_number ||
            !account_number ||
            !account_type ||
            !account_holder_type
              ? true
              : false
          }
        />
      </div>
    </div>
  );
};

export const AchContinuation = props => {
  // eslint-disable-next-line
  const { step, nextStep, setStep, previousStep } = useStep(0);
  const { amount: lowAmount, handleAmount } = useAmount(0);
  const { amount: highAmount, handleAmount: handleHigh } = useAmount(0);

  var callBack = value => {
    props.refetch();
    setStep(value);
  };

  var __renderSteps = () => {
    switch (step) {
      case 0:
        return (
          <Newprompt img={vprompt}>
            <Titlesubtitle
              title="Pending Transaction"
              subtitle="You have a pending deposit to compelete, click the continue button to proceed to the next step."
            />
            <div className="stepone__btns">
              <Platformbutton
                name="Cancel Transaction"
                type="secondary"
                click={() => props.cancel()}
              />
              <Platformbutton
                name="Continue"
                type="normal"
                click={() => nextStep()}
              />
            </div>
          </Newprompt>
        );

      case 1:
        return (
          <div className="stepone">
            <div className="stepone__col">
              <Titlesubtitle
                title="Pending Deposit"
                subtitle="Fill these fields to complete Deposit transaction."
              />

              {/* <div className="mb-4"></div> */}
              <Inputfloat
                type="text"
                name="lowAmount"
                label="Low Amount"
                value={
                  lowAmount === 'NaN' ? 0 : lowAmount.toLocaleString('en-US')
                }
                disabled={false}
                placeholder="Enter amount to deposit"
                onChange={handleAmount}
                pattern="[0-9,.]*"
              />
              <Inputfloat
                type="text"
                name="highAmount"
                label="High Amount"
                value={
                  highAmount === 'NaN' ? 0 : highAmount.toLocaleString('en-US')
                }
                disabled={false}
                placeholder="Enter amount to deposit"
                onChange={handleHigh}
                pattern="[0-9,.]*"
              />
            </div>

            <div className="stepone__btns">
              <Platformbutton
                name="Go Back"
                type="secondary"
                click={() => props.cancel()}
              />
              <Platformbutton
                name="Finalize Deposit"
                type="normal"
                click={() =>
                  props.stripeAchFinal(
                    {
                      userId: props.id,
                      lowAmount: lowAmount,
                      highAmount: highAmount,
                    },
                    callBack,
                  )
                }
                disabled={
                  !lowAmount || !highAmount || props.transLoading === true
                    ? true
                    : false
                }
              />
            </div>
          </div>
        );
      case 2:
        return (
          <Success
            title="Transaction Initiated"
            subtitle={props.transMessage}
            button="Okay, thank you"
            onClick={() => props.closeModal()}
          />
        );
      case 3:
        return (
          <Success
            image={errorsvg}
            title={`Failed`}
            subtitle={props.transMessage}
            onClick={() => setStep(0)}
            button="Try Again"
            type="error"
          />
        );
      default:
        return <></>;
    }
  };

  return <>{__renderSteps()}</>;
};
