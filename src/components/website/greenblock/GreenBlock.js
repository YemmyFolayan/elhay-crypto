import React from 'react';
import './GreenBlock.scss';
// import greenblock from "../../../assets/greenblock.svg";
import facebook from '../../../assets/facebook-logo.svg';
import ig from '../../../assets/instagram-logo.svg';
import link from '../../../assets/linkedin-logo.svg';
import twitter from '../../../assets/twitter-logo.svg';
import youtube from '../../../assets/youtube-logo.svg';
import plane from '../../../assets/plane.svg';
import circles from '../../../assets/circles-com.svg';
function GreenBlock() {
  return (
    <>
      {/* <div className="green-block-image">
            <img src={greenblock} alt="" />
       </div> */}
      <div className="join-com-container">
        <div className="join-com-inner-container">
          <img src={plane} alt="plane svg" className="join-com-plane" />
          <img src={circles} alt="plane svg" className="join-com-circles" />
          <div className="join-com-inner-container left">
            <div className="top">
              <span>
                <p className="">Join the vesti Community</p>
              </span>
              <p>Stay in touch with the latest news and releases</p>
            </div>
            <div className="middle">
              <input type="text" placeholder="Your Email Address" />
              <button>Subscribe</button>
            </div>
            <div className="bottom">
              <div className="inner-bottom-top">
                <p>
                  By submitting this form you consent to us emailing you
                  occasionally about our products and services. You can
                  unsubscribe from emails at any time, and we will never pass
                  your email to third parties.
                </p>
              </div>
              <div className="inner-bottom-bottom">
                <img
                  className="img-fluid h-100"
                  src={facebook}
                  alt="facebook"
                />
                <img className="img-fluid h-100" src={ig} alt="instagram" />
                <img className="img-fluid h-100" src={link} alt="link" />
                <img className="img-fluid h-100" src={twitter} alt="twitter" />
                <img className="img-fluid h-100" src={youtube} alt="youtube" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GreenBlock;
