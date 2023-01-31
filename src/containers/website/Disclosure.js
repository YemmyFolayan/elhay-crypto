import React, { useEffect } from 'react';
import { Navbar } from '../../components/website/Navbar';
import DisclosureBanner from 'components/website/DisclosureBanner';

function Disclosure() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Navbar />
      <DisclosureBanner />
    </div>
  );
}

export default Disclosure;
