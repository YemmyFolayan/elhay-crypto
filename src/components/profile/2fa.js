import React from 'react';
import { Checkbox } from 'components/common/inputs/checkbox';
import './2fa.scss';

export const Twofa = props => {
  return (
    <div className={`twofa${props.check ? ' --active' : ''}`}>
      <Checkbox check={props.check} setCheck={props.setTwofa} name="twofa" />
      <div className="twofa__right">
        <span>
          {' '}
          <p>Two-Factor Authentication 2FA</p>{' '}
          <p className={!props.factorAuth ? '' : ' active'}>
            {' '}
            {props.check ? 'Active' : 'Disabled'}{' '}
          </p>{' '}
        </span>
        <p>
          Add an extra layer of security and protection to your NetWebPay <br />
          account to protect it from unauthorized transactions.
        </p>
      </div>
    </div>
  );
};
