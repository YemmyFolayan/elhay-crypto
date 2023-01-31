import React from 'react';
import './asset.scss';
import { Portfoliotop } from './portfoliotop';
import { Stepback } from 'components/common/stepback/stepback';
import { Graph } from 'components/common/graph/graph';
import { Recommendation } from './recommendation';
export const Asset = props => {
  const goBack = () => {
    props.onClick(3);
  };

  return (
    <div className="singleportfolio">
      <Stepback onClick={goBack} />
      <div className="singleasset__inner">
        <Portfoliotop circle="yes" title="HD" subtitle="The Home Depot, Inc" />
        <div className="singleasset__graph">
          <Graph />
        </div>
        <div className="about-singleasset">
          <p>About Asset</p>
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

        <Recommendation />
      </div>
    </div>
  );
};
