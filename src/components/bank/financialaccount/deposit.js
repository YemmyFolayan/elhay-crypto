import React, { useState, useEffect } from 'react';
import { Platformbutton } from 'components/common/button/button';
import { RadioOption } from 'components/common/radiobutton/radiobutton';
import { Titlesubtitle } from 'components/common/titlesubtitle/titlesubtitle';
import { useAmount, useStep } from 'helpers/hooks';
import { fetchAllStates, fetchLinkAccount } from 'appRedux/actions/Common';
import './styles.scss';
import { connect } from 'react-redux';
import { AchContinuation, Achdeposit } from './achdeposit';
import {
  stripeAchFinal,
  stripeAchOne,
  stripeFundViaCard,
  stripeFundViaUSD,
} from 'appRedux/actions/transactions';
import { Success } from 'components/common/success/success';
import errorsvg from 'assets/newerror.svg';
import { Stepone } from './financialaccount';
import { removeCommaAmount } from 'helpers/utils';
import { Comptransaction } from 'components/common/completetransaction/comptransaction';
import { Backcontinue } from 'components/common/backcontinue/backcontinue';
import { AlertError } from 'components/common/alertboxes/alertboxes';
import { Transreview } from 'components/common/transactionreview/review';
// eslint-disable-next-line
import {
  radio_achx,
  radio_cardx,
  radio_plaidx,
  radio_usdx,
} from 'assets/assets';
import SimplePlaidLink from 'components/plaidlink/plaidlink.tsx';

const Financedeposit = props => {
  const { step, nextStep, previousStep, setStep } = useStep(0);
  const { amount, handleAmount } = useAmount(0);
  const [state, setState] = useState({
    type: '',
    pin: '',
  });
  var setOption = value => {
    // var value = e.target.value
    // alert(value)
    setState({ ...state, type: value });
  };

  var callBack = (value, type) => {
    type === 'link' ? props.closeModal() : setStep(value);
    props.refetch();
  };

  // eslint-disable-next-line
  var handleLinking = payload => {
    props.fetchLinkAccount(
      '/bank/link_account',
      {
        publicToken: payload.publicToken,
        accountID: payload.accountID,
        amountInCents: removeCommaAmount(amount) * 100,
        charges: 50,
        description: 'Financial Account Funding',
      },
      () => setStep(4),
      () => setStep(5),
    );
  };
  var __renderBtn = () => {
    switch (state.type) {
      case 'USD_CENT':
        return (
          <Platformbutton
            type="normal"
            name="Initiate Deposit"
            disabled={
              removeCommaAmount(amount) > 9 && props.transLoading === false
                ? false
                : true
            }
            click={() => {
              props.refetch();
              props.stripeFundViaCard(
                {
                  amountCents: removeCommaAmount(amount) * 100,
                  userId: props.id,
                  currency: 'USD_CENTS',
                },
                callBack,
              );
            }}
          />
        );
      case 'NGN_KOBO':
        return (
          <Platformbutton
            type="normal"
            name="Initiate Deposit"
            disabled={
              removeCommaAmount(amount) > 9 && props.transLoading === false
                ? false
                : true
            }
            click={() => {
              props.refetch();
              props.stripeFundViaCard(
                {
                  amountCents: removeCommaAmount(amount) * 100,
                  userId: props.id,
                  currency: 'NGN_KOBO',
                },
                callBack,
              );
            }}
          />
        );
      case 'USD_WALLET':
        return (
          <Platformbutton
            type="normal"
            name="Continue"
            disabled={
              removeCommaAmount(amount) > props.usdbalance ? true : false
            }
            click={() => {
              setStep(6);
            }}
          />
        );
      case 'ACH':
        return (
          <Platformbutton
            type="normal"
            name="Continue"
            click={() => setStep(2)}
          />
        );
      case 'Plaid':
        return <SimplePlaidLink handleLinking={handleLinking} />;
      default:
        return <></>;
    }
  };
  var __renderInfo = () => {
    switch (state.type) {
      case 'Card':
        return `This is option One`;
      case 'ACH':
        return `This is option Two`;
      case 'Plaid':
        return `This is option One`;
      default:
        return ``;
    }
  };
  var __renderSteps = () => {
    switch (step) {
      case 0:
        return (
          <Stepone
            type="Deposit"
            balance={props.balance}
            amount={amount}
            handleAmount={handleAmount}
            continue={nextStep}
          />
        );
      case 1:
        return (
          <Steptwo
            state={state}
            setOption={setOption}
            back={previousStep}
            __renderBtn={__renderBtn}
            __renderInfo={__renderInfo}
            amount={removeCommaAmount(amount)}
            balance={props.usdbalance}
          />
        );
      case 2:
        return (
          <Achdeposit
            amount={removeCommaAmount(amount) * 100}
            transLoading={props.transLoading}
            refetch={props.refetch}
            phone={props.phone}
            id={props.id}
            transMessage={props.transMessage}
            stripeAchOne={props.stripeAchOne}
            states={props.states}
            goBack={previousStep}
            closeModal={props.closeModal}
          />
        );
      case 3:
        return (
          <AchContinuation
            transLoading={props.transLoading}
            refetch={props.refetch}
            phone={props.phone}
            id={props.id}
            stripeAchFinal={props.stripeAchFinal}
            transMessage={props.transMessage}
            states={props.states}
            goBack={previousStep}
            closeModal={props.closeModal}
          />
        );

      case 4:
        return (
          <Success
            title="Successful"
            subtitle={props.transMessage}
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
            onClick={() => setStep(6)}
            button="Try Again"
            type="error"
          />
        );
      case 6:
        return (
          <div className="transfinancreview">
            <Transreview
              data={[
                { title: 'Transaction Type', value: 'Deposit' },
                { title: 'Currency', value: '($) USD' },
                {
                  title: 'Amount',
                  value: `$${amount.toLocaleString('en-US')}`,
                },
                { title: 'Wallet', value: 'USD Wallet' },
                {
                  title: 'Fee (0%)',
                  value: ` $${Math.ceil(parseFloat(0.0)).toLocaleString(
                    'en-US',
                  )}`,
                },
              ]}
            />
            <div className="mb-2"></div>
            <Comptransaction
              setPin={value => setState({ ...state, pin: value })}
              loading={props.transLoading}
              goBack={() => setStep(0)}
              len={4}
              lower={true}
            >
              <Backcontinue goBack={() => setStep(1)}>
                <Platformbutton
                  name="Initiate Deposit "
                  type="normal"
                  click={() => {
                    props.stripeFundViaUSD(
                      {
                        amountCents: removeCommaAmount(amount) * 100,
                        transactionPin: state.pin,
                        walletToCharge: 'USD_CENTS',
                      },
                      callBack,
                    );
                  }}
                />
              </Backcontinue>
            </Comptransaction>{' '}
          </div>
        );
      default:
        return <></>;
    }
  };
  useEffect(() => {
    props.fetchAllStates({ country: 'united states' });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    props.sourceId !== null && setStep(3);
    // eslint-disable-next-line
  }, []);
  return (
    <section className="financialaccount">
      {step < 2 && (
        <Titlesubtitle
          steps={
            step === 0
              ? ``
              : state.type === 'Card'
              ? 'Step 2 of 2'
              : `Step ${step + 1} of 3`
          }
          title="Deposit"
          subtitle="Fill in these fields to intiate a Deposit transaction."
        />
      )}
      <div className="mb-4"></div>
      {__renderSteps()}
    </section>
  );
};

