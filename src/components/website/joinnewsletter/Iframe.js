import React from 'react';

const SubModal = props => {
  return (
    <div
      style={{
        // border:'1px solid #EEE',
        background: 'white',
      }}
    >
      <iframe
        title={props.src}
        height="320px"
        src={props.src}
        width="480px"
        // sandbox=""
      />
    </div>
  );
};
export default SubModal;
