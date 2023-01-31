import { Downloadvesti } from 'components/website/downloadvesti/downloadvesti';
import HomePageFooter from 'components/website/HomePageFooter';
import { Navbar } from 'components/website/Navbar';
import TestimonyBanner from 'components/website/testimonyBanner/TestimonyBanner';
import TestimonyTop from 'components/website/testimonyBanner/TestimonyTop';
import React from 'react';

function Testimonials() {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div style={{ backgroundColor: '#F8FEF5' }}>
        <Navbar home="active" />
        <TestimonyTop />
      </div>
      <TestimonyBanner />
      <div style={{ width: '80%' }}>
        <Downloadvesti />
      </div>
      <HomePageFooter />
    </div>
  );
}

export default Testimonials;
