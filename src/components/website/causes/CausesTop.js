import React from 'react';
import './CausesTop.scss';
import children from '../../../assets/children.png';
import twomen from '../../../assets/twomen.png';
import openhands from '../../../assets/openhands.png';

function CausesTop() {
  return (
    <div className="Causestop-container">
      <div className="Causestop-inner-container">
        <div className="top">
          <span>
            <p className="display-6">
              <strong>vesti</strong> Causes
            </p>
          </span>
          <p>
            NetWebPay allows you to help people in need, you can donate time, money,
            or knowledge to causes that are meaningful to you. vesti ensures
            that your donation has the maximum impact.
          </p>
          <div className="joinCause__button__container">
            <p className="joinCause__button"> Support These Causes</p>
          </div>
          <div className="photo__grouping">
            <img className="img-fluid" src={children} alt="children PNG" />
            <img className="img-fluid" src={twomen} alt="Men PNG" />
            <img className="img-fluid" src={openhands} alt="Hands PNG" />
          </div>
        </div>
        <div className="bottom">
          <div className="bottom-left">
            <p>
              We started vesti to provide information and financial services to
              millions of young Africans seeking global opportunities for
              education, work and relocation
            </p>
            <div className="founders">
              <div className="single-founder">
                <a href="#">Olusola Amusan</a>
                <br /> <p className="text-muted">Co-Founder/CEO</p>
              </div>
              <div className="single-founder">
                <a href="#">Bimbo Amusan</a>
                <br /> <p className="text-muted">Co-Founder/CEO</p>
              </div>
            </div>
          </div>
          <div className="bottom-right">
            <div className="bottom-right-upper">
              <p>OUR VISION</p>
              <p>
                We Introduced the vesti Card to cater to the need of Immigrants
                everywhere. Commercial banking prioritizes mainstream services
                like grocery shopping, auto loans, and known merchants, using
                advanced analytics and data mining, vesti Cards are positioned
                to serve Immigrants in transit and those already settled.
              </p>
              <p>OUR MISSION</p>
              <p>
                Whether you wish to carry your wallet or not, there is a NetWebPay
                Card for you. your NetWebPay card page in our apps have your card
                details in them, secured with your two factor Authentication.
                That means it’s securely saved and can be spent anywhere no
                matter where in the world you are.
              </p>
            </div>
            <div className="bottom-right-lower"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CausesTop;
