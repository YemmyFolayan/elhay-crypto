import React, { Component } from 'react';
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
import logo from '../../../assets/netwebpaylogo.svg';
// import logo from '../../../assets/xmasvesti.svg';
import intro from '../../../assets/netwebpaylogo.png';
import { Titlesubtitle } from 'components/common/titlesubtitle/titlesubtitle';
// import Singleinputlabel from 'components/common/inputs/singleinputlabel';
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

    this.props.clearCurrentLoggedInUser(); // this is to clear the current logged in user
    this.props.userSignOut();
    this.state = {
      username: '',
      modal: false,
      data: '',
      code: '',
      token: '',
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

  async componentDidMount() {
    // console.log(document.referrer.includes('/auth?merchant='))
    // console.log(document.referrer.split('=')[1])
    // console.log(this.props.location.state? this.props.location.state.from:'')
    // clearSession()
    document.body.classList.add('bg-darkgreen');
  }

  // componentDidUpdate() {
  //   if (this.props.authUser !== null) {
  //     redirectDashboard();
  //   }
  // }

  componentWillUnmount() {
    document.body.classList.remove('bg-darkgreen');
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
              <div className="navbar-header mr-4">
                <a className="navbar-brand" href="/">
                  <div className="sr-only">vesti</div>
                  <img src={logo} alt="netwebpay" width="100px" height="100px"/>
                </a>
              </div>
              <div className="d-flex pt-2">
                <a
                  className="text-decoration-none mr-3 text-dark"
                  href="/"
                >
                  Home
                </a>
                <a
                  className="text-decoration-none mr-3 text-dark"
                  href="/about"
                >
                  About
                </a>
                <a
                  className="text-decoration-none mr-3 text-dark"
                  href="/fees"
                >
                  Fees
                </a>
                <a
                  className="text-decoration-none mr-3 text-dark"
                  href="/faq"
                >
                  FAQs
                </a>
               
              </div>
            </nav>
            {/* /nav header */}
            {/* content */}
            <div className="py-5 my-auto d-none d-md-block h-500">
              <img src={intro} className="contain-img" alt="lady smiling" />
            </div>
          </div>
          <div className="col-12 col-md-6 px-4 px-lg-5 h-100 min-vh-md-100 py-4 d-flex flex-column">
            <div className="card bg-white w-100 mt-5 shadow mt-md-auto mb-auto mx-auto mw-500">
              <div className="card-body p-5">
                <Titlesubtitle
                  title="Log into your NetWebPay account"
                  subtitle="Welcome back, continue from where you left off."
                />

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
                        errors.username = 'Please enter Email or Mobile Number';
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

                        <div className="mb-4 mt-2">
                          <Link
                            style={{ color: '#000000' }}
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
                            !values.username || !values.password ? true : false
                          }
                        />
                        <p className="text-center mt-4">
                          Don't have an account?
                          <Link
                            style={{ color: '#000000' }}
                            to="/register"
                            className="ml-2"
                          >
                            Register
                          </Link>
                          <p className="text-center mt-4"> Developed by Folayan Iluyemi Michael</p>
                        </p>
                      </form>
                    )}
                  </Formik>
                )}
              </div>
            </div>
          </div>
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
