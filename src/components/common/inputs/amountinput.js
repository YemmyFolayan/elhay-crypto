import React, { useState, useRef, useEffect } from 'react';
import './amountinput.scss';

export const Amountinput = props => {
  const [width, setWidth] = useState(0);
  const span = useRef();
  useEffect(() => {
    setWidth(span.current.offsetWidth);
  }, [props.value]);
  return (
    <div className="amountinput">
      <div className="amountinput__box">
        <span className="amountinput__label">
          <p className="amountinput__title">{props.label}</p>
        </span>
        <div className="amountinput__bottom">
          <p className="amountinput__currency">{props.currency}</p>
          <span id="hide" ref={span}>
            {props.value}
          </span>
          <input
            style={{ width }}
            type={props.type}
            name={props.name}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            step={props.step ? props.step : ''}
            pattern={props.pattern}
          />
        </div>

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

export const Amountinputcurrency = props => {
  return (
    <div className="amountfloat">
      <div
        className="amountfloat__box"
        style={{
          position: 'relative',
          display: 'inline-block',
          width: 100 + '%',
        }}
      >
        <input
          type={props.type}
          name={props.name}
          placeholder={props.placeholder}
          style={{
            width: props.width + 'px',
            border: props.error ? '1px solid red' : '',
            backgroundColor: props.error ? '#FFEBEB' : '',
          }}
          value={props.value}
          onChange={props.onChange}
          disabled={props.disabled}
          invalid={props.error}
          step={props.step ? props.step : ''}
          pattern={props.pattern}
        />
        <span className="amountfloat__label">{props.label}</span>
        <p className="amountfloat__currency">{props.currency}</p>

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
