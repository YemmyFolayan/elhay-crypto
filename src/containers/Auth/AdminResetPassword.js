import React, { Component } from 'react';
import { Formik } from 'formik';
import { Link } from '@reach/router';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import './Auth.css';
import { connect } from 'react-redux';
import {
  showAuthLoader,
  userResetPassword,
  userSignInWithToken2,
} from 'containers/Auth/Login/actions';
import Loader from 'components/Loader';
import * as Yup from 'yup';
import _ from 'lodash';
import { Titlesubtitle } from 'components/common/titlesubtitle/titlesubtitle';
import logo from 'assets/h-logo.svg';
// import logo from 'assets/xmasvesti.svg';
class AdminResetPassword extends Component {
  state = {
    modal: false,
  };

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  };

  render() {
    const { loading } = this.props;

    const resetSchema = Yup.object().shape({
      // email: Yup.string()
      //     .email('Invalid email')
      //     .required('Company email address is required'),
      confirm_password: Yup.string().required('Password is required'),
      reset_password: Yup.string()
        // .required('Confirm Password is required')
        .when('confirm_password', {
          is: val => !!(val && val.length > 0),
          then: Yup.string().oneOf(
            [Yup.ref('confirm_password')],
            'Both password need to be the same',
          ),
        }),
    });
    return (
      <>
        <div className="">
          <div className="row">
            <div
              className="col-sm-12 col-md-12 isw-container"
              style={{ height: '100vh', width: '100%', overflow: 'scroll' }}
            >
              <div
                className=" flex_page_container d-flex align-items-center justify-content-center"
                style={{ height: '100%' }}
              >
                <div className="auth_content d-flex align-items-center">
                  <div
                    className="auth_card d-flex justify-content-center flex-column"
                    style={{ margin: '0 auto', padding: '0px 50px 0px 50px' }}
                  >
                    {/* <div className="compan_logo d-flex justify-content-center">
                      <div
                        style={{ marginTop: '-2em' }}
                        className="d-flex mb-4 pb-5"
                      />
                    </div> */}
                    {loading ? (
                      <Loader />
                    ) : (
                      <div className="d-flex flex-column">
                        <div>
                          <img className="mb-4" src={logo} alt="Vetsi" />
                          <Titlesubtitle
                            title="Reset Password!"
                            subtitle="Enter and confirm your new password below."
                          />
                        </div>
                        <div>
                          <Formik
                            initialValues={{
                              password: '',
                              confirm_password: '',
                              email: '',
                              reset_password: '',
                              remember: true,
                            }}
                            validationSchema={resetSchema}
                            //     values => {
                            //     let errors = {};
                            //     if (this.props.token) {
                            //         if (values.reset_password !== values.confirm_password) {
                            //             errors.password = 'Passwords Dont Match';
                            //         }
                            //         return errors;

                            //     }
                            // }}
                            onSubmit={(values, { setSubmitting }) => {
                              let data = {};
                              // if (values.password && values.confirm_password) {
                              this.props.showAuthLoader();
                              if (this.props.token) {
                                data = {
                                  password: values.confirm_password,
                                  token: window.location.href.split('/')[
                                    window.location.href.split('/').length - 1
                                  ],
                                };
                                this.props.userSignInWithToken2(
                                  JSON.stringify(
                                    { resetId: this.props.token, ...data },
                                    null,
                                    2,
                                  ),
                                );
                              } else {
                                data = {
                                  currentPassword: values.password,
                                  newPassword: values.confirm_password,
                                };
                                this.props.userResetPassword(data);
                              }
                              // }
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
                              /* and other goodies */
                            }) => (
                              <form onSubmit={handleSubmit}>
                                {this.props.token && (
                                  <input
                                    type="password"
                                    id="reset_password"
                                    name="reset_password"
                                    className="auth_input mb-4"
                                    onChange={handleChange}
                                    placeholder="Enter New Password"
                                    onBlur={handleBlur}
                                    value={values.reset_password}
                                    invalid={
                                      errors.reset_password &&
                                      touched.reset_password &&
                                      'true'
                                    }
                                  />
                                )}
                                {!this.props.token && (
                                  <input
                                    type="password"
                                    name="password"
                                    className="auth_input mb-4"
                                    placeholder="Old Password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                  />
                                )}
                                {errors.password && touched.password && (
                                  <p className="form_errors">
                                    {errors.password}{' '}
                                  </p>
                                  // <FormFeedback></FormFeedback>
                                )}
                                {/* <p className={errors.email && touched.email ? "error_txt" : "d-none"}><img src={errorIcon} alt="" />{" " + errors.email && " " + touched.email && " " + errors.email}</p> */}
                                <input
                                  type="password"
                                  name="confirm_password"
                                  className="auth_input mb-4"
                                  placeholder={
                                    !this.props.token
                                      ? 'New Password'
                                      : 'Confirm New Password'
                                  }
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.confirm_password}
                                />
                                {errors.confirm_password &&
                                  touched.confirm_password && (
                                    <p className="form_errors">
                                      {' '}
                                      {errors.confirm_password}{' '}
                                    </p>
                                    // <FormFeedback></FormFeedback>
                                  )}

                                {/* <p className={(errors.password && touched.password) ? "error_txt pb-1" : "d-none pb-3"}><img src={errorIcon} alt="" />
                                                                        &nbsp;&nbsp;Invalid Password Match
                                                </p> */}

                                <button
                                  className="primary_btn w-100 my-3"
                                  type="submit"
                                  disabled={isSubmitting || !_.isEmpty(errors)}
                                >
                                  Continue
                                </button>
                              </form>
                            )}
                          </Formik>
                          {/* <p className="txt1 text-center mt-3">Back to <Link className="link_txt_bold " to="/auth">Login</Link></p> */}
                        </div>
                      </div>
                    )}
                  </div>
                </div>{' '}
              </div>{' '}
            </div>{' '}
          </div>{' '}
        </div>

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
          backdrop={false}
        >
          <ModalHeader toggle={this.toggle} />
          <ModalBody>
            <div className="p-3">
              <div className="text-center">
                <p className="txt_modal-1 my-4">Password change Successful</p>
                <p className="txt_modal-2 my-5 w-75 mx-auto">
                  Kindly login with your email address and new password{' '}
                </p>
                <Link to="/auth" className="link_txt">
                  <button
                    className="primary_btn w-100"
                    onClick={this.toggle}
                    type="submit"
                  >
                    Login
                  </button>
                </Link>
              </div>

              <div />
            </div>
          </ModalBody>
        </Modal>
      </>
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
  showAuthLoader,
  userResetPassword,
  userSignInWithToken2,
  // hideMessage,
  // clearCurrentLoggedInUser,
})(AdminResetPassword);
