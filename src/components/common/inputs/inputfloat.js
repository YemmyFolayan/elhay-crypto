import './inputfloat.scss';
import React, { useState } from 'react';

const Inputfloat = props => {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  return (
    <div className="inputfloat">
      <div
        className="inputfloat__box"
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
            // marginBottom: 10,
            border: props.error ? '1px solid red' : '',
            backgroundColor: props.error ? '#FFEBEB' : '',
          }}
          value={props.value}
          onChange={props.onChange}
          disabled={props.disabled}
          invalid={props.error}
          step={props.step ? props.step : ''}
          //   inputMode={props.inputmode ? props.inputmode:props.type}
          pattern={props.pattern}
        />
        <span className="inputfloat__box__label">{props.label}</span>
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

        {props.error && (
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
        )}

        {props.children}
      </div>
    </div>
  );
};
export default Inputfloat;
