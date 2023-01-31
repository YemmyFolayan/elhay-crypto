import React from 'react';
import './JoinCommunity.scss';
import download from '../../../assets/downloadlogo.svg';
import paper from '../../../assets/paper.svg';
import arrowright from '../../../assets/arrowright.svg';
import getaccount from '../../../assets/getaccount.svg';
const JoinCommunity = () => {
  return (
    <div>
      <div className="join-community-container">
        <div className="join-community-inner">
          <div className="pt-5 join-community-inner top">
            <p>Join Our Community</p>
            <p className="text-center">Join Our Community in 3 Steps</p>
          </div>
          <div className="join-community-inner bottom">
            <div className="">
              <SingleJoinCommunity
                image={download}
                title="Download the vesti App"
                text="We use state-of-the-art data encryption
                            when handling your financial details. We
                            use state of the art data encryption when
                            handling financial details."
              />
            </div>
            <div className="">
              <SingleJoinCommunity
                image={getaccount}
                title="Get a NetWebPay Account"
                text="We use state-of-the-art data encryption
                            when handling your financial details. We
                            use state of the art data encryption when
                            handling financial details."
              />
            </div>
            <div className="">
              <SingleJoinCommunity
                image={paper}
                title="Receive Additional Instructions"
                text="We use state-of-the-art data encryption
                            when handling your financial details. We
                            use state of the art data encryption when
                            handling financial details."
              />
            </div>
          </div>
          <div>
            <a className="join-link" href="/feeds">
              Join Our Community <img src={arrowright} alt="" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinCommunity;

const SingleJoinCommunity = props => {
  return (
    <>
      <div className="card" style={{ width: '20rem' }}>
        <div className="card-body">
          <img className="img-fluid mb-2" src={props.image} alt="" />
          <h5 className="card-title mb-2 text-center">{props.title}</h5>
          <p className="card-text">{props.text}</p>
        </div>
      </div>
    </>
  );
};
