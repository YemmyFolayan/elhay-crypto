import React from 'react';

export const Singleprovider = () => {
  return (
    <div className="col-12 mt-3">
      <div className="card bg-white p-3 p-md-4">
        <div className="d-flex mb-3">
          <img
            src="https://res.cloudinary.com/wevesti/image/upload/v1622441055/qf9xslgvxkrmsnbrjkio.jpg"
            alt="proflie"
            style={{
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              flexShrink: 0,
            }}
            className="bg-dark mr-3"
          />
          <div style={{ maxWidth: '300px' }}>
            <h5 className="mb-0">Olusola Amusan</h5>
            <div style={{ color: '#000000' }}>
              <i className="fas fa-map-pin" /> Germany
            </div>
            <p>Reminder to upload your passport, certificates and address</p>
          </div>
        </div>
        {/* Progress Steps */}
        <div className="d-flex justify-content-between mb-2">
          <span>Progress</span>
          <span style={{ color: '#000000' }}>Stage 4</span>
          <span>Stage 10</span>
        </div>
        <div style={{ height: '20px', backgroundColor: '#000000' }}>
          <div
            style={{
              height: '100%',
              width: '50%',
              backgroundColor: '#000000',
            }}
          />
        </div>
      </div>
    </div>
  );
};
