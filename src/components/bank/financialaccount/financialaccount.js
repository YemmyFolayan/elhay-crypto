import React from 'react';
import Inputfloat from 'components/common/inputs/inputfloat';
import { Singleselect } from 'components/common/inputs/singleselect';
import { Platformbutton } from 'components/common/button/button';
import { Comptransaction } from 'components/common/completetransaction/comptransaction';
import { Backcontinue } from 'components/common/backcontinue/backcontinue';
import { AlertError } from 'components/common/alertboxes/alertboxes';
import './styles.scss';
import { removeCommaAmount } from 'helpers/utils';
import { Amountinputcurrency } from 'components/common/inputs/amountinput';
import { Shortinfo } from 'components/common/shortinfo/shortinfo';
import info from 'assets/foundersinfo.svg';
import smallb from 'assets/smallbankf.svg';
import { Littlebalance } from '../littlebalance/littlebalance';
import { Transreview } from 'components/common/transactionreview/review';
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
              body={`You have do not have up to $${props.amount} in your founders wallet,please
                fund your account to continue.`}
            />
          )
        );

      default:
        return <></>;
    }
  };

  return (
    <div className="stepone">
      <div className="stepone__col">
        <Littlebalance
          type="founders"
          title="Founders Balance"
          currency="$"
          img={smallb}
          amount={props.balance}
        />

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
          <Shortinfo image={info} subject="Amount should be greater than $9" />
        </Amountinputcurrency>
        {/* <Amountinput
                    type="text"
                    name="amount"
                    label="Amount in USD"
                    currency="$"
                    value={ props.amount ==='NaN' ? 0: props.amount.toLocaleString('en-US')}
                    disabled={false}
                    placeholder="Enter amount to deposit"
                    onChange={props.handleAmount}
                    pattern="[0-9,.]*"
                /> */}
        {__renderCheck()}
      </div>
      <div className="stepone__btns">
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
            // disabled={removeCommaAmount(props.amount) >0  ? (removeCommaAmount(props.amount) < props.balance) ? false:true :false}
            // disabled={(removeCommaAmount(props.amount) > 0 && (removeCommaAmount(props.amount) < props.balance)) ? false :true}
          />
        )}
      </div>
    </div>
  );
};

export const StepTwoAddress = props => {
  const {
    billingAddressCity,
    billingAddressState,
    billingAddressLine1,
    billingAddressPostalCode,
  } = props.data;
  return (
    <div className="steptwo">
      <div className="steptwo__col">
        <Inputfloat
          type="text"
          name="billingAddressLine1"
          label="address"
          value={billingAddressLine1}
          placeholder="Address"
          onChange={props.setInput}
        />
        <Inputfloat
          type="text"
          name="billingAddressCity"
          label="billing Address City"
          value={billingAddressCity}
          disabled={false}
          placeholder="city"
          onChange={props.setInput}
        />
        <Singleselect
          value={billingAddressState}
          options={props.states}
          placeholder="Select State"
          onChange={value => props.handleSelect('billingAddressState', value)}
        />
        <Inputfloat
          type="number"
          name="billingAddressPostalCode"
          label="Postal Code"
          value={billingAddressPostalCode}
          placeholder="Postal Code"
          onChange={props.setInput}
        />
      </div>

      <div className="stepone__btns">
        <Platformbutton
          name="Back"
          type="secondary"
          click={() => props.back()}
        />
        <Platformbutton
          name="Continue"
          type="normal"
          click={() => props.continue()}
          disabled={
            !billingAddressCity ||
            !billingAddressState ||
            !billingAddressLine1 ||
            !billingAddressPostalCode ||
            props.transLoading === true
              ? true
              : false
          }
        />
      </div>
    </div>
  );
};

export const Compeletetrans = props => {
  return (
    <div className="transfinancreview">
      <Transreview
        data={[
          { title: 'Transaction Type', value: 'ACH Withdrawal' },
          { title: 'Currency', value: '($) USD' },
          {
            title: 'Amount',
            value: `$${props.data.amountCents.toLocaleString('en-US')}`,
          },
          { title: 'Wallet', value: 'Founders Account' },
          { title: 'Recipient Account', value: props.data.account_number },
          { title: 'Recipient ACH Routing', value: props.data.routing_number },
          {
            title: 'Fee (1.3%)',
            value: ` $${Math.ceil(
              parseFloat(props.data.amountCents * 0.013),
            ).toLocaleString('en-US')}`,
          },
        ]}
      />
      {/* <Smallbox>
                <p>
                    You are about to withdraw <strong> ${(props.data.amountCents).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }</strong> from your NetWebPay CRYPTO WALLET BALANCE 
                    to bank routing number of <strong> {props.data.routing_number }</strong> , account number of <strong> {props.data.account_number }</strong>, this 
                    includes a transaction charge of 1.3%
                    <strong> of ${Math.ceil(parseFloat( (props.data.amountCents * 0.013))).toLocaleString('en-US')} </strong>
                </p>
            </Smallbox> */}
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
