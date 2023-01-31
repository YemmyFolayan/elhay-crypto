import React, { useEffect, useState } from 'react';
import { Singleselect } from 'components/common/inputs/singleselect';
import { Titlesubtitle } from 'components/common/titlesubtitle/titlesubtitle';
import { Backcontinue } from 'components/common/backcontinue/backcontinue';
import { Shortinfo } from 'components/common/shortinfo/shortinfo';
import './createstripe.scss';
import pending from '../../assets/pendingreview.svg';
import Inputfloat from 'components/common/inputs/inputfloat';
import { Success } from 'components/common/success/success';
import errorsvg from '../../assets/newerror.svg';
import success from '../../assets/success.svg';
// import { openNotificationWithIcon, openNotificationWithIconErr } from "appRedux/actions/Common"
import { useDispatch } from 'react-redux';
import { createStripeCard, stripeWhitelist } from 'appRedux/actions/waitlist';
import { connect } from 'react-redux';
import Loader from 'components/Loader';
import { fetchAllCountries, fetchAllStates } from 'appRedux/actions/Common';
import { Comptransaction } from 'components/common/completetransaction/comptransaction';
import { Platformbutton } from 'components/common/button/button';
import { Phonenumber } from 'components/common/inputs/phoneinput';

const Createstripe = props => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    currentAddress: '',
    companyName: '',
    reason: '',
    country: '',
    hasCompanyInUs: '',
  });
  const myData = localStorage.getItem('userData');

  const [sdata, setSData] = useState({
    userId: JSON.parse(myData).id,
    cardColor: '',
    cardBrands: 'Visa',
    cardTypes: '',
    cardPin: '',
    country: '',
    postalCode: '',
    billingAddressLine1: '',
    billingAddressCity: '',
    billingAddressState: '',
    billingAddressCountry: '',
    billingAddressPostalCode: '',
    businessName: '',
    phoneNumber: JSON.parse(myData).phoneNumber,
  });
  // eslint-disable-next-line
  const [message, setMessage] = useState('');
  // eslint-disable-next-line
  const [btn, setBtn] = useState('');

  var dispatch = useDispatch();

  var colorOptions = [
    {
      label: 'Black',
      value: 'Black',
    },
    {
      label: 'Blue',
      value: 'Blue',
    },
    {
      label: 'Green',
      value: 'Green',
    },
    {
      label: 'Yellow',
      value: 'Yellow',
    },
    {
      label: 'Purple',
      value: 'Purple',
    },
  ];

  var cardTypes = [
    {
      label: 'Physical',
      value: 'Physical',
    },
    {
      label: 'Virtual',
      value: 'Virtual',
    },
  ];

  const goBack = () => {
    props.setStep(2);
  };

  const goContinue = e => {
    e.preventDefault();
    props.setStep(6);
  };

  var setInput = e => {
    var name = e.target.name;
    var value = e.target.value;
    setSData({ ...sdata, [name]: value });
  };

  var handleSelect = (name, value) => {
    // value = Object.values(value)[1]
    setSData({ ...sdata, [name]: value });
  };

  const openMail = () => {
    window.location.href = `mailto:miragtionloans@wevesti.com`;
  };

  useEffect(() => {
    props.fetchAllStates({ country: sdata.country.label });

    // eslint-disable-next-line
  }, [sdata.country]);

  useEffect(() => {
    props.fetchAllStates({ country: sdata.billingAddressCountry.value });

    // eslint-disable-next-line
  }, [sdata.billingAddressCountry]);
  useEffect(() => {
    props.fetchAllCountries();

    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    // (props.openWait === true && props.approved === false) && setStep(2)
    // setStep(3)
    // alert(props.approved)
    props.approved === null ||
    props.approved === undefined ||
    props.approved === 'NO-APPLICATION' ||
    props.approved === 'NO-APPLICATION' ||
    props.approved === 'NOAPPLICATION'
      ? setStep(2)
      : props.approved === 'APPROVED'
      ? setStep(0)
      : props.approved === 'DECLINED'
      ? setStep(6)
      : props.approved === 'PENDING'
      ? setStep(7)
      : console.log();

    // eslint-disable-next-line
  }, []);

  switch (step) {
    case 0:
      return (
        <Stripecreate
          setInput={setInput}
          data={sdata}
          handleSelect={handleSelect}
          goBack={goBack}
          goContinue={goContinue}
          colorOptions={colorOptions}
          setStep={setStep}
          setData={setSData}
          cardTypes={cardTypes}
          countries={props.countries}
          states={props.states}
          myData={myData}
        />
      );
    case 1:
      return (
        <Stripecreatetwo
          setInput={setInput}
          data={sdata}
          handleSelect={handleSelect}
          goBack={goBack}
          goContinue={goContinue}
          colorOptions={colorOptions}
          setStep={setStep}
          setData={setSData}
          countries={props.countries}
          states={props.states}
        />
      );
    case 2:
      return (
        <Stripewaitlist
          data={data}
          btn={btn}
          setStep={setStep}
          setData={setData}
          dispatch={dispatch}
          countries={props.countries}
          stripeWhitelist={props.stripeWhitelist}
          loading={props.loading}
        />
      );
    case 3:
      return (
        <>
          <Titlesubtitle
            steps={`Step 3 of 3`}
            title={'Set Founders card PIN'}
            subtitle={
              'Set Your PIN to finalize creation of your Founders Card.'
            }
          />

          <Comptransaction
            setPin={value => setSData({ ...sdata, cardPin: value })}
            onFinish={props.Finalize}
            len={5}
            open={false}
            lower={true}
            pin={sdata.cardPin}
            title={`Enter a 5 digits PIN of your choice.`}
          >
            <Backcontinue
              text="Confirm and  Continue"
              goBack={() => props.setStep(1)}
            >
              <Platformbutton
                type="normal"
                name="Finalize"
                disabled={sdata.cardPin.length === 5 ? false : true}
                click={() => props.createStripeCard(sdata, setStep)}
              />
            </Backcontinue>
          </Comptransaction>
        </>
      );

    case 4:
      return (
        <Success
          image={success}
          title={`Founders Card`}
          subtitle={props.message}
          button="Okay, Thank You!"
          onClick={() => props.closeModal()}
        />
      );
    case 5:
      return (
        <Success
          image={errorsvg}
          title={`Founders Card`}
          subtitle={props.message}
          onClick={() => setStep(2)}
          button="Try Again"
          type="error"
        />
      );
    case 6:
      return (
        <Success
          image={errorsvg}
          title={`Founders Card`}
          subtitle={"Sorry your request for the Founder's card was disapproved"}
          onClick={() => setStep(2)}
          button="Try Again"
          type="error"
        />
      );
    case 7:
      return (
        <Success
          image={pending}
          title={`Founders Card`}
          subtitle={
            "Sorry your request for the Founder's Card is pending. If you are yet to get a response after sometime, Please reach out to us on help@wevesti.com"
          }
          onClick={() => openMail()}
          button="help@wevesti.com"
        />
      );
    default:
      return <></>;
  }
};

