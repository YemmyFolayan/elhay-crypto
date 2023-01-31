import React from 'react';
import './JapaWithSense.scss';
import '../youtubeembed/YoutubeEmbed.scss';
import playbook from '../../../assets/playbook.png';
import arrowright from '../../../assets/arrowright.svg';
import YoutubeEmbed from '../youtubeembed/YoutubeEmbed';

const JapaWithSense = () => {
  return (
    <div>
      <div className="japawithsense-container">
        <div className="japawithsense-inner">
          <div className="japawithsense-inner top">
            <p>Japa Journey Pack</p>
            <p className="text-center">Join Our Community in 3 Steps</p>
          </div>
          <div className="japawithsense-inner">
            <div className="middle-inner">
              <div className="middle-left">
                <img className="img-fluid" src={playbook} alt="" />
                {/* <SingleJapaWithSenseCard 
                                image={purpleplane}/> */}
              </div>
              <div className="middle-right">
                <p>Read up on Japa stories via our migration Fries</p>
                <p>
                  Real stories of people who move abroad to new cpountries using
                  vesti as a guide and getting the strength of a community of
                  people going in thesame direction.
                </p>
                <p>
                  There’s no need to patronise ‘agents’ and unscrupulous
                  elements when you can design your own journey with NetWebPay and
                  get started on the path to becoming more.
                </p>
                <a href="/webinar?tab=documents">
                  Check Out Book
                  <img src={arrowright} alt="arrowright" />
                </a>
              </div>
            </div>
            <div className="bottom-inner">
              <div className="bottom-left">
                <p>Start Your Japa Journey by watching our Webinars</p>
                <p>
                  Watch life changing, course-setting webinars made by people
                  who have been on the journey you are about to embark on.
                </p>
                <p>
                  Get hands on support and access the secrets of those who have
                  moved to Germany, United States, poland, United Kingdom,
                  United Arab Emirates, France and many more countries. Start
                  watching now
                </p>
                <a href="/webinar">
                  Access More Webinars
                  <img src={arrowright} alt="arrowright" />
                </a>
              </div>

              <div className="bottom-right">
                <div className="inner-bottom-right-top">
                  <YoutubeEmbed embedId="FSDw4X8-28Q" />
                  <YoutubeEmbed embedId="AxTTnFh6BJw" />
                </div>
                <div className="inner-bottom-right-bottom">
                  {/* <YoutubeEmbed embedId='FSDw4X8-28Q'/>
                                    <YoutubeEmbed embedId='oiy9Bud5PbY'/> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JapaWithSense;

// const SingleJapaWithSenseCard = (props) => {
//     return (
//         <>
//            <div className= "card border-0" style= {{width: "19rem", backgroundColor:"#F9F8F9"}}>
//                 <div className="card-body">
//                     <img className="img-fluid" src={props.image} alt="" />
//                     <h5 className="card-title mb-2" style= {{color: "#000000"}}>Japa With Sense</h5>
//                     <p className="card-text fw-bold" style= {{color: "#000080"}} >Featuring: Sola Amusan & Steve Harris <span className="text-muted">Sat, Jul 30 • 11:00PM CAT</span></p>
//                     <a style= {{color: "#000000"}} href="#/">Watch Webinar<img src={arrowright} alt="arrowright"/></a>
//                 </div>
//             </div>
//         </>
//     )
// }
