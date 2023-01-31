import { Backcontinue } from 'components/common/backcontinue/backcontinue';
import { Platformbutton } from 'components/common/button/button';
import Inputfloat from 'components/common/inputs/inputfloat';
import RadioButton from 'components/common/radiobutton/radiobutton';
import { Shortinfo } from 'components/common/shortinfo/shortinfo';
import { Success } from 'components/common/success/success';
import { Titlesubtitle } from 'components/common/titlesubtitle/titlesubtitle';
import React, { useState } from 'react';
import './feespayment.scss';
import axios from 'axios';
import { openNotificationWithIcon } from 'appRedux/actions/Common';
const config = {
  cors: 'https://cors-anywhere.herokuapp.com/', // <optional> doesn't display the cors error
  formUrl:
    'https://docs.google.com/forms/d/1YmYfiN4f69Ca-0fCX4JpQRV6k8-6UxYENOYr0yDJay4/formResponse',
};

export const Feespayment = props => {
  const myData = localStorage.getItem('userData');
  const [step, setStep] = useState(0);
  const [state, setState] = useState({
    consent: { id: 1783136487, value: '' },
    email: { id: 368627779, value: JSON.parse(myData).email },
    consentTwo: { id: 1976965586, value: '' },
    consentThree: { id: 357280486, value: '' },
    website: { id: 988257851, value: '' },
    login: { id: 631555257, value: '' },
    detailOne: { id: 2124184228, value: '' },
    password: { id: 1783566915, value: '' },
  });

  var setInput = e => {
    var value = e.target.value;
    var name = e.target.name;
    var select = state[name];
    setState({ ...state, [name]: { ...select, value: value } });
  };

  var submit = async () => {
    const formData = new FormData();

    for (var key in state) {
      const value = Array.isArray(state[key])
        ? JSON.stringify(state[key])
        : state[key];
      formData.append(`entry.${value.id}`, value.value);
    }
    console.log(formData);
    await axios({
      url: `${config.formUrl}`,
      method: 'post',
      data: formData,
      responseType: 'json',
    })
      .then(res => {
        openNotificationWithIcon('Survey', 'vesti Fees Survey', 'success');
      })
      .catch(error => {
        openNotificationWithIcon('Survey', 'vesti Fees Survey', 'success');
        setStep(4);
      });
  };

  switch (step) {
    case 0:
      return (
        <Firststep
          state={state}
          setState={setState}
          setStep={setStep}
          setInput={setInput}
        />
      );
    case 1:
      return (
        <Secondstep
          state={state}
          setState={setState}
          setStep={setStep}
          setInput={setInput}
        />
      );
    case 2:
      return (
        <Thirdstep
          state={state}
          setState={setState}
          setStep={setStep}
          setInput={setInput}
        />
      );
    case 3:
      return (
        <Fourthstep
          state={state}
          setState={setState}
          setStep={setStep}
          setInput={setInput}
          submit={submit}
        />
      );
    case 4:
      return (
        <Success
          title="Thank You"
          subtitle="Your response was submitted successfully, a member of our team will reach out to you soon."
          onClick={() => props.close()}
        />
      );
    default:
      return <>Default</>;
  }
};

const Firststep = props => {
  return (
    <div>
      <Titlesubtitle
        steps="Step 1 of 4"
        title="Tuition & School fees payment"
        subtitle="This will help our team assist you with your payment."
      />
      <>
        <p>Do you consent to vesti making this payment for you?</p>

        <RadioButton
          changed={e =>
            props.setState({
              ...props.state,
              consent: { ...props.state.consent, value: e.target.value },
            })
          }
          id="1"
          isSelected={props.state.consent.value === 'Yes'}
          label="Yes"
          sublabel="Yes, I do."
          value="Yes"
        />
        <RadioButton
          changed={e =>
            props.setState({
              ...props.state,
              consent: { ...props.state.consent, value: e.target.value },
            })
          }
          id="2"
          isSelected={props.state.consent.value === 'No'}
          label="No"
          sublabel="No, I do not."
          value="No"
        />
      </>
      <Platformbutton
        name="Continue"
        type="normal"
        disabled={props.state.consent.value ? false : true}
        click={() => props.setStep(1)}
      />
    </div>
  );
};

