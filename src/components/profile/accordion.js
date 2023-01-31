import React, { useState } from 'react';
import './accordion.scss';
import circle from '../../assets/circle-check.svg';
import { openNotificationWithIconErr } from 'appRedux/actions/Common';

const Accordion = props => {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <div className="accordion">
        <div className="accordion-item">
          <div
            className="accordion-title"
            style={{
              backgroundColor: `${props.color}`,
              borderTopColor: `${props.topcolor}`,
              borderBottomColor: `${props.bottomcolor}`,
              borderLeftColor: `${props.leftcolor}`,
              borderRightColor: `${props.rightcolor}`,
            }}
            onClick={() =>
              props.check === false
                ? openNotificationWithIconErr(
                    `Not available, You must pass previous KYC level(s) to unlock this level`,
                    `KYC ERROR`,
                    'error',
                  )
                : setIsActive(!isActive)
            }
          >
            <div>{props.title}</div>
            <div>
              {isActive ? (
                <img src={props.caretup} alt="∧" />
              ) : (
                <img src={props.caretdown} alt="∨" />
              )}
            </div>
          </div>
          <img className="img-fluid verone" src={props.image} alt="" />

          {isActive && (
            <div className="accordion-content">
              <p>{props.subtitle}</p>
              <p>{props.subtext}</p>
              <ul className="info">
                <img src={circle} alt="" />
                <li className="infoo">
                  {' '}
                  Either of : a valid <span>{props.number1}</span>,
                  <span>{props.number2}</span> , <span>{props.number3}</span>{' '}
                  &nbsp; or &nbsp; <span>{props.number4}</span>.
                </li>
              </ul>
              <p>What can level {props.tinytext} verified users do?</p>
              <ul className="side">{props.children}</ul>
              <button className="btnn" onClick={props.handleKyc}>
                {props.buttontext}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Accordion;
