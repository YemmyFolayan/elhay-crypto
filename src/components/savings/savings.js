import React from 'react';
import './savings.scss';
import savings from '../../assets/savings.svg';
import { useState } from 'react';
export const Savings = props => {
  const [check, setCheck] = useState(false);

  return (
    <div className="savings-container">
      <div className="savings-inner">
        <img src={savings} alt="Empty SVG" />
        <p>12% On Savings</p>
        <p>
          Begin saving for your relocation, Earn up to 12% on savings from our
          partners, terms and conditions apply.
        </p>
        <label class="form-control">
          <input
            type="checkbox"
            name="checkbox"
            onChange={() => setCheck(!check)}
            checked={check}
          />
          I agree to vesti terms and conditions
        </label>
        {/* <label class="form-control">
                    <input type="checkbox" name="checkbox-checked" checked />
                    I agree to vesti terms and conditions
                </label> */}
        <button
          className="create-new-savings-btn"
          disabled={check ? false : true}
          onClick={props.openModal}
        >
          Create Savings Plan
        </button>
      </div>
    </div>
  );
};
