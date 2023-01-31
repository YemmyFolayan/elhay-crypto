import React, { useState } from 'react';
import './index.css';
import { Modal } from 'antd';
import Layout from 'components/common/DashboardLayout';
import NewSavings from './NewSavings';
import TopUp from './TopUp';
import { useUserData } from 'helpers/hooks';
import savings from '../../../assets/savings.svg';
// import { Savings } from 'components/savings/savings';
// import { Getstarted } from 'components/website/getstarted/getstarted';
import { Startnow } from 'components/common/startnow/startnow';
const Vestisavings = () => {
  const { userData } = useUserData();
  const [modalVisible, setModalVisible] = useState(false);
  const [showNewSavings, setShowNewSavings] = useState(false);
  const [showTopUp, setShowTopUp] = useState(false);

  const handleShowTopUp = () => {
    setShowTopUp(true);
    showModal();
  };

  const handleShowSavings = () => {
    setShowNewSavings(true);
    showModal();
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setShowNewSavings(false);
    setShowTopUp(false);
  };

  console.log('Unsused Methods', handleShowTopUp);
  return (
    <Layout>
      <div
        className=" isw-container"
        style={{ height: '85vh', width: '100%', overflow: 'scroll' }}
      >
        <div className="flex_page_container pt-4" id="saving-container">
          <div className="d-flex justify-content-between align-items-center saving-top">
            <h3 className="txt_2ch4 my-3">Create Savings</h3>
            {/* <button className='new-savings-plan' onClick={handleShowSavings}>New Savings</button> */}
          </div>
          <Startnow
            image={savings}
            onClick={handleShowSavings}
            btn="Create New Savings Plan"
            title="12% On Savings"
            subtitle="Begin saving for your relocation, Earn up to 
            12% on savings from our partners, 
            terms and conditions apply."
          />

          <Modal
            cancelButtonProps={{ style: { display: 'none' } }}
            visible={modalVisible}
            onCancel={closeModal}
            destroyOnClose
            footer=""
            className="new-modal"
            centered={true}
            okButtonProps={{ style: { display: 'none' } }}
            maskStyle={{
              background: 'rgba(103, 169, 72, 0.2)',
              backdropFilter: 'blur(4px)',
            }}
          >
            {showNewSavings && (
              <NewSavings close={closeModal} user={userData} />
            )}
            {showTopUp && <TopUp close={closeModal} user={userData} />}
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default Vestisavings;
