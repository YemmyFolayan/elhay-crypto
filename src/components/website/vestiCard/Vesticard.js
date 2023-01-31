import React from 'react';
import './Vesticard.scss';
import vesticardbanner from '../../../assets/NetWebPaycardbanner.png';

const vesticard = props => {
  return (
    <div>
      <div className="vesticard-container">
        <div className="vesticard-inner-container">
          <div className="vesticard-inner-container left">
            <div className="top">
              <span>
                <p className="display-6">
                  Introducing Our<strong> New cards</strong>{' '}
                </p>
              </span>
              <p>
                Get all the benefits of our variety of cards - spend online, at
                major airports in-stores, and abroad while saving on currency
                conversion fees, with the extra layer of security of the our
                digital cards.
              </p>
            </div>
            <div className="bottom button" onClick={() => props.openModal()}>
              Create New Card now
            </div>
          </div>
          <div className="vesticard-inner-container right">
            <img
              className="img-fluid "
              src={vesticardbanner}
              alt="vesticard SVG"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default vesticard;
