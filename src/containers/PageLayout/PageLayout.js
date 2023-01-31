// import React, { useEffect, useState } from 'react';
import React, { useEffect, useState } from 'react';
import './PageLayout.css';
// import Modal from 'components/common/Modal';
import { useStep } from 'helpers/hooks';
// import { useStep, useUserData } from 'helpers/hooks';
// import { isError } from 'lodash';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import flags from 'react-phone-number-input/flags';
import './input.scss';
import { Form, Formik, useFormikContext } from 'formik';
import { connect, useDispatch } from 'react-redux';
// import { Uploadicon } from 'assets/assets';
import { useQuery } from 'react-query';
import api from 'appRedux/api';
import {
  openNotificationWithIcon,
  openNotificationWithIconErr,
} from 'appRedux/actions/Common';
import { errorMessage } from 'helpers/utils';
import Loader from 'components/Loader';
import { Singleselect } from 'components/common/inputs/singleselect';
// import { clearSession } from 'appRedux/store/cookies';
// import { navigate } from "@reach/router";
import { Titlesubtitle } from 'components/common/titlesubtitle/titlesubtitle';
import { Success } from 'components/common/success/success';
// import { useDispatch } from 'react-redux';
// import {openAction} from 'appRedux/actions/domore';
import { opennReg } from 'appRedux/actions/auth';
import { Comptransaction } from 'components/common/completetransaction/comptransaction';
import { navigate } from '@reach/router';

// import { Onboardthree } from 'components/auth/onboard/onboardaction';
// import { Shortinfo } from 'components/common/shortinfo/shortinfo';

// const Upload = ({ onChange, children, className }) => {
//   const inputRef = useRef(null);
//   return (
//     <div
//       className={className}
//       onClick={e => {
//         inputRef.current.click();
//       }}
//       style={{ cursor: 'pointer', overflow:'hidden', height:'130px', marginBottom:'30px' }}
//     >
//       {children}
//       <input
//         type="file"
//         ref={inputRef}
//         onChange={e => onChange(e.target.files)}
//         className="d-none"
//       />
//     </div>
//   );
// };
import { Simplemodal } from 'components/common/simplifiedmodal';
import { Backcontinue } from 'components/common/backcontinue/backcontinue';
import { Platformbutton } from 'components/common/button/button';
import Inputfloat from 'components/common/inputs/inputfloat';

