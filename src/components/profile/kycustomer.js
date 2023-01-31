import React, { useEffect, useState } from 'react';
import { useStep } from 'helpers/hooks';
import { connect, useDispatch } from 'react-redux';
import { fetchAllCountries } from 'appRedux/actions/Common';
import Kyc from './Kyc';
import { Singleselect } from 'components/common/inputs/singleselect';
import { Platformbutton } from 'components/common/button/button';
import './Kyc.scss';
import Kycothers from './kycothers';
import { Titlesubtitle } from 'components/common/titlesubtitle/titlesubtitle';
import { Success } from 'components/common/success/success';
import sorry from 'assets/sorry.svg';
import { opennReg } from 'appRedux/actions/auth';
const Kycustomer = props => {
  const { step, setStep } = useStep(1);
  const [country, setCountry] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    props.refetch();
    // eslint-disable-next-line
  }, props.userdata);
  var __renderSteps = () => {
    switch (step) {
      case 0:
        return (
          <>
            <Titlesubtitle
              title="KYC Verification"
              subtitle="What country are you from ?"
            />
            <div className="mb-4"></div>
            <Selectcountry
              countries={props.countries}
              country={country}
              setCountry={setCountry}
              continue={setStep}
            />
          </>
        );
      case 1:
        return (
          <Kyc
            state={props.state}
            refetch={props.refetch}
            userdata={props.userdata}
            verifiedKyc={props.userdata.verifiedKyc}
            back={() => setStep(0)}
          />
        );
      case 2:
        return <Kycothers userdata={props.userdata} />;
      case 3:
        return (
          <Success
            // type="error"
            image={sorry}
            title="Sorry :("
            subtitle="You have to update your profile information before you start your KYC verification process."
            button="Update Profile"
            onClick={() => {
              props.refetch();
              dispatch(opennReg(true));
            }}
          />
        );
      default:
        return <></>;
    }
  };
  useEffect(() => {
    props.fetchAllCountries();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    //    (props.userdata.country === null || props.userdata.lastName === null) ?  setStep(3) : props.userdata.country.toLowerCase() !== 'nigeria' ?
    //     props.userdata.verifiedKyc === 'DEFAULT' || props.userdata.verifiedKyc === false ? setStep(2)
    //     : props.userdata.kycLevel !== 'Level0' && !props.userdata.stripeVerificationToken ? setStep(1): setStep(2)
    //     : setStep(1)

    props.userdata.country === null || props.userdata.lastName === null
      ? setStep(3)
      : props.userdata.country.toLowerCase() !== 'nigeria'
      ? props.userdata.verifiedKyc === 'DEFAULT' ||
        props.userdata.verifiedKyc === false
        ? setStep(1)
        : props.userdata.kycLevel !== 'Level0' &&
          !props.userdata.stripeVerificationToken
        ? setStep(1)
        : setStep(1)
      : setStep(1);

    // eslint-disable-next-line
  }, []);

  return <section className="kycustomer">{__renderSteps()}</section>;
};

const Selectcountry = props => {
  return (
    <div className="kycustomer__country">
      {/* {props.country && props.country.label} */}
      <span>
        <p>What country are you from ?</p>
        <Singleselect
          value={props.country}
          options={props.countries}
          onChange={value => props.setCountry(value)}
          placeholder="Select Your Country"
        />
      </span>
      {/* {
                props.country.label === 'nigeria' ?
            } */}
      <Platformbutton
        name="Continue Process"
        type="normal"
        disabled={props.country ? false : true}
        click={() =>
          props.country.label === 'Nigeria'
            ? props.continue(1)
            : props.continue(2)
        }
      />
    </div>
  );
};

const mapStateToProps = ({ common }) => {
  const { countries, states } = common;
  return {
    countries,
    states,
  };
};

const mapDispatchToProps = {
  fetchAllCountries,
};

export default connect(mapStateToProps, mapDispatchToProps)(Kycustomer);
