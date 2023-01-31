import React from 'react';
import './newpost.scss';
import { useState } from 'react';

export const Newpost = () => {
  const [open, setOpen] = useState(true);

  return (
    <div
      className={`newpost-notification-container ${
        open ? ' active' : ' closed'
      } `}
    >
      <div className="newpost-notification-inner">
        <p>
          Scroll Down to See More Posts{' '}
          <i className="fas fa-times" onClick={() => setOpen(!open)}></i>{' '}
        </p>
      </div>
    </div>
  );
};