const Stripecreate = props => {
  const {
    cardColor,
    cardTypes,
    country,
    postalCode,
    businessName,
  } = props.data;
  return (
    <div className="createstripe" style={{ width: '100%' }}>
      <Titlesubtitle
        steps="Step 1 of 3"
        title={`Founders Card`}
        subtitle={`Fill in these fields to create a Virtual card.`}
      />

      <Inputfloat
        type="text"
        label="Business Name"
        name="businessName"
        placeholder="Enter Your Business Name"
        value={props.data.businessName}
        disabled={false}
        onChange={props.setInput}
      />
      <span className="createstripe__phone">
        <Phonenumber
          value={props.data.phoneNumber}
          country={JSON.parse(props.myData).location}
          setValue={value =>
            props.setData({ ...props.data, phoneNumber: value })
          }
        />
      </span>

      {/* <Inputfloat
                type="number"
                label="Phone Number"
                name="phoneNumber"
                placeholder="Enter Your Phone Number"
                value={props.data.phoneNumber}
                disabled={false}
                onChange={props.setInput}
            /> */}
      <div className="createstripe__location">
        <Singleselect
          value={props.data.cardColor}
          options={props.colorOptions}
          onChange={value => props.handleSelect('cardColor', value)}
          placeholder="Select Card Color"
        />
        <Singleselect
          value={props.data.cardTypes}
          options={props.cardTypes}
          onChange={value => props.handleSelect('cardTypes', value)}
          placeholder="Select Card Type"
        />
      </div>
      <div className="createstripe__location">
        <Singleselect
          value={props.data.country}
          options={props.countries}
          onChange={value => props.handleSelect('country', value)}
          placeholder="Select Your Country"
        />

        <Inputfloat
          type="number"
          label="Postal Code"
          name="postalCode"
          placeholder="Postal Code"
          value={props.data.postalCode}
          disabled={false}
          onChange={props.setInput}
        />
      </div>

      <Backcontinue
        text="Confirm and  Continue"
        goBack={() => props.setStep(1)}
      >
        {/* <button className="backcontinue__continue" 
                    disabled={!cardColor || !cardTypes || !country ||  !postalCode || !businessName? true : false } 
                        onClick={(e) => props.setStep(1)}>Continue
                    </button> */}
        <Platformbutton
          name="Continue"
          type="normal"
          click={e => props.setStep(1)}
          disabled={
            !cardColor || !cardTypes || !country || !postalCode || !businessName
              ? true
              : false
          }
        />
      </Backcontinue>
    </div>
  );
};

