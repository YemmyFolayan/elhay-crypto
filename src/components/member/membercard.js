import React from 'react';
import { Link } from '@reach/router';
import './membercard.scss';

export const Membercard = props => {
  return (
    <div
      className={` mb-1  member-card-container ${
        props.planType ? ' --active' : ''
      }`}
    >
      <div className="member-card-inner">
        <NavLink to={props.link}>
          <div className="member-card-content">
            <img src={props.image} alt={props.name} />

            <div className="member-card-content below">
              <p>{props.name}</p>

              <p>
                {props.subtitle} {props.planType ? ' - active plan' : ''}
              </p>
            </div>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

const NavLink = props => (
  <Link
    {...props}
    getProps={({ isCurrent }) =>
      // the object returned here is passed to the
      // anchor element's props
      ({
        className: isCurrent ? 'active' : '',
      })
    }
  />
);
