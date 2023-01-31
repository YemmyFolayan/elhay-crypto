import { navigate } from '@reach/router';
import {
  openNotificationWithIcon,
  openNotificationWithIconErr,
} from 'appRedux/actions/Common';
import api from 'appRedux/api';
import Modal from 'components/common/Modal';
import { Form, Formik, Field } from 'formik';
import { useStep } from 'helpers/hooks';
import { errorMessage } from 'helpers/utils';
import React, { useRef } from 'react';
import { useQuery } from 'react-query';
import PathOne from '../../../assets/NetWebPay-path-1.svg';

const OnBoardingStep = ({ nextStep }) => {
  return (
    <div className="mx-auto py-3 text-center" style={{ maxWidth: '400px' }}>
      <div className="mb-3">
        <img
          src={PathOne}
          style={{ width: '100%', objectFit: 'contain', marginBottom: '1rem' }}
          alt="First Step"
        />
      </div>
      <div style={{ fontWeight: 600, fontSize: '24px' }} className="mb-2">
        Become a NetWebPay Provider
      </div>
      <p style={{ fontWeight: 300, fontSize: '18px' }}>
        You can create services you are willing to offer, so intending users can
        enroll for such services
      </p>
      <a
        href="/"
        className="default-btn w-100"
        onClick={e => {
          e.preventDefault();
          nextStep();
        }}
      >
        Proceed
      </a>
    </div>
  );
};

const ProviderRegisterStep = ({ nextStep }) => {
  const submitButton = useRef(null);
  const { data } = useQuery('pathwayActions', () =>
    api
      .get('/providerCategory')
      .then(res => res.data)
      .catch(err => err),
  );
  const categories = data?.category ?? [];
  return (
    <div>
      <div style={{ fontWeight: 600, fontSize: '26px' }} className="mb-2">
        Apply to be a Provider
      </div>
      <p
        className="mb-4"
        style={{ fontWeight: 300, fontSize: '14px', maxWidth: '250px' }}
      >
        Apply to be a NetWebPay provider, this allows you to provide services to
        vesti users.
      </p>
      <Formik
        initialValues={{
          registeredUser: '',
          serviceDescription: '',
          serviceCategory: '',
          companyName: '',
          companyWebsite: '',
        }}
        onSubmit={values => {
          if (
            values.registeredUser === '' ||
            values.serviceDescription === '' ||
            values.serviceCategory === '' ||
            values.companyName === ''
          ) {
            openNotificationWithIconErr(
              'Some inputs are empty, please input right details',
              'Error',
            );
          } else {
            api
              .post('/provider/applyAsProvider', values)
              .then(res => {
                openNotificationWithIcon(
                  'You have successfully applied to be a provider',
                  'Success',
                  'success',
                );
                navigate('/dashboard');
              })
              .catch(err => {
                openNotificationWithIconErr(
                  errorMessage(err),
                  'Provider Registration',
                  'error',
                );
              });
          }
        }}
      >
        <Form>
          <div className="form-group mb-3">
            <label htmlFor="name" className="sr-only">
              Service Category
            </label>
            <Field
              name="serviceCategory"
              as="select"
              placeholder="Enter service category"
              className="form-control"
            >
              <option value="" disabled hidden>
                Select your category
              </option>
              {categories.map(action => (
                <option key={action} value={action}>
                  {action}
                </option>
              ))}
            </Field>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="name" className="sr-only">
              Service Description
            </label>
            <Field
              as="textarea"
              name="serviceDescription"
              placeholder="Enter your service description"
              className="form-control"
            />
          </div>
          <div className="form-row">
            <div className="form-group mb-3 col-12 col-md-6">
              <label htmlFor="name" className="sr-only">
                Company Business Name
              </label>
              <Field
                name="companyName"
                placeholder="Company Business Name"
                className="form-control"
              />
            </div>
            <div className="form-group mb-3 col-12 col-md-6">
              <label htmlFor="name" className="sr-only">
                Registered
              </label>
              <Field
                name="registeredUser"
                as="select"
                placeholder="Are you registered?"
                className="form-control"
              >
                <option disabled hidden value="">
                  Are you registered?
                </option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Field>
            </div>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="name" className="sr-only">
              Company Website
            </label>
            <Field
              name="companyWebsite"
              placeholder="Your company website (Optional)"
              className="form-control"
            />
          </div>
          <button className="d-none" ref={submitButton} type="submit"></button>
        </Form>
      </Formik>

      <a
        href="/"
        className="default-btn w-100"
        onClick={e => {
          e.preventDefault();
          submitButton.current.click();
        }}
      >
        Apply to be a provider
      </a>
    </div>
  );
};

const FinishedStep = () => {
  return (
    <div>
      <div>Finished</div>
      <a
        href="/"
        className="default-btn w-100"
        onClick={e => {
          e.preventDefault();
        }}
      >
        Finished
      </a>
    </div>
  );
};

const Provider = props => {
  const { step, nextStep, previousStep } = useStep(0);

  const _renderStepContent = () => {
    const stepProps = () => ({ step, nextStep, previousStep });
    switch (step) {
      case 0:
        return <OnBoardingStep {...stepProps()} />;
      case 1:
        return <ProviderRegisterStep {...stepProps()} />;
      case 2:
        return <FinishedStep {...stepProps()} />;

      default:
        return <>Not Found</>;
    }
  };
  return (
    <Modal
      isOpen={props.from ? props.value : true}
      onClose={() => (props.from ? props.close() : navigate('/bank'))}
    >
      {_renderStepContent()}
    </Modal>
  );
};

export default Provider;
