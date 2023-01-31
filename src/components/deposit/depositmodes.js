import React from 'react';
import { RadioOption } from 'components/common/radiobutton/radiobutton';
import './depositmodes.scss';
import { Backcontinue } from 'components/common/backcontinue/backcontinue';
import { Titlesubtitle } from '../common/titlesubtitle/titlesubtitle';
import { Platformbutton } from 'components/common/button/button';
import Monoconnect from 'components/bank/mono/mono';
import { Shortinfo } from 'components/common/shortinfo/shortinfo';
import { radio_ach, radio_card } from 'assets/assets';

export const Depositmodes = props => {
  var moveBack = () => {
    props.setStep(0);
  };

  var __renderAction = value => {
    switch (value) {
      case 'Providus':
        return props.depositProvidus();
      case 'Mono':
        return props.setStep(4);
      case 'Paystack':
        return props.depositPaystack();
      default:
        return console.log('select');
    }
  };
  var __renderBtnText = value => {
    switch (value) {
      case 'Providus':
        return 'See Account To Pay';
      case 'Mono':
        return 'Continue';
      case 'Paystack':
        return 'Initiate Deposit';
      default:
        return 'Continue';
    }
  };
  // var linked = false
  return (
    <div className="depositoptions">
      <div className="depositoptions__inner">
        <Titlesubtitle
          steps="Step 2 of 3"
          title="Select Payment Option"
          subtitle="Choose from our selected options"
        />
        <div className="depositoptions__inner center">
          {/* <RadioButton
                        changed={ props.setDepositOption } 
                        id="1" 
                        isSelected={ props.option === "Flutterwave" } 
                        label="Pay with NetWebPay Service 1"
                        sublabel="You can pay via the vesti service 1" 
                        value="Flutterwave" 
                    /> */}

          <RadioOption
            image={radio_card}
            changed={props.setDepositOption}
            id="2"
            isSelected={props.option === 'Paystack'}
            label="Add cash via card"
            sublabel="You can add cash via your debit card."
            value="Paystack"
          />
          <div className="mb-4"></div>
          {props.userData.providusAccountNumber && (
            <RadioOption
              image={radio_ach}
              changed={props.setDepositOption}
              id="3"
              isSelected={props.option === 'Providus'}
              label="Add cash via a bank transfer"
              sublabel="You can add cash via bank transfer to your NetWebPay Providus account"
              value="Providus"
            />
          )}
          {/* <RadioButton
                        changed={ props.setDepositOption } 
                        id="4" 
                        isSelected={ props.option === "Linked" } 
                        label={` ${props.userData.monoAccountId ? 'Deposit via your linked account':'Deposit via linking account' } `}
                        sublabel={` ${props.userData.monoAccountId ? 'You can deposit from your linked account.':'Link your NetWebPay NGN wallet to another account.' } `}
                        value="Linked" 
                    /> */}
          {props.option === 'Linked' && (
            <Shortinfo
              subject={
                props.userData.monoAccountId
                  ? 'This will attract a fee of ₦50 charged from your NetWebPay wallet.'
                  : 'We do not support mobile banking for these banks- access,'
              }
            />
          )}
          {props.option && (
            <Backcontinue text="Confirm and  Continue" goBack={moveBack}>
              {props.option === 'Linked' && !props.userData.monoAccountId ? (
                <Monoconnect move={() => props.setStep(4)} />
              ) : (
                <Platformbutton
                  type="normal"
                  click={() => __renderAction(props.option)}
                  name={__renderBtnText(props.option)}
                />
              )}
              {/* {props.option === "Linked" && !props.userData.monoAccountId  ? <Monoconnect move = {()=>props.setStep(4)}/> : <Platformbutton type="normal" click={()=> props.option === "Providus" ? props.depositProvidus() : props.userData.monoAccountId ? props.setStep(4): props.depositPaystack()}  name={props.option === "Providus" ? 'See Account To Pay To' : props.userData.monoAccountId? 'Continue Transaction': 'Initiate Deposit'} />} */}
              {/* <button className="backcontinue__continue" onClick={()=> props.option === "Providus" ? props.depositProvidus() : props.depositPaystack()}>{props.option === "Providus" ? 'See Account To Pay To' : 'Proceed'} <i class="fas fa-arrow-right"></i> </button> */}
            </Backcontinue>
          )}
        </div>
      </div>
    </div>
  );
};
