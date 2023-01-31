import React, { useState } from 'react';
import vprompt from 'assets/vpofprompt.svg';
import { Listcheck } from 'components/common/listcheck/listcheck';
import { Titlesubtitle } from 'components/common/titlesubtitle/titlesubtitle';
import './pofprompt.scss';
import { Newprompt } from 'components/common/prompt/prompt';
import { Link } from '@reach/router';

export const Pofprompt = props => {
  const [check, setCheck] = useState(false);
  var data = [
    'Fill our loan application form and submit.',
    'Pay interest on loan',
    'Download bank form',
    'Upload filled Banking Partner forms form with Passport photograph and PHCN bill attached',
  ];
  return (
    <Newprompt img={vprompt}>
      <Titlesubtitle
        title="vesti Proof of Fund Loan"
        subtitle="Do You Need Loans To Cover For Your Immigration Costs ?"
      />

      <Listcheck data={data} />

      <div className="pofprompt__inner__btn">
        <label class="form-control">
          <input
            type="checkbox"
            name="checkbox"
            onChange={() => setCheck(!check)}
            checked={check}
          />
          I agree to{' '}
          <Link className="link" to="/disclosure" style={{ marginLeft: '5px' }}>
            {' '}
            vesti POF terms and conditions
          </Link>
        </label>
        <button
          className=""
          onClick={() => props.move(1)}
          disabled={check ? false : true}
        >
          Yes, I Want In
        </button>
      </div>
    </Newprompt>
  );
};
