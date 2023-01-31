import React from 'react';
import reward from 'assets/rewardpop.svg';
import { Newprompt } from 'components/common/prompt/prompt';
import { Referal } from '../../referal/referal';
import './vestireward.scss';
import { Rewards } from 'helpers/data';
import { Numberedcheck } from '../listcheck/listcheck';
export const vestireward = props => {
  var link = localStorage.getItem('userData');
  return (
    <Newprompt img={reward}>
      {/* <div className="vestireward__header">
                <p>Claim {props.amount}</p>
                {
                    props.children
                }
            </div> */}
      <div className="vestireward__top">
        {props.children}
        <div className="mb-2"></div>
        {Rewards.map((item, index) => (
          <Numberedcheck key={index + 1} index={index} body={item} />
        ))}
        <div className="mb-4"></div>
        <Referal link={JSON.parse(link).ReferalLink} />
      </div>
      {/* <Referal
                link={JSON.parse(link).ReferalLink}
            /> */}
    </Newprompt>
  );
};
