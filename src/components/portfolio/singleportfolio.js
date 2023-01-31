import React from 'react';
import lowrl from '../../assets/lowrl.svg';
import { Stepback } from 'components/common/stepback/stepback';
import { Graph } from 'components/common/graph/graph';
import { News } from 'components/news/news';
import './singleportfolio.scss';
import { Recommendation } from './recommendation';
import { Diversified } from './diversified';

export const Singleportfolio = props => {
  const goBack = () => {
    props.onClick(2);
  };

  return (
    <div className="singleportfolio">
      <Stepback onClick={goBack} />
      <div className="singleportfolio__inner">
        <Top />
        <div className="singleportfolio__graph">
          <Graph />
        </div>
        <div className="about-portfolio">
          <p>About Portfolio</p>
          <p>
            Do I need sunscreen? The answer is a resounding Yes. I did not
            always wear my sunscreen, to be sincere,I only really started
            wearing sunscreen about a month ago. When I started reading about
            all major reasons to wear sunscreen even though I was never really
            taught to have sunscreen o and I can tell you it is very important
            to have sunscreen on. Nigeria is most times always hot and its
            summer every time of the year.
          </p>
        </div>
        <Diversified />
        <div className="singleportfolio__btn">Edit Portfolio</div>
        <Recommendation onClick={() => props.onClick(4)} />
        <News />
      </div>
    </div>
  );
};

const Top = () => {
  const data = ['Today', 'All Time'];
  return (
    <div className="singleportfolio-top">
      <div className="singleportfolio-top__top">
        <div className="my-image"></div>
        <div className="singleportfolio-top__top __top-left">
          <p>Low Risk Portfolio</p>
          <p>
            This portfolio is for user whose risk appetite is very conservative.
          </p>
        </div>
      </div>
      <hr />
      <div className="singleportfolio-top__bottom">
        {data.map((item, index) => (
          <Detail key={index} title={item} />
        ))}
        <Detail title="Risk Level">
          <Level />
        </Detail>
      </div>
      <hr />
    </div>
  );
};

const Detail = props => {
  return (
    <div className="detail">
      <p>{props.title}</p>
      {props.children ? props.children : <Percentage price="5.0%" />}
    </div>
  );
};

const Percentage = props => {
  return (
    <div className="percentage --active">
      <div className="percentage__inner">
        <i class="fas fa-caret-up"></i>
        <p>{props.price}</p>
      </div>
    </div>
  );
};

const Level = () => {
  return (
    <div className="risklevel">
      <img src={lowrl} alt="" />
      <p>Low Risk</p>
    </div>
  );
};
