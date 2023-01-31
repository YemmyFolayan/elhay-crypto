import React from 'react';
import './StartJapaJourney.scss';
import classroom from '../../../assets/edupath.png';
import save from '../../../assets/savejapa.png';
import arrowright from '../../../assets/arrowright.svg';
import proof from '../../../assets/prooffund.png';

const StartJapaJourney = () => {
  return (
    <div>
      <div className="startjapajourney-container">
        <div className="startjapajourney-inner">
          <div className="top">
            <div className="top-left">
              <img className="img-fluid" src={classroom} alt="placeholder" />
            </div>
            <div className="top-right">
              <p>Start Your Japa Journey by Education Pathway.</p>
              <p>
                We provide guidance for Students going for graduate and
                undergraduate programs in 25 countries.
              </p>
              <p>
                Easily determine which university colleges are fit for you, and
                land on campus with ease.
              </p>
              <a href="/pathways">
                Learn More <img src={arrowright} alt="arrowright" />
              </a>
            </div>
          </div>
          <div className="bottom">
            <div className="bottom-left">
              <p>Start Saving Towards Your Japa Moves With Our Saving Plans.</p>
              <p>
                The vesti card lets you spend using the real exchange rate
                online, in-store and while you travel but exists only in your
                vesti account, either on your phone or laptop.
              </p>
              <a href="/savings">
                Learn More <img src={arrowright} alt="arrowright" />
              </a>
            </div>

            <div className="bottom-right">
              <div className="inner-bottom-right">
                <div className="">
                  <img className="img-fluid" src={save} alt="" />
                </div>
                {/* <div className="">
                                    <img className='img-fluid' src={smallrectangle}  alt="" />
                                </div> */}
              </div>
            </div>
          </div>
          <div className="top">
            <div className="top-left">
              <img className="img-fluid" src={proof} alt="placeholder" />
            </div>
            <div className="top-right">
              <p>Start Your Japa Journey by Proof of Fund.</p>
              <p>
                Our migration lending service, makes it easy for you to cross
                finance related hurdles associated with your migration.
              </p>
              <p>
                Need to show proof of funds? Our partners have what it takes.
              </p>
              <a href="/merchants">
                Learn More <img src={arrowright} alt="arrowright" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartJapaJourney;
