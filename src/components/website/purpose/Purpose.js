import React from 'react';
import './Purpose.scss';
import two from '../../../assets/two.svg';
import one from '../../../assets/one.svg';

const Purpose = () => {
  return (
    <div>
      <div className="purpose-container">
        <div className="purpose-inner">
          <div className="mt-5 pt-5 purpose-inner top">
            <p>Purpose of this product is to help you</p>
          </div>
          <div className="purpose-inner bottom">
            <div className="">
              <SinglePurposeCard
                image={one}
                title="Financial Identity"
                text="To enable users to paint a complete picture of their financial identity and allows businesses to lend more fairly and responsibly."
              />
            </div>
            <div className="">
              <SinglePurposeCard
                image={two}
                title="Step 2"
                text="A neobank that understands your needs, designs capabilities that make you live without limits With state of the art enryption, you and only can access your account without limits."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purpose;

const SinglePurposeCard = props => {
  return (
    <>
      <div className="card" style={{ width: '20rem' }}>
        <div className="card-body">
          <img className="img-fluid" src={props.image} alt="" />
          <div className="card-content">
            <h5 className="card-title mb-2">{props.title}</h5>
            <p className="card-text">{props.text}</p>
          </div>
        </div>
      </div>
    </>
  );
};
