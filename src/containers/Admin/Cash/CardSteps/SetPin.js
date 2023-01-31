import DividedPinInput from 'components/common/DividedPinInput';
import Loader from 'components/Loader';
import { connect } from 'formik';
import React, { useState } from 'react';

const SetPin = ({ previousStep, formik }) => {
  const setPin = value => formik.setFieldValue('cardPin', value);
  const [loading, setLoading] = useState(false);
  return (
    <div>
      <h3 style={{ color: '#CCCCCC' }}>
        Set Card Pin • <span className="text-dark">2 of 2</span>
      </h3>
      <p
        className="mb-4"
        style={{
          maxWidth: '400px',
          fontWeight: 400,
        }}
      >
        Set Your Pin to continue creation of the virtual cards.
      </p>

      <div className="mb-5">
        <DividedPinInput onChange={setPin} />
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <a
            href="/"
            onClick={e => {
              e.preventDefault();
              previousStep();
            }}
            className="default-btn-outline mr-4"
          >
            Previous
          </a>
          <a
            href="/"
            onClick={e => {
              setLoading(true);
              e.preventDefault();
              formik.submitForm();

              // nextStep();
            }}
            className="default-btn"
          >
            Create
          </a>
        </div>
      )}
    </div>
  );
};

export default connect(SetPin);
