import React from 'react';
import './CardPageFooter.scss';
import Footer from '../Footer';
function CardPageFooter(props) {
  return (
    <div>
      <section className="pt-5 mt-5 pb-5 prefooter-container">
        <div className="prefooter-inner">
          <p>
            Get your virtual card and start spending safely online, in-store and
            abroad.
          </p>
        </div>
        <div className="button" onClick={() => props.openModal()}>
          Order Your Card Today
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default CardPageFooter;
