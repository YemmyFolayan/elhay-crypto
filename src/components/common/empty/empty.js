import React from 'react';
import './empty.scss';
import empty from '../../../assets/empty.svg';
import sempty from '../../../assets/smallempty.svg';
import { Platformbutton } from '../button/button';
export const Empty = props => {
  return (
    <div className="empty">
      <div className="empty__inner">
        <img src={empty} alt="Empty SVG" />
        <span className="empty__detail">
          <p className="empty__title">{props.title}</p>
          <p className="empty__subtitle">{props.subtitle}</p>
        </span>
        {props.click && (
          <Platformbutton
            name={props.name}
            type={props.type}
            click={props.click}
          />
        )}
      </div>
    </div>
  );
};

export const Smallempty = props => {
  return (
    <div className="smallempty">
      <div className="smallempty__inner">
        <img src={sempty} alt="Empty SVG" />
        <span className="smallempty__detail">
          <p className="smallempty__title">{props.title}</p>
          <p className="smallempty__subtitle">{props.subtitle}</p>
        </span>
        {props.click && (
          <Platformbutton
            name={props.name}
            type={props.type}
            click={props.click}
          />
        )}
      </div>
    </div>
  );
};
