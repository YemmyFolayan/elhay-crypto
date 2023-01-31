import React, { useEffect, useState } from 'react';
import { Platformbutton } from 'components/common/button/button';
import Inputfloat from 'components/common/inputs/inputfloat';
import { Singleselect } from 'components/common/inputs/singleselect';
import { accountType, holderType } from 'helpers/data';
import { useAmount, useStep } from 'helpers/hooks';
import './styles.scss';
import { Compeletetrans, Stepone, StepTwoAddress } from './financialaccount';
import { Titlesubtitle } from 'components/common/titlesubtitle/titlesubtitle';
import { Success } from 'components/common/success/success';
import errorsvg from 'assets/newerror.svg';
import { connect } from 'react-redux';
import { stripeWithdrawal } from 'appRedux/actions/transactions';
import { fetchAllStates } from 'appRedux/actions/Common';
import { removeCommaAmount } from 'helpers/utils';
import { Phonenumberdef } from 'components/common/inputs/phoneinput';

const FinancialWithdrawal = props => {
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
    transactionPin: '',
  });
  const { amount, handleAmount } = useAmount(0);
  const { step, nextStep, previousStep, setStep } = useStep(0);
  var handleSelect = (name, value) => {
    setState({ ...state, [name]: value });
  };

  var setInput = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  var callBack = value => {
    props.refetch();
    setStep(value);
  };
  var __renderSteps = () => {
    switch (step) {
      case 0:
        return (
          <Stepone
            balance={props.balance}
            type="Withdrawal"
            amount={amount}
            handleAmount={handleAmount}
            continue={nextStep}
          />
        );
      case 1:
        return (
          <Steptwo
            setState={setState}
            data={state}
            setInput={setInput}
            handleSelect={handleSelect}
            continue={nextStep}
            back={previousStep}
            goBack={props.goBack}
          />
        );
      case 2:
        return (
          <StepTwoAddress
            states={props.states}
            data={state}
            setInput={setInput}
            handleSelect={handleSelect}
            continue={nextStep}
            back={previousStep}
            transLoading={props.transLoading}
          />
        );
      case 3:
        return (
          <Compeletetrans
            handlePin={value => setState({ ...state, transactionPin: value })}
            data={{ amountCents: removeCommaAmount(amount), ...state }}
            loading={props.transLoading}
            finish={() =>
              props.stripeWithdrawal(
                {
                  amountCents: removeCommaAmount(amount) * 100,
                  ...state,
                  account_holder_type: state.account_holder_type.value,
                  billingAddressState: state.billingAddressState.value,
                  account_type: state.account_type.value,
                },
                callBack,
              )
            }
          />
        );
      case 4:
        return (
          <Success
            title="Successful"
            subtitle="Withdrawal was successfully initiated"
            button="Okay, thank you"
            onClick={() => props.closeModal()}
          />
        );
      case 5:
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

  useEffect(() => {
    props.fetchAllStates({ country: 'united states' });
    // eslint-disable-next-line
  }, []);
  return (
    <section className="financialaccount">
      {step < 3 && (
        <Titlesubtitle
          steps={`Step ${step + 1} of 3`}
          title="ACH Withdrawal"
          subtitle="Fill in these fields to intiate withdrawal"
        />
      )}
      <div className="mb-4"></div>
      {__renderSteps()}
    </section>
  );
};

const Steptwo = props => {
  var {
    phone_number,
    routing_number,
    account_number,
    account_type,
    account_holder_type,
  } = props.data;
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
          label="ACH Routing Number"
          value={props.data.routing_number}
          disabled={false}
          placeholder="ACH Routing Number"
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
          click={() => props.back()}
        />
        <Platformbutton
          name="Continue"
          type="normal"
          click={() => props.continue()}
          disabled={
            !routing_number ||
            !phone_number ||
            !account_number ||
            !account_type ||
            !account_holder_type ||
            props.transLoading === true
              ? true
              : false
          }
        />
      </div>
    </div>
  );
};

const mapStateToProps = ({ transactions, common }) => {
  const { transMessage, transLoading } = transactions;
  const { states } = common;
  return {
    transMessage,
    transLoading,
    states,
  };
};

const mapDispatchToProps = {
  stripeWithdrawal,
  fetchAllStates,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FinancialWithdrawal);
