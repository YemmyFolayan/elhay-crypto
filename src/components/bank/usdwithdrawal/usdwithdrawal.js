import React, { useEffect, useState } from 'react';
import { Titlesubtitle } from '../../common/titlesubtitle/titlesubtitle';
import { Smallbox } from '../../common/smallbox/smallbox';
import { Littlebalance } from '../littlebalance/littlebalance';
import './usdwithdrawal.scss';
import { Success } from '../../common/success/success';
import errorsvg from 'assets/error-2.svg';
import { vestireward } from '../../common/vestireward/vestireward';
import axios from 'axios';
import { Comptransaction } from '../../common/completetransaction/comptransaction';
import { Checkbox } from 'components/common/inputs/checkbox';
import api from 'appRedux/api';
import { Singleselect } from 'components/common/inputs/singleselect';
import { Backcontinue } from 'components/common/backcontinue/backcontinue';
import Inputfloat from 'components/common/inputs/inputfloat';
import { RadioOption } from 'components/common/radiobutton/radiobutton';
import {
  openNotificationWithIcon,
  openNotificationWithIconErr,
} from 'appRedux/actions/Common';
import Loader from 'components/Loader';

export const Usdwithdrawal = props => {
  const [state, setState] = useState({
    amountCents: '',
    routing_number: '',
    bank_name: '',
    account_number: '',
    billing_address: '',
    account_holder_name: '',
    country: 'US',
    postalCode: '',
    district: '',
    city: '',
    bank_city: '',
    bank_state: '',
    bank_zip: '',
    bank_address: '',
  });
  const [type, setType] = useState();
  // eslint-disable-next-line
  const [loading, setLoading] = useState(true);
  const [pin, setPin] = useState('');
  const [bank, setBank] = useState('');
  const [err, setErr] = useState('');
  const [step, setStep] = useState(0);
  const [check, setCheck] = useState(false);
  const [states, setStates] = useState();
  const [btn, setButton] = useState('');
  const [iban, setIban] = useState([]);
  const [active, setActive] = useState();
  const [country, setCountry] = useState({
    value: 'US',
    label: 'united states',
  });
  const [countries, setCountries] = useState();
  var bankType = value => {
    // var value = e.target.value
    setType(value);
  };

  var setInputs = e => {
    var name = e.target.name;
    var value = e.target.value;

    if (name === 'bank_address' || name === 'billing_address') {
      value.length > 35
        ? setState({ ...state, [name]: value })
        : setState({ ...state, [name]: value });
    } else {
      setState({ ...state, [name]: value });
    }
  };

  var setAmount = e => {
    // var name = e.target.name;
    var value = parseFloat(
      e.target.value
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        .replace(/,/g, ''),
    ).toLocaleString('en-US');
    e.target.validity.valid && setState({ ...state, amountCents: value });
  };

  var setTransactionPin = value => {
    setPin(value);
  };

  var selectAccount = value => {
    var data = iban[value];
    setActive(value);
    setState({
      ...state,
      account_holder_name: data.accountHolderName,
      account_number: data.accountNumber,
      bank_address: data.bankAddress,
      bank_name: data.bankName,
      bank_city: data.bankCity,
      country: !data.country
        ? ''
        : {
            value: data.country,
            label: data.country,
          },
      bank_state: {
        value:
          data.bankState && data.bankState === 'Texas' ? 'TX' : data.bankState,
        label: data.bankState,
      },
      district: {
        value:
          data.district && data.district === 'Texas' ? 'TX' : data.district,
        label: data.district,
      },
      routing_number: data.routingNumber,
      city: data.city,
      billing_address: data.billingAddress,
      postalCode: data.postalCode,
      bank_zip: data.bankZip,
    });
  };

  var handleState = value => {
    setState({ ...state, district: value });
  };
  var handleCountry = value => {
    setCountry(value);
  };

  var handleBankState = value => {
    // console.log(value)
    setState({ ...state, bank_state: value });
  };

  const verifyBank = e => {
    e.preventDefault();
    setButton('Verifying...');
    axios
      .get(
        `https://www.routingnumbers.info/api/data.json?rn=${state.routing_number}`,
      )
      .then(res => {
        console.log(res.data);
        setBank(res.data);
        setButton('');
      });
  };

  const remove = () => {
    setState({
      rounting_number: '',
      account_number: '',
      amountCents: '',
      billing_address: '',
    });
    setPin('');
    setBank('');
  };

  const Finalize = e => {
    // e.preventDefault();
    props.onSubmit(
      {
        ...state,
        district: state.district.value,
        swift_code: state.routing_number,
        bic_code: state.routing_number,
        bank_state: state.bank_state.value,
        country: country.value,
        amountCents: state.amountCents.replace(/,/g, '') * 100,
        transactionPin: pin,
      },
      setStep,
      setButton,
      setErr,
      type,
    );
    //    addBank();
  };
  const getBanks = () => {
    api
      .get('user/IBAN/banks')
      .then(res => {
        setIban(res.data.data.filter(item => item.userId === props.userId));
        setLoading(false);
      })
      .catch(() => {
        console.log('errro');
        setLoading(false);
      });
  };
  const addBank = () => {
    var newState = Object.fromEntries(Object.entries(state).slice(1, 14));
    console.log(newState);
    // delete newState.bank_name;

    api
      .post('/user/addUSDbanks', {
        ...newState,
        currency: 'USD_CENTS',
        district: state.district.value,
        bank_state: state.bank_state.value,
        country: country.value,
      })
      .then(res => {
        openNotificationWithIcon(res.data.message, 'Add Bank', 'success');
        moveUp();
      })
      .catch(err => {
        openNotificationWithIconErr(err.data.message, 'Add bank', 'error');
      });
  };
  const deleteBank = id => {
    api
      .delete(`deleteBankDetailsById/${id}`)
      .then(res => {
        openNotificationWithIcon(res.data.message, 'Bank removal', 'success');
        getBanks();
      })
      .catch(error => {
        openNotificationWithIconErr(
          error.response.data.message,
          'Bank removal',
          'error',
        );
      });
  };
  const stepUp = () => {
    setStep(1);
  };
  var getStates = () => {
    api
      .post('https://countriesnow.space/api/v0.1/countries/states', {
        country: country.label,
      })
      .then(response => {
        var options = (response.data.data.states ?? []).map((item, index) => ({
          value: item.state_code,
          label: item.name,
        }));
        setStates(options);
      })
      .catch(err => {
        console.log(err);
      });
  };
  var getCountries = () => {
    api
      .get('https://restcountries.com/v3.1/all')
      .then(res => {
        // console.log(res.data)

        var options = (res.data ?? []).map((item, index) => ({
          label: item.name.common,
          value: item.cca2,
        }));
        console.log([...options]);
        setCountries([...options]);
        setLoading(false);
      })
      .catch(err => err);
  };
  const moveUp = () => {
    setStep(7);
    remove();
  };

  useEffect(() => {
    getBanks();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getStates();
    getCountries();
    // eslint-disable-next-line
  }, [country]);

  const _render = () => {
    switch (step) {
      case 0:
        return (
          <Firststep
            type={type}
            bankType={bankType}
            setStep={setStep}
            step={step}
            iban={iban}
            active={active}
            selectAccount={selectAccount}
            deleteBank={deleteBank}
            countries={countries}
            country={country}
            handleCountry={handleCountry}
          />
        );
      case 1:
        return (
          <Withform
            type={type}
            state={state}
            setInputs={setInputs}
            Finalize={Finalize}
            verify={verifyBank}
            balance={props.balance}
            bank={bank}
            setStep={setStep}
            check={check}
            setCheck={setCheck}
            setAmount={setAmount}
            btn={btn}
          />
        );
      case 2:
        return (
          <Accountholder
            state={state}
            setInputs={setInputs}
            handleState={handleState}
            balance={props.balance}
            setStep={setStep}
            states={states}
          />
        );
      case 3:
        return (
          <Bankaddress
            state={state}
            setInputs={setInputs}
            handleBankState={handleBankState}
            balance={props.balance}
            setStep={setStep}
            states={states}
          />
        );
      case 4:
        return (
          <>
            <Titlesubtitle
              steps="Step 5 of 5"
              title="Transaction PIN"
              subtitle="Enter your transaction pin to finalize."
            />
            {state.amountCents && (
              <Smallbox>
                <p>
                  You are about to withdraw{' '}
                  <strong>
                    {' '}
                    $
                    {state.amountCents
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </strong>{' '}
                  to <strong>{state.account_holder_name}</strong> from your
                  vesti USD Wallet to bank routing number of{' '}
                  <strong> {state.routing_number}</strong> , account number of{' '}
                  <strong>
                    {' '}
                    {state.account_number}{' '}
                    {bank.code === 200 && bank.customer_name}
                  </strong>
                  , this includes a transaction charge of 1.3%
                  <strong>
                    {' '}
                    of $
                    {Math.ceil(
                      parseFloat(state.amountCents.replace(/,/g, '') * 0.013),
                    ).toLocaleString('en-US')}{' '}
                  </strong>
                  {/* <strong> of {state.amountCents} ≈ {Math.floor((parseFloat(state.amountCents.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").replace(/,/g, ''))  - (state.amountCents.replace(/,/g, '') * 0.013))).toLocaleString('en-US')} </strong> */}
                </p>
              </Smallbox>
            )}
            <Comptransaction
              setPin={setTransactionPin}
              loading={loading}
              goBack={() => setStep(3)}
              btn={btn !== '' ? btn : `Initiate Withdrawal`}
              onFinish={Finalize}
              len={4}
              lower={true}
            >
              <Backcontinue
                text="Continue"
                goBack={() => setStep(3)}
                // continue = {goContinue}
              >
                <button
                  className="backcontinue__continue"
                  type="submit"
                  disabled={pin ? (btn === '' ? false : true) : true}
                >
                  {btn !== '' ? btn : `Initiate Withdrawal`}
                </button>
              </Backcontinue>
            </Comptransaction>
          </>
        );

      case 5:
        // active  ? iban[active].accountHolderName === state.account_holder_name
        return iban.length > 0 ? (
          iban.some(
            user => user.accountHolderName === state.account_holder_name,
          ) ? (
            <Success
              title="USD Withdrawal Successful"
              subtitle={` Your USD withdrawal of $${state.amountCents} was successful, this transaction might take some minutes to reflect.`}
              button="Okay, Thank You"
              onClick={moveUp}
            />
          ) : (
            <Success
              title="USD Withdrawal Successful"
              subtitle={` Your USD withdrawal of $${state.amountCents} was successful, this transaction might take some minutes to reflect.`}
              button="Add as Beneficairy"
              onClick={() => addBank()}
              secondBtn={() => moveUp()}
              secondBtntext={'Okay, Thank You'}
            />
          )
        ) : (
          <Success
            title="USD Withdrawal Successful"
            subtitle={` Your USD withdrawal of $${state.amountCents} was successful, this transaction might take some minutes to reflect.`}
            button="Okay, Thank You"
            onClick={moveUp}
            secondBtn={() => addBank()}
            secondBtntext={'Add as Beneficairy'}
          />
        );
      case 6:
        return (
          <Success
            image={errorsvg}
            type="error"
            title="USD Withdrawal Failed"
            subtitle={err}
            button="Try Again"
            onClick={stepUp}
          />
        );
      case 7:
        return (
          <vestireward amount="5,000">
            <p>
              <strong> Claim ₦5,000 </strong> when you refer someone who wants
              to have a <strong>USD virtual account.</strong>
            </p>
          </vestireward>
        );
      default:
        return <></>;
    }
  };

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  } else {
    return _render();
  }
};

