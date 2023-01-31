import React from 'react';
import { Link } from '@reach/router';
import error404 from '../../assets/error404.svg';
import './notfound.scss';
export default function NotFound() {
  return (
    <div className="error404">
      <div className="error404__inner">
        <div className="error404__content">
          <img src={error404} alt="error404__svg" className="error404__svg" />
          <span className="error404__body">
            <p className="error404__title">Oops :(</p>
            <p className="error404__subtitle">
              The page you are currently looking for isn’t available or missing
              :(, maybe it was removed or renamed, we advise you go back to the
              homepage.
            </p>
          </span>

          <Link
            className="error404__btn"
            to="/"
            style={{ textDecoration: 'none' }}
          >
            {' '}
            Back To Homepage{' '}
          </Link>
          {/* <button className="error-404-btn" > Sign In </button> */}
        </div>
      </div>
    </div>
  );
}
