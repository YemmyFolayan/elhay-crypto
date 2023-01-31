import React, { useState } from 'react';
import './profilepop.scss';
import send from '../../assets/send.svg';
import api from 'appRedux/api';
import Loader from 'components/Loader';
import {
  openNotificationWithIcon,
  openNotificationWithIconErr,
} from 'appRedux/actions/Common';
import DividedPinInput from 'components/common/DividedPinInput';
import { Form } from 'antd';
import { errorMessage } from 'helpers/utils';
import { Success } from 'components/common/success/success';
export const Profilepop = props => {
  const [step, setStep] = useState(0);
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('');
  const [loading, setLoading] = useState('');
  const [send, setSend] = useState(false);
  const [transactionPin, setTransactionPin] = useState('');
  // return (
  //     <div className="profilepop-container">
  //         <div className="profilepop-inner">
  //             <div className="profilepop-inner top">
  //                 <img src={props.image} alt="profile picuter"/>
  //                 <div className="profile-top-content">
  //                     <div className="details">
  //                         <p>{props.name !== "undefined undefined" ? props.name : props.username}</p>
  //                         <p>{props.username ? '@'+props.username : props.email}</p>
  //                     </div>

  //                     <div className="socials">
  //                         <i class="fab fa-facebook-f"></i>
  //                         <i class="fab fa-instagram"></i>
  //                         <i class="fab fa-twitter"></i>
  //                         <i class="fas fa-comments"></i>
  //                     </div>
  //                 </div>
  //             </div>
  //             <div className="profilepop-inner bottom">
  //                 <div className="send-money">
  //                     <div className="send-money-inner">
  //                         <div className="send-money-left">
  //                             <p>Send money to <strong>{ props.username ? '@'+props.username : props.name}</strong> now </p>
  //                             <p>You can make other vesti users happy now </p>

  //                         </div>
  //                         <img src={send} alt="send funds"/>
  //                     </div>

  //                 </div>

  //                 <div className="recipient-bottom">
  //                     <div  className="recipient-input">
  //                         <span>
  //                         <select class="contentselect" id="contentselect" value={props.currency} onChange={(e) => props.handleCurrencyChange(e.target.value)}>
  //                             <option value="USD_CENTS">($) USD</option>
  //                             <option value="NGN_KOBO">(₦) NGN</option>
  //                         </select>
  //                         <input type="number" name = "amount" placeholder="Enter Amount" value={props.amount} onChange={ (e) => props.onAmountChange(e.target.value)}/>
  //                         </span>
  //                     </div>

  //                     <button className="recipient-btn" onClick={()=> props.setStep(1)}>
  //                         Proceed to Input Pin to send <i class="fas fa-arrow-right"></i>
  //                     </button>
  //             </div>
  //             </div>

  //             <div>

  //             </div>
  //         </div>
  //     </div>
  // )
  const sendCash = () => {
    setLoading(true);
    api
      .post('/wallet/transfer', {
        amount: amount * 100,
        currency: currency,
        userId: props.userId,
        transactionPin: transactionPin,
      })
      .then(res => {
        openNotificationWithIcon(
          `You have successfully sent ${amount} to ${
            props.name !== 'undefined undefined' ? props.name : props.username
          }`,
          'Transfer',
          'success',
        );

        setLoading(false);
        setStep(2);
      })
      .catch(err => {
        openNotificationWithIconErr(errorMessage(err), 'Transfer', 'error');
        setLoading(false);
      });
  };
  switch (step) {
    case 0:
      return (
        <Profile
          step={step}
          setStep={setStep}
          name={props.name}
          username={props.username}
          image={props.image}
          email={props.email}
          handleCurrencyChange={setCurrency}
          onAmountChange={setAmount}
          amount={amount}
          currency={currency}
          send={send}
          setSend={setSend}
        />
      );
    case 1:
      return (
        <Final
          name={props.name}
          handleCompleteTransaction={sendCash}
          amount={amount}
          currency={currency}
          step={step}
          username={props.username}
          setStep={setStep}
          loading={loading}
          transactionPin={transactionPin}
          setTransactionPin={setTransactionPin}
        />
      );
    case 2:
      return (
        <Success
          title="Transaction Successful"
          subtitle={` Your transfer of ${currency.slice(0, 3)} ${amount /
            1} to ${
            props.name !== 'undefined undefined' ? props.name : props.username
          } was successful.`}
          onClick={props.closeSuccess}
        />
      );
    default:
      return <>Not Found</>;
  }
};

const Profile = props => {
  return (
    <div className="profilepop-container">
      <div className="profilepop-inner">
        <div className="profilepop-inner top">
          <img src={props.image} alt="profile picuter" />
          <div className="profile-top-content">
            <div className="details">
              <p>
                {props.name !== 'undefined undefined'
                  ? props.name
                  : props.username}
              </p>
              <p>{props.username ? '@' + props.username : props.email}</p>
            </div>

            <div className="socials">
              <i class="fab fa-facebook-f"></i>
              <i class="fab fa-instagram"></i>
              <i class="fab fa-twitter"></i>
              <i class="fas fa-comments"></i>
            </div>
          </div>
        </div>
        <div className="profilepop-inner bottom">
          <div
            className="send-money"
            onClick={() => props.setSend(!props.send)}
          >
            <div className="send-money-inner">
              <div className="send-money-left">
                <p>
                  Send money to{' '}
                  <strong>
                    {props.username ? '@' + props.username : props.name}
                  </strong>{' '}
                  now{' '}
                </p>
                <p>You can make other vesti users happy now </p>
              </div>
              <img src={send} alt="send funds" />
            </div>
          </div>

          {props.send && (
            <div className="recipient-bottom">
              <div className="recipient-input">
                <span>
                  <select
                    class="contentselect"
                    id="contentselect"
                    value={props.currency}
                    onChange={e => props.handleCurrencyChange(e.target.value)}
                  >
                    <option value="USD_CENTS">($) USD</option>
                    <option value="NGN_KOBO">(₦) NGN</option>
                  </select>
                  <input
                    type="number"
                    name="amount"
                    placeholder="Enter Amount"
                    value={props.amount}
                    onChange={e => props.onAmountChange(e.target.value)}
                  />
                </span>
              </div>

              <button
                className="recipient-btn"
                onClick={() => props.setStep(1)}
              >
                Proceed to Input Pin to send <i class="fas fa-arrow-right"></i>
              </button>
            </div>
          )}
        </div>

        <div></div>
      </div>
    </div>
  );
};

const Final = props => {
  return (
    <Form
      onFinish={() => props.handleCompleteTransaction()}
      style={{ width: '100%' }}
      className="profile-send-form"
    >
      <div
        className="w-100 flex-fill pt-4 field-input"
        style={{ width: '100%' }}
      >
        <p>Enter Your Transaction PIN</p>
        <DividedPinInput onChange={props.setTransactionPin} />
      </div>
      {props.loading ? (
        <Loader />
      ) : (
        <div className="btn-container">
          <div
            type="submit"
            className="btn-left"
            onClick={() => {
              props.step <= 2
                ? props.setStep(0)
                : props.setStep(props.step - 1);
            }}
          >
            Back
          </div>
          <button type="submit" className="btn-right">
            Send {props.currency.slice(0, 3)}
            {props.amount} to{' '}
            {props.name !== 'undefined undefined'
              ? props.name
              : props.username.split(/\s+/)[0]}{' '}
            Now
          </button>
        </div>
      )}
    </Form>
  );
};
