import React, { useEffect, useState } from 'react';
import { Newprompt } from 'components/common/prompt/prompt';
import { Titlesubtitle } from 'components/common/titlesubtitle/titlesubtitle';
import vcardprompt from 'assets/vcardprompt.svg';
import { Listcheck, ListNocheck } from 'components/common/listcheck/listcheck';
import { Platformbutton } from 'components/common/button/button';
import { RadioOption } from 'components/common/radiobutton/radiobutton';
import Inputfloat from 'components/common/inputs/inputfloat';
import { Singleselect } from 'components/common/inputs/singleselect';
import ModernDatepicker from 'react-modern-datepicker';
import { Success } from 'components/common/success/success';
import { connect } from 'react-redux';
import {
  globalGengCard,
  requestProvidusAccount,
} from 'appRedux/actions/waitlist';
import { Backcontinue } from 'components/common/backcontinue/backcontinue';
import errorsvg from '../../assets/newerror.svg';
import { useStep } from 'helpers/hooks';

import { fetchAllStatesNoLoad } from 'appRedux/actions/Common';
import { navigate } from '@reach/router';
import './virtualcard.scss';
import { Shortinfonew } from 'components/common/shortinfo/shortinfo';
// import { AlertInfo } from "components/common/alertboxes/alertboxes";
const Globalgeng = props => {
  const { step, previousStep, nextStep, setStep } = useStep(0);
  const [state, setState] = useState({
    deliveryType: '',
    otherName: '',
    dob: new Date(),
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'Nigeria',
  });

  var handleSelect = (name, value) => {
    setState({ ...state, [name]: value });
  };

  var handleInput = e => {
    var name = e.target.name;
    var value = e.target.value;
    setState({ ...state, [name]: value });
  };
  const __renderTitle = () => {
    switch (step) {
      case 1:
        return 'Delivery Option';
      case 2:
        return 'vesti GlobalGeng Card';
      default:
        return '';
    }
  };

  const __renderSubt = () => {
    switch (step) {
      case 1:
        return 'Choose your preferred means of delivery';
      case 2:
        return `Fill in the fields below to request for your physical
                card and have it delivered to you.`;
      default:
        return '';
    }
  };
  // {email:userData.email}
  const __rendersteps = () => {
    switch (step) {
      case 0:
        return (
          <Stepone
            previous={previousStep}
            setStep={setStep}
            continue={nextStep}
            state={state}
            setState={setState}
            setInput={handleInput}
          />
        );
      case 1:
        return (
          <Steptwo
            previous={previousStep}
            setStep={setStep}
            continue={nextStep}
            state={state}
            states={props.states}
            setState={setState}
            handleSelect={handleSelect}
            setInput={handleInput}
            lagRate={props.lagRate}
            outRate={props.outRate}
          />
        );
      case 2:
        return (
          <Stepthree
            previous={previousStep}
            setStep={setStep}
            continue={nextStep}
            state={state}
            setState={setState}
            handleSelect={handleSelect}
            outRate={props.outRate}
            setInput={handleInput}
            states={props.states}
            lagRate={props.lagRate}
            loading={props.loading}
            request={props.globalGengCard}
          />
        );

      case 3:
        return (
          <Success
            title="Successful"
            subtitle={props.message}
            button="Okay, Thank You"
          />
        );
      case 4:
        return (
          <Success
            type="error"
            title="Failed"
            subtitle={props.message}
            button="Try Again"
            onClick={() => {
              props.closeModal();
              setTimeout(() => {
                navigate('/bank');
              }, 200);
            }}
          />
        );
      case 5:
        return (
          <Success
            image={errorsvg}
            type="error"
            title="Request For Account Number"
            subtitle="You do not have a NetWebPay-Providus account number, click the 
                    button below to request for"
            button="Try Again"
            onClick={() => {
              props.requestProvidusAccount(
                {
                  email: props.userdata.email,
                },
                props.closeModal,
              );
            }}
          />
        );
      default:
        return <></>;
    }
  };

  useEffect(() => {
    props.fetchAllStatesNoLoad({ country: 'nigeria' });

    // eslint-disable-next-line
  }, []);
  return (
    <div className="globalgeng">
      {step < 3 && (
        <Titlesubtitle
          steps={`Step ${step + 1} of 3`}
          title={__renderTitle()}
          subtitle={__renderSubt()}
        />
      )}
      <div className="globalgeng__content">{__rendersteps()}</div>
    </div>
  );
};

const Stepone = props => {
  var data = [
    `Card is FREE`,
    // `Card Delivery is not FREE`,
    `Card Delivery is FREE`,
    // `Card Delivery ranges from ₦1,800 within Lagos to ₦3,500 outside Lagos.`,
    `Kindly Ensure your NetWebPay Account FullName Matches the Name on the KYC Document Submitted for Creation.`,
    `GlobalGeng card takes 10-20 days to process.`,
  ];

  var note = ['You will not be charged any issuing fee'];
  return (
    <Newprompt img={vcardprompt}>
      <Titlesubtitle
        title="GlobalGeng Card"
        subtitle="Request for your Elhay CryptocurrencyGeng Physical Naira card today."
      />

      <div className="stepone__column">
        <Listcheck data={data} />
        <>
          <p>Note:</p>
          <ListNocheck data={note} />
        </>
      </div>

      <Platformbutton
        type="normal"
        name="Proceed"
        click={() => props.continue()}
      />
    </Newprompt>
  );
};

