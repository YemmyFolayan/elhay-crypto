import React, { useEffect } from 'react';
import { Navbar } from '../../components/website/Navbar';
import FeesBanner from 'components/website/FeesBanner';
function Fees() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Navbar fees="active" />
      <FeesBanner />
    </div>
  );
}

export default Fees;
