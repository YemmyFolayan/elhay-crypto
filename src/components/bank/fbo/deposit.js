import { Backcontinue } from 'components/common/backcontinue/backcontinue';
import { Platformbutton } from 'components/common/button/button';
import { Clipboard } from 'components/common/clipboard/clipboard';
import { Numberedcheck } from 'components/common/listcheck/listcheck';
import { Newprompt } from 'components/common/prompt/prompt';
import { RadioOption } from 'components/common/radiobutton/radiobutton';
import { Shortinfo, Shortinfonew } from 'components/common/shortinfo/shortinfo';
import {
  Smalltitlesubtitle,
  Titlesubtitle,
} from 'components/common/titlesubtitle/titlesubtitle';
import { useAmount, useStep } from 'helpers/hooks';
// import { removeCommaAmount } from "helpers/utils";
import React, { useState } from 'react';
// import { Equivalence } from "../equivalence";
import { Stepone } from './fbo';
import fprompt from 'assets/fboprompt.svg';
import './styles.scss';
import { connect } from 'react-redux';
import {
  depositUsdViaAccount,
  depositUsdViaCard,
} from 'appRedux/actions/transactions';
import { removeCommaAmount } from 'helpers/utils';
import { Success } from 'components/common/success/success';
import errorsvg from 'assets/newerror.svg';
import { usdAccountDeposit } from 'helpers/data';

const Fbodeposit = props => {
  const { amount, handleAmount } = useAmount(0);
  const [selected, setSelect] = useState();
  const [account, setAccount] = useState();
  const { step, nextStep, previousStep, setStep } = useStep(0);

  const __renderSteps = () => {
    switch (step) {
      case 0:
        return (
          <Stepone
            type="Deposit"
            balance={props.balance}
            amount={amount}
            handleAmount={handleAmount}
            continue={nextStep}
            fullname={props.fullname}
            closeModal={props.closeModal}
          />
        );
      case 1:
        return (
          <Steptwo
            amount={amount}
            selected={selected}
            fullname={props.fullname}
            setSelect={setSelect}
            setStep={setStep}
            viaCard={props.depositUsdViaCard}
            viaAccount={props.depositUsdViaAccount}
            closeModal={props.closeModal}
            back={previousStep}
            setAccount={setAccount}
            loading={props.transLoading}
          />
        );
      case 2:
        return (
          <Accountdetails
            account={account}
            setStep={setStep}
            closeModal={props.closeModal}
            back={previousStep}
          />
        );
      case 3:
        return (
          <Aboutnumb
            setStep={setStep}
            closeModal={props.closeModal}
            back={previousStep}
          />
        );
      case 4:
        return (
          <Success
            image={errorsvg}
            title={`Failed`}
            subtitle={props.transMessage}
            onClick={() => setStep(0)}
            button="Try Again"
            type="error"
          />
        );

      default:
        return <></>;
    }
  };

  return <>{__renderSteps()}</>;
};

