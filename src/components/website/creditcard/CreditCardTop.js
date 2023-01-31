import React from 'react';
import './CreditCardTop.scss';

function CreditCardTop(props) {
  return (
    <>
      <CCTop
        title="Import your Nigerian credit history to start your application for the"
        subtitle=" Credit Card. "
        maintext="New to the U.S.? vesti has partnered with Nova Credit, so now your credit in Nigeria can travel with you. Start the application for a NetWebPay card by importing your foreign credit history. Get Started Learn More"
        click={props.click}
      />
    </>
  );
}

export default CreditCardTop;

const CCTop = props => {
  return (
    <div className="cctop-cont">
      <div className="vesti-cctop">
        <p>
          {props.title}
          <span>{props.subtitle}</span>
        </p>
        <p>{props.maintext}</p>
      </div>
      <div className="buttons">
        <button className="button-left" onClick={() => props.click()}>
          Get Started
        </button>
        <a href="#benefits" className="button-right">
          Learn More
        </a>
      </div>
    </div>
  );
};
