import React from 'react';
import './ThisWorks.scss';
import two from '../../../assets/two.svg';
import one from '../../../assets/one.svg';
import three from '../../../assets/three.svg';

const ThisWorks = () => {
  return (
    <div>
      <div className="thisworks-container">
        <div className="thisworks-inner">
          <div className="mt-5 pt-5 thisworks-inner top">
            <p>How This Works</p>
            <p className="text-center">
              New to the U.S.? vesti has partnered with Nova Credit, so now your
              credit in Nigeria can travel with you. Start the application for a
              vesti card by importing your foreign credit history.
            </p>
          </div>
          <div className="thisworks-inner bottom">
            <div className="">
              <SingleWorksCard
                image={one}
                title="Step 1"
                text="Import your Nigerian credit history to see if you qualify for the vesti
                            card."
              />
            </div>
            <div className="">
              <SingleWorksCard
                image={two}
                title="Step 2"
                text="If eligible, complete the rest of your card application via your NetWebPay dashboard."
              />
            </div>
            <div className="">
              <SingleWorksCard
                image={three}
                title="Step 3"
                text="Get ready for your card! Starting September 1st 2022, cards will be sent
                            and will be visible in the vesti app & Dashboard"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThisWorks;

const SingleWorksCard = props => {
  return (
    <>
      <div className="card" style={{ width: '20rem' }}>
        <div className="card-body">
          <img className="img-fluid" src={props.image} alt="" />
          <h5 className="card-title mb-2">{props.title}</h5>
          <p className="card-text">{props.text}</p>
        </div>
      </div>
    </>
  );
};
