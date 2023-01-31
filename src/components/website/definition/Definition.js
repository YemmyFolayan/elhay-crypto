import React from 'react';
import './Definition.scss';
import limitless from '../../../assets/limitless.svg';
const Definition = () => {
  return (
    <div>
      <div className="definition-container">
        <div className="definition-inner">
          <div className="mt-5 definition-inner top">
            <p>What Defines Us</p>
            <p className="text-center">
              Our values define the vesti culture, who we are, and what we do
              every day. They are the foundation of our identity and the compass
              of our interaction with all stakeholders: customers, regulators,
              investors, partners and our communities.
            </p>
          </div>
          <div className="definition-inner bottom">
            <div className="">
              <SingleDefinitionCard
                image={limitless}
                title="Customer Satisfaction Obsession"
                text="We are in business to make our
                            customers happy and meet their needs.
                            Meeting the needs of our customers is
                            an act we value dearly."
              />
            </div>
            <div className="">
              <SingleDefinitionCard
                image={limitless}
                title="Customer Satisfaction Obsession"
                text="We are in business to make our
                            customers happy and meet their needs.
                            Meeting the needs of our customers is
                            an act we value dearly."
              />
            </div>
            <div className="">
              <SingleDefinitionCard
                image={limitless}
                title="Customer Satisfaction Obsession"
                text="We are in business to make our
                            customers happy and meet their needs.
                            Meeting the needs of our customers is
                            an act we value dearly."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Definition;

const SingleDefinitionCard = props => {
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
