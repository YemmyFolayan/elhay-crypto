import React, { useState } from 'react';
import Singleinputlabelcol from 'components/common/inputs/singleinputlabelcol';
import { Success as Prompt } from 'components/common/success/success';
import { Titlesubtitle } from 'components/common/titlesubtitle/titlesubtitle';
import {
  openNotificationWithIcon,
  openNotificationWithIconErr,
} from 'appRedux/actions/Common';
import { errorMessage } from 'helpers/utils';
import './redeemsila.scss';
import api from 'appRedux/api';
// import errorsvg from "assets/error-2.svg"
export const Redeemsila = props => {
  const [redeem, setRedeem] = useState({
    amount: '',
    description: '',
  });
  const [step, setStep] = useState(0);
  const [disable, setDisable] = useState(false);

  var setInput = e => {
    var value = e.target.value;
    var name = e.target.name;
    setRedeem({ ...redeem, [name]: value });
  };
  var redeemSila = () => {
    setDisable(true);
    api
      .post('sila/redeem_sila', {
        amount: redeem.amount * 1,
        accountName: props.name,
      })
      .then(res => {
        openNotificationWithIcon(res.data.message, 'Withdrawal', 'success');
        setStep(1);
        props.setRefresh('n-refresh');
        setDisable(false);
      })
      .catch(error => {
        openNotificationWithIconErr(errorMessage(error), 'Withdrawal', 'error');
        setDisable(false);
        //   cb && cb(2)
      });
  };

  switch (step) {
    case 0:
      return (
        <Redeem
          redeem={redeem}
          setInput={setInput}
          onClick={redeemSila}
          disable={disable}
        />
      );
    case 1:
      return (
        <Prompt
          title="Transaction Succesful"
          subtitle={`You initiated a withdrawal transaction on your wallet,  process usually takes about two business days to complete, your linked account would be settled..`}
          button="Okay, Thank You"
          onClick={() => props.close('redeem')}
        />
      );
    default:
      return <></>;
  }
};

const Redeem = props => {
  return (
    <div className="redeemsila">
      <Titlesubtitle
        title="Withdraw From Wallet"
        subtitle="This starts Withdrawal transaction to your linked bank account; once that transaction has officially settled, a process that takes about two business days to complete, your linked account would be settled."
      />
      <div className="redeemsila__inputs">
        <Singleinputlabelcol
          type="number"
          label=""
          name="amount"
          placeholder="Enter Amount"
          value={props.redeem.amount}
          disabled={false}
          onChange={e => props.setInput(e)}
        />
        <Singleinputlabelcol
          type="text"
          label=""
          name="description"
          placeholder="Enter Description"
          value={props.redeem.description}
          disabled={false}
          onChange={e => props.setInput(e)}
        />
        <button
          className="redeemsila__inputs__btn"
          disabled={props.redeem.amount < 1 || props.disable ? true : false}
          onClick={() => props.onClick()}
        >
          Initiate Withdrawal
        </button>
      </div>
    </div>
  );
};
