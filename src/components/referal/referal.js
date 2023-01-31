import React from 'react';
import { useState, useRef } from 'react';
import info from '../../assets/info.svg';
import './referal.scss';

export const Referal = props => {
  const [copied, setCopied] = useState(false);

  const board = useRef(null);

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(props.link);
    setCopied(true);

    props.shareNum && props.shareNum(props.id, props.shares);
  };

  return (
    <div className="referal">
      <div className="referal__inner">
        {props.title && (
          <p className="referal__inner__title">
            {' '}
            <i class="fas fa-link"></i> {props.title}
          </p>
        )}
        {props.link && (
          <p
            ref={board}
            className={`referal__inner__link ${copied ? ' copied' : ''}`}
            onClick={copyCodeToClipboard}
          >
            {props.link}
          </p>
        )}
        {props.children}

        {copied ? (
          <p className="referal__inner__copied">
            <i class="fas fa-thumbs-up"></i> {props.name ? props.name : 'Link'}{' '}
            has been copied to your clipboard
          </p>
        ) : (
          props.link && (
            <p className="referal-info">
              {' '}
              <img src={info} alt="info svg" />
              Click the box above to copy the link so you can share with your
              friends.
            </p>
          )
        )}
      </div>
    </div>
  );
};
