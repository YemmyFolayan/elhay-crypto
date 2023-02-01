import React, { useState } from 'react';
import { Link, navigate } from '@reach/router';
import '../Authentication.scss';
import { Formik } from 'formik';
import Loader from 'components/Loader';
import logo from '../../../assets/logo.png';
// import logo from '../../../assets/xmasvesti.svg';
import intro from '../../../assets/logo.png';
import api from 'appRedux/api';
import {
  openNotificationWithIcon,
  openNotificationWithIconErr,
} from 'appRedux/actions/Common';
import { errorMessage } from 'helpers/utils';
import { Titlesubtitle } from 'components/common/titlesubtitle/titlesubtitle';
// import Singleinputlabelcol from 'components/common/inputs/singleinputlabelcol';
import { Shortinfo } from 'components/common/shortinfo/shortinfo';
import Inputfloat from 'components/common/inputs/inputfloat';
import { Platformbutton } from 'components/common/button/button';
const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [check, setCheck] = useState(false);

  const query = window.location.search;
  const referalCode = new URLSearchParams(query).get('referalCode');
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-md-6 px-2 px-md-4 px-lg-5 h-100 min-vh-md-100 py-4 d-flex flex-column">
          {/* Horizontal Navbar */}
          <nav className="d-flex align-items-center">
            {/* nav header */}
            <div className="navbar-header mr-4">
              <a className="navbar-brand" href="/">
                <div className="sr-only">NetWebPay</div>
                <img src={logo} alt="NetWebPay" width="20px" height="20px"/>
              </a>
            </div>
            {/* <div className="d-flex pt-2">
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
              
            </div> */}
          </nav>
          {/* /nav header */}
          {/* content */}
          <div className="py-5 my-auto d-none d-md-block h-500">
            <img src={intro} className="contain-img" alt="lady smiling" />
          </div>
        </div>
        <div className="col-12 col-md-6 px-4 px-lg-5 h-100 min-vh-md-100 py-4 d-flex flex-column">
          <div className="regcard card bg-white w-100 mt-5 shadow mt-md-auto mb-auto mx-auto mw-500">
            <div className="card-body p-5">
              <Titlesubtitle
                title="Create Your
                vesti Account"
                subtitle="Join more than 4,000 users preparing for a new life aboard with Elhay Crypto Wallets."
              />
              {loading ? (
                <Loader />
              ) : (
                <Formik
                  enableReinitialize
                  initialValues={{
                    username: '',
                    referal_code: '',
                    password: '',
                    confirm_password: '',
                  }}
                  validate={values => {
                    const errors = {};
                    if (!values.username) {
                      errors.username = 'Please enter Email';
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
                    if (values.password !== values.confirm_password) {
                      errors.confirm_password = 'Both Passwords must match';
                    }
                    return errors;
                  }}
                  onSubmit={values => {
                    let data = {};
                    if (values.username && values.password) {
                      setLoading(true);
                      data = {
                        email: values.username,
                        password: values.password,
                      };

                      api
                        .post('/auth/new-register', {
                          ...data,
                          referalCode: values.referal_code,
                        })
                        .then(res => {
                          openNotificationWithIcon(
                            'Account successfully created! Please log in, also check your email for verification',
                            'Registration Successful!',
                            'success',
                          );
                          navigate('/auth');
                        })
                        .catch(err => {
                          console.log(errorMessage(err));
                          setLoading(false);
                          openNotificationWithIconErr(
                            errorMessage(err),
                            'Registration Error',
                            'error',
                          );
                        });
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
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <Inputfloat
                        label="Email"
                        type="email"
                        id="username"
                        name="username"
                        className="form_element w-100"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.username}
                        placeholder="Email Address"
                        invalid={errors.username && touched.username && 'true'}
                      />
                      {errors.username && touched.username && (
                        <div className="text-danger">{errors.username}</div>
                      )}
                      <div className="mb-2"></div>
                      {/* <input
                        id="password"
                        type="password"
                        name="password"
                        className="form_element w-100"
                        placeholder="Password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        invalid={errors.password && touched.password && 'true'}
                      />
                      {errors.password && touched.password && (
                        <div className="text-danger">
                          {errors.password}
                        </div>
                      )}
                 */}

                      <Inputfloat
                        label="password"
                        type="password"
                        name="password"
                        value={values.password}
                        disabled={false}
                        placeholder="Enter password"
                        onChange={handleChange}
                        invalid={errors.password && touched.password && 'true'}
                        error={
                          errors.password && touched.password && errors.password
                        }
                      >
                        {values.password.length < 8 && (
                          <Shortinfo subject="Password must contain at least 8 characters" />
                        )}
                      </Inputfloat>
                      <div className="mb-2"></div>
                      <Inputfloat
                        label="confirm password"
                        type="password"
                        name="confirm_password"
                        value={values.confirm_password}
                        disabled={false}
                        placeholder="Confirm password"
                        onChange={handleChange}
                        invalid={
                          errors.confirm_password &&
                          touched.confirm_password &&
                          'true'
                        }
                        error={
                          errors.confirm_password &&
                          touched.confirm_password &&
                          errors.confirm_password
                        }
                      />
                      <div className="mb-2"></div>

                      <Inputfloat
                        label="referral code"
                        type="text"
                        name="referal_code"
                        value={referalCode}
                        disabled={false}
                        placeholder="Referral Code"
                        onChange={handleChange}
                      />
                      <div className="mb-2"></div>
                      {/* <input
                        id="confirm_password"
                        type="password"
                        name="confirm_password"
                        className="form_element w-100 mb-4"
                        placeholder="Confirm Password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.confirm_password}
                        invalid={
                          errors.confirm_password &&
                          touched.confirm_password &&
                          'true'
                        }
                      />
                      {errors.confirm_password && touched.confirm_password && (
                        <div className="text-danger">
                          {errors.confirm_password}
                        </div>
                      )} */}
                      <div className="mb-4"></div>
                      <label
                        className="form-ctrl mt-2"
                        style={{ width: '100%' }}
                      >
                        <input
                          type="checkbox"
                          name="checkbox"
                          onChange={() => setCheck(!check)}
                          checked={check}
                        />
                        <span className="signup-agree">
                          {' '}
                          {'I agree to vesti '}{' '}
                          <Link
                            className="link"
                            to="/disclosure"
                            style={{ marginRight: '5px' }}
                          >
                            {' '}
                            Terms of Service
                          </Link>{' '}
                          &{' '}
                          <Link className="link" to="/privacy">
                            {' '}
                            Privacy Policy
                          </Link>
                        </span>
                      </label>
                      <Platformbutton
                        name="Register"
                        type="submit"
                        disabled={check ? false : true}
                      />
                      {/* <button
                        className="default-btn w-100 mb-2"
                        type="submit"
                        disabled={check ? false : true}
                      >
                        Register
                      </button> */}
                      <div className="mb-2"></div>
                      <p className="text-center">
                        Have an account?
                        <Link
                          style={{ color: '#000000' }}
                          to="/auth"
                          className="ml-2"
                        >
                          Login
                        </Link>
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
};

export default SignUp;