const Steptwo = props => {
  var handleDelivery = value => {
    props.setState({ ...props.state, deliveryType: value });
  };
  return (
    <div className="globalgeng__steptwo">
      <div className="globalgeng__radio">
        <RadioOption
          changed={handleDelivery}
          id="1"
          isSelected={props.state.deliveryType === 'HOME-DELIVERY'}
          label="Home delivery"
          sublabel="Get your GlobalGeng card delivered directly
                    to your home"
          value="HOME-DELIVERY"
        />
        {/* {props.state.deliveryType === "HOME-DELIVERY"  && <Shortinfonew  >
                    <p>Card Delivery ranges from ₦{props.lagRate.toLocaleString('en-us')} within Lagos to ₦{props.outRate.toLocaleString('en-us')} outside Lagos.</p>
                </Shortinfonew>} */}

        <div className="mb-2"></div>
        <RadioOption
          changed={handleDelivery}
          id="2"
          isSelected={props.state.deliveryType === 'PICK-UP'}
          label="Pickup (Lagos residents only)"
          sublabel="Pickup your GlobalGeng card at a specified pickup location."
          value="PICK-UP"
        />
      </div>

      <Backcontinue goBack={() => props.previous()}>
        <Platformbutton
          type="normal"
          name="Continue"
          disabled={!props.state.deliveryType ? true : false}
          click={() => props.continue()}
        />
      </Backcontinue>
    </div>
  );
};

const Stepthree = props => {
  var { otherName, postalCode, address, city, state } = props.state;

  return (
    <div className="globalgeng__stepthree">
      <div className="globalgeng__column">
        <Inputfloat
          type="text"
          label="OTHER NAME"
          name="otherName"
          placeholder="What is your other name"
          value={props.state.otherName}
          disabled={false}
          onChange={props.setInput}
        />
        <div style={{ position: 'relative', zIndex: '99998', width: '100%' }}>
          <p className="mb-2">Date of Birth</p>
          <ModernDatepicker
            date={new Date(props.state.dob)}
            className="dob"
            format={'YYYY-MM-DD'}
            showBorder
            onChange={date =>
              props.setState({
                ...props.state,
                dob: new Date(date).toISOString().slice(0, 10),
              })
            }
            placeholder={'Select your date of birth'}
            primaryColor={'#000000'}
          />
        </div>

        <div className="globalgeng__row">
          <Inputfloat
            type="text"
            label="CITY"
            name="city"
            placeholder="What city are you located"
            value={props.state.city}
            disabled={false}
            onChange={props.setInput}
          />
          <Singleselect
            value={props.state.state}
            options={props.states}
            onChange={value => props.handleSelect('state', value)}
            placeholder="State of residence"
          />
        </div>
        {props.state.state && (
          <Shortinfonew>
            <p>
              {props.state.state.label === 'lagos state'
                ? `Deliveries within lagos costs a total of ₦${props.lagRate.toLocaleString(
                    'en-us',
                  )}`
                : `Deliveries within ${
                    props.state.state.label
                  } costs a total of ₦${props.outRate.toLocaleString('en-us')}`}
            </p>
          </Shortinfonew>
        )
        // <AlertInfo
        //     body ={props.state.state.label === 'lagos state'? `Deliveries within lagos costs a total of ₦${props.lagRate.toLocaleString('en-us')}`:`Deliveries within ${props.state.state.label} costs a total of ₦${props.outRate.toLocaleString('en-us')}`}
        // />
        }
        <Inputfloat
          type="text"
          label="HOME ADDRESS"
          name="address"
          placeholder="What is your current address"
          value={props.state.address}
          disabled={false}
          onChange={props.setInput}
        />
        <Inputfloat
          type="number"
          label="POSTAL CODE"
          name="postalCode"
          placeholder="What is your postal code"
          value={props.state.postalCode}
          disabled={false}
          onChange={props.setInput}
        />
      </div>

      <Backcontinue goBack={() => props.previous()}>
        <Platformbutton
          type="normal"
          name="Request Physical Card"
          disabled={
            !address || !postalCode || !address || !city || !state || !otherName
              ? true
              : false
          }
          click={() =>
            props.request(
              {
                ...props.state,
                state: props.state.state.label,
                amountInKobo:
                  props.state.state.label === 'lagos'
                    ? props.lagRate * 100
                    : props.outRate * 100,
              },
              props.setStep,
            )
          }
        />
      </Backcontinue>
    </div>
  );
};

const mapStateToProps = ({ waitlist, common }) => {
  const { message, loading } = waitlist;
  const { states } = common;
  return {
    message,
    loading,
    states,
  };
};
const mapDispatchToProps = {
  requestProvidusAccount,
  globalGengCard,

  fetchAllStatesNoLoad,
};

export default connect(mapStateToProps, mapDispatchToProps)(Globalgeng);
