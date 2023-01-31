import React, { useState } from 'react';
import { Platformbutton } from 'components/common/button/button';
import { Comptransaction } from 'components/common/completetransaction/comptransaction';
import { Backcontinue } from 'components/common/backcontinue/backcontinue';
import { AlertError } from 'components/common/alertboxes/alertboxes';
import './styles.scss';
import { removeCommaAmount, __renderRouting } from 'helpers/utils';
import { Amountinputcurrency } from 'components/common/inputs/amountinput';
import { Shortinfo } from 'components/common/shortinfo/shortinfo';
import info from 'assets/foundersinfo.svg';
import { Littlebalance } from '../littlebalance/littlebalance';
import { Transreview } from 'components/common/transactionreview/review';
import { Titlesubtitle } from 'components/common/titlesubtitle/titlesubtitle';
import { RadioOption } from 'components/common/radiobutton/radiobutton';
import { navigate } from '@reach/router';
import smallb from 'assets/wallets/usdwallet.svg';

export const Stepone = props => {
  var strippedAmount = parseFloat(
    props.amount
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      .replace(/,/g, ''),
  );
  var __renderCheck = () => {
    switch (props.type) {
      case 'Deposit':
        return (
          strippedAmount !== 0 &&
          strippedAmount > 50000 && (
            <AlertError
              body={`We do not allow users to fund amount less than $5,000 or higher than  $50,000.`}
            />
          )
        );
      case 'Withdrawal':
        return (
          removeCommaAmount(props.amount) > 0 &&
          removeCommaAmount(props.amount) > props.balance && (
            <AlertError
              body={`You have do not have up to $${props.amount} in your USD wallet,please
                fund your account to continue.`}
            />
          )
        );

      default:
        return <></>;
    }
  };

  return (
    <div className="fbo__bigcol">
      <Titlesubtitle
        title="Amount"
        subtitle={`Enter amount you will like to ${
          props.type === 'Deposit' ? 'add' : 'withdraw'
        } to your wallet`}
      />

      <div className="fbo__top">
        <Usdbalance balance={props.balance} />
        <div className="fbo__col">
          <Amountinputcurrency
            type="text"
            currency="$"
            name="amount"
            label="Amount in USD"
            value={
              props.amount === 'NaN' ? 0 : props.amount.toLocaleString('en-US')
            }
            disabled={false}
            placeholder="Enter amount to deposit"
            onChange={props.handleAmount}
            pattern="[0-9,.]*"
          >
            <Shortinfo
              image={info}
              subject="Amount should be greater than $9"
            />
          </Amountinputcurrency>
          {__renderCheck()}
        </div>
      </div>
      <div className="mb-2"></div>
      <div className="fbo__btns">
        {props.type === 'Deposit' ? (
          <Platformbutton
            name="Continue"
            type="normal"
            click={props.continue}
            disabled={
              removeCommaAmount(props.amount) > 9 &&
              removeCommaAmount(props.amount) < 50000
                ? false
                : true
            }
          />
        ) : (
          <Platformbutton
            name="Continue"
            type="normal"
            click={props.continue}
          />
        )}
      </div>
    </div>
  );
};

export const Choosetype = props => {
  const [option, setOption] = useState();
  var __renderBtn = () => {
    switch (option) {
      case 'vesti':
        return (
          <Platformbutton
            name="Continue"
            type="normal"
            click={() => {
              props.closeModal();
              navigate('/bank/transfer');
            }}
          />
        );
      case 'BANK':
        return (
          <Platformbutton
            name="Continue"
            type="normal"
            click={() => props.continue()}
          />
        );
      default:
        return <></>;
    }
  };
  return (
    <section className="fbo__bigcol">
      <Titlesubtitle
        title="Type of Transfer"
        subtitle="Select type of money transfer"
      />
      <Littlebalance
        title="USD Balance"
        currency={'$'}
        amount={props.balance}
      />
      <div className="fbo__col">
        <RadioOption
          changed={value => setOption(value)}
          id="0"
          isSelected={option === 'vesti'}
          label="Transfer to a NetWebPay user"
          sublabel="Send money to a NetWebPay user"
          value="vesti"
        />
        <RadioOption
          changed={value => setOption(value)}
          id="1"
          isSelected={option === 'BANK'}
          label="Transfer to a bank account"
          sublabel="Send money to an external bank."
          value="BANK"
        />
      </div>
      <div className="mb-4"></div>
      {__renderBtn()}
    </section>
  );
};

export const Compeletetrans = props => {
  return (
    <div className="fbo__col">
      <Transreview
        data={[
          { title: 'Transaction Type', value: 'Wire Transfer' },
          { title: 'Currency', value: '($) USD' },
          {
            title: 'Amount',
            value: `$${props.data.amountInCents.toLocaleString('en-US')}`,
          },
          { title: 'Recipient Account', value: props.data.account_number },
          {
            title: __renderRouting(props.data.type),
            value: props.data.routing_number,
          },
          { title: 'Recipient Bank', value: props.data.bank_name },
          {
            title: 'Fee (1.3%)',
            value: ` $${Math.ceil(
              parseFloat(props.data.amountCents * 0.013),
            ).toLocaleString('en-US')}`,
          },
        ]}
      />

      <Comptransaction
        setPin={props.handlePin}
        loading={props.loading}
        goBack={() => props.back()}
        btn={`Initiate Withdrawal`}
        onFinish={() => alert('')}
        len={4}
        lower={true}
      >
        <Backcontinue text="Continue" goBack={() => props.back()}>
          <Platformbutton
            name="Initiate Withdrawal"
            type="normal"
            click={() => props.finish()}
          />
        </Backcontinue>
      </Comptransaction>
    </div>
  );
};

export const Usdbalance = props => {
  return (
    <Littlebalance
      type="usd"
      img={smallb}
      title="USD Balance"
      currency="$"
      amount={props.balance}
    />
  );
};
