import React from 'react';
import openhandsframe from '../../../assets/openhandsframe.png';
import handytools from '../../../assets/handytools.svg';
import handydollar from '../../../assets/dollarinhand.svg';
import handylove from '../../../assets/twohandsicon.svg';
import './DoingGood.scss';

export const DoingGood = () => {
  return (
    <div class="doinggood-container">
      <div className="doinggood-inner">
        <div className="mt-5 pt-5 doinggood-inner top">
          <p>vesti Doing Good</p>
          <p className="text-center">
            vesti is a tech company with a social mission. That means our team
            loves to help people by using the power of technology and software
            to make the world a better place.
          </p>
        </div>

        <div className="doinggood-inner bottom">
          <SingleDoingGood
            image={openhandsframe}
            reverse={false}
            title="Customer Satisfaction"
            text="vesti is a tech company with a social mission. That means our team loves to help people by using the power of technology and software to make the world a better place."
            list1="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam tempus justo, congue sem tristique felis."
            list2="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam tempus justo, congue sem tristique felis."
            list3="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam tempus justo, congue sem tristique felis."
          />
          <SingleDoingGood
            image={openhandsframe}
            reverse={true}
            title="Customer Satisfaction"
            text="vesti is a tech company with a social mission. That means our team loves to help people by using the power of technology and software to make the world a better place."
            list1="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam tempus justo, congue sem tristique felis."
            list2="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam tempus justo, congue sem tristique felis."
            list3="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam tempus justo, congue sem tristique felis."
          />
        </div>
      </div>
    </div>
  );
};

const SingleDoingGood = props => {
  return (
    <div
      className={` ${
        props.reverse ? 'single-reverse-container' : 'single-started-container'
      }  `}
    >
      <div
        className={` ${
          props.reverse
            ? 'single-reverse-container right'
            : 'single-started-container left'
        }  `}
      >
        <p>{props.title}</p>

        <p>{props.text}</p>

        <ul>
          <li className="list__item">
            <img className="img-fluid" src={handylove} alt="" />
            <p>{props.list1}</p>
          </li>
          <li className="list__item">
            <img className="img-fluid" src={handytools} alt="" />
            <p>{props.list1}</p>
          </li>
          <li className="list__item">
            <img className="img-fluid" src={handydollar} alt="" />
            <p>{props.list1}</p>
          </li>
        </ul>

        <a href="#"> Continue Reading</a>
      </div>

      <img src={props.image} alt="" />
    </div>
  );
};