const Stripecreatetwo = props => {
  const {
    billingAddressLine1,
    billingAddressCity,
    billingAddressState,
    billingAddressCountry,
    billingAddressPostalCode,
  } = props.data;
  return (
    <div className="createstripe" style={{ width: '100%' }}>
      <Titlesubtitle
        steps="Step 2 of 3"
        title={`Billing Address Details`}
        subtitle={`Fill in these fields to create a Founders card.`}
      />

      <Inputfloat
        type="text"
        label="Billing Address"
        name="billingAddressLine1"
        placeholder="Enter Your Billing Address"
        value={props.data.billingAddressLine1}
        disabled={false}
        onChange={props.setInput}
      />
      <div className="createstripe__location">
        <Singleselect
          value={props.data.billingAddressCountry}
          options={props.countries}
          onChange={value => props.handleSelect('billingAddressCountry', value)}
          placeholder="Billing address Country"
        />
        <Singleselect
          value={props.data.billingAddressState}
          options={props.states}
          onChange={value => props.handleSelect('billingAddressState', value)}
          placeholder="Billing address state"
        />
      </div>

      <div className="createstripe__location">
        <Inputfloat
          type="text"
          label="Billing Address City"
          name="billingAddressCity"
          placeholder="Enter Your Business Address City"
          value={props.data.billingAddressCity}
          disabled={false}
          onChange={props.setInput}
        />
        <Inputfloat
          type="number"
          label="Billing Address Postal Code"
          name="billingAddressPostalCode"
          placeholder="Billing Address Postal Code"
          value={props.data.billingAddressPostalCode}
          disabled={false}
          onChange={props.setInput}
        />
      </div>
      <Backcontinue
        text="Confirm and  Continue"
        goBack={() => props.setStep(0)}
      >
        {/* <button className="backcontinue__continue" 
                    disabled={!billingAddressLine1 || !billingAddressCity || !billingAddressState || !billingAddressCountry || !billingAddressPostalCode ? true : false } 
                        onClick={(e) => props.setStep(3)}>Continue to Set PIN
                    </button> */}
        <Platformbutton
          name="Continue to Set PIN"
          type="normal"
          disabled={
            !billingAddressLine1 ||
            !billingAddressCity ||
            !billingAddressState ||
            !billingAddressCountry ||
            !billingAddressPostalCode
              ? true
              : false
          }
          click={e => props.setStep(3)}
        />
      </Backcontinue>
    </div>
  );
};

const Stripewaitlist = props => {
  return (
    <div className="createstripe__waitlist" style={{ width: '100%' }}>
      <Titlesubtitle
        steps="Step 1 of 1"
        title={`Founders Card`}
        subtitle={`Are You an entrepreneur, do you run a business ? then this is for you`}
      />

      <Inputfloat
        type="text"
        label="COMPANY NAME"
        name="companyName"
        placeholder="What is your company name"
        value={props.data.companyName}
        disabled={false}
        onChange={e =>
          props.setData({ ...props.data, companyName: e.target.value })
        }
      />
      <Inputfloat
        type="text"
        label="CURRENT ADDRESS"
        name="currentAddress"
        placeholder="What is your current address"
        value={props.data.currentAddress}
        disabled={false}
        onChange={e =>
          props.setData({ ...props.data, currentAddress: e.target.value })
        }
      />

      <div className="createstripe__location">
        <Singleselect
          value={props.data.country}
          options={props.countries}
          onChange={value => props.setData({ ...props.data, country: value })}
          placeholder="Select Your Country"
        />

        <Singleselect
          value={props.data.hasCompanyInUs}
          options={[
            { value: true, label: 'yes' },
            { value: false, label: 'no' },
          ]}
          onChange={value =>
            props.setData({ ...props.data, hasCompanyInUs: value })
          }
          placeholder="Do you have company in the US ?"
        />
      </div>

      <>
        <Inputfloat
          type="text"
          label="REASON"
          name="reason"
          placeholder="Why do you need one ?"
          value={props.data.reason}
          disabled={false}
          onChange={e =>
            props.setData({ ...props.data, reason: e.target.value })
          }
        />
        <Shortinfo subject="e.g For my cloud services" />
      </>

      {props.loading ? (
        <Loader />
      ) : (
        <button
          className="createstripe__btn"
          disabled={
            Object.values(props.data).every(value => value !== '') &&
            props.btn === ''
              ? false
              : true
          }
          onClick={() =>
            props.stripeWhitelist(
              {
                ...props.data,
                country: props.data.country.label,
                hasCompanyInUs: props.data.hasCompanyInUs.value,
              },
              props.setStep,
            )
          }
        >
          {props.btn ? props.btn : 'Join the Queue'}
        </button>
      )}
    </div>
  );
};

const mapStateToProps = ({ waitlist, common }) => {
  const { message, loading } = waitlist;
  const { countries, states } = common;
  return {
    message,
    loading,
    countries,
    states,
  };
};
const mapDispatchToProps = {
  stripeWhitelist,
  fetchAllCountries,
  fetchAllStates,
  createStripeCard,
};

export default connect(mapStateToProps, mapDispatchToProps)(Createstripe);