const Steptwo = props => {
  var __rendeBtn = () => {
    switch (props.selected) {
      case 'CARD':
        return (
          <Platformbutton
            type="normal"
            name="Initiate Deposit"
            click={() =>
              props.viaCard(
                '/fbio/deposit',
                {
                  amountInCents: removeCommaAmount(props.amount) * 100,
                  senderName: props.fullname,
                  charges: 1200,
                },
                () => props.closeModal(),
                () => props.setStep(4),
              )
            }
            disabled={props.loading ? true : false}
          />
        );
      case 'NAIRA':
        return (
          <Platformbutton
            type="normal"
            name="Initiate Deposit"
            click={() =>
              props.viaCard(
                '/fbio/deposit',
                {
                  amountInCents: removeCommaAmount(props.amount) * 100,
                  senderName: props.fullname,
                  charges: 1200,
                },
                () => props.closeModal(),
                () => props.setStep(4),
              )
            }
          />
        );
      case 'ACCOUNT':
        return (
          <Platformbutton
            type="normal"
            name="Continue"
            click={() =>
              props.viaAccount(
                {
                  amountInCents: removeCommaAmount(props.amount) * 100,
                  senderName: props.fullname,
                  charges: 1200,
                },
                data => {
                  props.setAccount(data);
                  props.setStep(2);
                },
                () => props.setStep(4),
              )
            }
            disabled={props.loading ? true : false}
          />
        );
      default:
        return '';
    }
  };
  return (
    <div className="fbo__bigcol">
      <Titlesubtitle
        steps="1 of 1"
        title="Add Money"
        subtitle="Choose from our varities of options."
      />

      <div className="fbo__top">
        {/* <Littlebalance 
                    title="USD Balance"
                    currency ={'$'}
                    amount = {20000/ 100}
                /> */}
        <div className="fbo__col">
          {usdAccountDeposit.map((item, index) => (
            <span className="fbo__option">
              <RadioOption
                changed={() => props.setSelect(item.value)}
                id={index}
                isSelected={props.selected === item.value}
                label={item.title}
                sublabel={item.subtitle}
                value={item.value}
              />
              {item.value === 'CARD' && props.selected && (
                <Shortinfonew>
                  <p>
                    This option opens a new tab, so allow your browser to open a
                    new tab.
                  </p>
                </Shortinfonew>
              )}
            </span>
          ))}
          {/* <Equivalence
                            first = "Charge of 2.9% of "
                            second ="you get "
                            amount={removeCommaAmount(props.amount).toLocaleString('en-US')}
                            equal= {
                                '$'+ (removeCommaAmount(props.amount) *  0.029).toLocaleString('en-US')
                            }
                        /> */}
        </div>
      </div>

      {props.selected && (
        <Backcontinue goBack={() => props.back()}>{__rendeBtn()}</Backcontinue>
      )}
    </div>
  );
};

const Accountdetails = props => {
  var data = [
    {
      name: 'Account Number',
      value: props.account.accountNumber,
    },
    {
      name: ' Bank Name',
      value: props.account.bankName,
    },
    {
      name: 'Routing Number',
      value: props.account.routingNumber,
    },
    {
      name: 'Address',
      value: props.account.address,
    },
    {
      name: 'Transaction Reference',
      value: props.account.trxRef,
    },
  ];

  return (
    <Newprompt img={fprompt}>
      <div className="fbo__bigccol">
        <Titlesubtitle
          title="Account Details"
          subtitle="Attached below are the details of your Founders account."
        />
        <div className="fbo__row">
          {data.map((item, index) => (
            <Clipboard key={index} title={`${item.name}`} link={item.value} />
          ))}
        </div>

        <div className="fbo__ccol">
          <Shortinfo subject="This is FDIC insured through our bank partners." />
          <Platformbutton
            type="slant"
            name="What are these numbers ?"
            click={() => props.setStep(3)}
          />
        </div>

        {/* <div className="mb-2"></div>  */}
        <Platformbutton
          type="normal"
          name="Back"
          click={() => props.setStep(1)}
        />
      </div>
    </Newprompt>
  );
};

const Aboutnumb = props => {
  var data = [
    {
      name: 'Account Number',
      value: '123456789011231231231323',
    },
    {
      name: 'Routing Number',
      value: '123456789011231231231323',
    },
  ];

  return (
    <Newprompt img={fprompt}>
      <Titlesubtitle
        title="Bank Transfers"
        subtitle="How to transfer money from another bank into the account details."
      />

      <div className="fbo__col">
        <Numberedcheck
          index={1}
          body="Find the transfers section of the bank’s mobile app or website."
        />
        <Numberedcheck
          index={2}
          body="You will need to add the bank details as an external
                    account, enter your routing and account number "
        >
          <div className="fbo__list">
            {data.map((item, index) => (
              <Smalltitlesubtitle
                key={index}
                title={item.name}
                subtitle={item.value}
              />
            ))}
          </div>
        </Numberedcheck>
        <Numberedcheck
          index={3}
          body="Select the Checking account option as
                    the account type"
        />
      </div>

      <Backcontinue goBack={() => props.setStep(2)}>
        <Platformbutton
          type="normal"
          name="Done"
          click={() => props.closeModal()}
        />
      </Backcontinue>
    </Newprompt>
  );
};

const mapStateToProps = ({ transactions }) => {
  const { transLoading, transMessage } = transactions;
  return {
    transLoading,
    transMessage,
  };
};

const mapDispatchToProps = {
  depositUsdViaAccount,
  depositUsdViaCard,
};

export default connect(mapStateToProps, mapDispatchToProps)(Fbodeposit);
