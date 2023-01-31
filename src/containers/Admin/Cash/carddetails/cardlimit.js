import React, { useState } from 'react';
import Inputfloat from 'components/common/inputs/inputfloat';
import { Shortinfo } from 'components/common/shortinfo/shortinfo';
import { Success } from 'components/common/success/success';
import { Titlesubtitle } from 'components/common/titlesubtitle/titlesubtitle';
import api from 'appRedux/api';
import {
  openNotificationWithIcon,
  openNotificationWithIconErr,
} from 'appRedux/actions/Common';
import { errorMessage } from 'helpers/utils';
import { Backcontinue } from 'components/common/backcontinue/backcontinue';
import errorsvg from 'assets/error-2.svg';
import { Comptransaction } from 'components/common/completetransaction/comptransaction';
import './cardlimit.scss';
export const Cardlimit = props => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    limitAmount: '',
    cardId: props.cardId,
    cardPin: '',
  });
  const [message, setMessage] = useState('');
  const [btn, setBtn] = useState('');

  var updateLimit = () => {
    setBtn('Updating Limit...');
    var url =
      props.name === 'Apto'
        ? '/juice/setCardLimit'
        : props.name === 'Stripe'
        ? '/stripe/setCardLimit'
        : '/juice/setCardLimit';
    api
      .post(url, data)
      .then(res => {
        openNotificationWithIcon(
          res.data.message,
          'Card Limit Updated',
          'success',
        );
        setStep(3);
        setBtn('');
        setData({
          ...data,
          limitAmount: '',
          cardPin: '',
          cardId: '',
        });
      })
      .catch(error => {
        openNotificationWithIconErr(
          errorMessage(error),
          'Update Limit',
          'error',
        );
        setMessage(errorMessage(error));
        setBtn('');
        setStep(4);
      });
  };
  var setPin = value => {
    setData({ ...data, cardPin: value });
  };

  var setInput = e => {
    var name = e.target.name;
    var value = e.target.value;
    setData({ ...data, [name]: value });
  };
  switch (step) {
    case 1:
      return <Limit data={data} setStep={setStep} setInput={setInput} />;
    case 2:
      return (
        <>
          <Titlesubtitle
            steps="Step 2 of 2"
            title="Input Card PIN"
            subtitle="Enter your card transaction PIN to complete
                    this process."
          />

          <Comptransaction
            setPin={setPin}
            loading={props.loading}
            goBack={() => setStep(1)}
            onFinish={updateLimit}
            len={5}
            lower={true}
          >
            <Backcontinue text="Continue" goBack={() => setStep(1)}>
              <button
                className="backcontinue__continue"
                disabled={data.cardPin ? (btn === '' ? false : true) : true}
              >
                {btn !== '' ? btn : `Update Card Limit`}
              </button>
            </Backcontinue>
          </Comptransaction>
        </>
      );
    case 3:
      return (
        <Success
          title={`Succesful`}
          subtitle={`You successfully updated your Card spending limit.`}
          btn="Done, Thank You."
          onClick={props.closeModal}
        />
      );
    case 4:
      return (
        <Success
          image={errorsvg}
          button="Try Again"
          onClick={() => setStep(1)}
          title={`Fund Card Failed`}
          subtitle={message}
          type="error"
        />
      );
    default:
      return <></>;
  }
};

const Limit = props => {
  return (
    <div className="cardlimit">
      <Titlesubtitle
        steps="Step 1 of 2"
        title="Set Card Limit"
        subtitle="Fill in the fields below to increase / reduce your card
                limit."
      />
      <Inputfloat
        type="number"
        name="limitAmount"
        label="New Limit Amount"
        value={props.data.limitAmount}
        disabled={false}
        placeholder="Enter new limit amount"
        onChange={props.setInput}
      >
        <Shortinfo
          subject="Your Debit card spending limit should not be more than USD 10,000
                    or less than USD 5,000."
        />
      </Inputfloat>

      <button
        className="cardlimit__btn"
        disabled={props.data.limitAmount ? false : true}
        onClick={() => props.setStep(2)}
      >
        Continue
      </button>
    </div>
  );
};
