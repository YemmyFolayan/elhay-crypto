import React, { Component } from 'react';
import { Link } from '@reach/router';
import './Authentication.scss';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import {
  showAuthLoader,
  userSendResetPasswordLink,
  clearCurrentLoggedInUser,
} from 'containers/Auth/Login/actions';
import Loader from 'components/Loader';
import { redirectFeedsDashboard } from 'routes/RedirectRoutes';
import { getSessionWithKey } from 'appRedux/store/cookies';
import 'containers/Auth/Auth.css';
import { Titlesubtitle } from 'components/common/titlesubtitle/titlesubtitle';
// import { AdminForgotPassword } from 'containers/Auth/AdminForgotPassword';

// const errorIcon = require("assets/error_icon.svg");
// const sentIcon = require("assets/sent.svg");
import logo from 'assets/logo-no-background.svg';
// import logo from 'assets/xmasvesti.svg';
class AdminForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.props.clearCurrentLoggedInUser(); // this is tom clear the current logged in user
    this.state = {
      username: '',
      rememberMe: false,
      modal: false,
      email: this.props.userEmail,
      linkModal: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.userEmail) {
      // .setState({ linkModal: true })
      return {
        linkModal: true,
        // modal: true
      };
    }
    return null;
  }

  async componentDidMount() {
    // this.props.clearCurrentLoggedInUser(); // this is tom clear the current logged in user

    const username = await getSessionWithKey('remember_me');
    this.setState({
      username: username || '',
      rememberMe: !!username,
    });
  }

  componentDidUpdate() {
    if (this.props.authUser !== null) {
      redirectFeedsDashboard();
    }
  }

  render() {
    const {
      // showMessage,
      // loader,
      // display,
      loading,
    } = this.props;

    return (
      <>
        <div className="">
          <div className="row">
            <div
              className="col-sm-12 col-md-12 isw_auth_container"
              style={{ height: '100vh', width: '100%', overflow: 'scroll' }}
            >
              <div className=" ">
                <div className="d-flex">
                  {/* <div className="flex-fill w-75">
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ height: '100vh' }}
                    >
                      <div className="logo_landing" />
                      <div className=" faq_top_left">
                        <Link to="/auth" className="landing_txt_links">
                          Login
                        </Link>
                      </div>
                      <div className="px-5 mx-md-5">
                        <Link to="/register">
                          <div className="btn_landing px-5 py-3">Register</div>
                        </Link>
                      </div>
                    </div>
                  </div> */}
                  <div className="flex-fill w-100 justify-content-center align-items-center">
                    <div
                      clasName="d-flex justify-content-center align-items-center "
                      style={{ height: '100vh' }}
                    >
                      <div className="auth_content d-flex align-items-center">
                        <div
                          className="auth_card d-flex justify-content-center flex-column"
                          style={{
                            margin: '0 auto',
                            height: 'fit-content',
                            padding: '50px 50px 0px 50px',
                          }}
                        >
                          {/* <div className="compan_logo d-flex justify-content-center">
                            <div className="d-flex mb-5 pb-5" />
                          </div> */}
                          {loading ? (
                            <Loader />
                          ) : (
                            <div className="d-flex flex-column">
                              <div className="d-flex mb-2">
                                <div>
                                  <img
                                    className="mb-4"
                                    src={logo}
                                    alt="netwebpay"
                                    width= "20%"
                                    height="20%"
                                    
                                  />
                                  <Titlesubtitle
                                    title="Forgot Your Password ?"
                                    subtitle="Enter your email below to receive your
                                    password reset instructions"
                                  />
                                </div>
                              </div>

                              <div>
                                <Formik
                                  initialValues={{ email: '' }}
                                  validate={values => {
                                    const errors = {};
                                    if (!values.email) {
                                      errors.email = 'Required';
                                    } else if (
                                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                        values.email,
                                      )
                                    ) {
                                      errors.email = 'Invalid email address';
                                    }
                                    return errors;
                                  }}
                                  onSubmit={(values, { setSubmitting }) => {
                                    const data = {
                                      redirectURL: `${window.location.origin}/auth/reset-password`,
                                    };

                                    this.props.userSendResetPasswordLink(
                                      values.email,
                                      data,
                                    );
                                  }}
                                >
                                  {({
                                    values,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                    isSubmitting,
                                  }) => (
                                    <form onSubmit={handleSubmit}>
                                      <input
                                        type="email"
                                        name="email"
                                        className="auth_input mb-3"
                                        onChange={handleChange}
                                        placeholder="Email Address"
                                        onBlur={handleBlur}
                                        value={values.email}
                                      />

                                      <button
                                        className="primary_btn w-100"
                                        type="submit"
                                        disabled={
                                          values.email === '' || isSubmitting
                                        }
                                      >
                                        Reset Password
                                      </button>
                                    </form>
                                  )}
                                </Formik>
                                <p className="txt1 text-center my-5">
                                  Back to{' '}
                                  <Link className="link_txt_bold " to="/auth">
                                    Login
                                  </Link>
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ auth, common }) => {
  const { loader, alertMessage, showMessage, authUser, userEmail } = auth;
  const { display, message, loading } = common;
  return {
    loader,
    alertMessage,
    showMessage,
    authUser,
    display,
    message,
    loading,
    userEmail,
  };
};

export default connect(mapStateToProps, {
  userSendResetPasswordLink,
  showAuthLoader,
  clearCurrentLoggedInUser,
})(AdminForgotPassword);

AdminForgotPassword.defaultName = 'AdminForgotPassword';
