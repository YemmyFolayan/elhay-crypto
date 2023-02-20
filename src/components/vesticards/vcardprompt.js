import React from 'react';
import vcardprompt from 'assets/vcardprompt.svg';
import vcardpromptt from 'assets/vcardprompt1.svg';
import { Listcheck } from 'components/common/listcheck/listcheck';
import { Titlesubtitle } from 'components/common/titlesubtitle/titlesubtitle';
import '../sila/silaprompt.scss';
import { Newprompt } from 'components/common/prompt/prompt';
import { Shortinfo } from 'components/common/shortinfo/shortinfo';

export const Vcardprompt = props => {
  // eslint-disable-next-line
  var data = [
    `Kindly Ensure your NetWebPay Account FullName Matches the Name on the KYC Document Submitted for ${props.name} Creation.`,
    `The Verification and Card Creation Process can take up to ${
      props.name.includes('dollar') ? '2 Hours' : '2 Minutes'
    }, Kindly be patient with us.`,
  ];
  return (
    <Newprompt img={props.type !== 'Apto' ? vcardprompt : vcardpromptt}>
      {props.type === 'Apto' ? (
        <>
          <Titlesubtitle title={`vesti ${props.name}`} />
          <Listcheck data={data} />

          {props.type === 'Apto' && (
            <Shortinfo
              subject={`You can only create a single ${props.name}, and it cost $7 to create a ${props.name}, but vesti has waved off this fee for it users.`}
            />
          )}
          {props.type !== 'Apto' && (
            <p className="information">
              {props.name} cost <strong> NGN 250 </strong> , this will be
              deducted from your NetWebPay wallet.
              <br />
              Our cards are used for migration service payments, however they
              are also used on sites where Mastercard are acceptable, but our
              cards are not currently working on these sites:
              <strong> binance, crypto.com, skrill, and kucoin</strong>
            </p>
          )}

          <div className="silaprompt__inner__bottom__btn">
            <button className="" onClick={() => props.move(3)}>
              Continue to Create {props.name}
            </button>
            <button className="" onClick={() => props.move(1)}>
              Go Back
            </button>
          </div>
        </>
      ) : (
        <>
          <Titlesubtitle
            title="vesti Virtual cards"
            subtitle="Update on our virtual card offerings."
          />
          <p className="information">
            Our Virtual Card service is under maintenance please check back
            later (please email support if you have questions){' '}
            <strong> help@elhay.com </strong>
          </p>
          <button className="prompt__btn" onClick={() => props.closeModal()}>
            Close
          </button>
        </>
      )}
    </Newprompt>
  );
};
