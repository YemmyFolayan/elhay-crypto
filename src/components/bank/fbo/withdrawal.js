import { RadioOption } from 'components/common/radiobutton/radiobutton';
import { useAmount, useStep } from 'helpers/hooks';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchAllCountries, fetchAllStates } from 'appRedux/actions/Common';
import './styles.scss';
import { Amountinputcurrency } from 'components/common/inputs/amountinput';
import Inputfloat from 'components/common/inputs/inputfloat';
import { Singleselect } from 'components/common/inputs/singleselect';
import { Platformbutton } from 'components/common/button/button';
import { Backcontinue } from 'components/common/backcontinue/backcontinue';
import { Shortinfo, Shortinfonew } from 'components/common/shortinfo/shortinfo';
import { removeCommaAmount, __renderRouting } from 'helpers/utils';
import { Choosetype, Compeletetrans, Usdbalance } from './fbo';
import { Titlesubtitle } from 'components/common/titlesubtitle/titlesubtitle';
import { Success } from 'components/common/success/success';
import errorsvg from 'assets/newerror.svg';
import { usdAccountCodes } from 'helpers/data';
import { withdrawFboUSD } from 'appRedux/actions/transactions';

const Fbowithdrawal = props => {
  const [state, setState] = useState({
    routing_number: '',
    account_number: '',
    billing_address: '',
    country: '',
    account_holder_name: '',
    postalCode: '',
    district: '',
    city: '',
    bank_name: '',
    bank_city: '',
    bank_address: '',
    bank_state: '',
    bank_zip: '',
    description: '',
    type: '',
  });

  const { amount, handleAmount } = useAmount(0);
  const { step, nextStep, previousStep, setStep } = useStep(0);
  var setInput = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  var handleSelect = (name, value) => {
    setState({ ...state, [name]: value });
  };

  useEffect(() => {
    props.fetchAllCountries();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    props.fetchAllStates({
      country: state.country && state.country.label.toLowerCase(),
    });
    // eslint-disable-next-line
  }, [state.country]);

  var __renderSteps = () => {
    switch (step) {
      case 0:
        return (
          <Choosetype
            continue={nextStep}
            balance={props.balance}
            closeModal={props.closeModal}
          />
        );
      case 1:
        return (
          <Withstepone
            balance={props.balance}
            state={state}
            setState={setState}
            amount={amount}
            handleAmount={handleAmount}
            continue={nextStep}
            back={previousStep}
            setInput={setInput}
            handleSelect={handleSelect}
          />
        );
      case 2:
        return (
          <Withsteptwo
            balance={props.balance}
            state={state}
            setState={setState}
            amount={amount}
            handleAmount={handleAmount}
            continue={nextStep}
            back={previousStep}
            setInput={setInput}
            handleSelect={handleSelect}
          />
        );
      case 3:
        return (
          <Bankaddress
            balance={props.balance}
            states={props.states}
            countries={props.countries}
            state={state}
            setState={setState}
            amount={amount}
            handleAmount={handleAmount}
            continue={nextStep}
            back={previousStep}
            setInput={setInput}
            handleSelect={handleSelect}
          />
        );
      case 4:
        return (
          <Locationaddress
            balance={props.balance}
            states={props.states}
            countries={props.countries}
            state={state}
            setState={setState}
            amount={amount}
            handleAmount={handleAmount}
            continue={nextStep}
            back={previousStep}
            setInput={setInput}
            handleSelect={handleSelect}
          />
        );
      case 5:
        return (
          <Compeletetrans
            balance={props.balance}
            data={{
              ...state,
              amountInCents: removeCommaAmount(amount) * 100,
              country: state.country.value,
              bank_state: state.bank_state.value,
              city: state.city.value,
            }}
            back={previousStep}
            loading={props.transLoading}
            finish={() =>
              props.withdrawFboUSD(
                {
                  ...state,
                  amountInCents: removeCommaAmount(amount) * 100,
                  country: state.country.value,
                  bank_state: state.bank_state.value,
                  city: state.city.value,
                  charges: 1200,
                },
                value => setStep(value),
              )
            }
          />
        );
      case 6:
        return (
          <Success
            title="Successful"
            subtitle={props.transMessage}
            button="Okay, thank you"
            onClick={() => props.closeModal()}
          />
        );
      case 7:
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

  return __renderSteps();
};

const Withstepone = props => {
  return (
    <div className="fbo__bigcol">
      <Titlesubtitle
        steps="1 of 1"
        title="Add Money"
        subtitle="Choose from our varities of options."
      />

      <div className="fbo__top">
        <Usdbalance amount={props.balance} />
        <div className="fbo__col">
          {usdAccountCodes.map((item, index) => (
            <RadioOption
              key={index}
              changed={() =>
                props.setState({ ...props.state, type: item.value })
              }
              id={index}
              isSelected={props.state.type === item.value}
              label={item.title}
              sublabel={item.subtitle}
              value={item.value}
            />
          ))}
        </div>
      </div>

      <div className="mb-4"></div>
      <Platformbutton
        type="normal"
        name="Continue"
        disabled={props.state.type ? false : true}
        click={() => props.continue()}
      />
    </div>
  );
};

const Withsteptwo = props => {
  const { account_number, account_holder_name, routing_number } = props.state;
  return (
    <div className="fbo__bigcol">
      <Titlesubtitle
        steps="1 of 3"
        title="Send money"
        subtitle="Fill in these fields to carry out a wire transfer."
      />

      <div className="fbo__top">
        <Usdbalance amount={props.balance} />
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
            <Shortinfonew>
              <p>Amount should be greater than $9</p>
            </Shortinfonew>
          </Amountinputcurrency>
          <span className="fbo__inputrow">
            <Inputfloat
              type="number"
              name="account_number"
              label="Account Number"
              value={props.state.account_number}
              disabled={false}
              placeholder="Account Number"
              onChange={props.setInput}
            />
            <Inputfloat
              type="number"
              name="routing_number"
              label={__renderRouting(props.state.type)}
              value={props.state.routing_number}
              disabled={false}
              placeholder="e.g 1232423423"
              onChange={props.setInput}
            />
          </span>
          <Inputfloat
            type="text"
            name={'account_holder_name'}
            label={'account holder name'}
            value={props.state.account_holder_name}
            disabled={false}
            placeholder="e.g John Doe"
            onChange={props.setInput}
          />
        </div>
        <div className="mb-4"></div>
        <Backcontinue goBack={props.back}>
          <Platformbutton
            name="Continue"
            type="normal"
            disabled={
              !account_number ||
              !account_holder_name ||
              !routing_number ||
              !props.amount
                ? true
                : false
            }
            click={() => props.continue()}
          />
        </Backcontinue>
      </div>
    </div>
  );
};

const Bankaddress = props => {
  const {
    bank_address,
    country,
    bank_state,
    bank_name,
    bank_city,
    bank_zip,
  } = props.state;

  return (
    <div className="fbo__bigcol">
      <Titlesubtitle
        steps="2 of 3"
        title="Bank address"
        subtitle="Fill in these fields to carry out a wire transfer."
      />

      <div className="fbo__top">
        <Usdbalance amount={props.balance} />
        <div className="fbo__col">
          <Inputfloat
            type="text"
            name="bank_address"
            label="Bank Address"
            value={props.state.bank_address}
            disabled={false}
            placeholder="e.g Alrign"
            onChange={props.setInput}
          >
            {' '}
            <Shortinfo subject="Format should be : 3, furo ezimora" />{' '}
          </Inputfloat>
          <Singleselect
            value={props.state.country}
            options={props.countries}
            onChange={value => props.handleSelect('country', value)}
            placeholder="Select Country"
          />
          <span className="fbo__inputrow">
            <Inputfloat
              type="text"
              name="bank_name"
              label="Bank Name"
              value={props.state.bank_name}
              disabled={false}
              placeholder="e.g Bank of America"
              onChange={props.setInput}
            />
            <Inputfloat
              type="text"
              name="bank_city"
              label="Bank City"
              value={props.state.bank_city}
              disabled={false}
              placeholder="e.g New York"
              onChange={props.setInput}
            />
          </span>
          <span className="fbo__inputrow">
            <Singleselect
              value={props.state.bank_state}
              options={props.states}
              onChange={value => props.handleSelect('bank_state', value)}
              placeholder="Select Bank State"
            />
            <Inputfloat
              type="text"
              name="bank_zip"
              label="Bank ZIp Code"
              value={props.state.bank_zip}
              disabled={false}
              placeholder="e.g 10012"
              onChange={props.setInput}
            />
          </span>
        </div>

        <Backcontinue goBack={() => props.back()}>
          <Platformbutton
            name="Continue"
            type="normal"
            disabled={
              !bank_address ||
              !country ||
              !bank_state ||
              !bank_name ||
              !bank_city ||
              !bank_zip
                ? true
                : false
            }
            click={() => props.continue()}
          />
        </Backcontinue>
      </div>
    </div>
  );
};

const Locationaddress = props => {
  const {
    billing_address,
    district,
    city,
    postalCode,
    description,
  } = props.state;
  return (
    <div className="fbo__bigcol">
      <Titlesubtitle
        steps="3 of 3"
        title="Location details"
        subtitle="Fill in these fields to carry out a wire transfer."
      />

      <div className="fbo__top">
        <Usdbalance amount={props.balance} />
        <div className="fbo__col">
          <Inputfloat
            type="text"
            name="billing_address"
            label="Billing Address"
            value={props.state.billing_address}
            disabled={false}
            placeholder="e.g Alrign"
            onChange={props.setInput}
          >
            {' '}
            <Shortinfo subject="Format should be : 3, furo ezimora" />{' '}
          </Inputfloat>

          <span className="fbo__inputrow">
            <Inputfloat
              type="text"
              name="district"
              label="District"
              value={props.state.district}
              disabled={false}
              placeholder="e.g New York"
              onChange={props.setInput}
            />
            <Singleselect
              value={props.state.city}
              options={props.states}
              onChange={value => props.handleSelect('city', value)}
              placeholder="Select Billing City"
            />
          </span>
          <Inputfloat
            type="text"
            name="postalCode"
            label="Postal Code"
            value={props.state.postalCode}
            disabled={false}
            placeholder="e.g 10012"
            onChange={props.setInput}
          />

          <Inputfloat
            type="text"
            name="description"
            label="Description"
            value={props.state.description}
            disabled={false}
            placeholder="e.g reason"
            onChange={props.setInput}
          />
        </div>

        <Backcontinue goBack={() => props.back()}>
          <Platformbutton
            name="Continue"
            type="normal"
            disabled={
              !billing_address ||
              !district ||
              !city ||
              !postalCode ||
              !description
                ? true
                : false
            }
            click={() => props.continue()}
          />
        </Backcontinue>
      </div>
    </div>
  );
};

const mapStateToProps = ({ transactions, common }) => {
  const { transMessage, transLoading } = transactions;
  const { states, countries } = common;
  return {
    transMessage,
    transLoading,
    states,
    countries,
  };
};

const mapDispatchToProps = {
  fetchAllStates,
  fetchAllCountries,
  withdrawFboUSD,
};

export default connect(mapStateToProps, mapDispatchToProps)(Fbowithdrawal);
