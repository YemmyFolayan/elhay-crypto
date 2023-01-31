import { navigate } from '@reach/router';
import { openNotificationWithIcon } from 'appRedux/actions/Common';
import api from 'appRedux/api';
import Layout from 'components/common/DashboardLayout';
import Loader from 'components/Loader';
import { Field, Form, Formik, FieldArray, useFormikContext } from 'formik';
import { useStep } from 'helpers/hooks';
import { errorMessage } from 'helpers/utils';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import './createpathway.scss';
import { Myselect } from 'components/selectactions/selectActions';
// Step 0
const DetailsStep = ({ nextStep }) => {
  const { setFieldValue } = useFormikContext();
  return (
    <div>
      <h3 style={{ color: 'rgb(204, 204, 204)' }}>
        Pathway Detail &bull; <span className="text-dark">1 of 2</span>
      </h3>
      <p style={{ fontWeight: 300, maxWidth: '220px' }}>
        Once you create a pathway, it will become visible.
      </p>
      <div style={{ maxWidth: '500px' }}>
        <div className="mb-3">
          <label htmlFor="pathwayTitle" className="form-label">
            Pathway Name
          </label>
          <Field name="pathwayTitle" className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="estCost" className="form-label">
            Estimated Cost (USD)
          </label>
          <Field name="pathwayCost" className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="pathwayDescription" className="form-label">
            Pathway Description
          </label>
          <Field
            name="pathwayDescription"
            as="textarea"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="pathwayLogo" className="form-label">
            Pathway Image
          </label>
          <input
            className="form-control"
            type="file"
            name="pathwayLogo"
            onChange={event => {
              setFieldValue(
                'pathwayLogo',
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
            nextStep();
          }}
        >
          Next
        </a>
      </div>
    </div>
  );
};

// Step 1
const StagesStep = ({ previousStep }) => {
  // get formik field value
  const { values, submitForm } = useFormikContext();
  return (
    <div>
      <h3 style={{ color: 'rgb(204, 204, 204)' }}>
        Pathway Stages &bull; <span className="text-dark">2 of 2</span>
      </h3>
      <p style={{ fontWeight: 300, maxWidth: '220px' }}>
        Once you create a pathway, it will become visible.
      </p>
      <div style={{ maxWidth: '500px' }}>
        <FieldArray
          name="stages"
          render={({ push, pop }) => (
            <>
              {values.stages.map((_, idx) => (
                <StageFields key={idx} idx={idx} />
              ))}
              <div className="d-flex justify-content-end">
                <a
                  href="/"
                  onClick={e => {
                    e.preventDefault();
                    push({
                      stageTitle: '',
                      stageDescription: '',
                      action: [],
                    });
                  }}
                  className="default-btn mr-3"
                >
                  Add
                </a>
                <a
                  href="/"
                  onClick={e => {
                    e.preventDefault();
                    values.stages.length > 1 && pop();
                  }}
                  className="default-btn"
                >
                  Remove
                </a>
              </div>
            </>
          )}
        />
        <div>
          <a
            href="/"
            className="default-btn-outline mr-4"
            onClick={e => {
              e.preventDefault();
              previousStep();
            }}
          >
            Back
          </a>
          <a
            href="/"
            className="default-btn"
            onClick={e => {
              e.preventDefault();
              submitForm();
            }}
          >
            Finish
          </a>
        </div>
      </div>
    </div>
  );
};

const StageFields = ({ idx }) => {
  const { data } = useQuery('pathwayActions', () =>
    api
      .get('/provider/pathwayActions')
      .then(res => res.data)
      .catch(err => err),
  );
  const pathwayActions = data?.pathwayActions ?? [];

  // eslint-disable-next-line
  const { values, submitForm } = useFormikContext();
  const pushIt = value => {
    values.stages[idx].action.push(value.value);
  };
  const popIt = value => {
    const index = values.stages[idx].action.indexOf(value);
    if (index > -1) {
      values.stages[idx].action.splice(index, 1);
    }
  };
  // let miniActions = []

  return (
    <>
      <h4 className="mb-3">Stage {idx + 1}</h4>
      <div className="mb-3">
        <label htmlFor="stageTitle" className="form-label">
          Stage Title
        </label>
        <Field name={`stages.${idx}.stageTitle`} className="form-control" />
      </div>
      <div className="mb-3">
        <label htmlFor="stageDescription" className="form-label">
          Stage Description
        </label>
        <Field
          name={`stages.${idx}.stageDescription`}
          as="textarea"
          className="form-control"
        />
      </div>
      <Myselect
        // value = {values.stages[idx].actions}
        title={values.stages[idx].stageTitle}
        onChange={pushIt}
        delete={popIt}
        options={pathwayActions}
        select={values.stages[idx].action}
      />

      <hr className="create-hr" />
    </>
  );
};

const CreatePathway = () => {
  const { step, previousStep, nextStep } = useStep(0);
  const _renderStepContent = () => {
    const stepProps = () => ({ step, nextStep, previousStep });
    switch (step) {
      case 0:
        return <DetailsStep {...stepProps()} />;
      case 1:
        return <StagesStep {...stepProps()} />;

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
                  pathwayTitle: '',
                  pathwayDescription: '',
                  pathwayLogo: '',
                  pathwayCost: '',
                  stages: [
                    { stageTitle: '', stageDescription: '', action: [] },
                  ],
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

                  // console.log(form_data);
                  api
                    .post('/providerCreatePathway', form_data)
                    .then(
                      () => setSubmitting(false),
                      openNotificationWithIcon(
                        'Pathway Created!',
                        'Success',
                        'success',
                      ),
                      // navigate("/pathways")
                      setTimeout(() => {
                        navigate('/pathways');
                      }, 1000),
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

export default CreatePathway;

// eslint-disable-next-line
{
  /* <FieldArray
          name={`stages.${idx}.actions`}
          render={({ push, pop }) => (
            <>
            
              { values.stages[idx].actions.length > 0?
                <Myselect
                  options ={pathwayActions}
                />
               : 
                // <StageFields key={idx} idx={idx} />
                <div className="create-pathway-actions">

                  <div className="mb-3">
                    <label htmlFor="stageAction" className="form-label">
                      <h4 className="mb-3">Stage Action {idx + 1}</h4>
                    </label>
                    <Field
                      // name={`stages.${idx}.actions`}
                      as="select"
                      className="form-control"
                      key={idx} idx={idx} 
                      
                    >
                      <option value="" disabled hidden className="text-muted">
                        Select an action
                      </option>
                      {pathwayActions.map(action => (
                        <option key={action.id} value={action.id}>
                          {action.title}
                        </option>
                      ))}
                    </Field>
                    
                  </div>

                  <div className="d-flex justify-content-end actions-btn">
                    <a
                      href="/"
                      onClick={e => {
                        e.preventDefault();
                        push({
                          // stageTitle: '',
                          // stageDescription: '',
                          actions: values.stages[idx].actions.push("Nnew Work"),
                        });


                      }}
                      className="default-btn mr-3"
                    >
                      Add
                    </a>
                    <a
                      href="/"
                      onClick={e => {
                        e.preventDefault();
                        values.stages.actions.length > 1 && pop();
                      }}
                      className="default-btn"
                    >
                      Remove
                    </a>
                  </div>

                  </div>
              }
                
              
            </>
          )}
      /> */
}
