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
import errorsvg from 'assets/error-2.svg';

export const Transfersila = props => {
  const [transfer, setTransfer] = useState({
    amount: '',
    destinationHandle: '',
  });
  const [step, setStep] = useState(0);
  const [disable, setDisable] = useState(false);
  const [message, setMessage] = useState('');
  var setInput = e => {
    var value = e.target.value;
    var name = e.target.name;
    setTransfer({ ...transfer, [name]: value });
  };
  var transferSila = () => {
    setDisable(true);
    api
      .post('sila/transfer_sila', {
        amount: transfer.amount * 1,
        destinationHandle: transfer.destinationHandle,
      })
      .then(res => {
        openNotificationWithIcon(res.data.message, 'Transfer', 'success');
        setStep(1);
        props.setRefresh('trans-refresh');
        setDisable(false);
      })
      .catch(error => {
        openNotificationWithIconErr(errorMessage(error), 'Transfer', 'error');
        setDisable(false);
        setMessage(error.data.data[1].message);
        setStep(2);

        //   cb && cb(2)
      });
  };

  switch (step) {
    case 0:
      return (
        <Transfer
          transfer={transfer}
          setInput={setInput}
          onClick={transferSila}
          disable={disable}
        />
      );
    case 1:
      return (
        <Prompt
          title="Transaction Succesful"
          subtitle={`You initiated a Transfer transaction on your wallet,  process usually takes about two business days to complete, your linked account would be settled..`}
          button="Okay, Thank You"
          onClick={() => props.close('transfer')}
        />
      );
    case 2:
      return (
        <Prompt
          image={errorsvg}
          title="Transfer Failed"
          type="error"
          subtitle={message}
          button="Okay, Try Again"
          onClick={() => setStep(0)}
        />
      );
    default:
      return <></>;
  }
};

const Transfer = props => {
  return (
    <div className="redeemsila">
      <Titlesubtitle
        title="Trasnfer From Wallet"
        subtitle="This starts Withdrawal transaction to your linked bank account; once that transaction has officially settled, a process that takes about two business days to complete, your linked account would be settled."
      />
      <div className="redeemsila__inputs">
        <Singleinputlabelcol
          type="number"
          label=""
          name="amount"
          placeholder="Enter Amount"
          value={props.transfer.amount}
          disabled={false}
          onChange={e => props.setInput(e)}
        />
        <Singleinputlabelcol
          type="text"
          label=""
          name="destinationHandle"
          placeholder="Enter Destination Handle"
          value={props.transfer.destinationHandle}
          disabled={false}
          onChange={e => props.setInput(e)}
        />
        <button
          className="redeemsila__inputs__btn"
          disabled={props.transfer.amount < 1 || props.disable ? true : false}
          onClick={() => props.onClick()}
        >
          Initiate Transfer
        </button>
      </div>
    </div>
  );
};
