import { navigate } from '@reach/router';
import { openNotificationWithIcon } from 'appRedux/actions/Common';
import api from 'appRedux/api';
import Layout from 'components/common/DashboardLayout';
import Loader from 'components/Loader';
import { Field, Form, Formik, useFormikContext } from 'formik';
import { useStep } from 'helpers/hooks';
import { errorMessage } from 'helpers/utils';
import React, { useState } from 'react';

// Step 0
const DetailsStep = ({ nextStep }) => {
  const { setFieldValue, submitForm } = useFormikContext();
  return (
    <div>
      <h3 style={{ color: 'rgb(204, 204, 204)' }}>
        Service Detail &bull; <span className="text-dark">1 of 1</span>
      </h3>
      <p style={{ fontWeight: 300, maxWidth: '220px' }}>
        Once you create a service, it will become visible.
      </p>
      <div style={{ maxWidth: '500px' }}>
        <div className="mb-3">
          <label htmlFor="service" className="form-label">
            Service Name
          </label>
          <Field name="service" className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="service" className="form-label">
            Payment Currency
          </label>
          <Field name="currency" as="select" className="form-control">
            <option value="NGN_KOBO">NGN</option>
            <option value="USD_CENTS">USD</option>
          </Field>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Payment Cost (Numbers only)
          </label>
          <Field name="amount" className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Service Description
          </label>
          <Field name="description" as="textarea" className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Service Image
          </label>
          <input
            className="form-control"
            type="file"
            name="image"
            onChange={event => {
              setFieldValue(
                'image',
                event.currentTarget.files.length
                  ? event.currentTarget.files[0]
                  : '',
              );
            }}
          />
        </div>
        <a
          href="/"
          className="default-btn w-100"
          onClick={e => {
            e.preventDefault();
            submitForm();
          }}
        >
          Next
        </a>
      </div>
    </div>
  );
};

const CreateService = () => {
  const { step, previousStep, nextStep } = useStep(0);
  const _renderStepContent = () => {
    const stepProps = () => ({ step, nextStep, previousStep });
    switch (step) {
      case 0:
        return <DetailsStep {...stepProps()} />;

      default:
        return <>Not Found</>;
    }
  };
  const [submitting, setSubmitting] = useState(false);
  return (
    <Layout>
      <div>
        <div
          className=" isw-container"
          style={{ height: '85vh', width: '100%', overflow: 'scroll' }}
        >
          <div className=" flex_page_container d-flex justify-content-center">
            <div className=" px-3 px-md-4 px-lg-5 w-100">
              <Formik
                initialValues={{
                  service: '',
                  description: '',
                  image: '',
                  currency: 'NGN_KOBO',
                  amount: '',
                }}
                onSubmit={values => {
                  console.log(values);
                  setSubmitting(true);
                  var form_data = new FormData();

                  for (var key in values) {
                    const value = Array.isArray(values[key])
                      ? JSON.stringify(values[key])
                      : values[key];
                    form_data.append(key, value);
                  }

                  api
                    .post('/provider/createProviderServices', form_data)
                    .then(
                      () =>
                        openNotificationWithIcon(
                          'Service Created!',
                          'Success',
                          'success',
                        ),
                      navigate('/services'),
                    )
                    .catch(err =>
                      openNotificationWithIcon(
                        errorMessage(err),
                        'Error',
                        'error',
                      ),
                    )
                    .finally(() => setSubmitting(false));
                }}
              >
                {submitting ? (
                  <Loader />
                ) : (
                  <Form className="pt-5">{_renderStepContent()}</Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateService;
