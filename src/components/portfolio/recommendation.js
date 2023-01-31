import React from 'react';
import { Graph } from 'components/common/graph/graph';
import './recommendation.scss';

export const Recommendation = props => {
  return (
    <div className="recommendation">
      <p className="recommendation__title">Other Recommendations</p>
      <div className="recommendation__inner">
        <Singlerec onClick={props.onClick} />
        <Singlerec />
        <Singlerec />
        <Singlerec />
      </div>
    </div>
  );
};

const Singlerec = props => {
  return (
    <div className="singlerec" onClick={() => props.onClick()}>
      <div className="singlerec__left">
        <p>HD</p>
        <p>The Home Depot Inc</p>
      </div>
      <div className="singlerec__graph">
        <Graph tooltip="no" />
      </div>
      <div className="singlerec__right">
        <p>$2,000</p>
        <Percentage price="5.0%" />
      </div>
    </div>
  );
};

const Percentage = props => {
  return (
    <div className="percentage --drop">
      <div className="percentage__inner">
        <i class="fas fa-caret-up"></i>
        <p>{props.price}</p>
      </div>
    </div>
  );
};
