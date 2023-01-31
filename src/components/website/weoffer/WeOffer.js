import React from 'react';
import './WeOffer.scss';
import limitless from '../../../assets/limitless.svg';
import globalsecure from '../../../assets/globalsecure.svg';
import monitor from '../../../assets/monitor.svg';
import spend from '../../../assets/spend.svg';
import ship from '../../../assets/ship.svg';

const WeOffer = () => {
  return (
    <div>
      <div className="WeOffer-container">
        <div className="WeOffer-inner">
          <div className="mt-5 pt-5 WeOffer-inner top">
            <p>What We Offer</p>
            <p className="text-center">
              vesti employees are at the forefront of our success. We provide
              innovative benefits to our team members to foster a culture of
              belonging and inclusion.
            </p>
          </div>
          <div className="row row-cols-1 row-cols-md-3 g-4 WeOffer-inner bottom">
            <div className="col">
              <SingleCard
                // onClick= {handleClick}
                // active={active}
                image={limitless}
                title="Great Work Culture"
                text="A neobank that understands your needs,
                            designs capabilities that make you live 
                            without limits."
              />
            </div>
            <div className="col">
              <SingleCard
                image={globalsecure}
                title="Learning & Development"
                text="With state of the art enryption, you
                            and only can access your account."
              />
            </div>
            <div className="col">
              <SingleCard
                image={monitor}
                title="Hybrid Work"
                text="With inbuilt data analytics, you
                            see all your activity in one place."
              />
            </div>
            <div className="col">
              <SingleCard
                image={spend}
                title="Work Tools"
                text="See analysis of how you spend your 
                            money, and make better spending decisions."
              />
            </div>
            <div className="col">
              <SingleCard
                image={ship}
                title="Distributed Team"
                text="Our delivery partners will ship you a NetWebPay 
                            physical card, available in 20+ countries."
              />
            </div>
            <div className="col">
              <SingleCard
                image={ship}
                title="Paid Time Off"
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

export default WeOffer;

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
