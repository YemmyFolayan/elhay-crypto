import React from 'react';
import './prompt.scss';

export const Newprompt = props => {
  return (
    <section className="prompt">
      <div className="prompt__inner">
        <img className="prompt__inner__img" src={props.img} alt="digital svg" />
        <div className="prompt__inner__bottom">{props.children}</div>
      </div>
    </section>
  );
};
