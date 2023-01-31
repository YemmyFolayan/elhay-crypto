import React, { useState } from 'react';
import Singleinputlabelrow from 'components/common/inputs/singleinputlabelrow';
import { Success } from 'components/common/success/success';
import axios from 'axios';
import { openNotificationWithIcon } from 'appRedux/actions/Common';
import './JobApplication.scss';
import './CvUpload.scss';
import picture from '../../../assets/picture.svg';
// import { Row } from "reactstrap";
const config = {
  cors: 'https://cors-anywhere.herokuapp.com/', // <optional> doesn't display the cors error
  formUrl:
    'https://docs.google.com/forms/d/1-JJqfSAs3A_GvagJtM46o6XHCFMfkhfldPrGATazAl4/formResponse',
};
export const JobApplication = props => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    firstName: { id: 446042392, value: '' },
    lastName: { id: 446042392, value: '' },
    email: { id: 1703103971, value: '' },
    number: { id: 545064400, value: '' },
    linkedinUrl: { id: 845960363, value: '' },
    portfolioUrl: { id: 845960363, value: '' },
  });

  var setInput = e => {
    var firstName = e.target.firstName;
    var lastName = e.target.lastName;
    var linkedinUrl = e.target.linkedinUrl;
    var portfolioUrl = e.target.portfolioUrl;
    var value = e.target.value;

    // setForm({...form, [name]:{...[name], value: value }})
    setForm(
      {
        ...form,
        [firstName]: { ...form[firstName], value: value },
        [lastName]: { ...form[lastName], value: value },
        [linkedinUrl]: { ...form[linkedinUrl], value: value },
        [portfolioUrl]: { ...form[portfolioUrl], value: value },
      },
      [form],
    );
  };

  const applyToJob = async e => {
    e.preventDefault();
    const formData = new FormData();

    for (var key in form) {
      const value = Array.isArray(form[key])
        ? JSON.stringify(form[key])
        : form[key];
      formData.append(`entry.${value.id}`, value.value);
    }
    console.log(formData);
    await axios({
      url: `${config.formUrl}`,
      method: 'post',
      data: formData,
      responseType: 'json',
    })
      .then(res => {
        openNotificationWithIcon('Your application was Successful', 'success');
        // setLoading(false);
      })
      .catch(error => {
        // openNotificationWithIconErr(
        //     errorMessage(error),
        //     'vesti card reservation',
        //     'error',
        //   );
        openNotificationWithIcon('Your application was Successful', 'success');
        setStep(1);
      });
  };

  switch (step) {
    case 0:
      return (
        <div className="jobapplication-cont">
          <p>Job Application</p>
          <Myform form={form} setInput={setInput} applyToJob={applyToJob} />
        </div>
      );
    case 1:
      return (
        <Success
          title="Application Successful"
          subtitle={`Perfect! Thank you so much for your application, your application has been successfully received. We will review and contact you.`}
          button="Okay, Thank you!"
          onClick={props.onClick}
        />
      );
    default:
      return <p>Error</p>;
  }
};

const Myform = props => {
  return (
    <form onSubmit={e => props.applyToJob(e)} className="jobapplication">
      <div className="row">
        <Singleinputlabelrow
          type="text"
          label=""
          name="firstName"
          placeholder="First Name"
          value={props.form.firstName.value}
          disabled={false}
          onChange={props.setInput}
          // row="yes"
        />
        <Singleinputlabelrow
          type="text"
          label=""
          name="lastName"
          placeholder="Last Name"
          value={props.form.lastName.value}
          disabled={false}
          onChange={props.setInput}
          // row="yes"
        />
      </div>

      <div className="row">
        <Singleinputlabelrow
          type="text"
          label=""
          name="email"
          value={props.form.email.value}
          placeholder="Email address"
          disabled={false}
          onChange={props.setInput}
          // row="yes"
        />
        <Singleinputlabelrow
          type="number"
          label=""
          name="number"
          value={props.form.number.value}
          placeholder="Phone number"
          disabled={false}
          onChange={props.setInput}
          // row="yes"
        />
      </div>

      <div className="row">
        <Singleinputlabelrow
          type="text"
          label=""
          name="linkedinUrl"
          placeholder="Linkedin URL"
          value={props.form.linkedinUrl.value}
          disabled={false}
          onChange={props.setInput}
          // row="yes"
        />
        <Singleinputlabelrow
          type="url"
          label=""
          name="portfolioUrl"
          placeholder="Portfolio URL"
          value={props.form.portfolioUrl.value}
          disabled={false}
          onChange={props.setInput}
          // row="yes"
        />
      </div>

      <Cvdoc
      // value ={front}
      // id="front-btn"
      // setValue={setValue}
      />

      <button
        type="submit"
        // disabled={!props.form.email.value && !props.form.firstName.value && !props.form.Lastame.value  && !props.form.number.value && !props.form.linkedinUrl.value && !props.form.portfolioUrl.value  ? true : false}
      >
        Submit Application
      </button>
    </form>
  );
};

const Cvdoc = props => {
  return (
    <div
      className="cvdoc-container"
      style={{
        backgroundImage: props.value
          ? `url(${URL.createObjectURL(props.value)})`
          : '',
        objectFit: 'cover',
      }}
    >
      <div className="cvdoc-inner-container">
        <img src={picture} alt="upload" />
        <input
          type="file"
          id={props.id}
          accept=".pdf"
          onChange={e => props.setValue(e.currentTarget.files[0])}
          hidden
        />
        <label for={props.id}>Select File To Upload</label>
        <p>File size of limit : 500kb</p>
      </div>
    </div>
  );
};