const Steptwo = props => {
  return (
    <div className="steptwo">
      <div className="steptwo__col  --list">
        <>
          <RadioOption
            image={radio_cardx}
            changed={props.setOption}
            id="0"
            isSelected={props.state.type === 'USD_CENT'}
            label="With Card"
            sublabel="Initiate deposit using your credit or debit card."
            value="USD_CENT"
          />
          {props.state.type === 'USD_CENT' && (
            <p className="steptwo__charge">
              Includes vesti platform charge of 2.9% ={' '}
              <strong>${(props.amount * 0.029).toLocaleString('en-us')}</strong>
            </p>
          )}
        </>

        <>
          <RadioOption
            image={radio_cardx}
            changed={props.setOption}
            id="1"
            isSelected={props.state.type === 'NGN_KOBO'}
            label="With your Naira Card"
            sublabel="Initiate deposit using your Naira card."
            value="NGN_KOBO"
          />
          {props.state.type === 'NGN_KOBO' && (
            <p className="steptwo__charge">
              Includes vesti platform charge of 4.9% ={' '}
              <strong>${(props.amount * 0.049).toLocaleString('en-us')}</strong>
            </p>
          )}
        </>

        <>
          <RadioOption
            image={radio_usdx}
            changed={props.setOption}
            id="2"
            isSelected={props.state.type === 'USD_WALLET'}
            label="With your USD Wallet"
            sublabel="Initiate deposit using your NetWebPay USD wallet."
            value="USD_WALLET"
          />
          {props.state.type === 'USD_WALLET' && (
            <p className="steptwo__charge">
              Includes vesti platform charge of 0% = <strong>${0.0}</strong>
            </p>
          )}
        </>

        <RadioOption
          image={radio_achx}
          changed={props.setOption}
          id="3"
          isSelected={props.state.type === 'ACH'}
          label="with ACH  (manual  entry)"
          sublabel="Deposit directly  from your account."
          value="ACH"
        />
        {/* <RadioOption
                    image={radio_plaidx}
                    changed={ props.setOption } 
                    id="4" 
                    isSelected={props.state.type === "Plaid" } 
                    label="Via Plaid"
                    sublabel="Deposit directly  from your account." 
                    value="Plaid" 
                /> */}
      </div>

      {props.state.type === 'USD_WALLET' && props.amount > props.balance ? (
        <AlertError
          body={`You do not have up to $${
            props.amount
          } in your wallet, you have $${props.balance.toLocaleString('en-us')}`}
        />
      ) : (
        <></>
      )}
      <div className="steptwo__btns">
        <Platformbutton name="Go Back" type="secondary" click={props.back} />
        {props.__renderBtn()}
      </div>

      {/* {props.state.type && <Infobox
                title={props.__renderInfo()}
            />} */}
    </div>
  );
};

const mapStateToProps = ({ transactions, common }) => {
  const { states } = common;
  const { transLoading, transMessage } = transactions;
  return {
    transLoading,
    transMessage,
    states,
  };
};

const mapDispatchToProps = {
  fetchAllStates,
  stripeFundViaCard,
  stripeFundViaUSD,
  stripeAchOne,
  stripeAchFinal,
  fetchLinkAccount,
};
export default connect(mapStateToProps, mapDispatchToProps)(Financedeposit);
