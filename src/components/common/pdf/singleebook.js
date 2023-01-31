import React from 'react';
import './singleebook.scss';
export const Singleebook = props => {
  return (
    <div className="singleebook-container" onClick={() => props.click()}>
      <div className="singleebook-inner-container">
        <div className="singleebook-inner-container top">
          <img src={props.image} alt="ebook-preview" />
        </div>

        <div className="singleebook-inner-container bottom">
          <p className="ebook-title">{props.title}</p>
          <p> by {props.author}</p>

          <p>Ebook</p>
        </div>
      </div>
    </div>
  );
};
