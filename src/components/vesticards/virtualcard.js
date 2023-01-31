import React, { useState } from 'react';
// import Singleinputlabelcol from "components/common/inputs/singleinputlabelcol";
import { Singleselect } from 'components/common/inputs/singleselect';
import { Titlesubtitle } from 'components/common/titlesubtitle/titlesubtitle';
// import { Textarea } from "components/common/inputs/textarea"
import { Backcontinue } from 'components/common/backcontinue/backcontinue';
import { Shortinfo } from 'components/common/shortinfo/shortinfo';
import './virtualcard.scss';
import Inputfloat from 'components/common/inputs/inputfloat';
export const Vcard = props => {
  const [step, setStep] = useState(1);
  var nameOptions = [
    {
      label: 'My Family virtual card',
      value: 'My Family virtual card',
    },
    {
      label: 'My School virtual card',
      value: 'My School virtual card',
    },
    {
      label: 'My Pocket money virtual card',
      value: 'My Pocket money virtual card',
    },
    {
      label: 'My Tuition and Rent virtual card',
      value: 'My Tuition and Rent virtual card',
    },
  ];
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
  // var cardOptions = [
  //     {
  //         label :'Visa',
  //         value:'Visa'
  //     }
  // ]

  var kycOptions = [
    {
      label: 'SSN',
      value: 'SSN',
    },
    {
      label: 'BVN',
      value: 'BVN',
    },
    {
      label: 'NIN',
      value: 'NIN',
    },
    // {
    //     label :'PASSPORT',
    //     value:'PASSPORT'
    // }
    // ,
    {
      label: 'VOTER_ID',
      value: 'VOTER_ID',
    },
  ];

  const goBack = () => {
    props.type === 'Apto'
      ? step === 1
        ? props.setStep(2)
        : setStep(1)
      : props.setStep(2);
  };

  const goContinue = e => {
    e.preventDefault();
    props.setStep(6);
  };

  var setInput = e => {
    var name = e.target.name;
    var value = e.target.value;
    props.setData({ ...props.data, [name]: value });
  };

  var handleName = value => {
    props.setData({ ...props.data, cardName: value });
  };
  var handleColor = value => {
    props.setData({ ...props.data, cardColor: value });
  };
  var handleKyc = value => {
    props.setData({ ...props.data, kyc_id_type: value });
  };

  switch (step) {
    case 1:
      return (
        <Juicecreate
          setInput={setInput}
          data={props.data}
          handleKyc={handleKyc}
          handleColor={handleColor}
          handleName={handleName}
          goBack={goBack}
          goContinue={goContinue}
          kycOptions={kycOptions}
          nameOptions={nameOptions}
          colorOptions={colorOptions}
          type={props.type}
          setStep={setStep}
          setData={props.setData}
        />
      );
    case 2:
      return (
        <Juicetwo
          setInput={setInput}
          setStep={setStep}
          data={props.data}
          goBack={goBack}
          goContinue={goContinue}
        />
      );
    default:
      return <></>;
  }
};

const Juicecreate = props => {
  return (
    <div className="vcard" style={{ width: '100%' }}>
      <Titlesubtitle
        steps={` ${props.type === 'Apto' ? 'Step 2 of 4' : 'Step 2 of 4'}`}
        title={`${
          props.type === 'Apto' ? 'Black Dollar ' : 'Virtual '
        } card - Card Details`}
        subtitle={`Easily create ${
          props.type === 'Apto' ? 'black dollar ' : 'virtual '
        } cards to cater for your needs.`}
      />

      <div
        className="vcard__colbrand"
        style={{ position: 'relative', zIndex: '99', width: '100%' }}
      >
        <Singleselect
          value={props.data.cardName}
          options={props.nameOptions}
          onChange={props.handleName}
          placeholder="Select Card  Name"
        />
        <Singleselect
          value={props.data.cardColor}
          // options={props.colorOptions}
          options={props.colorOptions}
          onChange={props.handleColor}
          placeholder="Select Card  Color"
        />
      </div>
      <Inputfloat
        type="text"
        label="Phone Number"
        name="phone_number"
        placeholder="Enter Your phone number"
        value={props.data.phone_number}
        disabled={false}
        onChange={props.setInput}
      />

      <div className={`${'vcard__kyc'}`}>
        <Singleselect
          value={props.data.kyc_id_type}
          options={props.kycOptions.slice(1, 4)}
          onChange={props.handleKyc}
          placeholder="Select verification mode"
        />
        <Inputfloat
          type="password"
          label={props.data.kyc_id_type ? props.data.kyc_id_type.value : ''}
          name="kyc_id_number"
          placeholder={`Enter your ${
            props.data.kyc_id_type ? props.data.kyc_id_type.value : ''
          } number`}
          value={props.data.kyc_id_number}
          disabled={false}
          onChange={props.setInput}
        />
      </div>
      <Backcontinue text="Confirm and  Continue" goBack={props.goBack}>
        {props.type !== 'Stripe' ? (
          <button
            className="backcontinue__continue"
            disabled={
              props.data.cardName !== '' &&
              props.data.cardColor !== '' &&
              props.data.cardBrand !== '' &&
              props.data.phone_number !== '' &&
              props.data.kyc_id_type !== '' &&
              props.data.kyc_id_number !== ''
                ? false
                : true
            }
            onClick={e => props.setStep(2)}
          >
            Confirm and Continue
          </button>
        ) : (
          <button
            className="backcontinue__continue"
            disabled={
              Object.values(props.data)
                .slice(0, 8)
                .every(value => !!value)
                ? false
                : true
            }
            onClick={e =>
              props.type === 'Stripe' ? props.setStep(3) : props.goContinue(e)
            }
          >
            Confirm and Continue
          </button>
        )}
      </Backcontinue>
    </div>
  );
};

const Juicetwo = props => {
  return (
    <div className="vcard" style={{ width: '100%' }}>
      <Titlesubtitle
        steps={`Step ${props.type === 'Stripe' ? ' 1 of 2 ' : ' 3 of 4 '}`}
        title={`${
          props.type === 'Stripe' ? 'Black Dollar ' : 'Virtual '
        } card - Address`}
        subtitle={`Easily create ${
          props.type === 'Apto' ? 'black dollar ' : 'virtual '
        } cards to cater for your needs.`}
      />

      <div className="vcard__location">
        <Inputfloat
          type="text"
          label="Location"
          name="country"
          placeholder="Enter Your location"
          value={props.data.country}
          disabled={false}
          onChange={props.setInput}
        >
          <Shortinfo subject="e.g Lagos, Nigeria" />
        </Inputfloat>

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
      <Inputfloat
        type="text"
        label="Billing Address"
        name="billingAddress"
        placeholder="Enter Your Home Address"
        value={props.data.billingAddress}
        disabled={false}
        onChange={props.setInput}
      />

      <Backcontinue
        text="Confirm and  Continue"
        goBack={() => props.setStep(1)}
      >
        <button
          className="backcontinue__continue"
          disabled={
            props.data.country !== '' &&
            props.data.postalCode !== '' &&
            props.data.billingAddress !== ''
              ? false
              : true
          }
          onClick={e => props.goContinue(e)}
        >
          Continue to Set PIN
        </button>
      </Backcontinue>
    </div>
  );
};
