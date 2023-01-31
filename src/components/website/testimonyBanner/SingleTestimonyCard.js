import React from 'react';
import './SingleTestimonyCard.scss';

const SingleTestimonyCard = props => {
  return (
    <>
      <div className="testimonialcard">
        <div className="testimonialcard__top">
          <img className="img-fluid" src={props.image} alt="" />
          <p className="title">
            {props.title}
            <span className="text-muted">{props.location}</span>
          </p>
        </div>
        <p className="testimonialcard__text">{props.text}</p>
      </div>
    </>
  );
};
export default SingleTestimonyCard;
