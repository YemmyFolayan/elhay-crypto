import React, { useState } from 'react';
import './index.css';
import { Switch, Modal } from 'antd';
import Layout from 'components/common/DashboardLayout';
import api from 'appRedux/api';
import { openNotificationWithIcon } from 'appRedux/actions/Common';
import { objectValuesStringify } from 'helpers/utils';
import Withdraw from './Withdraw';
import TopUp from './TopUp';
import { useUserData } from 'helpers/hooks';

// images
// import search from 'assets/sea.svg';
const EditSavings = () => {
  const { userData } = useUserData();
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [showWithdrawal, setShowWithdrawal] = useState(false);
  const [showTopUp, setShowTopUp] = useState(false);

  const handleShowTopUp = () => {
    setShowTopUp(true);
    showModal();
  };

  const handleShowWithdrawal = () => {
    setShowWithdrawal(true);
    showModal();
  };

  const showModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
    setShowWithdrawal(false);
    setShowTopUp(false);
  };

  const handlePayment = async values => {
    console.log(values);
    setFormData(values);
    setModalVisible(true);
  };
  const handleCompleteTransaction = async values => {
    console.log(formData);
    const url =
      formData.paymentMethod === 'wallet' ? 'recharge-card' : 'recharge-card';
    setLoading(true);
    try {
      const res = await api.post(url, { ...formData, ...values });
      console.log({ ...res });
      const data = res.data;
      openNotificationWithIcon(data.message, 'Recharge Card', 'success');
      setLoading(false);
      setModalVisible(false);
    } catch (error) {
      if (error.data.errors) {
        openNotificationWithIcon(
          objectValuesStringify(error.data.errors),
          'Recharge Card',
          'error',
        );
      } else {
        console.log('err', error.data.message);
        openNotificationWithIcon(error.data.message, 'Recharge Card', 'error');
      }
      console.log({ ...error });
      setLoading(false);
    }
  };

  console.log(
    'Unused Methods',
    handleCompleteTransaction,
    handlePayment,
    handleShowWithdrawal,
    handleShowTopUp,
    loading,
  );
  return (
    <Layout>
      <div
        className=" isw-container"
        style={{ height: '85vh', width: '100%', overflow: 'scroll' }}
      >
        <div className="flex_page_container pt-4" id="savings">
          <h3 className="txt_2ch4 my-3">Plan Settings</h3>

          <div className="font-weight-normal mt-5">
            <div className="border-bottom mb-3 d-flex flex-wrap justify-content-between align-items-center">
              <p>PLAN NAME</p>
              <p>Camera Plan</p>
            </div>
            <div className="border-bottom mb-3 d-flex flex-wrap justify-content-between align-items-center">
              <p>TARGET</p>
              <p>$12,434</p>
            </div>
            <div className="border-bottom mb-3 d-flex flex-wrap justify-content-between align-items-center">
              <p>FREQUENCY</p>
              <p>Monthly</p>
            </div>
            <div className="border-bottom mb-3 d-flex flex-wrap justify-content-between align-items-center">
              <p>AUTOMATE SAVING STATUS</p>
              <Switch />
            </div>
            <div className="border-bottom mb-3 d-flex flex-wrap justify-content-between align-items-center">
              <p>NEXT SAVING DATE</p>
              <p>Not set</p>
            </div>
            <div className="border-bottom mb-3 d-flex flex-wrap justify-content-between align-items-center">
              <p>CARDS</p>
              <p>Not set</p>
            </div>
            <button>Save Settings</button>
          </div>
          <Modal
            cancelButtonProps={{ style: { display: 'none' } }}
            visible={modalVisible}
            onCancel={closeModal}
            destroyOnClose
            footer=""
            className="rounded-modal"
            centered={true}
            okButtonProps={{ style: { display: 'none' } }}
            maskStyle={{
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(4px)',
            }}
          >
            {showWithdrawal && <Withdraw close={closeModal} user={userData} />}
            {showTopUp && <TopUp close={closeModal} user={userData} />}
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default EditSavings;
