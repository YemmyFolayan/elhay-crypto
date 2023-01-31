import React from 'react';
import { Navbar } from '../../components/website/Navbar';
import AboutBanner from 'components/website/AboutBanner';
function Teams() {
  return (
    <div>
      <Navbar about="active" />
      <AboutBanner />
    </div>
  );
}

export default Teams;
