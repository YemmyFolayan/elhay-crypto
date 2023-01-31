import React from 'react';
import { Form } from 'antd';
// import {Formik,Field } from 'formik';

const SuggestionForm = props => {
  return (
    <Form style={{ width: '100%' }}>
      <div className="w-100 flex-fill pt-4" style={{ width: '100%' }}>
        <h1 style={{ color: '#000000' }}>Suggestion Box</h1>
        <p style={{ color: '#000080' }}>
          Create a unique handle to identify the end-user and check to ensure it
          is available.
        </p>
        <div className="">
          <textarea
            style={{
              width: '100%',
              border: '1px solid #eaeaea',
              background: '#F0F3EE',
              borderRadius: '10px',
            }}
            name="description"
            className="create-post focusGreen"
            placeholder="Your suggestion goes in here...."
            id=""
            cols="45"
            rows="8"
          ></textarea>
        </div>

        {/* <Formik>
                    <Form>
                        <Field
                        style={{
                            width: '100%',
                            border: '1px solid #eaeaea',
                            background: '#F0F3EE',
                            borderRadius: '10px',
                        }}
                        as="textarea"
                        name="description"
                        placeholder="Your suggestion goes in here...."
                        className="create-post focusGreen"
                        cols="45" rows="8"
                        />
                    </Form>
                </Formik> */}
      </div>
      <div className="btn-container">
        <div
          type="submit"
          className="btn-left"

          // onClick={()=>{
          //     props.setStep(1)}}
        >
          Back
        </div>
        <button type="submit" className="btn-right">
          Continue
        </button>
      </div>
    </Form>
  );
};
export default SuggestionForm;
