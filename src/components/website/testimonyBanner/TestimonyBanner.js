import React from 'react';
import './TestimonyBanner.scss';
import SingleTestimonyCard from './SingleTestimonyCard';
import { feedbacks } from './data';
function TestimonyBanner(props) {
  return (
    <div class="container">
      <div className="testimonial-inner-container">
        {feedbacks.map((item, index) => (
          <SingleTestimonyCard
            key={index}
            image={item.image}
            title={item.title}
            location={item.location}
            text={item.text}
          />
        ))}
      </div>
    </div>
  );
}

export default TestimonyBanner;
