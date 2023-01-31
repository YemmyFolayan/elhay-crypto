import React, { useState } from 'react';
import { Titlesubtitle } from 'components/common/titlesubtitle/titlesubtitle';
import { Addbank } from 'components/profile/addbank';
import { Success } from 'components/common/success/success';
import errorsvg from 'assets/error-2.svg';
import './addbank.scss';

export const Withaddbank = props => {
  const [step, setStep] = useState(0);

  switch (step) {
    case 0:
      return (
        <>
          <Titlesubtitle
            title="Add Bank"
            subtitle="Fill in these fields to add a new bank for easy withdrawal."
          />
          <Addbank label="no" cb={setStep} goBack={props.back} />
        </>
      );
    case 1:
      return (
        <Success
          title="Successfully Added bank"
          subtitle="Bank has been added successfully, click the button below to continue withdrawal"
          onClick={() => props.closeModal()}
          button={'Continue to Withdrawal'}
        />
      );
    case 2:
      return (
        <Success
          image={errorsvg}
          type="error"
          title="Failed to Add Bank"
          subtitle="Sorry, an error occured while trying to add your bank, click the button to try again"
          button="Try Again"
          onClick={() => setStep(0)}
        />
      );
    default:
      return <></>;
  }
};
