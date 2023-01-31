import React, { useState } from 'react';
import Singleinputlabelcol from 'components/common/inputs/singleinputlabelcol';
import { Success as Prompt } from 'components/common/success/success';
import { Titlesubtitle } from 'components/common/titlesubtitle/titlesubtitle';
import {
  openNotificationWithIcon,
  openNotificationWithIconErr,
} from 'appRedux/actions/Common';
import { errorMessage } from 'helpers/utils';
import './issuesila.scss';
import api from 'appRedux/api';
import errorsvg from 'assets/error-2.svg';
export const Issuesila = props => {
  const [amount, setAmount] = useState('');
  const [step, setStep] = useState(0);
  const [disable, setDisable] = useState(false);
  var issueSila = () => {
    setDisable(true);
    api
      .post('sila/issue_sila', { amount: amount * 1, accountName: props.name })
      .then(res => {
        console.log(res);
        openNotificationWithIcon(res.data.message, 'Deposit', 'success');
        setStep(1);
        props.setRefresh('no-refresh');
        setDisable(false);
      })
      .catch(error => {
        console.log(error);
        openNotificationWithIconErr(errorMessage(error), 'Deposit', 'error');
        setDisable(false);
        setStep(2);
        //   cb && cb(2)
      });
  };

  switch (step) {
    case 0:
      return (
        <Issue
          amount={amount}
          setAmount={setAmount}
          onClick={issueSila}
          disable={disable}
        />
      );
    case 1:
      return (
        <Prompt
          title="Deposit Succesful"
          subtitle={`You initiated a transaction on your wallet,  process usually takes about two business days to complete, the handle's blockchain address will be issued SILA tokens.`}
          button="Okay, Thank You"
          onClick={() => props.close('issue')}
        />
      );
    case 2:
      return (
        <Prompt
          image={errorsvg}
          title="Deposit Failed"
          type="error"
          subtitle={`Your proposed deposit transaction initiation failed.`}
          button="Okay, Try Again"
          onClick={() => setStep(1)}
        />
      );
    default:
      return <></>;
  }
};

const Issue = props => {
  return (
    <div className="issuesila">
      <Titlesubtitle
        title="Deposit To Wallet"
        subtitle="Starts an ACH Debit transaction your linked bank account; once that transaction has officially settled, a process that takes about two business days to complete, the handle's blockchain address will be issued SILA tokens"
      />
      <div className="issuesila__inputs">
        <Singleinputlabelcol
          type="number"
          label=""
          name="amount"
          placeholder="Enter Amount"
          value={props.amount}
          disabled={false}
          onChange={e => props.setAmount(e.target.value)}
        />
        <button
          className="issuesila__inputs__btn"
          disabled={props.amount < 1 || props.disable ? true : false}
          onClick={() => props.onClick()}
        >
          Fund Wallet Now!
        </button>
      </div>
    </div>
  );
};
