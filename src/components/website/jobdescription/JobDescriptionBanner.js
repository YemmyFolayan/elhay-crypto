import React from 'react';
import './JobDescriptionBanner.scss';
import arrowleft from '../../../assets/arrow-left.svg';

const JobDescriptionBanner = props => {
  return (
    <div className="jobdescriptionbanner-container">
      <div className="jobdescriptionbanner-inner-container">
        <div className="top">
          <span>
            <p className="display-6">
              <strong>Product Manager</strong>{' '}
            </p>
          </span>
          <p>
            Join more than 10,000 Users finding new homes abroad, raising the
            money they need to move and making.
          </p>
        </div>
        <div className="bottom">
          <div className="bottom-left">
            <a href="#">
              {' '}
              <img src={arrowleft} alt="" /> Back to Job Openings
            </a>
            <p>About The Role</p>
            <p>
              with NetWebPay you are given the opportunity to do a short-term
              investment for relocation and a long term investment on local and
              international stock exchanges. with NetWebPay you get the opportunity
              to save and be financially stable for life, whether you choose to
              move abroad (temporarily/permanently) or stay back in Nigeria.
            </p>
            <p>Role Description</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam
              tempus justo, congue sem tristique felis Lorem ipsum dolor sit
              amet, consectetur adipiscing elit. Diam tempus justo, congue sem
              tristique felis. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Diam tempus justo, congue sem tristique felis.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam
              tempus justo, congue sem tristique felis. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit. Diam tempus justo, congue sem
              tristique felis. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Diam tempus justo, congue sem tristique felis.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam
              tempus justo, congue sem tristique felis. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit. Diam tempus justo, congue sem
              tristique felis.
            </p>
            <p>Job Requirements</p>
            <ul>
              <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam
                tempus justo, congue sem tristique felis.{' '}
              </li>
              <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam
                tempus justo, congue sem tristique felis.{' '}
              </li>
              <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam
                tempus justo, congue sem tristique felis.{' '}
              </li>
              <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam
                tempus justo, congue sem tristique felis.{' '}
              </li>
              <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam
                tempus justo, congue sem tristique felis.{' '}
              </li>
            </ul>
            <p>Benefits</p>
            <ul>
              <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam
                tempus justo, congue sem tristique felis.{' '}
              </li>
              <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam
                tempus justo, congue sem tristique felis.{' '}
              </li>
              <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam
                tempus justo, congue sem tristique felis.{' '}
              </li>
              <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam
                tempus justo, congue sem tristique felis.{' '}
              </li>
              <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam
                tempus justo, congue sem tristique felis.{' '}
              </li>
            </ul>
          </div>
          <div className="bottom-right">
            <div className="bottom-right-upper">
              <p>Product Manager</p>
              <p>
                posted 3 days ago <span>&#8226;</span> expires on the 30 MAR
                2022
              </p>
              <div className="card-apply__button__container">
                <p
                  onClick={() => props.onClick()}
                  className="card-apply__button"
                >
                  Apply
                </p>
              </div>
            </div>
            <div className="bottom-right-lower"></div>
          </div>
        </div>
        <div className="top-reverse">
          <span>
            <p className="display-6">
              <strong>Interested In This Role?</strong>
            </p>
          </span>
          <p>
            Our values define the Cowrywise culture, who we are, and what we do
            every day. They are the foundation of our identity and the compass.
          </p>
          <div className="apply__button__container">
            <p onClick={() => props.onClick()} className="apply__button">
              Apply For This Role!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescriptionBanner;
