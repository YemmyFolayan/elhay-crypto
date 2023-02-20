import React, { Component, useState, useEffect } from 'react';
import RegionSelect from 'react-region-flag-select';
import { Link } from '@reach/router';
import { FormFeedback } from 'reactstrap';
import '../Authentication.scss';

import { connect } from 'react-redux';
import {
  showAuthLoader,
  userSignIn,
  userSignInWithToken,
  clearCurrentLoggedInUser,
} from 'containers/Auth/Login/actions';
import Loader from 'components/Loader';
// import {redirectDashboard } from 'routes/RedirectRoutes';
import { redirectFeedsDashboard } from 'routes/RedirectRoutes';
import { hideMessage, userSignOut } from 'appRedux/actions/auth';

import {
  logowhite,
  logoblack,
  googlelogo,
  applelogo,
  goldbg,
  phonecard,
  phonetrade,
  goldotdown,
  golddotup,
  pathway,
  provider,
  chistory,
  caramel,
} from '../../../assets/assets';


import Carousel, { CarouselItem } from 'components/common/carousel/carousel';
import { Simplemodal } from 'components/common/simplifiedmodal';
import Twofalogin from 'components/auth/twofa/twofa';
import { setToken } from 'appRedux/api';
import { DatePicker } from 'antd';
import HeaderMain from 'components/common/HeaderMain';
import Select from 'react-select';
import * as Yup from 'yup';
import _ from 'lodash';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { LockIco, ChevDIco } from 'assets/assets';
import { signUpUser } from 'appRedux/actions/auth';
import { REDIRECT_URL } from 'appRedux/constants';
import {
  openNotificationWithIcon,
  openNotificationWithIconErr,
} from 'appRedux/actions/Common';
import { navigate } from '@reach/router';
import { openAction } from 'appRedux/actions/domore';
import Inputfloat from 'components/common/inputs/inputfloat';
import Axios from 'axios';
import { setSession } from 'appRedux/store/cookies';
import { AlertError } from 'components/common/alertboxes/alertboxes';
import { Platformbutton } from 'components/common/button/button';
import { Phonenumber } from 'components/common/inputs/phoneinput';
// import { useDispatch } from "react-redux"

// import { openAction } from 'appRedux/actions/domore';
// import { useLocation } from '@reach/router';

