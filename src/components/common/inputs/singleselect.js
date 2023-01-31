import React from 'react';
import Select from 'react-select';
import './singleselect.scss';
// import 'react-select/dist/react-select.css';

export const Singleselect = props => {
  const style = {
    control: (base, state) => ({
      ...base,
      height: '60px',
      border: '0 !important',
      boxShadow: '0 !important',
      '&:hover': {
        border: '1px !important',
      },
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        color: '#151617',
        backgroundColor: isFocused ? '#F9F8F9' : '',
        borderTop: '1px solid #F8F6F5',
        lineHeight: '3em',
      };
    },
  };

  return (
    <div className="select-input">
      {props.label && (
        <div className="label" for="color">
          <p> {props.label} </p>
          {props.sublabel && <p>{props.sublabel}</p>}
        </div>
      )}
      <div
        className="select-box"
        style={{
          position: 'relative',
          display: 'inline-block',
          width: 100 + '%',
        }}
      >
        {/* <select class="contentselect" id="contentselect" value={props.value} onChange={props.onChange}>
          {
            (props.options??[]).map((item, index) => (
              <option value={item.value} key={index}>{item.name}</option>
            ))
          }
        </select> */}
        <Select
          id="color"
          className="select"
          placeholder={props.placeholder}
          options={
            // options.filter(item => !this.state.actions.includes(item))
            props.options
          }
          // multi={false}
          value={props.value}
          onChange={props.onChange}
          styles={style}
        />
        {props.children}
      </div>
    </div>
  );
};
