import React, { useEffect, useState } from 'react';
import platinum from '../../assets/platinum.svg';
import standard from '../../assets/standard.svg';
import exclusive from '../../assets/exclusive.svg';
import sorry from '../../assets/sorry.svg';
import { Toggle } from 'components/toggle/toggle';
import DividedPinInput from 'components/common/DividedPinInput';
import { Form } from 'antd';
import Loader from 'components/Loader';
import api from 'appRedux/api';
import {
  openNotificationWithIcon,
  openNotificationWithIconErr,
} from 'appRedux/actions/Common';
import { errorMessage } from 'helpers/utils';
import { Success } from 'components/common/success/success';
import { Success as Prompt } from 'components/common/success/success';
import './membership.scss';
import { Memberprompt } from './memberprompt';
export const Membership = props => {
  const [step, setStep] = useState(1);
  const [membertype, setMembership] = useState(0);
  const [toggle, setToggle] = useState(true);
  // const [loading, setLoading] = useState(false)
  const [pin, setPin] = useState('');

  const nextStep = (value = 2) => {
    setStep(value);
  };

  const handleToggle = () => setToggle(!toggle);

  const data = [
    {
      image: standard,
      type: 'standard',

      title: 'vesti Economy Membership',
      subtitle: 'Ready to move',
      button: 'Continue with Economy Membership',
      amount: {
        monthly: 'Free',
        yearly: 'Free',
      },
      benefits: [
        'Free Immigration Account (no monthly charges)',
        'Free Feed on Advice',
        'Join Free Groups',
        'Access to Free Webinars',
        'Access to some Webinar Replay',
        'Email Support (normal priority)',
      ],
      save: '',
      month: '',
    },
    {
      image: platinum,
      plan: 'PLATINUM_USER',
      title: 'vesti Business Membership',
      subtitle: 'Quick Mover',
      button: 'Continue with Business Membership ',
      amount: {
        monthly: '5,000',
        yearly: '40,000',
      },
      benefits: [
        'Free 30 Minutes Expert Immigration planning Session',
        'One year access to an Exclusive support network',
        'All year access to ask unlimited questions in “Advice”',
        ' Access to All Webinar Replays',
        ' Free access to Relocation playbook',
        'Priority Email Support',
      ],
      save: '20,000',
      month: 'MONTHLY (cancel anytime)',
    },
    {
      image: exclusive,
      vote: 'Popular',
      plan: 'EXCLUSIVE_USER',
      title: 'vesti First Class Membership',
      subtitle: 'Serious Mover',
      button: 'Continue with First Class Membership',
      amount: {
        monthly: '10,000',
        yearly: '100,000',
      },
      benefits: [
        'Exclusive Support with an assigned mentor',
        'Free Documents and templates',
        'Worksheets, Reminders and Accountability Sessions',
        'Reduced cost for Extended clarity sessions',
        'Discounted costs for trainings and events',
        '20% Off IELTS and French Coaching Class',
      ],
      save: '20,000',
      month: 'MONTHLY (cancel anytime)',
    },
  ];

  const handleCompleteTransaction = async values => {
    var formdata = new FormData();
    formdata.append('walletToCharge', 'NGN_KOBO');
    formdata.append('frequency', toggle ? 'YEARLY' : 'MONTHLY');
    formdata.append('plan', data[membertype].plan);
    formdata.append('transactionPin', pin);
    // values.walletToCharge = 'NGN_KOBO';
    // values.frequency = frequency;
    // values.plan = plan;

    const url = `/userPlan/startSubscription`;

    try {
      const res = await api.post(url, formdata);
      console.log({ ...res });
      const { data } = res;
      openNotificationWithIcon(data.message, 'Subscription Payment', 'success');

      setTimeout(() => {
        setStep(4);
      }, 1500);

      //   setShowModal(false);
    } catch (error) {
      openNotificationWithIconErr(
        errorMessage(error),
        'Subscription Payment',
        'error',
      );
    }
  };

  useEffect(() => {
    if (props.feeds === 'feeds') {
      setStep(0);
    }
    // eslint-disable-next-line
  }, []);
  switch (step) {
    case 0:
      return <Memberprompt click={nextStep} close={props.close} />;
    case 1:
      return (
        <Prompt
          image={sorry}
          title="Sorry :(, you need to upgrade plan"
          subtitle="Sorry :(,this is not available for Standard vesti, click the button to upgrade membership plan"
          button="Upgrade Plan"
          onClick={nextStep}
        />
      );
    case 2:
      return (
        <>
          <div className="ordercard-top">
            <p>Select Membership Type • 1 of 3</p>
            <p>
              Select the type of Membership plan you want from our varieties of
              options.
            </p>
          </div>
          <Membercard
            nextStep={nextStep}
            setStep={setStep}
            data={data}
            membertype={membertype}
            setMembership={setMembership}
          />
        </>
      );
    case 3:
      return (
        <>
          <div className="ordercard-top">
            <p>Select Membership Type • 2 of 3</p>
            <p>
              Select the type of Membership plan you want from our varieties of
              options.
            </p>
          </div>
          <Singleplan
            nextStep={nextStep}
            data={data}
            membertype={membertype}
            setMembership={setMembership}
            setStep={setStep}
            toggle={toggle}
            handleToggle={handleToggle}
          />
        </>
      );
    case 4:
      return (
        <>
          <div className="ordercard-top">
            <p>Enter your Pin to Upgrade • 3 of 3</p>
            {/* <p>
                            Select the type of Membership plan you want from our 
                            varieties of options.
                        </p> */}
          </div>
          <Finalize
            setStep={setStep}
            pin={pin}
            setPin={setPin}
            handleCompleteTransaction={handleCompleteTransaction}
          />
        </>
      );
    case 5:
      return (
        <Success
          title="Upgrade Successful"
          subtitle={`You successfully upgrade your membership plan to ${data[membertype].title}`}
        />
      );
    default:
      return <>Not Found</>;
  }
};