const PageLayout = ({ children, openReg }) => {
  // const { userData, isLoading } = useUserData();
  // const [openReg, setOpenReg] = useState(true);
  const { step, previousStep, nextStep } = useStep(0);
  const [refresh, setRefresh] = useState('');
  const [countries, setCountries] = useState('');
  const [loading, setLoading] = useState(true);

  const [err, setErr] = useState('');
  const [btn, setButton] = useState('');
  var location = window.location.href;

  var sendCode = (values, resend = '') => {
    setButton('Sending Code...');
    api
      .post('twillo/phone/twilloSendCode', {
        phoneNumber: values.phoneNumber,
        email: JSON.parse(localStorage.getItem('userData')).email,
      })
      .then(res => {
        openNotificationWithIcon(
          res.data.message,
          'Phone Verification',
          'success',
        );

        resend === '' &&
          setTimeout(() => {
            nextStep();
          }, 500);
        setButton('');
      })
      .catch(err => {
        openNotificationWithIconErr(
          err.data.message,
          'Phone Verification',
          'error',
        );
        setErr(err.data.message);
        setButton('');
      });
  };
  var getCountries = () => {
    api
      .get('https://restcountries.com/v3.1/all')
      .then(res => {
        // console.log(res.data)

        var options = (res.data ?? []).map((item, index) => ({
          label: item.flag + ' ' + item.name.common,
          value: item.name.common,
          alt: item.cca2,
        }));
        setCountries([...options]);
        setLoading(false);
      })
      .catch(err => err);
  };

  var setOpenReg = value => {
    dispatch(opennReg(value));
  };
  useEffect(() => {
    getCountries();
  }, []);
  const dispatch = useDispatch();
  const _renderSteps = step => {
    const stepMeta = { step, previousStep, nextStep };
    switch (step) {
      case 0:
        return (
          <Step1
            {...stepMeta}
            countries={countries}
            err={err}
            btn={btn}
            sendCode={sendCode}
          />
        );
      case 1:
        return <Step3 {...stepMeta} sendCode={sendCode} />;
      case 2:
        return <Step2 {...stepMeta} />;
      case 3:
        return (
          <Success
            title="Account Updated Successfully 👍🏽"
            subtitle="Perfect!, You have successfully updated your NetWebPay profile, now let us setup your account by clicking the button below."
            onClick={() => {
              // dispatch(openAction())
              setOpenReg(false);
              setTimeout(() => {
                // dispatch(openAction())
                navigate('/myprofile?tab=kyc');
                window.location.reload();
              }, 100);

              // nextStep()
            }}
            button="Set Up Account"
          />
        );
      // case 3:
      //       return <>
      //       <Titlesubtitle
      //           title={`What would you like to do ${localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')).firstName : ''} ?`}
      //           subtitle="Choose an option to setup your NetWebPay account."
      //         />
      //         <Onboardthree
      //           from={true}
      //             closeModal ={ () => setOpenReg(false)}
      //         />
      //       </>

      default:
        return <></>;
    }
  };

  useEffect(() => {
    console.log(refresh);
  }, [refresh]);

  return (
    <>
      <Simplemodal
        // isOpen
        visible={
          // !isLoading &&
          // !isError(userData) &&
          // openReg &&
          // (!userData.firstName || !userData.lastName || userData.firstName === 'User' || userData.lastName === null)
          // true
          location.split('/')[3] === 'auth' ? false : openReg
        }
        onClick={() => {
          setOpenReg(false);
          window.location.reload();
          // console.log()
        }}
        // onClose
      >
        {loading ? (
          <Loader />
        ) : (
          <Formik
            initialValues={{ phoneNumber: '', country: 'USA', kycPicture: '' }}
            onSubmit={(values, { setSubmitting }) => {
              console.log(values);
              // formdata from object
              const formData = new FormData();
              // eslint-disable-next-line
              for (let key in values) {
                console.log(key);
                if (key === 'country') {
                  formData.append(key, values[key].value);
                } else {
                  formData.append(key, values[key]);
                }
              }
              api
                .post('/auth/second-phase-register', formData)
                .then(
                  res =>
                    // localStorage.removeItem('userData'),
                    // clearSession(),
                    // setSubmitting(false),
                    setTimeout(() => {
                      var data = localStorage.getItem('userData');
                      data = data ? JSON.parse(data) : [];
                      data['firstName'] = values.firstName.trim();
                      data['lastName'] = values.lastName.trim();
                      data['phoneNumber'] = values.phoneNumber;

                      localStorage.setItem('userData', JSON.stringify(data));
                    }, 200),
                  // navigate('/bank')
                  setRefresh(`refresh ${values.firstName}`),
                  openNotificationWithIcon(
                    'Account Details Updated Successfully',
                    'Account Details',
                    'success',
                  ),
                  // setOpenReg(false),
                  setSubmitting(false),
                  nextStep(),
                )
                .catch(
                  err =>
                    openNotificationWithIconErr(
                      errorMessage(err) ?? 'Could not Update User',
                      'Update Error',
                      'error',
                    ),
                  setSubmitting(false),
                );
              // .finally(() => {
              //   setSubmitting(false);
              // });
            }}
          >
            <Form>{_renderSteps(step)}</Form>
          </Formik>
        )}
      </Simplemodal>
      {children}
    </>
  );
};

// export default PageLayout;

