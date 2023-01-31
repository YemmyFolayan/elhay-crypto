import React from 'react';
import './Benefits.scss';
// import limitless from "../../../assets/limitless.svg";

const Benefits = props => {
  return (
    <div>
      <div className="benefits-container" id="benefits">
        <div className="benefits-inner">
          <div className="mt-5 pt-5 benefits-inner top">
            <p>Benefits</p>
            <p className="text-center">
              New to the U.S.? vesti has partnered with Nova Credit, so now your
              credit in Nigeria can travel with you. Start the application for a
              vesti card by importing your foreign credit history.
            </p>
          </div>
          {/* row row-cols-1 row-cols-md-3 g-4  */}
          <div className="benefits-inner bottom">
            <div className="col">
              <SingleCard
                // image={limitless}
                title="First Benefit"
                text="To enable users to paint a complete picture of their financial identity and allows businesses to lend more fairly and responsibly."
              />
            </div>
            <div className="col">
              <SingleCard
                // image={limitless}
                title="Second Benefit"
                text="As meeting the needs of our customers is our top priority, we partnered with Nova Credit to enable our customers get access to credit from the first day the arrive in the US. They can also carry along with them to the US their credit scores from Nigeria."
              />
            </div>
            <div className="col">
              <SingleCard
                // image={limitless}
                title="Third Benefit"
                text="With ease, our customers with this credit access can start spending In the US as the credit cards will be funded with a credit loan of 200 dollars before you start accessing credit loans or finding credit card functions."
              />
            </div>
          </div>
        </div>
        <div className="button" onClick={() => props.click()}>
          Import Credit History
        </div>
      </div>
    </div>
  );
};

export default Benefits;

const SingleCard = props => {
  return (
    <>
      <div className={`card `}>
        <div className="card-body">
          <img className="img-fluid mb-2" src={props.image} alt="" />
          <h5 className="card-title mb-2">{props.title}</h5>
          <p className="card-text">{props.text}</p>
        </div>
      </div>
    </>
  );
};
