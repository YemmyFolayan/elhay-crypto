import React from 'react';
import './BenefitCards.scss';
import limitless from '../../../assets/limitless.svg';
import globalsecure from '../../../assets/globalsecure.svg';
import monitor from '../../../assets/monitor.svg';
import spend from '../../../assets/spend.svg';
import ship from '../../../assets/ship.svg';

const BenefitCards = () => {
  return (
    <div>
      <div className="benefitcards-container">
        <div className="benefitcards-inner">
          <div className="mt-5 pt-5 benefitcards-inner top">
            <p>Become limitless with your NetWebPay card</p>
            <p className="text-center">
              Spend safely online, in-store and abroad with the new vesti card.
            </p>
          </div>
          <div className="row row-cols-1 row-cols-md-3 g-4 benefitcards-inner bottom">
            <div className="col">
              <SingleCard
                // onClick= {handleClick}
                // active={active}
                image={limitless}
                title="Be limitless"
                text="A neobank that understands your needs,
                            designs capabilities that make you live 
                            without limits."
              />
            </div>
            <div className="col">
              <SingleCard
                image={globalsecure}
                title="Globally Secure"
                text="With state of the art enryption, you
                            and only can access your account."
              />
            </div>
            <div className="col">
              <SingleCard
                image={monitor}
                title="Monitor in Real Time"
                text="With inbuilt data analytics, you
                            see all your activity in one place."
              />
            </div>
            <div className="col">
              <SingleCard
                image={spend}
                title="Advanced Spend Analytics"
                text="See analysis of how you spend your 
                            money, and make better spending decisions."
              />
            </div>
            <div className="col">
              <SingleCard
                image={ship}
                title="Ship it anywhere"
                text="Our delivery partners will ship you a NetWebPay 
                            physical card, available in 20+ countries."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitCards;

const SingleCard = props => {
  return (
    <>
      <div className={`card `} style={{ width: '20rem' }}>
        <div className="card-body">
          <img className="img-fluid mb-2" src={props.image} alt="" />
          <h5 className="card-title mb-2">{props.title}</h5>
          <p className="card-text">{props.text}</p>
        </div>
      </div>
    </>
  );
};
