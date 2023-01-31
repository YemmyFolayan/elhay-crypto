import React from 'react';
import './CorporateEntities.scss';

import wes from '../../../assets/wes.png';
import ceu from '../../../assets/ceuimage.png';
import uh from '../../../assets/uh.PNG';
import sunderland from '../../../assets/sunderland.png';
import usa from '../../../assets/usadept.png';

function CorporateEntities() {
  return (
    <>
      <section className="pt-5 mt-5 pb-5 mb-5 corporate-container">
        <div className="corporate-inner">
          <p>
            Leverage designed for indiviuals, families, small businesses, and
            large corporate entities.
          </p>
        </div>
        <div className="entities">
          <img className="img-fluid" src={wes} alt="" />
          <img className="img-fluid" src={ceu} alt="" />
          <img className="img-fluid" src={uh} alt="" />
          <img className="img-fluid" src={sunderland} alt="" />
          <img className="img-fluid" src={usa} alt="" />
        </div>
      </section>
    </>
  );
}

export default CorporateEntities;