const SignUpSchema1 = Yup.object().shape({
  // dob: Yup.date().required('Date of birth is required'),
  // password: Yup.string().required('Password is required'),
  // bvn: Yup.string().required('Bvn is required'),
  email: Yup.string().required('Email is required'),
  // location: Yup.string().required('Location is required'),
  // phoneNumber: Yup.string().required('Phone number is required'),
});

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.slides = [
      {
        title: 'Get better with money',
        subtitle:
          'Your finance work starts here. Our here to help you track and deal with speeding up your transactions.',
      },
      {
        title: 'Trade any type of gift card',
        subtitle:
          'Trade Amazon, Walmart, Target, Starbucks, Apple, Google Play, Visa, Mastercard, American Express, Best Buy, Home Depot, Sephora, iTunes, Uber, Airbnb and Netflix Gift Cards with ease.',
      },
      {
        title: 'Trade any type of Cryptocurrency assets',
        subtitle:
          'Trade Bitcoin (BTC), Ethereum (ETH), Cardano (ADA) ,Binance Coin (BNB) ,Dogecoin (DOGE) ,Ripple (XRP) ,Tether (USDT) ,Polkadot (DOT) ,Chainlink (LINK) ,Litecoin (LTC) with ease.',
      },
    ];

    this.intervalId = null;

    this.showSlide = this.showSlide.bind(this);

    this.state = {
      username: '',
      modal: false,
      data: '',
      code: '',
      token: '',
      slideIndex: 0,
      location: '',
      citizen: '',
    };
  }

  // dispatch = useDispatch()
  openModal = (value, token) => {
    this.setState({ ...this.state, modal: true, data: value, token: token });
  };

  closeModal = () => {
    this.setState({ ...this.state, modal: false });
  };

  setCode = value => {
    this.setState({ ...this.state, code: value });
  };
  // run = ()=> {

  //   console.log(this.state.from)
  // }

  onChange = (date, dateString) => {
    this.setState({ dob: dateString });
    // signUpUser
  };

  handleLocation = data => {
    this.setState({ location: data });
  };

  handleCitizenship = data => {
    this.setState({ citizen: data });
  };
  handleGoogleSignIn = () => {
    // Load the Google Sign-In API script
    window.gapi.load('auth2', function() {
      window.gapi.auth2
        .init({
          client_id: 'YOUR_GOOGLE_CLIENT_ID',
        })
        .then(function(auth2) {
          // Sign in the user with the Google Sign-In API
          auth2.signIn().then(
            function(googleUser) {
              // TODO: Handle the signed-in user, e.g. send the user info to your server
              const profile = googleUser.getBasicProfile();
              console.log('Signed in with Google:', profile.getName());
            },
            function(error) {
              console.error('Error signing in with Google:', error);
            },
          );
        });
    });
  };

  handleAppleSignIn = () => {
    // Request authorization from the Apple Sign-In API
    const appleAuthRequest = new Promise(function(resolve, reject) {
      const authInstance = window.AppleID.auth.init({
        clientId: 'YOUR_APPLE_CLIENT_ID',
        scope: 'name email',
        redirectURI: 'https://your-app.com/callback',
      });
      authInstance.onSignInComplete = function(result) {
        resolve(result);
      };
      authInstance.onSignInError = function(error) {
        reject(error);
      };
    });
    appleAuthRequest
      .then(function(result) {
        // TODO: Handle the signed-in user, e.g. send the user info to your server
        console.log('Signed in with Apple:', result);
      })
      .catch(function(error) {
        console.error('Error signing in with Apple:', error);
      });
  };

  async componentDidMount() {
    // console.log(document.referrer.includes('/auth?merchant='))
    // console.log(document.referrer.split('=')[1])
    // console.log(this.props.location.state? this.props.location.state.from:'')
    // clearSession()
    document.body.classList.add('bg-darkgreen');
    this.intervalId = setInterval(() => {
      this.setState(prevState => ({
        slideIndex: (prevState.slideIndex + 1) % this.slides.length,
      }));
    }, 3000);
  }

  // componentDidUpdate() {
  //   if (this.props.authUser !== null) {
  //     redirectDashboard();
  //   }
  // }

  componentWillUnmount() {
    document.body.classList.remove('bg-darkgreen');
    clearInterval(this.interval);
  }

  showSlide(index) {
    this.setState({
      slideIndex: index,
    });
  }

  verifyTwofa = () => {
    const config = {
      headers: { Authorization: `Bearer ${this.state.token}` },
    };
    Axios.post(
      'https://api.wevesti.com/api/factorAuth/ConfirmCode',
      { FactorAuthCode: this.state.code },
      config,
    )
      .then(res => {
        // openNotificationWithIcon(
        //   res.data.message,
        //   `2-FA Verification`,
        //   'success'
        // );

        openNotificationWithIcon(
          'Continue from where you left off.',
          `Hello ${this.state.data.firstName}, Welcome Back 👋🏽.`,
        );

        setToken(this.state.token);
        setSession(this.state.token);
        if (this.from) {
          this.from === '/auth' || this.from === 'auth'
            ? redirectFeedsDashboard()
            : navigate(this.from);
        } else {
          redirectFeedsDashboard();
        }

        this.props.openAction();
      })
      .catch(error => {
        openNotificationWithIconErr(
          error.data ? error.data.message : `Please contact help@elhay.com'`,
          error.data ? error.data.message : 'Error Occurred',
          'error',
        );
      });
  };
  render() {
    const { loading } = this.props;
    // eslint-disable-next-line
    var from = document.referrer
      ? document.referrer.includes('/auth?merchant=')
        ? `\merchants?merchant=${document.referrer.split('=')[1]}`
        : this.props.location.state
        ? this.props.location.state.from
        : ''
      : '/bank';

    const { slideIndex } = this.state;
    const { gender, citizen, password } = this.state;

    return (
      <div className="container-fluid">
        <Simplemodal
          closable="yes"
          onClick={() => {
            // this.closeModal()
            console.log('trying to close');
          }}
          visible={this.state.modal}
        >
          <Twofalogin
            from={this.from}
            firstName={this.state.data ? this.state.data.firstName : ''}
            lastName={this.state.data ? this.state.data.lastName : ' '}
            password={this.state.data ? this.state.data.password : ' '}
            email={this.state.data ? this.state.data.email : ''}
            phone={this.state.data ? this.state.data.phoneNumber : ''}
            picture={this.state.data ? this.state.data.profilePictureURL : ''}
            pin={this.state.code}
            setCode={this.setCode}
            Finalize={this.verifyTwofa}
            token={this.state.token}
          />
        </Simplemodal>
        <div className="row">
          <div
            className="col-12 col-md-6 h-100 min-vh-md-100 d-flex flex-column goldbg"
            style={{
              display: 'flex',
              flexDirection: 'row',
              backgroundImage: `url(${goldbg})`,

              backgroundSize: 'cover',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <nav className="d-flex align-items-left mr-4">
              {/* nav header */}

              <img
                src={logowhite}
                alt="netwebpay"
                width="6%"
                height="6%"
                className="align-items-left"
              />

              <div className="d-flex pt-2 ml-4">
                <a className="text-white title_text main_font_family" href="/">
                  Elhay Limited
                </a>
              </div>
            </nav>
            <img
              src={phonetrade}
              alt="phonetrade"
              width="40%"
              height="40%"
              className="phonetrade align-items-center"
            />

            <img
              src={golddotup}
              alt="golddotup"
              width="5%"
              height="10%"
              className="goldbg-golddotup"
            />

            <div className="carousel">
              <div className="carousel-container">
                {this.slides.map((slide, index) => (
                  <div
                    key={index}
                    className={`carousel-item ${
                      index === slideIndex ? 'active' : ''
                    }`}
                  >
                    <div className="white_title_txt">{slide.title}</div>
                    <div className="white_subtitle_txt">{slide.subtitle}</div>
                  </div>
                ))}
              </div>
              <div className="carousel-dots">
                {this.slides.map((slide, index) => (
                  <span
                    key={index}
                    className={`carousel-dot ${
                      index === slideIndex ? 'active' : ''
                    }`}
                    onClick={() => this.showSlide(index)}
                  />
                ))}
              </div>
            </div>

            <img
              src={goldotdown}
              alt="goldotdown"
              width="10%"
              height="10%"
              className="goldbg-goldotdown"
            />
          </div>
          <div
            className="col-12 col-md-6 px-2 px-md-4 px-lg-5 h-100 min-vh-md-100 py-4 d-flex flex-column"
            style={{
              backgroundColor: '#FFFFFF',
            }}
          >
            {/* Horizontal Navbar */}
            <nav className="d-flex align-items-center">{/* nav header */}</nav>
            {/* /nav header */}
            {/* content */}
            <div className="py-5 my-auto d-none d-md-block">
              {/* <img src={intro} className="contain-img" alt="lady smiling" /> */}
              <div className="card bg-white w-100 mt-5 mt-md-auto mb-auto mx-auto mw-500">
                <div className="card-body p-7">
                  <div className="main_font_family">
                    <div className="title_txt">Sign up for an account</div>
                    <p></p>

                    <div className="subtitle_txt">
                      Send, spend and save smarter
                    </div>
                  </div>

                  <div className="signin_box main_font_family">
                    <button
                      className="google-sign-in"
                      onClick={this.handleGoogleSignIn}
                    >
                      <img src={googlelogo} alt="Google" />
                      &nbsp; Sign Up with Google
                    </button>
                    <button
                      className="apple-sign-in"
                      onClick={this.handleAppleSignIn}
                    >
                      <img src={applelogo} alt="Apple" />
                      &nbsp; Sign Up with Apple
                    </button>
                  </div>

                  <div className="d-flex align-items-center subtitle_txt">
                    <span className="dash">&nbsp; __________________</span>
                    &nbsp; Or with email
                    <span className="dash"> &nbsp; __________________ </span>
                  </div>
                  {loading ? (
                    <Loader />
                  ) : (
                    <Formik
                      enableReinitialize
                      initialValues={{
                        // location: '',
                        // citizen: '',
                        // callCode: '',
                        // dob: '',
                        password: '',
                        // bvn: '',
                       
                      }}
                      validationSchema={SignUpSchema1}
                      onSubmit={(values, { setSubmitting, resetForm }) => {
                        setSubmitting(true);
                        const { countryData } = values.location;
                        const data = {
                          ...values,
                          gender: gender.value,
                          password: password.value,
                          dob: values.dob.format('YYYY-MM-DD') || '',
                          location: countryData.data.name,
                          citizen: citizen
                            ? citizen.countryData.data.name
                            : this.state.citizen,
                          redirectURL: REDIRECT_URL,
                          callCode: values
                            ? values.location.countryData.data.phoneCode
                            : '',
                          // callCode: '',
                        };
                        this.props.signUpUser(data);
                        setSubmitting(false);
                      }}
                    >
                     
                      {props => (
                        <>
                          <div className="ErrorMessageFormik">
                            {!_.isEmpty(props.errors)
                              ? `Errors: ${Object.values(props.errors).join(
                                  ', ',
                                )}`
                              : ''}
                          </div>
                          <Form>
                            <div className="d-flex justify-content-between">
                              <div className="w-50 mr-2">
                                <Field
                                  className="form_element w-100"
                                  placeholder="First Name *"
                                  type="text"
                                  name="firstName"
                                />
                                <ErrorMessage
                                  name="firstName"
                                  component="div"
                                  className="text-red-500 text-xs"
                                />
                              </div>

                              <div className=" w-50">
                                <Field
                                  className="form_element w-95"
                                  placeholder="Last Name *"
                                  type="text"
                                  name="lastName"
                                />
                                <ErrorMessage
                                  name="lastName"
                                  component="div"
                                  className="text-red-500 text-xs"
                                />
                              </div>
                            </div>
                            {/* <div className="d-flex justify-content-between">
                            <div className=" w-50">
                              <div className="datepickerselect">
                                <DatePicker
                                  placeholder="Select Date of Birth"
                                  className="form_element_date w-95"
                                  onChange={e => {
                                    props.setFieldValue('dob', e, true);
                                    return this.onChange;
                                  }}
                                />
                              </div>
                             <ErrorMessage
                                name="password"
                                component="div"
                                className="text-red-500 text-xs"
                              />
                            </div> */}

                            <div className=" w-100">
                              <Field
                               label="password"
                                className="form_element w-100"
                                type="email"
                                placeholder="Email Address*"
                                name="email"
                              />
                              <ErrorMessage
                                name="email"
                                component="div"
                                className="text-red-500 text-xs"
                              />
                            </div>
                            <div className=" w-100">
          
                              <Inputfloat
                                // label="asdasd"
                                label="password"
                                id="password"
                                type="password"
                                name="password"
                                // error ={errors.password }
                                row={true}
                                placeholder="Enter Your Password"
                                value={password}
                                disabled={false}
                                
                              />
                               <ErrorMessage
                                name="password"
                                component="div"
                                className="text-red-500 text-xs"
                              />
                            </div>
                            <div className="d-flex justify-content-between">
                              <div className=" w-100">
                              <Inputfloat
                                // label="asdasd"
                                label="Phone Number"
                                id="phonenumber"
                                type="text"
                                name="phoneNumber"
                               
                                row={true}
                                placeholder="Phone Number"
                                disabled={false}
                                
                              />
                                <ErrorMessage
                                  name="phoneNumber"
                                  component="div"
                                  className="text-red-500 text-xs"
                                />
                              </div>
                              {/* <div className="w-25">
                                <div
                                  className="countryflagselect small_flag_space"
                                  width="5%"
                                >
                                  <RegionSelect
                                    countryOnly
                                    selectedCountryCode=""
                                    handleChange={this.handleCitizenship}
                                    className="form_element"
                                    name="country_select"
                                  />

                                  <img
                                    className="down_ico"
                                    src={ChevDIco}
                                    alt="down"
                                    width="20"
                                    height="20"
                                  />
                                </div>
                                <ErrorMessage
                                  name="country_select"
                                  component="div"
                                  className="text-red-500 text-xs"
                                />
                              </div> */}
                            </div>

                            <div className="instruction_text m-4">
                              By creating an account, you agreeing to our{' '}
                              <b className="text-black">
                                <a href="/"> Privacy Policy </a>{' '}
                              </b>{' '}
                              , and{' '}
                              <b className="text-black">
                                {' '}
                                <a href="/">
                                  {' '}
                                  Electronics Communication Policy.{' '}
                                </a>
                              </b>
                            </div>

                            <button
                              type="submit"
                              className="btn w-100 mb-4 mt-4 primary_btn"
                              disabled={
                                !props.dirty ||
                                !_.isEmpty(props.errors) ||
                                props.isSubmitting
                              }
                            >
                              Sign Up
                            </button>
                            <p className="text-center mt-4">
                              Already have an account?
                              <Link
                                style={{ color: '#1A202C' }}
                                to="/auth"
                                className="ml-2 text-black"
                              >
                                Sign In
                              </Link>
                            </p>
                          </Form>
                        </>
                      )}
                    </Formik>
                  )}
                </div>
              </div>
            </div>

            <div className="footer_text_signup main_font_family">
              <a className="privacy_text" href="/">
                Privacy Policy
              </a>
              <a className="copy_right" href="/">
                Copyright &copy; 2023
              </a>
            </div>
            {/* /section left */}
          </div>

          {/* /section right */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, common }) => {
  const { loader, alertMessage, showMessage, authUser } = auth;
  const { display, message, loading } = common;
  return {
    loader,
    alertMessage,
    showMessage,
    authUser,
    display,
    message,
    loading,
  };
};

export default connect(mapStateToProps, {
  hideMessage,
})(SignUp);

SignUp.defaultName = 'SignUpPage';
