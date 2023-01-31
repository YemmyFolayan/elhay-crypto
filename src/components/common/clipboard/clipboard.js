import React, { useState, useRef } from 'react';
import '../styles.scss';

export const Clipboard = props => {
  const [copied, setCopied] = useState(false);

  const board = useRef(null);

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(props.link);
    setCopied(true);
    props.shareNum && props.shareNum(props.id, props.shares);
    props.click && props.click();
  };

  return (
    <div className="clipboard">
      <div className="clipboard__inner">
        <p className="clipboard__title">{props.title}</p>
        {props.link && (
          <div
            ref={board}
            className={`clipboard__box ${copied ? ' copied' : ''}`}
            onClick={copyCodeToClipboard}
          >
            <p>{props.link}</p>
            <p>{copied ? 'Copied' : ' - Click to Copy - '}</p>
          </div>
        )}
      </div>
    </div>
  );
};
