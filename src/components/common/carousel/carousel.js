import React from 'react';
import './carousel.scss';

export const CarouselItem = ({ children, width }) => {
  return (
    <div className="carousel-itemm" style={{ width: width }}>
      {children}
    </div>
  );
};

const Carousel = ({ children, active, setActive }) => {
  //   const [activeIndex, setActiveIndex] = useState(0);
  //   const [paused, setPaused] = useState(false);

  const updateIndex = newIndex => {
    if (newIndex < 0) {
      newIndex = React.Children.count(children) - 1;
    } else if (newIndex >= React.Children.count(children)) {
      newIndex = 0;
    }

    setActive(newIndex);
  };

  return (
    <div
      //   {...handlers}
      className="carousel"
    >
      <div
        className="inner"
        style={{ transform: `translateX(-${active * 100}%)` }}
      >
        {React.Children.map(children, (child, index) => {
          return React.cloneElement(child, { width: '100%' });
        })}
      </div>
      <div className="indicators">
        <p
          className="previous"
          onClick={() => {
            updateIndex(active - 1);
          }}
        >
          <i className="fas fa-chevron-left" />
        </p>

        <p
          className="next"
          onClick={() => {
            updateIndex(active + 1);
          }}
        >
          <i className="fas fa-chevron-right" />
        </p>
      </div>
    </div>
  );
};

export default Carousel;
