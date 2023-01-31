import React from 'react';
import SimplePlaidLink from 'components/plaidlink/plaidlink.tsx';
import { Titlesubtitle } from 'components/common/titlesubtitle/titlesubtitle';
import './connectplaid.scss';
export const Connectplaid = () => {
  return (
    <div className="connectplaid">
      <Titlesubtitle
        title="Connect Your Account • 2 of  2"
        subtitle="You can choose to update your wallet nickname."
      />
      <div className="connectplaid__wrap">
        <SimplePlaidLink />
      </div>
    </div>
  );
};
