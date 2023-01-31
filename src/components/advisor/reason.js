import React, { useState } from 'react';
import { Stepback } from 'components/common/stepback/stepback';
import './reason.scss';

export const Reason = props => {
  const data = [
    {
      title: 'For General Investing ?',
      subtitle: 'A flexible account designed for building wealth over time',
    },
    {
      title: 'For Education ?',
      subtitle:
        'An account with tax advantages for qualified education expenses.',
    },
    {
      title: 'For Relocation ?',
      subtitle:
        'An account with tax advantages for qualified relocation expenses.',
    },
  ];

  const [value, setValue] = useState('');
  const goBack = () => {
    props.onClick(0);
  };

  var setReason = item => {
    setValue(item);
    setTimeout(() => {
      props.onClick(2);
    }, 1000);
  };
  return (
    <div className="reason-container">
      <Stepback onClick={goBack} />
      <p className="reason-title">Why are you investing ? </p>
      {value && <p style={{ marginTop: '5px' }}> selected value is {value}</p>}
      <div className="reason-inner-container">
        <ul>
          {data.map((item, index) => (
            <li key={index}>
              <input
                type="radio"
                value={item.title}
                name="radio"
                id={`radio-${index}`}
              />
              <label
                for={`radio-${index}`}
                onClick={e => setReason(item.title)}
              >
                <Singlereason title={item.title} subtitle={item.subtitle} />
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Singlereason = props => {
  return (
    <div className="singlereason-container">
      <div className="singlereason-inner">
        <div className="singlereason-inner right">
          <p>{props.title}</p>
          <p>{props.subtitle}</p>
        </div>
        <i class="fas fa-chevron-right"></i>
      </div>
    </div>
  );
};
