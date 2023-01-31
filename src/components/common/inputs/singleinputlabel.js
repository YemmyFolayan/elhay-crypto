import './singleinputlabel.scss';
import React, { useState } from 'react';

const Singleinputlabel = props => {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  return (
    <div
      className="form-input"
      style={{ flexDirection: `${props.row ? 'column' : 'row'}` }}
    >
      <div className="l-label">
        <p> {props.label} </p>
        {props.label && <p>Edit {props.label}</p>}
      </div>
      <div
        className="input-box"
        style={{
          position: 'relative',
          display: 'inline-block',
          width: 100 + '%',
        }}
      >
        <input
          type={
            props.type
              ? props.type === 'password'
                ? passwordShown
                  ? 'text'
                  : 'password'
                : props.type
              : props.type
          }
          name={props.name}
          placeholder={props.placeholder}
          style={{
            width: props.width + 'px',
            marginBottom: 10,
            border: props.error ? '1px solid red' : '',
            backgroundColor: props.error ? '#FFEBEB' : '',
            fontSize: '16px',
          }}
          value={props.value}
          onChange={props.onChange}
          disabled={props.disabled}
        />
        {props.type === 'password' &&
          (passwordShown ? (
            <i
              className="fas fa-eye  eyes"
              onClick={togglePasswordVisiblity}
            ></i>
          ) : (
            <i
              className="fas fa-eye-slash eyes"
              onClick={togglePasswordVisiblity}
            ></i>
          ))}

        <p
          style={{
            color: 'red',
            height: 5,
            width: 100 + '%',
            margin: 0 + 'px',
          }}
        >
          {props.error ? props.error : ' '}
        </p>
      </div>
    </div>
  );
};
export default Singleinputlabel;
