import React from 'react';
import { useEffect } from 'react';
import { useLocation } from '@reach/router';
import { withRouter } from 'react-router-dom';

const ScrollTop = () => {
  const { location } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <></>;
};

export default withRouter(ScrollTop);
