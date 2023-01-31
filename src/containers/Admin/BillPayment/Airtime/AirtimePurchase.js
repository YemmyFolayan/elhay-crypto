import React from 'react';
// import './billPayment.scss';
import '../../Admin.css';
import Layout from 'components/common/DashboardLayout';
import AirtimeMain from './Airtime';

const AirtimePurchase = () => {
  return (
    <>
      <Layout>
        <div>
          <div
            className=" isw-container"
            style={{ height: '95vh', width: '100%', overflow: 'scroll' }}
          >
            <div className="flex_page_container pt-2" id="savings">
              <h2 className="page_title mt-3">Buy Airtime</h2>
              <div className="arrangement mt-4">
                <AirtimeMain />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default AirtimePurchase;
