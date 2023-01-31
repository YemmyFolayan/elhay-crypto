import React from 'react';
import './CareersTop.scss';
import people from '../../../assets/people.png';

function CareersTop() {
  return (
    <div className="careerstop-container">
      <div className="careerstop-inner-container">
        <div className="top">
          <span>
            <p className="display-6">
              Careers at <strong>vesti</strong>
            </p>
          </span>
          <p>
            Join vesti and help build the number 1 neo bank for Immigrants
            across the World.
          </p>
          <div>
            <img className="img-fluid" src={people} alt="demployee SVG" />
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
export default CareersTop;
