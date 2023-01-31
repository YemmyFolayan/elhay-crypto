import React from 'react';
import './CreateCard.scss';
import getaccount from '../../../assets/getaccount.svg';
import choose from '../../../assets/choose.svg';
import global from '../../../assets/global.svg';

const CreateCards = props => {
  return (
    <div>
      <div className="createcards-container">
        <div className="createcards-inner">
          <div className="mt-5 pt-5 createcards-inner top">
            <p>Create Card</p>
            <p className="text-center">
              Create your virtual card in 3 simple steps.
            </p>
          </div>
          <div className="createcards-inner bottom">
            <div className="">
              <SingleCreateCard
                image={getaccount}
                title="Get a NetWebPay Account"
                text="Create a free vesti account under 2minutes
                            Explore our services and Navigate to cards."
              />
            </div>
            <div className="">
              <SingleCreateCard
                image={choose}
                title="Choose Card that Fits your Lifestyle"
                text="We offer cards that are fit for everyone. 
                            Choose a card that supports your lifestyle."
              />
            </div>
            <div className="">
              <SingleCreateCard
                image={global}
                title="Start Spending Globally"
                text="Add a new card any time, easily manage
                            and deactivate your cards, spend at 
                            100+ airports, countless merchants and 
                            colleges and destinations globally"
              />
            </div>
          </div>
          <div className="button" onClick={() => props.openModal()}>
            Create New Card Today
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCards;

const SingleCreateCard = props => {
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
