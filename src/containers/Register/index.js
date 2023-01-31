import React, { Component } from 'react';
// import { Link } from '@reach/router';
import RegionSelect from 'react-region-flag-select';
import './Invest.css';
import { connect } from 'react-redux';
import { DatePicker } from 'antd';
import HeaderMain from 'components/common/HeaderMain';
import Select from 'react-select';
import * as Yup from 'yup';
import _ from 'lodash';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { LockIco, ChevDIco } from 'assets/assets';
import { signUpUser } from 'appRedux/actions/auth';
import { REDIRECT_URL } from 'appRedux/constants';

const SignUpSchema1 = Yup.object().shape({
  dob: Yup.date().required('Date of birth is required'),
  password: Yup.string().required('Password is required'),
  // bvn: Yup.string().required('Bvn is required'),
  email: Yup.string().required('Email is required'),
  location: Yup.string().required('Location is required'),
  phoneNumber: Yup.string().required('PhoneNo is required'),
});

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: { label: '', value: '' },
      dob: '',
      location: '',
      citizen: '',
    };
  }

  componentDidUpdate() {}

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

  render() {
    const { gender, citizen } = this.state;
    return (
      <>
        <div className="">
          <HeaderMain />
          <div>
            <div className="signup_box mx-auto mt-5 pt-5">
              <div className="w-75 mx-auto text-center">
                <p className="form_txt_1">Account Details</p>
                <p className="form_txt_2 negmarg_1">
                  US and Nigerian federal law requires all financial
                  organizations to collect this information to help prevent
                  money-laundering.
                </p>
              </div>
              <p className="form_txt_2 text-left mt-5 pt-3">
                What's your country of residence?
              </p>
              <Formik
                enableReinitialize
                initialValues={{
                  location: '',
                  citizen: '',
                  callCode: '',
                  dob: '',
                  password: '',
                  bvn: '',
                }}
                validationSchema={SignUpSchema1}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  setSubmitting(true);
                  const { countryData } = values.location;
                  const data = {
                    ...values,
                    gender: gender.value,
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
                        ? `Errors: ${Object.values(props.errors).join(', ')}`
                        : ''}
                    </div>
                    <Form>
                      <div className="countryflagselect big_flag_space my-2">
                        <RegionSelect
                          countryOnly
                          handleChange={e => {
                            props.setFieldValue('location', e, true);
                            return this.handleLocation;
                          }}
                          selectedCountryCode=""
                          className="form_element"
                        />
                        <img
                          className="down_ico"
                          src={ChevDIco}
                          alt="down"
                          width="20"
                          height="20"
                        />
                      </div>
                      <div className="d-flex justify-content-between">
                        <div className=" w-50">
                          <Field
                            className="form_element w-95"
                            placeholder="Surname *"
                            type="text"
                            name="lastName"
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="text-red-500 text-xs"
                          />
                        </div>
                        <div className=" w-50">
                          <Field
                            className="form_element w-100"
                            placeholder="First Name *"
                            type="text"
                            name="firstName"
                          />
                          <ErrorMessage
                            name="password"
                            component="div"
                            className="text-red-500 text-xs"
                          />
                        </div>
                      </div>
                      <div className="d-flex justify-content-between">
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
                          {/* <Field className="form_element w-100" type="password" name="password" /> */}
                          <ErrorMessage
                            name="password"
                            component="div"
                            className="text-red-500 text-xs"
                          />
                        </div>
                        <div className=" w-50">
                          <div className="countryflagselect small_flag_space mt-2">
                            <RegionSelect
                              countryOnly
                              selectedCountryCode=""
                              handleChange={this.handleCitizenship}
                              className="form_element"
                            />

                            <img
                              className="down_ico"
                              src={ChevDIco}
                              alt="down"
                              width="20"
                              height="20"
                            />
                          </div>
                          {/* <Field className="form_element w-100" type="email" name="email" /> */}
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="text-red-500 text-xs"
                          />
                        </div>
                      </div>
                      <div className="d-flex justify-content-between">
                        <div className=" w-75">
                          <Field
                            className="form_element w-95"
                            type="text"
                            placeholder="Phone Number"
                            name="phoneNumber"
                          />
                          <ErrorMessage
                            name="password"
                            component="div"
                            className="text-red-500 text-xs"
                          />
                        </div>
                        <div className=" w-25">
                          <Field
                            className="form_element w-100"
                            component={() => (
                              <Select
                                className="form_element form_select_1"
                                name="color"
                                placeholder="Gender"
                                defaultValue={gender}
                                onChange={e => this.setState({ gender: e })}
                                options={[
                                  { label: 'Male', value: 'male' },
                                  { label: 'Female', value: 'female' },
                                  { label: 'Other', value: 'other' },
                                ]}
                              />
                            )}
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="text-red-500 text-xs"
                          />
                        </div>
                      </div>
                      <div className=" w-100">
                        <Field
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
                        <Field
                          className="form_element w-100"
                          placeholder="Password"
                          type="password"
                          name="password"
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="text-red-500 text-xs"
                        />
                      </div>
                      <div className="d-flex mt-5 pt-5 ">
                        <img src={LockIco} className="" alt="" />
                        <p className="my-4 mx-3 low_txt">
                          Your Information is Encrypted and Securely
                          <br />
                          transmitted using SSL.
                        </p>
                      </div>
                      <button
                        type="submit"
                        className="btn w-100 mb-4 primary_btn"
                        disabled={
                          !props.dirty ||
                          !_.isEmpty(props.errors) ||
                          props.isSubmitting
                        }
                      >
                        Submit
                      </button>
                      <div className="mb-5 pb-5">
                        <center className="mb-5 pb-5">Cancel</center>
                      </div>
                    </Form>
                  </>
                )}
              </Formik>
            </div>
          </div>
        </div>
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
  signUpUser,
})(Register);
