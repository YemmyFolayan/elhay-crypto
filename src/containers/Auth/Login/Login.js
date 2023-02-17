import React, { Component, useState, useEffect } from 'react';
import { Link } from '@reach/router';
import { FormFeedback } from 'reactstrap';
import '../Authentication.scss';
import { Formik } from 'formik';
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
import logoblack from '../../../assets/svg/logoblack.svg';
import googlelogo from '../../../assets/svg/google.svg';
import applelogo from '../../../assets/svg/apple.svg';
import goldbg from '../../../assets/svg/goldbg.svg';
import phonecard from '../../../assets/svg/phonecard.svg';
import phonetrade from '../../../assets/svg/phonetrade.svg';
import goldotdown from '../../../assets/svg/goldotdown.svg';
import golddotup from '../../../assets/svg/golddotup.svg';
import Carousel, { CarouselItem } from 'components/common/carousel/carousel';
import { Simplemodal } from 'components/common/simplifiedmodal';
import Twofalogin from 'components/auth/twofa/twofa';
import { setToken } from 'appRedux/api';
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
// import { useDispatch } from "react-redux"

// import { openAction } from 'appRedux/actions/domore';
// import { useLocation } from '@reach/router';

class Login extends Component {
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
    this.props.clearCurrentLoggedInUser(); // this is to clear the current logged in user
    this.props.userSignOut();
    this.state = {
      username: '',
      modal: false,
      data: '',
      code: '',
      token: '',
      slideIndex: 0,
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
          error.data ? error.data.message : `Please contact help@wevesti.com'`,
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
          <div className="col-12 col-md-6 px-2 px-md-4 px-lg-5 h-100 min-vh-md-100 py-4 d-flex flex-column">
            {/* Horizontal Navbar */}
            <nav className="d-flex align-items-center">
              {/* nav header */}

              <img src={logoblack} alt="netwebpay" width="6%" height="6%" />

              <div className="d-flex pt-2">
                <a className="text-dark title_text main_font_family" href="/">
                  Elhay Limited
                </a>
              </div>
            </nav>
            {/* /nav header */}
            {/* content */}
            <div className="py-5 my-auto d-none d-md-block h-500">
              {/* <img src={intro} className="contain-img" alt="lady smiling" /> */}
              <div className="card bg-white w-100 mt-5 mt-md-auto mb-auto mx-auto mw-500">
                <div className="card-body p-7">
                  <div className="main_font_family">
                    <div className="title_txt">Sign In to Elhay</div>
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
                      &nbsp; Sign In with Google
                    </button>
                    <button
                      className="apple-sign-in"
                      onClick={this.handleAppleSignIn}
                    >
                      <img src={applelogo} alt="Apple" />
                      &nbsp; Sign In with Apple
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
                        username: this.state.username,
                        password: '',
                      }}
                      validate={values => {
                        const errors = {};
                        if (!values.username) {
                          errors.username =
                            'Please enter Email or Mobile Number';
                        } else if (
                          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                            values.username,
                          )
                        ) {
                          errors.username = 'Invalid email address';
                        }
                        if (!values.password) {
                          errors.password = 'Please enter password';
                        }
                        return errors;
                      }}
                      onSubmit={values => {
                        let data = {};
                        if (values.username && values.password) {
                          this.props.showAuthLoader();
                          data = {
                            username: values.username,
                            password: values.password,
                          };
                          // var from = this.props.location.state ? this.props.location.state.from: '/bank'
                          // eslint-disable-next-line
                          // var from = document.referrer ? document.referrer.includes('/auth?merchant=') ? `\merchants?merchant=${document.referrer.split('=')[1]}`: this.props.location.state.from : '/bank'

                          this.props.userSignIn(
                            JSON.stringify(data, null, 2),
                            from,
                            this.openModal,
                          );
                        }
                      }}
                    >
                      {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                      }) => (
                        <form onSubmit={handleSubmit}>
                          <Inputfloat
                            label="Email"
                            type="email"
                            id="username"
                            name="username"
                            // className="form_element w-100 mb-4"
                            onChange={handleChange}
                            placeholder="Email Address"
                            onBlur={handleBlur}
                            value={values.username}
                            invalid={
                              errors.username && touched.username && 'true'
                            }
                          />
                          {/* <Singleinputlabel
                          // label="asdasd"
                          row={true}
                          type="email"
                          id="username"
                          name="username"
                          // className="form_element w-100 mb-4"
                          onChange={handleChange}
                          placeholder="Enter Your Email Address"
                          // onBlur={handleBlur}
                          value={values.username}
                          disable={false}
                          error ={errors.username }
                        /> */}
                          {errors.username && touched.username && (
                            <FormFeedback>{errors.username}</FormFeedback>
                          )}
                          <Inputfloat
                            // label="asdasd"
                            label="password"
                            id="password"
                            type="password"
                            name="password"
                            // error ={errors.password }
                            row={true}
                            placeholder="Enter Your Password"
                            value={values.password}
                            disabled={false}
                            onChange={handleChange}
                          />
                          {/* <input
                          id="password"
                          type="password"
                          name="password"
                          className="form_element w-100 mb-2 password"
                          placeholder="Password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                          invalid={
                            errors.password && touched.password && 'true'
                          }
                        /> */}

                          <div className="mb-4 mt-2 forgot_pass_section">
                            <a
                              className="remember_me"
                              style={{ color: '#1A202C' }}
                              to="#"
                            >
                              <input
                                type="checkbox"
                                id="myCheckbox"
                                name="myCheckbox"
                              />
                              &nbsp; Remember me
                            </a>

                            <Link
                              className="forgot_pass"
                              style={{ color: '#E4AD50' }}
                              to="/auth/forgot-password"
                            >
                              Forgot Password?
                            </Link>
                          </div>

                          {(touched.username || touched.password) && (
                            <AlertError body="Invalid login credentials (email address /Password)" />
                          )}
                          <div className="mb-4"></div>
                          <Platformbutton
                            name="Login"
                            type="submit"
                            disabled={
                              !values.username || !values.password
                                ? true
                                : false
                            }
                          />
                          <p className="text-center mt-4">
                            Don't have an account?
                            <Link
                              style={{ color: '#1A202C' }}
                              to="/register"
                              className="ml-2"
                            >
                              Sign Up
                            </Link>
                          </p>
                        </form>
                      )}
                    </Formik>
                  )}
                </div>
              </div>
            </div>

            {/* /content */}
          </div>

          <div
            className="col-12 col-md-6 h-100 min-vh-md-100 d-flex flex-column goldbg"
            style={{
              display: 'flex',
              flexDirection: 'row',
              backgroundImage: `url(${goldbg})`,
              backgroundPosition: 'left',
              backgroundSize: 'cover',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src={goldotdown}
              alt="goldotdown"
              width="10%"
              height="10%"
              className="goldbg-goldotdown"
            />

            <img
              src={golddotup}
              alt="golddotup"
              width="5%"
              height="10%"
              className="goldbg-golddotup"
            />

            <img src={phonecard} alt="phonecard" width="40%" height="40%" />

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
          </div>
        </div>

        <div className="footer_text main_font_family">
          <a className="privacy_text" href="/">
            Privacy Policy
          </a>
          <a className="copy_right" href="/">
            Copyright &copy; 2023
          </a>
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
  userSignIn,
  showAuthLoader,
  hideMessage,
  userSignOut,
  clearCurrentLoggedInUser,
  userSignInWithToken,
  openAction,
})(Login);

Login.defaultName = 'LoginPage';
