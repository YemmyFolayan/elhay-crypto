import React, { useState } from 'react';
import RadioButton from 'components/common/radiobutton/radiobutton';
import { Backcontinue } from 'components/common/backcontinue/backcontinue';
import { Titlesubtitle } from '../common/titlesubtitle/titlesubtitle';
import { Platformbutton } from 'components/common/button/button';
import { Comptransaction } from 'components/common/completetransaction/comptransaction';
import { Smallbox } from 'components/common/smallbox/smallbox';
import { Success } from 'components/common/success/success';

export const Payforreport = props => {
  const [step, setStep] = useState(0);
  const [pin, setPin] = useState('');
  // const [state, setState] = useState()
  // const setWalletOption = (e) => {
  //     setState(e.target.value)
  // }

  const fireNova = () => {
    props.click();
    props.closeModal();
  };
  var __renderSteps = () => {
    switch (step) {
      case 0:
        return (
          <Creditcharge
            kobo={props.kobo}
            usd={props.usd}
            setState={props.setWalletOption}
            state={props.state}
            setStep={setStep}
            click={() => fireNova()}
          />
        );
      case 1:
        return (
          <>
            <Titlesubtitle
              steps="Step 2 of 2"
              title="Finalize Transaction"
              subtitle="Choose from our selected options"
            />
            <Smallbox>
              <p>
                You are about to be charged{' '}
                <strong>
                  {' '}
                  {props.state === 'NGN'
                    ? '₦' +
                      (40 * 700)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    : '$40'}
                </strong>{' '}
                from your NetWebPay{' '}
                <strong>
                  {props.state === 'NGN' ? ' NAIRA WALLET BALANCE' : ' USD Wallet'}
                </strong>
              </p>
            </Smallbox>
            <Comptransaction
              setPin={setPin}
              goBack={() => props.setStep(3)}
              onFinish={props.Finalize}
              len={4}
              lower={true}
            >
              <Backcontinue goBack={() => setStep(0)}>
                <Platformbutton
                  type="normal"
                  name="Finalize"
                  click={() => setStep(2)}
                  disabled={pin.length < 4 ? true : false}
                />
              </Backcontinue>
            </Comptransaction>
          </>
        );

      case 2:
        return (
          <Success
            title="Successful"
            subtitle="Transaction was successful, click button below to download report"
            button="Download Report"
            onClick={() => alert('downloaded')}
          />
        );
      default:
        return <></>;
    }
  };

  return __renderSteps();
};

const Creditcharge = props => {
  var handleClick = () => {
    //    var amount = props.state === "NGN_KOBO"? props.kobo: props.usd
    // var check = props.state === "NGN_KOBO"? props.kobo > 25000: props.usd > 40
    // var check = props.usd >= 40
    // check ? props.click() : openNotificationWithIconErr('Please fund your wallet', 'Credit Report Charge')
    props.click();
  };
  return (
    <div className="creditcharge">
      <div className="creditcharge__inner">
        <Titlesubtitle
          steps="Step 1 of 2"
          title="Select Payment Option"
          subtitle="Choose from our selected options"
        />
        <div className="creditcharge__options">
          {// eslint-disable-next-line
          props.state === 'NGN' && (
            <p className="fundcard__get">
              {' '}
              {'$40' +
                ' equivalence of ≈ ₦' +
                (40 * 700)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
            </p>
          )}
          {/* <RadioButton
                        changed={ props.setState } 
                        id="1" 
                        isSelected={ props.state === "NGN_KOBO" } 
                        label="vesti NAIRA WALLET BALANCE"
                        sublabel="You can pay via your NetWebPay NAIRA WALLET BALANCE." 
                        value="NGN_KOBO" 
                    /> */}

          <RadioButton
            changed={props.setState}
            id="2"
            isSelected={props.state === 'USD_CENTS'}
            label="vesti USD wallet"
            sublabel="You can pay via your NetWebPay USD wallet."
            value="USD_CENTS"
          />
        </div>
        <Platformbutton
          type="normal"
          name="Procceed"
          click={() => handleClick()}
          disabled={props.state ? false : true}
        />
      </div>
    </div>
  );
};
