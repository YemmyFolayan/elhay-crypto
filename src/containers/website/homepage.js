import React from 'react';
import './homepage.scss';
import { Navbar } from 'components/website/navbar/navbar';
import { Banner } from 'components/website/banner/banner';
export const Homepage = () => {
  return (
    <div>
      <Navbar />
      <Banner />
    </div>
  );
};
