import React from 'react';
import { Navbar } from 'components/website/Navbar';
import CareersTop from 'components/website/careers/CareersTop';
import HomePageFooter from 'components/website/HomePageFooter';
import Definition from 'components/website/definition/Definition';
import Joinvesti from 'components/website/joinvesti/Joinvesti';
import WeOffer from 'components/website/weoffer/WeOffer';
import { Downloadvesti } from 'components/website/downloadvesti/downloadvesti';
import Openings from 'components/website/openings/Openings';
export default function Careers() {
  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      <Navbar home="active" />
      <CareersTop />
      <Definition />
      <Joinvesti />
      <Openings />
      <WeOffer />
      <Downloadvesti />
      <HomePageFooter />
    </div>
  );
}
