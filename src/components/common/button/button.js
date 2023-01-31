import React from 'react';
import './button.scss';

export const Platformbutton = props => {
  var _renderbtn = () => {
    switch (props.type) {
      case 'normal':
        return (
          <button
            className={`platform platform_mainbtn ${props.small && ' --small'}`}
            type={'button'}
            onClick={() => props.click()}
            disabled={props.disabled}
          >
            {props.name}
          </button>
        );
      case 'submit':
        return (
          <button
            className="platform platform_mainbtn"
            type={props.type ? props.type : ''}
            disabled={props.disabled}
          >
            {props.name}
          </button>
        );
      case 'withicon':
        return (
          <button
            className="platform platform_withicon"
            type={props.type ? props.type : ''}
            onClick={() => props.click()}
            disabled={props.disabled}
          >
            {props.name} <i className={props.classname} />
          </button>
        );
      case 'withiconnobg':
        return (
          <button
            className="platform platform_withiconnobg"
            type={props.type ? props.type : ''}
            onClick={() => props.click()}
            disabled={props.disabled}
          >
            {props.name} <i className={props.classname} />
          </button>
        );
      case 'secondary':
        return (
          <button
            className={`platform platform_secbtn ${props.color &&
              ' --' + props.color}`}
            disabled={props.disabled}
            onClick={() => props.click()}
          >
            {props.name}
          </button>
        );
      case 'slant':
        return (
          <p
            className={`platform platform_slant`}
            disabled={props.disabled}
            onClick={() => props.click()}
          >
            {props.name}
          </p>
        );
      default:
        return <>Error No Button Type</>;
    }
  };

  return _renderbtn();
};
