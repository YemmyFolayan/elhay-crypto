import { Platformbutton } from 'components/common/button/button';
// import { Comptransaction } from "components/common/completetransaction/comptransaction";
import { RadioOption } from 'components/common/radiobutton/radiobutton';
import { Titlesubtitle } from 'components/common/titlesubtitle/titlesubtitle';
import { useStep } from 'helpers/hooks';
import React, { useState } from 'react';
import 'components/auth/twofa/twofa.scss';
import { connect } from 'react-redux';
import { send2faCode, verify2faCode } from 'appRedux/actions/auth';
import dummyAvatar from 'assets/dummy-avatar.png';
import Inputfloat from 'components/common/inputs/inputfloat';
// import { Backcontinue } from "components/common/backcontinue/backcontinue";

const Twofalogin = props => {
  // eslint-disable-next-line
  const { step, nextStep, previousStep, setStep } = useStep(1);
  const [state, setState] = useState({
    type: '',
  });
  var setOption = value => {
    setState({ ...state, type: value });
  };

  var handleVerification = () => {
    props.verify2faCode(
      { email: props.email, phoneNumber: props.phone, code: props.pin },
      props.from,
      props.token,
    );
  };
  var __renderSteps = () => {
    switch (step) {
      case 0:
        return (
          <Twofaoption
            email={props.email}
            phone={props.phone}
            type={state.type}
            setOption={setOption}
            send2faCode={props.send2faCode}
            continue={nextStep}
          />
        );
      case 1:
        return (
          <Twofaverify
            token={props.token}
            setOption={setOption}
            send2faCode={props.send2faCode}
            type={state.type}
            from={props.from}
            setCode={props.setCode}
            firstName={props.firstName}
            lastName={props.lastName}
            Finalize={props.Finalize}
            email={props.email}
            picture={props.picture}
            pin={props.pin}
            phone={props.phone}
            handleVerification={handleVerification}
            loader={props.loader}
            back={previousStep}
          />
        );
      default:
        return <></>;
    }
  };

  return __renderSteps();
};

const Twofaoption = props => {
  return (
    <div className="twofalogin">
      <div className="twofalogin__col">
        <Titlesubtitle
          title="2-FA Mode"
          subtitle="Select mode through which you want to receive your 2FA code."
        />

        <RadioOption
          changed={props.setOption}
          id="0"
          isSelected={props.type === 'sms'}
          label="Via SMS"
          sublabel="Receive code via your phone number."
          value="sms"
        />
        <RadioOption
          changed={props.setOption}
          id="1"
          isSelected={props.type === 'email'}
          label="Already received Via Email"
          sublabel="I Received code via my email address."
          value="email"
        />

        {props.type ? (
          <div className="twofalogin__btns">
            <Platformbutton
              type="normal"
              name={props.type === 'email' ? 'Continue' : `Send Code Via SMS`}
              click={() =>
                props.type === 'email'
                  ? props.continue()
                  : props.send2faCode(
                      { email: props.email, phoneNumber: props.phone },
                      props.continue,
                    )
              }
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

const Twofaverify = props => {
  return (
    <div className="twofalogin">
      <div className="twofalogin__top">
        <img src={props.picture ? props.picture : dummyAvatar} alt="Mag" />
        <span>
          <span role="img" aria-label="hello">
            Hello 👋🏽
          </span>
          <p>{props.firstName + ' ' + props.lastName}</p>
        </span>
      </div>
      <Titlesubtitle
        title="Enter 2-FA Code"
        subtitle={`We sent the six(6) digit code to your ${
          props.type === 'sms' ? props.phone : props.email
        } `}
      />
      <div className="mb-2"></div>
      <Inputfloat
        name="pin"
        type="number"
        label="2FA CODE"
        value={props.pin}
        onChange={e => props.setCode(e.target.value)}
      />
      <div className="mb-2"></div>
      {props.phone ? (
        <p
          className="resend"
          onClick={() =>
            props.send2faCode(
              { email: props.email, phoneNumber: props.phone },
              () => props.setOption('sms'),
              props.token,
            )
          }
        >
          Want to receive via SMS instead ? <strong>Click Here</strong>
        </p>
      ) : (
        <></>
      )}
      <div className="mb-4"></div>
      <Platformbutton
        type="normal"
        name="Verify 2-FA code"
        disabled={props.pin.length === 6 ? false : true}
        click={() =>
          props.type === 'sms' ? props.handleVerification() : props.Finalize()
        }
      />
      {/* <Comptransaction
                setPin={props.setCode}
                onFinish={props.type === 'sms'? props.handleVerification: props.Finalize}
                len={6}
                open ={true}
                lower={true}
                pin={props.pin}
                title={`Enter Six(6) Digit 2-FA Code sent to ${props.type ==='sms'? props.phone:  '**'+props.email.slice(5)} `}
            >
                <div className="mb-2"></div>
                <p className='resend' onClick={()=> props.send2faCode({email:props.email, phoneNumber:props.phone}, ()=> props.setOption('sms'), props.token )}>Want to receive via SMS instead  ? <strong>Click Here</strong></p>
                
                 <div className="mb-4"></div>
                <Platformbutton

                        type="submit" name="Verify 2-FA code"
                        disabled={props.pin.length === 6 ? false :true}
                    />
               
            </Comptransaction> */}
    </div>
  );
};

const mapStateToProps = ({ auth }) => {
  const { loader } = auth;
  return {
    loader,
  };
};

const mapDispatchToProps = {
  send2faCode,
  verify2faCode,
};

export default connect(mapStateToProps, mapDispatchToProps)(Twofalogin);
