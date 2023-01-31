import React, { useEffect } from 'react';
import { Navbar } from '../../components/website/Navbar';
import FaqsBanner from 'components/website/FaqsBanner';
function FAQ() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Navbar faqs="active" />
      <FaqsBanner />
    </div>
  );
}

export default FAQ;
