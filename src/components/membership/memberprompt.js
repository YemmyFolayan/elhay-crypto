import React from 'react';
import upgrade from '../../assets/upgrademember.svg';
import { useState } from 'react';
import './memberprompt.scss';
import { Newprompt } from 'components/common/prompt/prompt';
export const Memberprompt = props => {
  const [check, setCheck] = useState(false);

  return (
    <Newprompt img={upgrade}>
      <p className="title">Want to move abroad within the next 12 months?</p>
      <p className="subtitle">
        Let our 1000+ mentors help you move abroad faster, upgrade for as low as
        N5000/month.
      </p>
      <label class="form-control">
        <input
          type="checkbox"
          name="checkbox"
          onChange={() => setCheck(!check)}
          checked={check}
        />
        I do not want this reminder
      </label>

      {check ? (
        <button className="create-new-member-btn" onClick={() => props.close()}>
          Not Interested
        </button>
      ) : (
        <button
          className="create-new-member-btn"
          onClick={() => {
            props.click(2);
          }}
        >
          Proceed{' '}
        </button>
      )}
    </Newprompt>
  );
};
