import React from 'react';
import PinInput from 'react-pin-input';

const DividedPinInput = ({ onChange, len, open }) => {
  return (
    <PinInput
      inputStyle={{
        background: '#F8F6F5',
        height: '48px',
        width: '48px',
        marginRight: '12px',
        border: '0.5px solid #EAEAEA',
        borderRadius: '10px',
      }}
      length={len ? len : 4}
      focus
      secret={open ? false : true}
      type="numeric"
      onChange={onChange}
    />
  );
};

export default DividedPinInput;
