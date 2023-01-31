import React from 'react';
import './transfercash.scss';
import DividedPinInput from 'components/common/DividedPinInput';
import { Form } from 'antd';
import Loader from 'components/Loader';
import { connect } from 'react-redux';
import { Success } from '../common/success/success.js';
import { useDispatch } from 'react-redux';
import { SUCCESSFUL_TRANSACTION } from 'appRedux/constants';
import { Currencyamount } from 'components/currencyandamount/currencyamount';
import Error from '../../assets/newerror.svg';
import { Transreview } from 'components/common/transactionreview/review';
import { Titlesubtitle } from 'components/common/titlesubtitle/titlesubtitle';
const Transfercash = props => {
  const dispatch = useDispatch();
  const setStep = value => {
    dispatch({ type: SUCCESSFUL_TRANSACTION, payload: value });
  };

  const closeSuccess = () => {
    props.closeModal();
    dispatch({ type: SUCCESSFUL_TRANSACTION, payload: 0 });
    setStep(0);
  };
  const closeError = () => {
    dispatch({ type: SUCCESSFUL_TRANSACTION, payload: 0 });
  };
  switch (props.step) {
    case 0:
      return (
        <>
          <Titlesubtitle
            title={`Recipent • ${props.currentUser.firstName +
              ' ' +
              props.currentUser.lastName}`}
            subtitle="Confirm recipient details and send funds to recipient."
          />
          <Recipient
            setStep={setStep}
            step={props.step}
            firstname={props.currentUser.firstName}
            lastname={props.currentUser.lastName}
            username={props.currentUser.username}
            profile={props.image}
            number={props.currentUser.phoneNumber}
            email={props.currentUser.email}
            amount={props.amount}
            currency={props.currency}
            onAmountChange={props.onAmountChange}
            handleCurrencyChange={props.handleCurrencyChange}
          />
        </>
      );
    case 1:
      return (
        <Finalize
          setStep={setStep}
          step={props.step}
          handleTransferCash={props.handleTransferCash}
          setTransactionpin={props.setTransactionpin}
          amount={props.amount}
          currency={props.currency}
          currentUser={props.currentUser}
        />
      );
    case 2:
      return (
        <Success
          title="Transaction Successful"
          button="Okay, Thank You!!!"
          subtitle={` Your transfer of ${props.currency.slice(
            0,
            3,
          )} ${props.amount.toLocaleString('en-us')}  to ${
            props.currentUser.firstName
          } ${props.currentUser.lastName} was successful.`}
          onClick={() => closeSuccess()}
        />
      );
    case 3:
      return (
        <Success
          image={Error}
          type="error"
          button="Let Me Try Again"
          title="Transaction Failed"
          subtitle={` Your transfer of ${props.currency.slice(
            0,
            3,
          )} ${props.amount.toLocaleString('en-us')} to ${
            props.currentUser.firstName
          } ${props.currentUser.lastName} failed, ${props.transMessage}.`}
          onClick={closeError}
        />
      );
    default:
      return <>Not Found {props.step}</>;
  }
};

const Recipient = props => {
  var nextStep = () => {
    props.setStep(1);
  };
  return (
    <div className="recipient-container">
      <div className="recipient-inner-container">
        <img src={props.profile} alt="recipient profile" />

        <div className="recipient-content">
          <p>
            {props.firstname} {props.lastname}
          </p>
          <p>{props.email}</p>
          {props.username && (
            <p>
              @{props.username} • {props.number}
            </p>
          )}
        </div>

        <Currencyamount
          handleCurrencyChange={props.handleCurrencyChange}
          onAmountChange={props.onAmountChange}
          amount={props.amount}
          currency={props.currency}
          btn="Proceed to Input Pin to send"
          onClick={nextStep}
        />
        {/* <div className="recipient-bottom">
                    <div  className="recipient-input">
                        <span>
                        <select class="contentselect" id="contentselect" value={props.currency} onChange={(e) => props.handleCurrencyChange(e.target.value)}>
                            <option value="USD_CENTS">($) USD</option>
                            <option value="NGN_KOBO">(₦) NGN</option>
                        </select>
                        <input type="number" name = "amount" placeholder="Enter Amount" value={props.amount} onChange={ (e) => props.onAmountChange(e.target.value)}/>
                        </span>
                    </div>

                    
                    <button className="recipient-btn" onClick={()=> props.setStep(1)}>
                        Proceed to Input Pin to send <i class="fas fa-arrow-right"></i>
                    </button>
                </div> */}
      </div>
    </div>
  );
};

const Finalize = props => {
  return (
    <Form onFinish={props.handleTransferCash} style={{ width: '100%' }}>
      {/* <Smallbox
                amount={props.amount}
                currency={props.currency}
                currentUser={props.currentUser}
            /> */}
      <Transreview
        data={[
          { title: 'Transaction Type', value: 'Transfer' },
          {
            title: 'Amount',
            value: `${props.currency.slice(0, 3)} ${props.amount.toLocaleString(
              'en-US',
            )}`,
          },
          { title: 'Fee', value: `0.00` },
          { title: 'Currency', value: props.currency ? 'NGN' : 'USD' },
          {
            title: 'User Fullname',
            value: `${props.currentUser.firstName} ${props.currentUser.lastName}`,
          },
        ]}
      />
      <div className="w-100 flex-fill pt-4" style={{ width: '100%' }}>
        <p>Enter Your Transaction PIN</p>
        <DividedPinInput onChange={props.setTransactionpin} />
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
            Finalize Transfer
          </button>
        </div>
      )}
    </Form>
  );
};

// eslint-disable-next-line
const Smallbox = props => {
  return (
    <div className="smallbox-container">
      <div className="smallbox-inner-container">
        <p>
          You are about to transfer the sum of
          <strong>
            {' '}
            {props.currency.slice(0, 3)}{' '}
            {(props.amount / 1)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
          </strong>
          to{' '}
          <strong>
            {' '}
            {props.currentUser.firstName} {props.currentUser.lastName}{' '}
          </strong>
          kindly input your<strong> Pin </strong> to conclude the transaction.
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = ({ transactions }) => {
  const { step, transMessage } = transactions;
  return {
    step,
    transMessage,
  };
};
export default connect(mapStateToProps)(Transfercash);
