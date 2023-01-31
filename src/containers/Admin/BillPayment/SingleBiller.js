import React from 'react';
import './SingleBiller.scss';

const SingleBiller = props => {
  const handleBiller = () => {
    props.name ? props.handleBiller(props.name) : props.onClick();
  };

  return (
    <div
      className="billpayment-card mb-3"
      style={{ backgroundColor: `${props.color}` }}
      onClick={() => {
        handleBiller();
      }}
    >
      <div className="billpayment-card-inner">
        <div className="card-title">
          <p className="billpayment-card__title">{props.title}</p>
        </div>
        <div className="billpayment-image">
          <img className="img-fluid h-100" src={props.image} alt="" />
        </div>
      </div>
    </div>
  );
};

export default SingleBiller;

// return (
//   <div className="col-md-6 col-lg-4 mb-3">
//     <div className="single-biller-card p-4 textleft mb-3">
//       <div className="single-biller-card-container">
//         <div onClick={() => {
//           handleBiller()
//           // props.onClick()
//           }}
//         >
//           <h3 className="single-biller-card__title">{props.title}</h3>
//           <img className="single-biller-card__img" src={props.image} alt="" />
//         </div>
//       </div>
//     </div>
//   </div>
// );
