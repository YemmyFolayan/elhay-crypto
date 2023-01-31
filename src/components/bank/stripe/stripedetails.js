import React, { useState, useRef } from 'react';
import './stripe.scss';
import { Titlesubtitle } from 'components/common/titlesubtitle/titlesubtitle';
import { Newprompt } from 'components/common/prompt/prompt';
import banksvg from 'assets/foundersbank.svg';

export const StripeAccountinfo = props => {
  var data = [
    {
      name: 'Account Number',
      value: props.userdata.stripeVirtualAccountNumber,
    },
    {
      name: ' Account Routing Number',
      value: props.userdata.stripeVirtualAccountRoutingNumber,
    },
    {
      name: ' Bank Name',
      value: props.userdata.stripeVirtualBankName,
    },
    {
      name: ' Swift Code',
      value: props.userdata.stripeVirtualSwiftCode,
    },
  ];
  var __renderStatus = value => {
    switch (value) {
      case 'UNVERIFIED':
        return 'stripedisplay__status-not';
      case 'VERIFIED':
        return 'stripedisplay__status-verified';
      default:
        return '';
    }
  };
  return (
    <Newprompt img={banksvg}>
      <div className="stripedisplay">
        <Titlesubtitle
          title="Virtual Account"
          subtitle="Virtual account details, click to copy."
        />
        {data.map((item, index) => (
          <Stripesingle key={index} title={`${item.name}`} link={item.value} />
        ))}
        <span className="stripedisplay__sta">
          <p>Account Status</p>
          <p
            className={`stripedisplay__status  ${__renderStatus(
              props.userdata.stripeAccountStatus,
            )}`}
          >
            {props.userdata.stripeAccountStatus}
          </p>
        </span>
      </div>
    </Newprompt>
  );
};

export const Stripesingle = props => {
  const [copied, setCopied] = useState(false);

  const board = useRef(null);

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(props.link);
    setCopied(true);
    props.shareNum && props.shareNum(props.id, props.shares);
  };

  return (
    <div className="stripedetail">
      <div className="stripedetail__inner">
        {/* {props.title && <p className="referal__inner__title"> <i class="fas fa-link"></i> {props.title}</p>} */}
        <p className="stripedetail__title">{props.title}</p>
        {props.link && (
          <div
            ref={board}
            className={`stripedetail__box ${copied ? ' copied' : ''}`}
            onClick={copyCodeToClipboard}
          >
            <p>{props.link}</p>
            <p>{copied ? 'Copied' : ' - Click to Copy - '}</p>
          </div>
        )}

        {/* { copied ? <p className="stripedetail__copied"><i class="fas fa-thumbs-up"></i>  { props.name ? props.name : 'Link'} has been copied to your clipboard</p> : props.link && <p className="referal-info"> <img src={info} alt="info svg" /> 
                   Click the box above to copy.</p>} */}
      </div>
    </div>
  );
};