const Step1 = ({ nextStep, countries, err, btn, sendCode }) => {
  const { setFieldValue, values, handleChange } = useFormikContext();
  const [error, setError] = useState(false);

  return (
    <>
      {/* <h4>Almost There</h4>
      <div className="mb-4" style={{ maxWidth: '400px' }}>
        You are almost there, you can choose to fill this form now or later to
        complete your account creation.
      </div> */}
      <Titlesubtitle
        steps="Step 1 of 2"
        title="Almost There"
        subtitle="You are almost there, fill in the form below to
        update your profile information."
      />
      <form>
        <div className="row">
          <div className="col-12 col-sm-6 mb-2">
            {/* <input
            type="text"
            className="form-control"
            placeholder="First name"
            aria-label="First name"
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
            
          /> */}
            <Inputfloat
              type="text"
              name="firstName"
              label="First Name"
              placeholder="e.g John"
              value={values.firstName}
              onChange={value => handleChange(value)}
            />
          </div>

          <div className="col-12 col-sm-6 mb-2">
            {/* <input
            type="text"
            className="form-control "
            placeholder="Surname"
            aria-label="Last name"
            name="lastName"
            value={values.lastName}
            onChange={handleChange}
          /> */}
            <Inputfloat
              type="text"
              name="lastName"
              label="Last Name"
              placeholder="e.g Doe"
              value={values.lastName}
              onChange={value => handleChange(value)}
            />
          </div>
        </div>

        <div className="mb-2"></div>
        <div className="mb-2">
          <Singleselect
            label=""
            // className="form-control"
            placeholder="Select Your Country"
            value={values.country}
            options={countries}
            onChange={country => setFieldValue('country', country)}
          />
        </div>
        <div className="mb-4"></div>
        <div className="mb-2">
          {/* {values.country} */}
          <PhoneInput
            className="my-input-class"
            inputClass="my-input-class"
            placeholder="Phone Number"
            international
            countryCallingCodeEditable={false}
            // defaultCountry="NG"
            defaultCountry={values.country ? values.country.alt : ''}
            value={values.phoneNumber}
            // countries={['US', 'NG']}
            flags={flags}
            onChange={phone => setFieldValue('phoneNumber', phone)}
          />
        </div>

        {/* <div className="mb-3">
        <textarea
          name="address"
          rows="5"
          className="form-control textarea"
          placeholder="Address"
          value={values.address}
          onChange={handleChange}
          id="textarea"
        ></textarea>
      </div> */}
        {/* {values.country.value === "NIGERIA" &&<> <div className="mb-3">
        <input
          type="number"
          name="bvn"
          className="form-control"
          placeholder="BVN"
          value={values.bvn}
          onChange={handleChange}
        />
      </div>
      <div className="mb-5 d-flex">
        <span></span>
        <div>
          Your BVN does not give us access to your bank account or transactions
          in any way, it is just to conform to regulations.
          <br />
          <br />
          Can’t remember your BVN ? Dial
          <span style={{ color: '#000000', fontWeight: 500 }}> *565*0# </span>
          from your registered mobile number
        </div>
      </div> </>} */}
        {/* <h5>KYC Document</h5> */}
        {/* <Titlesubtitle
        title='KYC Document'
        // subtitle=""
      >
        <p>Government requires you to upload a regulatory ID Card. Acceptable documents include: <strong>International Passport, State issued ID Card,Drivers License</strong></p>
      </Titlesubtitle>
      <div style={{ fontWeight: 300, maxWidth: '500px' }}>
        
      </div>
      <div>File: ({values.kycPicture?.name ?? 'None'})</div>
     
      <Upload
        className="py-2"
        onChange={files => {
          console.log(files);
          files.length && setFieldValue('kycPicture', files[0]);
        }}
      >
        <img
          src={Uploadicon}
          style={{ objectFit: 'contain', width: '100%'}}
          alt="campaign"
        />
        <Shortinfo
        subject = "Please do not upload a picture of yourself."
      />
      </Upload> */}
        <div className="mb-4"></div>

        {error && (
          <p className={`checkver ${error ? ' --error' : ' --success'}`}>
            Some fields are Empty
          </p>
        )}
        {err && (
          <p className={`checkver ${err ? ' --error' : ' --success'}`}>{err}</p>
        )}

        <a
          href="/"
          onClick={e => {
            e.preventDefault();

            values.firstName === '' ||
            values.lastName === '' ||
            values.phoneNumber === ''
              ? setError(true)
              : sendCode(values);
          }}
          className={`default-btn ${btn ? ' --disable' : ''}`}
        >
          Continue <i class="fas fa-arrow-right-long"></i>
        </a>
      </form>
    </>
  );
};

