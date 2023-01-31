import React from 'react';
import ccheck from 'assets/circle-check.svg';
import './listcheck.scss';

export const Listcheck = props => {
  return (
    <div className="listcheck">
      {props.data.map((item, index) => (
        <p key={index}>
          <img src={ccheck} alt="ccheck-icon" /> {item}
        </p>
      ))}
    </div>
  );
};

export const ListNocheck = props => {
  return (
    <ul className="listnocheck">
      {props.data.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};

export const Numberedcheck = props => {
  return (
    <div className="numcheck">
      <span className="numcheck__list">
        <p className="numcheck__num">{props.index}</p>
        {props.type === 'inner' ? (
          <p
            dangerouslySetInnerHTML={{ __html: props.body }}
            className="numcheck__body"
          ></p>
        ) : (
          <p className="numcheck__body">{props.body}</p>
        )}
      </span>
      <span className="numcheck__children">{props.children}</span>
    </div>
  );
};
