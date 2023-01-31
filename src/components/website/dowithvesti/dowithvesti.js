import React from 'react';
import './dowithvesti.scss';
import man from '../../../assets/main_img1.svg';
import guy from '../../../assets/main_img2.svg';
import girl from '../../../assets/main_img4.svg';
import lady from '../../../assets/main_img3.svg';

export const Dowithvesti = () => {
  return (
    <div className="dowithvesti-container">
      <div className="dowithvesti-inner">
        <div className="mt-5 pt-5 dowithvesti-inner top">
          <p>What Can You Do with NetWebPay</p>
          <p className="text-center">
          With NetWebPay, you can process and complete various financial transactions such as online payments, money transfers, and digital currency exchanges through a web-based platform. 
          </p>
        </div>

        <section className="mb-5 dowithvesti-inner bottom">
          <div className="bottom-top-content">
            <Overlaycontainer
              image={man}
              title="Secure and encrypted online payment"
              subtitle="Secure and encrypted online payment processing using various payment methods such as credit/debit cards, e-wallets, and bank transfers."
              subtext="Secure and encrypted online payment processing using various payment methods such as credit/debit cards, e-wallets, and bank transfers."
            />
            <Overlaycontainer
              image={guy}
              title="Financial Service for all intending Immigrants and the diaspora."
              subtitle="Send money to a service provider once you Know their username. Recieve money for a service by sending your unique vesti name, No complex setup required. Use your money immediately to pay for fees like WES and US-SEVIS."
              subtext="Hundreds of trusted Immigration service providers, all in one place"
            />
          </div>
          <div className="sub_header_container">
            <h2 className="sub_header">Website-based Payment future for Everyone</h2>
          </div>
          <div className="bottom-lower-content">
            <Overlaycontainer
              image={lady}
              title="Opportunities for Founders at NetWebPay"
              subtitle="NetWebPay allows business owners the opportunity to own a bank account in the U.S and a Founders card which allow them to make and recieve payments in USD."
              subtext="with NetWebPay business owners have a great pool of opportunities to explore."
            />
            <Overlaycontainer
              image={girl}
              title="Access and Import Credit Score with NetWebPay"
              subtitle="Join more than 70,000 Users to get access to and import your credit score ratings with NetWebPay from your own country to the U.S, which can help facilitate acquisition of loans and credit cards."
            />
          </div>
        </section>
      </div>
    </div>
  );
};

const Overlaycontainer = props => {
  return (
    <div className="overlay-container">
      <div className="overlay-inner">
        <img className="img-fluid" src={props.image} alt="man smiling" />
        <div className="overlay">
          <div className="overlay-text">
            {/* <p>Move abroad <span className="vesti-color">with NetWebPay</span>. <br/> Join the #GlobalGeng</p> */}
            <p>{props.title}</p>
            <p className="text-left">{props.subtitle}</p>
            <p className="text-left ">{props.subtext}</p>
            <a className="overlay-link" href="/">
              Get NetWebPay Now{' '}
              <span>
                <i className="px-3 fas fa-arrow-right"></i>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
