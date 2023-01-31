import React, { useState } from 'react';
import Singleinputlabelcol from 'components/common/inputs/singleinputlabelcol';
import { Success } from 'components/common/success/success';
import axios from 'axios';
import { openNotificationWithIcon } from 'appRedux/actions/Common';
import './japareg.scss';
const config = {
  cors: 'https://cors-anywhere.herokuapp.com/', // <optional> doesn't display the cors error
  formUrl:
    'https://docs.google.com/forms/d/1-JJqfSAs3A_GvagJtM46o6XHCFMfkhfldPrGATazAl4/formResponse',
};
export const Japareg = props => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: { id: 446042392, value: '' },
    email: { id: 1703103971, value: '' },
    number: { id: 545064400, value: '' },
    country: { id: 845960363, value: '' },
  });

  var setInput = e => {
    var name = e.target.name;
    var value = e.target.value;

    // setForm({...form, [name]:{...[name], value: value }})
    setForm({ ...form, [name]: { ...form[name], value: value } }, [form]);
  };

  const reserveSeat = async e => {
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
        openNotificationWithIcon(
          'Your seat was successfully reserved',
          'Webinar reservation',
          'success',
        );
        // setLoading(false);
      })
      .catch(error => {
        // openNotificationWithIconErr(
        //     errorMessage(error),
        //     'vesti card reservation',
        //     'error',
        //   );
        openNotificationWithIcon(
          'Your seat was successfully reserved',
          'Webinar reservation',
          'success',
        );
        setStep(1);
      });
  };

  switch (step) {
    case 0:
      return (
        <div className="japareg-cont">
          <p>Reserve a seat for the JAPA 5.0 webinar</p>
          <Myform form={form} setInput={setInput} reserveSeat={reserveSeat} />
        </div>
      );
    case 1:
      return (
        <Success
          title="Seat Reservation Successful"
          subtitle={`You successfully reserved a seat`}
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
    <form onSubmit={e => props.reserveSeat(e)} className="japareg">
      <Singleinputlabelcol
        type="text"
        label=""
        name="name"
        placeholder="Enter your full name"
        value={props.form.name.value}
        disabled={false}
        onChange={props.setInput}
        // row="yes"
      />
      <Singleinputlabelcol
        type="text"
        label=""
        name="email"
        value={props.form.email.value}
        placeholder="Enter your email address"
        disabled={false}
        onChange={props.setInput}
        // row="yes"
      />
      <Singleinputlabelcol
        type="number"
        label=""
        name="number"
        value={props.form.number.value}
        placeholder="Enter your phone number"
        disabled={false}
        onChange={props.setInput}
        // row="yes"
      />

      <Singleinputlabelcol
        type="text"
        label=""
        name="country"
        placeholder="what country are you located in ?"
        value={props.form.country.value}
        disabled={false}
        onChange={props.setInput}
        // row="yes"
      />

      <button
        type="submit"
        disabled={
          !props.form.email.value &&
          !props.form.name.value &&
          !props.form.number.value &&
          !props.form.country.value
            ? true
            : false
        }
      >
        Submit
      </button>
    </form>
  );
};
