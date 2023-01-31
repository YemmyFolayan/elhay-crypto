import React, { useEffect, useState } from 'react';
import { Success } from 'components/common/success/success';
import errorsvg from 'assets/newerror.svg';
// import Singleinputlabelcol from "components/common/inputs/singleinputlabelcol";
import { Titlesubtitle } from 'components/common/titlesubtitle/titlesubtitle';
import './fundcard.scss';
import RadioButton from 'components/common/radiobutton/radiobutton';
import { Comptransaction } from 'components/common/completetransaction/comptransaction';
import { vestirate } from 'components/common/vestirate/vestirate';
import api from 'appRedux/api';
import {
  openNotificationWithIcon,
  openNotificationWithIconErr,
} from 'appRedux/actions/Common';
import { errorMessage, removeCommaAmount } from 'helpers/utils';
import { Backcontinue } from 'components/common/backcontinue/backcontinue';
// import { Smallbox } from "components/common/smallbox/smallbox";
// import Inputfloat from "components/common/inputs/inputfloat";
// import { Comingsoon } from "components/common/comingsoon/comingsoon";
import Loader from 'components/Loader';

import { connect } from 'react-redux';
// import { connect} from 'react-redux';
import { fundCard, liquidateCard } from 'appRedux/actions/cards';
import { Platformbutton } from 'components/common/button/button';
import { Amountinputcurrency } from 'components/common/inputs/amountinput';
import { useRates } from 'helpers/hooks';
import { Transreview } from 'components/common/transactionreview/review';

