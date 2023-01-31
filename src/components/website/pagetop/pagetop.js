import React from 'react';
import './pagetop.scss';
import { Link } from '@reach/router';
export const Pagetop = props => {
  return (
    <div className="pagetop">
      <p>{props.title}</p>
      <div className="pagetop__links">
        {props.title !== 'TERMS OF SERVICE' && (
          <p>
            {' '}
            <Link className="link" to="/disclosure">
              TERMS OF SERVICE
            </Link>{' '}
            •
          </p>
        )}
        {props.title !== 'PRIVACY' && (
          <p>
            {' '}
            <Link className="link" to="/privacy">
              PRIVACY
            </Link>{' '}
            •
          </p>
        )}
        {props.title !== 'ANTI-MONEY LAUNDERING STATEMENT' && (
          <p>
            {' '}
            <Link className="link" to="/aml">
              AML
            </Link>{' '}
          </p>
        )}
      </div>
    </div>
  );
};
