import React, { useState, useEffect } from 'react';
import { Selectbox } from 'components/common/inputs/selectbox';
import Singleinputlabelcol from 'components/common/inputs/singleinputlabelcol';
import { Titlesubtitle } from 'components/common/titlesubtitle/titlesubtitle';
import { Shortinfo } from 'components/common/shortinfo/shortinfo';
import ModernDatepicker from 'react-modern-datepicker';
// import { Textarea } from "components/common/inputs/textarea"
import { Backcontinue } from 'components/common/backcontinue/backcontinue';
import { Singleselect } from 'components/common/inputs/singleselect';
import './silakyc.scss';
import api from 'appRedux/api';
// import { Success as Prompt } from "components/common/success/success"
import { useUserData } from 'helpers/hooks';

export const Silakyc = props => {
  var options = [
    // {
    //     name :'KYC LITE',
    //     value:'KYC LITE'
    // },
    // {
    //     name :'INSTANT ACH',
    //     value:'INSTANT ACH'
    // },
    {
      name: 'DOC KYC',
      value: 'DOC_KYC',
    },
    {
      name: 'INSTANT-ACH',
      value: 'INSTANT-ACH',
    },
  ];

  const [states, setStates] = useState({});
  const { userData } = useUserData();
  const goBack = () => {
    props.move(1);
  };

  const goContinue = () => {
    props.move(3);
  };

  var getStates = () => {
    api
      .post('https://countriesnow.space/api/v0.1/countries/states', {
        country: 'united states',
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

  useEffect(() => {
    getStates();
  }, []);

  return (
    <div className="silakyc">
      <Titlesubtitle
        title="Account Details • 2 of  3"
        subtitle="We need to gather some information to see if you meet KYC guidelines, Please fill out the form fields below."
      />
      <Shortinfo subject="All input fields are required to be filled" />
      <div className="silakyc__select">
        <Selectbox
          value={props.data.kyctype}
          options={options}
          name="kyctype"
          disable={true}
          onChange={props.setInput}
        />
        {/* <Shortinfo
                        subject = {props.data.kyctype === "KYC LITE" ? 'With KYC Lite, you can only transact upto $300 per month' : `With ${props.data.kyctype}, you can transact unlimited amount of $$$.`}
                    /> */}
      </div>
      <div className="silakyc__name">
        <Singleinputlabelcol
          type="text"
          name="firstname"
          placeholder="Enter Your First Name"
          value={props.data.firstName}
          disabled={true}
          onChange={props.setInput}
        ></Singleinputlabelcol>
        <Singleinputlabelcol
          type="text"
          name="lastName"
          placeholder="Enter Your First Name"
          value={props.data.lastName}
          disabled={true}
          onChange={props.setInput}
        ></Singleinputlabelcol>
      </div>
      <div className="silakyc__contact">
        <Singleinputlabelcol
          type="text"
          name="email"
          placeholder="Enter Your Email Address"
          value={props.data.email}
          disabled={true}
          onChange={props.setInput}
        />
        <Singleinputlabelcol
          type="number"
          name="number"
          placeholder="Enter Your Phone Number"
          value={props.data.number}
          disabled={false}
          onChange={props.setInput}
        >
          {props.reg.validation_details ? (
            <p className="error">
              {props.reg.validation_details.contact
                ? 'This phone number is not in the desired format'
                : ''}
            </p>
          ) : (
            ''
          )}
          {props.update.validation_details ? (
            <p className="error">
              {props.update.validation_details.contact
                ? 'This phone number is not in the desired format'
                : ''}
            </p>
          ) : (
            ''
          )}
        </Singleinputlabelcol>
      </div>
      <div className="silakyc__dobssn">
        <div style={{ position: 'relative', zIndex: '999', width: '100%' }}>
          <ModernDatepicker
            date={new Date(props.data.dob)}
            className="dob"
            format={'YYYY-MM-DD'}
            showBorder
            onChange={date =>
              props.setDob(new Date(date).toISOString().slice(0, 10))
            }
            placeholder={'Select your date of birth'}
            primaryColor={'#000000'}
            // secondaryColor={'#F9F8F9'}
            // primaryTextColor={'#CCCCCC'}
            // secondaryTextColor={'#C4C4C4'}
          />
          {props.reg.validation_details ? (
            <p className="error">
              {props.reg.validation_details.entity
                ? props.reg.validation_details.entity.birthdate
                : ''}
            </p>
          ) : (
            ''
          )}
          {props.update.validation_details ? (
            <p className="error">
              {props.update.validation_details.entity
                ? props.update.validation_details.entity.birthdate
                : ''}
            </p>
          ) : (
            ''
          )}
        </div>

        {props.data.kyctype !== 'KYC LITE' && (
          <Singleinputlabelcol
            type="number"
            name="ssn"
            placeholder="Enter Your SSN"
            value={props.data.ssn}
            disabled={false}
            onChange={props.setInput}
          >
            {props.reg.validation_details ? (
              <p className="error">
                {props.reg.validation_details.identity
                  ? props.reg.validation_details.identity
                  : ''}{' '}
              </p>
            ) : (
              ''
            )}
            {props.update.validation_details ? (
              <p className="error">
                {props.update.validation_details.identity
                  ? props.reg.validation_details.identity
                  : ''}{' '}
              </p>
            ) : (
              ''
            )}
          </Singleinputlabelcol>
        )}
      </div>
      {props.data.kyctype !== 'KYC LITE' && (
        <Singleinputlabelcol
          type="text"
          name="address"
          placeholder="Enter Your Home Address"
          value={props.data.address}
          disabled={false}
          onChange={props.setInput}
        >
          {props.reg.validation_details ? (
            <p className="error">
              {props.reg.validation_details.address
                ? props.reg.validation_details.address.street_address_1
                : ''}
            </p>
          ) : (
            ''
          )}
        </Singleinputlabelcol>
      )}

      {props.data.kyctype !== 'KYC LITE' && (
        <div className="silakyc__last">
          <Singleinputlabelcol
            type="text"
            name="city"
            placeholder="Enter Your City"
            value={props.data.city}
            disabled={false}
            onChange={props.setInput}
          >
            {props.reg.validation_details ? (
              <p className="error">
                {props.reg.validation_details.entity
                  ? props.reg.validation_details.entity.city
                  : ''}
              </p>
            ) : (
              ''
            )}
            {props.update.validation_details ? (
              <p className="error">
                {props.update.validation_details.entity
                  ? props.update.validation_details.entity.city
                  : ''}
              </p>
            ) : (
              ''
            )}
          </Singleinputlabelcol>
          <Singleselect
            value={props.data.state}
            options={states}
            onChange={props.handleState}
            placeholder="Select State"
          />

          {/* <Selectbox
                        label=""
                        sublabel=""
                        options = {['Alabama', 'Monsouri', 'Brooklyn']}
                    /> */}
          <Singleinputlabelcol
            type="number"
            name="zip"
            placeholder="Zip Code"
            value={props.data.zip}
            disabled={false}
            onChange={props.setInput}
          >
            {props.reg.validation_details ? (
              <p className="error">
                {props.reg.validation_details.address
                  ? props.reg.validation_details.address.postal_code
                  : ''}
              </p>
            ) : (
              ''
            )}
            {props.update.validation_details ? (
              <p className="error">
                {props.update.validation_details.address
                  ? props.update.validation_details.address.postal_code
                  : ''}
              </p>
            ) : (
              ''
            )}
          </Singleinputlabelcol>
        </div>
      )}
      {/* { props.reg.validation_details ? '' : props.reg.message } */}

      <p
        style={{
          color: props.reg.message
            ? props.reg.message.includes('successfully')
              ? 'green'
              : 'red'
            : '',
        }}
      >
        {' '}
        {props.reg.message
          ? props.reg.message.includes('successfully')
            ? props.reg.message
            : `${props.reg.message}, try again`
          : ''}
      </p>
      <p
        style={{
          color: props.update.message
            ? props.update.success !== false
              ? 'green'
              : 'red'
            : 'red',
        }}
      >
        {' '}
        {props.update.message
          ? props.update.message.includes('successfully')
            ? `${props.update.message + ` try again`}`
            : 'Account was successfully updated'
          : ''}
      </p>

      <Backcontinue
        text="Confirm and  Continue"
        goBack={goBack}
        continue={goContinue}
        back="Back"
      >
        {/* {props.data.kyctype === "KYC LITE" ?<button className="backcontinue__continue" disabled={props.data.firstName !=='' && props.data.lastName !=='' && props.data.email !=='' && props.data.number !=='' && props.data.dob !=='' ? false : true     } 
                    onClick={() => goContinue()}>Confirm and Continue
                    </button>
                    
                :''} */}
        {/* <button className="backcontinue__continue" disabled={props.data.firstName !=='' && props.data.lastName !=='' && props.data.email !=='' && props.data.number !=='' && props.data.dob !=='' && props.data.state !=='' && props.data.city !=='' && props.data.ssn !=='' && props.data.zip !=='' ? false : true     } 
                    onClick={(e) => 
                        props.userData.silaKycStatus ? props.silaUpdate(e) : props.silaRegister(e)
                    }>{props.userData.silaKycStatus ? 'Update' : 'Register'} and Continue
                    </button> */}
        {props.userData.silaKycStatus || userData.silaKycStatus ? (
          <button
            className="backcontinue__continue"
            disabled={
              props.data.firstName !== '' &&
              props.data.lastName !== '' &&
              props.data.email !== '' &&
              props.data.number !== '' &&
              props.data.dob !== '' &&
              props.data.state !== '' &&
              props.data.city !== '' &&
              props.data.ssn !== '' &&
              props.data.zip !== ''
                ? false
                : true
            }
            onClick={e =>
              Object.keys(props.upData).length > 0
                ? props.silaUpdate(e)
                : props.move(3)
            }
          >
            {' '}
            {Object.keys(props.upData).length > 0
              ? 'Update and Continue'
              : 'Continue'}
          </button>
        ) : (
          <button
            className="backcontinue__continue"
            disabled={
              props.data.firstName !== '' &&
              props.data.lastName !== '' &&
              props.data.email !== '' &&
              props.data.number !== '' &&
              props.data.dob !== '' &&
              props.data.state !== '' &&
              props.data.city !== '' &&
              props.data.ssn !== '' &&
              props.data.zip !== ''
                ? false
                : true
            }
            onClick={e => props.silaRegister(e)}
          >
            Register and Continue
          </button>
        )}
        {/* <button className="backcontinue__continue" disabled={props.data.firstName !=='' && props.data.lastName !=='' && props.data.email !=='' && props.data.number !=='' && props.data.dob !=='' && props.data.state !=='' && props.data.city !=='' && props.data.ssn !=='' && props.data.zip !=='' ? false : true     } 
                    onClick={(e) => 
                        props.silaRegister(e)
                    }>Register and Continue
                    </button> */}
      </Backcontinue>
    </div>
  );
};
