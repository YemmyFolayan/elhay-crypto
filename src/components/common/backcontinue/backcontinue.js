import React from 'react';
import { Platformbutton } from '../button/button';
import './backcontinue.scss';

export const Backcontinue = props => {
  return (
    <div className="backcontinue">
      <Platformbutton
        name={props.back || 'Back'}
        type="secondary"
        click={e => props.goBack(e)}
      />
      {/* <button className="backcontinue__back" onClick={(e) => props.goBack(e)}>{props.back || 'Back'}</button> */}
      {!props.children && (
        <Platformbutton
          name={props.text}
          type="normal"
          click={e => props.continue(e)}
        >
          {props.text}
        </Platformbutton>
      )}
      {/* {!props.children && <button className="backcontinue__continue" onClick={(e) => props.continue(e)}>{props.text}</button>} */}
      {props.children}
    </div>
  );
};
