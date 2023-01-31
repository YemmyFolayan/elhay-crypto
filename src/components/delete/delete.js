import React from 'react';
import freeze from 'assets/confirmfreeze.svg';
import { Backcontinue } from 'components/common/backcontinue/backcontinue';
import './delete.scss';

export const Delete = props => {
  return (
    <section className="deletecard">
      <img src={freeze} alt="delete" />
      <span>
        <p>{props.title}</p>
        <p> {props.subtitle}</p>
      </span>
      <Backcontinue
        back="No,cancel"
        goBack={() => props.cancel()}
        text={props.actionbtn}
        continue={() => props.click()}
      />
    </section>
  );
};