const Fundcard = props => {
  const [data, setData] = useState({
    walletToCharge: '',
    amount: '',
    cardId: props.cardId,
    transactionPin: '',
  });
  // eslint-disable-next-line
  const [message, setMessage] = useState('');
  const [step, setStep] = useState(0);
  const { pricesData } = useRates();
  // eslint-disable-next-line
  const setWalletOption = e => {
    setData({ ...data, walletToCharge: e.target.value });
  };

  var setInput = e => {
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

  var remove = () => {
    setData({
      ...data,
      walletToCharge: '',
      amount: '',
      cardId: '',
      transactionPin: '',
    });
  };
  function ParseFloat(str, val) {
    str = str.toString();
    str = str.slice(0, str.indexOf('.') + val + 1);
    return Number(str);
  }

  // eslint-disable-next-line
  var fundCallBack = value => {
    props.cb && props.cb();
    setStep(value);
  };
  var fundCard = () => {
    var myData = {
      walletToCharge: data.walletToCharge,
      amount: data.amount.replace(/,/g, ''),
      transactionPin: data.transactionPin,
      cardId: data.cardId,
    };
    props.fundCard(myData, props.name, fundCallBack);
  };

  var liqCard = () => {
    var myData = {
      amountInCents: data.amount.replace(/,/g, '') * 100,
      cardPin: data.transactionPin,
    };
    props.liquidateCard(myData, data.cardId, fundCallBack);
  };

  var convertUSD = () => {
    api
      .post('wallet/usd_naira_conversion', {
        transactionPin: data.transactionPin,
        amountInDollarCent: data.amount.replace(/,/g, '') * 100,
      })
      .then(res => {
        openNotificationWithIcon(res.data.message, 'USD Conversion', 'success');
        setStep(3);
        setMessage(res.data.message);
        remove();
        props.cb && props.cb();
      })
      .catch(error => {
        openNotificationWithIconErr(
          errorMessage(error),
          'USD Conversion',
          'error',
        );
        setMessage(error.data.message);
        setStep(4);
        props.cb && props.cb();
      });
  };

  useEffect(() => {
    props.currency === 'NGN' ? setStep(1) : setStep(0);

    // eslint-disable-next-line
  }, []);
  var _rendersteps = () => {
    switch (step) {
      // case 0: return  <Comingsoon
      //     title="Under Maintenance"
      //     subtitle="Card Funding is currently under maintenance. We are sorry you can not create a new virtual card. Kindly check back later. You can pay for WES and SEVIS FEES, IHS-UK, TUITION FEE & Kindly enrol for US Account waitlisting and Others."
      //     button="Close"
      //     onClick= {() => props.closeModal()}
      //   />
      case 0:
        return (
          <Wallettype
            data={data}
            setWalletOption={setWalletOption}
            setStep={setStep}
          />
        );
      case 1:
        return (
          <Amount
            data={data}
            balance={props.balance}
            setInput={setInput}
            setStep={setStep}
            ParseFloat={ParseFloat}
            name={props.name}
            currency={props.currency}
            // rate={props.currency === "NGN" ? props.rate.USD_To_NAIRA_CENT / 100: props.name === 'Mono'? props.rate.MONO_CARD_RATE / 100: props.rate.EXCHANGE_RATE  / 100}
            rate={
              props.currency === 'NGN'
                ? pricesData && pricesData.MONO_LIQUIDATION_RATE / 100
                : props.name === 'Mono'
                ? props.rate.MONO_CARD_RATE / 100
                : props.rate.EXCHANGE_RATE / 100
            }
            convert={convertUSD}
          />
        );
      case 2:
        return (
          <Enterpin
            // fundCard={fundCard}
            fundCard={fundCard}
            loading={props.cardLoading}
            setPin={setPin}
            setStep={setStep}
            data={data}
            name={props.name}
            ParseFloat={ParseFloat}
            currency={props.currency}
            // rate={props.currency === "NGN" ? props.rate.USD_To_NAIRA_CENT / 100 : props.name === 'Mono'? props.rate.MONO_CARD_RATE / 100: props.rate.EXCHANGE_RATE  / 100}
            rate={
              props.currency === 'NGN'
                ? pricesData && pricesData.MONO_LIQUIDATION_RATE / 100
                : props.name === 'Mono'
                ? props.rate.MONO_CARD_RATE / 100
                : props.rate.EXCHANGE_RATE / 100
            }
            finish={props.action === 'liquidate' ? liqCard : convertUSD}
            myData={{
              walletToCharge: data.walletToCharge,
              amount: data.amount.replace(/,/g, ''),
              transactionPin: data.transactionPin,
              cardId: data.cardId,
            }}
          />
        );
      case 3:
        return (
          <Success
            title={`Transaction Successful`}
            subtitle={
              props.currency === 'NGN'
                ? props.message
                : `You successfully funded your NetWebPay card.`
            }
            btn="Done, Thank You."
            onClick={props.closeModal}
          />
        );
      case 4:
        return (
          <Success
            image={errorsvg}
            button="Try Again"
            onClick={props.currency === 'NGN' ? () => setStep(1) : goToStart}
            title={`Transaction Failed`}
            subtitle={props.message}
            type="error"
          />
        );
      default:
        return <></>;
    }
  };

  if (!props.rate) {
    return <Loader />;
  } else {
    return _rendersteps();
  }
};

const Amount = props => {
  // var youget = (props.data.amount / 590).toString()
  var amount = parseFloat(
    props.data.amount
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      .replace(/,/g, ''),
  );
  var rate = (amount * props.rate)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  var balance = props.balance / 100 > amount * props.rate;
  return (
    <div className="fundcard">
      <Titlesubtitle
        steps={`Step ${props.currency === 'NGN' ? ' 1 of 2' : ' 1 of 3'}`}
        title={
          props.name === 'Apto'
            ? 'Fund your Black dollar card'
            : props.currency === 'NGN'
            ? 'Convert USD to NGN'
            : 'Fund your dollar virtual card'
        }
        subtitle={`Enter Amount (in USD) ${
          props.currency === 'NGN' ? ' You Want To convert' : 'to Fund With'
        }`}
      />
      <vestirate
        card="true"
        reverse={props.currency === 'NGN' ? false : true}
        rate={props.rate}
      />
      <Amountinputcurrency
        type="text"
        currency="$"
        name="amount"
        placeholder={`Enter Amount ${
          props.currency === 'NGN' ? ' You Want To convert' : 'to Fund With'
        }`}
        value={
          props.data.amount === 'NaN'
            ? 0
            : props.data.amount.toLocaleString('en-US')
        }
        disabled={false}
        onChange={props.setInput}
        pattern="[0-9,.]*"
      />
      {props.data.amount &&
        (props.data.walletToCharge === 'NGN_KOBO' ||
          props.currency === 'NGN') &&
        props.data.amount !== 'NaN' && (
          <p className="fundcard__get">
            {' '}
            {'$' +
              props.data.amount +
              ' you get ≈ ₦' +
              rate +
              ` ${props.currency === 'NGN' ? ' in your NGN wallet' : ''}`}{' '}
          </p>
        )}
      {props.currency !== 'NGN' &&
        props.data.amount &&
          props.data.amount !== 'NaN' &&
          balance === false && (
          <p className="fundcard__error">
            You have less than {rate} in your NetWebPay NGN wallet.
          </p>
        )}
      <div className="mb-4"></div>
      {props.currency === 'NGN' ? (
        //    <button className="fundcard__btn" disabled={props.data.amount ? false: true} onClick={() => props.setStep(2)}>Continue To Input PIN</button>
        <Platformbutton
          name="Continue To Input PIN"
          type="normal"
          disabled={props.data.amount ? false : true}
          click={() => props.setStep(2)}
        />
      ) : (
        <Backcontinue
          text="Confirm and  Continue"
          goBack={() => props.setStep(0)}
        >
          <Platformbutton
            name="Continue To Input PIN"
            type="normal"
            disabled={props.data.amount && balance === true ? false : true}
            click={() => props.setStep(2)}
          />
          {/* <button className="fundcard__btn" disabled={props.data.amount && balance === true ? false: true} onClick={() => props.setStep(2)}>Continue To Input PIN</button> */}
        </Backcontinue>
      )}
    </div>
  );
};

// eslint-disable-next-line
const Wallettype = props => {
  return (
    <div className="fundcard">
      <Titlesubtitle
        steps="Step 1 of 3"
        title="Select wallet to charge from"
        // subtitle={`Select the wallet you want us to deduct $${props.data.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} (₦${(props.data.amount* 575.26).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}) from.`}
        subtitle={`Select the wallet you want to fund from.`}
      />
      <RadioButton
        changed={props.setWalletOption}
        id="1"
        isSelected={props.data.walletToCharge === 'NGN_KOBO'}
        label="Fund via NetWebPay Naira Wallet"
        // sublabel="This is the only available mode at the moment."
        sublabel="The amount will be deducted from your NetWebPay Naira Wallet."
        value="NGN_KOBO"
      />

      {/* <RadioButton
                changed={ props.setWalletOption } 
                id="2" 
                isSelected={ props.data.walletToCharge === "USD_CENTS" } 
                label="Fund via NetWebPay Dollar Wallet" 
                sublabel="The amount will be deducted from your NetWebPay USD Wallet."
                value="USD_CENTS" 
            /> */}

      <Platformbutton
        name="Continue"
        type="normal"
        disabled={props.data.walletToCharge ? false : true}
        click={() => props.setStep(1)}
      />
    </div>
  );
};

const Enterpin = props => {
  var handleFunding = () => {
    props.fundCard(props.name, props.myData, props.setStep);
  };
  var amount = parseFloat(
    props.data.amount
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      .replace(/,/g, ''),
  );
  var rate = (amount * props.rate)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return (
    <div className="fundcard__final">
      {/* <Titlesubtitle
            steps={`Step ${props.currency === 'NGN' ? ' 2 of 2' : ' 3 of 3' }`}
            // title="Enter your NetWebPay Transaction PIN"
            // subtitle="Enter yout vesti transaction PIN to complete this transaction"
        /> */}

      {props.data.walletToCharge === 'NGN_KOBO' ? (
        <Transreview
          data={[
            { title: 'Transaction Type', value: 'Funding' },
            {
              title: 'Amount',
              value: `${
                // eslint-disable-next-line
                props.data.amount
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
                  ' ≈ ' +
                  '₦' +
                  rate
              }`,
            },
            { title: 'Rate', value: props.rate },
            {
              title: 'fee (1.3%)',
              value: `₦ ${0.013 * removeCommaAmount(rate)}`,
            },
          ]}
        />
      ) : (
        <Transreview
          data={[
            { title: 'Transaction Type', value: 'Card Liquidation' },
            // eslint-disable-next-line
            {
              title: 'Amount',
              value: `$${removeCommaAmount(props.data.amount) +
                ' ≈ ' +
                '₦' +
                rate}`,
            },
            { title: 'Rate', value: props.rate },
            { title: 'fee', value: `₦ 0.00` },
          ]}
        />
      )}
      <Comptransaction
        setPin={props.setPin}
        loading={props.loading}
        goBack={() => props.setStep(1)}
        btn={
          props.name !== 'Apto'
            ? 'Initiate Transaction'
            : 'Compelete Card Funding'
        }
        // onFinish={props.currency === 'NGN' ? props.convert:props.fundCard}
        onFinish={props.currency === 'NGN' ? props.finish : handleFunding}
        len={4}
      />
    </div>
  );
};

const mapStateToProps = ({ cards }) => {
  const { message, cardLoading } = cards;

  return {
    message,
    cardLoading,
  };
};

const mapDispatchToProps = {
  fundCard,
  liquidateCard,
};

export default connect(mapStateToProps, mapDispatchToProps)(Fundcard);
