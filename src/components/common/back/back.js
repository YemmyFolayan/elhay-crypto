import React from 'react';
import { navigate } from '@reach/router';

import { goBack } from '../../../routes/RedirectRoutes';
import { connect } from 'react-redux';
import { openStagesBox, openDescBox } from 'appRedux/actions/pathway';
import '../header.scss';
const Back = props => {
  return (
    <a
      href="/"
      onClick={e => {
        e.preventDefault();
        // props.func ? props.func() : null
        props.back
          ? goBack()
          : navigate(`/${props.link}`, {
              state: { id: props.id, logo: props.logo },
            });
        // props.action && dispatch(openStagesBox())
      }}
      style={{
        fontWeight: 500,
        fontSize: '1.1rem',
        color: '#000000',
        cursor: 'pointer',
      }}
      className="mb-3 text-uppercase"
    >
      <span className="mr-2 d-inline-flex align-items-center">
        <svg
          style={{ transform: 'rotate(180deg)' }}
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="11"
          viewBox="0 0 12 11"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.219 10.7797C5.28867 10.8495 5.37143 10.9049 5.46255 10.9427C5.55367 10.9805 5.65135 11 5.75 11C5.84865 11 5.94633 10.9805 6.03745 10.9427C6.12857 10.9049 6.21133 10.8495 6.281 10.7797L10.781 6.27966C10.8508 6.20999 10.9063 6.12723 10.9441 6.03611C10.9819 5.94499 11.0013 5.84731 11.0013 5.74866C11.0013 5.65001 10.9819 5.55233 10.9441 5.46121C10.9063 5.37009 10.8508 5.28733 10.781 5.21766L6.281 0.717661C6.14017 0.576831 5.94916 0.497714 5.75 0.497714C5.55083 0.497714 5.35983 0.576831 5.219 0.717661C5.07817 0.858491 4.99905 1.0495 4.99905 1.24866C4.99905 1.44782 5.07817 1.63883 5.219 1.77966L9.1895 5.74866L5.219 9.71766C5.14915 9.78733 5.09374 9.87009 5.05593 9.96121C5.01812 10.0523 4.99866 10.15 4.99866 10.2487C4.99866 10.3473 5.01812 10.445 5.05593 10.5361C5.09374 10.6272 5.14915 10.71 5.219 10.7797Z"
            fill="#000000"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 5.74854C0 5.94745 0.0458074 6.13821 0.127345 6.27887C0.208883 6.41952 0.319471 6.49854 0.434783 6.49854L9.56522 6.49854C9.68053 6.49854 9.79112 6.41952 9.87265 6.27887C9.95419 6.13821 10 5.94745 10 5.74854C10 5.54962 9.95419 5.35886 9.87265 5.2182C9.79112 5.07755 9.68053 4.99854 9.56522 4.99854L0.434783 4.99854C0.319471 4.99854 0.208883 5.07755 0.127345 5.2182C0.0458074 5.35886 0 5.54962 0 5.74854Z"
            fill="#000000"
          />
        </svg>
      </span>
      <span>{props.page}</span>
    </a>
  );
};

export const Backtrack = props => {
  return (
    <span className="backtrack" onClick={() => props.click()}>
      <i class="fas fa-arrow-left"></i>
      <p>Back</p>
    </span>
  );
};

const mapStateToProps = ({ pathway }) => {
  const { desc, stages } = pathway;
  return {
    desc,
    stages,
  };
};

export default connect(mapStateToProps, { openDescBox, openStagesBox })(Back);