const Step2 = ({ previousStep }) => {
  const { submitForm, setFieldValue, isSubmitting } = useFormikContext();

  const { data } = useQuery('countryFlags', () =>
    api
      .get('https://restcountries.com/v3.1/all')
      // .get('/country/flags')
      // .then(res => res.data)
      // .then(res => res.data.data)
      .then(
        res => res.data,
        // console.log('my ountries',res.data[0].name.common)
      )
      .catch(err => err),
  );
  const valid_countries = [
    'estonia',
    'britain',
    'germany',
    'canada',
    'usa',
    'united states',
    'united kingdom',
  ];
  const countries = data
    ? data.filter(country =>
        valid_countries.includes(country.name.common.toLowerCase()),
      ) ?? valid_countries
    : ['germany'];
  // console.log(countries)
  const [selectedCountries, setCountry] = useState([]);
  // add country to selected countries
  const addCountry = country => {
    console.log('Here', selectedCountries);
    if (selectedCountries.length < 3) {
      setCountry([...selectedCountries, country.name.common]);
    } else {
      openNotificationWithIconErr(
        'You can only pick up to three countries',
        'Countries Selected',
      );
    }
  };
  // remove country from selected countries
  const removeCountry = country => {
    setCountry(selectedCountries.filter(c => c !== country.name.common));
  };
  const includesCountry = country =>
    selectedCountries.includes(country.name.common);
  useEffect(() => {
    setFieldValue('countryofChoice', selectedCountries);
  }, [selectedCountries, setFieldValue]);

  if (isSubmitting) return <Loader />;
  return (
    <>
      {/* <h4>Select your top three countries</h4>
      <p style={{ fontWeight: 300, maxWidth: '500px' }}>
        Select your top three countries to which you would love to migrate into,
        so as to enable us to tailor results according to your prefferences.
      </p> */}

      <Titlesubtitle
        steps="Step 2 of 2"
        title="Countries you'd like to immigrate to"
        // subtitle="Select up to 3 countries to which you'd like to immigrate."
        subtitle="(vesti is a finance platform for immigrants, if you are interested in emigrating which country would you choose) Skip if you are here only for banking."
      />
      <div className="py-3">
        <div className="row">
          {countries.length > 1 ? (
            countries.map(country => (
              <div
                key={country.name.common}
                style={{ height: '50px', cursor: 'pointer' }}
                className="col-12 col-sm-6 col-md-4 mb-3"
                onClick={() =>
                  includesCountry(country)
                    ? removeCountry(country)
                    : addCountry(country)
                }
              >
                <div
                  style={{
                    height: '100%',
                    width: '100%',
                    backgroundColor: includesCountry(country)
                      ? '#F0F3EE'
                      : '#F9F8F9',
                    border: includesCountry(country)
                      ? '0.7px solid #7EC65C'
                      : '1px solid #EAEAEA',
                    borderRadius: '7.5px',
                  }}
                  className="d-flex align-items-center p-2"
                >
                  <span
                    style={{
                      height: '40px',
                      width: '40px',
                      borderRadius: '50vh',
                      overflow: 'hidden',
                      marginRight: '5px',
                    }}
                  >
                    <img
                      src={country.flags.svg}
                      alt={country.name.common}
                      style={{
                        height: '100%',
                        width: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </span>
                  {country.name.common}
                </div>
              </div>
            ))
          ) : (
            <Loader />
          )}
        </div>
      </div>
      <div>
        <a
          href="/"
          onClick={e => {
            e.preventDefault();
            previousStep();
          }}
          className="default-btn-outline mr-3"
        >
          Back
        </a>
        <a
          href="/"
          onClick={e => {
            e.preventDefault();
            submitForm();
          }}
          className="default-btn"
        >
          {selectedCountries.length > 0 ? 'Finish & Submit' : 'Skip'}
        </a>
      </div>
    </>
  );
};
// eslint-disable-next-line
const Step3 = ({ nextStep, previousStep, sendCode }) => {
  // eslint-disable-next-line
  const { setFieldValue, values, handleChange } = useFormikContext();
  const [code, setCode] = useState('');
  const [err, setErr] = useState('');
  const [btn, setButton] = useState('');
  var verifyPhone = () => {
    setButton('Verifying...');
    api
      .post('twillo/phone/twilloVerifyCode', {
        code: code,
        phoneNumber: values.phoneNumber,
        email: JSON.parse(localStorage.getItem('userData')).email,
      })
      .then(res => {
        openNotificationWithIcon(
          res.data.message,
          'Phone Verification',
          'success',
        );
        setButton('');
        setTimeout(() => {
          nextStep();
        }, 500);
      })
      .catch(err => {
        openNotificationWithIconErr(
          err.data.message,
          'Phone Verification',
          'error',
        );
        setErr(err.data.message);
        setButton('');
      });
  };

  return (
    <>
      <Titlesubtitle
        steps="Step 2 of 3"
        title="Phone Number Verification"
        subtitle={`You are almost there, enter the code sent to ${values.phoneNumber}`}
      />
      <form>
        <Comptransaction
          setPin={setCode}
          onFinish={verifyPhone}
          len={6}
          open={true}
          lower={true}
          pin={code}
          title={`Enter Six(6) Digit Code sent to ${values.phoneNumber} `}
        >
          <p className="resend" onClick={() => sendCode(values, 'resend')}>
            didn't get the code ? <strong>resend code</strong>
          </p>
          {err && (
            <p className={`checkver ${err ? ' --error' : ' --success'}`}>
              {err}
            </p>
          )}
          <Backcontinue
            text="Continue"
            goBack={() => previousStep()}
            // continue = {goContinue}
          >
            {/* <button className="backcontinue__continue" type="submit" disabled={code.length === 6 ? false :true}
                >{btn ? btn : 'Verify Phone Number'}
              </button> */}
            <Platformbutton
              disabled={code.length === 6 ? false : true}
              type="submit"
              name={btn ? btn : 'Verify Phone Number'}
            />
          </Backcontinue>
        </Comptransaction>
      </form>
    </>
  );
};

const mapStateToProps = ({ auth }) => {
  const { openReg } = auth;

  return {
    openReg,
  };
};

export default connect(mapStateToProps)(PageLayout);