const Firststep = props => {
  return (
    <section className="firststep">
      <Titlesubtitle
        steps={`Step 1 of 5`}
        title="Type of Account"
        subtitle="Is it an Internatioanl Account or USA Account ?"
      />

      <div className="firststep__bottom">
        <p className="firststep__header">Is it a USA account ?</p>
        <div className="firststep__radios">
          <RadioOption
            changed={props.bankType}
            id="1"
            isSelected={props.type === 'Yes, A USA account'}
            label="Yes, A USA account"
            sublabel="The account is a USA bank account."
            value="Yes, A USA account"
          />
          <div className="mb-2"></div>
          <RadioOption
            changed={props.bankType}
            id="2"
            isSelected={props.type === 'No, An International account'}
            label="No, An International account (BIC Code)"
            sublabel="I have the BIC Code Of the Bank"
            value="No, An International account"
          />
          <div className="mb-2"></div>
          <RadioOption
            changed={props.bankType}
            id="3"
            isSelected={props.type === 'No, I Have Swift Code'}
            label="No, An International account (Swift Code)"
            sublabel="I have the Swift Code Of the Bank"
            value="No, I Have Swift Code"
          />
        </div>
        <div className="mb-2"></div>
        {(props.type === 'No, An International account' ||
          props.type === 'No, I Have Swift Code') && (
          <Singleselect
            value={props.country}
            options={props.countries}
            onChange={props.handleCountry}
            placeholder="What country are you withdrawing to ?"
          />
        )}
      </div>
      <div className="mb-4"></div>
      {props.iban.length > 0 && (
        <div className="firststep__ben">
          <p className="firststep__header">Beneficiaries</p>
          <div className="firststep__row">
            {props.iban.map((item, index) => (
              <div
                className={`firststep__ben__row__account ${props.active ===
                  index && ' --active'}`}
                key={index}
                onClick={() => props.selectAccount(index)}
              >
                {props.active === index && <i class="fas fa-check-circle" />}
                {item.accountHolderName}{' '}
                <i
                  class="fas fa-times"
                  onClick={() => props.deleteBank(item.id)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mb-4"></div>
      <button
        className="waitlist__firststep__button"
        disabled={props.type ? false : true}
        onClick={() =>
          props.type.includes('Yes') ? props.setStep(1) : props.setStep(1)
        }
      >
        Continue
      </button>
    </section>
  );
};

const Withform = props => {
  var fee = 0.013 * props.state.amountCents.toString().replace(/,/g, '');
  var youGet = Math.floor(
    parseFloat(
      props.state.amountCents
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        .replace(/,/g, ''),
    ) - fee,
  ).toLocaleString('en-US');

  var ParseFloat = (str, val) => {
    // str = str.toString();
    str = str.slice(0, str.indexOf('.') + val + 1);
    return Number(str);
  };
  var final = youGet.includes('.')
    ? ParseFloat(youGet.toString().replace(/,/g, ''), 2).toLocaleString('en-US')
    : youGet;
  return (
    <div className="usdwithdrawal">
      {/* {typeof youGet.toString().replace(/,/g, '')}
            {ParseFloat(youGet.toString().replace(/,/g, ''), 2)} */}
      <Littlebalance title="USD Balance" amount={props.balance} currency="$" />
      <Titlesubtitle
        steps="Step 2 of 5"
        title="USD Withdrawal"
        subtitle="Fill in these inputs to withdraw USD from your wallet"
      />
      {/* {props.state.amountCents.replace(/,/g, '')} */}
      {/* <p className="usdwithdrawal__get">Limit = $5,000</p> */}
      <form
        onSubmit={e =>
          props.check === true
            ? props.setStep(2)
            : props.bank && props.bank.code === 200
            ? props.setStep(2)
            : props.verify(e)
        }
        className="form"
      >
        <Inputfloat
          type="text"
          name="amountCents"
          label="Amount"
          // value={props.state.amountCents}
          value={
            props.state.amountCents === 'NaN'
              ? 0
              : props.state.amountCents.toLocaleString('en-US')
          }
          disabled={false}
          placeholder="Enter amount to withdraw"
          onChange={props.setAmount}
          pattern="[0-9,.]*"
          error={
            parseInt(props.state.amountCents.replace(/,/g, '')) <= 5 &&
            'amount should not be less than 6'
          }
        >
          {parseInt(props.state.amountCents.replace(/,/g, '')) > 5 &&
            props.state.amountCents !== 'NaN' && youGet !== 'NaN' && (
              <p className="fundcard__get">
                {' '}
                {`1.3% fee ≈ you get $${final}`}{' '}
              </p>
            )}
        </Inputfloat>
        <Inputfloat
          label="Bank Name"
          type="text"
          name="bank_name"
          value={props.state.bank_name}
          disabled={false}
          placeholder="Recepient Bank Name"
          // error ={!props.state.bank_name && 'Field shoud not be empty'}
          onChange={props.setInputs}
        />
        <div className="form__numbers">
          {props.type === 'No, I Have Swift Code' && (
            <Inputfloat
              label={'Swift Code'}
              type={'text'}
              name="routing_number"
              value={props.state.routing_number}
              disabled={false}
              placeholder={'Swift Code'}
              onChange={props.setInputs}
            />
          )}
          {props.type === 'No, An International account' && (
            <Inputfloat
              label={'BIC Number'}
              type={'text'}
              name="routing_number"
              value={props.state.routing_number}
              disabled={false}
              placeholder={'Bank BIC code'}
              onChange={props.setInputs}
            />
          )}
          {props.type === 'Yes, A USA account' && (
            <Inputfloat
              label={'ROUTING NUMBER'}
              type={'number'}
              name="routing_number"
              value={props.state.routing_number}
              disabled={false}
              placeholder={'Bank Routing number'}
              onChange={props.setInputs}
            />
          )}

          <Inputfloat
            label="Account number"
            type="number"
            name="account_number"
            value={props.state.account_number}
            disabled={false}
            placeholder="Bank account number"
            onChange={props.setInputs}
            // error ={!props.state.account_number && 'Field shoud not be empty'}
          />
        </div>

        <Inputfloat
          label="Billing address"
          type="text"
          name="billing_address"
          value={props.state.billing_address}
          disabled={false}
          placeholder="Enter your billing address"
          onChange={props.setInputs}
          error={
            props.state.billing_address.length > 35 &&
            'This is more than 35 characters'
          }
        />
        <div className="form__check">
          <Checkbox
            check={props.check}
            setCheck={props.setCheck}
            name="usdcheck"
            title="I do not want to verify routing number, NetWebPay willnot be liable for any issues after transfering your funds."
          />
          {/* {props.check === true && <Shortinfo
                        subject="Warning - NetWebPay willnot be liable for any issues after transfering your funds."
                    />} */}
        </div>

        {props.bank ? (
          props.bank.code === 200 ? (
            <span
              className={`check ${props.bank.code === 200 ? ' --success' : ''}`}
            >
              <p>Bank Name</p> <p>{props.bank.customer_name}</p>
            </span>
          ) : (
            <span
              className={`check ${props.bank.code !== 200 ? ' --error' : ''}`}
            >
              <p>Error</p>{' '}
              <p style={{ color: 'red' }}>
                {'Error Verifying bank routing number'}
              </p>
            </span>
          )
        ) : (
          <></>
        )}

        <Backcontinue text="Continue" goBack={() => props.setStep(0)}>
          {props.check === true ? (
            <button
              className="form__button"
              disabled={
                Object.values(props.state)
                  .slice(0, 5)
                  .every(value => !!value) &&
                props.state.billing_address.length <= 35 &&
                parseInt(props.state.amountCents.replace(/,/g, '')) > 5
                  ? false
                  : true
              }
            >
              {' '}
              Continue
            </button>
          ) : props.bank && props.bank.code === 200 ? (
            <button
              className="form__button"
              disabled={
                Object.values(props.state)
                  .slice(0, 5)
                  .every(value => !!value) &&
                props.state.billing_address.length <= 35 &&
                parseInt(props.state.amountCents.replace(/,/g, '')) > 5
                  ? false
                  : true
              }
            >
              {' '}
              Continue
            </button>
          ) : (
            <button
              className="form__button"
              disabled={
                Object.values(props.state)
                  .slice(0, 5)
                  .every(value => !!value)
                  ? props.btn === ''
                    ? false
                    : true
                  : true
              }
            >
              {' '}
              {props.btn === '' ? 'Verify Bank' : props.btn}
            </button>
          )}
        </Backcontinue>

        {/* {props.bank ? props.bank.code === 200 ? <span><p>Bank Name</p> <p>{props.bank.customer_name}</p></span> : <span><p>Bank Name</p> <p style={{color:'red'}}>{props.bank.message}</p></span> : <></>} */}
        {/* {props.bank && props.bank.code === 200 ? <button className="usdwithdrawal__form__button" disabled={Object.values(props.state).every(value => !!value) ? false : true}> Proceed To Enter Pin</button>
               :  <button className="usdwithdrawal__form__button" disabled={Object.values(props.state).every(value => !!value) ? false : true}> Verify Bank</button>} */}
      </form>
    </div>
  );
};

const Accountholder = props => {
  return (
    <div className="usdwithdrawal">
      <Littlebalance title="USD Balance" amount={props.balance} currency="$" />
      <Titlesubtitle
        steps="Step 3 of 5"
        title="Account Holder Details"
        subtitle={`Fill in the info of the account holder ${props.state.account_number}`}
      />

      <form className="form">
        <Inputfloat
          label="Account holder name"
          type="text"
          name="account_holder_name"
          value={props.state.account_holder_name}
          disabled={false}
          placeholder="Account holder full name"
          onChange={props.setInputs}
        />
        <div className="form__city">
          <Inputfloat
            label="City"
            type="text"
            name="city"
            value={props.state.city}
            disabled={false}
            placeholder="Enter your city e.g Dallas"
            onChange={props.setInputs}
          />
          <Singleselect
            value={props.state.district}
            options={props.states}
            onChange={props.handleState}
            placeholder="Select district"
          />
        </div>

        <Inputfloat
          label="Postal code"
          type="number"
          name="postalCode"
          value={props.state.postalCode}
          disabled={false}
          placeholder="Enter the Postal Code"
          onChange={props.setInputs}
        />

        <Backcontinue
          text="Continue"
          goBack={() => props.setStep(1)}
          // continue = {goContinue}
        >
          <button
            className="backcontinue__continue"
            disabled={
              Object.values(props.state)
                .slice(5, 9)
                .every(value => !!value)
                ? false
                : true
            }
            onClick={() => props.setStep(3)}
          >
            Continue
          </button>
        </Backcontinue>
      </form>
    </div>
  );
};

const Bankaddress = props => {
  return (
    <div className="usdwithdrawal">
      <Littlebalance title="USD Balance" amount={props.balance} currency="$" />
      <Titlesubtitle
        steps="Step 4 of 5"
        title="Bank Address"
        subtitle="Fill in these inputs about your bank details"
      />

      <form className="form">
        <Singleselect
          value={props.state.bank_state}
          options={props.states}
          onChange={props.handleBankState}
          placeholder="Select bank district"
        />
        <div className="form__address">
          <Inputfloat
            label="Bank city"
            type="text"
            name="bank_city"
            value={props.state.bank_city}
            disabled={false}
            placeholder="Enter your bank city"
            onChange={props.setInputs}
          />
          <Inputfloat
            label="Bank postal code"
            type="number"
            name="bank_zip"
            value={props.state.bank_zip}
            disabled={false}
            placeholder="Enter your bank postal code"
            onChange={props.setInputs}
          />
        </div>

        <Inputfloat
          label="Bank address"
          type="text"
          name="bank_address"
          value={props.state.bank_address}
          disabled={false}
          placeholder="Enter your bank address"
          onChange={props.setInputs}
          error={
            props.state.bank_address.length > 35 &&
            'This is more than 35 characters'
          }
        ></Inputfloat>

        <Backcontinue
          text="Continue"
          goBack={() => props.setStep(2)}
          // continue = {goContinue}
        >
          <button
            className="backcontinue__continue"
            disabled={
              Object.values(props.state)
                .slice(10, 14)
                .every(value => !!value)
                ? false
                : true
            }
            onClick={() => props.setStep(4)}
          >
            Continue to input pin
          </button>
        </Backcontinue>
      </form>
    </div>
  );
};
