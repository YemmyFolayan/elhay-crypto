import React from 'react';
import { Navbar } from '../../components/website/Navbar';
import HomeBanner from 'components/website/HomeBanner';
import HomePageFooter from 'components/website/HomePageFooter';
import { Banner } from 'components/website/banner/banner';
function Home() {
  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      <Navbar home="active" />
      <Banner />
      <HomeBanner />
      <HomePageFooter />
    </div>
  );
}

export default Home;
