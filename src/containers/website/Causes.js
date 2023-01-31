import React from 'react';
import { Navbar } from 'components/website/Navbar';
import HomePageFooter from 'components/website/HomePageFooter';
import CausesTop from 'components/website/causes/CausesTop';
import { Downloadvesti } from 'components/website/downloadvesti/downloadvesti';
import { DoingGood } from '../../components/website/doinggood/DoingGood';
import DonateTo from 'components/website/donate/DonateTo';

export default function Causes() {
  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      <Navbar home="active" />
      <CausesTop />
      <DoingGood />
      <DonateTo />
      <Downloadvesti />
      <HomePageFooter />
    </div>
  );
}
