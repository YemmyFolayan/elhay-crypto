import React from 'react';
import placeholder from '../../../assets/placeholder.png';
import './Eligible.scss';

export const Eligible = props => {
  return (
    <div className="eligible-container">
      <div className="eligible-inner">
        <div className="eligible-inner bottom">
          <Singleeligible
            image={placeholder}
            reverse={false}
            title="Am I eligible?"
            subtitle="We introduced the vesti Card to cater to the needs of migrants bound for the US. The card is designed specifically with the migrant in mind. Applicants who have just arrived in the US or are already settled are
                        eligible for the card."
            link="Import Credit History"
            openModal={props.openModal}
            click={() => props.click()}
          />
        </div>
      </div>
    </div>
  );
};

const Singleeligible = props => {
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
        <p onClick={() => props.click()}>{props.link}</p>
      </div>

      <img className="img-fluid" src={props.image} alt="" />
    </div>
  );
};