const Membercard = props => {
  return (
    <div className="selectmembership-container">
      <div className="selectmembership-inner">
        <div className="selectmembership-inner center">
          <img src={props.data[props.membertype].image} alt="Card SVG" />
          <div className="center-controls">
            <div
              className={`control ${props.membertype === 0 ? ' active' : ''}`}
              onClick={() => props.setMembership(0)}
            ></div>
            <div
              className={`control ${props.membertype === 1 ? ' active' : ''}`}
              onClick={() => props.setMembership(1)}
            ></div>
            <div
              className={`control ${props.membertype === 2 ? ' active' : ''}`}
              onClick={() => props.setMembership(2)}
            ></div>
          </div>
        </div>

        <div className="selectmembership-inner description">
          <p>{props.data[props.membertype].title}</p>
          <p>{props.data[props.membertype].subtitle}</p>
        </div>
        <div className="btn-container">
          <div
            type="submit"
            className="btn-left"
            onClick={() => {
              props.setStep(1);
            }}
          >
            Back
          </div>
          <button
            className="selectmembership-button"
            onClick={() => props.nextStep(3)}
          >
            Select Membership <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

const Singleplan = props => {
  return (
    <div className="singleplan-container">
      <div className="singleplan-inner">
        <div className="singleplan-inner top">
          <div className="top-content">
            {props.data[props.membertype].vote ? (
              <p>{props.data[props.membertype].vote}</p>
            ) : (
              <p></p>
            )}
            <p>
              ₦{' '}
              {props.toggle
                ? props.data[props.membertype].amount.yearly
                : props.data[props.membertype].amount.monthly}
            </p>
            {props.toggle ? (
              <p>You save ₦ {props.data[props.membertype].save}</p>
            ) : (
              <p></p>
            )}
            <p>{props.data[props.membertype].title}</p>
            <p>{props.data[props.membertype].subtitle}</p>
          </div>
          <Toggle
            toggle={props.toggle}
            handleToggle={props.handleToggle}
            first="Yearly"
            second="Monthly"
          />
        </div>
        <ul className="singleplan-inner ul">
          {(props.data[props.membertype].benefits ?? []).map((data, index) => (
            <li key={index}>
              <i class="fas fa-check-circle"></i>
              {data}
            </li>
          ))}
        </ul>
        <div className="btn-container">
          <div
            className="btn-left"
            onClick={() => {
              props.setStep(2);
            }}
          >
            Back
          </div>

          {props.data[props.membertype].type === 'standard' ? (
            <button className="singleplan-button" disabled={true}>
              You are already on this plan{' '}
            </button>
          ) : (
            <button
              className="singleplan-button"
              onClick={() => props.nextStep(4)}
            >
              Choose This Plan <i class="fas fa-arrow-right"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const Finalize = props => {
  return (
    <Form onFinish={props.handleCompleteTransaction} style={{ width: '100%' }}>
      <div className="w-100 flex-fill pt-4" style={{ width: '100%' }}>
        <p>Enter Your Transaction PIN</p>
        <DividedPinInput onChange={props.setPin} />
      </div>
      {props.loading ? (
        <Loader />
      ) : (
        <div className="btn-container">
          <div
            type="submit"
            className="btn-left"
            onClick={() => {
              props.setStep(2);
            }}
          >
            Back
          </div>
          <button type="submit" className="btn-right">
            Upgrade Membership Plan
          </button>
        </div>
      )}
    </Form>
  );
};
