import React from 'react';
import ReactSpeedometer from 'react-d3-speedometer';

export const Report = props => {
  return (
    <div className={props.class}>
      <ReactSpeedometer
        fluidWidth={true}
        minValue={props.minValue}
        maxValue={props.maxValue}
        value={props.value}
        needleColor="steelblue"
        textColor={'#AAA'}
        needleTransitionDuration={4000}
        needleTransition="easeElastic"
        maxSegmentLabels={0}
      />
    </div>
  );
};
