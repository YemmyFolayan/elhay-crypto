import React from 'react';
import './billPayment.scss';
import '../Admin.css';
import Layout from 'components/common/DashboardLayout';
import ElectricityMain from './Electricity/ElectricityMain';
import Internet from './DataPurchase/Internet';
import CableMain from './CableTv/CableTv';
import { TransactionHistory } from './TransactionHistory';

const BillPaymentHome = () => {
  return (
    <>
      <Layout>
        <div>
          <div
            // className=" isw-container"
            className="billpayment-container"
            style={{ height: '95vh', width: '100%', overflow: 'scroll' }}
          >
            <h2 className="page_title mt-3"> Categories</h2>
            <div className="billpayment-container-inner  pt-2" id="savings">
              <div className="arrangement mt-4">
                <CableMain />
                <ElectricityMain />
                <Internet />
              </div>
            </div>
            <TransactionHistory />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default BillPaymentHome;
