import React from 'react';
import './tab.scss';

export const Tab = props => {
  return (
    <div className={`tab  ${props.type === 'small' && ' tab--small'}`}>
      <div className="tab__links">
        {props.tabs.map((item, index) => (
          <>
            <p
              className={`tab__link ${props.active === item ? ' active' : ' '}`}
              onClick={() => props.setActive(item)}
            >
              {item}
              {item === 'Offers' && <p className="tab__new">New</p>}
            </p>
            {/* {item === 'Offers' && <p className="tab__new">New</p>} */}
          </>
        ))}
      </div>
      <div className="hr"></div>
    </div>
  );
};
