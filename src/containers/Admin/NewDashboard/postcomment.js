import React from 'react';
import { Form, Formik, Field } from 'formik';
import '../Admin.css';
export const Postcomment = props => {
  return (
    <Formik
      initialValues={{
        title: 'Currently in Englan',
        comment: '',
        // image: props.userData.profilePictureURL,
      }}
      className="w-100"
      onSubmit={(values, { resetForm }) => {
        props.postComment(values, props.id);
        resetForm({ values: '' });
      }}
    >
      <Form
        className={`comment-box ${
          props.openComment === props.id ? ' active' : ' disable'
        } w-100`}
      >
        <Field
          className="comment-textarea"
          style={{
            width: '100%',
            height: '250px',
            // border: '1px solid #eaeaea',
            background: '#f8f9f8',
            borderRadius: '10px',
          }}
          as="textarea"
          name="comment"
          placeholder="type here...."
          cols="30"
          rows="5"
        />

        <button
          type="submit"
          className="btn d-flex justify-content-center align-items-center"
          style={{
            background: '#000000',
            color: '#fff',
            width: '170px',
            height: '45px',
          }}
        >
          {' '}
          Post Comment
        </button>
      </Form>
    </Formik>
  );
};
