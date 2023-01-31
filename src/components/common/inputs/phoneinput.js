import React from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import flags from 'react-phone-number-input/flags';
import './phoneinput.scss';
export const Phonenumber = props => {
  return (
    <PhoneInput
      className="my-input-class"
      inputClass="my-input-class"
      placeholder="Phone Number"
      international
      countryCallingCodeEditable={false}
      // defaultCountry="NG"
      defaultCountry={props.country ? props.country : 'NG'}
      value={props.value}
      // countries={['US', 'NG']}
      flags={flags}
      onChange={phone => props.setValue(phone)}
    />
  );
};

export const Phonenumberng = props => {
  return (
    <PhoneInput
      className="my-input-class"
      inputClass="my-input-class"
      placeholder="Phone Number"
      international
      countryCallingCodeEditable={false}
      defaultCountry="NG"
      value={props.value}
      countries={['NG']}
      flags={flags}
      onChange={phone => props.setValue(phone)}
    />
  );
};

export const Phonenumberdef = props => {
  return (
    <PhoneInput
      className="my-input-class"
      inputClass="my-input-class"
      placeholder="Phone Number"
      international
      countryCallingCodeEditable={false}
      defaultCountry={props.default}
      //   international={false}
      value={props.value}
      countries={props.countries}
      flags={flags}
      onChange={phone => props.setValue(phone)}
    />
  );
};