const Secondstep = props => {
  return (
    <div className="feespayment">
      <Titlesubtitle
        steps="Step 2 of 4"
        title="Charges and Deduction Agreement"
        subtitle="This will help our team assist you with your payment."
      />
      <>
        <p className="feespayment__question">
          Do you consent to the deduction from your NetWebPay wallet the total
          amount shared with you via mail as the total payment for your request?
        </p>

        <div className="feespayment__radio mt-2">
          <RadioButton
            changed={e =>
              props.setState({
                ...props.state,
                consentTwo: {
                  ...props.state.consentTwo,
                  value: e.target.value,
                },
              })
            }
            id="1"
            isSelected={props.state.consentTwo.value === 'Yes'}
            label="Yes"
            sublabel="Yes, I do."
            value="Yes"
          />
          <RadioButton
            changed={e =>
              props.setState({
                ...props.state,
                consentTwo: {
                  ...props.state.consentTwo,
                  value: e.target.value,
                },
              })
            }
            id="2"
            isSelected={props.state.consentTwo.value === 'No'}
            label="No"
            sublabel="No, I do not."
            value="No"
          />
        </div>
      </>
      <span className="mt-2"></span>
      <Shortinfo subject="This total sum includes a platform fee of 10% capped at $40 (i.e if your payment 10% is more than $40, you are only charged $40. But if its lesser than $40 you are charged 10%)" />
      <Backcontinue goBack={() => props.setStep(0)}>
        <Platformbutton
          name="Continue"
          type="normal"
          disabled={props.state.consentTwo.value ? false : true}
          click={() => props.setStep(2)}
        />
      </Backcontinue>
    </div>
  );
};

const Thirdstep = props => {
  return (
    <div>
      <Titlesubtitle
        steps="Step 3 of 4"
        title="WebPayment URL"
        subtitle="This will help our team assist you with your payment."
      />
      <Inputfloat
        label="PAYMENT WEBSITE URL"
        type="text"
        name="website"
        value={props.state.website.value}
        placeholder="What is the link to the payment website ?"
        onChange={props.setInput}
      />
      <Backcontinue goBack={() => props.setStep(1)}>
        <Platformbutton
          name="Continue"
          type="normal"
          disabled={props.state.website.value ? false : true}
          click={() => props.setStep(3)}
        />
      </Backcontinue>
    </div>
  );
};

const Fourthstep = props => {
  return (
    <div className="feespayment">
      <Titlesubtitle
        steps="Step 4 of 4"
        title="Login Confidential Agreement"
        subtitle="This will help our team assist you with your payment."
      />

      <>
        <p className="feespayment__question">
          Do you have login details to your payment portal?
        </p>
        <RadioButton
          changed={e =>
            props.setState({
              ...props.state,
              login: { ...props.state.login, value: e.target.value },
            })
          }
          id="4"
          isSelected={props.state.login.value === 'Yes'}
          label="Yes"
          sublabel="Yes, I do."
          value="Yes"
        />
        <RadioButton
          changed={e =>
            props.setState({
              ...props.state,
              login: { ...props.state.login, value: e.target.value },
            })
          }
          id="5"
          isSelected={props.state.login.value === 'No'}
          label="No"
          sublabel="No, I do not."
          value="No"
        />
      </>
      {props.state.login.value && (
        <div className="mt-4">
          <p className="feespayment__question">
            Do you consent to sharing this login details with NetWebPay?
          </p>
          <RadioButton
            changed={e =>
              props.setState({
                ...props.state,
                consentThree: {
                  ...props.state.consentThree,
                  value: e.target.value,
                },
              })
            }
            id="6"
            isSelected={props.state.consentThree.value === 'Yes'}
            label="Yes"
            sublabel="Yes, I do."
            value="Yes"
          />
          <RadioButton
            changed={e =>
              props.setState({
                ...props.state,
                consentThree: {
                  ...props.state.consentThree,
                  value: e.target.value,
                },
              })
            }
            id="7"
            isSelected={props.state.consentThree.value === 'No'}
            label="No"
            sublabel="No, I do not."
            value="No"
          />
        </div>
      )}
      {props.state.consentThree.value && (
        <>
          <p>Login Credentials </p>
          <div className="feespayment__credentials">
            <Inputfloat
              type="text"
              name="detailOne"
              label="USERNAME OR EMAIL"
              value={props.state.detailOne.value}
              onChange={props.setInput}
            />
            <Inputfloat
              type="password"
              label="PASSWORD"
              name="password"
              value={props.state.password.value}
              onChange={props.setInput}
            />
          </div>
        </>
      )}
      <Backcontinue goBack={() => props.setStep(2)}>
        <Platformbutton
          name="Submit"
          type="normal"
          disabled={
            props.state.login.value && props.state.consentThree.value
              ? false
              : true
          }
          click={() => props.submit()}
        />
      </Backcontinue>
    </div>
  );
};
