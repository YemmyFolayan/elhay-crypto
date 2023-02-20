import React, { useState } from 'react';
import { Success } from 'components/common/success/success';
import errorsvg from 'assets/error-2.svg';
// import Singleinputlabelcol from "components/common/inputs/singleinputlabelcol";
import { Titlesubtitle } from 'components/common/titlesubtitle/titlesubtitle';
import './depositusdwallet.scss';
import { RadioOption } from 'components/common/radiobutton/radiobutton';
import { Comptransaction } from 'components/common/completetransaction/comptransaction';
// import { vestirate } from "components/common/vestirate/vestirate";

import { Backcontinue } from 'components/common/backcontinue/backcontinue';
// import { Smallbox } from "components/common/smallbox/smallbox";
// import Inputfloat from "components/common/inputs/inputfloat";
import { Shortinfo } from 'components/common/shortinfo/shortinfo';
import { Platformbutton } from 'components/common/button/button';
import { Amountinputcurrency } from 'components/common/inputs/amountinput';
import { fundUsdViaNgn, stripeUsdViaCard } from 'appRedux/actions/transactions';
import { connect } from 'react-redux';
import { Transreview } from 'components/common/transactionreview/review';
import { radio_cardusd, radio_ngnusd } from 'assets/assets';

export const Depositusdwallet = props => {
  const [data, setData] = useState({
    amount: '',
    transactionPin: '',
  });

  const [step, setStep] = useState(0);

  const setWalletOption = value => {
    setData({ ...data, walletToCharge: value });
  };

  var setInput = e => {
    // var name = e.target.name;
    // var value = e.target.value
    // setData({...data, [name]:value})
    var name = e.target.name;
    var value = parseFloat(
      e.target.value
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        .replace(/,/g, ''),
    ).toLocaleString('en-US');
    e.target.validity.valid && setData({ ...data, [name]: value });
  };
  var setPin = value => {
    setData({ ...data, transactionPin: value });
  };
  var goToStart = () => {
    setStep(0);
  };

  var close = () => {
    props.closeModal();
    props.refetch();
  };

  var viaStripe = () => {
    const payload = {
      amountCents: data.amount.replace(/,/g, '') * 100,
      currency: 'USD_CENTS',
    };
    props.stripeUsdViaCard(payload, () => close());
  };
  function ParseFloat(str, val) {
    str = str.toString();
    str = str.slice(0, str.indexOf('.') + val + 1);
    return Number(str);
  }

  var fundUSD = () => {
    var myData = { amount: data.amount, transactionPin: data.transactionPin };
    props.fundUsdViaNgn(myData, value => setStep(value));
  };

  switch (step) {
    case 0:
      return (
        <Amount
          data={data}
          setInput={setInput}
          setStep={setStep}
          ParseFloat={ParseFloat}
          rate={props.rate.EXCHANGE_RATE / 100}
        />
      );
    case 1:
      return (
        <Wallettype
          data={data}
          setWalletOption={setWalletOption}
          setStep={setStep}
          viaStripe={viaStripe}
          rate={props.rate.EXCHANGE_RATE / 100}
          btn={props.transLoading}
          userType={props.userType}
        />
      );
    case 2:
      return (
        <Enterpin
          fundUSD={fundUSD}
          setPin={setPin}
          setStep={setStep}
          data={data}
          rate={props.rate.EXCHANGE_RATE / 100}
          ParseFloat={ParseFloat}
        />
      );
    case 3:
      return (
        <Success
          title={`Succesful`}
          subtitle={props.transMessage}
          btn="Done, Thank You."
          onClick={close}
        />
      );
    case 4:
      return (
        <Success
          image={errorsvg}
          button="Try Again"
          onClick={goToStart}
          title={`Fund USD Wallet Failed`}
          subtitle={props.transMessage}
          type="error"
        />
      );
    default:
      return <></>;
  }
};

const Amount = props => {
  // var total = props.ParseFloat(props.data.amount * 590);
  // var total = props.data.amount * 620;
  return (
    <div className="fundusd">
      <Titlesubtitle
        steps="Step 1 of 3"
        title="Fund your USD Wallet"
        subtitle="Enter Amount(in USD) of cash you want to add."
      />
      {/* <vestirate
                // card="true"
            /> */}

      <Amountinputcurrency
        type="text"
        currency="$"
        inputmode="numeric"
        label="Amount in USD"
        name="amount"
        placeholder="Enter Amount (in USD)"
        value={
          props.data.amount === 'NaN'
            ? 0
            : props.data.amount.toLocaleString('en-US')
        }
        disabled={false}
        onChange={props.setInput}
        // step="any"
        pattern="[0-9,.]*"
      />
      {/* {props.data.amount &&  <p className="fundcard__get"> {'$' + props.data.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +' equivalence of ≈ ₦' + total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </p> } */}
      {/* <Backcontinue
                text = "Confirm and  Continue"
                goBack = {() => props.setStep(0)}
            >
                    <button className="fundcard__btn" disabled={props.data.amount ? false: true} onClick={() => props.setStep(2)}>Continue To Input PIN</button>
            </Backcontinue> */}
      <div className="mb-4"></div>
      <Platformbutton
        name="Continue"
        type="normal"
        disabled={props.data.amount ? false : true}
        click={() => props.setStep(1)}
      />
      {/* <button className="fundusd__btn" disabled={props.data.amount ? false: true} onClick={() => props.setStep(1)}>Continue</button>             */}
    </div>
  );
};

