import React, { useState, useEffect } from 'react';
import './scrolltotop.scss';

export const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    if (window.pageYOffset > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisible);
  }, []);
  return (
    <div className="scroll-to-top">
      {visible && (
        <div onClick={scrollToTop}>
          <img
            src="https://i.postimg.cc/44Ytsk8Z/top-arrow-emoj.png"
            alt="Go to top"
          />
        </div>
      )}
    </div>
  );
};
