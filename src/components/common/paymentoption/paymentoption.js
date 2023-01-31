import React, { useEffect } from 'react';
import './paymentoption.scss';
import { RadioOption } from '../radiobutton/radiobutton';
import { useState } from 'react';
import { Form } from 'antd';
import { getCurrency, getCurrencyName, removeCommaAmount } from 'helpers/utils';
import { Comptransaction } from '../completetransaction/comptransaction';
import { Titlesubtitle } from '../titlesubtitle/titlesubtitle';
import { Smallbox } from '../smallbox/smallbox';
import { vestireward } from '../vestireward/vestireward';
import { Singleselect } from '../inputs/singleselect';
import { Platformbutton } from '../button/button';
import { Amountinputcurrency } from '../inputs/amountinput';
import { useAmount } from 'helpers/hooks';
import { Equivalence } from 'components/bank/equivalence';
import { Success } from '../success/success';
import errorsvg from 'assets/newerror.svg';
import { radio_card, radio_ngn } from 'assets/assets';

export const Paymentoption = props => {
  const [option, setOption] = useState('Wallet');
  // eslint-disable-next-line
  const [payData, setPay] = useState({});
  const [step, setStep] = useState(1);
  // eslint-disable-next-line
  const [currency, setCurrency] = useState();
  // eslint-disable-next-line
  const { amount, handleAmount } = useAmount(0);
  const setPaymentOption = value => {
    setOption(value);
  };

  const paystackPay = e => {
    e.preventDefault();
    // const url = '/merchant/payforServiceWithCard';
    var amt = props.amount.ngn
      ? parseFloat(props.amount.ngn.replace(/,/g, '')) * 100
      : props.amount * 100;
    const payload = {
      // amount:props.formData.type.includes('WES')? (removeCommaAmount(amount)*currency.rate) * 100 :  amt,
      amount: amt,
      service: props.formData.type,
      currency: 'NGN_KOBO',
      redirectURL: '',
    };
    props.viaCard(payload, props.closeModal());
  };

  var goBack = () => {
    step <= 2 ? setStep(0) : setStep(step - 1);
  };
  var finalizeTransaction = () => {
    props.handleCompleteTransaction(setStep);
  };

  useEffect(() => {
    // props.formData.type.includes('WES') ? setStep(0):setStep(1)
    // eslint-disable-next-line
  }, []);
  switch (step) {
    // case 0:
    //     return <Wespay
    //         continue ={()=> setStep(1)}
    //         amount={amount}
    //         handleAmount={handleAmount}
    //         setCurrency={setCurrency}
    //         currency={currency}
    //         rate={props.rate}
    //     />
    case 1:
      return (
        <Mode
          option={option}
          setPaymentOption={setPaymentOption}
          payData={payData}
          setStep={setStep}
          formData={props.formData}
          paystackPay={paystackPay}
          current={props.current}
          setCurrent={props.setCurrent}
          toWholeCurrency={props.toWholeCurrency}
          step={step}
          rate={props.rate}
        />
      );
    case 2:
      return (
        <CustomPay
          handleCompleteTransaction={props.handleCompleteTransaction}
          school={props.school}
          fee={props.fee}
          setCustom={props.setCustom}
          setSchool={props.setSchool}
          setPassport={props.setPassport}
          passport={props.passport}
          option={option}
          setStep={setStep}
          step={step}
          setCurrent={props.setCurrent}
          loading={props.loading}
          formData={props.formData}
        />
      );
    case 3:
      return (
        <>
          <Titlesubtitle
            title={`Enter your NetWebPay Transaction PIN • 2 of  ${
              props.formData.type === 'applicationsFees' ||
              props.formData.type === 'TuitionAcceptanceFees'
                ? 3
                : 2
            }`}
            subtitle="Enter your NetWebPay transaction PIN to finalize this transaction"
          />
          <Smallbox>
            <p>
              You are about to pay for a{' '}
              <strong> {props.formData.type} </strong> with a cost of{' '}
              <strong>
                {' '}
                ₦
                {props.amount.ngn
                  ? props.amount.ngn
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  : props.fee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </strong>{' '}
              , enter your NetWebPay transaction PIN to finalize.
            </p>
          </Smallbox>

          <Comptransaction
            setPin={props.setTransactionPin}
            loading={props.loader}
            goBack={() => goBack()}
            btn="Initiate Payment"
            onFinish={finalizeTransaction}
            len={4}
          />
        </>
      );
    case 4:
      return (
        <Success
          title={`Merchant Payment`}
          subtitle={props.message}
          button="Okay, Thank You!"
          onClick={() => setStep(6)}
        />
      );
    case 5:
      return (
        <Success
          image={errorsvg}
          title={props.formData.type}
          subtitle={props.message}
          onClick={() => setStep(0)}
          button="Try Again"
          type="error"
        />
      );
    case 6:
      return (
        <vestireward amount="5,000">
          <p>
            <strong>
              {' '}
              Claim ₦{props.formData.type === 'SEVIS' ? '5,000' : '2,500'}{' '}
            </strong>{' '}
            when you tell someone who needs to Pay For{' '}
            <strong>{props.formData.type} fee about vesti.</strong>
          </p>
        </vestireward>
      );

    default:
      return <>Not Found</>;
  }
};

export const Mode = props => {
  return (
    <div className="paymentoption-container">
      <div className="paymentoption-inner">
        <Titlesubtitle
          steps={` Step 1 of ${
            props.formData.type === 'applicationsFees' ||
            props.formData.type === 'TuitionAcceptanceFees'
              ? 3
              : 2
          }`}
          title={`${props.formData.type} Payment`}
          subtitle={`Select Payment Mode`}
        />

        <div className="paymentoption-inner center">
          <RadioOption
            image={radio_ngn}
            changed={props.setPaymentOption}
            id="1"
            isSelected={props.option === 'Wallet'}
            label="Pay with NetWebPay Wallet"
            sublabel="You can pay via your NetWebPay wallet"
            value="Wallet"
          />
          <div className="mb-4"></div>
          <RadioOption
            image={radio_card}
            changed={props.setPaymentOption}
            id="2"
            isSelected={props.option === 'card'}
            label="Pay with card"
            value="card"
            sublabel="You can pay using active debit card."
          />

          <div className="mb-4"></div>
        </div>

        {props.payData.paymentURL && (
          <div className="link-box">
            You are paying for <strong> {props.payData.type} </strong> at{' '}
            <strong> NGN {props.toWholeCurrency(props.payData.amount)}</strong>{' '}
            with an exchange rate of <strong>{props.rate} Naira to USD</strong>
          </div>
        )}
        {props.option === 'card' && props.formData.custom && (
          <Form style={{ width: '70%' }}>
            <div
              className="w-100 flex-fill pt-4 mb-2"
              style={{ width: '100%' }}
            >
              <div className="enter-amount">
                <div className="custom-field">
                  <p className="mt-2">Enter an amount</p>
                  <input
                    type="number"
                    placeholder="Enter custom fee amount"
                    value={props.current}
                    onChange={e => props.setCurrent(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </Form>
        )}

        {props.option === 'card' && (
          <Platformbutton
            type="normal"
            name="Initiate Payment"
            click={e => props.paystackPay(e)}
            classname="fas fa-arrow-right"
          />
        )}

        {props.option === 'Wallet' && (
          <Platformbutton
            type="normal"
            name={
              props.formData.type === 'applicationsFees' ||
              props.formData.type === 'TuitionAcceptanceFees'
                ? 'Proceed to input details '
                : 'Proceed to input pin'
            }
            click={() =>
              props.formData.type === 'applicationsFees' ||
              props.formData.type === 'TuitionAcceptanceFees'
                ? props.setStep(2)
                : props.setStep(3)
            }
          />
        )}
      </div>
    </div>
  );
};

export const CustomPay = props => {
  return (
    <div className="paymentoption-container">
      <div className="paymentoption-inner">
        <Titlesubtitle
          title={`${props.formData.type} Payment • 2 of ${3}`}
          subtitle={`Enter details below to pay for your custom Applications fees`}
        />
        <div
          onFinish={() => props.handleCompleteTransaction()}
          style={{ width: '100%' }}
        >
          <Form style={{ width: '70%' }}>
            <div className="w-100 flex-fill pt-4" style={{ width: '100%' }}>
              {props.formData.custom && (
                <div className="enter-amount">
                  <div className="custom-field">
                    <p className="mt-2">Enter an amount</p>
                    <input
                      type="number"
                      placeholder="Enter custom fee amount"
                      value={props.fee}
                      onChange={e => props.setCustom(e.target.value)}
                    />
                  </div>

                  <div className="custom-field">
                    <p className="mt-2">Enter The school name</p>
                    <input
                      type="text"
                      placeholder="Enter the school name"
                      value={props.school}
                      onChange={e => props.setSchool(e.target.value)}
                    />
                  </div>

                  <div className="custom-field">
                    <p className="mt-2">Enter The name on your Passport</p>
                    <input
                      type="text"
                      placeholder="Enter passport name"
                      value={props.passport}
                      onChange={e => props.setPassport(e.target.value)}
                    />
                  </div>
                </div>
              )}

              <div className="btn-container">
                <div
                  type="submit"
                  className="btn-left"
                  onClick={() => props.setStep(props.step - 1)}
                >
                  Back
                </div>
                <div
                  type="submit"
                  className="btn-right"
                  onClick={() => props.setStep(2)}
                >
                  Proceed to input Pin
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};
export const Wespay = props => {
  return (
    <section>
      <Titlesubtitle
        title="Pay for Wes"
        subtitle="Fill in these field to continue with your WES payment"
      />
      <>
        <p>What currency are you paying in ?</p>
        <Singleselect
          value={props.currency}
          options={[
            { label: 'Canadian Dollars', value: 'CAD_CENTS', rate: 600 },
            {
              label: `American Dollars @ ${props.rate}`,
              value: 'USD_CENTS',
              rate: props.rate,
            },
          ]}
          placeholder="Select your beneficiary"
          onChange={value => props.setCurrency(value)}
        />
      </>
      <div className="mb-4"></div>

      {props.currency ? (
        <Amountinputcurrency
          type="text"
          currency={getCurrency(props.currency.value)}
          name="amount"
          label={`Enter amount in ${getCurrencyName(
            props.currency && props.currency.value,
          )}`}
          value={
            props.amount === 'NaN' ? 0 : props.amount.toLocaleString('en-US')
          }
          disabled={false}
          placeholder={`Enter amount in ${getCurrencyName(
            props.currency.value,
          )}`}
          onChange={props.handleAmount}
          pattern="[0-9,.]*"
        />
      ) : (
        <></>
      )}
      {props.amount ? (
        <Equivalence
          firstCurr={getCurrency(props.currency.value)}
          secondCurr="₦"
          amount={props.amount.toLocaleString('en-US')}
          secondAmount={(
            removeCommaAmount(props.amount) * props.currency.rate
          ).toLocaleString('en-US')}
        />
      ) : (
        <></>
      )}
      <div className="mb-4"></div>
      <div className="mb-4"></div>
      {props.amount ? (
        <Platformbutton
          name="Continue"
          type="normal"
          click={() => props.continue()}
        />
      ) : (
        <></>
      )}
    </section>
  );
};
