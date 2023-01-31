import React from 'react';
// import cardhand from "../../../assets/cardhand.svg"
// import arrowright from "../../../assets/arrowright.svg"
import handcard from '../../../assets/mc.svg';
import './Whatsvesticard.scss';

export const WhatsvestiCard = props => {
  return (
    <div className="whatsvesticard-container">
      <div className="whatsvesticard-inner">
        <div className="whatsvesticard-inner bottom">
          <SingleWhatsvestiCard
            image={handcard}
            reverse={true}
            title="Our Card Offerings"
            subtitle="We Introduced our Cards to cater to the need of Immigrants. We prioritized mainstream services like grocery shopping, auto loans, and known merchants, using advanced analytics and data mining, our Cards are positioned to serve Immigrants in transit and those already settled.<br/> 
                        <br/> 
                        Whether you wish to carry your wallet or not, there is a Card for you. The card page in our apps have your card details in them, secured with your two factor Authentication. That means it’s securely saved and can be utilized anywhere."
            link="Order your Card Now"
            openModal={props.openModal}
          />
        </div>
      </div>
    </div>
  );
};

const SingleWhatsvestiCard = props => {
  return (
    <div
      className={` ${
        props.reverse ? 'single-reverse-container' : 'single-started-container'
      }  `}
    >
      <div
        className={` ${
          props.reverse
            ? 'single-reverse-container right'
            : 'single-started-container left'
        }  `}
      >
        <p>{props.title}</p>
        <div dangerouslySetInnerHTML={{ __html: props.subtitle }}></div>
        <p onClick={() => props.openModal()}>{props.link}</p>
      </div>

      <img src={props.image} className="img-fluid h-100" alt="" />
    </div>
  );
};
