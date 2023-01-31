import React from 'react';
import './DonateTo.scss';
import openhands from '../../../assets/openhandslong.png';
import workers from '../../../assets/workers.png';

const DonateTo = props => {
  return (
    <div>
      <div className="donate-container">
        <div className="donate-inner">
          <div className="mt-5 pt-5 donate-inner top">
            <p>Causes You can Donate To</p>
            <p className="text-center">
              vesti is a tech company with a social mission. That means our team
              loves to help people by using the power of technology and software
              to make the world a better place.
            </p>
          </div>
          <div className="donate-inner bottom">
            <div className="">
              <SingleDonateCard
                image={openhands}
                title="How to Migrate to the United States
                            through Education."
                text="Lorem ipsum dolor sit amet, consectetur adipiscing lit. Ornare a pretium placerat ut platea. Purus blandit
                            integer sagittis massa vel est hac... "
              />
            </div>
            <div className="">
              <SingleDonateCard
                image={workers}
                title="How to Migrate to the United States
                            through Education."
                text="Lorem ipsum dolor sit amet, consectetur adipiscing lit. Ornare a pretium placerat ut platea. Purus blandit
                            integer sagittis massa vel est hac... "
              />
            </div>
            <div className="">
              <SingleDonateCard
                image={openhands}
                title="How to Migrate to the United States
                            through Education."
                text="Lorem ipsum dolor sit amet, consectetur adipiscing lit. Ornare a pretium placerat ut platea. Purus blandit
                            integer sagittis massa vel est hac... "
              />
            </div>
          </div>
          <div className="donate-button">See More</div>
        </div>
      </div>
    </div>
  );
};

export default DonateTo;

const SingleDonateCard = props => {
  return (
    <>
      <div className="card" style={{ width: '20rem' }}>
        <div className="card-body">
          <img className="img-fluid" src={props.image} alt="" />
          <h5 className="card-title mb-2">{props.title}</h5>
          <p className="card-text">{props.text}</p>
          <a className="card-link" href="#">
            {' '}
            Donate To This Cause
          </a>
        </div>
      </div>
    </>
  );
};
