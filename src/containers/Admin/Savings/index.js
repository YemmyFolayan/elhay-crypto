import React, { useState } from 'react';
import './index.css';
import { Modal } from 'antd';
import Layout from 'components/common/DashboardLayout';
import NewSavings from './NewSavings';
import TopUp from './TopUp';
import ListSavings from './ListSavings';
import { useUserData } from 'helpers/hooks';
import { navigate } from '@reach/router';
import { connect, useDispatch } from 'react-redux';
import { openUpdateBox } from 'appRedux/actions/update';

// import { Singlepathway } from 'components/pathway/singlepathway';
const Savings = () => {
  const { userData } = useUserData();
  const [modalVisible, setModalVisible] = useState(false);
  const [showNewSavings, setShowNewSavings] = useState(false);
  const [showTopUp, setShowTopUp] = useState(false);

  const handleShowTopUp = () => {
    setShowTopUp(true);
    showModal();
  };

  // const handleShowSavings = () => {
  //   setShowNewSavings(true);
  //   showModal();
  // };

  const dispatch = useDispatch();

  var openUpdateModal = () => {
    dispatch(openUpdateBox());
  };

  const navigateTo = () => {
    navigate('/createsavings');
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
    <Layout info="Our Savings feature is currently down at the moment, we will inform you when it is back up">
      <div
        className=" isw-container"
        style={{ height: '85vh', width: '100%', overflow: 'scroll' }}
      >
        <div className="flex_page_container pt-4" id="saving-container">
          <div className="d-flex justify-content-between align-items-center saving-top">
            <h3 className="txt_2ch4 my-3">My Savings</h3>
            {/* <button className='new-savings-plan' onClick={()=> userData.verifiedKyc === "APPROVED" || userData.verifiedKyc === true ?navigateTo() :openUpdateModal()}>Create New Savings</button> */}
          </div>
          {/* <Singlepathway/> */}
          <ListSavings
            handleShowSavings={navigateTo}
            openUpdateModal={openUpdateModal}
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

const mapStateToProps = ({ auth }) => {
  const { authUser } = auth;
  return {
    authUser,
  };
};

const mapDispatchToProps = {
  openUpdateBox,
};

export default connect(mapStateToProps, mapDispatchToProps)(Savings);
