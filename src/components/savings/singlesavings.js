import React from 'react';
import './singlesavings.scss';
import piggy from '../../assets/piggy.svg';
import info from '../../assets/info.svg';
import { navigate } from '@reach/router';
// import { Link } from '@reach/router';
export const Singlesavings = props => {
  var goTo = () => {
    props.status && navigate(`savings/${props.id}`);
    // navigate(`savings/${props.id}`)
  };
  return (
    <div
      className={`singlesaving ${props.status && ' --inactive'}`}
      onClick={() => goTo()}
    >
      <div className="singlesaving__inner">
        <img src={piggy} alt="piggy svg" />

        <div className="singlesaving__right">
          <p>Amount To Be Saved.</p>
          <div className="singlesaving__amount">
            <p className="singlesaving__name">{props.name}</p>
            <p>
              {props.currency === 'USD_CENTS' ? '$' : '₦'}
              {props.amount / 100}
            </p>
            <p>
              To be saved every <strong>{props.frequency}</strong> days
            </p>
          </div>
          {!props.status && (
            <div className="singlesaving__enddate">
              <img src={info} alt="info svg" />
              <p>This saving ends in {props.endDate}</p>
            </div>
          )}
          {!props.status && (
            <p>
              See More <i class="fas fa-arrow-right"></i>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