const Wallettype = props => {
  var total = props.data.amount.replace(/,/g, '') * props.rate;
  var tot =
    props.data.amount.replace(/,/g, '') -
    parseFloat(props.data.amount.replace(/,/g, '') * 0.029);
  return (
    <div className="fundusd">
      <Titlesubtitle
        steps="Step 2 of 3"
        title="Select option"
        subtitle={`Select an option to add cash to your USD wallet.`}
      />
      {props.data.walletToCharge === 'NGN_KOBO' ? (
        <p className="fundusd__get">
          {' '}
          {'$' +
            props.data.amount +
            ' equivalence of ≈ ₦' +
            total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
        </p>
      ) : (
        props.data.walletToCharge === 'USD_CENTS' && (
          <p className="fundusd__get">
            {' '}
            {'When you deposit $' +
              props.data.amount +
              ' you get ≈ $' +
              tot.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
              ' in your NetWebPay wallet.'}{' '}
          </p>
        )
      )}
      <RadioOption
        image={radio_ngnusd}
        changed={props.setWalletOption}
        id="1"
        isSelected={props.data.walletToCharge === 'NGN_KOBO'}
        label={`Using your NAIRA WALLET BALANCE at ${props.rate}`}
        sublabel="Use this option to convert your Naira to USD"
        value="NGN_KOBO"
      />

      <div className="mb-4"></div>

      <RadioOption
        image={radio_cardusd}
        changed={props.setWalletOption}
        id="2"
        isSelected={props.data.walletToCharge === 'USD_CENTS'}
        label="Using Card"
        sublabel="You can add cash to your USD wallet using your card."
        value="USD_CENTS"
      />

      {props.data.walletToCharge === 'USD_CENTS' && (
        <Shortinfo subject="Transaction fees from your card issuer and bank may also apply." />
      )}
      {/* <RadioButton
                changed={ props.setWalletOption } 
                id="1" 
                isSelected={ props.data.walletToCharge === "NGN_KOBO" } 
                label="Fund via USD Service 2" 
                sublabel="This is the only available mode at the moment."
                value="NGN_KOBO" 
            /> */}
      <Backcontinue
        text="Confirm and  Continue"
        goBack={() => props.setStep(0)}
      >
        <Platformbutton
          type="normal"
          name={
            props.data.walletToCharge === 'NGN_KOBO'
              ? 'Continue To Input PIN'
              : 'Initiate Deposit'
          }
          disabled={
            props.data.amount && props.data.walletToCharge
              ? props.btn === false
                ? false
                : true
              : true
          }
          click={() =>
            props.data.walletToCharge === 'NGN_KOBO'
              ? props.setStep(2)
              : props.viaStripe()
          }
        />
        {/* <button className="fundcard__btn" disabled={props.data.amount && props.data.walletToCharge ?props.btn === ''? false :true: true} onClick={() => props.data.walletToCharge === "NGN_KOBO"  ? props.setStep(2) :props.viaStripe() }>
                        {props.data.walletToCharge === "NGN_KOBO" ? 'Continue To Input PIN':props.btn ? props.btn: 'Initiate Deposit'}
                        
                    </button> */}
      </Backcontinue>
    </div>
  );
};

const Enterpin = props => {
  // var total = props.ParseFloat(props.data.amount * 590, 2);
  var total = props.data.amount.replace(/,/g, '') * props.rate;
  return (
    <div className="transrev">
      {/* <Titlesubtitle
                steps="Step 3 of 3"
                title="Enter your NetWebPay Transaction PIN"
                subtitle="Enter yout vesti transaction PIN to complete this transaction"
            />
            <Smallbox>
                <p>
                    You are about to fund your USD wallet with <strong> ${
                    // eslint-disable-next-line
                    props.data.amount +' ≈ '+ '₦'+total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} from your NetWebPay NAIRA WALLET BALANCE</strong>, enter your pin to finalize.
               
                </p>
            </Smallbox> */}
      <Transreview
        data={[
          { title: 'Transaction Type', value: 'USD Deposit' },
          {
            title: 'Amount (USD)',
            value: props.data.amount.toLocaleString('en-us'),
          },
          { title: 'Amount (NGN)', value: total.toLocaleString('en-us') },
          { title: 'Rate', value: props.rate },
          { title: 'Fee (0%)', value: ` 0.00` },
        ]}
      />
      <Comptransaction
        setPin={props.setPin}
        loading={props.loading}
        goBack={() => props.setStep(1)}
        btn="Fund Your USD Wallet!"
        onFinish={props.fundUSD}
        len={4}
      />
    </div>
  );
};

const mapStateToProps = ({ transactions }) => {
  const { transMessage, transLoading } = transactions;
  return {
    transMessage,
    transLoading,
  };
};

const mapDispatchToProps = {
  fundUsdViaNgn,
  stripeUsdViaCard,
};

export default connect(mapStateToProps, mapDispatchToProps)(Depositusdwallet);
