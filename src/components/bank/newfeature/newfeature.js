import { Icontitlesubtitle } from 'components/common/titlesubtitle/titlesubtitle';
import React from 'react';
import sparkle from 'assets/sparkle.svg';
import Stripefeature from '../stripe/stripefeature';
import './newfeature.scss';

export const Newfeature = props => {
  return (
    <section className="newft">
      <Icontitlesubtitle
        title="Introducing"
        image={sparkle}
        subtitle="Introducing our Founders card made for business owners /entrepreneur."
      />
      <div className="newft__bottom">
        <Stripefeature
          stripeStatus={props.stripeStatus}
          status={props.status}
          waitlist={props.waitlist}
        />
      </div>
    </section>
  );
};
