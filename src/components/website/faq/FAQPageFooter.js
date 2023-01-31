import React from 'react';
import './FAQPageFooter.scss';
import Footer from '../Footer';
function FAQPageFooter(props) {
  return (
    <div>
      <section className="pt-5 mt-5 pb-5 prefooter-container">
        <div className="prefooter-inner">
          <p>Do You Have Any Suggestions For Us On What We Can improve On ?</p>
        </div>
        <div className="faq__button" onClick={() => props.openModal()}>
          Open Suggestion Box
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default FAQPageFooter;
