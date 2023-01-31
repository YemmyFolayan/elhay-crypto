import React from 'react';
import './startnow.scss';

import { useState } from 'react';
export const Startnow = props => {
  const [check, setCheck] = useState(false);

  return (
    <div className="startnow-container">
      <div className="startnow-inner">
        <img src={props.image} alt="Empty SVG" />
        <p>{props.title}</p>
        <p>{props.subtitle}</p>
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
          className="startnow-btn"
          disabled={check ? false : true}
          onClick={props.onClick}
        >
          {props.btn}
        </button>
      </div>
    </div>
  );
};
